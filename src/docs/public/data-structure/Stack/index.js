import Stack from './stack.js';
import dec2bin from './dec2bin.js';

// ---------------- 封装的栈结构测试 ---------------- //
console.log('// ----- 栈结构测试 START -----//');
const stack = new Stack();

// push() 测试
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.items); //--> [1, 2, 3]

// pop() 测试
console.log(stack.pop()); //--> 3

// peek() 测试
console.log(stack.peek()); //--> 2

// isEmpty() 测试
console.log(stack.isEmpty()); //--> false

// size() 测试
console.log(stack.size()); //--> 2

// toString() 测试
console.log(stack.toString()); //--> 1 2

// dec2bin() 测试
console.log(dec2bin(100)); //--> 1100100
console.log(dec2bin(88)); //--> 1011000

console.log('// ----- 栈结构测试 END -----//');


