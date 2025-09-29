# Stack

순서가 있으며, 가장 마지막 요소부터 처리하는 LIFO(Last In First Out) 선형 자료구조.

## 특징

#### 장점

- 동적인 메모리 크기
- 데이터를 받는 순서대로 정렬
- 런타임 빠름

#### 단점

- 가장 최신 요소만 가져옴
- 한번에 하나의 데이터만 처리 가능

가장 마지막으로 입력된 것을 순차적으로 처리하고 싶을 때 용이.<br>
ex) 뒤로가기, 실행 취소, 재귀

## 시간복잡도

| 작업          | 시간복잡도 |
| ------------- | ---------- |
| search(value) | O(n)       |
| push(value)   | O(1)       |
| peek()        | O(1)       |
| pop()         | O(1)       |

## 참고 자료

- [여러가지 자료구조](https://soliloquiess.github.io/study/2021/03/20/java_%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0.html)
- [개발자라면 꼭 알아야 할 7가지 자료구조](https://velog.io/@jha0402/Data-structure-%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%9D%BC%EB%A9%B4-%EA%BC%AD-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0-7%EA%B0%80%EC%A7%80-%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0)

<br>
<br>

# Queue

순서가 있으며, 가장 먼저 들어온 요소부터 처리하는 FIFO(First In First Out) 선형 자료구조.

## 특징

#### 장점

- 동적인 메모리 크기
- 데이터를 받는 순서대로 정렬
- 런타임 빠름

#### 단점

- 가장 오래된 요소만 가져옴
- 한번에 하나의 데이터만 처리 가능

반복적이고 자주 받는 데이터를 비동기적으로 처리할 때 용이.<br>
ex) 대기열, 순서에 민감한 데이터 처리, 캐시

## 시간복잡도

| 작업                                                  | 시간복잡도 |
| ----------------------------------------------------- | ---------- |
| contains()                                            | O(n)       |
| add(value)-실패시 error<br/>offer(value)-실패시 false | O(1)       |
| peek()                                                | O(1)       |
| poll()                                                | O(1)       |

## 참고 자료

- [개발자라면 꼭 알아야 할 7가지 자료구조](https://velog.io/@jha0402/Data-structure-%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%9D%BC%EB%A9%B4-%EA%BC%AD-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0-7%EA%B0%80%EC%A7%80-%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0)
