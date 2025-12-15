# 마이크로서비스 아키텍처 (MSA)

[마이크로서비스 아키텍처(MSA) | 👨🏻‍💻 Tech Interview](https://gyoogle.dev/blog/computer-science/software-engineering/MSA.html)

**<목차>**

---

# **MSA의 등장배경**

## 모놀리식 아키텍처 (Monolithic Architecture)

<aside>
💡

소프트웨어의 모든 구성요소가 한 프로젝트에 통합되어있는 형태

= '한 덩어리'에 해당하는 구조

</aside>

소규모 프로젝트에는 Monolithic Architecture가 훨씬 합리적

→ 간단한 Architecture이고, 유지보수가 용이함

그러나 **일정 규모 이상의 서비스, 혹은 수백 명의 개발자가 투입되는 프로젝트에선 한계…**

- 서비스/프로젝트가 커지면 커질수록, 영향도 파악 및 전체 시스템 구조의 파악에 어려움
- 빌드 시간 및 테스트 시간, 배포 시간이 기하급수적으로 증가
- 서비스를 부분적으로 scale-out(확장) 하기가 어려움
- 부분의 장애가 전체 서비스의 장애로 이어지는 경우가 발생

# **마이크로서비스 아키텍처 (MSA)**

## MSA의 개념

<aside>
💡

- 작고 독립적인 서비스들의 집합으로 구성된 애플리케이션 구조
- 소프트웨어 개발 기법 중 하나로, 어플리케이션 단위를 '목적'으로 나누는 것
</aside>

![image.png](assets/image.png)

## MSA의 장/단점

### **MSA의 장점**

배포(deployment) 관점

- 서비스 별 개별 배포 가능 (= 배포 시 전체 서비스의 중단이 없음)
- 요구사항을 신속하게 반영하여 빠르게 배포 가능

확장(scaling) 관점

- 특정 서비스에 대한 확장성이 용이함
- 클라우드 사용에 적합한 아키텍쳐

장애(failure) 관점

- 장애가 전체 서비스로 확장될 가능성이 적음
- 부분적 장애에 대한 격리가 수월함

### MSA의 단점

성능 관점

- 서비스 간 호출 시 API를 사용 → 통신 비용이나, Latency가 그만큼 증가

테스트 / 트랜잭션 관점

- 서비스가 분리되어 있기 때문에 테스트와 트랜잭션의 복잡도가 증가하고, 많은 자원을 필요

데이터 관리 관점

- 데이터가 여러 서비스에 걸쳐 분산 → 한번에 조회하거나 데이터의 정합성 또한 관리하기 어려움

---

_참고 자료_

[[MSA] 마이크로서비스 아키텍처(MSA)란 뭘까?](https://mozzi-devlog.tistory.com/34)

[MSA 제대로 이해하기 -(1) MSA의 기본 개념](https://velog.io/@tedigom/MSA-%EC%A0%9C%EB%8C%80%EB%A1%9C-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-1-MSA%EC%9D%98-%EA%B8%B0%EB%B3%B8-%EA%B0%9C%EB%85%90-3sk28yrv0e)

[마이크로서비스 아키텍처(MSA)란? 쉽고 자세한 가이드](https://insightsblue.tistory.com/15)
