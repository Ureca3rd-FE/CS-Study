# Blocking/Non-blocking & Synchronous/Asynchronous

## Blocking/Non-blocking

> 호출된 함수가 호출한 함수에게 제어권을 건네주는 유무의 차이

함수A가 함수B를 호출했다고 가정했을 때(호출한 함수 A, 호출된 함수 B) 제어권을 가진 건 B(호출되어서 할 일을 해야하기 때문)

### Blocking

B가 할 일을 끝마칠 때까지 제어권을 가지고 있는다. A는 B가 완수할 때까지 대기.

### Non-blocking

B가 할 일을 끝마치지 못했어도 A에게 제어권을 넘겨준다. A는 B를 기다리며 다른 일을 진행할 수 있다.

= 호출된 함수에서 일을 시작할 때 바로 제어권을 리턴해주느냐, 할 일을 마치고 리턴해주느냐의 차이.

## Synchronous/Asynchronous

위와 같은 가정에서 B의 수행 결과나 종료 상태를 A가 체크하느냐의 차이

### Synchronous

A가 B의 처리를 기다리면서 현재 상태가 어떤지 계속 체크

### Asynchronous

B의 수행 상태를 B가 직접 신경쓰면서 처리 후 Callback으로 답
