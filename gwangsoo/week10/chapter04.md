# [Network] Blocking/Non-blocking & Synchronous/Asynchronous

동기/비동기, 블로킹/논블로킹은 비슷한 느낌의 단어지만 **완전히 다른 기준으로 나뉘는 개념**이다.  
둘을 혼동하는 경우가 많기 때문에 각각의 기준을 명확히 구분하는 것이 중요하다.

## 1. Blocking / Non-blocking

→ 제어권을 언제 반환하는가?

### Blocking

- 호출된 함수(B)가 자신의 작업을 끝낼 때까지 제어권을 계속 가지고 있음
- 호출한 함수(A)는 기다릴 수밖에 없음

### Non-blocking

- 호출된 함수(B)가 작업 완료 여부와 상관없이 즉시 제어권을 반환
- 호출한 함수(A)는 기다리지 않고 다른 작업 수행 가능

## 2. Synchronous / Asynchronous

→ 작업 완료 여부를 누가 신경쓰는가?

### Synchronous

- 호출한 함수(A)가 호출된 함수(B)의 상태를 직접 확인
- “끝났나?” 하고 계속 확인(Polling)

### Asynchronous

- 호출된 함수(B)가 자신의 작업 상태를 스스로 관리
- 작업이 끝나면 B가 A에게 알려줌(콜백, 이벤트 등)
- A는 B의 상태를 계속 신경쓰지 않아도 됨

## 3. 예시 (치킨집 비유)

### 1) Blocking + Synchronous

치킨 주문 후 가게에서 계속 기다리며 언제 되는지 계속 확인하는 상황

### 2) Blocking + Asynchronous

치킨 주문 후 가게에서는 계속 기다리지만 언제 되는지 궁금해하지 않고 멍하게 기다리는 상황

### 3) Non-blocking + Synchronous

시간이 오래 걸린다 하여 밖에 나갔다가 5분마다 “제 것 됐나요?” 하고 계속 물으러 오는 상황

### 4) Non-blocking + Asynchronous

밖에서 다른 일을 하다가 사장님이 “치킨 나왔습니다” 하고 불러주면 받으러 오는 상황
