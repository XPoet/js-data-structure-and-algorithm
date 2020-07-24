// 优先队列结构的封装
export default class PriorityQueue {

  constructor() {
    
    this.items = [];

    // 内部类
    this.QueueElement = class {
      constructor(element, priority) {
        this.element = element;
        this.priority = priority;
      }
    };

  }

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
    let result = '';
    for (let item of this.items) {
      result += item.element + '-' + item.priority + ' ';
    }
    return result;
  }
}
