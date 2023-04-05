import RPi.GPIO as GPIO
import time

servo_pin = 17

GPIO.setmode(GPIO.BCM)
GPIO.setup(servo_pin, GPIO.OUT)

pwm = GPIO.PWM(servo_pin, 50)
pwm.start(0)

try:
    while True:
        # 0도 (2.5% 듀티 사이클)
        pwm.ChangeDutyCycle(5.5)
        time.sleep(1)

        # 90도 (7.5% 듀티 사이클)
        pwm.ChangeDutyCycle(7.75)
        time.sleep(1)

        # 180도 (12.5% 듀티 사이클)
        pwm.ChangeDutyCycle(9)
        time.sleep(1)

except KeyboardInterrupt:
    pwm.stop()

GPIO.cleanup()
