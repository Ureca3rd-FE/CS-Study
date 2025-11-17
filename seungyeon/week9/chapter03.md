# TCP/IP 흐름제어&혼잡제어

## 사전 정의
### TCP란?
- 네트워크에서 신뢰적인 연결 방식
- TCP는 unreliable network에서 reliable network를 보장할 수 있도록 하는 프로토콜
- TCP는 network congestion avoidance algorithm을 사용

### 네 가지 문제점
1. 손실: packet이 손실될 수도 있음
2. 순서 바뀜: packet의 순서가 바뀔 수도 있음
3. congestion: 네트워크가 혼잡한 문제
4. overload: receiver가 overload 되는 문제

### 흐름제어와 혼잡제어란?
- 흐름제어(end to end)
    - 송신측과 수신측의 데이터 처리 속도 차이를 해결하기 위한 기법
    - flow control은 receiver가 packet을 지나치게 많이 받지 않도록 조절하는 것
    - 기본 개념은 receiver가 sender에게 자신의 현재 상태를 feedback한단 것
- 혼잡제어

    송신 측의 데이터 전달과 네트워크의 데이터 처리 속도 차이를 해결하기 위한 기법

### 전송 전체 과정
1. Application layer: sender application layer가 socket에 data를 작성
2. transport layer: data를 segment에 감싸고 network layer에 넘김
3. 아랫단에서 어떻게든 receiving node로 전송. 이 때 sender의 send buffer에 data 저장. receiver는 receive buffer에 data 저장.
4. application에서 준비가 되면 이 buffer에 있는 것을 읽기 시작.
- flow control의 핵심은 이 receiver buffer가 넘치지 않게 하는 것
- 따라서 receiver는 RWND(Receive WiNDow): receive buffer의 남은 공간을 홍보

## 흐름 제어
1. 송신 측의 속도가 빨라 수신 측에서 제한된 저장 용량을 초과하여 데이터를 보내면 데이터가 손실됨.
2. 손실된 만큼 불필요한 응답과 데이터 전송이 빈번이 발생.
3. 이런 위험을 줄이기 위해 송신 측 데이터 전송량을 수신측에 따라 조절 필요.

### 해결 방법
- Stop and Wait: 매번 전송한 패킷에 대해 확인 응답을 받아야만 다음 패킷을 전송
- Sliding Window: 수신 측에서 설정한 윈도우 크기만큼 송신 측에서 확인 응답 없이 세그먼트를 전송
    - 윈도우에 포함되는 모든 패킷을 전송하고 그 패킷의 전달이 확인되는대로 윈도우를 옆으로 옮겨 다음 패킷들을 전송
    - 호스트들은 송신용, 수신용 2개의 window를 가지고 있다. 데이터를 보내기 전에 3 way handshake에서 수신용 window size에 송신용 window size를 맞춘다.


## 혼잡 제어
1. 데이터는 지역망이나 인터넷으로 연결된 대형 네트워크를 통해 전달된다. 한 라우터에 데이터가 몰릴 경우, 자신에게 온 데이터를 모두 처리할 수 없게 된다.
2. 이런 경우 호스트들은 다시 재전송을 하게 되고 혼잡을 가중시켜 오버플로우나 데이터 손실을 발생시키게 된다.
3. 네트워크 혼잡을 피하기 위해 송신 측에서 보내는 데이터의 전송 속도를 강제로 줄임. =혼잡 제어
- 흐름제어가 송수신 사이 전송 속도를 다룬다면 혼잡제어는 호스트와 라우터를 포함한 넓은 관점에서 전송 문제를 다룸.
### 해결 방법
- AIMD
    - 패킷을 하나씩 보내고 문제없이 도착하면 window 크기(단위 시간 내에 보내는 패킷의 수)를 1씩 증가시키며 전송하는 방법
    - 전송에 실패하거나 일정 시간을 넘으면 패킷 전송 속도를 절반으로 줄임
- Slow Start
    - AIMD와 마찬가지로 패킷을 하나씩 보내며 시작, 문제없이 도착하면 각각의 ACK 패킷마다 window size를 1씩 늘림. (한 주기가 지나면 window size가 2배가 됨)
    - 혼잡 현상이 발생했던 window size의 절반까진 지수 함수 꼴로 크기 증가, 이후부턴 완만하게 1씩 증가.
- Fast Retransmit
    - TCP의 혼잡 조절에 추가된 정책
    - 먼저 도착해야할 패킷이 도착하지 않고 다음 패킷이 도착해도 ACK 보냄.
    - 잘 도착한 마지막 패킷의 다음 패킷 순번을 ACK 패킷에 실어 보내므로 중간에 하나가 손실되면 송신 측에선 중복된 ACK 패킷을 받게 된다. 이걸 감지하는 순간 문제가 되는 순번의 패킷을 재전송.
    - 중복된 순번의 패킷을 3개 받으면 혼잡을 감지하고 window size를 줄여 재전송한다.
- Fast Recovery
    - 혼잡 상태가 되면 window size를 1로 줄이지 않고 반으로 줄인 뒤 선형으로 증가시키는 방법.
    - 혼잡 상황을 한 번 겪고 나서부턴 AIMD 방식으로 동작하는 셈.

## 참고 자료
- [TCP/IP (흐름제어/혼잡제어)](https://gyoogle.dev/blog/computer-science/network/%ED%9D%90%EB%A6%84%EC%A0%9C%EC%96%B4%20&%20%ED%98%BC%EC%9E%A1%EC%A0%9C%EC%96%B4.html)