# DB 트랜잭션 Transaction

트랜잭션: 데이터베이스의 상태를 변화시키기 위해 수행하는 작업 단위.

상태를 변화시킨다는 것은 SQL문을 통해 DB에 접근하는 것이다. (select, insert, delete, update)

작업 단위: 많은 SQL 명령문을 사람이 정하는 기준에 따라 정하는 것.

```
예시) A가 B에게 만원을 송금한다.

이때 DB 작업
1. A의 계좌에서 만원 차감 > update문을 사용해 A 잔고 변경
2. B의 계좌에 만원 추가 > update문을 사용해 B 잔고 변경

현재 작업 단위: 출금 update+입금 update
- 이를 통틀어 하나의 트랜잭션
- 두 쿼리문이 성공적으로 완료되어야 하나의 작업(트랜잭션)이 완료 =commit
- 작업 단위에 속하는 쿼리 중 하나라도 실패하면 모든 쿼리문 취소, 이전 상태로 복원 =rollback
```

그러니 트랙잭션 설계를 잘 만드는 것이 데이터를 다룰 때 많은 이점을 가져온다.

## 트랜잭션 특징

- 원자성

  트랜잭션이 DB에 모두 반영되거나, 혹은 전혀 반영되지 않아야 한다.

- 일관성

  트랜잭션의 작업 처리 결과는 항상 일관성 있어야 한다.

- 독립성

  둘 이상의 트랜잭션이 동시에 병행 실행되고 있을 때, 어떤 트랜잭션도 다른 트랜잭션 연산에 끼어들 수 없다.

- 지속성

  트랜잭션이 성공적으로 완료되었으면 결과는 영구적으로 반영되어야 한다.

이 특징을 유지하기 위한 기능들

- Commit

  하나의 트랜잭션이 성공적으로 끝났고, DB가 일관성 있는 상태일 때 이를 알려주기 위해 사용하는 연산.

- Rollback

  하나의 트랜잭션 처리가 비정상적으로 종료되어 트랜잭션 원자성이 깨진 경우.<br>
  트랜잭션이 정상 종료되지 않았을 때 last consistent state(트랜잭션 시작 상태 등)로 roll back 가능.

상황이 주어지면 DB 측면에서 어떻게 해결할 수 있을지 대답할 수 있어야 함

## Transaction 관리를 위한 DBMS 전략

### 이해를 위한 사전 개념

1. DBMS 구조

- 크게 두 가지
  - Query Processor 질의 처리기
  - Storage System 저장 시스템
- 입출력 단위: 고정 길이의 page 단위로 disk에 읽거나 씀.
- 저장 공간: 비휘발성 저장 장치인 disk에 저장, 일부분을 main memory에 저장

2. Page Buffer Manager(Buffer 관리 정책)

- DBMS의 Storage System에 속하는 모듈 중 하나, Main Memory에 유지하는 페이지를 관리하는 모듈
  > Buffer 관리 정책에 따라 UNDO 복구와 REDO 복구가 요구되거나 그렇지 않게 되므로 transaction 관리에 매우 중요한 결정을 가져온다.

3. UNDO  
   필요한 이유: 수정된 페이지들이 **Buffer 교체 알고리즘에 따라서 디스크에 출력** 될 수 있음. Buffer 교체는 transaction과는 무관하게 buffer의 상태에 따라서 결정됨. 이로 인해 정상적으로 종료되지 않은 transaction이 변경한 page들은 원상 복구 되어야 하는데 이 복구를 undo라고 함.

- 2개의 정책(수정된 페이지를 디스크에 쓰는 시점으로 분류)<br/>
  - steal: 수정된 페이지를 언제든지 디스크에 쓸 수 있는 정책
    - 대부분의 DBMS가 채택하는 Buffer 관리 정책
    - UNDO logging과 복구를 필요로 함.
  - ㄱsteal?: 수정된 페이지를 EOT(End Of Transaction)까지는 버퍼에 유지하는 정책
    - UNDO 작업이 필요하진 않지만 메우 큰 메모리 버퍼가 필요함.

4. REDO <br/>
   이미 commit한 transaction의 수정을 재반영하는 복구 작업. Buffer 관리 정책에 영향을 받음.

- transaction이 종료되는 시점에 해당 transaction이 수정한 page를 디스크에 쓸 것인가 아닌가로 기준.
  - FORCE: 수정했던 모든 페이지를 transaction commit 시점에 disk에 반영
    - transaction이 commit 되었을 때 수정된 페이지들이 disk 상에 반영되므로 redo 필요 없음.
  - ㄱFORCE: commit 시점에 반영하지 않은 정책
    - transaction이 disk상의 db에 반영되지 않을 수 있기에 redo 복구가 필요. (대부분의 DBMS 정책)
