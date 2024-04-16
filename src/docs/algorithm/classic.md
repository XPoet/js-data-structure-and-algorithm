# 经典算法题

## 数组扁平化

- 通过递归来实现，当元素为数组时递归调用，兼容性好。

  ```js
  function flattenArray(array) {
    if (!Array.isArray(array)) return

    let result = []

    result = array.reduce(function (pre, item) {
      // 判断元素是否为数组，如果为数组则递归调用，如果不是则加入结果数组中
      return pre.concat(Array.isArray(item) ? flattenArray(item) : item)
    }, [])

    return result
  }

  console.log(flattenArray([1, 2, [3, 4, [5, 6]]])); // => [1, 2, 3, 4, 5, 6]
  ```

- 利用 `toString()` 方法，缺点是改变了元素的类型，只适合于数组中元素都是整数的情况。

  ```js
  function flattenArray(array) {
    return array
      .toString()
      .split(',')
      .map(function (item) {
        return +item;
      });
  }

  console.log(flattenArray([1, 2, [3, 4, [5, 6]]])); // => [1, 2, 3, 4, 5, 6]
  ```

## 数组去重

```js
function unique(array) {
  if (!Array.isArray(array) || array.length <= 1) return;

  var result = [];

  array.forEach(function (item) {
    if (result.indexOf(item) === -1) {
      result.push(item);
    }
  });

  return result;
}


// ES6
function unique(array) {
  if (!Array.isArray(array) || array.length <= 1) return;

  return [...new Set(array)];
}

console.log(unique([1, 1, 1, 2, 3, 3, 4, 5])) // => [1, 2, 3, 4, 5]
```

## 求数组的最大值和最小值

```js
const arr = [6, 4, 1, 8, 2, 11, 23];
console.log(Math.max.apply(null, arr));
console.log(Math.min.apply(null, arr));
```

## 求两个数的最大公约数
- 基本思想是采用辗转相除的方法，用大的数去除以小的那个数，
- 然后再用小的数去除以的得到的余数，一直这样递归下去，直到余数为 0 时，
- 最后的被除数就是两个数的最大公约数。

```js
function getMaxCommonDivisor(a, b) {
  if (b === 0) return a;

  return getMaxCommonDivisor(b, a % b);
}

console.log(getMaxCommonDivisor(12, 8)); // 4
console.log(getMaxCommonDivisor(12, 16)); // 4
```

## 求两个数的最小公倍数

在 JavaScript 中，可以通过分解质因数并计算两数的最大公约数（GCD）的方式来求两个数的最小公倍数（LCM）。最小公倍数可以通过以下公式计算：

```math
LCM(a, b) = |a * b| / GCD(a, b)
```

其中 `|a * b|` 表示 `a` 和 `b` 的乘积的绝对值，`GCD(a, b)` 表示 `a` 和 `b` 的最大公约数。

以下是使用欧几里得算法计算最大公约数进而求最小公倍数的 JavaScript 实现：

```javascript
// 计算最大公约数（gcd）
function gcd(a, b) {
    if (b === 0) {
        return a;
    } else {
        return gcd(b, a % b);
    }
}

// 计算最小公倍数（lcm）
function lcm(a, b) {
    return Math.abs(a * b) / gcd(a, b);
}

// 测试
console.log(lcm(4, 6)); // 输出：12
```

## 实现 IndexOf 方法

```js
function IndexOf(array, val) {
  if (!Array.isArray(array)) return;

  let length = array.length;

  for (let i = 0; i < length; i++) {
    if (array[i] === val) {
      return i;
    }
  }

  return -1;
}

console.log(IndexOf([1, 2, 3, 4, 5], 3)); // 2
```

## 判断一个字符串是否为回文字符串

“回文字符串”是一个正读和反读都一样的字符串。

```js
function isPalindrome(str) {
  let reg = /[\W_]/g, // 匹配所有非单词的字符以及下划线
    newStr = str.replace(reg, '').toLowerCase(), // 替换为空字符并将大写字母转换为小写
    reverseStr = newStr.split('').reverse().join(''); // 将字符串反转

  return reverseStr === newStr;
}
```

