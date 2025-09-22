# 배열 (Array)

[배열 (Array) | 👨🏻‍💻 Tech Interview](https://gyoogle.dev/blog/computer-science/data-structure/Array.html)

**<목차>**

---

# 배열(Array)이란?

프로그래밍에서 같은 타입의 데이터를 저장하고 관리하기 위한 자료구조

**기본적인 배열의 선언 방식**

```
데이터타입 배열이름[배열길이]
```

배열은 **인덱스(index)**라고 하는 번호와 인덱스에 대응하는 **데이터**들로 구성

→ 각 데이터들은 인덱스 번호를 통해 접근 가능! (해당 요소의 메모리 위치를 계산)

![image.png](assets/image.png)

배열의 시작점이자 인덱스의 첫 번째 번호는 0번부터 시작 (0, 1, 2, 3, …)

## 배열의 특징과 메모리 구조

배열의 특징

- 배열은 “정적” : 처음 배열의 크기가 정해지면 크기를 변경할 수 없음
- 배열은 “연속적” : 메모리 상에서 배열의 첫번째 요소는 두번째 요소와 연이어 붙어있음

![image.png](assets/image%201.png)

배열의 변수 = 참조 변수

배열도 객체 중 하나이니, 힙(Heap) 영역에 생성됨

즉 배열의 변수는 힙 영역의 배열 객체를 참조하게 됨

= "스택(주소) → 힙(배열 원소)" 구조

**변수** : 기본 자료형 데이터 값을 메모리에 저장

**배열 변수** : 배열 객체의 주소(레퍼런스)를 저장

_ex) 일반 변수 vs 배열 변수 비교_

```c
// 일반 변수 → 스택에 바로 값 10이 저장됨
int a = 10;
```

```c
// 스택에는 배열 시작 주소만 저장되고, 진짜 값은 힙에 저장됨
int[] arr = new int[5];
```

## 배열의 장/단점

배열의 장점

- 구조가 간단하여 사용하기 쉬움
- 인덱스로 원하는 값을 쉽게 찾기 가능
- 데이터를 읽는 속도가 빠름

배열의 단점

- 선언과 동시에 크기를 지정 → 크기 변경 불가
- 배열의 중간에 데이터를 추가하거나 수정하는 등의 삽입, 삭제 작업이 느림
- 메모리 낭비 발생 가능성 ⬆️

## 간단한 배열 구현

C 버전

```c
#include<stdio.h>

int main() {

    int arr[5] = { 1, 2, 3, 4, 5 };

    for (int i = 0; i < 5; i++) {
        printf("%d ", arr[i]);
    }

    int n = sizeof(arr) / sizeof(arr[0]);

    printf("%d", n);

    return 0;
}
```

JAVA 버전

```java
public class quiz {

	public static void main(String[] args) {

        int[] arr = { 1, 2, 3, 4, 5 };

        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }

        int n = arr.length;
        System.out.println(n);
    }
}
```

Python 버전

```python
arr = [1, 2, 3, 4, 5]

for i in arr:
    print(i, end=" ")

n = len(arr)
print(n)
```

# 배열의 회전 알고리즘

## 1. 기본 회전 알고리즘

: temp 변수에 임시로 첫 번째 인덱스의 값을 저장한 후, 배열의 모든 원소를 특정 방향(우측/좌측)으로 한 칸씩 이동시키며 첫 번째 인덱스의 원소(temp)가 마지막에 오도록 회전시키는 알고리즘

시간 복잡도 = O(d × n)

![(배열의 회전 전)](assets/image%202.png)

(배열의 회전 전)

![(배열의 회전 후)](assets/image%203.png)

(배열의 회전 후)

arr[0] ~ arr[n - 1] → arr[1] ~ arr[n]으로 값을 저장,

arr[n]에 temp 변수 적용

**배열을 왼쪽으로 d번 회전하는 기본 알고리즘 (C 버전)**

