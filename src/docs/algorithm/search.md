# 搜索

找出数组中某个元素的下标。

JavaScript 中的搜索：数组的 `indexOf` 方法。

## 顺序搜索

遍历数组，找到目标的元素，就返回它的下标，没有找到返回 -1。

代码实现：

```js
Array.prototype.sequentialSearch = function (item) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] === item) {
            return i;
        }
    }
    return -1
}
```

顺序搜索的时间复杂度为 O(n)。

## 二分搜索

从数组的中间元素开始，如果中间元素正好是目标值，则搜索结束。如果目标值大于或者小于中间元素，则在大于或小于中间元素的那一半数组中搜索。

代码实现：

```js
Array.prototype.binarySearch = function (item) {
    let low = 0;
    let high = this.length - 1;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const element = this[mid];
        if (element < item) {
            low = mid + 1;
        } else if (element > item) {
            high = mid - 1;
        } else {
            return mid;
        }
    }
    return -1;
}

[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].binarySearch(2) // 1
```

二分搜索的时间的复杂度为 O(logN)。


