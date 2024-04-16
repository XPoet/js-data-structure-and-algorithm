# 排序

把某个乱序的数组变成升序或者降序的数组。

JavaScript 中的排序：数组的 `sort` 方法。

## 冒泡排序

基本思想：对相邻的元素进行两两比较，顺序相反则进行交换，这样，每一趟会将最小或最大的元素“浮”到顶端，最终达到完全有序。

代码实现：

```js
function bubbleSort(arr) {
  if (!Array.isArray(arr) || arr.length <= 1) return arr;
  let lastIndex = arr.length - 1;
  while (lastIndex > 0) {
    // 当最后一个交换的元素为第一个时，说明后面全部排序完毕
    let flag = true, k = lastIndex;
    for (let j = 0; j < k; j++) {
      if (arr[j] > arr[j + 1]) {
        flag = false;
        lastIndex = j; // 设置最后一次交换元素的位置
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
    if (flag) break;
  }
  return arr
}

bubbleSort([6,1,5,4,2,3]) // [1, 2, 3, 4, 5, 6]
```

冒泡排序有两种优化方式：

- 外层循环的优化：我们可以记录当前循环中是否发生了交换，如果没有发生交换，则说明该序列已经为有序序列了。因此我们不需要再执行之后的外层循环，此时可以直接结束。

- 内层循环的优化：我们可以记录当前循环中最后一次元素交换的位置，该位置以后的序列都是已排好的序列，因此下一轮循环中无需再去比较。

优化后的冒泡排序，当排序序列为已排序序列时，为最好的时间复杂度为 O(n)。

冒泡排序的平均时间复杂度为 O(n²) ，最坏时间复杂度为 O(n²) ，空间复杂度为 O(1) ，是稳定排序。

## 选择排序

基本思想：为每一趟从待排序的数据元素中选择最小（或最大）的一个元素作为首元素，直到所有元素排完为止。

在算法实现时，每一趟确定最小元素的时候会通过不断地比较交换来使得首位置为当前最小，交换是个比较耗时的操作。其实我们很容易发现，在还未完全确定当前最小元素之前，这些交换都是无意义的。我们可以通过设置一个变量 min，每一次比较仅存储较小元素的数组下标，当轮循环结束之后，那这个变量存储的就是当前最小元素的下标，此时再执行交换操作即可。

代码实现：

```js
function selectSort(array) {
  let length = array.length;

  // 如果不是数组或者数组长度小于等于 1，直接返回，不需要排序
  if (!Array.isArray(array) || length <= 1) return array;

  for (let i = 0; i < length - 1; i++) {
    let minIndex = i; // 设置当前循环最小元素索引

    for (let j = i + 1; j < length; j++) {
      // 如果当前元素比最小元素索引小，则更新最小元素索引
      if (array[minIndex] > array[j]) {
        minIndex = j;
      }
    }

    // 交换最小元素到当前位置
    swap(array, i, minIndex);
  }

  return array;
}

// 交换数组中两个元素的位置
function swap(array, left, right) {
  const temp = array[left];
  array[left] = array[right];
  array[right] = temp;
}

selectSort([6,1,5,4,2,3]) // [1, 2, 3, 4, 5, 6]
```

选择排序不管初始序列是否有序，时间复杂度都为 O(n²)。

选择排序的平均时间复杂度为 O(n²) ，最坏时间复杂度为 O(n²) ，空间复杂度为 O(1) ，不是稳定排序。

## 插入排序

基本思想：每一步将一个待排序的记录，插入到前面已经排好序的有序序列中去，直到插完所有元素为止。

插入排序核心是扑克牌思想，就想着自己在打扑克牌，接起来一张，放哪里无所谓，再接起来一张，比第一张小，放左边，继续接，可能是中间数，就插在中间....依次。

代码实现：

