# 经典算法真题

## 数组扁平化

- 通过递归来实现，当元素为数组时递归调用，兼容性好。

  ```js
  function flattenArray(array) {
    // 检查传入的参数是否为数组
    if (!Array.isArray(array)) return
  
    // 定义结果数组，用于存储扁平化后的元素
    let result = []
  
    // 使用 reduce 方法遍历传入的数组
    result = array.reduce(function (pre, item) {
      // 判断当前元素是否为数组
      if (Array.isArray(item)) {
        // 如果是数组，则递归调用 flattenArray 函数，结果与前一个结果合并
        return pre.concat(flattenArray(item))
      }
      // 如果不是数组，则直接将元素添加到结果数组中
      return pre.concat(item)
    }, []) // 初始值为空数组
  
    // 返回扁平化后的结果数组
    return result
  }
  
  // 测试代码，输出扁平化后的数组
  console.log(flattenArray([1, 2, [3, 4, [5, 6]]])) // [1, 2, 3, 4, 5, 6]
  ```

- 利用 `toString()` 方法，缺点是改变了元素的类型，只适合于数组中元素都是整数的情况。

  ```js
  function flattenArray(array) {
    return array
            .toString()
            .split(',')
            .map(function (item) {
              return +item
            })
  }
  
  console.log(flattenArray([1, 2, [3, 4, [5, 6]]])) // [1, 2, 3, 4, 5, 6]
  ```

## 数组去重

```js
// ES5
function unique(array) {
  // 检查传入的参数是否为数组，或者数组长度是否小于等于 1，如果是则直接返回
  if (!Array.isArray(array) || array.length <= 1) return array

  // 定义结果数组，用于存储唯一的元素
  var result = []

  // 遍历传入的数组
  array.forEach(function (item) {
    // 检查结果数组中是否已经包含当前元素
    if (result.indexOf(item) === -1) {
      // 如果不包含，则将当前元素添加到结果数组中
      result.push(item)
    }
  })

  // 返回去重后的结果数组
  return result
}

// 测试，输出去重后的数组
console.log(unique([1, 2, 2, 3, 4, 4, 5])) // [1, 2, 3, 4, 5]



// ES6+
function unique(array) {
  // 检查传入的参数是否为数组，或者数组长度是否小于等于 1，如果是则直接返回原数组
  if (!Array.isArray(array) || array.length <= 1) return array

  // 使用 Set 数据结构去重，然后使用扩展运算符将 Set 转换回数组
  return [...new Set(array)]
}

// 测试，输出去重后的数组
console.log(unique([1, 1, 1, 2, 3, 3, 4, 5])) // [1, 2, 3, 4, 5]

```

## 求数组的最大值和最小值

```js
// 定义一个包含若干数字的数组
const array = [6, 4, 1, 8, 2, 11, 23]

// 使用 Math.max 方法找到数组中的最大值
// apply 方法将数组展开为 Math.max 方法的参数
console.log(Math.max.apply(null, array)) // 23

// 使用 Math.min 方法找到数组中的最小值
// apply 方法将数组展开为 Math.min 方法的参数
console.log(Math.min.apply(null, array)) // 1

```

## 求两个数的最大公约数

基本思想是采用**辗转相除**的方法，用大的数去除以小的那个数，然后再用小的数去除以的得到的余数，一直这样递归下去，直到余数为 0 时，最后的被除数就是两个数的最大公约数。

```js
// 定义一个函数来计算两个数的最大公约数（GCD）
function getMaxCommonDivisor(a, b) {
  // 使用递归方式实现欧几里得算法
  // 如果 b 为 0，则返回 a，此时 a 就是最大公约数
  if (b === 0) return a

  // 否则递归调用函数，将 b 和 a 对 b 取余后的结果作为新的参数
  return getMaxCommonDivisor(b, a % b)
}

// 测试代码，输出 12 和 8 的最大公约数
console.log(getMaxCommonDivisor(12, 8)) // 4

// 测试代码，输出 12 和 16 的最大公约数
console.log(getMaxCommonDivisor(12, 16)) // 4
```

## 求两个数的最小公倍数

在 JavaScript 中，可以通过分解质因数并计算两数的最大公约数（GCD）的方式来求两个数的最小公倍数（LCM）。最小公倍数可以通过以下公式计算：

```
LCM(a, b) = |a * b| / GCD(a, b)
```

其中 `|a * b|` 表示 `a` 和 `b` 的乘积的绝对值，`GCD(a, b)` 表示 `a` 和 `b` 的最大公约数。

