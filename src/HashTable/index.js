import { hashFn, HashTable, isPrime } from './hashTable';
// ---------------- 封装的哈希表结构测试 ---------------- //
console.log('// ----- 哈希表结构测试 START -----//');

console.log('=== START 哈希函数测试 START === ');
console.log(hashFn('123')); //--> 5
console.log(hashFn('abc')); //--> 6
console.log('=== END 哈希函数测试 END === ');

const hashTable = new HashTable();

// put() 测试
hashTable.put('name', 'XPoet');
hashTable.put('age', 18);
hashTable.put('height', 178);
hashTable.put('email', 'i@xpoet.cn');
hashTable.put('address', 'china');
console.log(hashTable);
//--> {storage: Array(6), count: 5, limit: 7, loadFactor: 0.75, minLoadFactor: 0.25}

hashTable.put('address2', 'china2');
console.log(hashTable);
//--> {storage: Array(16), count: 6, limit: 17, loadFactor: 0.75, minLoadFactor: 0.25}

// get() 测试
console.log(hashTable.get('name')); //--> XPoet

// remove() 测试
hashTable.remove('address');
console.log(hashTable);
//--> {storage: Array(16), count: 5, limit: 17, loadFactor: 0.75, minLoadFactor: 0.25}


console.log('// ----- 哈希表结构测试 END -----//');


