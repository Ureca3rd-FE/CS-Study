# 11주차 🔧소프트웨어 엔지니어링

# Chap02. 클린 코드 & 시큐어 코딩

## 1. 클린 코드

### 🔹개념

- 클린 코드란 **이해하기 쉽고**, **유지 보수에 용이한 코드**를 의미함
- 더 나아가 코드를 작성하는 **의도/목적이 명확**하며 **가독성이 좋은 코드**를 의미함

### 🔹클린 코드를 만드는 규칙

- 이전 챕터(11주차 chapter 01)에서는 클린 코드가 무엇인지, **어떤 원칙을 기준으로 하는지** 살펴보았다.
- 이번 챕터(11주차 chapter02)에서는 처음부터 클린 코드에 맞게 **코드를 작성하는 실제 방법(규칙)**에 대해 알아보자.

#### 1. 네이밍 (Naming)

- 변수, 클래스, 메서드에 의도가 분명한 이름을 사용
- 이름만 보고도 역할이 이해되도록
- 축약어 X
- 일관된 패턴 사용 (camelCase, PascalCase)
- 변수는 명사, 함수는 동사

```js
// ❌: Prettier로도 바뀌지 않는 사항
const a = user.name;
const b = user.email;
const c = user.address;

// ✔️: 네이밍 + 포매팅
const userName = user.name;
const userEmail = user.email;
const userAddress = user.address;
```

#### 2. 주석 달기 (Commenting)

- 주석은 정말 필요한 경우에만 사용 (코드가 설명하기 어려운 부분)
- **무엇을?** 보다는 **왜?** 를 설명

```js
let age = user.age; // 나이 가져오기 ❌: 코드가 설명할 수 있는 내용

// 휴면 계정 정책에 의해 1년 이상 미접속 시 비활성화 처리 ✔️: 의도(왜인지) 설명
```

#### 3. 꾸미기/포맷팅 (Formatting)

- 줄바꿈, 들여쓰기, 공백 등을 일관된 스타일로 유지
- 한 함수/클래스 내에서 시각적으로 논리 구조가 보이도록 구성
- 의미 있는 묶음 사이에는 줄바꿈 넣기

```js
// ❌ 가독성 나쁨
function placeOrder(order) {
  const total = calculate(order);
  const discount = getDiscount(total);
  const finalPrice = total - discount;
  saveOrder(order, finalPrice);
  sendEmail(order.user);
  logOrder(order);
}

// ✔️ 가독성 개선: 무엇을?을 설명 하고 있지만, 가독성을 위한 "논리 블록 구분" 역할을 함
function placeOrder(order) {
  // 계산 영역
  const total = calculate(order);
  const discount = getDiscount(total);
  const finalPrice = total - discount;

  // 저장
  saveOrder(order, finalPrice);

  // 후처리
  sendEmail(order.user);
  logOrder(order);
}
```

#### 4. 흐름 제어 만들기 (Control Flow)

- 조건문, 반복문을 단순하게 유지
- if/else 중첩을 최소화 -> 조기 반환(Early Return) 사용
- 복잡한 조건은 함수로 분리

```js
// ❌ 중첩 if
if (user) {
  if (user.isActive) {
    // ...
  }
}

// ✔️ 단순하고 명확한 흐름
// 의도 명확 + 중첩 제거 목적이라면 부정표현도 OK!
if (!user) return; // 조기 반환(Early Return)
if (!user.isActive) return;
// ...
```

- 비교 시 변수는 왼쪽, 상수는 오른쪽에 두어 가독성을 높임

```js
// ❌ Yoda Style(지양): 읽기 어색함
if ("active" === status) {
  // ...
}

// ✔️ 지향: 변수 왼쪽, 상수 오른쪽 배치
if (status === "active") {
  // ...
}
```

- 부정조건(!user)이 아닌 긍정조건을 지향

```js
// ❌ 부정조건 우선: 코드 읽기 불편
if (!isValid) {
  showError();
  return;
}

// ✔️ 긍정조건 선호: 의도 명확
if (isValid) {
  showSuccess();
  return;
}
showError();
```

#### 5. 착한 함수 만들기 (Good Function)

- 하나의 함수는 하나의 책임만
- 길이는 짧을수록 좋음 (5-10줄)
- 입력/출력 명확히
- 부작용(side effect) 최소화 (전역 변수 변경, 함수 내에서 예측 못하는 동작 등)

