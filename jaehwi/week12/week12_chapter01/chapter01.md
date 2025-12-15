# 함수형 프로그래밍

[함수형 프로그래밍 | 👨🏻‍💻 Tech Interview](https://gyoogle.dev/blog/computer-science/software-engineering/Fuctional%20Programming.html)

**<목차>**

---

# 함수형 프로그래밍이란?

<aside>
💡

자료 처리를 수학적 함수의 계산으로 취급 + 상태와 가변 데이터를 멀리하는 프로그래밍 패러다임

</aside>

*ex)*

*클로저, 스칼라, 하스켈 언어 → 함수형 프로그래밍 언어로 설계*

*자바스크립트, 코틀린, 파이썬 → 최근 버전에 함수형 프로그래밍 문법 추가*

함수형 프로그래밍 = **`'선언형'`** 프로그래밍

- 프로그램의 상태 변경을 최소화
- 수학적 함수의 개념에 기반
- 코드의 간결성, 모듈성 및 예측 가능성을 높이는 것이 목표

## 명령형 프로그래밍 vs 선언형 프로그래밍

### 명령형 프로그래밍

> 프로그래밍의 상태와 상태를 변경시키는 구문의 관점으로 접근하는 프로그래밍 방식
> 
> 
> 상태와 상태를 변경시키는 관점에서 연산을 설명하는 방식 (알고리즘만 명시하고, 목표는 명시 X)
> 

- 컴퓨터가 실행할 명령들을 실행 순서대로 구현
- 절차 지향 & 객체 지향 프로그래밍 언어가 명령형 프로그래밍
- 알고리즘 처리에 적합한 프로그래밍

*ex) point를 얻기 위해 실행할 명령들을 순서대로 구현*

```jsx
function getPoint(customer) {
    for (let i = 0; i < customers.length; i++) {
        const c = customers[i];
        if (customer === c) {
            return c.point;
        }
    }
    return NO_DATA;
}
```

### 선언형 프로그래밍

> 선언으로만 프로그램을 동작시키는 프로그래밍 방식 (목표만 명시하고, 알고리즘은 명시 X)
> 

- 프로그램을 실행하기 위해 구체적인 작동 순서를 나열하지 않아도 됨
- 함수형 프로그래밍 = 선언형 프로그래밍의 한 종류
- 명령형 프로그래밍이나 OOP 코드보다 더 간결하고 예측가능하여 테스트하는 것이 쉬움

*ex) 구체적인 로직을 직접 작성하지 않고 ~게 할 것이라고 선언*

```jsx
function getPoint(customer) {
    if (isRegisteredCustomer(customer)) {
        return findCustomer(customer).point;
    }
    return NO_DATA;
}
```

# **함수형 프로그래밍의 특징**

<aside>
💡

- 구체적인 작업 방식은 라이브러리가 결정…
    
     → 어떻게(How)보다는 **무엇(What)을 수행**할 것인지에 집중
    
- 프로그래밍 언어나 방식을 배우는 것이 아닌, 함수로 프로그래밍하는 사고를 배우는 것
    
     → 더 유연하게 문제해결을 하도록 접근하는 방법
    
</aside>

## 1. **순수함수 (Pure function)**

- 동일한 입력에는 항상 같은 값을 반환해야 하는 함수
- 함수의 실행이 프로그램의 실행에 영향을 미치지 않아야 하는 함수
- 함수 내부에서 인자의 값을 변경하거나 프로그램 상태를 변경하는 Side Effect가 없는 것

*ex)*

`*add` 함수가 프로그램 실행에 영향을 미치지 않고 입력 값에 대해서만 값의 변환이 있음 → 순수함수*

```jsx
// 순수함수
function add(a, b) {
    return a + b;
}

const result = add(2, 3);
```

+ 순수 함수는 프로그램의 변화 없이 입력 값에 대한 결과 예상이 가능 = 테스트가 용이함

## 2. **비상태, 불변성 (Stateless, Immutability)**

- 함수형 프로그래밍에서의 데이터는 변하지 않는 불변성을 유지해야 함
- 데이터의 변경이 필요한 경우?
    
     : 원본 데이터 구조를 변경하지 않고 해당 데이터의 복사본을 만든 후 그 일부를 변경하고, 변경한 복사본을 사용하여 작업 진행
    

