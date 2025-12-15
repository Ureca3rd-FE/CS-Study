## 12주차 🔧소프트웨어 엔지니어링

# Chap01. 함수형 프로그래밍

## 0. 용어

- 함수형 프로그래밍은 "데이터를 어떻게 바꿀까?"보다 "입력을 어떻게 출력으로 변환할까?"에 집중한다.

### 핵심 개념

#### 순수함수

- 입력을 주면 언제, 어디서 호출하든 항상 같은 결과를 돌려주는 함수
- 예측가능하며 테스트하기 쉬운 함수

#### 합성함수

- 여러 함수를 이어 붙여서 하나의 새 함수를 쓰는 것
- 작은 순수함수들을 조립하여 큰 기능을 만듬

#### 고차함수

- 함수를 인자로 받거나 반환하는 함수
- 함수는 1급 객체: 함수를 **변수에 할당** / **인자로 전달** / **반환값**으로 사용 가능
  ```js
  const run = (fn) => fn();
  ```

#### 공유상태 피하기

- 공유상태: 여러 코드가 동시에 읽고 쓰는 같은 값/객체/전역변수 등을 가리킴
- 공유상태를 최소화하여 누가 언제 값을 바꾸는지

#### 상태변화 피하기 (불변성)

- 한 번 만든 값이나 자료구조를 직접 수정하기보다, 바뀐 내용을 반영한 새 값을 만들어 쓰려는 태도를 의미
- 코드 변경에 대한 추적이 쉬워짐
- 디버깅, 병렬 처리가 단순해짐

```js
const nextUser = { ...user, age: 21 };
```

#### 부작용 피하기 (사이드 이펙트)

- 부작용 (사이드 이펙트): 함수가 본래 목적(입력->출력 계산) 외에 추가로 일으키는 변화
- e.g. 로그 출력, 전역변수 수정, 네트워크 요청 등
- 최대한 부작용을 줄이고, 어쩔 수 없는 필요한 부작용은 경계를 분리하여 관리하는 방식으로 핵심 로직은 순수하게 유지함

### 명령형 vs 선언형 -> 프로그래밍 패러다임을 나누는 대분류

#### 명령형 프로그래밍

- (How)어떻게 할지는 단계적으로 지시하는 방식
  ```js
  // 명령형
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  ```
- 명령형 프로그래밍의 종류
  - 절차적 프로그래밍
  - 객체지향 프로그래밍

#### 선언형 프로그래밍

- (What)무엇을 원하는지를 표현하는 방식
- 내부에서 결국 명령형으로 실행됨
  ```js
  // 선언형
  const sum = arr.reduce((a, b) => a + b, 0);
  ```
- 선언형 프로그래밍의 종류
  - 함수형 프로그래밍
  - 논리형 프로그래밍

#### 사고방식의 초점이 다른 것, 실제 코드에서는 섞어서 사용 가능

## #1. 함수형 프로그래밍이란?

### 개념

- 함수를 이용하여 데이터를 변환하는 것에 집중하는 프로그래밍 방식
- 프로그램을 상태 변화가 아닌, 함수의 입력과 출력 관계로 구성하는 프로그래밍 패러다임
- 즉, 값을 계산하는 함수들의 조합으로 로직을 표현

### 특징

#### 1. 순수 함수

- 동일한 입력에 항상 동일한 출력
- 외부 상태를 변경하지 않음
- 예측 가능 + 테스트 쉬움

#### 2. 불변성

- 데이터를 직접 수정하지 않음
- 변경이 필요할 경우 새로운 데이터 생성
- 부작용 감소 및 상태 추적 용이

#### 3. 부작용 최소화

- 전역 변수 수정, 입출력, 외부 상태 의존을 지양
- 불가피한 부작용은 로직과 분리
- 안정적인 프로그램 구조

#### 함수는 1급 객체

- 함수를 **변수에 저장** / **인자로 전달** / **반환값**으로 사용 가능
- 유연한 추상화 가능

#### 5. 고차 함수

- 함수를 인자로 받거나 반환하는 함수
- 반복, 조건 로직을 선언적으로 표현
- map, filter, reduce 등이 있음

### 목적

#### 1. 예측 가능한 코드 작성

- 상태 변경을 최소화하여 코드 실행 흐름을 쉽게 이해 가능

#### 2. 버그 감소

- 부작용 제거로 예상치 못한 상태 변경 방지

#### 3. 테스트와 유지보수 용이

- 순수 함수는 단위 테스트가 간단
- 수정 시 영향 범위가 명확

#### 4. 코드 재사용성과 확장성 향상

- 함수 조합을 통해 작은 기능을 유연하게 결합

#### 5. 병렬 처리 및 비동기 처리에 유리

- 상태 공유가 적어 동시성 문제 감소

## #2. 함수형 프로그래밍의 예시

- 함수형 프로그래밍의 특징을 코드예시를 통해 알아보자.

### 1. 순수 함수