```js
function insertSort(array) {
  let length = array.length;

  // 如果不是数组或者数组长度小于等于 1，直接返回，不需要排序
  if (!Array.isArray(array) || length <= 1) return array;

  // 循环从 1 开始，0 位置为默认的已排序的序列
  for (let i = 1; i < length; i++) {
    let temp = array[i]; // 保存当前需要排序的元素
    let j = i;

    // 在当前已排序序列中比较，如果比需要排序的元素大，就依次往后移动位置
    while (j - 1 >= 0 && array[j - 1] > temp) {
      array[j] = array[j - 1];
      j--;
    }

    // 将找到的位置插入元素
    array[j] = temp;
  }

  return array;
}
insertSort([6,1,5,4,2,3]) // [1, 2, 3, 4, 5, 6]
```

当排序序列为已排序序列时，为最好的时间复杂度 O(n)。

插入排序的平均时间复杂度为 O(n²) ，最坏时间复杂度为 O(n²) ，空间复杂度为 O(1) ，是稳定排序。

## 希尔排序

基本思想：把数组按下标的一定增量分组，对每组使用直接插入排序算法排序；随着增量逐渐减少，每组包含的元素越来越多，当增量减至 1 时，整个数组恰被分成一组，算法便终止。

代码实现：

```js
function hillSort(array) {
  let length = array.length;

  // 如果不是数组或者数组长度小于等于 1，直接返回，不需要排序
  if (!Array.isArray(array) || length <= 1) return array;

  // 第一层确定增量的大小，每次增量的大小减半
  for (let gap = parseInt(length >> 1); gap >= 1; gap = parseInt(gap >> 1)) {
    // 对每个分组使用插入排序，相当于将插入排序的 1 换成了 n
    for (let i = gap; i < length; i++) {
      let temp = array[i];
      let j = i;

      while (j - gap >= 0 && array[j - gap] > temp) {
        array[j] = array[j - gap];
        j -= gap;
      }
      array[j] = temp;
    }
  }

  return array;
}
hillSort([6,1,5,4,2,3]) // [1, 2, 3, 4, 5, 6]
```

希尔排序是利用了插入排序对于已排序序列排序效果最好的特点，在一开始序列为无序序列时，将序列分为多个小的分组进行
基数排序，由于排序基数小，每次基数排序的效果较好，然后在逐步增大增量，将分组的大小增大，由于每一次都是基于上一
次排序后的结果，所以每一次都可以看做是一个基本排序的序列，所以能够最大化插入排序的优点。

简单来说就是，由于开始时每组只有很少整数，所以排序很快。之后每组含有的整数越来越多，但是由于这些数也越来越有序，
所以排序速度也很快。

希尔排序的时间复杂度根据选择的增量序列不同而不同，但总的来说时间复杂度是小于 O(n^2) 的。

插入排序是一个稳定排序，但是在希尔排序中，由于相同的元素可能在不同的分组中，所以可能会造成相同元素位置的变化，
所以希尔排序是一个不稳定的排序。

希尔排序的平均时间复杂度为 O(nlogn) ，最坏时间复杂度为 O(n^s) ，空间复杂度为 O(1) ，不是稳定排序。

## 归并排序

归并排序是利用归并的思想实现的排序方法，该算法采用经典的分治策略。递归的将数组两两分开直到只包含一个元素，然后将数组排序合并，最终合并为排序好的数组。

代码实现：

