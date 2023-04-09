import serial
import time

ser = serial.Serial('/dev/ttyACM0', 9600, exclusive=True)

while True:
    num = int(input("Enter a number (1, 2, or 3): "))
    ser.write(num.to_bytes(1, 'little'))
    time.sleep(0.1)

ser.close()

