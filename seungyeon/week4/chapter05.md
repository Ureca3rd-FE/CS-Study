# 시스템 콜
=시스템 호출=시스콜

응용 프로그램은 직접 자원을 사용(시스템 호출)할 수 없으며, OS가 제공하는 인터페이스를 통해서만 자원을 사용할 수 있다. OS가 응용 프로그램의 요청에 따라 커널에 접근하도록 제공하는 인터페이스를 시스템 콜이라고 한다.

보통 직접적으로 시스템콜을 사용하기보단 API(라이브러리 함수)를 통해 사용한다.

## 시스템 콜 종류
### 1. 프로세스 제어 Process Control
- 끝내기 exit, 중지 abort
- 적재 load, 실행 execute
- 프로세스 생성 fork
- 프로세스 속성 획득/설정
- 시간 대기 wait time
- 사건 대기 wait event
- 사건 알림 signal event
- 메모리 할당 및 해제
### 2. 파일 조작 File Manipulation
- 파일 생성/삭제
- 열기/닫기/읽기/쓰기
- 위치 변경 reposition
- 파일 속성 획득/설정
### 3. 장치 관리 Device Manipulation
- 하드웨어의 제어와 상태 정보를 얻음 ioctl
- 장치 요구, 장치 방출
- 읽기, 쓰기, 위치 변경
- 장치 속성 획득 및 설정
- 장치의 논리적 부착 및 분리
### 4. 정보 유지 Infromation Maintenance
- getpid, alarm, sleep
- 시간과 날짜의 설정과 획득 time
- 시스템 데이터의 설정과 획득 date
- 프로세스 파일, 장치 속성의 획득 및 설정
### 5. 통신 Communication
- pipe, shm_open, mmap
- 통신 연결의 생성, 제거
- 메시지의 송신, 수신
- 상태 정보 전달
- 원격 장치의 부착 및 분리
### 6. 보호 Protection
- chmod
- umask
- chown

## 참고 자료
- [시스템 호출](https://ko.wikipedia.org/wiki/%EC%8B%9C%EC%8A%A4%ED%85%9C_%ED%98%B8%EC%B6%9C)
- [[운영체제] 운영체제(OS), 시스템 콜(System Call)](https://brightstarit.tistory.com/13#%EC%8B%9C%EC%8A%A4%ED%85%9C%20%EC%BD%9C(system%20call)-1)