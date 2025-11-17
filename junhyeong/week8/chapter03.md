# 8주차 🛅데이터베이스

## Chap03. 트랜잭션 (Transaction)

### #0. TCL (Transaction Control Language)

#### 개념

- DML: 실제로 데이터를 추가/수정/삭제하는 SQL
- 트랜잭션: 여러 DML 연산을 하나의 **논리적 작업 단위**로 묶은 것
- TCL
  - 트랜잭션의 실행 결과를 제어(확정/취소/부분저장)하는 SQL 명령어 집합
  - 트랜잭션을 **모두 성공**하거나 **모두 실패**하도록 처리하는 하나의 묶음 단위

#### 코드 예시

```sql
START TRANSACTION;  -- 트랜잭션 시작 (TCL)

UPDATE account SET balance = balance - 50000 WHERE id = 'A';  -- DML
UPDATE account SET balance = balance + 50000 WHERE id = 'B';  -- DML

COMMIT;  -- 트랜잭션 확정 (TCL)
```

#### 목적

- 데이터 변경의 일관성/무결성 유지
- 작업의 원자성 보장
- 트랜잭션 수행 결과를 확정 및 복구

#### 주요 명령어

- COMMIT
  - 트랜잭션에서 수행된 모든 변경사항을 DB에 영구 반영
  - `COMMIT;`
- ROLLBACK
  - 트랜잭션에서 수행된 변경을 **모두 취소** + **이전 상태로 복원**
  - `ROLLBACK;`
- SAVEPOINT
  - 트랜잭션 내 특정 지점을 저장 (부분 롤백용)
  - `SAVEPOINT sp1;`
- ROLLBACK TO sp1
  - 특정 SAVEPOINT까지 되돌림
  - `ROLLBACK TO sp1;`
- SET TRANSACTION
  - 트랜잭션 속성 설정 (예 - 격리 수준)
  - `SET TRANSACTION ISOLATION LEVEL READ COMMITED;`

---

### #1. 트랜잭션이란?

#### 개념

- 데이터베이스에서 수행되는 작업의 최소 단위
- SQL 연산(DML)을 논리적 단위로 묶어서 **원자적으로 처리**하도록 보장하는 개념
- 원자적 처리: 모두 성공하거나 모두 실패하도록 처리함

#### 목적

- **데이터 일관성 보장**
  - 데이터베이스가 트랜잭션 수행 전과 수행 후 항상 일관된 상태를 유지하도록 보장
  - 데이터가 비즈니스 규칙 및 제약조건을 항상 충족함
- **데이터 무결성 유지**
  - 데이터의 정확성/완전성/일관성을 유지
  - 복수의 데이터 조작 작업을 하나의 논리적 단위로 묶어, 작업 중 오류 발생 시 전체 작업을 취소하여 이전 상태로 복구함
- **동시성 제어**
  - 여러 사용자가 동시에 데이터베이스 접근 시 데이터 충돌, 불일치가 발생하지 않도록 제어함
  - 트랜잭션 격리 수준과 잠금, MVCC 등의 기법으로 구현

---

### #2. 트랜잭션의 특징 (ACID)

#### 1. 원자성(Atomicity)

- 트랜잭션 내 모든 작업이 전부 성공(All)하거나 전부 실패(Nothing)
- 일부만 반영되는 상태는 존재하지 않음

#### 2. 일관성(Consistency)

- 트랜잭션 실행 전후의 데이터베이스의 일관성 보장
- 모든 제약조건, 규칙이 트랜잭션 수행 후에도 만족되어야 함

#### 3. 고립성(Isolation)

- 동시에 여러 트랜잭션 실행시, 서로 간섭받지 않아야 함
- 한 트랜잭션의 중간 결과를 다른 트랜잭션이 볼 수 없음

#### 4. 지속성(Durability)

- 트랜잭션이 성공적으로 완료되면 그 결과는 영구적으로 보존
- 시스템 오류가 발생하더라도 영구히 보존

---

### #3. 트랜잭션 예시

#### 예시1 - 계좌이체

- 시나리오

  - 상황: A가 B에게 50000원을 송금
  - 동작 과정: A의 잔액에서 50000원을 뺌 -> B 잔액에 50000원을 더함
  - 트랜잭션은 위 두 연산을 하나의 논리적 작업 단위로 묶어 처리하며, 아래 상황 중 하나로 종료
    - ROLLBACK: 두 연산 중 하나라도 실패하면 전체 취소
    - COMMIT: 모두 성공하면 확정

