#!/usr/bin/env python
#-*- coding:utf-8 -*-
import RPi.GPIO as GPIO

class DC_MOTOR:
    
    def __init__(self, enable, input_1, input_2):
        
        try:

            # GPIO 초기화
            GPIO.setmode(GPIO.BCM)
        
            GPIO.setup(enable,GPIO.OUT)
            GPIO.setup(input_1, GPIO.OUT)
            GPIO.setup(input_2, GPIO.OUT)
        
            self.pwm = GPIO.PWM(enable, 100)
            self.enable = enable
            self.input_1 = input_1
            self.input_2 = input_2
            self.error = 0
            
            self.pwm.start(0)
                    
        except Exception as e:
            self.error = 1
            print('DC MOTOR ERROR :', e)

    def motor_control(self, speed, stat):
        
        speed = 100
        high = 1
        low = 0
        
        stop = 0
        go = 1

        
        try:
            self.pwm.ChangeDutyCycle(speed)

            if stat == go:
                GPIO.output(self.input_1, high)
                GPIO.output(self.input_2, low)

            elif stat == stop:
                GPIO.output(self.input_1, low)
                GPIO.output(self.input_2, low)
        
        except:
            print('DC_motor.motor_control Error')
    
    ## 차량의 속도로 주행/정지 상태를 판단해서 그에 맞게 주행해야 함.
    def drive(self, speed):
        
        stop = 0
        go = 1
        
        try:
            if (speed > 0):
                self.motor_control(speed, go)
        
            elif (speed == 0):
               self. motor_control(speed, stop)
        
                
        except:
            print('DC_MOTOR.drive Error')
        