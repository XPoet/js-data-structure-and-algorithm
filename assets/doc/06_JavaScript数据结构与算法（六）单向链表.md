# JavaScript 数据结构与算法（六）单向链表

## 认识链表

### 链表和数组

链表和数组一样，可以用于存储一系列的元素，但是链表和数组的实现机制完全不同。

#### 数组

- 存储多个元素，数组（或列表）可能是最常用的数据结构。

- 几乎每一种编程语言都有默认实现数组结构，提供了一个便利的 `[]` 语法来访问数组元素。

- 数组缺点：

  数组的创建需要申请一段连续的内存空间(一整块内存)，并且大小是固定的，当前数组不能满足容量需求时，需要扩容。 (一般情况下是申请一个更大的数组，比如 2 倍，然后将原数组中的元素复制过去)

  在数组开头或中间位置插入数据的成本很高，需要进行大量元素的位移。

#### 链表

- 存储多个元素，另外一个选择就是使用链表。

- 不同于数组，链表中的元素在内存中不必是连续的空间。

- 链表的每个元素由一个存储元素本身的节点和一个指向下一个元素的引用(有些语言称为指针)组成。

- 链表优点：

  内存空间不必是连续的，可以充分利用计算机的内存，实现灵活的内存动态管理。

  链表不必在创建时就确定大小，并且大小可以无限延伸下去。

  链表在插入和删除数据时，时间复杂度可以达到 O(1)，相对数组效率高很多。

- 链表缺点：

  访问任何一个位置的元素时，需要从头开始访问。(无法跳过第一个元素访问任何一个元素)

  无法通过下标值直接访问元素，需要从头开始一个个访问，直到找到对应的元素。

  虽然可以轻松地到达下一个节点，但是回到前一个节点是很难的。

## 单向链表

单向链表类似于火车，有一个火车头，火车头会连接一个节点，节点上有乘客，并且这个节点会连接下一个节点，以此类推。

- 链表的火车结构

  ![链表的火车结构](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.27xtn3c52zwg.png)

- 链表的数据结构

  head 属性指向链表的第一个节点。  
  链表中的最后一个节点指向 `null`。
  当链表中一个节点也没有的时候，head 直接指向 `null`。

  ![链表的数据结构](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.37j1by46a120.png)

- 给火车加上数据后的结构

  ![给火车加上数据后的结构](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.664djiie2t80.png)

### 链表中的常见操作

- `append(element)` 向链表尾部添加一个新的项。
- `insert(position, element)` 向链表的特定位置插入一个新的项。
- `get(position)` 获取对应位置的元素。
- `indexOf(element)` 返回元素在链表中的索引。如果链表中没有该元素就返回-1。
- `update(position, element)` 修改某个位置的元素。
- `removeAt(position)` 从链表的特定位置移除一项。
- `remove(element)` 从链表中移除一项。
- `isEmpty()` 如果链表中不包含任何元素，返回 trun，如果链表长度大于 0 则返回 false。
- `size()` 返回链表包含的元素个数，与数组的 length 属性类似。
- `toString()` 由于链表项使用了 Node 类，就需要重写继承自 JavaScript 对象默认的 toString 方法，让其只输出元素的值。

### 单向链表的封装

#### 创建单向链表类

先创建单向链表类 LinkedList，添加基本属性，再逐步实现单向链表的常用方法。

```js
class LinkedList {
  // 初始链表长度为 0
  length = 0;

  // 初始 head 为 null，head 指向链表的第一个节点
  head = null;

  // 内部类（链表里的节点 Node）
  Node = class {
    data;
    next = null;
    constructor(data) {
      this.data = data;
    }
  };
}
```

#### 实现 append() 方法

##### 代码实现

