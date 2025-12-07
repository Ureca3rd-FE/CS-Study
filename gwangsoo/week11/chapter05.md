# 객체지향 프로그래밍

객체지향 프로그래밍(Object Oriented Programming, OOP)은 현실 세계의 사물이나 개념을 **객체**라는 단위로 표현하여 데이터(필드)와 행동(메소드)을 하나로 묶어 개발하는 프로그래밍 패러다임이다.

OOP는 이전 세대의 패러다임인 비구조적 → 구조적(절차적) 프로그래밍의 한계를 개선하며 발전했다.

## 과거 패러다임에서 객체지향이 등장하기까지

### 1. 순차적, 비구조적 프로그래밍

- 코드를 위에서 아래로 순차적으로 실행시키는 방식
- 재사용성과 구조가 부족해 규모가 커지면 복잡도 급증
- `goto` 문을 남발하게 되고 흐름이 얽혀 유지보수가 어려워짐

### 2. 절차적(구조적) 프로그래밍

- 반복되는 로직을 **함수** 로 분리하여 재사용성을 확보
- 데이터와 함수가 별도로 존재
  - 예: 책 데이터 구조 따로, 책 관련 함수 따로
- 데이터와 행동이 분리되면서 **논리적 관계가 코드 구조에서 드러나지 않음**
- 규모가 커질수록 데이터와 함수 매핑이 복잡해짐

이 한계를 해결하기 위해 **데이터와 그것을 다루는 행동을 하나로 묶는 방식**, 즉 객체지향 패러다임이 등장했다.

## 객체지향의 핵심 개념

### 객체

현실 세계의 개념을 코드로 모델링한 것

- **필드(Field)**: 상태
- **메소드(Method)**: 행동

> 책 객체  
> 예: 제목, 저자, 페이지 수 + 읽기(), 예약하기() 등

객체 내부에 데이터와 행동이 함께 존재한다는 점이 절차적 방식과의 큰 차이점이다.

## 객체지향의 특징

### 1. 추상화(Abstraction)

- 대상의 핵심 특징만 추출해 모델링하는 과정
- 공통점을 묶어 상위 개념을 만드는 것  
  예: 아우디, BMW, 벤츠 → 자동차

추상화를 통해 변경에 유연해진다.  
새로운 자동차 브랜드가 추가되더라도 기존 코드를 크게 바꿀 필요가 없다.

### 2. 캡슐화(Encapsulation)

- 객체 내부 구현을 감추고 필요한 정보만 외부에 제공
- 결합도를 낮추고 응집도를 높이기 위한 핵심 원리
- 외부에 보여줄 필요가 없는 데이터는 `private`으로 숨김(정보 은닉)

낮은 결합도는 변경에 유연한 설계로 이어진다.

### 3. 상속(Inheritance)

- 상위 클래스가 가진 속성, 기능을 하위 클래스가 물려받는 것
- 일반화 관계라고도 부른다
- 하위 클래스를 외부로부터 은닉하는 효과도 존재(확장된 캡슐화 개념)

#### 상속의 단점

- 부모 클래스 변경 시 모든 자식 클래스에 영향
- 불필요한 클래스 증가 가능
- IS-A 관계가 아닌데 상속을 사용하면 구조가 무너짐

#### 해결책: 컴포지션(Composition)

- 객체가 다른 객체를 필드로 가져와 기능을 조립
- 상속보다 유연하고 변경에 강하다
- IS-A가 아닌 관계에서는 상속보다 컴포지션이 적합

### 4. 다형성(Polymorphism)

- 같은 메시지를 받아도 객체마다 다르게 동작하는 능력
- 주로 **오버라이딩**을 통해 구현
- 부모 타입으로 묶고, 실제 동작은 자식 객체에 따라 달라지는 구조
- 코드의 확장성과 유연성을 크게 높임

새로운 자식 클래스가 추가되더라도 부모 타입 기반의 코드는 수정할 필요 없이 그대로 사용할 수 있다.

## 객체지향 설계 과정

1. 제공해야 할 기능을 찾고 세분화
2. 기능을 담당할 객체를 결정
3. 필요한 데이터를 객체 내부에 추가
4. 데이터를 이용한 기능을 객체에 구현
5. 객체 간 메소드 호출 흐름 설계
6. 캡슐화, 추상화, 상속, 다형성 원칙 고려하여 구조화

## 객체지향 설계 원칙 (SOLID)

### SRP — 단일 책임 원칙

- 클래스는 하나의 책임만 가져야 한다.
- 변경 이유는 하나여야 한다.

#### 잘못된 예 — 하나의 클래스가 두 가지 책임을 가짐

