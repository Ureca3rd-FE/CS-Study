# Index

## 1. 목적

RDBMS에서 검색 속도를 높이기 위한 기술

## 2. 과정

Table을 생성하면 MYD, MYI, FRM 3개의 파일이 생성됨.

- MYD: 실제 데이터가 있는 파일
- MYI: Index 정보가 들어있는 파일
- FRM: 테이블 구조가 저장된 파일

index를 사용하지 않으면 MYI 파일은 비어있음. index 사용하면 MYI 파일 생성.

이후 사용자가 Select 쿼리로 index 사용하는 column 탐색시 MYI 파일 내용을 검색.

## 3. 단점

- index 생성시 .mdb 파일 크기 증가
- 한 페이지를 동시에 수정할 수 있는 병행성 줄어듦
- 인덱스 된 field에서 data를 업데이트하거나 record를 추가/삭제시 성능 떨어짐
- 데이터 변경 작업이 자주 일어나는 경우 index를 재작성해야하므로 성능에 영향을 미침

## 4. 분석

- 사용하면 좋은 경우
  - where 절에서 자주 사용되는 column
  - 외래키가 사용되는 column
  - join에 자주 사용되는 column
- 사용하면 안 좋은 경우
  - data 중복도가 좋은 column
  - DML이 자주 일어나는 column

## 5. DML이 일어날 때의 상황

- INSERT

  기존 block에 여유가 없는데 새 data 입력<br>
  -> 새로운 block을 할당 받은 후 key를 옮기는 작업 수행 (다량의 redo가 기록되고 유발)
  -> index split 작업 동안 해당 block의 key 값에 대해 DML이 블로킹. 대기 이벤트 발생.

- DELETE

  - table에서 data가 delete되는 경우: data가 지워지고 다른 data가 그 공간을 사용 가능
  - index에서 data가 delete되는 경우: data가 지워지지 않고 사용 안 됨 표시만 해둠

  -> table의 data 수와 index의 data 수가 다를 수 있음

- UPDATE

  table에서 update가 발생->index는 update 할 수 없음

  index에선 delete가 발생한 후 새로 insert 작업 -> 작업이 2배
