# 8주차 🛅데이터베이스

## Chap04. 트랜잭션 격리 수준 (Transaction Isolation Level)

### #1. 격리 수준 (Isolation Level)

#### 개념

- DBMS에서 트랜잭션이 **동시에 실행**될 때, 서로의 작업(변경사항)이 **얼마나 격리(고립)** 할 지를 결정하는 수준
- 고립 수준이 높을수록
  - 데이터 일관성, 데이터 무결성 높아짐
  - 동시성 낮아짐 -> 성능 저하 발생

#### 종류

1. **Read Uncommitted** (읽기 미완료 허용)

   - 특징
     - 실행 중인 트랜잭션이 DB에서 변경한 데이터를 커밋하지 않은 상태더라도, 다른 트랜잭션이 그 데이터(레코드)를 읽을 수 있음
     - 가장 낮은 격리 수준 -> 성능은 좋지만 데이터 일관성 보장 X
   - 단점 : Dirty Read, Non-Repeatable Read, Phantom Read 발생 가능

2. **Read Committed** (읽기 완료 허용)

   - 특징
     - 실행 중인 트랜잭션이 DB에서 변경한 데이터를 커밋하지 않은 상태에서는 다른 트랜잭션이 그 데이터(레코드)를 읽을 수 없음
     - 즉, 직전에 커밋된 버전(변경 전의 데이터)를 조회하게됨
     - SELECT 마다 새로운 스냅샷(커밋 데이터)을 읽음 -> 가장 최근에 커밋된 데이터를 기준으로 읽음
     - 동일한 데이터를 두 번 읽을 때, 그 사이에 다른 트랜잭션이 데이터를 커밋하면 결과가 달라짐 (Non-Repeatable Read)
     - Dirty Read 방지
   - 단점 : Non-Repeatable Read, Phantom Read 발생 가능

3. **Repeatable Read** (반복 가능한 읽기)

   - 특징
     - 트랜잭션이 시작된 시점의 스냅샷(커밋된 데이터 상태)를 기준으로 읽기(SELECT)를 수행
     - 같은 트랜잭션 내에서 동일한 SELECT 결과를 보장
     - 다른 트랜잭션이 데이터를 수정/삭제하더라도, 현재 트랜잭션에서는 변경 전 상태만 조회됨
     - Dirty Read, Non-Repeatable Read 방지
   - 단점 : Phantom Read 발생

4. **Serializable** (직렬화)
   - 특징
     - 모든 트랜잭션을 완전히 순차적으로 실행한 것처럼 동작
     - "Dirty Read", "Non-repeatable Read", "Phantom Read" 모두 발생하지 않음
   - 단점: 성능 저하, 교착상태 발생 가능성

#### 격리 수준별 이상현상 발생 여부

| 격리 수준        | Dirty Read | Non-Repeatable Read |       Phantom Read       |
| :--------------- | :--------: | :-----------------: | :----------------------: |
| Read Uncommitted |  ⚠️ 발생   |       ⚠️ 발생       |         ⚠️ 발생          |
| Read Committed   |  ❌ 방지   |       ⚠️ 발생       |         ⚠️ 발생          |
| Repeatable Read  |  ❌ 방지   |       ❌ 방지       | ⚠️ 발생 (MySQL에서는 ❌) |
| Serializable     |  ❌ 방지   |       ❌ 방지       |         ❌ 방지          |

---

### #2. 트랜잭션 격리 수준별 이상 현상

#### 개념

- 여러 트랜잭션이 동시에 수행될 때 발생할 수 있는 데이터 불일치 현상(읽기 현상)
- 격리 수준에 따라 발생 여부가 달라짐

#### 종류

1. **Dirty Read**
   - 발생하는 격리 수준: Read Uncommitted
   - 개념: 실행 중인 트랜잭션이 변경 후 커밋하지 않은 데이터를 다른 트랜잭션이 읽을 수 있음
   - 예시
     - 트랜잭션A: `UPDATE users SET point = 100 WHERE id = 1;` -> COMMIT 안한 상태
     - 트랜잭션B: `SELECT point FROM users WHERE id = 1;` -> 트랜잭션A의 미완료 값(100)을 조회함
     - 트랜잭션A가 ROLLBACK할 경우, 트랜잭션B가 조회한 값은 DB의 값과 불일치하게 됨
     - 즉, 트랜잭션B는 트랜잭션A의 ROLLBACK 후 실제 DB상태와 다를 수 있는 값을 읽게됨
