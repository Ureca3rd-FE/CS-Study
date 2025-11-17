# 저장 프로시저(Stored Procedure)

저장 프로시저는 **여러 SQL문을 하나의 함수처럼 묶어 실행하는 쿼리 집합**이다.  
복잡한 쿼리를 매번 작성하지 않고 프로시저명 + 인자만 전달해 쉽게 실행할 수 있다.

## 생성 및 호출 문법

```sql
CREATE OR REPLACE PROCEDURE 프로시저명(
변수1 IN 타입,
변수2 OUT 타입
)
IS
내부변수 타입;
BEGIN
-- 실행 로직
END;

EXEC 프로시저명;
```

### 예시 1 (IN 파라미터)

```sql
CREATE OR REPLACE PROCEDURE test(name IN VARCHAR2)
IS
  msg VARCHAR2(20) := '내 이름은';
BEGIN
  dbms_output.put_line(msg || ' ' || name);
END;
```

```sql
EXEC test('규글');
-- 출력: 내 이름은 규글
```

### 예시 2 (OUT 파라미터)

```sql
CREATE OR REPLACE PROCEDURE test(name OUT VARCHAR2)
IS
BEGIN
  name := 'Gyoogle';
END;
```

```sql
DECLARE
  out_name VARCHAR2(100);
BEGIN
  test(out_name);
  dbms_output.put_line('내 이름은 ' || out_name);
END;
-- 출력: 내 이름은 Gyoogle
```

## 장점

### 최적화 & 캐시

- 최초 실행 시 컴파일, 최적화 후 캐시에 저장
- 이후엔 컴파일 없이 실행 → 빠름

### 유지보수 쉬움

- 로직 변경 시 프로시저 내부만 수정하면 됨

### 트래픽 감소

- 클라이언트는 SQL 전체를 보내지 않음 → 네트워크 감소

### 보안 강화

- 테이블 직접 접근을 막고 프로시저만 실행 가능

## 단점

### 호환성 문제

- DBMS마다 문법, 구조가 달라 재사용성 떨어짐

### 성능 제한

- 일반 프로그래밍 언어보다 연산 성능 떨어짐

### 디버깅 어려움

- 내부 로직 추적이 힘듦
