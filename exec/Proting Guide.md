# 1. Docker 설치(Ubuntu 20.04 LTS)

---

## 기존에 설치된 Docker 삭제

```bash
$ sudo apt-get remove docker docker-engine docker.io containerd runc
```

## Repository 설정

- Repository를 이용하기 위한 패키지 설치

```bash
# 1. apt 패키지 매니저 업데이트
$ sudo apt-get update

# 2. 패키지 설치
$ sudo apt-get install ca-certificates curl gnupg lsb-release

# 3. Docker 공식 GPG Key 등록
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 4. Stable Repository 등록
$ echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

## Docker 엔진 설치

```bash
#  패키지 매니저 최신화
$ sudo apt-get update
$ sudo apt-get upgrade

# Docker 엔진 설치
$ sudo apt-get install docker-ce docker-ce-cli containerd.io
```

# 2. Nginx 설정

---

## **Nginx 설치**

```bash
sudo apt update
sudo apt install nginx
```

## 방화벽 설정

- 방화벽 설정값 확인
    
    ```bash
    sudo ufw app list
    ```
    
- http(80), https(443) 방화벽 허용
    
    ```bash
    sudo ufw allow 'Nginx Full'
    ```
    
- 방화벽 가동
    
    ```bash
    sudo ufw enable
    ```
    

## SSL/TLS 접속을 위한 인증서 발급

- 인증서를 간단하게 발급/갱신하는 패키지 설치
    
    ```bash
    sudo snap install --classic certbot
    ```
    
- certbot을 활용하여 인증서 발급(내부적으로 Let’s encrypt를 거쳐 인증서를 발급해줌)
    
    ```bash
    sudo certbot --nginx
    
    ## nginx config file 을 만들지 않고 ssl file 만 필요한 경우
    sudo certbot certonly --nginx
    ```
    
- /etc/nginx/sites-available 에서 생성된 설정파일 확인
    
    ```bash
    server{
    
        listen 443 ssl; # managed by Certbot
        server_name j8a408.p.ssafy.io;
    
        ssl_certificate /etc/letsencrypt/live/j8a408.p.ssafy.io/fullchain.pem; # managed by Certbot
        ssl_certificate_key /etc/letsencrypt/live/j8a408.p.ssafy.io/privkey.pem; # managed by Certbot
        
        include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
    
    }
    
    server{
        if ($host = j8a408.p.ssafy.io) {
            return 301 https://$host$request_uri;
        } # managed by Certbot
    
    	listen 80;
    	server_name j8a408.p.ssafy.io;
    	return 404; # managed by Certbot
    
    }
    ```
    
    ```bash
    server{
    
        listen 443 ssl; # managed by Certbot
        server_name j8a408.p.ssafy.io;
    
        ssl_certificate /etc/letsencrypt/live/j8a408.p.ssafy.io/fullchain.pem; # managed by Certbot
        ssl_certificate_key /etc/letsencrypt/live/j8a408.p.ssafy.io/privkey.pem; # managed by Certbot
        
        include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
    
    }
    
    server{
        if ($host = j8a408.p.ssafy.io) {
            return 301 https://$host$request_uri;
        } # managed by Certbot
    
    	listen 80;
    	server_name j8a408.p.ssafy.io;
    	return 404; # managed by Certbot
    
    }
    ```
    

## 포트포워딩 설정

- FE 서버와 BE 서버, Openvidu 서버에 각각 할당할 포트를 정한 뒤 URL로 매핑
    - BE 서버 → 5000
    
    ```bash
    # /etc/nginx/sites-available/default
    
    server{
    
    	...
    
    	# BE 서버
    	location /api {
    	
    		proxy_pass http://localhost:5000;	
    
    	}
    	...
    
    }
    ```
    

# 3. BE 서버 배포

---

## JDK 설치(zulu 11.0.18+10)

```bash
# zulu 11버전 jdk 설치
sudo apt install zulu11-jdk

# jdk 설치 확인
java -version
```

## BE 소스코드 빌드

- BE 프로젝트 디렉토리로 이동

```bash
cd carming-back-end
```

- Gradle 빌드

```bash
# gradlew에 권한 추가
chmod +x gradlew

# 캐시 초기화 & 빌드 진행
./gradlew clean build
```

## Docker 이미지 빌드

- Dockerfile 작성

```bash
# 빈 Dockerfile 생성
touch Dockerfile

# Dockerfile 편집 모드로 열기 
vi Dockerfile
```

```docker
## Dockerfile 작성 내용 ##

