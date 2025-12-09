# 클린코드&시큐어 코딩

## 클린코드

코드를 작성하는 의도와 목적이 명확, 다른 사람이 쉽게 읽을 수 있음<br>
=가독성이 좋은 코드

가독성을 높이기 위한 규칙

#### 1. 네이밍

> 변수, 클래스, 메소드에 의도가 분명한 이름 사용

- 잘못된 정보 전달이 가능한 이름 사용 x
- 범용적으로 사용되는 단어 사용 x
- 연속된 숫자가 불용어를 덧붙이는 방식 x

#### 2. 주석달기

> 읽는 사람이 작성한 사람만큼 잘 이해할 수 있도록

- 빠르게 유추 가능한 코드엔 x
- 설명을 위한 설명엔 x
- 반드시 달아야 할 이유가 있는 경우에만

#### 3. 꾸미기(Aesthetics)

> 보기좋게 배치하고 꾸미기

- 규칙적인 들여쓰기와 줄바꿈
- 일관성 있고 간결한 패턴 적용
- 메소드를 이용해 불규칙한 중복 코드 제거

클래스 전체를 하나의 그룹이라 생각하지 않고, 그 안에서 여러 그룹으로 나누는 것이 읽기 좋다

#### 4. 흐름제어 만들기

> if문 잘 쓰는 법

- 왼쪽에 변수, 오른쪽에 상수 두고 비교
- 부정보단 긍정으로 확인
- if/else를 사용하며, 삼항 연산자는 간단한 경우에만 사용
- do/while 루프는 피한다

#### 5. 착한 함수

> 함수는 가급적 작게, 한번에 하나의 작업만 수행

- 두 가지 일을 하는 함수를 두 함수로 분리해 가독성 향상

예시

```java
private void voteChange(int oldVote, int newVote){
  int score=getScore();
  if(newVote!=oldVote){
    if(newVote=='up'){
      score+=(oldVote=='down'?2:1); //이전이 비추(-1)이었으면 +2, 아니면 +1해서 최종 1로
    }else if(newVote=='down'){
      score-=(oldVote=='up'?2:1); //이전이 추천(+1)이었으면 -2, 아니면 -1해서 최종 -1로
    }else if(newVote==''){
      score+=(oldVote=='up'?-1:1); //이전이 추천이면 -1해서 0으로, 비추면 +1해서 0으로
    }
  }
  setScore(score)
}
```

복잡하고 읽히지 않음

```java
private int voteValue(vote){
  if(vote=='up') return 1;
  if(vote=='down') return -1;
  return 0;
}

private void voteChange(int oldVote, int newVote){
  int score=getScore();
  score-=voteValue(oldVote);//이전값 제거
  score+=voteValue(newVote);//새 값 추가
  setScore(score);
}
```

훨씬 이해하기 쉬움

## 코드리뷰&리팩토링

레거시 코드를 클린 코드로 만드는 것. 코드 리뷰로 클린하지 않은 코드를 찾고, 리팩토링을 통해 점진적으로 개선한다.

### 코드 인스펙션 Code inspection

작성한 코드를 분석하여 개발 표준에 위배되거나 잘못 작성한 부분을 수정하는 작업

#### 절차

1. Planning: 계획 수립
2. Overview: 교육과 역할 정의
3. Preparation: 인스펙션을 위한 인터뷰, 산출물, 도구 준비
4. Meeting: 검토 회의로 각자 역할을 맡앙 임무 수행
5. Rework: 발견한 결함을 수정하고 재검토 필요한지 여부 결정
6. Fellow-up: 보고된 결함 및 이슈가 수정되었는지 확인하고 시정조치 이행

### 리팩토링 대상

- 메소드 정리

  그룹으로 묶을 수 있는 코드, 수식을 메소드로 변경

- 객체 간의 기능 이동

  메소드 기능에 따른 위치 변경, 클래스 기능을 명확히 구분

- 데이터 구성

  캡슐화 기법을 적용해 데이터 접근 관리

- 조건문 단순화

  조건 논리를 단순하고 명확하게 작성

- 메소드 호출 단순화

  메소드 이름이나 목적이 맞지 않을 때 변경

- 클래스 및 메소드 일반화

  동일 기능 메소드가 여러 개 있으면 슈퍼클래스로 이동

### 리팩토링 진행 방법

- 아키텍처 관점 시작
- 디자인 패턴 적용
- 단계적으로 하위 기능에 대해 변경

의도하지 않은 기능 변경이나 버그 발생에 대비해 회귀 테스트를 진행한다.
이클립스와 같은 IDE 도구 이용할 것.

## 시큐어 코딩

> 안전한 소프트웨어를 개발하기 위해 소스코드 등에 존재할 수 있는 잠재적인 보안 약점을 제거

보안 약점을 노려 발생하는 사고 사례

- SQL injection 취약점으로 개인정보 유출 사고
- URL 파라미터 조작으로 개인정보 노출
- 무작위 대입공격으로 기프트카드 정보 유출

### SQL Injection

```java
String query "SELECT * FROM users WHERE userid = '" + userid + "'" + "AND password = '" + password + "'";

Statement stmt = connection.createStatement();
ResultSet rs = stmt.executeQuery(query);
```

user id와 password에 바로 값을 넣고 실행시켜서 이상한 문장을 끼운 요청에 당할 가능성 있음

```java
String query "SELECT * FROM users WHERE userid = ? + "AND password = ?";

PrepareStatement stmt = connection.prepareStatement(query);
stmt.setString(1, userid);
stmt.setString(2, password);
ResultSet rs = stmt.executeQuery();
```

PrepareStatement로 이상한 문장들을 방어