#### 명령형

```js
let taxRate = 0.1;

function calcTax(price) {
  return price * taxRate;
}
```

- 외부 변수에 의존 (값이 바뀌면 결과도 바뀜)

#### 함수형

```js
function calcTax(price, taxRate) {
  return price * taxRate;
}
```

- 명확한 입력을 통해 일정한 결과값이 출력
- 외부 상태에 의존 X
- 테스트 쉬움

### 2. 불변성

#### 명령형

```js
const user = { name: "Kim", age: 20 };
user.age = 21;
```

- 기존 객체를 직접 수정
- 변경 추적이 어려움

#### 함수형

```js
const user = { name: "Kim", age: 20 };
const nextUser = { ...user, age: 21 };
```

- 원본 보존
- 변경 결과가 명확

### 3. 고차 함수

#### 3-1. map 함수

- **명령형**

```js
const nums = [1, 2, 3];
const result = [];

for (let i = 0; i < nums.length; i++) {
  result.push(nums[i] * 2);
}
```

- **함수형**

```js
const result = nums.map((n) => n * 2);
```

#### 3-2. filter 함수

- **명령형**

```js
const adults = [];

for (let i = 0; i < users.length; i++) {
  if (users[i].age >= 20) {
    adults.push(users[i]);
  }
}
```

- **함수형**

```js
const adults = users.filter((u) => u.age >= 20);
```

#### 3-3. reduce

- **명령형**

```js
let sum = 0;
for (let i = 0; i < arr.length; i++) {
  sum += arr[i];
}
```

- **함수형**

```js
const sum = arr.reduce((acc, cur) => acc + cur, 0);
```

### 4. 부작용(사이드 이펙트) 분리

#### 명령형

```js
function loadUser() {
  const res = fetch("/api/user"); // side effect
  const user = res.json();
  user.name = user.name.trim(); // mutation
  return user;
}
```

#### 함수형

```js
// 순수 함수
const normalizeUser = (user) => ({
  ...user,
  name: user.name.trim(),
});

// 부작용 함수
async function fetchUser() {
  const res = await fetch("/api/user");
  return res.json();
}

// 조합
async function loadUser() {
  const user = await fetchUser(); // side effect
  return normalizeUser(user); // pure
}
```

## #3. 자바에서의 함수형 프로그래밍

- 명령형 프로그래밍과 함수형 프로그래밍은 패러다임의 차이인 것이지 하나만 선택해서 사용하는 것이 아님
- 실무에서는 두가지 패러다임을 함께 사용함
- Java는 Java8부터 함수형 프로그래밍 패러다임을 지원

### 1. 람다식 (Lambda Expression)

#### Java8 이전

```java
Runnable task = new Runnable() {
    @Override
    public void run() {
        System.out.println("Hello");
    }
};

```

#### Java8 이후

```java
Runnable task = () -> System.out.println("Hello");
task.run();
```

- 클래스 선언 X
- 메서드 이름 X
- 로직만 전달

### 2. Stream API

#### 명령형

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5);

int sum = 0;
for (int n : numbers) {
    if (n % 2 == 0) {
        sum += n;
    }
}

```

#### 함수형

```java
int sum = numbers.stream()
        .filter(n -> n % 2 == 0)
        .mapToInt(Integer::intValue)
        .sum();

```

- 반복 제어 x
- 고차함수 사용 (filter, map)
- 람다식 사용

### 3. 함수형 인터페이스 (Functional Interface)

#### 추상 메서드가 단 하나뿐인 인터페이스

```java
@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);
}
```

- 람다식은 메서드 이름을 쓰지 않으므로, 어떤 메서드를 구현하는지 모호하면 안됨
- 추상 메서드가 하나임 -> 컴파일러가 람다식을 어떤 메서드 구현으로 해석할지 명확
- `@FunctionalInterface`의 효과: 추상 메서드가 둘 이상이 되면 컴파일 에러

#### 사용 (람다식 사용)

```java
public class Main {
    public static void main(String[] args) {
        Calculator add = (a, b) -> a + b;
        Calculator multiply = (a, b) -> a * b;

        System.out.println(add.calculate(3, 5));       // 8
        System.out.println(multiply.calculate(3, 5));  // 15
    }
}
```

- 코드량 대폭 감소
- 무엇을 할지에 집중 가능
- 동작(로직)을 값처럼 전달 가능

---

## 퀴즈

### 1. 다음 중 함수형 프로그래밍의 특징으로 가장 거리가 먼 것은?

1. 불변성(Immutable Data)을 지향한다
2. 고차 함수(map, filter, reduce)를 적극 활용한다
3. 상태 변경을 최소화하고 선언적으로 코드를 작성한다
4. 반복문과 조건문을 최대한 많이 사용한다

### 2. React에서 state를 직접 수정하지 않고, setState 또는 useState의 setter를 사용하는 이유와 연관된 함수형 프로그래밍의 특징은?

정답: 불변성