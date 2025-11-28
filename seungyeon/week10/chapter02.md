# TLS/SSL HandShake

## SSL/TLS란?

![alt text](source/image.png)

- OSI 7계층: 데이터 통신에 필요한 계층과 역할을 정확하게 정의
- TCP/IP 4계층: 인터넷에서 사용되는 프로토콜 중심 단순화

SSL/TLS는 보안 계층이란 독립적인 프로토콜 계층을 만들어 응용 계층(HTTP, FTP, SMTP 등) 과 전송 계층 사이에 끼워넣는 것.

이 기술을 구현하기 위해 웹 서버에 설치하는 것이 SSL/TLS 인증서.

## SSL

Secure Sockets Layer

보안 소켓 계층 인증서=디지털 인증서로 브라우저와 서버 사이의 암호화된 연결을 수립하는 데 사용.

전달되는 모든 데이터는 암호화되고, 특정 유형의 사이버 공격도 차단 가능하다.

하지만 SSL은 옛날 방식이며, 요즘은 TLS가 표준이다. (SSL이라 하는 업체들은 사실상 TLS 암호화를 제공하고 있는 것.)

## TLS

SSL의 보안 취약점을 개선한 버전. 최신 인증서는 이걸 사용하지만 편의상 SSL 인증서라고 쭉 부른다.

## SSL/TLS 작동 방식

- 웹에서 전송되는 데이터를 암호화 > 가로채도 복호화가 불가능
- 클라이언트와 서버간에 핸드셰이크를 통해 인증
- 데이터 무결성을 위해 데이터에 디지털 서명을 해 데이터가 조작됐는지를 확인.

## SSL/TLS HandShake

ClientHello > ServerHello > 인증서 교환 > 키 교환 > 암호화된 통신?

## 참고 자료

- [[Network] TCP/IP 4계층에 대하여](https://velog.io/@dyunge_100/Network-TCPIP-4%EA%B3%84%EC%B8%B5%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC)
- [웹사이트 보안을 위한 방법, SSL이란?](https://blog.naver.com/skinfosec2000/222135874222)
- [TLS/SSL HandShake](https://gyoogle.dev/blog/computer-science/network/TLS%20HandShake.html)
- [SSL이란?, SSL과 TLS 정의 및 차이](https://kanoos-stu.tistory.com/46)
