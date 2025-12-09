# 클린코드와 시큐어코딩

[클린코드와 시큐어코딩 | 👨🏻‍💻 Tech Interview](https://gyoogle.dev/blog/computer-science/software-engineering/Clean%20Code%20&%20Secure%20Coding.html)

**<목차>**

---

# 클린코드 복습

**클린코드란?**

```
`한 가지를 제대로 한다.`

`단순하고 직접적이다.`

`특정 목적을 달성하는 방법은 하나만 제공한다.`

`중복 줄이기, 표현력 높이기, 초반부터 간단한 추상화 고려하기 이 세가지가 비결`

`코드를 읽으면서 짐작했던 기능을 각 루틴이 그대로 수행하는 것`
```

**가독성을 높인다는 것은?**

다른 사람이 코드를 봐도, 자유롭게 수정이 가능하고 버그를 찾고 변경된 내용이 어떻게 상호작용하는지 이해하는 시간을 최소화 시키는 것...

## 클린코드 규칙

### 1. **네이밍 (Naming)**

> 변수, 클래스, 메소드에 의도가 분명한 이름 사용하기
> 

```java
int elapsedTimeInDays;
int daysSinceCreation;
int fileAgeInDays;
```

- 잘못된 정보를 전달할 수 있는 이름은 사용X
- 범용적으로 사용되는 단어는 사용X (aix, hp 등…)
- 연속된 숫자나 boolean 용어를 덧붙이는 방식X

### 2. **주석달기 (Comment)**

> 코드를 읽는 사람이 코드를 작성한 사람만큼 잘 이해할 수 있도록 설명 작성
> 

```java
// 주어진 'name'으로 노드를 찾거나 아니면 null을 반환
// 만약 depth <= 0이면 'subtree'만 검색
// 만약 depth == N 이면 N 레벨과 그 아래만 검색
Node* FindNodeInSubtree(Node* subtree, string name, int depth);
```

- 코드를 빠르게 유추할 수 있는 내용에는 주석 사용X
- 설명을 위한 설명에는 사용X

### 3. **꾸미기 (Aesthetics)**

> 보기좋게 배치하고 꾸미기
> 

- 규칙적인 들여쓰기와 줄바꿈 → 가독성 향상
- 일관성있고 간결한 패턴을 적용해 줄바꿈
- 메소드를 이용해 불규칙한 중복 코드 제거

클래스 전체를 하나의 그룹이 아니라, 해당 클래스 안에도 여러 개의 그룹이 있다 생각하자

### 4. **흐름 제어 만들기 (Making control flow easy to read)**

> 조건문과 반복문을 단순하고 읽기 쉽게 구성하여, 코드의 흐름을 명확하게 전달하기
> 

```java
if (length >= 10)

while (bytes_received < bytest_expected)
```

- 왼쪽에는 변수를, 오른쪽에는 상수를 두고 비교

```java
if( a == b ) { // a!=b는 부정
	// same
} else {
	// different
}
```

- 부정이 아닌 긍정문 다루기
- if/else를 사용하며, 삼항 연산자는 매우 간단한 경우만 사용
- do/while 루프는 피하기

### 5. **착한 함수 (Function)**

> 함수는 가급적 작게, 한번에 하나의 작업만 수행하도록 작성하기
> 

*ex) 온라인 투표*

*사용자가 추천을 하거나, 이미 선택한 추천을 변경하기 위해 버튼을 누르면 vote_change(old_vote, new_vote) 함수를 호출한다고 가정하기*

*수정 전*

```java
var vote_changed = function (old_vote, new_vote) {
    
	var score = get_score();
    
	if (new_vote !== old_vote) {
		if (new_vote == 'Up') {
			score += (old_vote === 'Down' ? 2 : 1);
		} else if (new_vote == 'Down') {
			score -= (old_vote === 'Up' ? 2 : 1);
		} else if (new_vote == '') {
			score += (old_vote === 'Up' ? -1 : 1);
		}
	}
	set_score(score);
    
};
```

- old_vote와 new_vote의 상태에 따른 score 계산
- 총점을 계산

한 가지가 아닌, 두 가지 기능을 가진 함수…

*수정 후*

```java
var vote_value = function (vote) {
    
    if(vote === 'Up') {
        return +1;
    }
    if(vote === 'Down') {
        return -1;
    }
    return 0;
    
};

var vote_changed = function (old_vote, new_vote) {
    
    var score = get_score();
    
    score -= vote_value(old_vote); // 이전 값 제거
    score += vote_value(new_vote); // 새로운 값 더함
    set_score(score);
};
```

별도의 함수로 분리하여 가독성을 향상

# **리팩토링 복습**

**코드리뷰 & 리팩토링**

 : 코드리뷰 중 수정해야 할 부분을 발견하면, 리팩토링을 통해 점진적으로 유지보수 & 개선

