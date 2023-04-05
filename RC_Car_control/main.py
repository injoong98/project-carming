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
import tts
import serial

ser = serial.Serial('/dev/ttyACM0', 9600, exclusive=True)

class main():
    def __init__(self):
        # DC_MOTOR 객체 생성
        self.dc_motor = DC_MOTOR(enable, input_1, input_2)
        self.servo_motor = SERVO_MOTOR(servo_pin)

    ## redis에서 데이터 확인
    def run(self):
        redis_client = redis.StrictRedis(host='j8a408.p.ssafy.io', port=6379, db=0, password='carming123')
        
        door_flag = 0
	start_flag = 0
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
                num = 2
                ser.write(num.to_bytes(1, 'little'))
                time.sleep(0.1)
                self.servo_motor.steering(-1)

            elif wheel_angle == b'36.25':
                num = 3
                ser.write(num.to_bytes(1, 'little'))
                time.sleep(0.1)
                self.servo_motor.steering(1)

            elif wheel_angle == b'0.0':
                num = 1
                ser.write(num.to_bytes(1, 'little'))
                time.sleep(0.1)
                self.servo_motor.steering(0)

        
            ## 정지 b'1.0' 형태로 출력
            current_brake = redis_client.get('current_brake')
            ## destination = redis_client.get('destination')
            get_in = redis_client.get('get_in')
            is_destination = redis_client.get('is_destination')
            
            ## 탑승 완료
            if get_in == '1' and start_flag == 0:
                tts.synthesize_text("안전벨트를 매주세요!... 출발하겠습니다~")
                start_flag = 1
                ## 주행 시작하면서 문열림 flag 초기화
                door_flag = 0
            
            ## 문열림 한 번만 하기 위해서 flag 사용
            if is_destination == '1' and door_flag == 0:
                tts.synthesize_text("목적지에 도착하였습니다. 하차 준비를 하세요~")
                door_flag = 1
                # 1분뒤에 문열림
                time.sleep(60)
                openclose()
                
            time.sleep(0.1)
            
            
            self.dc_motor.drive(speed)  # DC_MOTOR 객체의 drive 함수 호출
            
            

            ## 조향 자체가 어떻게 찍히는 지 확인해서 dutycycle 변수 입력
            ##SERVO_MOTOR.steering(dutycycle)


if __name__ == "__main__":

    ## dc모터 핀 번호
    input_1 = 23
    input_2 = 24
    enable = 27

    ## servo모터 핀 번호
    servo_pin = 17

    main = main()
    main.run()

