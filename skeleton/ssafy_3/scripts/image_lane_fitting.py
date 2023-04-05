#!/usr/bin/env python
#-*- coding:utf-8 -*-

import rospy
import cv2
import numpy as np
import os, rospkg
import json
import math
import random
import tf

from cv_bridge import CvBridgeError
from sklearn import linear_model

from nav_msgs.msg import Odometry,Path
from sensor_msgs.msg import CompressedImage
from geometry_msgs.msg import PoseStamped,Point
from morai_msgs.msg import CtrlCmd, EgoVehicleStatus

# image_lane_fitting 은 Camera Image를 활용하여 차선 정보를 인지하는 예제입니다.
# Camera Image로 부터 차선의 위치에 해당하는 Pixel 좌표를 계산한 뒤,
# 좌우 차선 각각 RANSAC을 활용한 3차 곡선 근사를 수행합니다.

# 노드 실행 순서
# 1. CURVEFIT Parameter 입력
# 2. RANSAC Parameter 입력

class IMGParser:
    def __init__(self, pkg_name = 'ssafy_3'):

        self.image_sub = rospy.Subscriber("/image_jpeg/compressed", CompressedImage, self.callback)

        rospy.Subscriber("odom", Odometry, self.odom_callback)

        self.path_pub = rospy.Publisher('/lane_path', Path, queue_size=30)

        self.img_bgr = None
        self.img_lane = None
        self.edges = None 
        self.is_status = False

        ## White/Yellow 차선을 임의로 지정
        self.lower_wlane = np.array([0,0,205])
        self.upper_wlane = np.array([30,60,255])

        self.lower_ylane = np.array([0,70,120])# ([0,60,100])
        self.upper_ylane = np.array([40,195,230])# ([40,175,255])

        ## 동기화를 위해 사용되는 크롭 사이즈(?)
        ## 타겟이미지, 다각형 포인트 어레이, 다각형 색상, 다각형 라인 타입
        self.crop_pts = np.array([[[0,480],[0,350],[280,200],[360,200],[640,350],[640,480]]])

        rospack = rospkg.RosPack()
        currentPath = rospack.get_path(pkg_name)
        ## 현재 패키지에서 다이스트라로 만들어진 경로 불러와서 작업 경로로 지정
        
         
        with open(os.path.join(currentPath, 'sensor/sensor_params.json'), 'r') as fp:
        ## os.path.join() 전달된 문자열을 합쳐서 경로 생성 및 파일 열기
            sensor_params = json.load(fp)
            ## json.load(파일) : 파일에서 JSON 데이터를 파이썬 객체로 변환 후, sensor_params에 저장

        params_cam = sensor_params["params_cam"]

        bev_op = BEVTransform(params_cam=params_cam)
        #TODO: (1) CURVEFit Parameter 입력
        '''
        CURVEFit Class의 Parameter를 결정하는 영역입니다.
        하단의 CURVEFit Class에 대한 정보를 바탕으로 적절한 Parameter를 입력하기 바랍니다.
        '''
        curve_learner = CURVEFit(order=3, lane_width=3.5, y_margin=1, x_range=30, min_pts=50)
        ## 적당한 값 세팅.

        #END
        rate = rospy.Rate(10)

        while not rospy.is_shutdown():

            if self.img_bgr is not None and self.is_status == True:
            ## 이미지를 받은 상태 && 동작해야하는 상태

                img_crop = self.mask_roi(self.img_bgr)
                ## 이미지에서 차선부분 자르기
                
                img_warp = bev_op.warp_bev_img(img_crop)
                ## 원근법을 사용해서 고도있는 시점 창조

                img_lane = self.binarize(img_warp)
                ## 이진화 후 차선 흑백으로 표시

                img_f = bev_op.warp_inv_img(img_lane)
                ## 이진화된 이미지를 원래 시점으로 되돌리기

                lane_pts = bev_op.recon_lane_pts(img_f)
                ## 이진화된 이미지에서 차선 경로 추출

                x_pred, y_pred_l, y_pred_r = curve_learner.fit_curve(lane_pts)
                ## 차선 경로에 대한 회귀선 설정
                ## 왼쪽과 오른쪽 차선의 x,y값 반환
                
                curve_learner.set_vehicle_status(self.status_msg)
                ## 상태메세지 갱신

                lane_path = curve_learner.write_path_msg(x_pred, y_pred_l, y_pred_r)
                ## 차선의 경로를 메세지로 작성

                xyl, xyr = bev_op.project_lane2img(x_pred, y_pred_l, y_pred_r)
                ## BEV좌표계 -> 이미지좌표계 , 차선 경로 투영

                img_lane_fit = self.draw_lane_img(img_lane, xyl[:, 0].astype(np.int32),
                                                            xyl[:, 1].astype(np.int32),
                                                            xyr[:, 0].astype(np.int32),
                                                            xyr[:, 1].astype(np.int32))
                ## 차선 경로를 이미지에 그리기

                self.path_pub.publish(lane_path)
                ## 차선 경로 메세지를 ROS토픽으로 게시

                cv2.imshow("birdview", img_lane_fit)  ## 차선 경로 보여주기
                cv2.imshow("img_warp", img_warp)  ## 고도있는 시점을 보여주기
                cv2.imshow("origin_img", self.img_bgr)  ## 원본 이미지 보여주기

                cv2.waitKey(1)

                rate.sleep()

    def odom_callback(self,msg): ## Vehicl Status Subscriber 
        self.status_msg=msg    
        self.is_status = True

    ## 스트링 데이터를 파싱해서 BGR 배열의 이미지로 변환하는 콜백함수
    def callback(self, msg):
        try:
            np_arr = np.fromstring(msg.data, np.uint8)
            self.img_bgr = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        except CvBridgeError as e:
            print(e)

    ## 카메라로 인식한 hsv데이터에서 white/yellow 차선만 인식 후 합쳐서 self.img_lane으로 반환하는 함수
    def binarize(self, img):
        img_hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

        img_wlane = cv2.inRange(img_hsv, self.lower_wlane, self.upper_wlane)
        img_ylane = cv2.inRange(img_hsv, self.lower_ylane, self.upper_ylane)

        self.img_lane = cv2.bitwise_or(img_wlane, img_ylane)

        return self.img_lane

    ## 고도가 있는 시점 창조 함수
    def mask_roi(self, img):

        h = img.shape[0]
        w = img.shape[1]
        
        if len(img.shape)==3:

            # num of channel = 3

            c = img.shape[2]
            mask = np.zeros((h, w, c), dtype=np.uint8)

            mask_value = (255, 255, 255)

        else:
    
            # grayscale

            c = img.shape[2]
            mask = np.zeros((h, w, c), dtype=np.uint8)

            mask_value = (255)

        cv2.fillPoly(mask, self.crop_pts, mask_value)

        mask = cv2.bitwise_and(mask, img)

        return mask


    ## 입력으로 받은 이미지와 좌우 차선의 곡선 매개변수를 이용해서
    ## 왼쪽 차선은 파란색으로, 오른쪽 차선은 빨강색으로 차선을 그려주는 함수
    def draw_lane_img(self, img, leftx, lefty, rightx, righty):
        '''
        place the lidar points into numpy arrays in order to make intensity map
        \n img : source image
        \n leftx, lefty, rightx, righty : curve fitting result 
        '''
        point_np = cv2.cvtColor(np.copy(img), cv2.COLOR_GRAY2BGR)
        ## 차선 이미지를 BGR 3차원배열로 변환해서 point_np에 저장

        #Left Lane
        for ctr in zip(leftx, lefty):
        ## zip(leftx, lefty) : 리스트에서 각각 같은 인덱스에 위치한 요소를 묶어서 튜플로 만들어줌
        ## 각각의 튜플을 ctr이라는 변수에 할당하면서 반복해준다
            point_np = cv2.circle(point_np, ctr, 2, (255,0,0),-1)
            ## cv2.circle() : 배열로 저장된 이미지에 원을 그리는 함수
            ## point_np배열의 ctr위치에 반지름이 2인 파란색(255,0,0)원을 그린다.

        #Right Lane
        for ctr in zip(rightx, righty):
            point_np = cv2.circle(point_np, ctr, 2, (0,0,255),-1)
            ## point_np배열의 ctr위치에 반지름이 2인 빨강색(0,0,255)원을 그린다.

        return point_np