以下是使用欧几里得算法计算最大公约数进而求最小公倍数的 JavaScript 实现：

```javascript
// 计算两个数的最大公约数（GCD）
function gcd(a, b) {
  // 使用递归方式实现欧几里得算法
  if (b === 0) {
    // 如果 b 为 0，则返回 a，此时 a 就是最大公约数
    return a
  }
  // 否则递归调用函数，将 b 和 a 对 b 取余后的结果作为新的参数
  return gcd(b, a % b)
}

// 计算两个数的最小公倍数（LCM）
function lcm(a, b) {
  // 最小公倍数公式：|a * b| / gcd(a, b)
  // 使用绝对值函数 Math.abs 确保结果为正数
  return Math.abs(a * b) / gcd(a, b)
}

// 测试代码，输出 4 和 6 的最小公倍数
console.log(lcm(4, 6)) // 12
```

## 实现 IndexOf 方法

详情查看 → [搜索算法](./search)

## 判断一个字符串是否为回文字符串

回文字符串是一个正读和反读都一样的字符串。

```js
function isPalindrome(str) {
  // 移除所有非字母和非数字字符，并将字符串转换为小写
  const cleanedStr = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase()

  // 获取清理后的字符串的反转版
  const reversedStr = cleanedStr.split('').reverse().join('')

  // 比较清理后的字符串和它的反转版
  return cleanedStr === reversedStr
}

// 示例用法
console.log(isPalindrome('A man, a plan, a canal: Panama')) // 输出 true
console.log(isPalindrome('race a car')) // 输出 false
```

## 累加函数

```js
function sum(...args) {
  // 初始化结果变量为 0
  let result = 0

  // 使用 reduce 函数将传入的初始参数数组求和，并赋值给 result
  result = args.reduce(function (pre, item) {
    return pre + item
  }, 0)

  // 定义一个内部函数 add，用于继续累加新的参数
  const add = function (...args) {
    // 将新的参数数组求和并加到当前 result 的值上
    result = args.reduce(function (pre, item) {
      return pre + item
    }, result)

    // 返回 add 函数自身，以便实现链式调用
    return add
  }

  // 重写 add 函数的 valueOf 方法，使其在被转换为原始值时返回 result 的值
  add.valueOf = function () {
    console.log(result)
  }

  // 返回 add 函数，以便外部可以继续累加
  return add
}

// 使用示例
sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).valueOf() // 55
sum(1, 2, 3)(2).valueOf() // 8
sum(1, 2, 3, 4, 5)(2, 3, 4).valueOf() // 24
```

## 查找一篇英文文章中出现频率最高的单词

```js
function findMostWord(text) {
  // 将文本转换为小写，以便忽略大小写差异
  text = text.toLowerCase()

  // 使用正则表达式去除文本中的标点符号，并按空格分割成单词数组
  const words = text.replace(/[.,!?;:()"]/g, '').split(/\s+/)

  // 创建一个对象来存储每个单词的出现频率
  const wordCount = {}

  // 遍历单词数组，统计每个单词的出现次数
  words.forEach((word) => {
    if (wordCount[word]) {
      wordCount[word]++
    } else {
      wordCount[word] = 1
    }
  })

  // 初始化两个变量，用于存储频率最高的单词及其出现次数
  let maxCount = 0
  let mostFrequentWord = ''

  // 遍历 wordCount 对象，找出出现次数最多的单词
  for (const word in wordCount) {
    if (wordCount[word] > maxCount) {
      maxCount = wordCount[word]
      mostFrequentWord = word
    }
  }

  // 返回频率最高的单词及其出现次数
  return { word: mostFrequentWord, count: maxCount }
}

// 示例使用
console.log(findMostWord('This is a test. This test is only a test.')) // { word: 'test', count: 3 }
```

## 斐波那契数列

大家都知道斐波那契数列，现在要求输入一个整数 n（n <= 39），请你输出斐波那契数列的第 n 项。

思路：

斐波那契数列的规律是，第一项为 0，第二项为 1，第三项以后的值都等于前面两项的和，因此可以通过循环的方式，不断通过叠加来实现第 n 项值的构建。

通过循环而不是递归的方式来实现，时间复杂度降为了 O(n)，空间复杂度为 O(1)。

代码实现：

