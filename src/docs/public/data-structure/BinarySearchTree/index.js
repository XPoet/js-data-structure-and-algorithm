import { BinarySearchTree } from './tree.js';
// ---------------- 封装的二叉搜索树结构测试 ---------------- //
console.log('// ----- 二叉搜索树结构测试 START -----//');

// 二叉搜索树测试
// insert() 插入
const binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(11);
binarySearchTree.insert(7);
binarySearchTree.insert(5);
binarySearchTree.insert(3);
binarySearchTree.insert(9);
binarySearchTree.insert(8);
binarySearchTree.insert(10);
binarySearchTree.insert(15);
binarySearchTree.insert(13);
binarySearchTree.insert(12);
binarySearchTree.insert(14);
binarySearchTree.insert(20);
binarySearchTree.insert(18);
binarySearchTree.insert(25);
binarySearchTree.insert(19);
console.log(binarySearchTree);


console.log('前序遍历', binarySearchTree.preorderTraversal());
console.log('中序遍历', binarySearchTree.inorderTraversal());
console.log('后序遍历', binarySearchTree.postorderTraversal());
console.log('min', binarySearchTree.min());
console.log('max', binarySearchTree.max());
console.log('search(98)-递归实现', binarySearchTree.search(98));
console.log('search(10)-递归实现', binarySearchTree.search(10));

console.log('search(98)-while 循环实现', binarySearchTree.search2(98));
console.log('search(10)-while 循环实现', binarySearchTree.search2(10));

console.log('remove(20)');
binarySearchTree.remove(20);
console.log(binarySearchTree);
console.log(binarySearchTree.inorderTraversal());

console.log('// ----- 二叉搜索树结构测试 END -----//');