*ex)*

*객체의 값을 바꾸기 위해서는 데이터의 복사본을 만들어, 그 복사본을 사용해 작업을 진행하고 반환해야 함*

```jsx
// 비상태, 불변성 만족
const person = { name: "jongmin", age: "26" };

function increaseAge(person) {
    return { ...person, age: person.age + 1 };
}
```

## 3. **선언형 함수 (Expressions)**

- 명령형 프로그래밍은 무엇을 **어떻게** 할 것인가에 주목
- 선언형 프로그래밍은 **무엇을** 할 것인가에 주목

*ex1) 명령형 프로그래밍 예시*

*for 문, if문 같은 명령문(statement)을 사용함*

***"어떻게(how)"** 처리할지를 하나하나 **명령**하는 방식*

```jsx
let numbers = [1, 2, 3];

function multiply(numbers, multiplier) {
    for (let i = 0; i < numbers.length; i++) {
        numbers[i] = numbers[i] * multiplier;
    }
}
```

*ex2) 함수형 프로그래밍 예시*

`*map`, `filter`, `reduce` 같은 **함수형 메서드** 사용*

***“무엇을(what)”** 할지에 초점*

*원본 배열을 **변경하지 않고 새로운 배열을 반환 → 불변성***

```jsx
function multiply(number, multiplier) {
    return number.map((num) => num * multiplier);
}
```

## 4. **1급 객체와 고차함수 (Fist-class, Higher-order functions)**

함수형 프로그래밍에서는 **함수 = 1급 객체,**

고차 함수의 속성도 가져야 함

1급 객체의 특징

- 변수나 데이터 구조안에 담을 수 있음
- 파라미터로 전달 가능
- 반환값(return value)으로 사용 가능
- 할당에 사용된 이름과 관계없이 고유한 구별 가능
- 동적인 프로퍼티 할당 가능

*ex) 함수를 변수에 할당하거나 반환하는 1급 객체 예시*

```jsx
// 1급 객체
const addTwo = (num) => num + 2;
const multiplyTwo = (num) => num * 2;
const transform = (numbers) => numbers.map(addTwo).map(multiplyTwo);

console.log(transform([1, 2, 3, 4])); // [6, 8, 10, 12]
```

고차 함수의 특징

- 함수를 인자로써 전달 할 수 있어야 함
- 함수의 반환 값으로 또 다른 함수를 사용 가능

*ex) 고차 함수 예시*

  *→ 함수의 반환 값으로 다른 함수를 사용하거나, 함수의 반환 값으로 또 다른 함수를 사용 할 수 있어야 함!*

```jsx
// 고차 함수
const addInform = (name) => (age) => age + name;
const jongmin = addInform("종민");

console.log(jongmin("96")); // 96종민
```

# 함수형 프로그래밍의 장/단점

## 장점

- 높은 수준의 추상화 제공
- 함수 단위의 코드 재사용 수월
- 불변성 지향 → 프로그램의 동작을 예측하기 쉬움 + 안정성

## 단점

- 순수함수를 구현할 때, 코드의 가독성이 나빠질 수 있음
- 함수형 프로그래밍에서는 반복이 for문이 아닌 재귀를 통해 이루어짐(deep copy)
    
     → 재귀적인 코드는 무한 루프에 빠질 수 있음
    
- 너무 많은 복사와 새로운 객체 생성이 발생한다면? = 메모리 사용량이 증가하여 성능 저하

---

*참고 자료*

[[우아한테크코스] 함수형 프로그래밍(Functional Programming)이란? — IT Story](https://itstory1592.tistory.com/120)

[개발자를 위한 함수형 프로그래밍의 첫걸음 | 요즘IT](https://yozm.wishket.com/magazine/detail/3430/)

[[면접 꿀팁] 함수형 프로그래밍(Functional Programming)이란?](https://thecho7.tistory.com/entry/%EB%A9%B4%EC%A0%91-%EA%BF%80%ED%8C%81-%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8DFunctional-Programming%EC%9D%B4%EB%9E%80)

[함수형 프로그래밍이란? | JONGMINFIRE.DEV](https://jongminfire.dev/%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%EC%9D%B4%EB%9E%80)