## 고도 높여주는 걸 실행시키는데에 필요한 클래스들
class BEVTransform:
    def __init__(self, params_cam, xb=10.0, zb=10.0):
        self.xb = xb
        self.zb = zb

        self.theta = np.deg2rad(params_cam["PITCH"])
        self.width = params_cam["WIDTH"]
        self.height = params_cam["HEIGHT"]
        self.x = params_cam["X"]
        
        self.alpha_r = np.deg2rad(params_cam["FOV"]/2)

        self.fc_y = params_cam["HEIGHT"]/(2*np.tan(np.deg2rad(params_cam["FOV"]/2)))
        self.alpha_c = np.arctan2(params_cam["WIDTH"]/2, self.fc_y)

        self.fc_x = self.fc_y
            
        self.h = params_cam["Z"] + 0.34

        self.n = float(params_cam["WIDTH"])
        self.m = float(params_cam["HEIGHT"])

        self.RT_b2g = np.matmul(np.matmul(self.traslationMtx(xb, 0, zb),    self.rotationMtx(np.deg2rad(-90), 0, 0)),
                                                                            self.rotationMtx(0, 0, np.deg2rad(180)))

        self.proj_mtx = self.project2img_mtx(params_cam)

        self._build_tf(params_cam)


    def calc_Xv_Yu(self, U, V):
        Xv = self.h*(np.tan(self.theta)*(1-2*(V-1)/(self.m-1))*np.tan(self.alpha_r)-1)/\
            (-np.tan(self.theta)+(1-2*(V-1)/(self.m-1))*np.tan(self.alpha_r))

        Yu = (1-2*(U-1)/(self.n-1))*Xv*np.tan(self.alpha_c)

        return Xv, Yu


    def _build_tf(self, params_cam):
        v = np.array([params_cam["HEIGHT"]*0.5, params_cam["HEIGHT"]]).astype(np.float32)
        u = np.array([0, params_cam["WIDTH"]]).astype(np.float32)

        U, V = np.meshgrid(u, v)

        Xv, Yu = self.calc_Xv_Yu(U, V)

        xyz_g = np.concatenate([Xv.reshape([1,-1]) + params_cam["X"],
                                Yu.reshape([1,-1]),
                                np.zeros_like(Yu.reshape([1,-1])),
                                np.ones_like(Yu.reshape([1,-1]))], axis=0)
        
        xyz_bird = np.matmul(np.linalg.inv(self.RT_b2g), xyz_g)

        xyi = self.project_pts2img(xyz_bird)

        src_pts = np.concatenate([U.reshape([-1, 1]), V.reshape([-1, 1])], axis=1).astype(np.float32)
        dst_pts = xyi.astype(np.float32)

        self.perspective_tf = cv2.getPerspectiveTransform(src_pts, dst_pts)

        self.perspective_inv_tf = cv2.getPerspectiveTransform(dst_pts, src_pts)


    def warp_bev_img(self, img):
        img_warp = cv2.warpPerspective(img, self.perspective_tf, (self.width, self.height), flags=cv2.INTER_LINEAR)
        
        return img_warp

    
    def warp_inv_img(self, img_warp):    
        img_f = cv2.warpPerspective(img_warp, self.perspective_inv_tf, (self.width, self.height), flags=cv2.INTER_LINEAR)
        
        return img_f


    def recon_lane_pts(self, img):
        if cv2.countNonZero(img) != 0:
    
            UV_mark = cv2.findNonZero(img).reshape([-1,2])

            U, V = UV_mark[:, 0].reshape([-1,1]), UV_mark[:, 1].reshape([-1,1])
            
            Xv, Yu = self.calc_Xv_Yu(U, V)

            xyz_g = np.concatenate([Xv.reshape([1,-1]) + self.x,
                                Yu.reshape([1,-1]),
                                np.zeros_like(Yu.reshape([1,-1])),
                                np.ones_like(Yu.reshape([1,-1]))], axis=0)

            xyz_g = xyz_g[:, xyz_g[0,:]>=0]

        else:
            xyz_g = np.zeros((4, 10))

        return xyz_g


    def project_lane2img(self, x_pred, y_pred_l, y_pred_r):
        xyz_l_g = np.concatenate([x_pred.reshape([1,-1]),
                                  y_pred_l.reshape([1,-1]),
                                  np.zeros_like(y_pred_l.reshape([1,-1])),
                                  np.ones_like(y_pred_l.reshape([1,-1]))
                                  ], axis=0)

        xyz_r_g = np.concatenate([x_pred.reshape([1,-1]),
                                  y_pred_r.reshape([1,-1]),
                                  np.zeros_like(y_pred_r.reshape([1,-1])),
                                  np.ones_like(y_pred_r.reshape([1,-1]))
                                  ], axis=0)

        xyz_l_b = np.matmul(np.linalg.inv(self.RT_b2g), xyz_l_g)
        xyz_r_b = np.matmul(np.linalg.inv(self.RT_b2g), xyz_r_g)

        xyl = self.project_pts2img(xyz_l_b)
        xyr = self.project_pts2img(xyz_r_b)

        xyl = self.crop_pts(xyl)
        xyr = self.crop_pts(xyr)
        
        return xyl, xyr
        

    def project_pts2img(self, xyz_bird):
        xc, yc, zc = xyz_bird[0,:].reshape([1,-1]), xyz_bird[1,:].reshape([1,-1]), xyz_bird[2,:].reshape([1,-1])

        xn, yn = xc/(zc+0.0001), yc/(zc+0.0001)

        xyi = np.matmul(self.proj_mtx, np.concatenate([xn, yn, np.ones_like(xn)], axis=0))

        xyi = xyi[0:2,:].T
        
        return xyi

    def crop_pts(self, xyi):
        xyi = xyi[np.logical_and(xyi[:, 0]>=0, xyi[:, 0]<self.width), :]
        xyi = xyi[np.logical_and(xyi[:, 1]>=0, xyi[:, 1]<self.height), :]

        return xyi


    def traslationMtx(self,x, y, z):     
        M = np.array([[1,         0,              0,               x],
                    [0,         1,              0,               y],
                    [0,         0,              1,               z],
                    [0,         0,              0,               1],
                    ])
        
        return M

    def project2img_mtx(self,params_cam):    
        '''
        project the lidar points to 2d plane
        \n xc, yc, zc : xyz components of lidar points w.r.t a camera coordinate
        \n params_cam : parameters from cameras 

        '''
        # focal lengths
        fc_x = params_cam["HEIGHT"]/(2*np.tan(np.deg2rad(params_cam["FOV"]/2)))
        fc_y = params_cam["HEIGHT"]/(2*np.tan(np.deg2rad(params_cam["FOV"]/2)))

        #the center of image
        cx = params_cam["WIDTH"]/2
        cy = params_cam["HEIGHT"]/2
        
        #transformation matrix from 3D to 2D
        R_f = np.array([[fc_x,  0,      cx],
                        [0,     fc_y,   cy]])

        return R_f

    def rotationMtx(self,yaw, pitch, roll):    
        R_x = np.array([[1,         0,              0,                0],
                        [0,         math.cos(roll), -math.sin(roll) , 0],
                        [0,         math.sin(roll), math.cos(roll)  , 0],
                        [0,         0,              0,               1],
                        ])
                        
        R_y = np.array([[math.cos(pitch),    0,      math.sin(pitch) , 0],
                        [0,                  1,      0               , 0],
                        [-math.sin(pitch),   0,      math.cos(pitch) , 0],
                        [0,         0,              0,               1],
                        ])
        
        R_z = np.array([[math.cos(yaw),    -math.sin(yaw),    0,    0],
                        [math.sin(yaw),    math.cos(yaw),     0,    0],
                        [0,                0,                 1,    0],
                        [0,         0,              0,               1],
                        ])
                        
        R = np.matmul(R_x, np.matmul(R_y, R_z))
    
        return R

