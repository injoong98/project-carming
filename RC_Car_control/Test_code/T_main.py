import threading
import socket
from DC_motor import run_dc_motor
from servo_motor import run_servo_motor

# 서버 설정
HOST = 'localhost'
PORT = 12345

# 쓰레드 생성
dc_thread = threading.Thread(target=run_dc_motor, args=(0,))
servo_thread = threading.Thread(target=run_servo_motor)

# 소켓 통신 함수
def recv_data(conn):
    while True:
        data = conn.recv(1024)
        if not data:
            break
        # 데이터를 받아와 DC 모터 출력값 및 이동 방향 설정
        output = int(data.decode())
        if output == -1:
            speed = -1
        elif output == 0:
            speed = 0
        else:
            speed = 1
        # DC 모터 쓰레드에 출력값 전달
        dc_thread._args = (speed,)

# 쓰레드 실행
dc_thread.start()
servo_thread.start()

# 소켓 통신 시작
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()
    conn, addr = s.accept()
    with conn:
        print('Connected by', addr)
        recv_data(conn)
