// 队列结构的封装
export default class Queue {

  constructor() {
    this.items = [];
  }

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
    let result = '';
    for (let item of this.items) {
      result += item + ' ';
    }
    return result;
  }
}
