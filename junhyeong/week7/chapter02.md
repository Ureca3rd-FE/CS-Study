# 7주차 🛅데이터베이스

## Chap02. 조인 (JOIN)

### #0. JOIN과 카타시안 곱

#### 1. 카타시안 곱

- 개념 : 조인 조건을 생략했을 때 두 테이블의 모든 row를 연결한 결과가 조회된다.
- 특징
  - N \* M의 수만큼 행이 조회된다.
- 코드예시 : 상품 테이블과 카테고리 테이블을 카타시안곱으로 조회하시오.
  ```sql
  select * from   goods, category;
  ```

#### 2. JOIN

- 개념

  - 두개 이상의 테이블을 연결해서 질의하는 것
  - 카타시안 곱에 필터조건을 얹는 것

- 경우의 수 : (보편적으로) 8가지

  1. 데이터 추출 범위에 따른 경우 (inner OR outer)
  2. 비교 조건에 따른 경우 (= OR !=, <, >, <=, >=)
     - 등가조인(Equi Join)과 비등가조인(Non Equi Join)
  3. 비교 테이블에 따른 경우 (자기자신 OR 다른 테이블)
     - self join의 경우 반드시 alias를 작성해야함.

- JOIN 작성 방식
  1. 벤더 전용 JOIN (Oracle JOIN, 벤더 전용 방식) : 일부 DBMS(Oracle 등)에서만 지원
     ```
     select [distinct]   *|컬럼명 [as alias]
     from   테이블명 [alias], 테이블명 [alias] ,
     [where  조건]
     [group by 컬럼명, .. [having 조건]]
     [order by 컬럼명 [asc|desc], ...]
     ```
  2. ANSI JOIN (ANSI 표준 방식) : 모든 DBMS(Oracle, MySQL, SQL Server)에서 동일하게 사용 가능 -> 해당 방식이 더 권장됨.
     ```
     select [distinct]   *|컬럼명 [as alias]
     from   테이블명 [alias]
     join   테이블명 [alias]
     on 조인 조건 | using(조인 컬럼)
     ```
     - on 조인조건 - Non Equi Join
       - 조인을 위한 비교컬럼명이 다를때 OR 비교조건이 =이 아닐때 사용
       - 조인을 위한 비교컬럼이 같은 경우 alias 사용
     - using (조인컬럼) - Equi Join
       - 조인을 위한 비교 컬럼명이 동일할 때 사용
       - alias 없이 사용

---

### #1. INNER JOIN과 OUTER JOIN

#### 1. inner join

- 개념

  - 조인 비교 조건에 맞지 않은 데이터/null 데이터는 조회 되지 않음.
  - join할 때 outer join으로 표시 하지 않으면 기본적으로 inner join으로 조회됨.

- 코드예시1 : 상품번호, 상품명, 상품금액, 카테고리번호, 카테고리이름을 조회하시오.
  ```sql
  -- 벤더 전용 방식
  select gno, brand, price, goods.cno, name
  from goods G, category C
  where G.cno = C.cno;
  -- 테이블 Alias는 as 안씀.
  -- from절에서 작성하므로 모든 곳에서 사용가능
  ```
  ```sql
  -- ANSI 표준 방식
  select gno, brand, price, goods.cno, name
  from goods
  join category
  using (cno);
  ```
- 코드예시2 : 주문일, 주문 번호, 주문한 상품 번호, 상품명, 주문자(id), 상품가격, 주문 수량, 주문 금액을 조회하시오.
  ```sql
  select date_format(odate, "%y-%m-%d") as "주문일", ono as "주문번호"
      , gno as "주문한 상품번호", brand as "상품명"
      , id as "주문자", price as "상품가격"
      , quantity as "주문수량", price*quantity as "주문금액"
  from goods
  join orders
  using (gno);
  ```

#### 1-1. natural join

- 개념 : 동일한 이름과 데이터타입을 가지는 컬럼에 대해 등가조인 수행
- 코드예시 : 사원 테이블과 부서 테이블을 자연조인 하시오.
  ```sql
  select *
  from emp
  natural join dept;
  ```

#### 2. outer join - ANSI 쿼리 사용

- 개념 : 조인 비교 조건에 맞지 않은 데이터도 조회됨.
- 차이점
  - inner join보다 보여주는 데이터의 범위가 더 넓음.
  - 조인조건을 충족하지 않는 데이터는 null로 채워서 표현
  - 즉, left(right)쪽의 기준 테이블의 모든행을 결과에 포함
- 종류

  1.  left outer join : 비교조건에 맞지 않는 왼쪽 테이블의 데이터도 조회
  2.  right outer join : 비교조건에 맞지 않는 오른쪽 테이블의 데이터도 조회
  3.  full outer join : 두 테이블의 모든 행을 조회 (실무에서 거의 사용 X <- 불필요한 값이 많음.)

- 코드예시 : emp 테이블의 모든 직원에 대해 직원번호, 직원이름, 급여, 부서번호, 부서명을 조회하시오.

  ```sql
  select empno, ename, sal ,deptno, dname
  from emp
  join dept
  using (deptno);
  -- inner join은 deptno가 null인 경우 조회 X

  select empno, ename, sal ,deptno, dname
  from emp
  left join dept
  using (deptno);
  -- 코드예시의 문제에 대한 쿼리문
  -- outer join은 deptno, dname을 null로 표현하여 조회
  ```

- 문제해석 Tip!
  - 문제가 "<테이블명>의 **모든** <컬럼명>에 대해서 ~을 조회하시오." 인 경우 -> outer join을 사용한다!

---

### #2. SELF JOIN

#### 1. 다른 테이블과 join하는 경우

- 위에서 살펴본 join들이 서로 다른 테이블을 join한 경우임.

#### 2. self join

- 개념 : 내부에서 join을 해야하는 경우
- 특징
  - 한개의 테이블로 join
  - 테이블에 alias를 이용해서 구별한다.
  - 분류기준이 여러개일때 필요
- 코드예시 : 사원번호, 사원이름, 업무, 급여, 상사번호, 상사이름 조회하시오.
  ```sql
  -- 벤더 전용 방식
  select E.empno, E.ename, E.job, E.sal, E.mgr, M.ename
  from emp E, emp M
  where E.mgr = M.empno;
  -- ANSI 표준 방식
  select E.empno, E.ename, E.job, E.sal, E.mgr, M.ename
  from emp E
  left join emp M
  on E.mgr = M.empno;
  ```
