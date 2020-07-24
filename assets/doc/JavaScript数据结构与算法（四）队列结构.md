## JavaScript 数据结构与算法（四）队列结构

### 认识队列

队列（Queue）是一种运算受限的线性表，特点：先进先出。(FIFO：First In First Out)

**受限之处：**

- 只允许在表的前端（front）进行删除操作。
- 在表的后端（rear）进行插入操作。

生活中类似队列结构的场景：

- 排队,，比如在电影院，商场，甚至是厕所排队。
- 优先排队的人，优先处理。 (买票、结账、WC)。

![queue](https://user-images.githubusercontent.com/24516169/88038526-e9f6c880-cb78-11ea-859d-1faaaebed3bf.png)

#### 队列图解

![queue](https://user-images.githubusercontent.com/24516169/88038782-45c15180-cb79-11ea-8439-bdc7e240d10d.png)

#### 队列在程序中的应用

- 打印队列：计算机打印多个文件的时候，需要排队打印。
- 线程队列：当开启多线程时，当新开启的线程所需的资源不足时就先放入线程队列，等待 CPU 处理。

### 队列的实现

队列的实现和栈一样，有两种方案：

- 基于数组实现。
- 基于链表实现。

#### 队列常见的操作

- `enqueue(element)`：向队列尾部添加一个（或多个）新的项。
- `dequeue()`：移除队列的第一（即排在队列最前面的）项，并返回被移除的元素。
- `front()`：返回队列中的第一个元素——最先被添加，也将是最先被移除的元素。队列不做任何变动（不移除元素，只返回元素信息与 Stack 类的 peek 方法非常类似）。
- `isEmpty()`：如果队列中不包含任何元素，返回 true，否则返回 false。
- `size()`：返回队列包含的元素个数，与数组的 length 属性类似。
- `toString()`：将队列中的内容，转成字符串形式。

#### 代码实现

```js
// 使用 ES6 实现
class Queue {
  items = [];

  // enqueue() 入队，将元素加入到队列中
  enqueue(item) {
    this.items.push(item);
  }

  // dequeue() 出队，从队列中删除前端元素，返回删除的元素
  dequeue() {
    return this.items.shift();
  }

  // front() 查看队列的前端元素
  front() {
    return this.items[0];
  }

  // isEmpty() 查看队列是否为空
  isEmpty() {
    return this.items.length === 0;
  }

  // size() 查看队列中元素的个数
  size() {
    return this.items.length;
  }

  toString() {
    let result = "";
    for (let item of this.items) {
      result += item + " ";
    }
    return result;
  }
}
```

#### 测试代码

```js
const queue = new Queue();

// 入队操作
queue.enqueue("a");
queue.enqueue("b");
queue.enqueue("c");
queue.enqueue("d");
console.log(queue.items); //--> ["a", "b", "c", "d"]

// 出队操作（先进先出）
queue.dequeue();
queue.dequeue();
console.log(queue.items); //--> ["c", "d"]

// 查看队头的元素
console.log(queue.front()); //--> c

console.log(queue.isEmpty()); //--> false
console.log(queue.size()); //--> 2
console.log(queue.toString()); //--> c d
```

### 队列的应用

使用队列实现小游戏：**击鼓传花**。

分析：传入一组数据集合和设定的数字 number，循环遍历数组内元素，遍历到的元素为指定数字 number 时将该元素删除，直至数组剩下一个元素。

#### 代码实现

```js
function passGame(nameList, number) {
  // 1、new 一个 Queue 对象
  const queue = new Queue();

  // 2、将 nameList 里面的每一个元素入队
  for (const name of nameList) {
    queue.enqueue(name);
  }

  // 3、开始数数
  // 队列中只剩下 1 个元素时就停止数数
  while (queue.size() > 1) {
    // 不是 number 时，重新加入到队尾
    // 是 number 时，将其删除

    for (let i = 0; i < number - 1; i++) {
      // number 数字之前的人重新放入到队尾（即把队头删除的元素，重新加入到队列中）
      queue.enqueue(queue.dequeue());
    }

    // number 对应这个人，直接从队列中删除
    // 由于队列没有像数组一样的下标值不能直接取到某一元素，
    // 所以采用，把 number 前面的 number - 1 个元素先删除后添加到队列末尾，
    // 这样第 number 个元素就排到了队列的最前面，可以直接使用 dequeue 方法进行删除
    queue.dequeue();
  }

  // 4、获取最后剩下的那个人
  const endName = queue.front();

  // 5、返回这个人在原数组中对应的索引
  return nameList.indexOf(endName);
}
```

#### 测试代码

```js
const names = ["lily", "lucy", "tom", "tony", "jack"];
const targetIndex = passGame(names, 4);
console.log("击鼓传花", names[targetIndex]); //--> lily
```

### 优先队列

优先级队列主要考虑的问题：

- 每个元素不再只是一个数据，还包含数据的优先级。
- 在添加数据过程中，根据优先级放入到正确位置。

#### 优先队列的实现

##### 代码实现

```js
class PriorityQueue {
  items = [];

  // 内部类 
  QueueElement = class {
    constructor(element, priority) {
      this.element = element;
      this.priority = priority;
    }
  };

  // enqueue() 入队，将元素按优先级加入到队列中
  enqueue(element, priority) {
    // 根据传入的元素，创建 QueueElement 对象
    const queueElement = new this.QueueElement(element, priority);

    // 判断队列是否为空
    if (this.isEmpty()) {
      // 如果为空，不用判断优先级，直接添加
      this.items.push(queueElement);
    } else {
      // 定义一个变量记录是否成功添加了新元素
      let added = false;

      for (let i = 0; i < this.items.length; i++) {
        // 让新插入的元素进行优先级比较，priority 值越小，优先级越大
        if (queueElement.priority < this.items[i].priority) {
          // 在指定的位置插入元素
          this.items.splice(i, 0, queueElement);
          added = true;
          break;
        }
      }

      // 如果遍历完所有元素，优先级都大于新插入的元素，就将新插入的元素插入到最后
      if (!added) {
        this.items.push(queueElement);
      }
    }
  }

  // dequeue() 出队，从队列中删除前端元素，返回删除的元素
  dequeue() {
    return this.items.shift();
  }

  // front() 查看队列的前端元素
  front() {
    return this.items[0];
  }

  // isEmpty() 查看队列是否为空
  isEmpty() {
    return this.items.length === 0;
  }

  // size() 查看队列中元素的个数
  size() {
    return this.items.length;
  }

  toString() {
    let result = "";
    for (let item of this.items) {
      result += item.element + "-" + item.priority + " ";
    }
    return result;
  }
}
```

#### 测试代码

```js
const priorityQueue = new PriorityQueue();

// 入队
priorityQueue.enqueue("A", 10);
priorityQueue.enqueue("B", 15);
priorityQueue.enqueue("C", 11);
priorityQueue.enqueue("D", 20);
priorityQueue.enqueue("E", 18);

console.log(priorityQueue.items);
//--> output:
// QueueElement {element: "A", priority: 10}
// QueueElement {element: "C", priority: 11}
// QueueElement {element: "B", priority: 15}
// QueueElement {element: "E", priority: 18}
// QueueElement {element: "D", priority: 20}

// 出队
priorityQueue.dequeue();
priorityQueue.dequeue();
console.log(priorityQueue.items);
//--> output:
// QueueElement {element: "B", priority: 15}
// QueueElement {element: "E", priority: 18}
// QueueElement {element: "D", priority: 20}

console.log(priorityQueue.isEmpty()); //--> false
console.log(priorityQueue.size()); //--> 3
console.log(priorityQueue.toString()); //--> B-15 E-18 D-20
```

### 数组、栈和队列图解
![array-stack-queue](https://user-images.githubusercontent.com/24516169/88051118-b02ebd80-cb8a-11ea-9acf-4329cbbff6fc.png)
