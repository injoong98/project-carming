#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import rospy
from morai_msgs.msg import CtrlCmd, CollisionData, EgoVehicleStatus, EventInfo
from morai_msgs.srv import MoraiEventCmdSrv
from enum import Enum

import redis

redis_client = redis.Redis(host='j8a408.p.ssafy.io', port=6379, db=0, password='carming123')

class Gear(Enum):
    P = 1 # 주차
    R = 2 # 후진
    N = 3 # 중립
    D = 4 # 주행

class s_drive():
    def __init__(self):
        rospy.init_node('collision_avoid', anonymous=True)
        
        # publisher
        self.cmd_pub = rospy.Publisher('/ctrl_cmd', CtrlCmd, queue_size=1)



        # subscriber
        rospy.Subscriber('/CollisionData', CollisionData, self.collision_callback)
        rospy.Subscriber('/Ego_topic', EgoVehicleStatus, self.ego_callback)

        # service
        rospy.wait_for_service('/Service_MoraiEventCmd')
        self.event_cmd_srv = rospy.ServiceProxy('Service_MoraiEventCmd', MoraiEventCmdSrv)

        self.rate = rospy.Rate(10)

        self.is_collision = False
        self.ego_status = EgoVehicleStatus()

        # 처음에 auto_mode , drive gear로 세팅
        self.send_gear_cmd(Gear.D.value)

        while not rospy.is_shutdown():
            if(self.is_collision):
                # 충돌 발생시 기어-> 후진
                self.send_gear_cmd(Gear.R.value)
                # 레디스에 저장
                redis_client.set('current_gear', Gear.R.value)
                # 2초간 조향 0.4rad값과 차속 10kph 입력
                # 0.1 * 20 = 2
                for _ in range(20):
                    self.send_ctrl_cmd(0.4, 10)
                    self.rate.sleep()
                    
                # 이후 전진기어
                self.send_gear_cmd(Gear.D.value)
                # 레디스에 저장
                redis_client.set('current_gear', Gear.D.value)

                

            else:
                self.send_ctrl_cmd(0, 10)
                self.rate.sleep()
                
            self.send_gear_cmd(Gear.D.value)
            
            

    # 충돌 메시지 콜백 함수
    def collision_callback(self, data):
        if(len(data.collision_object) > 0):
            self.is_collision = True
        else:
            self.is_collision = False

    # EGO 차량 상태 정보 콜백 함수
    def ego_callback(self, data):
        print(self.ego_status.velocity.x)
        self.ego_status = data

    # 기어 변경 이벤트 메시지 세팅 함수
    def send_gear_cmd(self, gear_mode):
        # 기어 변경이 제대로 되기 위해서는 차량 속도가 약 0 이어야함
        while( abs(self.ego_status.velocity.x) > 0.1):
            self.send_ctrl_cmd(0,0)
            self.rate.sleep()
        
        gear_cmd = EventInfo()
        gear_cmd.option = 3
        gear_cmd.ctrl_mode = 3
        gear_cmd.gear = gear_mode
        gear_cmd_resp = self.event_cmd_srv(gear_cmd)
        # 레디스에 저장
        redis_client.set('current_gear', gear_cmd.gear)
        # rospy.loginfo(gear_cmd)

    # ctrl_cmd 메시지 세팅 함수
    def send_ctrl_cmd(self, steering ,velocity):
        cmd = CtrlCmd()
        if(velocity > 0):
            cmd.longlCmdType = 2
            cmd.velocity = velocity
            cmd.steering = steering
        else:
            cmd.longlCmdType = 1
            cmd.brake = 1
            cmd.steering = 0
        self.cmd_pub.publish(cmd)


if __name__ == '__main__':
    try:
        s_d = s_drive()
    except rospy.ROSInterruptException:
        pass