```c
#include<stdio.h>

// leftRotatebyOne() : 왼쪽으로 한 번 회전 (= 밀기)
void leftRotatebyOne(int arr[], int n) {

    int temp = arr[0], i;

    /*
    * 인덱스 0부터 n-2까지 반복...arr[i] ← arr[i+1]로 값을 복사
        arr[0] = arr[1]
        arr[1] = arr[2]
        arr[2] = arr[3]
        ...
        arr[n-2] = arr[n-1]
    *  -> 배열 안의 모든 값이 한 칸씩 앞으로 당겨짐
    */
    for (i = 0; i < n - 1; i++) {
        arr[i] = arr[i + 1];
    }
    /*
    * 여기서 i = n - 1
    *  - temp에는 원래 배열의 첫 번째 인덱스 값이 들어 있음
    *  - 해당 값을 배열 마지막 칸에 넣어줌 → [2, 3, 4, 5, 1]
    *   = 마지막 칸에 temp 삽입
    */
    arr[i] = temp;
}

// leftRotate() : d만큼 회전
void leftRotate(int arr[], int d, int n) {

    for (int i = 0; i < d; i++) {

        // d번 회전하기 위해 leftRotatebyOne()을 d번 호출
        leftRotatebyOne(arr, n);
    }
}

// printArray() : 배열 출력
void printArray(int arr[], int n) {

    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

// main() 함수
int main() {

    int arr[] = { 1, 2, 3, 4, 5, 6, 7 };  // 원본 배열
    int n = sizeof(arr) / sizeof(arr[0]);  // n = 배열의 크기

    leftRotate(arr, 2, n);  // arr[] 배열을 왼쪽으로 2번 회전
    printArray(arr, n);  // 회전한 arr[] 배열의 결과 출력

    return 0;
}
```

**배열을 왼쪽으로 d번 회전하는 기본 알고리즘 (JAVA 버전)**

```java
public class Main {

	// main() 함수
	public static void main(String[] args) {

		int[] arr = { 1, 2, 3, 4, 5, 6, 7 };  // 원본 배열
		int n = arr.length;  // n = 배열의 크기

		leftRotate(arr, 2, n);  // arr[] 배열을 왼쪽으로 2번 회전
		printArray(arr, n);  // 회전한 arr[] 배열의 결과 출력
	}

	// leftRotatebyOne() : 왼쪽으로 한 번 회전 (= 밀기)
    static void leftRotatebyOne(int[] arr, int n) {

        int temp = arr[0], i;

        /*
        * 인덱스 0부터 n-2까지 반복...arr[i] ← arr[i+1]로 값을 복사
            arr[0] = arr[1]
            arr[1] = arr[2]
            arr[2] = arr[3]
            ...
            arr[n-2] = arr[n-1]
        *  -> 배열 안의 모든 값이 한 칸씩 앞으로 당겨짐
        */
        for (i = 0; i < n - 1; i++) {
            arr[i] = arr[i + 1];
        }
        /*
        * 여기서 i = n - 1
        *  - temp에는 원래 배열의 첫 번째 인덱스 값이 들어 있음
        *  - 해당 값을 배열 마지막 칸에 넣어줌 → [2, 3, 4, 5, 1]
        */
        arr[i] = temp;
    }

    // leftRotate() : d만큼 회전
    static void leftRotate(int[] arr, int d, int n) {

        for (int i = 0; i < d; i++) {

            // d번 회전하기 위해 leftRotatebyOne()을 d번 호출
            leftRotatebyOne(arr, n);
        }
    }

    // printArray() : 배열 출력
    static void printArray(int[] arr, int n) {

        for (int i = 0; i < n; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }
}
```

## 2. 저글링 알고리즘

: 최대공약수(gcd)를 이용해 집합을 나누어 여러 요소를 한꺼번에 이동시키는 알고리즘

시간 복잡도 = O(n)

![image.png](assets/image%204.png)

배열 크기 = `n`, 회전할 칸 수 = `d`

배열을 **gcd(n, d)** 개의 그룹(사이클)으로 분할

= 각 그룹 내에서 원소들을 한 칸씩 회전(왼쪽)시키면, 전체 배열이 `d`칸만큼 회전된 결과

ex)

```c
arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
```

배열의 크기 n = 12, 회전할 칸 수 d = 3 (3개의 그룹)

→ 1,2,3을 뒤로 옮길 때, 인덱스를 3개씩 묶고 회전시키는 방법!

- 그룹1 : 인덱스 {0, 3, 6, 9} → {1, 4, 7, 10}
- 그룹2 : 인덱스 {1, 4, 7, 10} → {2, 5, 8, 11}
- 그룹3 : 인덱스 {2, 5, 8, 11} → {3, 6, 9, 12}

결과

```c
[4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3]
```

**저글링 알고리즘 (C 버전)**

