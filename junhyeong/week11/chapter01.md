## 11주차 🔧소프트웨어 엔지니어링

# Chap01. 클린코드 & 리팩토링

## 1. 클린 코드 (Clean Code)

- 기능은 같아도, 더 읽기 쉽고, 수정하기 쉽고, 오류가 적게 발생하도록 구조화가 잘 된 코드
- 즉, 이해하기 쉬우면서 유지보수하기 좋은 코드를 의미

### 🔹주요 개념

#### 1. 읽기 쉬운 코드 (Readable)

- 코드만 보더라도 무슨 역할인지 직관적으로 알 수 있음
- 컴퓨터가 아니라, 사람이 읽는 코드라는 관점에서 작성

#### 2. 이해하기 쉬운 코드 (Understandable)

- 변수명, 함수명이 명확하여 역할을 알기 쉬움
- 복잡한 로직은 작은 단위로 분리하여 단순하게 표현

#### 3. 변경하기 쉬운 코드 (Maintainable)

- 수정하더라도 다른 부분에 가는 영향이 적음 (낮은 결합도)
- 코드 구조가 명확 -> 새로운 기능 추가/확장이 용이함

#### 4. 중복이 없는 코드 (DRY: Don't Repeat Yourself)

- 같은 로직이 여러 곳에 쓰지 않고 함수/모듈로 재사용
- 중복 제거 -> 유지보수 비용 감소

#### 5. 테스트하기 쉬운 코드 (Testable)

- 함수가 너무 크지 않고 한 가지 책임만 수행
- 의존성이 많지 않아 단위 테스트가 쉬움

---

### 🔹원칙 - Uncle Bob 기준
- 로버트 C. 마틴이 **Clean Code**라는 책에서 제시한 원칙
- 현재 대부분의 개발 문화에서 표준처럼 받아들여짐

#### 1. 의미 있는 이름 (Meaningful Names)

- 변수명/함수명은 역할이 명확하게 드러나도록 지어야함
- 이름을 보고 무엇을 하는지 이해가 가능해야함

#### 2. 함수는 작게, 한 가지 일만 (Do One Thing)

- 함수는 한 가지 책임만 가져야 함
- 여러 일이 섞이면 이해, 수정, 테스트가 힘들어짐
- 기능이 여러 개인 함수는 분리 필요 (SRP)

#### 3. 중복 제거 (DRY: Don't Repeat Yourself)

- 같은 코드가 여러 곳에서 반복되면 버그 발생 확률이 증가
- 공통 로직은 함수/모듈로 분리하여 재사용
- 유지보수가 쉬워짐 + 코드 길이 짧아짐

#### 4. 주석보다 코드로 설명 (Comments vs Code)

- 주석은 오해 방지/의도 설명 등 꼭 필요한 경우로 최소화
- 코드 자체가 읽기 쉽게 작성되는 것이 중요
- 좋은 이름, 작은 함수, 명확한 구조를 통해 주석 최소화

#### 5. 클래스는 작게, 한 책임만 (Single Responsibility Principle)

- 클래스도 하나의 책임만 가져야 함
- 여러 역할을 맡길 시, 영향 범위가 커짐 -> 유지보수 어려움

#### 6. 예외를 사용하여 오류를 명확하게 처리 (Error Handling)

- 오류 발생 시 단순 리턴/코드 값보다 명확한 예외가 더 안전
- 예외를 통해 문제 상황을 분리하여 처리 가능
- 예외 메시지도 문제를 분명하게 알 수 있게 작성

---

## 2. 리팩토링 (Refactoring)

### 🔹개념

- 코드를 더 간결하게, 개선하는 과정
- 동작(기능)은 그대로 유지
- 내부의 코드 품질을 높여 **읽고 이해하기 쉬움** + **변경 용이성**을 강화하는 작업

### 🔹클린코드와 리팩토리의 차이점

#### 클린코드

- 좋은 코드가 갖춰야하는 상태/원칙
- "이상적인 코드의 모습" 자체를 가리킴

#### 리팩토링

- "이상적인 코드의 모습"에 가까워지기 위해 코드를 개선하는 과정

### 🔹특징

#### 1. 기능은 바꾸지 않기

- 리팩토링 != 성능 개선, 기능 추가
- 결과는 완전히 동일해야함
- 깔끔 + 구조적 + 수정이 쉬운 코드로 변환하는 것

#### 2. 작은 단위로 쪼개서 진행

- 한번에 대공사 X
- 작은 단계 -> 테스트 통과 확인 -> 다음 단계
- 안전하고 예측이 가능한 작업이 됨

#### 3. 테스트가 중요

- 단위 테스트
  - 하나의 함수가 제대로 작동하는지 자동으로 검사하는 코드
  - 수동으로 테스트 시, 오래 걸리며 실수가 날 수 있음
- 단위 테스트 사용 시 리팩토링이 쉬워짐
  - 리팩토링 과정에서 오류 발생 시 알려줌
  - 대규모 리팩토링도 안전하게 할 수 있음
  - 어디까지 건드려도 안전한지를 보장해줌

#### 4. 코드 품질 향상

- 모듈화, 중복 제거, 단일 책임 분리
- 버그 가능성 감소, 협업 생산성 증가

