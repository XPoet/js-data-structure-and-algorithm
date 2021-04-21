# JavaScript 数据结构与算法

本仓库内容根据哔哩哔哩 [《JavaScript 数据结构与算法》](https://www.bilibili.com/video/BV1x7411L7Q7?p=1) 视频整理的学习笔记，视频教程讲的特别好，配合本仓库的代码测试环境来练习，学习效果更佳，欢迎同学们 Star 和 Fork。  

推荐大家按照目录顺序来学习，由浅入深，循序渐进，轻松搞定数据结构和算法。

代码部分均采用 ES6 编写，使用 webpack 和 babel 将 ES6 自动转换成 ES5。

> 重点要掌握数据结构与算法的思想和原理，使用哪种编程语言区别不大。

## 交流群

- 扫描下方二维码，加入微信交流群，欢迎小伙伴们畅所欲言，包括但不限于前端技术问题，大家一起成长~

  <img src="https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/FE-Cheerleaders/Group-QR-Code.png" width="35%" />

- 如果上面的二维码失效，可关注公众号《前端鼓励师》，添加作者微信，再由作者拉你进群~

  <img src="https://cdn.jsdelivr.net/gh/XPoet/image-hosting@master/FE-Cheerleaders/FEC-Card.76dbi8n1bkk0.png" width="80%" />

## 文档目录

- [JavaScript 数据结构与算法（一）前言](assets/doc/01_JavaScript数据结构与算法（一）前言.md)
- [JavaScript 数据结构与算法（二）数组](assets/doc/02_JavaScript数据结构与算法（二）数组.md)
- [JavaScript 数据结构与算法（三）栈](assets/doc/03_JavaScript数据结构与算法（三）栈.md)
- [JavaScript 数据结构与算法（四）队列](assets/doc/04_JavaScript数据结构与算法（四）队列.md)
- [JavaScript 数据结构与算法（五）优先队列](assets/doc/05_JavaScript数据结构与算法（五）优先队列.md)
- [JavaScript 数据结构与算法（六）单向链表](assets/doc/06_JavaScript数据结构与算法（六）单向链表.md)
- [JavaScript 数据结构与算法（七）双向链表](assets/doc/07_JavaScript数据结构与算法（七）双向链表.md)
- [JavaScript 数据结构与算法（八）集合](assets/doc/08_JavaScript数据结构与算法（八）集合.md)
- [JavaScript 数据结构与算法（九）字典](assets/doc/09_JavaScript数据结构与算法（九）字典.md)
- [JavaScript 数据结构与算法（十）哈希表](assets/doc/10_JavaScript数据结构与算法（十）哈希表.md)
- [JavaScript 数据结构与算法（十一）树](assets/doc/11_JavaScript数据结构与算法（十一）树.md)
- [JavaScript 数据结构与算法（十二）二叉树](assets/doc/12_JavaScript数据结构与算法（十二）二叉树.md)
- [JavaScript 数据结构与算法（十三）二叉搜索树](assets/doc/13_JavaScript数据结构与算法（十三）二叉搜索树.md)
- [JavaScript 数据结构与算法（十四）图](assets/doc/14_JavaScript数据结构与算法（十四）图.md)

## 代码目录

- [栈的封装](src/Stack/stack.js)
- [队列的封装](src/Queue/queue.js)
- [优先队列的封装](src/PriorityQueue/priorityQueue.js)
- [单向链表的封装](src/LinkedList/linkedList.js)
- [双向链表的封装](src/DoublyLinkedList/doublyLinkedList.js)
- [集合的封装](src/Set/set.js)
- [字典的封装](src/Map/map.js)
- [哈希表的封装](src/HashTable/hashTable.js)
- [二叉搜索树的封装](src/Tree/tree.js)
- [图的封装](src/Graph/graph.js)

## 测试环境

### 安装依赖
```bash
npm install
```

### 启动服务
```bash
npm run start
```

开启**测试环境**的服务后，可在 `src/index.js` 选择要测试的代码，查看具体值输出。
比如：我要测试**栈**，把 `// import './Stack'` 的注释去掉，要测试哪个就去掉哪个的注释。

```js
// 导入栈结构的封装及测试代码
// import './Stack'

// 导入队列结构的封装及测试代码
// import './Queue'

// 导入优先队列结构的封装及测试代码
// import './PriorityQueue'

// 导入单向链表结构的封装及测试代码
// import './LinkedList'

// 导入双向链表结构的封装及测试代码
// import './DoublyLinkedList'

// 导入集合结构的封装及测试代码
// import './Set'

// 导入字典结构的封装及测试代码
// import './Map'

// 导入哈希表结构的封装及测试代码
// import './HashTable';

// 导入树结构的封装及测试代码
// import './Tree';

// 导入图结构的封装及测试代码
// import './Graph';
```