```c
#include <stdio.h>

// gcd() : 최대공약수 구하기
int gcd(int a, int b)
{
    if (b == 0) {
        return a;  // a = 최대공약수
    }
    else {
        return gcd(b, a % b);
    }
}

// leftRotate() : d만큼 왼쪽 회전 (저글링 알고리즘)
void leftRotate(int arr[], int d, int n)
{
    // gcd(d, n) → 사이클(그룹)의 개수
    for (int i = 0; i < gcd(d, n); i++) {

        int temp = arr[i];
        int j = i;

        while (1) {

            int k = j + d;  // 현재 위치에서 d만큼 이동

            if (k >= n) {
                k = k - n;  // 배열 끝을 넘어가면 다시 앞에서부터... (d < n)
            }

            if (k == i) {
                break;  // 사이클이 한 바퀴 돌았으면 종료
            }

            arr[j] = arr[k];  // 현재 이동할 위치로 값 복사
            j = k;  // 현재 위치를 다음 인덱스로 이동
        }
        arr[j] = temp;  // 처음 이동시키려던 값을 결과 위치에 놓기
    }
}

// printArray() : 배열 출력
void printArray(int arr[], int size)
{
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

// main() 함수
int main()
{
    int arr[] = { 1, 2, 3, 4, 5, 6, 7 };
    int n = sizeof(arr) / sizeof(arr[0]);

    leftRotate(arr, 2, n);  // 배열을 왼쪽으로 2칸 회전
    printArray(arr, n);

    return 0;
}
```

**저글링 알고리즘 (JAVA 버전)**

```java
public class Main {

	// main() 함수
	public static void main(String[] args)
	{
		int[] arr = { 1, 2, 3, 4, 5, 6, 7 };
		int n = arr.length;

		leftRotate(arr, 2, n);  // 배열을 왼쪽으로 2칸 회전
		printArray(arr, n);
	}

    // gcd() : 최대공약수 구하기
    static int gcd(int a, int b)
    {
        if (b == 0) {
            return a;  // a = 최대공약수
        }
        else {
            return gcd(b, a % b);
        }
    }

    // leftRotate() : d만큼 왼쪽 회전 (저글링 알고리즘)
    static void leftRotate(int[] arr, int d, int n)
    {
        // gcd(d, n) → 사이클(그룹)의 개수
        for (int i = 0; i < gcd(d, n); i++) {

            int temp = arr[i];
            int j = i;

            while (true) {

                int k = j + d;  // 현재 위치에서 d만큼 이동

                if (k >= n) {
                    k = k - n;  // 배열 끝을 넘어가면 다시 앞에서부터... (d < n)
                }

                if (k == i) {
                    break;  // 사이클이 한 바퀴 돌았으면 종료
                }

                arr[j] = arr[k];  // 현재 이동할 위치로 값 복사
                j = k;  // 현재 위치를 다음 인덱스로 이동
            }
            arr[j] = temp;  // 처음 이동시키려던 값을 결과 위치에 놓기
        }
    }

    // printArray() : 배열 출력
    static void printArray(int[] arr, int size)
    {
        for (int i = 0; i < size; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }
}
```

## 3. 역전 알고리즘

: 회전시키는 수에 대해 구간을 나누어 reverse로 구현하는 방법

시간 복잡도 = O(n)

ex)

```c
arr = [1, 2, 3, 4, 5, 6, 7]
```

d = 2라면,

위 배열은 1 2 / 3 4 5 6 7 로 구간이 나뉨

- 첫번째 구간 reverse -> 2 1
- 두번째 구간 reverse -> 7 6 5 4 3

이를 합치면 2 1 7 6 5 4 3,

이렇게 합친 배열의 reverse = 3 4 5 6 7 1 2

최종 결과는, 왼쪽으로 **2칸 회전**한 배열

**역전 알고리즘 (C 버전)**

