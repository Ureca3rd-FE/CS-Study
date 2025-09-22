const str = "abdcdefg";

// 1. reverse() 메서드 활용 방법
const start1 = performance.now();
const reversedStr1 = str.split("").reverse().join("");
const end1 = performance.now();
console.log(`역순출력: ${reversedStr1} 소요시간: ${end1 - start1}`);

// 2. Stack 활용 방법
const start2 = performance.now();
const stack = [];
for (let char of str) {
  stack.push(char);
}
let reversedStr2 = "";
while (stack.length > 0) {
  reversedStr2 += stack.pop();
}
const end2 = performance.now();
console.log(`역순출력: ${reversedStr2} 소요시간: ${end2 - start2}`);