- 코드 예시

  ```sql
  -- TCL: 트랜잭션 시작
  START TRANSACTION;

  -- 아래의 DML 문장들이 트랜잭션에 포함됨
  UPDATE account
      SET balance = balance - 50000
      WHERE user_id = 'A'; -- DML: A 잔액 차감
  UPDATE account
      SET balance = balance + 50000
      WHERE user_id = 'B'; -- DML: B 잔액 증가

  -- TCL: 트랜잭션 종료
  COMMIT; -- 모든 작업이 정상적으로 수행되면 확정 (DB에 반영)
  -- ROLLBACK; -- 오류 발생 시 취소 전체 작업 취소 (변경 내용 복원)
  ```

  - START TRANSACTION 이후에 실행된 DML(INSERT, UPDATE, DELETE) 문들이 하나의 트랜잭션 단위로 묶임
  - 그 트랜잭션은 COMMIT(확정) 또는 ROLLBACK(취소) 명령어로 종료(제어)

#### 예시2 - 온라인 쇼핑 주문 처리

- 시나리오

  - 상황: 고객이 상품을 구매
  - 동작 과정: 주문 테이블에 주문 내역이 추가됨 -> 재고 테이블에서 해당 상품의 수량이 줄어듬
  - 트랜잭션은 위 두 연산을 하나의 논리적 작업 단위로 묶어 처리하며, 아래 상황 중 하나로 종료
    - ROLLBACK: 두 연산 중 하나라도 실패하면 전체 취소
    - COMMIT: 모두 성공하면 확정

- 코드 예시

  ```sql
  -- TCL: 트랜잭션 시작
  START TRANSACTION;

  -- DML: 주문 등록
  INSERT INTO orders (order_id, user_id, total_price, order_date)
  VALUES (1002, 'userB', 69000, NOW());

  SAVEPOINT sp1; -- TCL: 중간 저장점 설정

  -- DML: 재고 차감
  UPDATE product SET stock = stock - 1 WHERE product_id = 'P002';
  -- DML: 포인트 적립
  UPDATE point SET point = point + 690 WHERE user_id = 'userB';

  -- 포인트 적립 중 에러 발생 시
  ROLLBACK TO sp1;  -- TCL: 주문까지만 되돌림

  -- TCL: 모든 작업 성공 시 확정
  COMMIT;
  ```

---

### #4. 트랜잭션을 위한 DBMS의 전략

#### DBMS의 구조

- **질의 처리기 (Query Processor)**
  - 사용자의 SQL 문장을 해석하고 실행하는 역할
  - 주요 구성 요소: 파서(Parser), 옵티마이저(Optimizer), 실행기(Executor)
- **저장 시스템 (Storage System)**
  - 실제 데이터 저장, 인덱스 관리, 트랜잭션 복구 및 동시성 제어 담당
  - 주요 구성 요소
    - 트랜잭션 관리자 (Teansaction Manager): 트랜잭션 제어
    - 버퍼 관리자 (Buffer Manager): 버퍼 관리 정책
    - 복구 관리자 (Recovery Manager): UNDO/REDO
    - 저장 관리자 (Storage Manager): 파일/디스크 접근

#### Buffer 관리 정책

- 버퍼: 메모리와 디스크 사이에서 데이터를 임시로 저장하는 공간
- 버퍼 관리의 목적: 디스크 I/O 최소화 및 트랜잭션 성능 향상
- 주요 버퍼 교체 정책
  - FIFO: 가장 먼저 들어온 페이지 교체
  - LRU (Least Recently Used): 가장 오래 사용하지 않은 페이지 교체
  - MRU (Most Recently Used): 가장 먼저 들어온 페이지 교체
  - Clock Algorithm: LRU를 근사적으로 구현한 방식 (성능 향상 목적)

#### 트랜잭션 복구 메커니즘

- **UNDO** (되돌리기)
  - 개념: 아직 커밋되지 않은 트랜잭션의 변경 내용을 취소
  - 목적: 원자성(Atomicity) 보장
  - 상황
    - 트랜잭션 실행 도중 오류 발생/비정상 종료 시
    - ROLLBACK 실행 시
  - 예시: ROLLBACK 실행 시 로그(Undo Log)를 참조하여 복구
- **REDO** (다시 실행)
  - 개념: 커밋된 트랜잭션의 변경 내용이 시스템 장애로 인해 DB에 반영되지 않았을 경우, 로그(Redo Log)에 기록된 내용을 이용하여 다시 적용하는 과정
  - 목적: 지속성(Durability) 보장
  - 상황: 시스템 장애 (예-서버 다운) 후 DB 복구 시
  - 예시: 시스템 재시작 시, 커밋 완료된 트랜잭션의 변경 내용을 다시 적용하여 데이터 일관성 유지