```js
// ❌ 한 함수가 여러 역할
function processOrder(order) {
  if (!order.items || order.items.length === 0) {
    throw new Error("아이템 없음");
  }

  let total = 0;
  for (const item of order.items) {
    total += item.price * item.quantity;
  }

  if (total > 50000) {
    console.log("무료 배송 적용");
  }

  console.log("총 금액:", total);
  saveToDB(order, total);
  console.log("주문이 저장되었습니다.");
}

// ✔️ 한 가지 일만 하도록 분리
// 검증 함수
function validateOrder(order) {
  if (!order.items || order.items.length === 0) {
    throw new Error("아이템 없음");
  }
}
// 총액 계산 함수
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
// 배송 정책 판단 함수
function applyShippingPolicy(total) {
  return total > 50000 ? "무료 배송" : "일반 배송";
}
// 로그 출력 함수
function logSummary(total, shippingType) {
  console.log("총 금액:", total);
  console.log("배송 방식:", shippingType);
}
// DB 저장 함수
function saveOrder(order, total) {
  saveToDB(order, total);
}

// 최종 조합: 각 함수들이 한가지 일을 수행
function processOrder(order) {
  validateOrder(order);

  const total = calculateTotal(order.items);
  const shipping = applyShippingPolicy(total);

  logSummary(total, shipping);
  saveOrder(order, total);
}
```

---

## 2. 코드 리뷰와 리팩토링

- 이전 챕터(11주차 Chapter 01)에서는 클린 코드의 원칙을 중심으로 리팩토링에 대해 알아보았다.
- 이번 챕터(11주차 Chapter 02)에서는 코드 리뷰를 통해 문제 있는 코드를 발견하고, 이를 개선하는 리팩토링 절차에 대해 알아보자.

### 🔹코드 인스펙션 (code inspection)

#### 개념

- 코드를 작성한 후, 정해진 절차에 따라 체계적으로 결함을 찾아내는 공식적인 검토 활동
- 코드 리뷰가 개발자 간의 자유롭고 유연한 방식이라면, 코드 인스펙션은 보다 공식적인 검토 방식

#### 특징

- 개발 표준, 규칙에 맞는지 검사하는 것이 목적
- 문서화된 절차에 따라 진행
- 회의(Inspection Meeting)가 존재하는 정식 프로세스
- 품질 보증(QA)에 가까운 활동

#### 역할

- Moderator: 진행자
- Reader: 코드를 직접 읽고, 작성자의 의도를 팀에게 설명하는 사람
- Recorder: 결함을 기록하는 사람
- Inspector: 문제 찾는 사람
- Author: 코드 작성자

#### 진행 과정

1. Planning: 인스펙션 범위, 목적, 참여자 등을 정의하고 전체 계획을 수립
2. Overview: 작성된 산출물의 배경과 구조를 공유하며 역할과 책임을 명확히 함
3. Preparation: 검토에 필요한 문서, 체크리스트, 도구를 준비하고 개별적으로 분석
4. Meeting: 실제 검토 회의를 통해 결함을 식별하고 기록하며 논의
5. Rework: 발견된 결함을 수정하고, 재검토가 필요한지 여부를 확인
6. Follow-up: 수정 사항이 제대로 반영되었는지 검증하고 인스펙션을 종료

### 🔹리팩토링

#### 개념

- 코드 인스펙션: 문제 발견 단계
- 리팩토링: 문제 해결 단계

#### 진행 과정

1. 문제 탐색 단계
   - 코드 리뷰/코드 인스펙션 단계에서 문제를 식별
   - 대표적인 문제 유형 (리팩토링 대상)
     1. 클린 코드 원칙 위반
     2. 테스트 부족
     3. 복잡한 로직, 중복 코드
     4. 사이드 이펙트 위험
2. 리팩토링 범위 정의
   - "무엇부터 건드릴지", "어디까지 건드릴지" 결정
   - 범위 결정 기준: 영향도, 코드 규모, 레거시 의존성, 일정 등
3. 작은 단위로 리팩토링
   - 여러 단계를 작게 나누어 점진적으로 개선
   - 기능은 그대로 유지하면서 내부 구조만 수정
   - 대표적인 리팩토링 기법
     1. 함수 분리 및 조건문 단순화
     2. 중복 코드 제거
     3. 네이밍 개선
     4. 사이드 이펙트 제거
4. 테스트
   - 리팩토링 후 기존 기능이 동일하게 작동하는지 검증
   - 테스트 종류: 단위 테스트, 통합 테스트, 회귀 테스트, 수동 테스트
5. 검토 및 재리뷰
   - 리팩토링이 끝나면 코드 리뷰/코드 인스펙션을 다시 진행
   - 개선이 잘 되었는지 피드백을 받는 과정 (불필요하게 복잡해지지 않았는지, 클린 코드 원칙을 지켰는지 등)
6. 머지 및 반영
   - 문제 없이 리팩토링 완료 시 메인 브랜치에 병합
   - 이후 개선된 구조를 기반으로 개발을 이어감

---

## 3. 시큐어 코딩 (Secure Coding)

### 🔹시큐어 코딩이란?

#### 개념

- 소프트웨어 개발 과정에서 발생할 수 있는 보안 취약점을 예방하기 위해 개발 단계에서부터 안전한 코드를 작성하는 기법과 원칙
- 프로그램이 예상하지 못한 입력, 공격자의 악의적인 데이터에도 안전하게 동작하도록 만드는 코드 작성 방식

#### 필요성

