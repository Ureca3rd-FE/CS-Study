# Blocking I/O & Non-Blocking I/O

## Blocking I/O

I/O Blocking 형태의 작업

1. Process(Thread)가 Kernel에 I/O를 요청하는 함수 호출
2. Kernel이 작업을 완료하면 작업 결과를 반환

### 특징

- I/O 작업이 진행되는 동안 user Process(Thread)는 자신의 작업을 중단한 채 대기
- Resource 낭비 심함(I/O작업이 CPU 자원을 거의 쓰지 않으므로)

여러 클라이언트가 접속하는 서버를 Blocking 방식으로 구현할 경우

- I/O 작업을 진행하는 작업 중지
- 다른 Client가 진행중인 작업을 중지하면 안 되므로 client 별로 별도의 Thread 생성
- 접속자 수 많아짐
- Thread가 많아져 Context Switching 횟수 증가 => 비효율적

## Non-Blocking I/O

I/O 작업이 진행되는 동안 User Process의 작업을 중단하지 않음

진행 순서

1. User Process가 recvfrom 함수 호출(커널에게 해당 Socket으로부터 data를 받고 싶다고 요청)
2. Kernel은 이 요청에 대해 곧바로 recvBuffer를 채워 보내지 못하므로 "EWOULDBLOCK"을 return
3. Blocking 방식과 달리 User Process는 다른 작업 진행 가능
4. recvBuffer에 user가 받을 수 있는 데이터가 있는 경우, Buffer로부터 데이터를 복사하여 받아옴
   > recvBuffer는 Kernel이 가지고 있는 메모리에 적재되어 있으므로 Memory 간 복사로 인해 I/O보다 훨씬 빠른 속도로 data를 받아올 수 있음.
5. recvfrom 함수는 빠른 속도로 data를 복사한 후, 복사한 data의 길이와 함께 반환
