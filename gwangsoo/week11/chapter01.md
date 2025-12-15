# 클린 코드와 리팩토링

## 클린 코드

클린 코드는 한마디로 **가독성이 높은 코드**, **이해하기 쉬운 코드**를 의미한다.  
읽는 순간 코드의 의도와 구조가 자연스럽게 이해되는 상태를 말한다.

클린 코드를 위한 대표적인 기준은 다음과 같다.

- 네이밍이 명확해야 한다
- 오류가 없어야 한다
- 중복이 없어야 한다
- 의존성을 줄여야 한다
- 클래스 또는 메서드는 한 가지 역할만 수행해야 한다 (단일 책임 원칙)

### 네이밍과 레이아웃 예시

```java
// BAD - 이름만 보면 역할을 알 수 없음
public int AAA(int a, int b){
return a + b;
}

public int BBB(int a, int b){
return a - b;
}

// GOOD - 이름만 보아도 역할이 바로 파악됨
public int sum(int a, int b){
return a + b;
}

public int sub(int a, int b){
return a - b;
}
```

함수 간의 간격을 적절히 두는 것도 중요하다. 여러 메서드가 붙어 있으면 시작과 끝이 헷갈리고, 논리 흐름이 명확하게 보이지 않는다.

## 리팩토링

리팩토링은 **프로그램의 외부 동작은 그대로 유지한 채**  
**내부 코드를 더 이해하기 쉽고, 더 수정하기 좋게 개선하는 과정**을 말한다.

완공된 집 내부를 리모델링하여 더 튼튼하고 관리하기 쉽게 만드는 과정에 비유할 수 있다.

### 리팩토링이 필요한 코드의 특징

- 중복 코드가 많을 때
- 메서드가 너무 길 때
- 클래스가 지나치게 많은 역할을 가지고 있을 때
- switch-case 문이 많은 절차형 코드일 때
- 객체지향적 구조가 약할 때

리팩토링의 목적은 **소프트웨어를 더 이해하기 쉽고, 수정하기 쉬운 구조로 만드는 것**이다.  
성능 최적화가 1차 목적은 아니다. 구조가 좋아지면 결과적으로 개발 속도와 유지보수 효율이 좋아진다.

### 리팩토링을 진행하는 적절한 시점

- 새로운 기능을 추가해야 할 때
- 버그를 수정해야 할 때
- 코드가 너무 복잡해서 변경이 어려울 때

리팩토링은 우선순위 1번이 아니라는 점도 중요하다.  
기능이 먼저 정상 동작해야 하며, 그 후 구조를 개선하는 것이 일반적인 흐름이다.

또한 객체지향스러운 구조를 위해 switch-case는 가능한 한 줄이고 오버라이드를 활용한 구조로 개선하는 것이 좋은 리팩토링 방향이다.

### switch-case를 다형성으로 바꾸는 간단한 예시

#### 리팩토링 전 (switch-case)

```java
public int getDeliveryFee(String type) {
  switch (type) {
    case "BIKE": return 3000;
    case "CAR": return 5000;
    case "TRUCK": return 8000;
    default: throw new IllegalArgumentException();
}
}
```

#### 리팩토링 후 (다형성 활용)

`공통 인터페이스`

```java
interface Vehicle {
  int getFee();
}
```

`각 타입별 구현`

```java
class Bike implements Vehicle {
  public int getFee() { return 3000; }
}

class Car implements Vehicle {
  public int getFee() { return 5000; }
}

class Truck implements Vehicle {
  public int getFee() { return 8000; }
}
```

`사용부`

```java
public int getDeliveryFee(Vehicle vehicle) {
  return vehicle.getFee();
}
```

## 리팩토링 예제

### 1차 리팩토링 — 의미 있는 이름 사용

```java
// 수정 전
public int getFoodPrice(int arg1, int arg2) {
  return arg1 \* arg2;
}

// 수정 후 - 함수명과 변수명을 의미 있게 수정
public int getTotalFoodPrice(int price, int quantity) {
  return price \* quantity;
}
```

의미 없는 네이밍을 개선하고 함수 역할이 드러나도록 변경했다.

### 2차 리팩토링 — 중복 제거 + 메서드 추출

```java
// 수정 전
public int getTotalPrice(int price, int quantity, double discount) {
  return (int) ((price _ quantity) _ (price _ quantity) _ (discount /100));
}
```

문제점

- price \* quantity가 두 번 등장한다 (중복)
- 할인 계산이 한 메서드 안에 모두 들어 있다

```java
// 수정 후
public int getTotalFoodPrice(int price, int quantity, double discount) {
  int totalPriceQuantity = price \* quantity;
  return (int) (totalPriceQuantity - getDiscountPrice(discount, totalPriceQuantity));
}

private double getDiscountPrice(double discount, int totalPriceQuantity) {
  return totalPriceQuantity \* (discount / 100);
}
```

중복 제거, 메서드 분리, 캡슐화(private) 등이 적용된 리팩토링이다.

### 3차 리팩토링 — 의미 중심의 메서드 구조

```java
// 수정 전
public int getTotalFoodPrice(int price, int quantity, double discount) {
int totalPriceQuantity = price \* quantity;
  return (int) (totalPriceQuantity - getDiscountPrice(discount, totalPriceQuantity));
}

private double getDiscountPrice(double discount, int totalPriceQuantity) {
  return totalPriceQuantity \* (discount / 100);
}
```

```java
// 수정 후
public int getFoodPriceToPay(int price, int quantity, double discount) {
int totalPriceQuantity = getTotalPriceQuantity(price, quantity);
  return (int) (totalPriceQuantity - getDiscountPrice(discount, totalPriceQuantity));
}

private double getDiscountPrice(double discount, int totalPriceQuantity) {
  return totalPriceQuantity \* (discount / 100);
}

private int getTotalPriceQuantity(int price, int quantity) {
  return price \* quantity;
}
```

메서드명만 보아도  
"총 금액을 구한다", "할인 금액을 구한다", "지불해야 할 금액을 계산한다"  
라는 로직 구조가 더 명확해진다.
