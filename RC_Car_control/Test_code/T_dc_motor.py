import RPi.GPIO as GPIO
import time

# DC 모터 핀 설정
DC_pin1 = 15
DC_pin2 = 18

# GPIO 초기화
GPIO.setmode(GPIO.BCM)
GPIO.setup(DC_pin1, GPIO.OUT)
GPIO.setup(DC_pin2, GPIO.OUT)

# DC 모터 제어 함수
def run_dc_motor(speed):
    while True:
        # speed 값에 따라 DC 모터 속도 조절
        if speed > 0:
            GPIO.output(DC_pin1, GPIO.HIGH)
            GPIO.output(DC_pin2, GPIO.LOW)
            time.sleep(abs(speed))
        elif speed < 0:
            GPIO.output(DC_pin1, GPIO.LOW)
            GPIO.output(DC_pin2, GPIO.HIGH)
            time.sleep(abs(speed))
        else:
            GPIO.output(DC_pin1, GPIO.LOW)
            GPIO.output(DC_pin2, GPIO.LOW)
            time.sleep(1)