```js
function mergeSort(array) {
  let length = array.length;

  // 如果不是数组或者数组长度小于等于 0，直接返回，不需要排序
  if (!Array.isArray(array) || length <= 1) return array;

  let mid = parseInt(length >> 1), // 找到中间索引值
    left = array.slice(0, mid), // 截取左半部分
    right = array.slice(mid, length); // 截取右半部分

  return merge(mergeSort(left), mergeSort(right)); // 递归分解后，进行排序合并
}

function merge(leftArray, rightArray) {
  let result = [],
    leftLength = leftArray.length,
    rightLength = rightArray.length,
    il = 0,
    ir = 0;

  // 左右两个数组的元素依次比较，将较小的元素加入结果数组中，直到其中一个数组的元素全部加入完则停止
  while (il < leftLength && ir < rightLength) {
    if (leftArray[il] < rightArray[ir]) {
      result.push(leftArray[il++]);
    } else {
      result.push(rightArray[ir++]);
    }
  }

  // 如果是左边数组还有剩余，则把剩余的元素全部加入到结果数组中。
  while (il < leftLength) {
    result.push(leftArray[il++]);
  }

  // 如果是右边数组还有剩余，则把剩余的元素全部加入到结果数组中。
  while (ir < rightLength) {
    result.push(rightArray[ir++]);
  }

  return result;
}

mergeSort([6,1,5,4,2,3]) // [1, 2, 3, 4, 5, 6]
```

归并排序将整个排序序列看成一个二叉树进行分解，首先将树分解到每一个子节点，树的每一层都是一个归并排序的过程，每
一层归并的时间复杂度为 O(n)，因为整个树的高度为 lgn，所以归并排序的时间复杂度不管在什么情况下都为 O(nlogn)。

归并排序的空间复杂度取决于递归的深度和用于归并时的临时数组，所以递归的深度为 logn，临时数组的大小为 n，所以归
并排序的空间复杂度为 O(n)。

归并排序的平均时间复杂度为 O(nlogn) ，最坏时间复杂度为 O(nlogn) ，空间复杂度为 O(n) ，是稳定排序。

## 快速排序

基本思想：通过一趟排序将要排序的数据分割成独立的两部分，其中一部分的所有数据都比另外一部分的所有数据都要小，然后再按此方法对这两部分数据分别进行快速排序，整个排序过程可以递归进行，以此达到整个数据变成有序序列。

代码实现：

```js
function quickSort(array, start, end) {
  let length = array.length;

  // 如果不是数组或者数组长度小于等于 1，直接返回，不需要排序
  if (!Array.isArray(array) || length <= 1 || start >= end) return array;

  let index = partition(array, start, end); // 将数组划分为两部分，并返回右部分的第一个元素的索引值

  quickSort(array, start, index - 1); // 递归排序左半部分
  quickSort(array, index + 1, end); // 递归排序右半部分
}

function partition(array, start, end) {
  let pivot = array[start]; // 取第一个值为枢纽值，获取枢纽值的大小

  // 当 start 等于 end 指针时结束循环
  while (start < end) {
    // 当 end 指针指向的值大等于枢纽值时，end 指针向前移动
    while (array[end] >= pivot && start < end) {
      end--;
    }

    // 将比枢纽值小的值交换到 start 位置
    array[start] = array[end];

    // 移动 start 值，当 start 指针指向的值小于枢纽值时，start 指针向后移动
    while (array[start] < pivot && start < end) {
      start++;
    }

    // 将比枢纽值大的值交换到 end 位置，进入下一次循环
    array[end] = array[start];
  }

  // 将枢纽值交换到中间点
  array[start] = pivot;

  // 返回中间索引值
  return start;
}

quickSort([6,1,5,4,2,3], 1, 2) // [1, 2, 3, 4, 5, 6]
```

这一种方法是填空法，首先将第一个位置的数作为枢纽值，然后 end 指针向前移动，当遇到比枢纽值小的值或者 end 值
等于 start 值的时候停止，然后将这个值填入 start 的位置，然后 start 指针向后移动，当遇到比枢纽值大的值或者
start 值等于 end 值的时候停止，然后将这个值填入 end 的位置。反复循环这个过程，直到 start 的值等于 end 的
值为止。将一开始保留的枢纽值填入这个位置，此时枢纽值左边的值都比枢纽值小，枢纽值右边的值都比枢纽值大。然后在递
归左右两边的的序列。

