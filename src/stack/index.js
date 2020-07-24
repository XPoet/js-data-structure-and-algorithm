import Stack from './stack';
import dec2bin from './dec2bin';

// ----- 栈结构测试 -----//
console.log('// ----- 栈结构测试 START -----//');
const stack = new Stack();

// push() 方法测试
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack);

// pop() 方法测试
console.log(stack.pop());
console.log(stack.pop());

// peek() 方法测试
console.log(stack.peek());

// isEmpty() 方法测试
console.log(stack.isEmpty());

// size() 方法测试
console.log(stack.size());

// toString() 方法测试
console.log(stack.toString());

// 利用栈结构的特点实现十进制转换为二进制的方法测试
console.log(dec2bin(100));
console.log(dec2bin(88));

console.log('// ----- 栈结构测试 END -----//');


