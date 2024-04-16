// 节点类
class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}


// 封装二叉搜索树（特点：左子树节点值 < 根节点，右子树节点值 > 根节点）
export class BinarySearchTree {

  constructor() {
    this.root = null;
  }

  // insert(key) 插入数据
  insert(key) {
    const newNode = new Node(key);

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }

  }

  insertNode(root, node) {

    if (node.key < root.key) { // 往左边查找插入

      if (root.left === null) {
        root.left = node;
      } else {
        this.insertNode(root.left, node);
      }

    } else { // 往右边查找插入

      if (root.right === null) {
        root.right = node;
      } else {
        this.insertNode(root.right, node);
      }

    }

  }

  // ----------- 二叉树遍历 ----------- //
  // 先序遍历（根左右 DLR）
  preorderTraversal() {
    const result = [];
    this.preorderTraversalNode(this.root, result);
    return result;
  }

  preorderTraversalNode(node, result) {
    if (node === null) return result;
    result.push(node.key);
    this.preorderTraversalNode(node.left, result);
    this.preorderTraversalNode(node.right, result);
  }

  // 中序遍历（左根右 LDR）
  inorderTraversal() {
    const result = [];
    this.inorderTraversalNode(this.root, result);
    return result;
  }

  inorderTraversalNode(node, result) {
    if (node === null) return result;
    this.inorderTraversalNode(node.left, result);
    result.push(node.key);
    this.inorderTraversalNode(node.right, result);
  }

  // 后序遍历（左右根 LRD）
  postorderTraversal() {
    const result = [];
    this.postorderTraversalNode(this.root, result);
    return result;
  }

  postorderTraversalNode(node, result) {
    if (node === null) return result;
    this.postorderTraversalNode(node.left, result);
    this.postorderTraversalNode(node.right, result);
    result.push(node.key);
  }

  // min() 获取二叉搜索树最小值
  min() {
    if (!this.root) return null;
    let node = this.root;
    while (node.left !== null) {
      node = node.left;
    }
    return node.key;
  }

  // max() 获取二叉搜索树最大值
  max() {
    if (!this.root) return null;
    let node = this.root;
    while (node.right !== null) {
      node = node.right;
    }
    return node.key;
  }

  // search(key) 查找二叉搜索树中是否有相同的key，存在返回 true，否则返回 false
  search(key) {
    return this.searchNode(this.root, key);
  }

  // 通过递归实现
  searchNode(node, key) {
    if (node === null) return false;
    if (key < node.key) {
      return this.searchNode(node.left, key);
    } else if (key > node.key) {
      return this.searchNode(node.right, key);
    } else {
      return true;
    }
  }

  // 通过 while 循环实现
  search2(key) {

    let node = this.root;

    while (node !== null) {
      if (key < node.key) {
        node = node.left;
      } else if (key > node.key) {
        node = node.right;
      } else {
        return true;
      }
    }

    return false;

  }

  // 删除节点
  remove(key) {

    let currentNode = this.root;
    let parentNode = null;
    let isLeftChild = true;

    // 循环查找到要删除的节点 currentNode，以及它的 parentNode、isLeftChild
    while (currentNode.key !== key) {

      parentNode = currentNode;

      // 小于，往左查找
      if (key < currentNode.key) {
        isLeftChild = true;
        currentNode = currentNode.left;

      } else {  // 否则往右查找
        isLeftChild = false;
        currentNode = currentNode.right;
      }

      // 找到最后都没找到相等的节点，返回 false
      if (currentNode === null) {
        return false;
      }

    }


    // 1、删除的是叶子节点的情况
    if (currentNode.left === null && currentNode.right === null) {

      if (currentNode === this.root) {
        this.root = null;
      } else if (isLeftChild) {
        parentNode.left = null;
      } else {
        parentNode.right = null;
      }


      // 2、删除的是只有一个子节点的节点
    } else if (currentNode.right === null) { // currentNode 只存在左节点
      //-- 2.1、currentNode 只存在<左节点>的情况
      //---- 2.1.1、currentNode 等于 root
      //---- 2.1.2、parentNode.left 等于 currentNode
      //---- 2.1.3、parentNode.right 等于 currentNode

      if (currentNode === this.root) {
        this.root = currentNode.left;
      } else if (isLeftChild) {
        parentNode.left = currentNode.left;
      } else {
        parentNode.right = currentNode.left;
      }

    } else if (currentNode.left === null) { // currentNode 只存在右节点
      //-- 2.2、currentNode 只存在<右节点>的情况
      //---- 2.1.1 currentNode 等于 root
      //---- 2.1.1 parentNode.left 等于 currentNode
      //---- 2.1.1 parentNode.right 等于 currentNode

      if (currentNode === this.root) {
        this.root = currentNode.right;
      } else if (isLeftChild) {
        parentNode.left = currentNode.right;
      } else {
        parentNode.right = currentNode.right;
      }


      // 3、删除的是有两个子节点的节点
    } else {

      // 1、找到后续节点
      let successor = this.getSuccessor(currentNode);

      // 2、判断是否为根节点
      if (currentNode === this.root) {
        this.root = successor;
      } else if (isLeftChild) {
        parentNode.left = successor;
      } else {
        parentNode.right = successor;
      }

      // 3、将后续的左节点改为被删除的左节点
      successor.left = currentNode.left;
    }
  }

  // 获取后续节点，即从要删除的节点的右边开始查找最小的值
  getSuccessor(delNode) {

    // 定义变量，保存要找到的后续
    let successor = delNode;
    let current = delNode.right;
    let successorParent = delNode;

    // 循环查找 current 的右子树节点
    while (current !== null) {
      successorParent = successor;
      successor = current;
      current = current.left;
    }

    // 判断寻找到的后续节点是否直接就是要删除节点的 right
    if (successor !== delNode.right) {
      successorParent.left = successor.right;
      successor.right = delNode.right;
    }
    return successor;
  }


}
