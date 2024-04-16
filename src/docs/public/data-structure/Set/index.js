import Set from './set.js';

// ---------------- 封装的栈结构测试 ---------------- //
console.log('// ----- 集合结构测试 START -----//');
const set = new Set();

// add() 测试
set.add('abc');
set.add('abc');
set.add('123');
set.add('zxc');
console.log(set); //--> {items: {123: "123", abc: "abc", zxc: "zxc"}}

// has() 测试
console.log(set.has('123')); //--> true
console.log(set.has('456')); //--> false

// remove() 测试
set.remove('abc');
console.log(set); //--> {items: {123: "123", zxc: "zxc"}}

// size() 测试
console.log(set.size()); //--> 2

// values() 测试
console.log(set.values()); //--> ["123", "zxc"]

// clear() 测试
set.clear();
console.log(set.values()); //--> []

// ------- 集合的操作测试 ------- //
const setA = new Set();
setA.add('111');
setA.add('222');
setA.add('333');

const setB = new Set();
setB.add('111');
setB.add('222');
setB.add('aaa');
setB.add('ccc');

// 求两个集合的并集 union() 测试
console.log(setA.union(setB).values()); //--> ["111", "222", "333", "aaa", "ccc"]

// 求两个集合的交集 intersection() 测试
console.log(setA.intersection(setB).values()); //--> ["111", "222"]

// 求集合 A 和 集合 B，集合 A 的差集，difference() 测试
console.log(setA.difference(setB).values()); //--> ["333"]

// 求集合 A 是否为 集合 B 的 子集，subset() 测试
console.log(setA.subset(setB)); //--> false


console.log('// ----- 集合结构测试 END -----//');