**코드 인스펙션 (code inspection)**

 : 작성한 개발 소스 코드를 분석하여 개발 표준에 위배되엇거나 잘못 작성된 부분을 수정하는 작업

  (해당 소스 코드를 **실행하기 전**에 사람이 직접 검토)

코드 인스펙션 절차

1. Planning : 계획 수립
2. Overview : 교육과 역할 정의
3. Preparation : 인스펙션을 위한 인터뷰, 산출물, 도구 준비
4. Meeting : 검토 회의로 각자 역할을 맡아 임무 수행
5. Rework : 발견한 결함을 수정하고 재검토 필요한지 여부 결정
6. Fellow-up : 보고된 결함 및 이슈가 수정되었는지 확인하고 시정조치 이행

## 리팩토링 대상

- 메소드 정리 : 그룹으로 묶을 수 있는 코드, 수식을 메소드로 변경함
- 객체 간의 기능 이동 : 메소드 기능에 따른 위치 변경, 클래스 기능을 명확히 구분
- 데이터 구성 : 캡슐화 기법을 적용해 데이터 접근 관리
- 조건문 단순화 : 조건 논리를 단순하고 명확하게 작성
- 메소드 호출 단순화 : 메소드 이름이나 목적이 맞지 않을 때 변경
- 클래스 및 메소드 일반화 : 동일 기능 메소드가 여러개 있으면 수퍼클래스로 이동

## 리팩토링 진행

**진행 순서**

아키텍처 관점 시작 → 디자인 패턴 적용 → 단계적으로 하위 기능에 대한 변경

회귀 테스트 : 의도하지 않은 기능 변경이나 버그 발생에 대비

(이클립스와 같은 IDE 도구로 이용)

# **시큐어 코딩**

<aside>
💡

보안 취약점을 최소화하면서 안전한 소프트웨어를 개발하는 코딩 기법

</aside>

보안 사고사례

- SQL 인젝션 취약점으로 개인유출 사고 발생
- URL 파라미터 조작 개인정보 노출
- 무작위 대입공격 기프트카드 정보 유출

## Java 시큐어 코딩 주요 원칙

### **1. 입력 데이터 검증(Input Validation)**

> 사용자의 입력을 신뢰하지 않고 검증하는 것
> 
> 
>  → 신뢰할 수 없는 입력값이 시스템 내부로 들어오면, 보안 문제가 발생할 가능성 ⬆️
> 

### 예제1)

*안 좋은 예)*

```java
public class SecureCodingTest {
    //안 좋은 예
    public void registerUser(String username, String email) {
        // 이메일 형식 검증 없이 바로 사용 (위험)
        System.out.println("User Registered: " + username + ", Email: " + email);
    }
}
```

- “email”이 유효한 형식인지 확인하지 않음
- 공격자가 `DROP TABLE users;` 같은 문자열을 넣으면 로그가 오염될 가능성 ⬆️

*좋은 예)*

```java
import java.util.regex.Pattern;

public class SecureCodingTest {
    // 좋은 예
    public void registerUser(String username, String email) {
        // 이메일 유효값 검증
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";

        if (!Pattern.matches(emailRegex, email)) {
            throw new IllegalArgumentException("유효하지 않은 이메일 형식입니다.");
        }

        System.out.println("User Registered: " + username + ", Email: " + email);
    }
}
```

- 정규식을 사용하여 이메일 입력값 검증
- 유효하지 않은 이메일인 경우 예외 처리 → 보안 강화

### 2. **SQL 인젝션 방지**

> **PreparedStatement**를 활용하여 직접 SQL을 조작할 수 없도록 방지
> 
> 
>  → SQL Query를 실행할 때 **사용자 입력을 직접 포함하면** 공격자가 SQL문을 조작할 가능성 ⬆️
> 

### 예제2)

*안 좋은 예)*

```java
import java.sql.*;

public class SecureCodingTest {
    // 안 좋은 예
    public boolean login(String username, String password) {
        String DB_URL = System.getenv("DB_URL");
        String DB_USER = System.getenv("DB_USER");
        String DB_PASS = System.getenv("DB_PASS");
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS);
             Statement stmt = conn.createStatement()) {

            // SQL 인젝션 가능!
            String query = "SELECT * FROM users WHERE username = '"
             + username + "' AND password = '" + password + "'";
            ResultSet rs = stmt.executeQuery(query);

            return rs.next(); // 사용자가 존재하면 로그인 성공
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}
```

- **username**에 **"admin' --"**을 입력하면, 비밀번호 없이 로그인이 가능해짐
- SQL 인젝션 공격 가능

*좋은 예)*

```java
import java.sql.*;

public class SecureCodingTest {
    String DB_URL = System.getenv("DB_URL");
    String DB_USER = System.getenv("DB_USER");
    String DB_PASS = System.getenv("DB_PASS");

    // 좋은 예
    public boolean login(String username, String password) {
        String sql = "SELECT * FROM users WHERE username = ? AND password = ?";

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, username);
            pstmt.setString(2, password);

            ResultSet rs = pstmt.executeQuery();
            return rs.next(); // 사용자가 존재하면 로그인 성공
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}
```

