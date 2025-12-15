## 12주차 🔧소프트웨어 엔지니어링

# Chap03. 써드 파티 (3rd party)

## #0. 용어
#### 1. 퍼스트 파티 (1st Party)
- 내가 직접 만든 것
- 우리 회사의 서버
- 우리가 작성한 코드, API

#### 2. 세컨드 파티 (2nd Party)
- 협력사나 공식 파트너가 제공
- 결제사 공식 SDK
- 제휴 서비스 API

#### 3. 서드 파티 (3rd Party)
- 제3자가 만든 외부 서비스
- 오픈소스 라이브러리
- 외부 API
- 외부 SaaS 서비스

## #1. 써드 파티란?
### 개념
- 직접 개발하거나 운영하지 않은 외부의 제품/서비스/라이브러리/플랫폼을 의미

### 목적
- 개발 속도 향상
- 검증된 기능 사용
- 유지보수 비용 절감
- 표준 기술 활용 가능

### 주의점
- 의존성 증가 (Dependency Risk)
- 보안 취약점 가능성
- 서비스 중단 리스크
- 라이선스 확인 필요

## #2. 써드 파티의 예시
### 프론트엔드
- React, Next.js
- Axios
- TanStack Query
- Redux Toolkit
- Chart.js

### 백엔드
- Spring Security
- MyBatis
- Hibernate
- JWT 라이브러리

### 인프라/데브옵스
- AWS, GCP
- GitHub Actions
- Vercel
- Firebase