```js
// append() 往链表尾部追加数据
append(data) {

    // 1、创建新节点
    const newNode = new this.Node(data);

    // 2、追加新节点
    if (this.length === 0) {

    // 链表长度为 0 时，即只有 head 的时候
    this.head = newNode;

    } else {
    // 链表长度大于 0 时，在最后面添加新节点
    let currentNode = this.head;

    // 当 currentNode.next 不为空时，
    // 循序依次找最后一个节点，即节点的 next 为 null 时
    while (currentNode.next !== null) {
        currentNode = currentNode.next;
    }

    // 最后一个节点的 next 指向新节点
    currentNode.next = newNode;
    }

    // 3、追加完新节点后，链表长度 + 1
    this.length++;

}
```

##### 过程图解

- 首先让 `currentNode` 指向第一个节点。

  ![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.5iskrdf4nu40.png)

- 通过 `while` 循环使 `currentNode` 指向最后一个节点，最后通过 `currentNode.next = newNode`，让最后一个节点指向新节点 `newNode`。

  ![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.4mw3bx5g80m0.png)

##### 代码测试

```js
const linkedList = new LinkedList();
// 测试 append 方法
linkedList.append("A");
linkedList.append("B");
linkedList.append("C");
console.log(linkedList);
```

![image](https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/JavaScript-数据结构与算法/image.6kx4qbq8e5c.png)

#### 实现 toString() 方法

##### 代码实现

```js
toString() {
    let currentNode = this.head;
    let result = '';

    // 遍历所有的节点，拼接为字符串，直到节点为 null
    while (currentNode) {
    result += currentNode.data + ' ';
    currentNode = currentNode.next;
    }

    return result;
}
```

##### 代码测试

```js
// 测试 toString 方法
console.log(linkedList.toString()); //--> AA BB CC
```

#### 实现 insert() 方法

##### 代码实现

```js
// insert() 在指定位置（position）插入节点
insert(position, data) {
    // position 新插入节点的位置
    // position = 0 表示新插入后是第一个节点
    // position = 1 表示新插入后是第二个节点，以此类推

    // 1、对 position 进行越界判断，不能小于 0 或大于链表长度
    if (position < 0 || position > this.length) return false;

    // 2、创建新节点
    const newNode = new this.Node(data);

    // 3、插入节点
    if (position === 0) { // position = 0 的情况
    // 让新节点的 next 指向 原来的第一个节点，即 head
    newNode.next = this.head;

    // head 赋值为 newNode
    this.head = newNode;
    } else { // 0 < position <= length 的情况

    // 初始化一些变量
    let currentNode = this.head; // 当前节点初始化为 head
    let previousNode = null; // head 的 上一节点为 null
    let index = 0; // head 的 index 为 0

    // 在 0 ~ position 之间遍历，不断地更新 currentNode 和 previousNode
    // 直到找到要插入的位置
    while (index++ < position) {
        previousNode = currentNode;
        currentNode = currentNode.next;
    }

    // 在当前节点和当前节点的上一节点之间插入新节点，即它们的改变指向
    newNode.next = currentNode;
    previousNode.next = newNode;
    }

    // 更新链表长度
    this.length++;
    return newNode;
}
```

##### 代码测试

```js
// 测试 insert 方法
linkedList.insert(0, "123");
linkedList.insert(2, "456");
console.log(linkedList.toString()); //--> 123 AA 456 BB CC
```

#### 实现 getData() 方法

获取指定位置（position）的 data。

##### 代码实现

```js
getData(position) {
    // 1、position 越界判断
    if (position < 0 || position >= this.length) return null;

    // 2、获取指定 position 节点的 data
    let currentNode = this.head;
    let index = 0;

    while (index++ < position) {
    currentNode = currentNode.next;
    }
    // 3、返回 data
    return currentNode.data;
}
```

##### 代码测试

```js
// 测试 getData 方法
console.log(linkedList.getData(0)); //--> 123
console.log(linkedList.getData(1)); //--> AA
```

#### 实现 indexOf() 方法

indexOf(data) 返回指定 data 的 index，如果没有，返回 -1。

##### 代码实现

```js
indexOf(data) {

    let currentNode = this.head;
    let index = 0;

    while (currentNode) {
    if (currentNode.data === data) {
        return index;
    }
    currentNode = currentNode.next;
    index++;
    }

    return -1;
}
```

