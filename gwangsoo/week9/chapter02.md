# [TCP] 3-Way Handshake & 4-Way Handshake

TCP는 **신뢰성 있는 연결 지향형 프로토콜**이기 때문에 데이터 전송 전에 연결을 수립(3-Way Handshake), 전송 후에는 연결을 정상적으로 종료(4-Way Handshake)하는 절차를 거친다.

## 1. 3-Way Handshake (연결 성립 과정)

TCP 통신을 시작하기 위해 **클라이언트 ↔ 서버 간 논리적 연결을 수립**하는 과정이다.

![TCP-connection-1](./assets/TCP-connection-1.png)

1. **SYN(Sequence = x)**  
   클라이언트가 서버에 연결 요청(SYN) 전송

2. **SYN + ACK(Seq = y, Ack = x+1)**  
   서버가 요청을 받아들이고 응답(SYN+ACK) 전송

   - ACK: 클라이언트 SYN(x) 잘 받았다
   - SYN: 서버도 연결을 시작하겠다

3. **ACK(Ack = y+1)**  
   클라이언트가 서버 SYN(y)에 대한 확인 ACK 응답 전송

이 3단계를 거치면 연결이 성립된다.

## 2. 4-Way Handshake (연결 해제 과정)

데이터 송수신이 끝나면 **클라이언트와 서버가 서로 연결을 종료**하는 절차이다.

![4-way-handshake](./assets/4-way-handshake.png)

1. **FIN 전송**  
   클라이언트 → 서버  
   “나 이제 보낼 거 없어”

2. **ACK 전송 (서버는 CLOSE_WAIT)**  
   서버 → 클라이언트  
   “알겠어, 근데 난 아직 보낼 데이터가 있어”

3. **서버의 FIN 전송**  
   모든 데이터 전송을 마친 서버가 FIN 전송  
   “나도 이제 끝!”

4. **클라이언트 ACK 전송 (TIME_WAIT)**  
   클라이언트가 마지막 ACK 전송
   - 아직 도착하지 않은 패킷이 있을 수 있어 일정 시간 대기
   - 이후 소켓 종료

서버도 ACK를 받고 소켓을 닫는다.
