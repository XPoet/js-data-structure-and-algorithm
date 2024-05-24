# 搜索算法

搜索算法简单来说就是用于找出数组中某个元素的下标。

JavaScript 语言中的自带的搜索：数组的 `indexOf` 方法。

## 顺序搜索

顺序搜索（Sequential Search）算法是一种简单的搜索算法，它按顺序检查列表中的每个元素，直到找到目标元素或遍历完整个列表。

代码实现：

```js
function sequentialSearch(array, target) {
    // 遍历数组中的每个元素
    for (let i = 0; i < array.length; i++) {
        // 如果当前元素等于目标元素，则返回当前元素的索引
        if (array[i] === target) {
            return i
        }
    }
    // 如果未找到目标元素，则返回 -1
    return -1
}

// 测试
console.log(sequentialSearch([1, 2, 3, 4, 5], 0)) // -1
console.log(sequentialSearch([1, 2, 3, 4, 5], 3)) // 2
```

顺序搜索的时间复杂度为 O(n)，其中 n 是列表的长度。

## 二分搜索

二分搜索（Binary Search）是一种高效的搜索算法，适用于有序数组。该算法通过重复将搜索范围缩小为一半来找到目标值。

```js
function binarySearch(arr, target) {
  let low = 0 // 搜索范围的最低索引
  let high = arr.length - 1 // 搜索范围的最高索引

  while (low <= high) {
    const mid = Math.floor((low + high) / 2) // 中间索引

    if (arr[mid] === target) {
      return mid // 找到目标元素，返回索引
    }
    if (arr[mid] < target) {
      low = mid + 1 // 目标元素在右半部分，调整搜索范围的最低索引
    } else {
      high = mid - 1 // 目标元素在左半部分，调整搜索范围的最高索引
    }
  }

  return -1 // 目标元素未找到
}

// 测试
console.log(binarySearch([1, 2, 3, 4, 5], 0)) // -1
console.log(binarySearch([1, 2, 3, 4, 5], 3)) // 2
```

二分搜索的时间复杂度为 O(log n)，其中 n 是数组的长度。
