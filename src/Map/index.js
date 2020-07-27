import Map from './map';

// ---------------- 封装的字典结构测试 ---------------- //
console.log('// ----- 字典结构测试 START -----//');
const map = new Map();

// set() 测试
map.set('name', 'XPoet');
map.set('age', 18);
map.set('email', 'i@xpoet.cn');
console.log(map); // {items: {name: "XPoet", age: 18, email: "i@xpoet.cn"}}

// has() 测试
console.log(map.has('name')); //--> true
console.log(map.has('address')); //--> false

// remove() 测试
map.remove('name');
console.log(map); // {age: 18, email: "i@xpoet.cn"}

// get() 测试
console.log(map.get('age')); //--> 18

// keys() 测试
console.log(map.keys()); //--> ["age", "email"]

// values() 测试
console.log(map.values()); //--> [18, "i@xpoet.cn"]

// size() 测试
console.log(map.size()); //--> 2

console.log('// ----- 字典结构测试 END -----//');