```c
#include <stdio.h>

// reverseArr() : swap을 활용한 reverse 구현
void reverseArr(int arr[], int start, int end) {

    /*
    * start = 뒤집을 구간의 시작 인덱스
    * end = 뒤집을 구간의 끝 인덱스
    */

    // start와 end가 교차하기 전까지 반복
    while (start < end) {
        int temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;

        start++;  // 앞 인덱스 앞으로 이동
        end--;  // 뒤 인덱스 뒤로 이동
    }
}

// rotateLeft() : d로 나눈 후 역전 알고리즘 수행 (왼쪽 기준)
void rotateLeft(int arr[], int d, int n) {

    reverseArr(arr, 0, d - 1);   // 배열의 앞쪽 d개 뒤집기
    reverseArr(arr, d, n - 1);   // 배열의 뒤쪽 n-d개 뒤집기
    reverseArr(arr, 0, n - 1);   // 전체 배열 뒤집기 → 최종적으로 d칸 왼쪽 회전
}

// // printArray() : 배열 출력
void printArray(int arr[], int n) {

    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

// main() 함수
int main(void) {
    int arr[10] = { 1,2,3,4,5,6,7,8,9,10 };
    int n = sizeof(arr) / sizeof(arr[0]);
    int d = 3;

    rotateLeft(arr, d, n);  // 배열을 왼쪽으로 d칸 회전
    printArray(arr, n);

    return 0;
}
```

**역전 알고리즘 (JAVA 버전)**

```java
public class Main {

    // main() 함수
    public static void main(String[] args) {
        int[] arr = { 1,2,3,4,5,6,7,8,9,10 };
        int n = arr.length;
        int d = 3;

        rotateLeft(arr, d, n);  // 배열을 왼쪽으로 d칸 회전
        printArray(arr, n);
    }

    // reverseArr() : swap을 활용한 reverse 구현
    static void reverseArr(int[] arr, int start, int end) {

        /*
        * start = 뒤집을 구간의 시작 인덱스
        * end = 뒤집을 구간의 끝 인덱스
        */

        // start와 end가 교차하기 전까지 반복
        while (start < end) {
            int temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;

            start++;  // 앞 인덱스 앞으로 이동
            end--;    // 뒤 인덱스 뒤로 이동
        }
    }

    // rotateLeft() : d로 나눈 후 역전 알고리즘 수행 (왼쪽 기준)
    static void rotateLeft(int[] arr, int d, int n) {

        reverseArr(arr, 0, d - 1);   // 배열의 앞쪽 d개 뒤집기
        reverseArr(arr, d, n - 1);   // 배열의 뒤쪽 n-d개 뒤집기
        reverseArr(arr, 0, n - 1);   // 전체 배열 뒤집기 → 최종적으로 d칸 왼쪽 회전
    }

    // // printArray() : 배열 출력
    static void printArray(int[] arr, int n) {

        for (int i = 0; i < n; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }
}
```

# **예제1) 배열의 특정 최대 합 구하기**

Q. arr[i]가 있을 때, i \* arr[i]의 Sum이 가장 클 때 그 값을 출력하자

→ 배열을 여러 번 회전시키면서 **`i*arr[i]`**의 합을 하나하나 구하고, 그 중 최댓값을 출력

**풀이 접근 방법**

1. arr[i]의 전체 합과 i \* arr[i]의 전체 합을 저장할 변수 선언
2. 최종값이 가장 큰 sum을 저장할 변수 선언
3. 배열을 회전시키면서 i \* arr[i]의 합의 값을 저장하고, 이 중 가장 큰 값을 저장해서 출력

ex)

```c
Input: arr[] = {1, 20, 2, 10}
Output: 72

arrSum = arr[0] + arr[1] + ... + arr[n-1]

2번 회전했을 때 아래와 같이 최대값이 나오게 됨
{2, 10, 1, 20}
20*3 + 1*2 + 10*1 + 2*0 = 72  // 최댓값
```

```c
Input: arr[] = {10, 1, 2, 3, 4, 5, 6, 7, 8, 9};
Output: 330

arrSum = arr[0] + arr[1] + ... + arr[n-1]

9번 회전했을 때 아래와 같이 최대값이 나오게 됨
{1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
0*1 + 1*2 + 2*3 ... 9*10 = 330  // 최댓값
```

**해결 방법**

```c
1) 회전 없이 i*arr[i]의 sum을 저장한 값
R0 = 0*arr[0] + 1*arr[1] + ... + (n-1)*arr[n-1]

2) 1번 회전하고 i*arr[i]의 sum을 저장한 값
R1 = 0*arr[n-1] + 1*arr[0] + ... + (n-1)*arr[n-2]

3) 위 두 개의 값을 빼면?
R1 - R0 = arr[0] + arr[1] + ... + arr[n-2] - (n-1)*arr[n-1]

4) 2번 회전하고 i*arr[i]의 sum을 저장한 값
R2 = 0*arr[n-2] + 1*arr[n-1] + ... + (n-1)*arr[n-3]

5) 1번 회전한 값과 빼면?
R2 - R1 = arr[0] + arr[1] + ... + arr[n-3] - (n-1)*arr[n-2] + arr[n-1]

--------------------------------------------------------------------------------

Rj - Rj - 1 = arrSum - n * arr[n - j]

이를 활용해서 몇 번 회전했을 때 최대값이 나오는 지 구하기 가능
```