## 实现一个累加函数的功能

例如：`sum(1,2,3)(2).valueOf()`

```js
function sum(...args) {
  let result = 0;

  result = args.reduce(function (pre, item) {
    return pre + item;
  }, 0);

  let add = function (...args) {
    result = args.reduce(function (pre, item) {
      return pre + item;
    }, result);

    return add;
  };

  add.valueOf = function () {
    console.log(result);
  };

  return add;
}
```

## 如何查找一篇英文文章中出现频率最高的单词

```js
function findMostWord(article) {
  // 合法性判断
  if (!article) return;

  // 参数处理
  article = article.trim().toLowerCase();

  let wordList = article.match(/[a-z]+/g),
    visited = [],
    maxNum = 0,
    maxWord = '';

  article = ' ' + wordList.join('  ') + ' ';

  // 遍历判断单词出现次数
  wordList.forEach(function (item) {
    if (visited.indexOf(item) < 0) {
      let word = new RegExp(' ' + item + ' ', 'g'),
        num = article.match(word).length;

      if (num > maxNum) {
        maxNum = num;
        maxWord = item;
      }
    }
  });

  return maxWord + '  ' + maxNum;
}
```

## 二维数组中的查找

在一个二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

思路：
1. 第一种方式是使用两层循环依次遍历，判断是否含有该整数。这一种方式最坏情况下的时间复杂度为 O(n^2)。
2. 第二种方式是利用递增序列的特点，我们可以从二维数组的右上角开始遍历。如果当前数值比所求的数要小，则将位置向下移动，再进行判断。如果当前数值比所求的数要大，则将位置向左移动，再进行判断。这一种方式最坏情况下的时间复杂度为 O(n)。

代码实现：

```js
// 基于第二种方式，从右上角开始遍历二维数组，并根据比较结果动态调整行或列的位置，直到找到目标值或者遍历完数组。
function searchInSortedMatrix(matrix, target) {
    if (!matrix.length || !matrix[0].length) {
        return false;
    }

    let row = 0;
    let col = matrix[0].length - 1;

    while (row < matrix.length && col >= 0) {
        const current = matrix[row][col];

        if (current === target) {
            return true;
        } else if (current > target) {
            // 如果当前数值比目标值大，说明目标值可能在当前列的上一行
            col--;
        } else {
            // 如果当前数值比目标值小，说明目标值可能在当前行的下一行
            row++;
        }
    }

    return false;
}

// 示例
const matrix = [
  [1, 3, 5, 7],
  [10, 11, 16, 20],
  [23, 30, 34, 50]
];

console.log(searchInSortedMatrix(matrix, 3));  // 输出：true
console.log(searchInSortedMatrix(matrix, 13)); // 输出：false
```

## 斐波那契数列

大家都知道斐波那契数列，现在要求输入一个整数 n（n <= 39），请你输出斐波那契数列的第 n 项。

思路：

斐波那契数列的规律是，第一项为 0，第二项为 1，第三项以后的值都等于前面两项的和，因此我们可以通过循环的方式，不断通过叠加来实现第 n 项值的构建。

通过循环而不是递归的方式来实现，时间复杂度降为了 O(n)，空间复杂度为 O(1)。

代码实现：

```js
function fibonacci(n) {
    if (n <= 0) {
        return "Invalid input. The number should be greater than 0.";
    } else if (n === 1) {
        return 0;
    } else if (n === 2) {
        return 1;
    } else {
        let prevPrev = 0;
        let prev = 1;
        for (let i = 3; i <= n; i++) {
            let current = prevPrev + prev;
            prevPrev = prev;
            prev = current;
        }
        return prev;
    }
}

// 示例
console.log(fibonacci(1));   // 输出：0
console.log(fibonacci(2));   // 输出：1
console.log(fibonacci(10));  // 输出：55
console.log(fibonacci(39));  // 输出：63245986
```

## 跳台阶

一只青蛙一次可以跳上 1 级台阶，也可以跳上 2 级。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。

思路：

