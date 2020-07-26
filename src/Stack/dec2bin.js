import Stack from './stack';

// 利用栈结构的特点封装实现十进制转换为二进制的方法
export default function dec2bin(dec) {
  // new 一个 Stack，保存余数
  const stack = new Stack();

  // 当不确定循环次数时，使用 while 循环
  while (dec > 0) {
    // 除二取余法
    stack.push(dec % 2); // 获取余数，放入栈中
    dec = Math.floor(dec / 2); // 除数除以二，向下取整
  }

  let binaryString = '';
  // 不断地从栈中取出元素（0 或 1），并拼接到一起。
  while (!stack.isEmpty()) {
    binaryString += stack.pop();
  }

  return binaryString;
}
