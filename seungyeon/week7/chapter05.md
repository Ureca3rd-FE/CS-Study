# 이상(Anomaly)
잘못된 테이블 설계를 하면 Anomaly(이상 현상)가 발생 -> 정규화 필요

Anomaly의 종류
## 1. 삽입 이상 Inserting Anomaly
> 불필요한 데이터를 추가해야 삽입이 가능한 상황
```
기본키가 student id, course id인 경우
course를 수강하지 않은 학생은 course id가 없음->
course id를 null로 해야 하는데 기본키는 null이 될 수 없어 table에 추가 불가
```
## 2. 갱신 이상 Update Anomaly
> 일부만 변경하여 데이터가 불일치하는 모순 문제
```
어떤 학생의 전공이 computer에 music으로 바뀌는 경우
모든 전공을 "music"으로 바꾸어야 함. 그러나 일부를 바꾸지 못한 경우 제대로 파악이 안 됨
```
## 3. 삭제 이상 Deletion Anomaly
> 튜플 삭제로 인해 꼭 필요한 데이터까지 함께 삭제되는 문제
```
어떤 학생이 수강을 철회하는 경우
student id, course id, department, grade의 정보 중 student id, department와 같은 학생 정보까지 삭제
```