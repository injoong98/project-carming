import RPi.GPIO as GPIO
import time

# 서보 모터 핀 설정
servo_pin = 17

# GPIO 초기화
GPIO.setmode(GPIO.BCM)
GPIO.setup(servo_pin, GPIO.OUT)

# 서보 모터 제어 함수
def run_servo_motor():
    # 서보 모터 PWM 설정
    pwm = GPIO.PWM(servo_pin, 50) # 주파수 50Hz로 설정
    pwm.start(0)
    
    while True:
        # 서보 모터를 왼쪽으로 90도 회전
        pwm.ChangeDutyCycle(2.5)
        time.sleep(1)
        
        # 서보 모터를 오른쪽으로 90도 회전
        pwm.ChangeDutyCycle(12.5)
        time.sleep(1)
        
        # 서보 모터를 중앙으로 90도 회전
        pwm.ChangeDutyCycle(7.5)
        time.sleep(1)
