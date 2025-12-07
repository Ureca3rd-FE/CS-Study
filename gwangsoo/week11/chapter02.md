# 클린코드와 시큐어코딩

## 클린코드를 구성하는 요소

### 1. 네이밍(Naming)

의도가 분명한 이름을 사용한다.

```java
int elapsedTimeInDays;
int daysSinceCreation;
int fileAgeInDays;
```

지양해야 할 것

- 의미 없는 단어 (aix, hp 등)
- 연속 숫자, 불용어(name1, data2 등)

### 2. 주석(Comment)

- 반드시 필요한 경우에만 작성
- 코드 자체가 의도를 드러낸다면 주석은 필요 없음
- 설명을 위한 설명은 피함

```cpp
// 주어진 'name'으로 노드를 찾거나 아니면 null을 반환한다.
// 만약 depth <= 0이면 'subtree'만 검색한다.
// 만약 depth == N 이면 N 레벨과 그 아래만 검색한다.
Node* FindNodeInSubtree(Node* subtree, string name, int depth);
```

### 3. 꾸미기(Aesthetics)

- 들여쓰기, 줄바꿈, 패턴 등 시각적으로 정돈된 코드
- 보기 좋은 코드가 읽기 좋은 코드
- 클래스 내부에서도 적절히 그룹을 나누어 가독성 향상
- 이러한 형식적 규칙을 프론트에서는 **일관되게 적용하기 위해 eslint, prettier, biome 같은 정적 분석, 포매팅 도구를 사용해 코드 스타일을 자동으로 강제**한다.

### 4. 흐름제어 만들기(Making control flow easy to read)

- 비교 시 **왼쪽에 변수, 오른쪽에 상수**

```java
if (length >= 10)
while (bytesReceived < bytesExpected)
```

- 부정보다 긍정을 다루는 조건문 선호
- 삼항 연산자는 매우 단순한 경우만 사용
- do/while 루프는 피함

### 5. 착한 함수(Function)

- 함수는 작을수록 좋다
- 하나의 함수는 **하나의 역할만 수행해야 한다**

### 예시: 온라인 투표 점수 계산 리팩토링

리팩토링 전

```js
var vote_changed = function (old_vote, new_vote) {
  var score = get_score();
  if (new_vote !== old_vote) {
    if (new_vote == "Up") {
      score += old_vote === "Down" ? 2 : 1;
    } else if (new_vote == "Down") {
      score -= old_vote === "Up" ? 2 : 1;
    } else if (new_vote == "") {
      score += old_vote === "Up" ? -1 : 1;
    }
  }
  set_score(score);
};
```

문제점

- 점수 계산과 변경 작업 두 가지를 동시에 처리
- 가독성 떨어짐

리팩토링 후

```js
var vote_value = function (vote) {
  if (vote === "Up") return +1;
  if (vote === "Down") return -1;
  return 0;
};

var vote_changed = function (old_vote, new_vote) {
  var score = get_score();
  score -= vote_value(old_vote);
  score += vote_value(new_vote);
  set_score(score);
};
```

## 코드리뷰 & 리팩토링

### 코드 리뷰

- **냄새나는 코드(Code Smell)**를 발견하고 개선하는 과정
- 가독성, 유지보수성, 구조적 문제를 점검하기 위해 수행
- 레거시 코드를 클린 코드로 바꾸는 핵심 과정

### 코드 인스펙션(Code Inspection)

- 개발 표준 준수 여부 점검
- 잘못된 코드나 위험한 구조 발견 및 수정

#### 절차

1. Planning : 계획 수립
2. Overview : 교육과 역할 정의
3. Preparation : 인스펙션을 위한 인터뷰, 산출물, 도구 준비
4. Meeting : 검토 회의로 각자 역할을 맡아 임무 수행
5. Rework : 발견한 결함을 수정하고 재검토 필요한지 여부 결정
6. Fellow-up : 보고된 결함 및 이슈가 수정되었는지 확인하고 시정조치 이행

## 시큐어 코딩

시큐어 코딩은 **보안 취약점을 사전에 제거하여 안전한 소프트웨어를 개발하는 기법**이다.

### 목적

- 공격 가능성이 있는 취약한 코드를 사전에 차단
- SQL Injection, XSS, CSRF, 인증 우회, 무작위 대입 공격 등을 예방

### 실제 사고 사례

- SQL 인젝션으로 개인정보 유출
- URL 파라미터 조작으로 사용자 정보 노출
- 무작위 대입 공격으로 기프트카드 쿠폰 정보 유출

## SQL 인젝션 예시

### 취약한 코드

```java
String query = "SELECT * FROM users WHERE userid = '" + userid + "'" +
               "AND password = '" + password + "'";

Statement stmt = connection.createStatement();
ResultSet rs = stmt.executeQuery(query);
```

문제점

- 문자열 결합 방식 → 외부 입력이 그대로 쿼리에 삽입됨
- 공격자가 `' OR '1'='1` 등을 입력하면 로그인 우회 가능

### 안전한 코드

```java
String query = "SELECT * FROM users WHERE userid = ? AND password = ?";

PreparedStatement stmt = connection.prepareStatement(query);
stmt.setString(1, userid);
stmt.setString(2, password);
ResultSet rs = stmt.executeQuery();
```

개선점

- 입력값을 **바인딩 처리**하여 SQL injection 방지
- 입력값이 그대로 쿼리 문자열로 들어가지 않음
