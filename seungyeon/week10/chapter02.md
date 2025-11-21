# TLS/SSL HandShake

HTTP 통신을 암호화하기 위해 사용하는 보안 프로토콜.

## SSL

Secure Sockets Layer

보안 소켓 계층 인증서=디지털 인증서로 브라우저와 서버 사이의 암호화된 연결을 수립하는 데 사용.

전달되는 모든 데이터는 암호화되고, 특정 유형의 사이버 공격도 차단 가능하다.

하지만 SSL은 옛날 방식이며, 요즘은 TLS가 표준이다. (SSL이라 하는 업체들은 사실상 TLS 암호화를 제공하고 있는 것.)

## TLS

SSL의 보안 취약점을 개선

## SSL/TLS 작동 방식

- 웹에서 전송되는 데이터를 암호화 > 가로채도 복호화가 불가능
- 클라이언트와 서버간에 핸드셰이크를 통해 인증
- 데이터 무결성을 위해 데이터에 디지털 서명을 해 데이터가 조작됐는지를 확인.

## SSL/TLS HandShake

ClientHello > ServerHello > 인증서 교환 > 키 교환 > 암호화된 통신?

## 참고 자료

- [TLS/SSL HandShake](https://gyoogle.dev/blog/computer-science/network/TLS%20HandShake.html)
- [SSL이란?, SSL과 TLS 정의 및 차이](https://kanoos-stu.tistory.com/46)