# zulu JDK 공식 도커이미지 11.0.18 버전 가져오기
FROM azul/zulu-openjdk:11.0.18

# 5000번 포트 노출
EXPOSE 5000

# 빌드후 생성된 jar 파일을 컨테이너 내부에 복사
COPY /build/libs/carming-0.0.1-SNAPSHOT.jar app.jar

# jar 파일 실행(= BE 서버 실행)
ENTRYPOINT ["java", "-jar", "app.jar"]
```

## Docker compose 파일 작성

```yaml
version: "3.7"

services:
  carming-back-end:
    container_name: carming-back-end-server
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - 5000:5000
    restart: always
```

## Docker 이미지 빌드 & 컨테이너 실행

```bash
docker-compose up -d --build
```

# 4. Redis 컨테이너 실행

---

## Docker compose 파일 작성

```bash
version: "3.7"

services:
  redis-server:
    image: redis:latest
    container_name: redis-server
    volumes:
      - ./data:/data
      - ./redis.conf:/usr/local/etc/redis/redis.conf
    network_mode: host
    command: redis-server /usr/local/etc/redis/redis.conf
```

## Redis 설정 파일 작성

```bash
# 포트번호 설정
port 6379

# AOF 를 통해 failover 된 레디스 노드 재 시작시 이전 데이터를 다시 로드해 올 수 있습니다.
appendonly yes

# 패스워드 설정
requirepass carming123
```

## Docker 컨테이너 실행

```bash
docker-compose up -d
```

# 5. MySQL 컨테이너 실행

---

## Docker compose 파일 작성

```bash
version: "3"

services:
  db:
    image: mariadb:10
    ports:
      - 3306:3306
    volumes:
      - ./db/conf.d:/etc/mysql/conf.d
      - ./db/data:/var/lib/mysql
      - ./db/initdb.d:/docker-entrypoint-initdb.d
    env_file: .env
    environment:
      TZ: Asia/Seoul
    networks:
      - backend
    restart: always

networks:
  backend:
```

## 디렉토리 및 설정파일 생성

- `docker-compose.yml` 파일이 위치한 디렉토리에 `db`라는 빈 디렉토리 생성
    - `db` 디렉토리 하위에 `conf.d`, `data`, `initdb.d` 디렉토리 생성
- `initdb.d`에 빈 `create_table.sql`, `load_data.sql` 파일 생성
    - `create_table.sql` ⇒ 테이블 정의 쿼리 작성
    - `load_data.sql` ⇒ 초기 데이터 insert 쿼리 작성
- `.env` 파일에 계정정보 설정
    
    ```jsx
    MYSQL_HOST=localhost
    MYSQL_PORT=3306
    MYSQL_ROOT_PASSWORD=root!
    MYSQL_DATABASE=students
    MYSQL_USER=inti
    MYSQL_PASSWORD=inti1234
    ```
    

## Docker 컨테이너 실행

```bash
docker-compose up -d
```

# 6. 가상환경 구축

---

### Virtual Machine : Ubuntu 18.04.6 LTS 설치

### ROS패키지 설치

```bash
$ sudo apt update
$ sudo apt upgrade
$ sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release
-sc) main" > /etc/apt/sources.list.d/ros-latest.list'
$ sudo apt install curl
$ curl -s https://raw.githubusercontent.com/ros/rosdistro/master/ros.asc
| sudo apt-key add -
$ sudo apt update
$ sudo apt install ros-melodic-desktop-full
$ sudo apt-get install python-rosdep
$ sudo rosdep init
$ rosdep update
$ echo "source /opt/ros/melodic/setup.bash" >> ~/.bashrc
$ source ~/.bashrc
$ sudo apt install python-rosinstall python-rosinstall-generator pythonwstool build-essential
```

### MORAI 메세지 파일 다운

```bash
$ cd ~/
$ mkdir -p catkin_ws
$ catkin_make
$ cd ~/catkin_ws
$ source ~/catkin_ws/devel/setup.bash
$ rospack profile
```

### Rosbridge 및 기타 종속 패키지 설치

```bash
$ sudo apt-get install python-pip
$ sudo apt-get install net-tools
$ sudo apt-get install ros-melodic-rosbridge-server
$ sudo apt-get install ros-melodic-velodyne
$ sudo apt install terminator
$ mkdir -p catkin_ws/src
$ pip install pyproj
$ pip install scikit-learn
$ cd ~/catkin_ws
$ catkin_make
```
