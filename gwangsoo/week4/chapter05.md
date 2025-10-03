# 시스템 콜(System Call)

## fork

**`fork()`는 현재 프로세스를 복제해 자식 프로세스**를 만든다.  
부모는 `fork()`의 반환값으로 **_자식 PID(양수)_**, 자식은 **_0_**을 받는다.

같은 코드라도 **반환값 분기**로 부모/자식을 구분한다.

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
    printf("pid : %d", (int) getpid()); // pid : 29146

    int rc = fork(); // 주목

    if (rc < 0) {
        exit(1);
    } // (1) fork 실패
    else if (rc == 0) { // (2) child 인 경우 (fork 값이 0)
        printf("child (pid : %d)", (int) getpid());
    }
    else { // (3) parent case
        printf("parent of %d (pid : %d)", rc, (int)getpid());
    }
}
```

위 코드의 실행 결과는 아래와 같다.

```plaintext
pid : 29146

parent of 29147 (pid : 29146)

child (pid : 29147)

# or

pid : 29146

child (pid : 29147)

parent of 29147 (pid : 29146)
```

위처럼 2개의 출력 결과가 나오게 되는데, 이는 **스케쥴러에 의해 결정**되기 때문에 **부모와 자식의 순서는 비결정적**이게 된다.

```plaintext
부모 프로세스 (PID=1000)
   |
   | fork()
   v
 ┌───────────────┐
 │               │
부모 (rc>0)   자식 (rc==0)
PID=1000       PID=1001
```

그렇다면 **자식을 먼저 실행시키고 부모를 실행**시키려면 어떻게 해야할까?

## wait

**wait()**는 **child 프로세스가 종료될 때까지 기다리게** 해준다.

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
    printf("pid : %d", (int) getpid()); // pid : 29146

    int rc = fork(); // 주목

    if (rc < 0) {
        exit(1);
    } // (1) fork 실패
    else if (rc == 0) { // (2) child 인 경우 (fork 값이 0)
        printf("child (pid : %d)", (int) getpid());
    }
    else { // (3) parent case
        int wc = wait(NULL); // 추가된 부분, wc는 종료한 자식의 PID
        printf("parent of %d (pid : %d)", rc, (int)getpid());
    }
}
```

```plaintext
pid : 29146

child (pid : 29147)

parent of 29147 (wc : 29147 / pid : 29146)
```

wait()는 **child가 끝나기 전에는 return하지 않으므로 반드시 child가 먼저 실행**된다.

```plaintext
부모 프로세스 (PID=1000)
   |
   | fork()
   v
 ┌───────────────┐
 │               │
부모 (rc>0)   자식 (rc==0)
PID=1000       PID=1001
   |               |
   | wait()        | 실행 후 종료
   |──────────────>|
   | (자식 종료 신호 수신)
   v
부모가 다시 실행 재개
```

만약 자식이 **부모와 동일한 작업이 아닌 다른 작업을 하고 싶다면** 어떻게 할까?

## exec

단순 fork는 **동일한 프로세스의 내용을 여러 번 동작할 때 사용**한다.

**exec()**를 이용하여 **자식 프로레스가 부모와 다르게 동작**하게 할 수 있다.

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
    printf("pid : %d", (int) getpid()); // pid : 29146

    int rc = fork(); // 주목

    if (rc < 0) {
        exit(1);
    } // (1) fork 실패
    else if (rc == 0) { // (2) child 인 경우 (fork 값이 0)
        printf("child (pid : %d)", (int) getpid());
        char *myargs[3];
        myargs[0] = strdup("wc"); // 내가 실행할 파일 이름
        myargs[1] = strdup("p3.c"); // 실행할 파일에 넘겨줄 argument
        myargs[2] = NULL; // end of array
        execvp(myargs[0], myargs); // wc 파일 실행.
        printf("this shouldn't print out") // 실행되지 않음.
    }
    else { // (3) parent case
        int wc = wait(NULL);
        printf("parent of %d (pid : %d)", rc, (int)getpid());
    }
}
```

`execvp(실행 파일, 전달 인자)`가 호출되면 운영체제는 해당 실행 파일의 코드를 **프로세스의 코드 세그먼트** 에 적재하여 **기존 내용을 덮어쓴다.**

이 과정에서 **힙, 스택 등 다른 메모리 영역도 초기화**되고 OS는 **마치 처음부터 그 프로그램이 실행된 것처럼** 처리한다.

따라서 **새로운 프로세스를 생성하는 것이 아니라 현재 프로세스의 실행 이미지를 새로운 프로그램으로 교체**하는 것이다.  
그 결과 **`execvp()` 호출 이후의 코드는 더 이상 실행되지 않는다.**

```plaintext
부모 프로세스 (PID=1000)
   |
   | fork()
   v
 ┌───────────────┐
 │               │
부모 (rc>0)   자식 (rc==0)
PID=1000       PID=1001
   |               |
   | wait()        | exec("wc p3.c")
   |               v
   |         ┌───────────────┐
   |         │   새로운 프로그램  │
   |         │  wc 명령어 실행중 │
   |         └───────────────┘
   |               |
   |<──────────────┘ (wc 종료)
   |
부모 wait() 끝 → 계속 실행
```

## fork 사용 예시

1. **새 프로그램 실행**: `fork() → exec() → wait()` (**쉘에서 명령 실행**)
2. **동시 처리**: 부모가 **여러 자식 생성**, 각각 다른 작업 (**웹 서버 요청 처리**)
3. **데몬 생성**: **double fork**로 고아 프로세스 → **init/systemd**에 붙임 (**cron, sshd**)
4. **파이프/IPC**: `ls | grep txt` 같은 **파이프 명령 실행**
5. **병렬 계산**: 작업 분할 후 **자식들이 계산**, 부모가 **결과 수집**

## fork 주의할 점

1. **출력 버퍼 중복**: `fflush(stdout)` 후 fork
2. **좀비 프로세스**: 반드시 `wait()` / `waitpid()` 호출
3. **리소스 공유 문제**: FD/소켓 **복제됨** → 필요 시 `close()` 또는 `O_CLOEXEC`
4. **메모리 독립성**: 변수 변경 **공유 안 됨** → IPC 사용 필요
5. **멀티스레드 위험**: fork 시 **한 스레드만 복제** → `posix_spawn()` 권장
