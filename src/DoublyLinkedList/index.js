import { DoublyLinkedList } from './doublyLinkedList';

// ---------------- 封装的双向链表结构测试 ---------------- //
console.log('// ----- 双向链表结构测试 START -----//');
const doublyLinkedList = new DoublyLinkedList();

// append() 测试
doublyLinkedList.append('ZZ');
doublyLinkedList.append('XX');
doublyLinkedList.append('CC');
console.log(doublyLinkedList);

// insert() 测试
doublyLinkedList.insert(0, '00');
doublyLinkedList.insert(2, '22');
console.log(doublyLinkedList);

// getData() 测试
console.log(doublyLinkedList.getData(1)); //--> ZZ

// indexOf() 测试
console.log(doublyLinkedList.indexOf('XX')); //--> 3
console.log(doublyLinkedList);

// removeAt() 测试
// doublyLinkedList.removeAt(0);
// doublyLinkedList.removeAt(1);
// console.log(doublyLinkedList);

// update() 测试
console.log('update() 测试');
doublyLinkedList.update(0, '111111');
console.log(doublyLinkedList);

// remove() 测试
console.log('remove() 测试');
console.log(doublyLinkedList.remove('111111'));
// console.log(doublyLinkedList.remove('22222'));
console.log(doublyLinkedList);

// forwardToString() 测试
// console.log(doublyLinkedList.forwardToString());

// backwardString() 测试
// console.log(doublyLinkedList.backwardString());

console.log('// ----- 双向链表结构测试 END -----//');


