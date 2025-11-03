# SQL Injection

[SQL Injection | 👨🏻‍💻 Tech Interview](https://gyoogle.dev/blog/computer-science/data-base/SQL%20Injection.html)

**<목차>**

---

# **SQL Injection이란?**

<aside>
💡

공격자에 의해 조작된 SQL 쿼리문이 데이터베이스에 그대로 전달되어, **비정상적 명령을 실행시키는 공격 기법**

</aside>

SQL Injection의 영향

- 민감한 사용자 데이터 또는 애플리케이션 데이터 노출
- 인증 및 승인 제한사항 위반이 가능해짐
- 데이터베이스가 손상 또는 삭제에 취약해짐
- 백엔드 인프라 손상
- 앱 및 서비스 제공자는 지식 재산 또는 사용자의 신뢰를 잃어버림

# 공격 방법

## 1) 인증 우회

> 로그인을 할 때, 아이디와 비밀번호를 input 창에 입력하게 되는데 이 때 동시에 다른 쿼리문이 함께 입력되도록 하는 방법
> 

*ex) 아이디가 abc, 비밀번호가 만약 1234일 때 로그인 하는 경우…*

```sql
SELECT * 
FROM USER 
WHERE ID = "abc" AND PASSWORD = "1234";
```

*input창에 비밀번호를 입력함과 동시에 다른 쿼리문을 함께 실행시킴*

```sql
SELECT * 
FROM USER 
WHERE ID = "abc" AND PASSWORD = "1234"; DELETE FROM USER WHERE ID = "abc";
```

## 2) 데이터 노출

> 시스템에서 발생하는 **에러 메시지**를 이용해 공격하는 방법
> 

에러 = 개발자가 버그를 수정하는 면에서 도움을 받을 수 있는 존재

→ 이를 역이용해 악의적인 구문을 삽입하여 에러를 유발시킴!

*ex) GET 방식으로 동작하는 URL 쿼리 스트링을 추가하여 에러를 발생시킴…*

= 해당 웹앱의 데이터베이스 구조를 유추하여 해킹에 활용

# 방어 방법

## 1) **input 값을 받을 때, 특수문자 여부 검사하기**

> 로그인 전, 검증 로직을 추가하여 미리 설정한 특수문자들이 들어왔을 때 요청을 막아내기
> 

## 2) **SQL 서버 오류 발생 시, 해당하는 에러 메시지 감추기**

> view를 활용하여 원본 데이터베이스 테이블에는 접근 권한 높이기
  = 일반 사용자는 view로만 접근하여 에러를 볼 수 없음!
> 

## 3) **preparestatement 사용하기**

> preparestatement를 사용 → 특수문자를 자동으로 escaping 해줌
  = 서버 측에서 필터링 과정을 통해서 공격을 방어하기
> 

preparestatement란?

 : statement와는 다르게 쿼리문에서 전달인자 값을 **`?`**로 받는 것

= SQL 문을 효율적으로 여러 번 실행할 수 있는 객체로 미리 컴파일

**`?`**를 매개변수의 자리표시자로 사용하여 컴파일된 삽입 시도를 무효화…

*ex) "안녕하세요, 제 이름은 __입니다.” → 이름인 __에 들어갈 값을 따로 넣는 형태*

# 권장사항

- 강력한 단방향 솔트 해시를 사용하여 비밀번호 암호화
    - 상업용 애플리케이션: 256비트 AES
    - 타원 곡선 암호: 224비트 또는 256비트 공개 키 크기
- 권한 제한
- 데이터 형식을 정밀하게 구조화하고 데이터가 예상되는 형식을 준수하는지 확인
- 되도록 개인 정보 또는 민감한 사용자 데이터를 저장하지 않기
    
    *ex) 데이터를 전송하거나 저장하는 대신 해싱하여 애플리케이션 로직 구현*
    
- 민감한 정보에 액세스하는 API 및 서드 파티 애플리케이션 최소화

---

*참고 자료*

[SQL Injection](https://velog.io/@yuseogi0218/SQL-Injection)

[SQL 삽입  |  Security  |  Android Developers](https://developer.android.com/privacy-and-security/risks/sql-injection?hl=ko)