```js
function fibonacci(n) {
  // 检查输入是否有效
  if (n <= 0) {
    return 'Invalid input. The number should be greater than 0.'
  }

  // 斐波那契数列的第一个数
  if (n === 1) {
    return 0
  }

  // 斐波那契数列的第二个数
  if (n === 2) {
    return 1
  }

  // 初始化前两个斐波那契数
  let prevPrev = 0
  let prev = 1

  // 通过迭代计算斐波那契数列的第 n 个数
  for (let i = 3; i <= n; i++) {
    const current = prevPrev + prev // 当前斐波那契数是前两个数之和
    prevPrev = prev // 更新前前一个数
    prev = current // 更新前一个数
  }

  // 返回第 n 个斐波那契数
  return prev
}

// 示例使用
console.log(fibonacci(1)) // 输出：0
console.log(fibonacci(2)) // 输出：1
console.log(fibonacci(3)) // 输出：1
console.log(fibonacci(10)) // 输出：34
console.log(fibonacci(20)) // 输出：4181
console.log(fibonacci(-5)) // 输出：'Invalid input. The number should be greater than 0.'
```

## 跳台阶

一只青蛙一次可以跳上 1 级台阶，也可以跳上 2 级。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。

思路：

跳台阶的问题是一个动态规划的问题，由于一次只能够跳 1 级或者 2 级，因此跳上 n 级台阶一共有两种方案，一种是从 n-1 跳上，一种是从 n-2 级跳上，因此 `f(n) = f(n-1) + f(n-2)`。

和斐波那契数列类似，不过初始两项的值变为了 1 和 2，后面每项的值等于前面两项的和。

代码实现：

```js
function jumpStairs(n) {
  if (n <= 0) {
    return 0 // 如果台阶数小于或等于 0，返回 0
  }
  if (n === 1) {
    return 1 // 只有一级台阶时，只有 1 种跳法
  }
  if (n === 2) {
    return 2 // 有两级台阶时，有 2 种跳法（一步一级或一步两级）
  }

  // 初始化前两项，dp 数组的大小需要是 n+1 以便存储所有结果
  const dp = [0, 1, 2]

  // 从第 3 级台阶开始计算，直到第 n 级台阶
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2] // 动态规划公式：f(n) = f(n-1) + f(n-2)
  }

  return dp[n] // 返回第 n 级台阶的跳法数
}

// 示例使用
console.log(jumpStairs(0)) // 输出：0
console.log(jumpStairs(1)) // 输出：1
console.log(jumpStairs(2)) // 输出：2
console.log(jumpStairs(3)) // 输出：3
console.log(jumpStairs(4)) // 输出：3
console.log(jumpStairs(10)) // 输出：89
```

## 最小的 K 个数

输入 n 个整数，找出其中最小的 K 个数。

例如：输入 `[4, 5, 1, 6, 2, 7, 3, 8]` 这 8 个数字，则最小的 4 个数字是 `[1, 2, 3, 4]`。

思路：

- 第一种思路是首先将数组排序，排序后再取最小的 k 个数。这一种方法的时间复杂度取决于我们选择的排序算法的时间复杂度，最好的情况下为 O(n log n)。

  ```js
  function findKSmallestNumbers(nums, k) {
    nums.sort((a, b) => a - b)
    return nums.slice(0, k)
  }
  
  const nums = [4, 5, 1, 6, 2, 7, 3, 8]
  const k = 4
  console.log(findKSmallestNumbers(nums, k)) // 输出：[1, 2, 3, 4]
  ```

- 第二种思路是由于我们只需要获得最小的 k 个数，这 k 个数不一定是按序排序的。因此我们可以使用快速排序中的 partition 函数来实现。每一次选择一个枢纽值，将数组分为比枢纽值大和比枢纽值小的两个部分，判断枢纽值的位置，如果该枢纽值的位置为 k-1 的话，那么枢纽值和它前面的所有数字就是最小的 k 个数。如果枢纽值的位置小于 k-1 的话，假设枢纽值的位置为 n-1，那么我们已经找到了前 n 小的数字了，我们就还需要到后半部分去寻找后半部分 k-n 小的值，进行划分。当该枢纽值的位置比 k-1 大时，说明最小的 k 个值还在左半部分，我们需要继续对左半部分进行划分。这一种方法的平均时间复杂度为 O(n)。

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

- 第三种方法是维护一个容量为 k 的最大堆。对数组进行遍历时，如果堆的容量还没有达到 k，则直接将元素加入到堆中，这就相当于我们假设前 k 个数就是最小的 k 个数。对 k 以后的元素遍历时，我们将该元素与堆的最大值进行比较，如果比最大值小，那么我们则将最大值与其交换，然后调整堆。如果大于等于堆的最大值，则继续向后遍历，直到数组遍历完成。这一种方法的平均时间复杂度为 O(nlogk)。
  
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

