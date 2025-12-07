# TDD(Test Driven Development)

TDD(Test Driven Development)는 **테스트가 개발을 이끌어 나가는 방식**의 개발 접근법이다.  
일반적으로 개발 → 테스트 순서로 진행되지만 **TDD는 테스트 작성 → 코드 구현 → 리팩토링** 순으로 진행된다.

책을 쓰는 과정에 비유하면 다음과 같다.

- 목차 구성 → 테스트 작성
- 초안 작성 → 코드 구현
- 고쳐쓰기 → 리팩토링

## TDD의 장점

- 개발과 테스트를 동시에 진행함으로써 **오류를 즉시 파악 가능**
- **짧은 개발 주기**로 빠른 피드백 반영 가능
- 자동화된 테스트가 쌓여 **신뢰성 높은 문서 역할**을 수행
- 유지보수 시 기존 기능이 깨지지 않았는지 **안전하게 검증 가능**

## TDD의 단점

- 테스트케이스 설계라는 추가 업무로 **초기 비용 증가**
- 프로젝트 성격에 따른 **테스트 전략과 프레임워크 선택 고민** 필요

## TDD 예제: 점수 계산 프로그램

점수 총합에 따라 학점을 반환하는 프로그램을 만든다고 가정하자.

- 90점 이상 → A
- 80점 이상 → B
- 70점 이상 → C
- 60점 이상 → D
- 나머지 → F

## 1. 먼저 테스트 작성 (TDD 핵심 단계)

```ts
// grade.test.ts
import { computeGrade } from "./grade";

test("총점 85점이면 B가 반환되어야 한다", () => {
  const result = computeGrade({ mid: 35, final: 25, homework: 25 });
  expect(result).toBe("B");
});
```

아직 computeGrade 함수는 구현되지 않았지만  
TDD에서는 테스트를 먼저 작성한다.

## 2. 테스트를 만족시키기 위한 최소한의 코드 작성

```ts
// grade.ts
export interface ScoreInput {
  mid: number;
  final: number;
  homework: number;
}

export function computeGrade({ mid, final, homework }: ScoreInput): string {
  const total = mid + final + homework;

  if (total >= 90) return "A";
  if (total >= 80) return "B";
  if (total >= 70) return "C";
  if (total >= 60) return "D";
  return "F";
}
```

## 3. 테스트 실행 → 통과 확인

```bash
npm test
```

## 4. 이후 리팩토링 단계

중복 제거, 구조 개선 등을 통해 코드를 발전시킨다.

```ts
// grade.ts
export interface ScoreInput {
  mid: number;
  final: number;
  homework: number;
}

export function computeGrade({ mid, final, homework }: ScoreInput): string {
  const total = sumScores([mid, final, homework]);
  return getGrade(total);
}

function sumScores(scores: number[]): number {
  return scores.reduce((acc, cur) => acc + cur, 0);
}

function getGrade(total: number): string {
  if (total >= 90) return "A";
  if (total >= 80) return "B";
  if (total >= 70) return "C";
  if (total >= 60) return "D";
  return "F";
}
```

테스트가 이미 존재하므로 리팩토링 후에도 기능이 깨지지 않았다는 것을 **안전하게 보장할 수 있다.**

## E2E Test (End-to-End Test)

### 개념

- **사용자가 실제로 웹앱을 사용하는 것과 동일한 동작을 자동화한 테스트**
- 브라우저를 띄워 로그인 → 페이지 이동 → 버튼 클릭 → 렌더링 확인 등  
  전체 사용 흐름을 검증

### 특징

- UI, 라우팅, 서버 통신까지 모두 테스트할 수 있는 가장 현실적인 테스트
- Cypress, Playwright 같은 도구 사용
- 전체 플로우가 정말 정상적으로 작동하는지 확인하는 최종 안전망 역할

### 예시 (Playwright)

```ts
test("로그인 후 대시보드로 이동", async ({ page }) => {
  await page.goto("/login");
  await page.fill("#email", "test@test.com");
  await page.fill("#password", "1234");
  await page.click("text=로그인");
  await expect(page).toHaveURL("/dashboard");
});
```

### 장점

- 실제 사용자 시나리오 기반이라 신뢰도가 가장 높음
- 배포 전 반드시 걸러야 할 핵심 버그를 발견 가능

### 단점

- 가장 느리고 비용이 큼
- 테스트 유지보수가 어렵고 환경 의존성이 강함
- 실패 시 원인을 찾는 데 시간이 많이 걸릴 수 있음

## "굳이 필요할까?"에 대한 답변

TDD는 귀찮아 보일 수 있지만 현실 프로젝트에서는 다음과 같은 이유로 가치가 있다.

### 1. 프로젝트가 커질수록 테스트의 가치는 기하급수적으로 증가

기능이 많아질수록 개발자가 모든 동작을 직접 기억하고 검증하는 것은 불가능하다.

### 2. 유지보수 비용이 개발 초기 비용보다 훨씬 크다

TDD는 초기 비용이 조금 들지만 유지보수 비용을 크게 줄인다.

### 3. 안전성이 중요한 프로젝트는 필수

비행기, 기차, 의료기기처럼 **오류가 치명적일 수 있는 시스템**에서는 초기에 테스트 기반을 철저히 갖춰야 한다.

### 4. 테스트는 "바로 실행되는 명세서" 역할을 한다

문서보다 믿을 수 있고 코드가 바뀌면 테스트도 함께 바뀐다.
