# SQL Injection

해커가 조작한 SQL 구문이 그대로 DB에 전달되어 비정상 명령을 실행시키는 공격 기법이다.  
입력값을 제대로 검증하지 않으면 인증 우회, 데이터 유출, 데이터 변조 등이 발생할 수 있다.

## 공격 방법

### 인증 우회

- 로그인 입력란에 악의적 SQL을 넣어 인증 절차를 무력화
- `ID = "abc" AND PASSWORD = "1234' OR '1'='1"` → 항상 참이 되어 로그인 성공
- `1234; DELETE \* FROM USER WHERE ID='1';`처럼 추가 명령을 실행시킴(서버 권한에 따라 치명적)

### 데이터 노출

- 쿼리 조작으로 에러를 유발시켜 DB 스키마나 컬럼명을 유추
- URL 쿼리스트링 등에 악성값을 넣어 에러 응답을 분석함

## 방어 방법

### input 값을 받을 때 특수문자 여부 검사하기

서버 쪽에서 길이/패턴 검사 및 위험 문자 필터링을 수행한다.

단, 단순 필터만으로는 완전 방어 불가(우회 가능)

### SQL 서버 오류 발생 시 해당하는 에러 메시지 감추기

DB 오류를 사용자에게 그대로 노출하지 않고 내부 로그에만 기록한다.

애플리케이션에 최소 권한(읽기/쓰기 권한 분리), 일반 사용자엔 뷰(view)로 제한한다.

### PreparedStatement 사용하기

PreparedStatement는 JDBC에서 제공하는 SQL 실행 객체로 SQL 문과 데이터를 분리해서 처리하는 방식이다.

> **Spring (JdbcTemplate)**

```java
// BAD
String sql = "SELECT * FROM users WHERE email = '" + email + "'";
jdbcTemplate.queryForList(sql);
```

```java
// GOOD
String sql = "SELECT * FROM users WHERE email = ?";
List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, email);
// or
String sql = "SELECT * FROM users WHERE email = :email";
MapSqlParameterSource params = new MapSqlParameterSource("email", email);
namedParameterJdbcTemplate.queryForList(sql, params);
```

> **MyBatis**

`${}`는 문자열을 그대로 대체하므로 입력값에 `; DROP TABLE ...` 같은 문장이 들어오면 그대로 실행될 수 있다.

```sql
// BAD
<select id="find" resultType="User">
  SELECT * FROM users WHERE ${whereClause}
</select>
```

`#{}`는 JDBC의 PreparedStatement 바인딩과 동일하게 작동한다.

```sql
// GOOD
<select id="findUserByUsername" parameterType="string" resultType="User">
  SELECT * FROM users WHERE username = #{username}
</select>
```

## 추가 자료

- [SQL injection 공격](https://www.youtube.com/watch?v=FoZ2cucLiDs)
