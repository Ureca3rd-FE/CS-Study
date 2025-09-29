# 트라이(Trie)

트라이(Trie)는 **문자열을 효율적으로 저장, 탐색**하기 위한 *트리 기반 자료구조*다.  
특히 문자열의 **접두사 판별**에 강점을 지녀, **사전, 자동완성, 문자열 검색** 문제에서 널리 활용된다.

## 구조

트라이는 **노드**와 **간선**으로 이루어진다.

- **루트 노드** → 공백 상태에서 시작, 모든 문자열의 진입점
- **간선** → 한 글자(character)를 표현
- **노드** → 특정 접두사(prefix)까지의 경로를 표현
- **종료 표시** → 현재 노드가 하나의 **단어의 끝**인지 여부

예시: 문자열 집합 `{ "cat", "car" }`를 저장하는 경우,  
루트 → `c` → `a` → `t` 와 `r` 로 갈라지는 형태

```plaintext
(root)
  └─ c
      └─ a
          ├─ t (단어 끝)
          └─ r (단어 끝)
```

## 주요 연산

1. **삽입 (Insert)**

   - 문자열을 한 글자씩 따라가며  
     → 노드가 없으면 생성  
     → 마지막 노드에 **단어 종료 표시**

2. **탐색 (Search)**

   - 문자열을 한 글자씩 내려가며  
     → 경로가 존재하는지 확인  
     → 마지막 노드가 단어 종료 표시면 **완전 일치**

3. **접두사 탐색 (StartsWith)**
   - 문자열이 **접두사로 존재하는지만 확인**
   - 자동완성 기능 등에 활용

## 시간 복잡도

- **삽입 / 탐색** → `O(L)`  
  (여기서 `L`은 문자열 길이)  
  문자열 개수 `N`이 많아도 **문자열 길이에만 비례**하는 성능을 보장한다.

- **공간 복잡도** → `O(Σ × N × L)`  
  (Σ = 알파벳 크기)  
  메모리 사용량은 큰 편이지만,  
  **공통 접두사 공유** 덕분에 실제로는 효율적이다.

## Javascript 예제 코드

```js
// 📌 Trie 자료구조 구현 (JavaScript)

class TrieNode {
  constructor() {
    this.children = {}; // 각 문자별 자식 노드
    this.isEndOfWord = false; // 단어의 끝 여부 표시
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  // 1. 삽입 (Insert)
  insert(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  // 2. 탐색 (Search) - 단어가 완전히 존재하는지
  search(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return node.isEndOfWord;
  }

  // 3. 접두사 탐색 (StartsWith)
  startsWith(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return true;
  }
}

// 사용 예시
const trie = new Trie();

trie.insert("cat");
trie.insert("car");

console.log(trie.search("cat")); // ✅ true
console.log(trie.search("cap")); // ❌ false
console.log(trie.startsWith("ca")); // ✅ true
console.log(trie.startsWith("dog")); // ❌ false
```
