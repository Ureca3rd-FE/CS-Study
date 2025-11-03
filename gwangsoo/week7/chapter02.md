# 조인(JOIN)

**JOIN**은 두 개 이상의 테이블을 연결하여 데이터를 검색하는 방법이다.  
 두 테이블을 연결하려면 **공통된 컬럼(키)** 이 존재해야 하며 이를 기준으로 데이터를 결합한다.

## JOIN 종류

| 종류             | 설명                                             | 결과 형태           |
| ---------------- | ------------------------------------------------ | ------------------- |
| INNER JOIN       | 두 테이블의 **공통된 데이터(교집합)** 만 조회    | 교집합              |
| LEFT OUTER JOIN  | 왼쪽 테이블의 모든 데이터 + 오른쪽의 일치 데이터 | 왼쪽 기준           |
| RIGHT OUTER JOIN | 오른쪽 테이블의 모든 데이터 + 왼쪽의 일치 데이터 | 오른쪽 기준         |
| FULL OUTER JOIN  | 양쪽 테이블의 **모든 데이터(합집합)** 조회       | 합집합              |
| CROSS JOIN       | 두 테이블의 **모든 조합(카테시안 곱)** 조회      | 모든 경우의 수      |
| SELF JOIN        | **자기 자신과 조인**                             | 동일 테이블 간 연결 |

## 1. INNER JOIN

**교집합** — 두 테이블 모두에 존재하는 데이터만 조회

```sql
SELECT A.NAME, B.AGE
FROM EX_TABLE A
INNER JOIN JOIN_TABLE B ON A.NO_EMP = B.NO_EMP;
```

A.NO_EMP와 B.NO_EMP가 같은 행만 반환된다.

## 2. LEFT OUTER JOIN

왼쪽 테이블의 모든 데이터 + 오른쪽 테이블의 일치 데이터  
오른쪽에 일치 데이터가 없으면 NULL 반환

```sql
SELECT A.NAME, B.AGE
FROM EX_TABLE A
LEFT OUTER JOIN JOIN_TABLE B ON A.NO_EMP = B.NO_EMP;
```

A 테이블의 모든 행을 기준으로 B 테이블의 일치 데이터를 함께 조회한다.

## 3. RIGHT OUTER JOIN

RIGHT OUTER JOIN은 LEFT OUTER JOIN의 반대 개념이다.  
오른쪽 테이블의 모든 데이터 + 왼쪽 테이블의 일치 데이터  
왼쪽에 일치 데이터가 없으면 NULL 반환

```sql
SELECT A.NAME, B.AGE
FROM EX_TABLE A
RIGHT OUTER JOIN JOIN_TABLE B ON A.NO_EMP = B.NO_EMP;
```

## 4. FULL OUTER JOIN

두 테이블의 **모든 데이터(합집합)** 를 조회한다.  
한쪽에만 존재하는 데이터도 모두 포함된다.

```sql
SELECT A.NAME, B.AGE
FROM EX_TABLE A
FULL OUTER JOIN JOIN_TABLE B ON A.NO_EMP = B.NO_EMP;
```

## 5. CROSS JOIN

두 테이블의 **모든 경우의 수(카테시안 곱)** 를 생성한다.  
A가 3개, B가 4개라면 총 3×4 = 12개의 행이 생성된다.

```sql
SELECT A.NAME, B.AGE
FROM EX_TABLE A
CROSS JOIN JOIN_TABLE B;
```

## 6. SELF JOIN

**하나의 테이블을 자기 자신과 조인**하는 방식이다.  
같은 테이블을 여러 번 복사해서 조인한다고 생각하면 된다.  
조직도, 계층 구조(상사-부하 관계) 등의 표현에 자주 사용된다.

```sql
SELECT A.NAME, B.AGE
FROM EX_TABLE A, EX_TABLE B;
```