**예제 구현 코드**

```c
#include <stdio.h>

// maxVal() : 배열 회전 시 i*arr[i]의 합의 최댓값 계산
int maxVal(int arr[], int n) {
    int arrSum = 0;  // arr[i]의 전체 합
    int curSum = 0;  // i*arr[i]의 전체 합 (R0)

    // arrSum과 초기 curSum 계산
    for (int i = 0; i < n; i++) {
        arrSum = arrSum + arr[i];
        curSum = curSum + (i * arr[i]);
    }

    int maxSum = curSum;

    // 회전하면서 curSum 업데이트
    for (int j = 1; j < n; j++) {
        curSum = curSum + arrSum - n * arr[n - j];

        if (curSum > maxSum)
            maxSum = curSum;
    }

    return maxSum;
}

// main() 함수
int main(void) {
    int arr[] = { 1, 20, 2, 10 };
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("%d\n", maxVal(arr, n));

    return 0;
}
```

# **예제2) 특정 배열을 arr[i] = i로 재배열 하기**

Q. 주어진 배열에서 arr[i] = i이 가능한 것만 재배열 시키자

(arr[i] = i가 없는 경우에는 -1로 채우자)

```c
Input : arr = {-1, -1, 6, 1, 9, 3, 2, -1, 4, -1}
Output : [-1, 1, 2, 3, 4, -1, 6, -1, -1, 9]

Input : arr = {19, 7, 0, 3, 18, 15, 12, 6, 1, 8,
              11, 10, 9, 5, 13, 16, 2, 14, 17, 4}
Output : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
         11, 12, 13, 14, 15, 16, 17, 18, 19]
```

**풀이 접근 방법**

1. arr[i]가 -1이 아니고, arr[i]이 i가 아닐 때가 우선 조건
2. 해당 arr[i] 값을 저장(x)해두고, 이 값이 x일 때 arr[x]를 탐색
3. arr[x] 값을 저장(y)해두고, arr[x]가 -1이 아니면서 arr[x]가 x가 아닌 동안을 탐색
4. arr[x]를 x값으로 저장해주고, 기존의 x를 y로 수정

**예제 구현 코드**

```c
#include <stdio.h>

// fix() : 배열을 arr[i] = i 형태로 재배열
/*
* arr[i] == i 이면 그대로 둠
* arr[i] != i 이고 올바른 위치에 배치할 수 있으면 그 자리에 이동
* 올바른 자리에 둘 수 없는 경우 -1로 채움
*/
void fix(int A[], int len) {
    for (int i = 0; i < len; i++) {

        // 조건: 값이 -1이 아니고, 이미 올바른 자리(i)도 아닐 때만 처리
        if (A[i] != -1 && A[i] != i) {
            int x = A[i];  // 현재 값을 x에 저장 (옮겨야 할 값의 위치)

            // // A[x]가 -1도 아니고, x 자기 자신도 아닐 때까지 반복
            while (A[x] != -1 && A[x] != x) {
                int y = A[x];  // 해당 값을 y에 저장
                A[x] = x;
                x = y;
            }

            // while문을 빠져나온 후, x를 올바른 자리에 배치
            A[x] = x;

            // 아직도 올바른 자리에 가지 못하였으면 -1
            if (A[i] != i) {
                A[i] = -1;
            }
        }
    }
}

// printArray() : 배열 출력
void printArray(int A[], int len) {

    for (int i = 0; i < len; i++) {
        printf("%d ", A[i]);
    }
    printf("\n");
}

// main() 함수
int main(void) {

    int A[] = { -1, -1, 6, 1, 9, 3, 2, -1, 4, -1 };

    int len = (int)(sizeof(A) / sizeof(A[0]));
    fix(A, len);
    printArray(A, len);

    return 0;
}
```

---

_참고 자료_

[_[CS] 배열(Array)_](https://velog.io/@rlvy98/CS-%EB%B0%B0%EC%97%B4Array)

[_[자료구조] 배열(Array)_](https://velog.io/@letskuku/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-%EB%B0%B0%EC%97%B4Array)
