# CPU 스케줄링
여러 프로세스가 동시에 실행 요청을 할 때, 어떤 프로세스에 CPU를 먼저 할당할지 결정하는 운영체제의 정책. (`여러 프로세스 중 어떤 작업에 CPU를 배정할지 결정하는 것.`)

### 왜 쓰는가?
효율적으로 CPU를 사용하고 응답시간을 최소화하기 위해서.
- 응답시간↓ 오버헤드↓ 기아 현상↓
- 효율성↑ 사용률↑

### 무얼 고려하는가?
- 공평성
- 응답성
- 효율성

## 선점/비선점 스케줄링
- 선점(preemptive): OS가 CPU의 사용권을 선점 가능한 경우, 강제 회수하는 경우 `처리시간 예측 어려움`
    - interrupt
    - I/O or Event Completion
    - I/O or Event Wait
    - Exit
- 비선점(nonpreemptive): 프로세스 종료/IO 등의 이벤트가 있을 때까지 실행 보장 `처리시간 예측 용이`
    - I/O or Event Wait
    - Exit

## 프로세스 상태
```
New
↓ Admitted(승인)
Ready
↓ Scheduler Dispatch(스케줄러 디스패치)
Running
↓ Interrupt   혹은  ↓ I/O or Event Wait
                    Waiting
Ready               ↲ I/O or Event Completion
↓
Running
↓ Exit
Terminated
```
프로세스 상태 전이
- Admitted: 프로세스 생성이 가능해 승인됨
- Scheduler Dispatch: Ready 상태 프로세스 중 하나를 선택해 실행
- Interrupt: 예외, 입출력, 이벤트 등이 발생해 Running 중 프로세스를 Ready로 바꾸고 해당 작업 먼저 처리
- I/O or Event wait: Running 중 프로세스가 입출력이나 이벤트를 처리해야 하는 경우, 입출력/이벤트가 모두 끝날 때까지 Wait로 만드는 것
- I/O or Event Completion: 입출력/이벤트가 끝난 프로세스를 Ready로 전환해 스케줄러가 선택할 수 있도록 만드는 것

## CPU 스케줄링 종류
### 비선점 스케줄링
#### FCFS(First Come First Served)
- 큐에 도착한 순서대로 CPU 할당
- 실행 시간이 짧은 게 뒤로 가면 평균 대기 시간이 길어짐
#### SJF(Shortest Job First)
- 수행 시간이 가장 짧다고 판단되는 작업부터 수행
- FCFS보다 평균 대기 시간 감소, 짧은 작업에 유리
#### HRN(Highest Response-ratio next)
- 우선순위를 계산해 점유 불평등을 보완(SJF 단점 보완)
- 우선순위=(대기시간+실행시간)/실행시간
#### + SRTF(Shortest Remaining Time First)
- 남은 시간이 가장 짧은 작업 우선
- 효율적이지만 오버헤드가 발생할 수 있고 예측 필요

### 선점 스케줄링
#### RR(Round Robin)
- FCFS에 의해 프로세스들이 보내지면 각 프로세스가 동일한 Time Quantum(Time slice)만큼 CPU 할당
- 할당 시간이 크면 FCFS와 같음, 작으면 Context Switching이 잦아져 오버헤드↑
#### Priotiry Scheduling
- 정적/동적으로 우선순위를 부여해 우선순위가 높은 순서대로 처리
- 우선 순위가 낮은 프로세스가 무한정 기다리는 Starvation(기아 현상) 발생 가능성
#### Multilevel Queue
- 작업들을 여러 종류의 그룹으로 나누어 여러 개의 큐를 이용하는 기법
- 우선순위가 낮은 큐들이 실행 못하는 걸 방지하고자 각 큐마다 다른 Time Quantum을 설정
- 우선순위가 높은 큐는 작은 Time Quantum, 우선순위가 낮은 큐는 큰 Time Quantum 할당

## CPU 스케줄링 척도
1. Response Time: 작업이 처음 실행되기까지 걸린 시간
2. Turnaround Time: 실행 시간과 대기 시간을 모두 합함, 작업이 완료될 때까지 걸린 시간

## 참고 자료
- [CPU Scheduling](https://gyoogle.dev/blog/computer-science/operating-system/CPU%20Scheduling.html)
- ...chatGPT
- [[운영체제] CPU 스케줄링](https://rob-coding.tistory.com/31)