```java
public class UserService {
    public void createUser(String name) {
        // 사용자 생성 로직
    }

    public void writeLog(String message) {
        // 로그 파일에 기록하는 로직 (불필요한 책임)
    }
}
```

#### 올바른 예 — 책임 분리

```java
public class UserService {
    public void createUser(String name) {
        // 사용자 생성만 담당
    }
}

public class Logger {
    public void writeLog(String message) {
        // 로그 처리만 담당
    }
}
```

### OCP — 개방-폐쇄 원칙

- 확장에는 열려 있고, 변경에는 닫혀 있어야 한다.
- 기능 변화/추가 시 기존 코드를 수정하지 않고 확장하는 구조를 만들어야 한다.

#### 잘못된 예 — 새로운 할인 정책 추가 시 기존 코드 수정 필요

```java
public class DiscountService {
    public int getDiscountPrice(String type, int price) {
        if (type.equals("fixed")) return price - 1000;
        if (type.equals("rate")) return (int)(price * 0.9);
        return price;
    }
}
```

#### 올바른 예 — 확장에는 열려 있고, 변경에는 닫혀 있음

```java
public interface DiscountPolicy {
    int apply(int price);
}

public class FixedDiscount implements DiscountPolicy {
    public int apply(int price) { return price - 1000; }
}

public class RateDiscount implements DiscountPolicy {
    public int apply(int price) { return (int)(price * 0.9); }
}

public class DiscountService {
    private final DiscountPolicy policy;

    public DiscountService(DiscountPolicy policy) {
        this.policy = policy;
    }

    public int getDiscountPrice(int price) {
        return policy.apply(price);
    }
}
```

새로운 할인 정책을 만들어도 DiscountService는 **수정할 필요 없음**

### LSP — 리스코프 치환 원칙

- 부모 타입 객체를 사용하듯 자식 타입 객체도 문제없이 사용할 수 있어야 한다.
- IS-A 관계가 성립되지 않는 상속은 원칙을 위반한다.

#### 잘못된 예 — 자식이 부모의 규약을 어김

```java
public class Bird {
    public void fly() {}
}

public class Penguin extends Bird {
    @Override
    public void fly() {
        throw new RuntimeException("펭귄은 날 수 없음");
    }
}
```

부모 타입(Bird)으로 다루면 문제가 발생한다 → LSP 위반

#### 올바른 예 — 타입 분리를 통해 LSP 준수

```java
public interface Flyable {
    void fly();
}

public class Sparrow implements Flyable {
    public void fly() {}
}

public class Penguin {
    // Flyable을 구현하지 않음
}
```

### ISP — 인터페이스 분리 원칙

- 클라이언트가 사용하지 않는 기능이 들어간 거대한 인터페이스를 만들지 말 것
- 필요한 기능별로 인터페이스를 분리해야 변화 영향도를 줄일 수 있다.

#### 잘못된 예 — 불필요하게 큰 인터페이스

```java
public interface Worker {
    void work();
    void eat();  // 필요 없는 기능
}

public class Robot implements Worker {
    public void work() {}
    public void eat() { /* 로봇은 먹지 않음 */ }
}
```

#### 올바른 예 — 인터페이스 분리

```java
public interface Workable {
    void work();
}

public interface Eatable {
    void eat();
}

public class Human implements Workable, Eatable {
    public void work() {}
    public void eat() {}
}

public class Robot implements Workable {
    public void work() {}
}
```

### DIP — 의존 역전 원칙

- 고수준 모듈(비즈니스 로직)은 저수준 모듈(구현)에 의존하면 안 된다.
- 둘 다 **추상화된 인터페이스**에 의존해야 한다.
- 구현 변경 시 고수준 모듈은 영향을 받지 않는다.

#### 잘못된 예 — 고수준 모듈이 저수준 모듈에 직접 의존

```java
public class MySQLDatabase {
    public void save(String data) {}
}

public class UserService {
    private final MySQLDatabase db = new MySQLDatabase();

    public void saveUser(String name) {
        db.save(name); // MySQL에 강하게 의존
    }
}
```

DB 변경 시 UserService도 반드시 수정해야 함

#### 올바른 예 — 둘 다 추상화에 의존

```java
public interface Database {
    void save(String data);
}

public class MySQLDatabase implements Database {
    public void save(String data) {}
}

public class MongoDatabase implements Database {
    public void save(String data) {}
}

public class UserService {
    private final Database db;

    public UserService(Database db) {
        this.db = db;
    }

    public void saveUser(String name) {
        db.save(name);
    }
}
```

DB가 바뀌어도 UserService는 변함 없음