跳台阶的问题是一个动态规划的问题，由于一次只能够跳 1 级或者 2 级，因此跳上 n 级台阶一共有两种方案，一种是从 n-1 跳上，一种是从 n-2 级跳上，因此 f(n) = f(n-1) + f(n-2)。

和斐波那契数列类似，不过初始两项的值变为了 1 和 2，后面每项的值等于前面两项的和。

代码实现：

```js
function jumpStairs(n) {
    if (n <= 0) {
        return 0;
    } else if (n === 1) {
        return 1; // 只有一级台阶时，只有 1 种跳法
    } else if (n === 2) {
        return 2; // 有两级台阶时，有 2 种跳法（一步一级或一步两级）
    } else {
        let dp = [1, 2]; // 初始化前两项
        for (let i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2]; // 动态规划公式：f(n) = f(n-1) + f(n-2)
        }
        return dp[n];
    }
}

console.log(jumpStairs(4)); // 输出：4
console.log(jumpStairs(5)); // 输出：7
console.log(jumpStairs(6)); // 输出：13
```

## 动态规划

爬楼梯问题：有一座高度是 10 级台阶的楼梯，从下往上走，每跨一步只能向上 1 级或者 2 级台阶。要求用程序来求出一共有多少种走法？

### 递归方法分析

由分析可知，假设我们只差最后一步就能走上第 10 级阶梯，这个时候一共有两种情况，因为每一步只允许走 1 级或 2 级阶梯，因此分别为从 8 级阶梯和从 9 九级阶梯走上去的情况。因此从 0 到 10 级阶梯的走法数量就等于从 0 到 9 级阶梯的走法数量加上从 0 到 8 级阶梯的走法数量。依次类推，我们可以得到一个递归关系，递归结束的标志为从 0 到 1 级阶梯的走法数量和从 0 到 2 级阶梯的走法数量。

代码实现：

```js
function getClimbingWays(n) {
  if (n < 1) {
    return 0;
  }

  if (n === 1) {
    return 1;
  }

  if (n === 2) {
    return 2;
  }

  return getClimbingWays(n - 1) + getClimbingWays(n - 2);
}
```

使用这种方法时整个的递归过程是一个二叉树的结构，因此该方法的时间复杂度可以近似的看为 O(2^n)，空间复杂度为递归的深度 O(logn)。

### 备忘录方法

分析递归的方法我们可以发现，其实有很多的计算过程其实是重复的，因此我们可以使用一个数组，将已经计算出的值给保存下来，每次计算时，先判断计算结果是否已经存在，如果已经存在就直接使用。

代码实现：

```js
let map = new Map();

function getClimbingWays(n) {
  if (n < 1) {
    return 0;
  }

  if (n === 1) {
    return 1;
  }

  if (n === 2) {
    return 2;
  }

  if (map.has(n)) {
    return map.get(n);
  } else {
    let value = getClimbingWays(n - 1) + getClimbingWays(n - 2);
    map.set(n, value);
    return value;
  }
}

getClimbingWays(10) // => 89
```

通过这种方式，我们将算法的时间复杂度降低为 O(n)，但是增加空间复杂度为 O(n)。

### 迭代法

通过观察，我们可以发现每一个值其实都等于它的前面两个值的和，因此我们可以使用自底向上的方式来实现。

代码实现：

```js
function getClimbingWays(n) {
  if (n < 1) {
    return 0;
  }

  if (n === 1) {
    return 1;
  }

  if (n === 2) {
    return 2;
  }

  let a = 1,
    b = 2,
    temp = 0;

  for (let i = 3; i <= n; i++) {
    temp = a + b;
    a = b;
    b = temp;
  }

  return temp;
}

getClimbingWays(10) // => 89
```

通过这种方式我们可以将算法的时间复杂度降低为 O(n)，并且将算法的空间复杂度降低为 O(1)。


## 最小的 K 个数

输入 n 个整数，找出其中最小的 K 个数。例如输入 4,5,1,6,2,7,3,8 这 8 个数字，则最小的 4 个数字是 1,2,3,4。

思路：

