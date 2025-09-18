# 배열

정해진 크기의 메모리를 할당받아 사용하고, 데이터의 물리적 위치와 논리적 위치가 같은 자료구조.

## 특징

- 동일한 데이터 타입을 순서에 따라 관리
- 정해진 크기가 있음
- 요소 추가/제거시 다른 요소의 이동 필요(배열 일부를 복사해 이동)
- i번째 요소를 찾는 index 연산 빠름

값의 추가/삭제가 빈번이 일어나면 알맞지 않다.

## 시간복잡도

- 삽입: O(n)
- 삭제: O(n)
- index로 가져오기: O(1)
- 특정 위치에 삽입: O(1)

## 기본 배열

```java
int[] arr=new int[5];
```

#### 장점

- 여러 데이터를 한번에 다를 수 있다.
- 상대적으로 위치를 빠르게 찾을 수 있다.

#### 단점

- 한 번 만들어진 공간은 크기가 고정된다.
- 미리 공간을 확보해야 한다.

## 추가 - List, ArrayList, Vector

```java
List<Integer> list=new LinkedList<>();
List<Integer> list=new ArrayList<>();
List<Integer> list=new Vector<>();
```

참고로 List는 기능을 정의한 인터페이스지 기능을 실제 구현한 것은 아니다. = List만으로 인스턴스 생성 불가.

**List 장점**

- 기본 배열의 부족한 유연성 보완<br>
  =데이터가 필요에 따라 증감<br>
  =미리 공간을 확보하지 않아도 됨

**List 단점**

- 연속된 위치에 존재하진 않기에 목표 위치까지 이동해서 탐색<br>
  =따라서 찾는 속도 느림

**차이점**

- ArrayList
  - 초기 용량을 정한 후 데이터가 추가되면 용량 증가
  - non synchronized하여 멀티 스레드가 접근하면 제대로 동작 X=아닌 경우 적합
- Vector
  - 초기 용량과 증량값을 정한 후 데이터가 추가되면 증량값만큼 용량 증가
  - synchronized하여 멀티 스레드가 접근해도 안전

## 추가 자료

- [ArrayList 메소드](https://junjangsee.github.io/2019/07/25/java/arraylist-Method/)

## 참고 자료

- [여러가지 자료구조](https://soliloquiess.github.io/study/2021/03/20/java_%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0.html)
- [List, Array, Vector](https://velog.io/@heewonim/Java-%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-Array-List-Map-Set-Stack-Queue)
- [List와 ArrayList의 차이](https://yoon-dailylife.tistory.com/7)
