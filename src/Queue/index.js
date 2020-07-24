import Queue from './queue';
import passGame from './passGame';

// ----- 队列结构测试 -----//
console.log('// ----- 队列结构测试 START -----//');
const queue = new Queue();

// 入队操作
queue.enqueue('a');
queue.enqueue('b');
queue.enqueue('c');
queue.enqueue('d');
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


// 击鼓传花方法的测试
const names = ['lily', 'lucy', 'tom', 'tony', 'jack'];
const targetIndex = passGame(names, 4);
console.log('击鼓传花', names[targetIndex]); //--> lily

console.log('// ----- 队列结构测试 END -----//');


