# IPC(Inter Process Communication)

> 스레드는 메모리 공간과 자원을 공유하기 때문에 통신이 쉽지만, 프로세스는 각각 별도의 자원을 할당받아 프로세스끼리 통신하기가 어렵다. <br>
> ㄴ> 통신을 위한 별도의 공간을 만들어주어야 함.

이런 독립적 구조를 가진 프로세스가 서로 통신해야 하는 상황이 있다. 이를 위해 커널 영역에서 IPC라는 내부 프로세스간 통신(Inter Process Communication)을 제공한다.

## 종류

### 1. 공유 메모리(Shared Memory)

프로세스가 공유 메모리 할당을 커널에 요청하면 커널은 해당 프로세스에 공유 메모리 공간을 할당한다. 이후 모든 프로세스는 해당 메모리 영역에 접근 가능. (read, write 모두 가능)

> 공유 메모리가 각 프로세스에게 첨부하는 방식으로 작동=여러 프로세스의 가상 주소 공간에 첨부=>프로세스는 공유 메모리를 자기 메모리 공간의 일부처럼 사용

- 대량의 정보를 다수의 프로세스에게 배포 가능
- 중개자 없이 바로 메모리에 접근 가능하기에 모든 IPC 중에서 가장 빠르게 작동
- 서로 동시에 쓰면 충돌이 날 수 있으니 동기화(뮤텍스, 세마포어) 필요

#### 뮤텍스(Mutex)

어떤 Critical Section을 한 번에 한 스레드/프로세스만 실행하도록 허용.

#### 세마포어(Semaphore)

개수를 기반으로 스레드/프로세스의 접근을 제어. 한 번에 count개 개만 실행하도록 허용.<br>
=count 1=mutex

### 2. PIPE

통신을 위해 메모리 공간(버퍼)를 생성해 프로세스가 데이터를 주고 받게끔 한다.

#### 1. 익명 파이프(Anonymous PIPE)

- FIFO 기반의 통신 채널을 만들어 통신.
- 통신할 프로세스를 명확히 아는 경우 사용<br>
  =다른 네트워크 간 통신 불가.
- 연결하는 두 프로세스에서 한 프로세스는 `Write only`, 나머지 프로세스는 `Read only`로 동작. (반이중 통신)
  - 때문에 전이중 통신을 하고 싶으면 2개의 파이프 필요. -> 구현 복잡

#### 2. 네임드 파이프(Named PIPE)

- 익명 파이프에서 확장된 개념. 다른 네트워크 상에서도 통신할 수 있는 파이프.
  - 어떻게 가능한가?<br>
    이건 `mkfifo`를 통해 생성하는데, 이것은 통신을 위해 이름이 있는 파일을 사용하기 때문.
- 읽기/쓰기 동시엔 불가. 전이중 통신을 위해선 익명 파이프처럼 2개 필요.

### 3. Message Queue

- FIFO의 자료구조를 가지는 통신설비로 커널에서 관리.
- 입출력 방식은 pipe와 동일.
- 하지만 파이프 같은 데이터 흐름이 아니라 메모리 공간<br>
  =데이터에 번호를 붙여 올려두어 여러 프로세스가 동시에 다룰 수 있음

### 4. 메모리 맵

### 5. 소켓

### + RPC(Remote Procedure Call)

## 참고 자료

- [IPC(Inter Process Communication)](https://gyoogle.dev/blog/computer-science/operating-system/IPC.html)
- [[OS] 프로세스 간 통신에 사용되는 IPC(Inter Process Communication)의 종류](https://rlaehddnd0422.tistory.com/241)
- [IPC(Inter-Process Communication)와 RPC(Remote Procedure Call)](https://organizingdata.tistory.com/141#google_vignette)
