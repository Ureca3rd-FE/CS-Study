# 스택 & 큐

## 스택(Stack)

입력과 출력이 한 곳(방향)으로 제한되어 있다.

**LIFO (Last In First Out, 후입선출)** : 가장 나중에 들어온 것이 가장 먼저 나옴

> 언제 사용?
>
> 함수의 **콜스택**, 문자열 **역순 출력**, 연산자 **후위표기법**, **DFS**

## 큐(Queue)

입력과 출력을 한 쪽 끝(front, rear)으로 제한되어 있다.

**FIFO (First In First Out, 선입선출)** : 가장 먼저 들어온 것이 가장 먼저 나옴

> 언제 사용?
>
> **버퍼**, 마구 입력된 것을 처리하지 못하고 있는 상황, **BFS**

## 이벤트 루프

![Event Loop](./assets/eventloop.png)  
**출처: [🔄 자바스크립트 이벤트 루프 동작 구조 & 원리 끝판왕](https://inpa.tistory.com/entry/%F0%9F%94%84-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%A3%A8%ED%94%84-%EA%B5%AC%EC%A1%B0-%EB%8F%99%EC%9E%91-%EC%9B%90%EB%A6%AC)**

자바스크립트는 **싱글 스레드 언어**라서 **Call Stack**(호출 스택)에 쌓인 작업을 한 번에 하나씩만 처리합니다.  
그런데 **setTimeout, fetch, Promise** 같은 **비동기 작업**은 **Web API**로 보내지고, 완료되면 **콜백 큐**(Callback Queue)로 들어갑니다.

이때 **이벤트 루프**(Event Loop)가 **스택이 비었을 때** 큐에 있는 작업을 하나씩 꺼내와 실행합니다.

- **매크로태스크 큐 (Macro-task Queue)**
  - **setTimeout, setInterval, setImmediate, I/O, DOM 이벤트**
  - 이벤트 루프가 한 번 돌 때마다 **한 개씩** 가져옴
- **마이크로태스크 큐 (Micro-task Queue)**
  - **Promise.then, queueMicrotask, MutationObserver**
  - 매크로태스크보다 **우선 처리**됨, 그리고 **비어있을 때까지 한 번에 모두 실행**

### 예제

```js
console.log("시작");

setTimeout(() => {
  console.log("setTimeout 콜백");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise then 콜백");
});

console.log("끝");
```

<details>
<summary>출력 보기</summary>

```plaintext
시작
끝
Promise then 콜백
setTimeout 콜백
```

</details>

## 추가 자료

- [Jake Archibald: 루프 속 - JSConf.Asia](https://www.youtube.com/watch?v=cCOL7MC4Pl0)