- **PreparedStatement**를 사용하여 SQL 인젝션을 방어
- 사용자 입력값을 **자동으로 이스케이프 처리**

### 3. **XXS(Cross-Site Scripting) 방지**

> HTML 특수문자를 이스케이프 처리
> 
> 
>  → 사용자 입력값을 웹페이지에 그대로 출력하면, **XSS 공격**을 받을 가능성 ⬆️
> 

### 예제3)

*안 좋은 예)*

```java
out.println("<h1>Welcome, " + username + "!</h1>");
```

- **username**에 **<script>alert('Hacked!')</script>** 입력 시, 악성 스크립트 실행

*좋은 예)*

```java
import org.apache.commons.text.StringEscapeUtils;

out.println("<h1>Welcome, " + StringEscapeUtils.escapeHtml4(username) + "!</h1>");
```

- **escapeHtml4()**로 특수문자를 변환하여 XSS 방어
- **<script>** 같은 태그가 **&lt;script&gt;**로 변환됨 → **안전**

### 4. 시스템 권한 최소화

> 애플리케이션이 불필요한 시스템 권한을 가지지 않도록 설정
> 
> 
>  → 불필요한 **시스템 권한을 가질수록** 보안 위험 증가
> 

### 예제4)

*안 좋은 예)*

```java
// 모든 파일을 읽고 수정할 수 있는 권한 부여
File file = new File("/etc/config.properties");
file.setWritable(true);
```

- 파일을 모든 사용자가 수정할 수 있음 → **해킹 위험 ⬆️**
- 설정 파일이 조작될 가능성 ⬆️

*좋은 예)*

```java
// 읽기 전용으로 파일 접근
File file = new File("/etc/config.properties");
file.setReadOnly();
```

- 불필요한 수정 권한 제거 → 보안 강화
- **최소한의 권한**만 부여

### 5. 예외 처리

> 예외 메시지에 민감한 정보를 포함하지 않도록 주의
> 
> 
>  → 예외 메시지에 DB 정보, 시스템 경로 등을 포함하면 공격자가 시스템 구조를 파악 가능
> 

### 예제5)

*안 좋은 예)*

```java
import java.sql.*;

public class SecureCodingTest {
    String DB_URL = System.getenv("DB_URL");
    String DB_USER = System.getenv("DB_USER");
    String DB_PASS = System.getenv("DB_PASS");

    // 안 좋은 예
    public boolean login(String username, String password) {
        String sql = "SELECT * FROM users WHERE username = ? AND password = ?";

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, username);
            pstmt.setString(2, password);

            ResultSet rs = pstmt.executeQuery();
            return rs.next();
        } catch (SQLException e) {
            e.printStackTrace(); // 위험: DB 연결 정보 노출 가능
            return false;
        }
    }
}
```

- **e.printStackTrace();**가 DB URL, 사용자명 등의 정보를 노출할 가능성 ⬆️
- 로그 파일이 유출되면, 공격자가 DB 정보를 알아낼 가능성 ⬆️

*좋은 예)*

```java
import java.sql.*;
import java.util.logging.Level;
import java.util.logging.Logger;

public class SecureCodingTest {
    String DB_URL = System.getenv("DB_URL");
    String DB_USER = System.getenv("DB_USER");
    String DB_PASS = System.getenv("DB_PASS");

    // 좋은 예
    public boolean login(String username, String password) {
        String sql = "SELECT * FROM users WHERE username = ? AND password = ?";

        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, username);
            pstmt.setString(2, password);

            ResultSet rs = pstmt.executeQuery();
            return rs.next();
        } catch (SQLException e) {
            System.err.println("데이터베이스 연결 실패, 관리자에게 문의하세요.");
            // 상세 오류는 내부 로그에만 저장
            Logger.getLogger("DB").log(Level.SEVERE, "Database Connection Error", e);
            return false;
        }
    }
}
```

- 사용자에게는 일반적인 오류 메시지만 출력
- 내부 로그에는 **자세한 예외 정보 저장** → 디버깅 가능

**정리…**

✔ **입력값 검증** → 정규식 사용

✔ **SQL 인젝션 방지** → **PreparedStatement** 사용

✔ **XSS 방지** → **escapeHtml4()** 사용

✔ **시스템 권한 최소화** → 불필요한 권한 제거

✔ **예외 처리 강화** → 민감한 정보 노출 방지

---

참고 자료

[[ Concept ] Secure Coding(시큐어 코딩) 알아보기: 개념부터 예제까지](https://drg2524.tistory.com/215)

[secure coding(1)](https://velog.io/@hyein6435/secure-coding1)

[시큐어 코딩 가이드](https://velog.io/@y_bin/%EC%8B%9C%ED%81%90%EC%96%B4-%EC%BD%94%EB%94%A9-%EA%B0%80%EC%9D%B4%EB%93%9C)