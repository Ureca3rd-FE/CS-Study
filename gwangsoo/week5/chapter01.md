# PCB & Context Switching

## Process Management

**Process Management**(프로세스 관리)란 CPU가 동시에 여러 개의 프로세스를 다룰 때,
**CPU 스케줄링**(CPU Scheduling)을 통해 효율적으로 관리하는 것을 말한다.

이때 CPU는 각 프로세스를 구분하고, 상태를 관리하기 위해 **프로세스의 메타데이터**(Process Metadata)를 사용한다.

### Process Metadata

- Process ID — 프로세스를 구분하는 고유 식별자
- Process State — 현재 상태 (Running, Ready, Waiting 등)
- Process Priority — 우선순위
- CPU Registers — CPU 내 레지스터 값
- Owner — 프로세스를 실행한 사용자 정보
- CPU Usage — CPU 사용 시간
- Memory Usage — 메모리 사용량

이러한 프로세스 메타데이터는 프로세스가 생성될 때 **PCB**(Process Control Block)에 저장된다.

## PCB(Process Control Block)

PCB는 각 프로세스의 모든 메타데이터를 저장하고 관리하는 구조체(데이터 블록)이다.

즉, **한 PCB = 한 프로세스의 정보**를 의미한다.

### 왜 필요한가?

CPU에서는 프로세스의 상태에 따라서 교체 작업이 이루어진다. 이때, **앞으로 다시 수행할 대기 중인 프로세스에 관한 저장 값을 PCB에 저장해두는 것**이다.

### 어떻게 관리되는가?

PCB들은 커널 내부에서 **Linked List 형태의 자료구조로 관리**된다.

- 프로세스 생성 시 → 새로운 PCB가 리스트에 추가
- 프로세스 종료 시 → 해당 PCB가 리스트에서 제거
- 삽입/삭제가 빈번하기 때문에 배열보다 연결 리스트가 효율적이다.

이렇게 수행 중인 프로세스를 변경할 때, CPU의 레지스터 정보가 변경되는 것을 **Context Switching**이라고 한다.

## Context Switching

**Context Switching**이란 CPU가 현재 실행 중인 프로세스의 상태를 **PCB에 저장**하고,
다른 프로세스의 **PCB에 기록된 정보를 읽어와 CPU 레지스터에 복원하는 과정**을 말한다.

### Context Switching의 OverHead란?

**Overhead**(오버헤드)란 불필요하거나 추가적인 처리 비용을 의미한다.

Context Switching도 다음과 같은 이유로 오버헤드가 존재한다.

- 레지스터 값과 메모리 상태를 저장 및 복원해야 함
- 캐시(Cache) 초기화, 메모리 접근 등 시간 소모 발생
- 스케줄러가 새로운 프로세스를 선택하는 과정에서 추가 연산 발생

즉, Context Switching은 **CPU 자원을 소모하는 작업**이다.

하지만 이는 CPU를 놀게 두는 것보다 훨씬 효율적이다.

따라서 운영체제는 약간의 오버헤드를 감수하더라도 **CPU를 항상 일하게 만들어 전체 시스템 효율을 높이는 전략**을 택한다.