2. **Non-Repeatable Read**
   - 발생하는 격리 수준: Read Uncommitted, Read Committed
   - 개념: 한 트랜잭션 내에서 동일한 데이터를 두 번 이상 조회를 수행할 때, 그 사이에 다른 트랜잭션이 커밋한 변경 내용이 반영되어 결과가 달라질 수 있음
   - 예시
     - 트랜잭션A: `SELECT point FROM users WHERE id = 1;` -> 첫번째 조회 (point = 10)
     - 트랜잭션B: `UPDATE users SET point = 50 WHERE id = 1; COMMIT;` -> 값 수정 및 커밋
     - 트랜잭션A: `SELECT point FROM users WHERE id = 1;` -> 두번째 조회 (point = 50)
     - 트랜잭션A가 한 트랜잭션 내에서 같은 데이터를 읽었지만, 결과가 다르게 나옴
3. **Phantom Read**
   - 발생하는 격리 수준: Read Uncommitted, Read Committed, Repeatable Read
   - 개념: 한 트랜잭션 내에서 동일한 조건으로 두 번 이상 조회를 수행할 때, 다른 트랜잭션이 데이터를 추가/삭제(INSERT/DELETE)하여 두 번의 조회 결과에 나타나는 행의 개수가 달라지는 현상
   - 예시
     - 트랜잭션A: `SELECT * FROM users WHERE point > 50;` -> 첫번째 조회 (행 2개)
     - 트랜잭션B: `INSERT INTO users (id, point) VALUES (3, 80); COMMIT;` -> 새로운 행 추가 및 커밋
     - 트랜잭션A: `SELECT * FROM users WHERE point > 50;` -> 두번째 조회 (행 3개)

#### 의문점

- Phantom Read가 발생할 수 있는 Repeatable Read 격리 수준에서는 실행 중인 트랜잭션이 시작된 시점의 스냅샷을 기준으로 조회를 수행함
- 이는 다른 트랜잭션이 삽입/수정/삭제하더라도 시작 시점의 데이터를 조회하므로 삭제한 경우의 Phantom Read는 발생하지 않는것 아닌가?

#### 해소

- Phantom Read 발생 여부는 **DBMS의 내부 구현 방식** 마다 다름!

1. **표준 SQL 관점** (이론적 정의)
   - 다른 트랜잭션이 새로운 행을 추가/삭제(INSERT/DELETE)하면 같은 조건으로 두 번 이상 조회(SELECT)했을 때, 조회되는 행 집합이 달라질 수 있음
   - 행의 개수가 늘어나거나 줄어들 수 있음
2. **MySQL 관점**
   - MVCC(다중 버전 동시성 제어)
     - 시작 시점의 스냅샷을 계속 참조하여 삭제 전 버전을 조회 가능
     - 행 집합이 줄어드는 Phantom Read 방지
   - Gap Lock
     - SELECT 범위 내의 빈공간도 잠금 -> 다른 트랜잭션이 해당 범위내에 INSERT하는 것도 차단함
     - 행 집합이 늘어나는 Phantom Read 방지
3. **Oracle, PostgreSQL 등의 관점**
   - MVCC 사용 O: 행 집합이 줄어드는 Phantom Read 방지
   - Gap Lock 사용 X: 행 집합이 늘어나는 Phantom Read 발생

---

### #3. 기본 격리 수준

#### 개념

- DBMS에서 기본으로 사용하는 격리 수준
- DBMS마다 기본으로 사용하는 격리 수준은 다름 -> 성능과 일관성의 균형을 고려

#### 예시

- Oracle: Read Committed -> 커밋된 데이터만 다른 트랜잭션에서 읽을 수 있도록 보장
- MySQL: Repeatable Read -> 트랜잭션이 시작된 시점의 스냅샷을 기준으로 읽기 수행