##### 代码测试

```js
// 测试 indexOf 方法
console.log(linkedList.indexOf("AA")); //--> 1
console.log(linkedList.indexOf("ABC")); //--> -1
```

#### 实现 update() 方法

update(position, data) 修改指定位置节点的 data。

##### 代码实现

```js
update(position, data) {
    // 涉及到 position 都要进行越界判断
    // 1、position 越界判断
    if (position < 0 || position >= this.length) return false;

    // 2、痛过循环遍历，找到指定 position 的节点
    let currentNode = this.head;
    let index = 0;
    while (index++ < position) {
    currentNode = currentNode.next;
    }

    // 3、修改节点 data
    currentNode.data = data;

    return currentNode;
}
```

##### 代码测试

```js
// 测试 update 方法
linkedList.update(0, "12345");
console.log(linkedList.toString()); //--> 12345 AA 456 BB CC
linkedList.update(1, "54321");
console.log(linkedList.toString()); //--> 12345 54321 456 BB CC
```

#### 实现 removeAt() 方法

removeAt(position) 删除指定位置的节点。

##### 代码实现

```js
removeAt(position) {
    // 1、position 越界判断
    if (position < 0 || position >= this.length) return null;

    // 2、删除指定 position 节点
    let currentNode = this.head;
    if (position === 0) {
    // position = 0 的情况
    this.head = this.head.next;

    } else {
    // position > 0 的情况
    // 通过循环遍历，找到指定 position 的节点，赋值到 currentNode

    let previousNode = null;
    let index = 0;

    while (index++ < position) {
        previousNode = currentNode;
        currentNode = currentNode.next;
    }

    // 巧妙之处，让上一节点的 next 指向到当前的节点的 next，相当于删除了当前节点。
    previousNode.next = currentNode.next;
    }

    // 3、更新链表长度 -1
    this.length--;

    return currentNode;
}
```

##### 代码测试

```js
// 测试 removeAt 方法
linkedList.removeAt(3);
console.log(linkedList.toString()); //--> 12345 54321 456 CC
```

#### 实现 remove() 方法

remove(data) 删除指定 data 所在的节点。

##### 代码实现

```js
remove(data) {
    this.removeAt(this.indexOf(data));
}
```

##### 代码测试

```js
// 测试 remove 方法
linkedList.remove("CC");
console.log(linkedList.toString()); //--> 12345 54321 456
```

#### 实现 isEmpty() 方法

isEmpty() 判断链表是否为空。

##### 代码实现

```js
isEmpty() {
    return this.length === 0;
}
```

##### 代码测试

```js
// 测试 isEmpty 方法
console.log(linkedList.isEmpty()); //--> false
```

#### 实现 size() 方法

size() 获取链表的长度。

##### 代码实现

```js
size() {
    return this.length;
}
```

##### 代码测试

```js
// 测试 size 方法
console.log(linkedList.size()); //--> 3
```

#### 完整实现