1. 第一种思路是首先将数组排序，排序后再取最小的 k 个数。这一种方法的时间复杂度取决于我们选择的排序算法的时间复杂度，最好的情况下为 O(nlogn)。

```js
function findKSmallestNumbers(nums, k) {
  nums.sort((a, b) => a - b)
  return nums.slice(0, k)
}

const nums = [4, 5, 1, 6, 2, 7, 3, 8]
const k = 4
console.log(findKSmallestNumbers(nums, k)) // 输出：[1, 2, 3, 4]
```

2. 第二种思路是由于我们只需要获得最小的 k 个数，这 k 个数不一定是按序排序的。因此我们可以使用快速排序中的 partition 函数来实现。每一次选择一个枢纽值，将数组分为比枢纽值大和比枢纽值小的两个部分，判断枢纽值的位置，如果该枢纽值的位置为 k-1 的话，那么枢纽值和它前面的所有数字就是最小的 k 个数。如果枢纽值的位置小于 k-1 的话，假设枢纽值的位置为 n-1，那么我们已经找到了前 n 小的数字了，我们就还需要到后半部分去寻找后半部分 k-n 小的值，进行划分。当该枢纽值的位置比 k-1 大时，说明最小的 k 个值还在左半部分，我们需要继续对左半部分进行划分。这一种方法的平均时间复杂度为 O(n)。

```js
function quickSelect(nums, k) {
  function partition(nums, left, right, pivotIndex) {
    const pivotValue = nums[pivotIndex]
    ;[nums[pivotIndex], nums[right]] = [nums[right], nums[pivotIndex]]
    let storeIndex = left
    for (let i = left; i < right; i++) {
      if (nums[i] < pivotValue) {
        ;[nums[storeIndex], nums[i]] = [nums[i], nums[storeIndex]]
        storeIndex++
      }
    }
    ;[nums[right], nums[storeIndex]] = [nums[storeIndex], nums[right]]
    return storeIndex
  }

  function select(nums, left, right, k) {
    if (left === right) return nums[left]
    const pivotIndex = Math.floor(Math.random() * (right - left + 1)) + left
    const newPivotIndex = partition(nums, left, right, pivotIndex)
    if (newPivotIndex === k - 1) {
      return nums[newPivotIndex]
    }
    if (newPivotIndex < k - 1) {
      return select(nums, newPivotIndex + 1, right, k)
    }
    return select(nums, left, newPivotIndex - 1, k)
  }

  const sortedNums = [...nums]
  const kthSmallest = select(sortedNums, 0, nums.length - 1, k - 1)

  // 获取 k 个最小数
  const kSmallestNums = []
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] <= kthSmallest) {
      kSmallestNums.push(nums[i])
      if (kSmallestNums.length === k) break
    }
  }
  return kSmallestNums
}

const nums = [4, 5, 1, 6, 2, 7, 3, 8]
const k = 4
console.log(quickSelect(nums, k)) // 输出：[1, 2, 3, 4]
```

3. 第三种方法是维护一个容量为 k 的最大堆。对数组进行遍历时，如果堆的容量还没有达到 k，则直接将元素加入到堆中，这就相当于我们假设前 k 个数就是最小的 k 个数。对 k 以后的元素遍历时，我们将该元素与堆的最大值进行比较，如果比最大值小，那么我们则将最大值与其交换，然后调整堆。如果大于等于堆的最大值，则继续向后遍历，直到数组遍历完成。这一种方法的平均时间复杂度为 O(nlogk)。

```js
function findKSmallestNumbersWithMaxHeap(nums, k) {
  nums.sort((a, b) => b - a) // 先将数组逆序，方便模拟最大堆
  const result = []
  for (let i = 0; i < nums.length && result.length < k; i++) {
    if (result.length === 0 || nums[i] <= result[0]) {
      result.unshift(nums[i]) // 添加到堆顶
      result.sort((a, b) => b - a) // 重新调整堆顶元素为最大值
    }
  }
  return result
}

const nums = [4, 5, 1, 6, 2, 7, 3, 8]
const k = 4
console.log(findKSmallestNumbersWithMaxHeap(nums, k)) // 输出：[1, 2, 3, 4]
```

