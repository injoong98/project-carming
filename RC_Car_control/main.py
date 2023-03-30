import time
import threading
import os
import sys
import socket
import RPi.GPIO as GPIO
from Door_ServoMotor import openclose
from DC_motor import DC_MOTOR
from servo_motor import SERVO_MOTOR
import redis
import re

class main():
    def __init__(self):
        # DC_MOTOR 객체 생성
        self.dc_motor = DC_MOTOR(enable, input_1, input_2)
        self.servo_motor = SERVO_MOTOR(servo_pin)

    ## redis에서 데이터 확인
    def run(self):
        redis_client = redis.StrictRedis(host='j8a408.p.ssafy.io', port=6379, db=0, password='carming123')
        while True:
            ## 속도 b'1.4650933742523193' 형태로 출력
            current_velocity = redis_client.get('current_velocity')
            speed = re.findall(b'\d+', current_velocity)[0]  ### 정규식으로 바이트 문자열에서 숫자만 추출
            speed = 5 * int(speed)  ## 모터의 출력율로 변환 (대충 20이하의 값이 나오므로 5배 처리)

            wheel_angle = redis_client.get('wheel_angle')
            ## 왼쪽 b'-36.25'
            ## 오른쪽 b'36.25'
            ## 직진 b'0.0'
            if wheel_angle == b'-36.25':
                self.servo_motor.steering(-1)
            elif wheel_angle == b'36.25':
                self.servo_motor.steering(1)
            elif wheel_angle == b'0.0':
                self.servo_motor.steering(0)
        
            ## 정지 b'1.0' 형태로 출력
            current_brake = redis_client.get('current_brake')
            ## destination = redis_client.get('destination')
            current_gear = redis_client.get('current_gear')
            print('current_gear : ', current_gear)

            time.sleep(0.1)
            
            self.dc_motor.drive(speed)  # DC_MOTOR 객체의 drive 함수 호출
            
            

            ## 조향 자체가 어떻게 찍히는 지 확인해서 dutycycle 변수 입력
            ##SERVO_MOTOR.steering(dutycycle)

            ## 시뮬레이터상에터 brake 동작한 경우 문열림, 문닫힘 구현
            if current_gear == b'1':
                openclose()


if __name__ == "__main__":

    ## dc모터 핀 번호
    input_1 = 23
    input_2 = 24
    enable = 27

    ## servo모터 핀 번호
    servo_pin = 17

    main = main()
    main.run()