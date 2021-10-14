## JavaScript 数据结构与算法（三）栈

数组是一个线性结构，并且可以在数组的任意位置插入和删除元素。
但是有时候，我们为了实现某些功能，必须对这种任意性加以限制。
栈和队列就是比较常见的受限的线性结构。

## 什么是栈

栈（stack）是一种运算受限的线性表：

- `LIFO（last in first out）`表示就是后进入的元素，第一个弹出栈空间。类似于自动餐托盘，最后放上的托盘，往往先把拿出去使用。
- 其限制是仅允许在表的一端进行插入和删除运算。这一端被称为栈顶，相对地，把另一端称为栈底。
- 向一个栈插入新元素又称作进栈、入栈或压栈，它是把新元素放到栈顶元素的上面，使之成为新的栈顶元素；
- 从一个栈删除元素又称作出栈或退栈，它是把栈顶元素删除掉，使其相邻的元素成为新的栈顶元素。

如下图所示：
![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.71xt32okr3k0.png)

栈的特点：**先进后出，后进先出**。

## 程序中的栈结构

- 函数调用栈：A(B(C(D())))：
  即 A 函数中调用 B，B 调用 C，C 调用 D；在 A 执行的过程中会将 A 压入栈，随后 B 执行时 B 也被压入栈，函数 C 和 D 执行时也会被压入栈。所以当前栈的顺序为：A->B->C->D（栈顶）；函数 D 执行完之后，会弹出栈被释放，弹出栈的顺序为 D->C->B->A;

- 递归：
  为什么没有停止条件的递归会造成栈溢出？比如函数 A 为递归函数，不断地调用自己（因为函数还没有执行完，不会把函数弹出栈），不停地把相同的函数 A 压入栈，最后造成栈溢出（Queue Overfloat）。

## 练习

题目：有 6 个元素 6，5，4，3，2，1 按顺序进栈，问下列哪一个不是合法的出栈顺序？

- A：5 4 3 6 1 2 （√）
- B：4 5 3 2 1 6 （√）
- C：3 4 6 5 2 1 （×）
- D：2 3 4 1 5 6 （√）

题目所说的按顺序进栈指的不是一次性全部进栈，而是有进有出，进栈顺序为 6 -> 5 -> 4 -> 3 -> 2 -> 1。

解析：

- A 答案：65 进栈，5 出栈，4 进栈出栈，3 进栈出栈，6 出栈，21 进栈，1 出栈，2 出栈（整体入栈顺序符合 654321）。
- B 答案：654 进栈，4 出栈，5 出栈，3 进栈出栈，2 进栈出栈，1 进栈出栈，6 出栈（整体的入栈顺序符合 654321）。
- C 答案：6543 进栈，3 出栈，4 出栈，之后应该 5 出栈而不是 6，所以错误。
- D 答案：65432 进栈，2 出栈，3 出栈，4 出栈，1 进栈出栈，5 出栈，6 出栈。符合入栈顺序。

## 栈结构实现

### 栈常见的操作

- `push()` 添加一个新元素到栈顶位置。
- `pop()` 移除栈顶的元素，同时返回被移除的元素。
- `peek()` 返回栈顶的元素，不对栈做任何修改（该方法不会移除栈顶的元素，仅仅返回它）。
- `isEmpty()` 如果栈里没有任何元素就返回 `true`，否则返回 `false`。
- `size()` 返回栈里的元素个数。这个方法和数组的 `length` 属性类似。
- `toString()` 将栈结构的内容以字符串的形式返回。

### JavaScript 代码实现栈结构

```js
// 栈结构的封装
class Stack {
  constructor() {
    this.items = [];
  }

  // push(item) 压栈操作，往栈里面添加元素
  push(item) {
    this.items.push(item);
  }

  // pop() 出栈操作，从栈中取出元素，并返回取出的那个元素
  pop() {
    return this.items.pop();
  }

  // peek() 查看栈顶元素
  peek() {
    return this.items[this.items.length - 1];
  }

  // isEmpty() 判断栈是否为空
  isEmpty() {
    return this.items.length === 0;
  }

  // size() 获取栈中元素个数
  size() {
    return this.items.length;
  }

  // toString() 返回以字符串形式的栈内元素数据
  toString() {
    let result = "";
    for (let item of this.items) {
      result += item + " ";
    }
    return result;
  }
}
```

### 测试封装的栈结构

```js
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
```

## 栈结构的简单应用

利用栈结构的特点封装实现十进制转换为二进制的方法。

### 代码实现

```js
function dec2bin(dec) {
  // new 一个 Stack，保存余数
  const stack = new Stack();

  // 当不确定循环次数时，使用 while 循环
  while (dec > 0) {
    // 除二取余法
    stack.push(dec % 2); // 获取余数，放入栈中
    dec = Math.floor(dec / 2); // 除数除以二，向下取整
  }

  let binaryString = "";
  // 不断地从栈中取出元素（0 或 1），并拼接到一起。
  while (!stack.isEmpty()) {
    binaryString += stack.pop();
  }

  return binaryString;
}
```

### 测试

```js
// dec2bin() 测试
console.log(dec2bin(100)); //--> 1100100
console.log(dec2bin(88)); //--> 1011000
```
