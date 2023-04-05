#!/usr/bin/env python
# -*- coding:utf-8 -*-

import redis


# ROS
import rospy
# message import
from morai_msgs.msg import EgoVehicleStatus
from morai_msgs.srv import MoraiEventCmdSrv

## Redis 클라이언트 객체 생성
## port와 password 인자를 사용하여 서버 연결 정보 지정
## db는 데이터베이스 번호, 기본값은 0
redis_client = redis.Redis(host='j8a408.p.ssafy.io', port=6379, db=0, password='carming123')


class get_Ego_Status:
    def __init__(self):
        ## Redis 노드 생성
        ## Ego_topic관련 데이터 받아오기

        self.Ego_status_callback = rospy.Subscriber("/Ego_topic", EgoVehicleStatus, self.Ego_callback)

        self.current_acceleration = 0
        self.current_brake = 0
        self.current_position_x = 0
        self.current_position_y = 0
        self.current_velocity_x = 0
        self.gear = 0
        self.is_Ego_data_received = False

        rate = rospy.Rate(1)  # 1 times / 1 sec
        while not rospy.is_shutdown():
            if self.is_Ego_data_received == True:
                print("Ego_data was just written to Redis_storage")

                ## 데이터 저장하기
                redis_client.set('current_acceleration', self.current_acceleration)
                redis_client.set('current_brake', self.current_brake)
                redis_client.set('current_position_x', self.current_position_x)
                redis_client.set('current_position_y', self.current_position_y)
                redis_client.set('current_velocity', self.current_velocity_x)
		redis_client.set('wheel_angle', self.wheel_angle)

            else:
                print("waiting for Ego data...")
            ## 루프의 실행을 지연시키는 역할
            ## 이 코드는 노드가 작동하는 동안 일정한 속도로 루프가 실행되도록 설정
            rate.sleep()

    ## 에고 데이터를 ros통신을 통해 받아와서 변수에 값 저장
    def Ego_callback(self, Ego_data):
        # print(self.current_velocity_x )
        self.is_Ego_data_received = True
        ## 시뮬레이터상에서 나타나는 속도 단위는 km/h
        ## ros를 통해 받는 속도 단위는 m/s
        ## 최대값을 60 / 커브에서는 50 - skeleton2 velocity_planning 함수 확인
        self.current_velocity_x = Ego_data.velocity.x
        self.current_acceleration = Ego_data.acceleration.x
        ## brake잡은 경우 1 안잡은 경우 0
        self.current_brake = Ego_data.brake
        self.current_position_x = Ego_data.position.x
        self.current_position_y = Ego_data.position.y
        if self.current_brake == 1:
            print('brake')

    def Ego_gear_callback(self, gear):
        self.gear = gear.gear


## 연결 종료
redis_client.close()

if __name__ == '__main__':
    rospy.init_node("Ego_status_to_Redis", anonymous=True)
    ros_node = get_Ego_Status()
    ## 하나만 데이터 불러오기
    ## value = redis_client.get('current_acceleration')
    ## 여러 키에 대해 데이터 가져오기

    rospy.spin()