当每次换分的结果为含 ⌊n/2⌋ 和 ⌈n/2⌉−1 个元素时，最好情况发生，此时递归的次数为 logn，然后每次划分的时间复杂
度为 O(n)，所以最优的时间复杂度为 O(nlogn)。一般来说只要每次换分都是常比例的划分，时间复杂度都为 O(nlogn)。

当每次换分的结果为 n-1 和 0 个元素时，最坏情况发生。划分操作的时间复杂度为 O(n)，递归的次数为 n-1，所以最坏
的时间复杂度为 O(n²)。所以当排序序列有序的时候，快速排序有可能被转换为冒泡排序。

快速排序的空间复杂度取决于递归的深度，所以最好的时候为 O(logn)，最坏的时候为 O(n)。

快速排序的平均时间复杂度为 O(nlogn) ，最坏时间复杂度为 O(n²) ，空间复杂度为 O(logn) ，不是稳定排序。

快速排序相对于其他排序算法的优势在于在相同数据量的情况下，它的运算效率最高，并且它额外所需空间最小。

## 堆排序

基本思想：将待排序序列构造成一个大顶堆，此时，整个序列的最大值就是堆顶的根节点。将其与末尾元素进行交换，此时末尾就为最大值。然后将剩余 n-1 个元素重新构造成一个堆，这样会得到 n 个元素的次小值。如此反复执行，便能得到一个有序序列了。

```js
function heapSort(array) {
  let length = array.length;

  // 如果不是数组或者数组长度小于等于 1，直接返回，不需要排序
  if (!Array.isArray(array) || length <= 1) return array;

  buildMaxHeap(array); // 将传入的数组建立为大顶堆

  // 每次循环，将最大的元素与末尾元素交换，然后剩下的元素重新构建为大顶堆
  for (let i = length - 1; i > 0; i--) {
    swap(array, 0, i);
    adjustMaxHeap(array, 0, i); // 将剩下的元素重新构建为大顶堆
  }

  return array;
}

function adjustMaxHeap(array, index, heapSize) {
  let iMax, iLeft, iRight;

  while (true) {
    iMax = index; // 保存最大值的索引
    iLeft = 2 * index + 1; // 获取左子元素的索引
    iRight = 2 * index + 2; // 获取右子元素的索引

    // 如果左子元素存在，且左子元素大于最大值，则更新最大值索引
    if (iLeft < heapSize && array[iMax] < array[iLeft]) {
      iMax = iLeft;
    }

    // 如果右子元素存在，且右子元素大于最大值，则更新最大值索引
    if (iRight < heapSize && array[iMax] < array[iRight]) {
      iMax = iRight;
    }

    // 如果最大元素被更新了，则交换位置，使父节点大于它的子节点，同时将索引值跟新为被替换的值，继续检查它的子树
    if (iMax !== index) {
      swap(array, index, iMax);
      index = iMax;
    } else {
      // 如果未被更新，说明该子树满足大顶堆的要求，退出循环
      break;
    }
  }
}

// 构建大顶堆
function buildMaxHeap(array) {
  let length = array.length,
    iParent = parseInt(length >> 1) - 1; // 获取最后一个非叶子点的元素

  for (let i = iParent; i >= 0; i--) {
    adjustMaxHeap(array, i, length); // 循环调整每一个子树，使其满足大顶堆的要求
  }
}

// 交换数组中两个元素的位置
function swap(array, i, j) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

heapSort([6,1,5,4,2,3]) // [1, 2, 3, 4, 5, 6]
```

建立堆的时间复杂度为 O(n)，排序循环的次数为 n-1，每次调整堆的时间复杂度为 O(logn)，因此堆排序的时间复杂度在不管什么情况下都是 O(nlogn)。

堆排序的平均时间复杂度为 O(nlogn) ，最坏时间复杂度为 O(nlogn) ，空间复杂度为 O(1) ，不是稳定排序。

## 基数排序