## 커브길을 돌 때의 차선을 표시하는데에 필요한 클래스
class CURVEFit:    
    def __init__(
            self,
            order=3,
            alpha=10,
            lane_width=4,
            y_margin=0.5,
            x_range=5,
            dx=0.5,
            min_pts=50
            ):
        ## 값을 다 지정해줘야함
        ## 지정하지 않는 경우, 인자 개수 전달 오류가 난다.

        self.order = order
        self.lane_width = lane_width
        self.y_margin = y_margin
        self.x_range = x_range
        self.dx = dx
        self.min_pts = min_pts

        self.lane_path = Path()
        
        #TODO: (2) RANSAC Parameter 입력
        ## RANSAC : Random Sample Consensus의 약자
        ## 잡음이 포함된 데이터에서 모델 파라미터를 추정하는 데 사용되는 반복적인 알고리즘
        ## 사용자가 지정한 모델을 기반으로, 이상치에 영향을 덜 받는 추세선을 찾는다
        ## 커브길을 돌 때, 차량이 주행하는 도로의 곡률을 추정하는데에 사용됨

        # RANSAC Parameter를 결정하는 영역입니다.
        # RANSAC의 개념 및 아래 링크를 참고하여 적절한 Parameter를 입력하기 바랍니다.
        # https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.RANSACRegressor.html
        
        self.ransac_left = linear_model.RANSACRegressor(base_estimator=linear_model.Lasso(alpha=alpha),
                                                        max_trials=10,
                                                        loss='absolute_loss',
                                                        min_samples=self.min_pts,
                                                        residual_threshold=self.y_margin)
        ## linear_model.RANSACRegressor
        ## Scikit-learn 라이브러리에서 제공하는 RANSAC알고리즘을 활용하여 선형회귀모델을 추정하는데에 쓰임
        ## 5가지의 인자를 갖는다.

        ## 1. base_estimator : 모델 추정에 사용될 기본 모델, 추세선을 나타내는 회귀모델 (default: linear regression)
        ##    linear_model.RANSACRegressor : 선형회귀모델 중 Lasso모델을 지정.
        ##    Lasso : L1규제를 사용하여 모델의 가중치를 제한하는 모델
        ##    alpha : L1규제의 강도를 제어 -> 모델의 일반화능력 개선 및 과적합을 줄일 수 있다.
            
        ## 2. min_samples : 최소 샘플 수 (default: None)

        ## 3. residual_threshold : 잔차(threshold)의 최대 크기 (default: None)

        ## 4. max_trials : RANSAC 알고리즘의 최대 시도 횟수 (default: 100)
        ##    커질 경우 시간이 오래 소요됨.

        ## 5. random_state : 랜덤 시드 (default: None)

        self.ransac_right = linear_model.RANSACRegressor(base_estimator=linear_model.Lasso(alpha=alpha),
                                                        max_trials=10,
                                                        loss='absolute_loss',
                                                        min_samples=self.min_pts,
                                                        residual_threshold=self.y_margin)
        
        
        self._init_model()

    def _init_model(self):        
        X = np.stack([np.arange(0, 2, 0.02)**i for i in reversed(range(1, self.order+1))]).T
        y_l = 0.5*self.lane_width*np.ones_like(np.arange(0, 2, 0.02))
        y_r = -0.5*self.lane_width*np.ones_like(np.arange(0, 2, 0.02))

        self.ransac_left.fit(X, y_l)
        self.ransac_right.fit(X, y_r)

 
    def preprocess_pts(self, lane_pts):
        idx_list = []

        # Random Sampling
        for d in np.arange(0, self.x_range, self.dx):

            idx_full_list = np.where(np.logical_and(lane_pts[0, :]>=d, lane_pts[0, :]<d+self.dx))[0].tolist()
            
            idx_list += random.sample(idx_full_list, np.minimum(self.min_pts, len(idx_full_list)))

        lane_pts = lane_pts[:, idx_list]
        x_g = np.copy(lane_pts[0, :])
        y_g = np.copy(lane_pts[1, :])
        
        # 이전 Frame의 Fitting 정보를 활용하여 현재 Line에 대한 Point를 분류
        X_g = np.stack([x_g**i for i in reversed(range(1, self.order+1))]).T
                
        y_ransac_collect_r = self.ransac_right.predict(X_g)

        y_right = y_g[np.logical_and(y_g>=y_ransac_collect_r-self.y_margin, y_g<y_ransac_collect_r+self.y_margin)]
        x_right = x_g[np.logical_and(y_g>=y_ransac_collect_r-self.y_margin, y_g<y_ransac_collect_r+self.y_margin)]

        y_ransac_collect_l = self.ransac_left.predict(X_g)

        y_left = y_g[np.logical_and(y_g>=y_ransac_collect_l-self.y_margin, y_g<y_ransac_collect_l+self.y_margin)]
        x_left = x_g[np.logical_and(y_g>=y_ransac_collect_l-self.y_margin, y_g<y_ransac_collect_l+self.y_margin)]
        
        #1. Sampling 된 Point들의 X좌표를 활용하여 Prediction Input 생성
        #2. RANSAC을 활용하여 Prediction 수행
        #3. 결과로 나온 Y좌표가 실제 값의 Y좌표와 마진보다 작게 차이나면 Left, Right Lane Point 집합에 추가
        
        return x_left, y_left, x_right, y_right

    def fit_curve(self, lane_pts):
        # 기존 Curve를 바탕으로 Point 분류
        x_left, y_left, x_right, y_right = self.preprocess_pts(lane_pts)
        
        if len(y_left)==0 or len(y_right)==0:

            self._init_model()

            x_left, y_left, x_right, y_right = self.preprocess_pts(lane_pts)
        
        # 1. 분류된 point들의 X좌표를 활용하야 Fit Input 생성
        # 2. RANSAC Fitting 수행
        # 3. Curve Prediction에 사용할 Input 생성
        # 4. RANSAC Prediction 수행
        # 5. Fitting에 사용한 Point의 수와 Minimum samples 수를 비교하여 예외처리
        
        X_left = np.stack([x_left**i for i in reversed(range(1, self.order+1))]).T
        X_right = np.stack([x_right**i for i in reversed(range(1, self.order+1))]).T

        if y_left.shape[0]>=self.ransac_left.min_samples:
            self.ransac_left.fit(X_left, y_left)
        
        if y_right.shape[0]>=self.ransac_right.min_samples:
            self.ransac_right.fit(X_right, y_right)
            
        x_pred = np.arange(0, self.x_range, self.dx).astype(np.float32)
        X_pred = np.stack([x_pred**i for i in reversed(range(1, self.order+1))]).T
        
        y_pred_l = self.ransac_left.predict(X_pred)
        y_pred_r = self.ransac_right.predict(X_pred)

        #END

        if y_left.shape[0]>=self.ransac_left.min_samples and y_right.shape[0]>=self.ransac_right.min_samples:

            self.update_lane_width(y_pred_l, y_pred_r)

        if y_left.shape[0]<self.ransac_left.min_samples:
            
            y_pred_l = y_pred_r + self.lane_width

        if y_right.shape[0]<self.ransac_right.min_samples:

            y_pred_r = y_pred_l - self.lane_width
        
        # overlap the lane

        if len(y_pred_l) == len(y_pred_r):

            if np.mean(y_pred_l + y_pred_r):

                if y_pred_r[x_pred==3.0]>0:
                    
                    y_pred_r = y_pred_l - self.lane_width

                elif y_pred_l[x_pred==3.0]<0:
                    
                    y_pred_l = y_pred_r + self.lane_width

            else:

                pass
        
        else:

            pass

        return x_pred, y_pred_l, y_pred_r

    def update_lane_width(self, y_pred_l, y_pred_r):
        self.lane_width = np.clip(np.max(y_pred_l-y_pred_r), 3.5, 5)
    
    def write_path_msg(self, x_pred, y_pred_l, y_pred_r,frame_id='/map'):
        self.lane_path = Path()

        trans_matrix = np.array([
                                [math.cos(self.vehicle_yaw), -math.sin(self.vehicle_yaw),self.vehicle_pos_x],
                                [math.sin(self.vehicle_yaw),  math.cos(self.vehicle_yaw),self.vehicle_pos_y],
                                [0,0,1]])

        self.lane_path.header.frame_id=frame_id

        for i in range(len(x_pred)) :

            local_result=np.array([[x_pred[i]],[(0.5)*(y_pred_l[i] + y_pred_r[i])],[1]])
            global_result=trans_matrix.dot(local_result)

            tmp_pose=PoseStamped()
            tmp_pose.pose.position.x = global_result[0][0]
            tmp_pose.pose.position.y = global_result[1][0]
            tmp_pose.pose.position.z = 0
            tmp_pose.pose.orientation.x = 0
            tmp_pose.pose.orientation.y = 0
            tmp_pose.pose.orientation.z = 0
            tmp_pose.pose.orientation.w = 1
            self.lane_path.poses.append(tmp_pose)

        return self.lane_path

    def set_vehicle_status(self, vehicle_status):

        odom_quaternion=(vehicle_status.pose.pose.orientation.x,vehicle_status.pose.pose.orientation.y,vehicle_status.pose.pose.orientation.z,vehicle_status.pose.pose.orientation.w)

        _,_,vehicle_yaw=tf.transformations.euler_from_quaternion(odom_quaternion)
        self.vehicle_yaw = vehicle_yaw
        self.vehicle_pos_x = vehicle_status.pose.pose.position.x
        self.vehicle_pos_y = vehicle_status.pose.pose.position.y


if __name__ == '__main__':

    rospy.init_node('lane_fitting', anonymous=True)

    image_parser = IMGParser()

    rospy.spin() 
