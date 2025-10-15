# PCB와 Context Switching

## 프로세스 메타데이터
프로세스가 여러 개 돌아감
v
CPU가 각 프로세스들이 누군지 알아야 관리 가능
v
이 특징과 정보가 Process Metadata

프로세스 메타데이터 구성
- Process ID
- Process State
- Process Priority
- CPU Registers
- Owner
- CPU Usage
- Memory Usage


## PCB(Process Control Block)
프로세스 메타데이터들을 저장하는 곳. 1 PCB에 1 Process.

정리하면 다음과 같다.
```
프로그램 실행>프로세스 생성>프로세스 주소 공간에 [코드, 데이터, 스택] 생성>이 프로세스의 메타데이터들이 PCB에 저장
```

### 필요성
프로세스 메타데이터에서 설명했듯, CPU는 프로세스를 여러 개 돌리거나 interrupt가 발생했을 때 `실행중인 프로세스를 waiting` 상태로 돌리고, `다른 프로세스를 running` 상태로 바꾼다.

이때, 대기중인 프로세스들의 상태를 PCB에 저장해놓고 실행할 때 다시 불러오는 것.

### PCB의 관리
Linked List 방식으로 관리.

프로세스가 생성되면 같이 생성된 PCB가 PCB List Head에 붙고, 프로세스가 완료되면 제거. (주소값 연결로 이루어진 Linked List라서 삽입/삭제 용이)

이렇게 수행 중인 프로세스를 변경할 때 CPU의 Register 정보가 변경되는 것을 Context Switching이라고 함.

## Context Switching
CPU가 이전 프로세스 상태를 PCB에 보관하고, 또 다른 프로세스 정보를 PCB에서 읽어 레지스터에 적재하는 과정

보통 `인터럽트 발생`, `실행 중인 CPU 사용 허가시간 전부 소모`, `입출력을 위해 대기`하는 경우에 발생한다.

> 간단하게 쓰면 프로세스가 ready>running, running>ready, running>waiting 처럼 상태가 변경될 때 발생.

### Context Switching의 OverHead
프로세스 작업 중엔 OverHead를 감수해야 하는 상황이 있다.
> ex) 프로세스를 수행하다 입출력 이벤트 발생 > 대기 상태로 전환<br>
> 이 때, CPU를 놀게 두느니 다른 프로세스를 수행시키는 것이 효율적

즉, CPU에 계속 프로세스를 수행시키도록 하기 위해 다른 프로세스를 실행시켜 Context Switching을 함.

-> CPU가 놀지 않도록 하고, 사용자에게 빠른 일처리를 제공.