基数排序是一种非比较型整数排序算法，其原理是将整数按位数切割成不同的数字，然后按每个位数分别比较。

排序过程：将所有待比较数值（正整数）统一为同样的数位长度，数位较短的数前面补零。然后，从最低位开始，依次进行一次排序。这样从最低位排序一直到最高位排序完成以后，数列就变成一个有序序列。

代码实现：

```js
function radixSort(array) {
  let length = array.length;

  // 如果不是数组或者数组长度小于等于 1，直接返回，不需要排序
  if (!Array.isArray(array) || length <= 1) return array;

  let bucket = [],
    max = array[0],
    loop;

  // 确定排序数组中的最大值
  for (let i = 1; i < length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }

  // 确定最大值的位数
  loop = (max + '').length;

  // 初始化桶
  for (let i = 0; i < 10; i++) {
    bucket[i] = [];
  }

  for (let i = 0; i < loop; i++) {
    for (let j = 0; j < length; j++) {
      let str = array[j] + '';

      if (str.length >= i + 1) {
        let k = parseInt(str[str.length - 1 - i]); // 获取当前位的值，作为插入的索引
        bucket[k].push(array[j]);
      } else {
        // 处理位数不够的情况，高位默认为 0
        bucket[0].push(array[j]);
      }
    }

    array.splice(0, length); // 清空旧的数组

    // 使用桶重新初始化数组
    for (let i = 0; i < 10; i++) {
      let t = bucket[i].length;

      for (let j = 0; j < t; j++) {
        array.push(bucket[i][j]);
      }

      bucket[i] = [];
    }
  }

  return array;
}

radixSort([6,1,5,4,2,3]) // [1, 2, 3, 4, 5, 6]
```

基数排序的平均时间复杂度为 O(nk)，k 为最大元素的长度，最坏时间复杂度为 O(nk)，空间复杂度为 O(n) ，是稳定排序。

## 计数排序

计数排序是一种稳定的排序算法。

基本思想：统计待排序序列中每个元素出现的次数，然后根据元素出现的次数从小到大依次将元素放入新的数组中。

计数排序的平均时间复杂度 O(n+k)，最坏时间复杂度 O(n+k)	，空间复杂度 O(n+k)	，是稳定排序。

代码实现：

```js
function countingSort(arr) {
    let len = arr.length, b = [], c = [], min = max = arr[0]
  // 遍历输入数组 arr，统计元素出现次数并更新 min 和 max
    for(let i=0; i<len; i++) {
        // 如果当前元素小于等于 min，则更新 min
        min = min <= arr[i] ? min : arr[i]

        // 如果当前元素大于等于 max，则更新 max
        max = max >= arr[i] ? max : arr[i]

        // 更新 c，存储 arr[i] 出现的次数：
        // 如果 c[arr[i]] 已经存在，增加其计数；否则，设置其计数为 1
        c[arr[i]] = c[arr[i]] ? c[arr[i]] + 1 : 1 // 计数
    }

    // 遍历 min 到 max 之间的整数（不包括 max），累积计数数组 c
    for(let i=min; i< max; i++) {
        c[i+1] = (c[i+1] || 0) + (c[i] || 0)
    }

    // 反向遍历输入数组 arr，按照计数数组 c 构建已排序数组 b
    for(let i=len-1; i>=0; i--) {
        b[c[arr[i]] - 1] = arr[i]
        c[arr[i]]--
    }
    return b
}
countingSort([6,1,5,4,2,3]) // [1, 2, 3, 4, 5, 6]
```

## 系统自带排序实现

每个语言的排序内部实现都是不同的。

对于 JS 来说，数组长度大于 10 会采用快排，否则使用插入排序。选择插入排序是因为虽然时间复杂度很差，但是在数据量很小的情况下和 O(N \* logN) 相差无几，然而插入排序需要的常数时间很小，所以相对别的排序来说更快。
