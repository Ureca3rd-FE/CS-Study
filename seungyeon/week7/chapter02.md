# 조인 Join
두 개 이상의 테이블이나 데이터베이스를 연결하여 데이터를 검색하는 방법.

테이블을 연결하려면 적어도 하나의 칼럼을 서로 공유하고 있어야 한다. (이를 이용해 연결하여 데이터를 검색하기 때문)

## Join 종류
- inner join
- left outer join
- right outer join
- full outer join
- cross join
- self join

## Inner Join
교집합. 기준 테이블과 join 테이블의 중복된 값을 보여준다.
```sql
select
a.name, b.age
from tableA a inner join tableB b on a.emp=b.emp;
```

## Left Outer Join
앞의 테이블을 기준으로 join. `기준 테이블 값`과 중복된 `조인 테이블 값`만 합친다.
```sql
select
a.name, b.age
from tableA a
left outer join tableB b on a.emp=b.emp;
```

## Right Outer Join
뒤의 테이블을 기준으로 join. `조인 테이블 값`과 중복된 `기준 테이블 값`만 합친다.
```sql
select
a.name, b.age
from tableA a
right outer join tableB b on a.emp=b.emp;
```

## Full Outer Join
합집합. 두 테이블의 모든 데이터 검색.
```sql
select
a.name, b.age
from tableA a
full outer join tableB b on a.emp=b.emp;
```

## Cross Join
모든 경우의 수를 전부 표현해주는 방식.<br>
A 3개, B 4개면 총 3*4=12개의 데이터가 검색된다.
```sql
select
a.name, b.age
from tableA a
cross join tableB b;
```

## Self Join
자기 자신과 조인. 하나의 테이블을 여러번 복사해서 조인하는 느낌.<br>
자신이 갖고 있는 칼럼을 다양하게 변형해 활용할 때 자주 사용.
```sql
select
a.name, b.age
from tableA a, tableA b;
```