- 보안 사고의 약 70% 이상이 코드 결함에서 발생
- 취약한 코드는 개인정보 유출, 권한 탈취, 시스템 침해 등 심각한 피해로 이어짐
- 클린 코드: **이해하기 쉬운 코드**를 목표
- 시큐어 코딩: **안전하게 동작하는 코드**를 목표

### 🔹7대 보안 약점 (행정안전부 표준)

#### 1. 입력값 검증 및 표현

- XSS, SQL Injection 등
- 외부 입력을 신뢰하지 않고 필터링/이스케이프/정규화 수행

#### 2. 인증 (Authentication)

- 취약한 로그인 처리, 비밀번호 평문 저장, 인증 우회 등

#### 3. 권한 관리 (Authorization)

- 관리자 기능의 접근통제 누락
- 서버에서 권한 검증을 반드시 수행해야 함

#### 4. 중요 정보 보안

- 개인정보·세션 토큰·API Key 등의 암호화, 마스킹

#### 5. 오류 처리

- 상세한 에러 메시지가 공격자에게 시스템 정보를 노출하는 문제 방지

#### 6. 세션 관리

- 세션 탈취·세션 고정 공격 방어
- Secure/HttpOnly/SameSite 쿠키 설정 등

#### 7. 캡슐화(보안적 의미의 Encapsulation)

- 내부 구조/디렉터리/파일 경로/환경 정보 노출 방지
- 민감 정보가 외부에 노출되지 않도록 설계

### 🔹대표 취약점 사례

#### 1. XSS 취약한 코드 (Cross-Site Scripting)

- **개념**

  - 사용자 입력을 HTML에 직접 삽입할 때 공격자가 스크립트를 주입하여 실행시키는 공격
  - 주요 피해: 쿠키 탈취, 세션 탈취, 피싱 등 가능
  - 발생 원인
    - innerHTML 같은 API 사용
    - 서버/프론트에서 HTML 이스케이프를 하지 않음

- **예시 코드**

  - 문제점: 사용자가 `<script>alert(1)</script>` 입력하면 그대로 실행됨

  ```html
  <div id="output"></div>

  <script>
    const name = new URLSearchParams(location.search).get("name");
    document.getElementById("output").innerHTML = `Hello ${name}`;
  </script>
  ```

  - 해결 방안1: textContent 사용
    - textContent는 HTML이 아닌 순수 텍스트로 출력 -> 스크립트가 실행되지 않음

  ```html
  <div id="output"></div>

  <script>
    const name = new URLSearchParams(location.search).get("name");
    document.getElementById("output").textContent = `Hello ${name}`;
  </script>
  ```

  - 해결 방안2: HTML 이스케이프 처리

    - `<`을 `&lt;` 등으로 변환하여 HTML로 해석되지 않도록 처리
    - 서버단에서도 동일하게 Escape를 적용해야 완전한 방어가 가능

    ```js
    function escapeHTML(str) {
      return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    const name = new URLSearchParams(location.search).get("name");
    const safeName = escapeHTML(name);

    document.getElementById("output").innerHTML = `Hello ${safeName}`;
    ```

#### 2. SQL Injection 취약한 코드

- **개념**

  - 사용자 입력이 그대로 SQL 쿼리에 포함되어 공격자가 쿼리를 조작하는 공격

- **예시 코드**

  - 문제점: WHERE 절이 항상 true → 전체 사용자 정보 조회됨

  ```js
  // 취약 예시 코드
  const userId = req.query.id;

  const query = `SELECT * FROM users WHERE id = '${userId}'`;
  db.execute(query);

  // 취약 예시 입력
  ' OR '1'='1
  ```

  - 해결 방안
    - SQL 파라미터 바인딩
    - DB가 입력값을 문자열로 처리해 쿼리로 해석되지 않음
    - 대부분의 ORM/쿼리 빌더가 이 방식을 기본 제공

  ```js
  const userId = req.query.id;

  const query = "SELECT * FROM users WHERE id = ?";
  db.execute(query, [userId]);
  ```

#### 3. 취약한 인증 코드

- **개념**

  - 인증(Authentication) 절차가 부실하거나,
  - 비밀번호 검증·세션 관리·토큰 검증이 제대로 되지 않을 때 발생하는 취약점

- **예시 코드**

  - 문제점

    - "admin"이라는 id만 알면 누구나 로그인 가능
    - 패스워드 검증이 없으므로 인증 우회 발생

    ```js
    function login(id, password) {
      // id만 맞으면 로그인됨 → 비밀번호 검증 없음
      if (id === "admin") {
        return true;
      }
      return false;
    }
    ```

    - 해결 방안
      - 입력 ID 존재 여부 검증
      - 비밀번호는 해시 기반으로 비교
      - 인증 절차를 우회할 수 없도록 논리 강화

    ```js
    import bcrypt from "bcrypt";

    function login(id, password) {
      const user = findUser(id); // 사용자 조회
      if (!user) return false;

      // 저장된 해시와 입력된 비밀번호 비교
      const isValid = bcrypt.compareSync(password, user.hashedPassword);
      if (!isValid) return false;

      return true; // 인증 성공
    }
    ```
