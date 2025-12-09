# 클린코드와 리팩토링

[클린코드와 리팩토링 | 👨🏻‍💻 Tech Interview](https://gyoogle.dev/blog/computer-science/software-engineering/Clean%20Code%20&%20Refactoring.html)

**<목차>**

---

# 클린코드란?

<aside>
💡

가독성이 높은 코드 (의도와 목적이 명확하며, 다른 사람이 쉽게 읽을 수 있는 코드)

</aside>

얼마나 **코드가 잘 읽히는 지, 코드가 지저분하지 않고 정리된 코드인지**를 나타내는 것!

가독성이 높은 코드의 조건

- 네이밍이 잘 되어야 함
- 오류 X
- 중복 X
- 의존성 최대한 ⬇️
- 클래스 / 메서드가 한 가지 일만 처리해야 함

클린코드의 필요성

- 유지보수 향상
- 빠른 개발
- 품질 좋은 소프트웨어 보장
- 기술부채 회피
    
    *기술부채 : 지저분한 방식으로 빠르게 개발하면, 추후 새 기능을 추가할 때 더 많은 시간 필요*
    

## 클린코드 예제

*원본*

```java
public int AAA(int a, int b){ return a+b; }
public int BBB(int a, int b){ return a-b; }
```

*클린코드*

```java
public int sum(int a, int b){ return a+b; }
public int sub(int a, int b){ return a-b; }
```

원본 코드는 함수의 이름만을 보고 어떠한 기능을 하는지 파악 불가능

  → 각 함수의 기능에 맞추어 이름을 sum, sub로 변경

# 리팩토링이란?

<aside>
💡

- 프로그램의 외부 동작은 그대로 둔 채, 내부의 코드를 정리하면서 개선하는 것
- 레거시 코드(테스트가 불가능하거나 이해하기 어려운 코드)를 클린 코드로 만드는 것
</aside>

지저분한 코드의 특징

- 중복된 코드
- 긴 메서드
- 거대한 클래스
- Switch문
- 절차 지향으로 구현된 코드
    - *객체 지향*으로 바꾸려면? switch-case 문을 적게 사용하기
        
        (switch문을 오버라이드로 다 바꾸기)
        

**리팩토링의 목적**

 : 소프트웨어를 더 이해하기 쉽고, 수정하기 쉽게 만드는 것 → **개발 속도 향상!**

**리팩토링이 필요한 상황**

 : 소프트웨어에 새로운 기능을 추가해야 할 때

## 리팩토링 예제

**예제1)**

*원본*

```java
// 수정 전
public int getFoodPrice(int arg1, int arg2) {
    return arg1 * arg2;
}
```

*리팩토링*

```java
// 수정 후
public int getTotalFoodPrice(int price, int quantity) {
    return price * quantity;
}
```

함수명을 직관적으로 수정, 변수명을 의미에 맞게 수정

**예제2)**

*원본*

```java
// 수정 전
public int getTotalPrice(int price, int quantity, double discount) {
    return (int) ((price * quantity) * (price * quantity) * (discount /100));
}
```

*리팩토링1*

```java
// 수정 후
public int getTotalFoodPrice(int price, int quantity, double discount) {
	int totalPriceQuantity = price * quantity;
    return (int) (totalPriceQuantity - getDiscountPrice(discount, totalPriceQuantity))
}

private double getDiscountPrice(double discount, int totalPriceQuantity) {
    return totalPriceQuantity * (discount / 100);
}
```

- `price * quantity`가 중복되니 따로 변수로 만들어 추출
- 할인율을 계산하는 부분을 메소드로 따로 추출 → 항상 일정하니 외부에서 수정 못하도록 private 선언

*리팩토링2*

```java
// 수정 후
public int getFoodPriceToPay(int price, int quantity, double discount) {
    
    int totalPriceQuantity = getTotalPriceQuantity(price, quantity);
    return (int) (totalPriceQuantity - getDiscountPrice(discount, totalPriceQuantity));
}

private double getDiscountPrice(double discount, int totalPriceQuantity) {
    return totalPriceQuantity * (discount / 100);
}

private int getTotalPriceQuantity(int price, int quantity) {
    return price * quantity;
}
```

`totalPriceQuantity`를 `getter` 메소드로 추출 가능하니, ‘지불한다’라는 뜻의 메소드 명으로 수정

# 클린코드 vs 리팩토링 차이

*리팩토링 > 클린코드*

(보통 리팩토링 안에 클린코드의 개념이 포함됨)

**클린코드**

- 작업 비중이 가독성을 높이는 것에 치우쳐짐
- 설계부터 잘 이루어졌는지가 중요

**리팩토링**

- 유지보수를 위한 코드 개선 (= 클린코드 포함)
- 추후 요구사항 수정 및 추가 작업을 위한 개선

---

*참고 자료*

[클린코드와 코드 리팩토링](https://devuna.tistory.com/26)

[클린코드 / 리팩토링 / 시큐어 코딩](https://velog.io/@yuseogi0218/%ED%81%B4%EB%A6%B0%EC%BD%94%EB%93%9C-%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81-%EC%8B%9C%ED%81%90%EC%96%B4-%EC%BD%94%EB%94%A9)

[클린코드와 리팩토링](https://yelkim0210.tistory.com/143)