---

### 🔹리팩토링이 필요한 상황

- 리팩토링은 언제 필요할까?
  - 클린코드가 이상적인 코드의 **기준**이라면
  - 리팩토링은 이상적인 코드가 되기 위한 **행위**임
- 따라서, 리팩토링은 클린코드의 6가지 원칙에 위배되는 상황에 하면 된다.

#### 1. 의미 없는 변수/함수명 사용 <-> 의미 있는 이름
- 이름만 봐서 역할이 명확하지 않은 경우
```js
// ❌ 나쁜 코드 예시: a가 뭔지 모름
const a = p * 0.1;

// ✔️ 좋은 코드 예시: 변수이름을 통해 역할을 알 수 있음
const taxRate = 0.1;
const priceWithTax = price * taxRate;
```

#### 2. 너무 긴 함수 <-> 함수는 작게, 한 가지 일만
- 함수가 너무 길고 여러 역할을 수행
```js
// ❌ 나쁜 코드 예시: 로깅, 검증, 이메일 전송이 섞여있음
function processUser(user) {
  console.log("로그 시작");
  if (user.age > 19) {
    sendEmail(user.email);
  }
  saveLog("완료");
}

// ✔️ 좋은 코드 예시: 역할별로 분리
function isAdult(user) {
  return user.age > 19;
}

function notifyUser(user) {
  sendEmail(user.email);
}

function processUser(user) {
  log("시작");
  if (isAdult(user)) notifyUser(user);
  log("완료");
}
```

#### 3. 여러 곳에 중복된 코드 존재 <-> 중복 제거 (DRY)
- 같은 코드가 여러 군데 존재
```js
// ❌ 나쁜 코드 예시: 조건문이 3곳에서 반복
if (age < 20) {
  console.log("미성년자");
}

if (userAge < 20) {
  console.log("미성년자");
}

if (profile.age < 20) {
  console.log("미성년자");
}

// ✔️ 좋은 코드 예시: 공통 함수로 통일
function printMinor() {
  console.log("미성년자");
}

function isMinor(age) {
  return age < 20;
}

if (isMinor(age)) printMinor();
if (isMinor(userAge)) printMinor();
if (isMinor(profile.age)) printMinor();
```

#### 4. 주석 없이는 이해 불가능한 코드 <-> 주석보다 코드로 설명
- 주석 없이는 이해가 불가능한 로직
```js
// ❌ 나쁜 코드 예시: 변수명 r에 의미가 없음 + 주석으로 설명
/* 주석: 사용자의 나이를 월 단위로 계산함 */
let r = u.y * 12 + u.m;

/* 주석: 20세 미만인지 확인 */
if (r < 240) {
  console.log("미성년자");
}

// ✔️ 좋은 코드 예시: 의도가 명확히 보임
const userAgeInMonths = user.year * 12 + user.month;
const MINOR_THRESHOLD = 20 * 12;

if (userAgeInMonths < MINOR_THRESHOLD) {
  console.log("미성년자");
}
```

#### 5. 하나의 파일이 너무 많은 역할 수행 <-> 클래스는 작게, 한 책임만
- 한 클래스가 여러 책임을 수행
```js
// ❌ 나쁜 코드 예시: User 클래스가 저장, 이메일, 렌더링 모두 담당
class User {
  saveToDB(user) {
    // DB 저장
  }

  sendEmail(email) {
    // 이메일 전송
  }

  renderProfile(profile) {
    // HTML로 렌더링
  }
}

// ✔️ 좋은 코드 예시: 역할별로 클래스 분리
class UserRepository {
  save(user) {
    /* DB 저장 */
  }
}

class EmailService {
  send(email) {
    /* 이메일 전송 */
  }
}

class UserProfileRenderer {
  render(profile) {
    /* UI 렌더링 */
  }
}
```

#### 6. 모호하거나 숨겨진 오류 처리 <-> 예외를 사용하여 오류를 명확하게 처리
- 오류를 return 값으로 숨김
```js
// ❌ 나쁜 코드 예시: null이 오류인지 정상인지 구분 불가
// user 변수가 null인 경우는 두 가지임
// 1. getUser() 함수에 id값이 전달되어 DB를 조회했으나, 사용자가 없음 (오류가 아닌 단순 사용자 없음)
// 2. getUser() 함수에 모종의 이유로 null, undefined, ""가 전달됨 (오류 발생)
function getUser(id) {
  if (!id) return null;
  // DB 조회
}

const user = getUser(null);

if (!user) {
  console.log("뭔가 문제 발생");
  // 유저 없음인지, 오류인지 알 수 없음
}

// ✔️ 좋은 코드 예시: 오류가 명확하게 throw
// 현재 코드에서는 id에 null이 들어가 오류가 발생한 경우 
// <-> 오류가 아닌 경우는 id에 null, undefinedm, ""가 아니라 제대로된 id가 들어갔으나, DB에서 null이 반환된 경우
function getUser(id) {
  // DB 조회
  if (!id) {
    // 에러를 try-catch로 던짐
    throw new Error("ID가 존재하지 않습니다");
  }
}

// 에러를 처리
try {
  const user = getUser(null);
} catch (error) {
  console.error("오류 발생:", error.message);
}
```
