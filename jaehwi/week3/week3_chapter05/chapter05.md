# B Tree & B+ Tree

[B Tree & B+ Tree | 👨🏻‍💻 Tech Interview](https://gyoogle.dev/blog/computer-science/data-structure/B%20Tree%20&%20B+%20Tree.html)

**<목차>**

---

# B Tree

<aside>
💡

데이터베이스, 파일 시스템에서 널리 사용되는 트리 자료구조의 일종
→ **이진 트리를 확장**해서, 더 많은 수의 자식을 가질 수 있게 일반화 시킨 것

</aside>

단순하고 효율적이며, 레벨로만 따지면 완전히 균형을 맞춘 트리

## B Tree의 규칙

- 노드의 자료수가 N이면, 자식 수는 N+1이어야 함
- 각 노드의 자료는 정렬된 상태여야함
- 루트 노드는 적어도 2개 이상의 자식을 가져야함
- 루트 노드를 제외한 모든 노드는 적어도 M/2개의 자료를 가지고 있어야함
- 외부 노드로 가는 경로의 길이는 모두 같음.
- 입력 자료는 중복 될 수 없음

# **B+ Tree**

<aside>
💡

데이터의 빠른 접근을 위한 인덱스 역할만 하는 비단말 노드(not Leaf)가 추가로 있는 자료구조
(기존의 B-Tree와 데이터의 연결리스트로 구현된 색인구조)

</aside>

B-Tree의 변형 구조…

index 부분과 leaf 노드로 구성된 순차 데이터 부분으로 이루어진다. 인덱스 부분의 key 값은 leaf에 있는 key 값을 직접 찾아가는데 사용

**B+ Tree의 장점**

- 블럭 사이즈를 더 많이 이용할 수 있음
    
    Why? key 값에 대한 하드디스크 액세스 주소가 없기 때문
    
- leaf 노드끼리 연결 리스트로 연결되어 있어서 범위 탐색에 매우 유리함

**B+ Tree의 단점**

B-tree은 최상 케이스에서는 루트에서 끝날 수 있음 but B+tree는 무조건 leaf 노드까지 내려가봐야 함

# **B-Tree vs B+ Tree 비교**

**데이터 저장 방식**

- B-tree : 각 노드에 데이터가 저장
- B+tree : index 노드와 leaf 노드로 분리되어 저장

**데이터 접근 & 검색 방식**

- B-tree : 각 노드에서 key와 data 모두 들어갈 수 있고, data는 disk block으로 포인터가 될 수 있음
- B+tree : 각 노드에서 key만 들어감. 따라서 data는 모두 leaf 노드에만 존재
    
    + add와 delete가 모두 leaf 노드에서만 이루어짐
    

---

*참고 자료*

[[자료구조/균형트리] B-트리, B+트리란?](https://suyeonme.tistory.com/102)

[[자료구조] 그림으로 알아보는 B+Tree](https://velog.io/@emplam27/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-%EA%B7%B8%EB%A6%BC%EC%9C%BC%EB%A1%9C-%EC%95%8C%EC%95%84%EB%B3%B4%EB%8A%94-B-Plus-Tree)

[[자료구조] B tree & B+ tree](https://yelkim0210.tistory.com/159)