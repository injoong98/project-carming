import time
import RPi.GPIO as GPIO

class DC_MOTOR:
    
    def __init__(self, enable, input_1, input_2):
        
        try:
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
        
        high = 1
        low = 0
        
        stop = 0
        forward = 1
        backward = 2
        
        try:
            self.pwm.ChangeDutyCycle(speed)

            if stat == forward:
                GPIO.output(self.input_1, high)
                GPIO.output(self.input_2, low)

            elif stat == backward:
                GPIO.output(self.input_1, low)
                GPIO.output(self.input_2, high)

            elif stat == stop:
                GPIO.output(self.input_1, low)
                GPIO.output(self.input_2, low)
        
        except:
            print('DC_motor.motor_control Error')
    
    def drive(self, drive_status, drive_time):
        
        stop = 0
        forward = 1
        backward = 2
        speed = 100
        
        try:
            if (drive_status == forward):
                self.motor_control(speed, forward)
        
            elif (drive_status == stop):
               self. motor_control(0, stop)
        
            elif (drive_status == backward):
                self.motor_control(speed, backward)
                
            time.sleep(drive_time)
            
            self.motor_control(0, stop)
                
        except:
            print('DC_MOTOR.drive Error')
            
# DC모터 핀 번호 설정
enable = 27
input_1 = 15
input_2 = 18

# DC모터 객체 생성
motor = DC_MOTOR(enable, input_1, input_2)

# 주행 시간 설정
drive_time = 3  # 3초간 주행

# 전진 상태로 주행 시작
motor.drive(1, drive_time)

# 모터 정지
motor.drive(0, 0)

# 핀 설정 초기화
GPIO.cleanup()