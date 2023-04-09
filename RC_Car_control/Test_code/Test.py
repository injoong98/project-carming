import RPi.GPIO as GPIO
import time
import threading

# DC 모터 핀 설정
DC_pin1 = 17
DC_pin2 = 18

# 서보 모터 핀 설정
servo_pin = 12

# GPIO 초기화
GPIO.setmode(GPIO.BCM)
GPIO.setup(DC_pin1, GPIO.OUT)
GPIO.setup(DC_pin2, GPIO.OUT)
GPIO.setup(servo_pin, GPIO.OUT)

# DC 모터 제어 함수
def run_dc_motor():
    while True:
        # DC 모터를 전진으로 회전
        GPIO.output(DC_pin1, GPIO.HIGH)
        GPIO.output(DC_pin2, GPIO.LOW)
        time.sleep(1)
        
        # DC 모터를 정지
        GPIO.output(DC_pin1, GPIO.LOW)
        GPIO.output(DC_pin2, GPIO.LOW)
        time.sleep(1)
        
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

# 쓰레드 생성 및 실행
dc_thread = threading.Thread(target=run_dc_motor)
servo_thread = threading.Thread(target=run_servo_motor)

dc_thread.start()
servo_thread.start()