```js
class LinkedList {
  // 初始链表长度为 0
  length = 0;

  // 初始 head 为 null，head 指向链表的第一个节点
  head = null;

  // 内部类（链表里的节点 Node）
  Node = class {
    data;
    next = null;

    constructor(data) {
      this.data = data;
    }
  };

  // ------------ 链表的常见操作 ------------ //

  // append() 往链表尾部追加数据
  append(data) {
    // 1、创建新节点
    const newNode = new this.Node(data);

    // 2、追加新节点
    if (this.length === 0) {
      // 链表长度为 0 时，即只有 head 的时候
      this.head = newNode;
    } else {
      // 链表长度大于 0 时，在最后面添加新节点
      let currentNode = this.head;

      // 当 currentNode.next 不为空时，
      // 循序依次找最后一个节点，即节点的 next 为 null 时
      while (currentNode.next !== null) {
        currentNode = currentNode.next;
      }

      // 最后一个节点的 next 指向新节点
      currentNode.next = newNode;
    }

    // 3、追加完新节点后，链表长度 + 1
    this.length++;
  }

  // insert() 在指定位置（position）插入节点
  insert(position, data) {
    // position 新插入节点的位置
    // position = 0 表示新插入后是第一个节点
    // position = 1 表示新插入后是第二个节点，以此类推

    // 1、对 position 进行越界判断，不能小于 0 或大于链表长度
    if (position < 0 || position > this.length) return false;

    // 2、创建新节点
    const newNode = new this.Node(data);

    // 3、插入节点
    if (position === 0) {
      // position = 0 的情况
      // 让新节点的 next 指向 原来的第一个节点，即 head
      newNode.next = this.head;

      // head 赋值为 newNode
      this.head = newNode;
    } else {
      // 0 < position <= length 的情况

      // 初始化一些变量
      let currentNode = this.head; // 当前节点初始化为 head
      let previousNode = null; // head 的 上一节点为 null
      let index = 0; // head 的 index 为 0

      // 在 0 ~ position 之间遍历，不断地更新 currentNode 和 previousNode
      // 直到找到要插入的位置
      while (index++ < position) {
        previousNode = currentNode;
        currentNode = currentNode.next;
      }

      // 在当前节点和当前节点的上一节点之间插入新节点，即它们的改变指向
      newNode.next = currentNode;
      previousNode.next = newNode;
    }

    // 更新链表长度
    this.length++;
    return newNode;
  }

  // getData() 获取指定位置的 data
  getData(position) {
    // 1、position 越界判断
    if (position < 0 || position >= this.length) return null;

    // 2、获取指定 position 节点的 data
    let currentNode = this.head;
    let index = 0;

    while (index++ < position) {
      currentNode = currentNode.next;
    }

    // 3、返回 data
    return currentNode.data;
  }

  // indexOf() 返回指定 data 的 index，如果没有，返回 -1。
  indexOf(data) {
    let currentNode = this.head;
    let index = 0;

    while (currentNode) {
      if (currentNode.data === data) {
        return index;
      }
      currentNode = currentNode.next;
      index++;
    }

    return -1;
  }

  // update() 修改指定位置节点的 data
  update(position, data) {
    // 涉及到 position 都要进行越界判断
    // 1、position 越界判断
    if (position < 0 || position >= this.length) return false;

    // 2、痛过循环遍历，找到指定 position 的节点
    let currentNode = this.head;
    let index = 0;
    while (index++ < position) {
      currentNode = currentNode.next;
    }

    // 3、修改节点 data
    currentNode.data = data;

    return currentNode;
  }

  // removeAt() 删除指定位置的节点
  removeAt(position) {
    // 1、position 越界判断
    if (position < 0 || position >= this.length) return null;

    // 2、删除指定 position 节点
    let currentNode = this.head;
    if (position === 0) {
      // position = 0 的情况
      this.head = this.head.next;
    } else {
      // position > 0 的情况
      // 通过循环遍历，找到指定 position 的节点，赋值到 currentNode

      let previousNode = null;
      let index = 0;

      while (index++ < position) {
        previousNode = currentNode;
        currentNode = currentNode.next;
      }

      // 巧妙之处，让上一节点的 next 指向到当前的节点的 next，相当于删除了当前节点。
      previousNode.next = currentNode.next;
    }

    // 3、更新链表长度 -1
    this.length--;

    return currentNode;
  }

  // remove() 删除指定 data 的节点
  remove(data) {
    this.removeAt(this.indexOf(data));
  }

  // isEmpty() 判断链表是否为空
  isEmpty() {
    return this.length === 0;
  }

  // size() 获取链表的长度
  size() {
    return this.length;
  }

  // toString() 链表数据以字符串形式返回
  toString() {
    let currentNode = this.head;
    let result = "";

    // 遍历所有的节点，拼接为字符串，直到节点为 null
    while (currentNode) {
      result += currentNode.data + " ";
      currentNode = currentNode.next;
    }

    return result;
  }
}
```

