# 트랜잭션 격리 수준(Transaction Isolation Level)

트랜잭션 격리 수준은 **동시에 실행되는 트랜잭션 간에 어느 정도까지 서로의 데이터를 차단할지 결정하는 규칙**이다.  
격리 수준을 높이면 데이터 일관성은 올라가지만, 동시성(성능)이 떨어지고  
격리 수준을 낮추면 성능은 올라가지만, 데이터 일관성이 깨질 가능성이 생긴다.

## 격리 수준의 필요성

여러 트랜잭션이 동시에 처리될 때

- 너무 강하게 Lock을 걸면 → **성능 저하**
- 너무 약하게 Lock을 걸면 → **잘못된 데이터 읽기(일관성 붕괴)**

이 균형을 맞추기 위해 **Isolation Level**을 사용한다.

## 격리 수준 종류 (낮은 → 높은)

### 1. Read Uncommitted

- 커밋되지 않은 데이터를 읽는 것을 허용
- Shared Lock 없음
- **가장 낮은 일관성 / 가장 높은 성능**
- 발생 문제: **Dirty Read**

### 2. Read Committed

- 읽는 동안만 Shared Lock
- 커밋된 데이터만 읽을 수 있음
- 발생 문제: **Non-Repeatable Read**

### 3. Repeatable Read

- 트랜잭션이 끝날 때까지 읽은 데이터는 계속 동일하게 보장
- 읽은 Row에 대해 수정 불가
- 발생 문제: **Phantom Read**

### 4. Serializable

- SELECT조차 트랜잭션 종료까지 완전 차단
- 가장 강력한 일관성
- 사실상 트랜잭션을 순차 실행하는 것과 동일
- 발생 문제 없음
- **가장 낮은 성능**

## 낮은 단계 Isolation Level에서 나타나는 문제들

### Dirty Read

- 커밋되지 않은 데이터를 읽음
- 예: A가 계좌 +10만원 수정 중(커밋 전)인데 B가 그 값을 읽음
- 발생: **Read Uncommitted**

### Non-Repeatable Read

- 같은 SELECT를 두 번 실행했을 때 결과가 다름
- 이유: 사이에 다른 트랜잭션이 데이터를 수정 또는 삭제
- 발생: **Read Committed, Read Uncommitted**

### Phantom Read

- 같은 범위를 두 번 읽을 때 두 번째 조회에서 새로운 Row가 나타남
- 이유: 다른 트랜잭션이 중간에 새 데이터를 INSERT
- 발생: **Repeatable Read, Read Committed, Read Uncommitted**
