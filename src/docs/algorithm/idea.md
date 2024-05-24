# 算法设计思想

## 分而治之

分而治之（分治法）是一种常见的算法设计思想，其核心是将一个大问题分解成小的子问题，分别解决这些子问题，然后将子问题的解合并起来得到原问题的解。这种思想在很多算法中都有广泛的应用，特别是在解决递归问题时很常见。

### 基本步骤

1. **分解（Divide）**：将原问题划分成若干个规模较小的子问题。
2. **解决（Conquer）**：递归地解决这些子问题，如果子问题规模足够小，则直接求解。
3. **合并（Combine）**：将子问题的解合并成原问题的解。

### 使用场景

- 排序算法：如**归并排序**和**快速排序**。
- 搜索算法：如**二分搜索**。
- 数据压缩：如哈夫曼编码。
- 分布式计算：如 MapReduce 等。

### 分而治之的应用

#### 多数元素

题目来源：[LeetCode #169 简单](https://leetcode.cn/problems/majority-element/description/)

给定一个大小为 `n` 的数组 `nums`，返回其中的多数元素。多数元素是指在数组中出现次数大于 `⌊ n/2 ⌋` 的元素。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。

示例 1：
> 输入：nums = [3, 2, 3]  
> 输出：3

示例 2：
> 输入：nums = [2, 2, 1, 1, 1, 2, 2]  
> 输出：2

提示：
- `n == nums.length`
- `1 <= n <= 5 * 104`
- `-10^9 <= nums[i] <= 10^9`

解题步骤：
1. **分解**：将数组分成左右两部分。
2. **解决子问题**：递归地在左右两部分中分别找出多数元素。
3. **合并**：
  - 如果左右部分的多数元素相同，则该元素即为整个数组的多数元素。
  - 如果左右部分的多数元素不同，则需要统计这两个元素在整个数组中的出现次数，出现次数较多的元素即为多数元素。

代码实现：

```javascript
function majorityElement(nums) {
   // 辅助函数：统计元素在给定区间内的出现次数
   function countInRange(nums, num, left, right) {
      let count = 0
      for (let i = left; i <= right; i++) {
         if (nums[i] === num) {
            count++
         }
      }
      return count
   }

   // 分治算法主函数
   function majorityElementRec(nums, left, right) {
      // 基本情况：只有一个元素时
      if (left === right) {
         return nums[left]
      }

      // 将数组分成左右两部分
      const mid = Math.floor((left + right) / 2)
      const leftMajority = majorityElementRec(nums, left, mid)
      const rightMajority = majorityElementRec(nums, mid + 1, right)

      // 如果左右部分的多数元素相同，则返回该元素
      if (leftMajority === rightMajority) {
         return leftMajority
      }

      // 否则统计左右多数元素在整个区间内的出现次数
      const leftCount = countInRange(nums, leftMajority, left, right)
      const rightCount = countInRange(nums, rightMajority, left, right)

      // 返回出现次数较多的元素
      return leftCount > rightCount ? leftMajority : rightMajority
   }

   // 调用递归函数，从整个数组开始
   return majorityElementRec(nums, 0, nums.length - 1)
}

// 测试用例
console.log(majorityElement([3, 2, 3])) // 输出：3
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])) // 输出：2
console.log(majorityElement([1])) // 输出：1
console.log(majorityElement([1, 1, 2, 2, 2, 1, 1, 1])) // 输出：1
```

- **时间复杂度**：O(n log n)，每次递归将数组分为两部分，类似于归并排序，每层的合并操作需要线性时间，递归深度为 log n，因此总时间复杂度为 O(n log n)。

- **空间复杂度**：O(log n)，递归调用栈的深度为 log n，因此空间复杂度为 O(log n)（不包括输入和输出所占用的空间）。

#### 排序数组

题目来源：[LeetCode #912 中等](https://leetcode.cn/problems/sort-an-array/description)

给你一个整数数组 `nums`，请你将该数组升序排列。

示例 1：
> 输入：nums = [5, 2, 3, 1]  
> 输出：[1, 2, 3, 5]

示例 2：
> 输入：nums = [5, 1, 1, 2, 0, 0]  
> 输出：[0, 0, 1, 1, 2, 5]

要将一个整数数组进行排序，我们可以使用分而治之的思想，这里我们选择**归并排序**作为实现方法，归并排序是一种稳定的排序算法。

解题步骤：

1. **递归终止条件**：当数组长度小于等于 1 时，返回数组本身，因为它已经是有序的。
2. **分解数组**：找到数组的中点，将数组分成左右两部分。
3. **递归排序**：递归地对左右两部分进行排序。
4. **合并**：合并两个有序的子数组成一个有序的数组。

代码实现：

```javascript
function sortArray(nums) {
   // 主函数，调用归并排序函数
   return mergeSort(nums)
}

function mergeSort(nums) {
   // 基本情况：如果数组长度小于等于 1，直接返回
   if (nums.length <= 1) {
      return nums
   }

   // 计算中点
   const mid = Math.floor(nums.length / 2)

   // 分别对左右两部分进行排序
   const left = mergeSort(nums.slice(0, mid))
   const right = mergeSort(nums.slice(mid))

   // 合并排序好的左右两部分
   return merge(left, right)
}

function merge(left, right) {
   const sortedArray = []
   let i = 0
   let j = 0

   // 合并两个有序数组
   while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
         sortedArray.push(left[i])
         i++
      } else {
         sortedArray.push(right[j])
         j++
      }
   }

   // 将剩余的元素添加到结果数组
   while (i < left.length) {
      sortedArray.push(left[i])
      i++
   }
   while (j < right.length) {
      sortedArray.push(right[j])
      j++
   }

   return sortedArray
}

// 示例测试
console.log(sortArray([5, 2, 3, 1])) // 输出：[1, 2, 3, 5]
console.log(sortArray([5, 1, 1, 2, 0, 0])) // 输出：[0, 0, 1, 1, 2, 5]
```

- **时间复杂度**：O(N log N)，因为数组每次都被分成两部分，并且每次合并操作的时间复杂度为 O(N)。
- **空间复杂度**：O(N)，因为归并排序需要额外的空间来存储合并后的数组。

#### 最大子数组和

题目来源：[LeetCode #53 中等](https://leetcode.cn/problems/maximum-subarray/description/)

给你一个整数数组 `nums`，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

子数组是数组中的一个连续部分。

示例 1：
> 输入：nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]  
> 输出：6  
> 解释：连续子数组 [4, -1, 2, 1] 的和最大，为 6。

示例 2：
> 输入：nums = [1]  
> 输出：1

示例 3：
> 输入：nums = [5, 4, -1, 7, 8]  
> 输出：23

解决最大子数组和问题，分而治之的思想是一种有效的方法。分而治之的基本思想是将问题分解成子问题，分别解决这些子问题，然后合并这些子问题的解来得到原问题的解。在这个问题中，我们将数组分成两个部分，然后递归地求解左右两部分的最大子数组和，并合并两部分的结果。

解题步骤：

1. **递归终止条件**：当数组长度为 1 时，返回数组的唯一元素。
2. **分解数组**：找到数组的中点，将数组分成左右两部分。
3. **递归求解**：递归地计算左半部分和右半部分的最大子数组和。
4. **合并**：计算跨越中间的最大子数组和，包括：
  - 从中点向左扫描的最大子数组和。
  - 从中点向右扫描的最大子数组和。
  - 跨越中点的最大子数组和等于左半部分的最大和加上右半部分的最大和。

代码实现：

```javascript
function maxSubArray(nums) {
    // 分治法求解最大子数组和
    return divideAndConquer(nums, 0, nums.length - 1)
}

function divideAndConquer(nums, left, right) {
    // 基本情况：如果只有一个元素，返回该元素
    if (left === right) {
        return nums[left]
    }

    // 计算中间点
    const mid = Math.floor((left + right) / 2)

    // 递归求解左半部分和右半部分的最大子数组和
    const leftMax = divideAndConquer(nums, left, mid)
    const rightMax = divideAndConquer(nums, mid + 1, right)

    // 计算跨越中间点的最大子数组和
    const crossMax = maxCrossingSubArray(nums, left, mid, right)

    // 返回三个部分中最大的值
    return Math.max(leftMax, rightMax, crossMax)
}

function maxCrossingSubArray(nums, left, mid, right) {
    // 计算左半部分的最大子数组和
    let leftSum = -Infinity
    let sum = 0
    for (let i = mid; i >= left; i--) {
        sum += nums[i]
        if (sum > leftSum) {
            leftSum = sum
        }
    }

    // 计算右半部分的最大子数组和
    let rightSum = -Infinity
    sum = 0
    for (let i = mid + 1; i <= right; i++) {
        sum += nums[i]
        if (sum > rightSum) {
            rightSum = sum
        }
    }

    // 返回跨越中间点的最大子数组和
    return leftSum + rightSum
}

// 示例测试
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])) // 输出：6
console.log(maxSubArray([1])) // 输出：1
console.log(maxSubArray([5, 4, -1, 7, 8])) // 输出：23
```

- **时间复杂度**：O(n log n)：每次分治将问题分成两个子问题，类似于归并排序，每次合并时需要线性的时间来计算跨越中间的最大子数组和。
- **空间复杂度**：O(log n)：递归调用的深度为 log n，因此空间复杂度为 O(log n)（不包括输入和输出所占用的空间）。

#### 数组中的第 K 个最大元素

题目来源：[LeetCode #215 中等](https://leetcode.cn/problems/kth-largest-element-in-an-array/description)

给定整数数组 `nums` 和整数 `k`，请返回数组中第 `k` 个最大的元素。

请注意，你需要找的是数组排序后的第 `k` 个最大的元素，而不是第 `k` 个不同的元素。

你必须设计并实现时间复杂度为 O(n) 的算法解决此问题。

示例 1:
> 输入: [3, 2, 1, 5, 6, 4], k = 2  
> 输出：5

示例 2:
> 输入: [3, 2, 3, 1, 2, 4, 5, 5, 6], k = 4  
> 输出：4

为了找到数组中的第 `k` 个最大元素，并且实现时间复杂度为 O(n) 的算法，我们可以使用**快速选择算法（Quickselect）**。快速选择算法是快速排序的变种，通过分而治之的方法来选择特定的第 `k` 个元素。

解题步骤：

1. **选择一个主元（pivot）**：通常选择数组的最后一个元素作为主元。
2. **分区**：使用 Lomuto 分区方案，将数组重新排列，使得主元的位置是其最终位置，同时确保左边的元素都小于等于主元，右边的元素都大于主元。
3. **递归搜索**：
  - 如果主元的位置正好是我们需要找的位置，直接返回主元。
  - 如果主元的位置大于目标位置，在左半部分继续搜索。
  - 如果主元的位置小于目标位置，在右半部分继续搜索。

代码实现：

```javascript
function findKthLargest(nums, k) {
    // 目标是找到第 k 大的元素，即排序后第 (n-k) 小的元素
    const targetIndex = nums.length - k;
    return quickSelect(nums, 0, nums.length - 1, targetIndex);
}

function quickSelect(nums, left, right, targetIndex) {
    if (left === right) {
        return nums[left];
    }

    // 分区操作
    const pivotIndex = partition(nums, left, right);

    if (pivotIndex === targetIndex) {
        return nums[pivotIndex];
    } else if (pivotIndex < targetIndex) {
        return quickSelect(nums, pivotIndex + 1, right, targetIndex);
    } else {
        return quickSelect(nums, left, pivotIndex - 1, targetIndex);
    }
}

function partition(nums, left, right) {
    const pivot = nums[right];
    let i = left;

    for (let j = left; j < right; j++) {
        if (nums[j] <= pivot) {
            [nums[i], nums[j]] = [nums[j], nums[i]];
            i++;
        }
    }

    [nums[i], nums[right]] = [nums[right], nums[i]];
    return i;
}

// 示例测试
console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2)); // 输出：5
console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)); // 输出：4
```

- **时间复杂度**：平均情况为 O(n)，因为每次分区都会将数组分成两部分。然而，在最坏情况下（例如数组已经有序时），时间复杂度可能达到 O(n^2)。
- **空间复杂度**：O(1)，因为快速选择是就地排序的算法，不需要额外的空间来存储数组。递归调用的栈空间为 O(log n)。

## 动态规划

动态规划是一种解决复杂问题的方法，通过将问题分解成更小的子问题，**并利用子问题的重叠性，避免重复计算**，从而提高效率。动态规划的核心思想是利用已计算的结果来构建解决方案，从而减少不必要的计算。

### 基本步骤

1. **定义子问题**：将原问题分解为若干子问题，确定这些子问题的状态和状态之间的转移关系。
2. **确定状态转移方程**：根据子问题的定义，找出当前状态与之前状态的关系，即状态转移方程。
3. **初始化**：确定初始状态的值。
4. **填表计算**：利用状态转移方程，从初始状态出发，逐步计算每个子问题的值，通常使用一个表格（数组）来存储子问题的解。
5. **返回结果**：根据问题的要求，从表格中提取最终的结果。

### 使用场景

动态规划主要用于解决以下几类问题：
- **最优化问题**：如最短路径、最大子序列和等问题。
- **计数问题**：如统计符合某些条件的方案数量。
- **序列问题**：如最长递增子序列、最长公共子序列等问题。
- **划分问题**：如背包问题、划分等问题。

### 动态规划的应用

#### 爬楼梯

题目来源：[LeetCode #70 简单](https://leetcode.cn/problems/climbing-stairs/)

假设你正在爬楼梯。需要 `n` 阶你才能到达楼顶。  
每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

示例 1：
> 输入：n = 2  
> 输出：2  
> 解释：有两种方法可以爬到楼顶。
>
> 1. 1 阶 + 1 阶
> 2. 2 阶

示例 2：
> 输入：n = 3  
> 输出：3  
> 解释：有三种方法可以爬到楼顶。
> 1. 1 阶 + 1 阶 + 1 阶
> 2. 1 阶 + 2 阶
> 3. 2 阶 + 1 阶

解题步骤：

1. **定义状态**：定义一个数组 `dp`，其中 `dp[i]` 表示达到第 `i` 阶的方法总数。
2. **初始条件**：知道 `dp[0] = 1`（到达第 0 阶的方法是站在原地）和 `dp[1] = 1`（到达第 1 阶的方法只有一种）。
3. **状态转移方程**：为了到达第 `i` 阶，可以从第 `i-1` 阶迈一步或者从第 `i-2` 阶迈两步，所以 `dp[i] = dp[i-1] + dp[i-2]`。
4. **最终结果**：`dp[n]` 表示达到第 `n` 阶的方法总数。

代码实现：

```javascript
function climbStairs(n) {
   // 如果楼梯阶数为 0 或 1，直接返回 n
   if (n <= 1) return n

   // 创建一个 dp 数组来存储每个台阶的方法数
   const dp = new Array(n + 1).fill(0)

   // 初始条件
   dp[0] = 1
   dp[1] = 1

   // 计算每个台阶的方法数
   for (let i = 2; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2]
   }

   // 返回到达第 n 阶的方法总数
   return dp[n]
}

// 示例测试
console.log(climbStairs(2)) // 输出：2
console.log(climbStairs(3)) // 输出：3
console.log(climbStairs(4)) // 输出：5
console.log(climbStairs(5)) // 输出：8
```

- **时间复杂度**：O(n)，因为只需遍历一次数组。
- **空间复杂度**：O(n)，需要一个长度为 `n+1` 的数组来存储每一阶的方法数。

#### 最长递增子序列

题目来源：[LeetCode #300 中等](https://leetcode.cn/problems/longest-increasing-subsequence/description/)

给你一个整数数组 `nums`，找到其中最长严格递增子序列的长度。

**子序列**是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，`[3, 6, 2, 7]` 是数组 `[0, 3, 1, 6, 2, 2, 7]` 的子序列。

示例 1：
> 输入：nums = [10, 9, 2, 5, 3, 7, 101, 18]  
> 输出：4  
> 解释：最长递增子序列是 [2, 3, 7, 101]，因此长度为 4。

示例 2：
> 输入：nums = [0, 1, 0, 3, 2, 3]  
> 输出：4

示例 3：
> 输入：nums = [7, 7, 7, 7, 7, 7, 7]  
> 输出：1

解题步骤：

1. **定义状态**：定义一个数组 `dp`，其中 `dp[i]` 表示以 `nums[i]` 结尾的最长递增子序列的长度。
2. **初始化**：每个位置的初始值为 1，因为每个位置都至少可以是一个长度为 1 的子序列。
3. **状态转移方程**：对于每个 `nums[i]`，遍历其之前的元素 `nums[j]` (0 ≤ j < i)，如果 `nums[i] > nums[j]`，则更新 `dp[i] = max(dp[i], dp[j] + 1)`，表示在 `nums[j]` 的子序列上追加 `nums[i]`。
4. **最终结果**：数组 `dp` 中的最大值即为最长递增子序列的长度。

代码实现：

```javascript
function lengthOfLIS(nums) {
   if (nums.length === 0) return 0

   // dp 数组，每个位置初始化为 1
   const dp = new Array(nums.length).fill(1)

   // 计算每个位置的最长递增子序列长度
   for (let i = 1; i < nums.length; i++) {
      for (let j = 0; j < i; j++) {
         if (nums[i] > nums[j]) {
            dp[i] = Math.max(dp[i], dp[j] + 1)
         }
      }
   }

   // 返回 dp 数组中的最大值
   return Math.max(...dp)
}

// 示例测试
console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])) // 输出：4
console.log(lengthOfLIS([0, 1, 0, 3, 2, 3])) // 输出：4
console.log(lengthOfLIS([7, 7, 7, 7, 7, 7, 7])) // 输出：1
```

- **时间复杂度**：O(n^2)，因为我们需要嵌套循环遍历每个元素对。
- **空间复杂度**：O(n)，需要一个长度为 `n` 的数组来存储每个位置的最长子序列长度。

#### 打家劫舍

题目来源：[LeetCode #198 中等](https://leetcode.cn/problems/house-robber/description/)

你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你不触动警报装置的情况下，一夜之内能够偷窃到的最高金额。

示例 1：
> 输入：[1, 2, 3, 1]  
> 输出：4  
> 解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。  
> 偷窃到的最高金额 = 1 + 3 = 4。

示例 2：
> 输入：[2, 7, 9, 3, 1]  
> 输出：12  
> 解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。  
> 偷窃到的最高金额 = 2 + 9 + 1 = 12。

解题步骤：

1. **定义状态**：定义一个数组 `dp`，其中 `dp[i]` 表示到达第 `i` 个房子时可以偷窃到的最高金额。
2. **初始条件**：如果只有一个房子，那么可以偷窃的最高金额就是该房子的金额，即 `dp[0] = nums[0]`。如果有两个房子，则可以偷窃的最高金额是这两个房子中金额较大的那个，即 `dp[1] = Math.max(nums[0], nums[1])`。
3. **状态转移方程**：对于每个房子 `i`，有两种选择：偷窃该房子（然后加上 `i-2` 房子的最高金额）或者不偷窃该房子（直接取 `i-1` 房子的最高金额）。状态转移方程为 `dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i])`。
4. **最终结果**：数组 `dp` 中的最后一个值即为可以偷窃到的最高金额。

代码实现：

```javascript
function rob(nums) {
   const n = nums.length
   if (n === 0) return 0
   if (n === 1) return nums[0]

   // dp 数组，每个位置初始化为 0
   const dp = new Array(n).fill(0)

   // 初始条件
   dp[0] = nums[0]
   dp[1] = Math.max(nums[0], nums[1])

   // 填充 dp 数组
   for (let i = 2; i < n; i++) {
      dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
   }

   // 返回 dp 数组的最后一个值
   return dp[n - 1]
}

// 示例测试
console.log(rob([1, 2, 3, 1])) // 输出：4
console.log(rob([2, 7, 9, 3, 1])) // 输出：12
```

- **时间复杂度**：O(n)，因为需要遍历一次数组。
- **空间复杂度**：O(n)，因为需要一个长度为 `n` 的数组来存储每个位置的最高金额。

优化空间复杂度：

注意到我们在状态转移时，只需要前两个状态的值，所以可以将空间复杂度优化为 O(1)。

```javascript
function rob(nums) {
   const n = nums.length
   if (n === 0) return 0
   if (n === 1) return nums[0]

   let prev1 = 0
   let prev2 = 0

   for (let i = 0; i < n; i++) {
      const current = Math.max(prev1, prev2 + nums[i])
      prev2 = prev1
      prev1 = current
   }

   return prev1
}

// 示例测试
console.log(rob([1, 2, 3, 1])) // 输出：4
console.log(rob([2, 7, 9, 3, 1])) // 输出：12
```

优化后的算法分析：

- **时间复杂度**：O(n)，因为需要遍历一次数组。
- **空间复杂度**：O(1)，因为只需要常量空间来存储前两个状态的值。

通过上述方法，我们可以有效地计算出不触动警报装置的情况下，可以偷窃到的最高金额。优化后的代码在空间复杂度上更高效。

#### 零钱兑换

题目来源：[LeetCode #322 中等](https://leetcode.cn/problems/coin-change/description/)

给你一个整数数组 `coins`，表示不同面额的硬币；以及一个整数 `amount`，表示总金额。

计算并返回可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 `-1`。

你可以认为每种硬币的数量是无限的。

示例 1：
> 输入：coins = [1, 2, 5], amount = 11  
> 输出：3  
> 解释：11 = 5 + 5 + 1

示例 2：
> 输入：coins = [2], amount = 3  
> 输出：-1

示例 3：
> 输入：coins = [1], amount = 0  
> 输出：0

解题步骤：

1. **定义状态**：定义一个数组 `dp`，其中 `dp[i]` 表示凑成金额 `i` 所需的最少硬币个数。
2. **初始化**：`dp[0] = 0`，因为凑成金额 `0` 所需的硬币数是 `0`。其他 `dp[i]` 初始化为一个较大的值（如 `Infinity`），表示还没有计算出结果。
3. **状态转移方程**：对于每个金额 `i`，尝试使用每种硬币 `coin`，更新 `dp[i] = Math.min(dp[i], dp[i - coin] + 1)`，表示从金额 `i - coin` 加上一个 `coin` 的硬币数量。
4. **最终结果**：如果 `dp[amount]` 仍然是初始值 `Infinity`，则表示无法凑成该金额，返回 `-1`，否则返回 `dp[amount]`。

代码实现：

```javascript
function coinChange(coins, amount) {
   // 创建一个 dp 数组，初始化为 Infinity
   const dp = new Array(amount + 1).fill(Infinity)
   dp[0] = 0 // 初始化金额为 0 时的最少硬币数为 0

   // 填充 dp 数组
   for (let i = 1; i <= amount; i++) {
      for (const coin of coins) {
         if (i - coin >= 0) {
            dp[i] = Math.min(dp[i], dp[i - coin] + 1)
         }
      }
   }

   // 如果 dp[amount] 还是 Infinity，表示无法凑成该金额，返回 -1
   return dp[amount] === Infinity ? -1 : dp[amount]
}

// 示例测试
console.log(coinChange([1, 2, 5], 11)) // 输出：3
console.log(coinChange([2], 3)) // 输出：-1
console.log(coinChange([1], 0)) // 输出：0
console.log(coinChange([1, 3, 4, 5], 7)) // 输出：2 (3 + 4)
console.log(coinChange([2, 5, 10, 1], 27)) // 输出：4 (10 + 10 + 5 + 2)
```

- **时间复杂度**：O(n * m)，其中 `n` 是金额 `amount`，`m` 是硬币种类数。
- **空间复杂度**：O(n)，需要一个长度为 `amount + 1` 的数组来存储每个金额的最少硬币数。

## 贪心算法

贪心算法是一种在每一步选择中都采取在当前状态下最好或最优的选择，从而希望导致结果是全局最优的算法。贪心算法的核心是贪心选择性质，即**每一步的局部最优选择最终能够导致全局最优解**。

### 基本步骤

1. **建立数学模型**：将问题抽象为数学模型，明确所需的解和约束条件。
2. **选择贪心策略**：根据问题的特性，选择一个贪心策略，即在每一步选择中，采取局部最优的选择。
3. **证明贪心选择的正确性**：证明所选的贪心策略能够得到问题的最优解，通常通过数学归纳法或反证法证明。
4. **实施贪心算法**：从初始状态开始，按照贪心策略逐步推进，直到达到问题的约束条件或无法继续推进为止。
5. **构造解**：根据选择的步骤，构造出问题的解。

### 使用场景

贪心算法通常用于以下几类问题：
- **最优化问题**：如最小生成树、最短路径等问题。
- **活动选择问题**：如区间调度、任务安排等问题。
- **资源分配问题**：如背包问题的某些变种、最大子序列和等问题。
- **图论问题**：如 Dijkstra 算法求最短路径，Kruskal 算法和 Prim 算法求最小生成树。

### 贪心算法的应用

#### 分发饼干

题目来源：[LeetCode #455 简单](https://leetcode.cn/problems/assign-cookies/description/)

假设你是一位很棒的家长，想要给你的孩子们一些小饼干。但是，每个孩子最多只能给一块饼干。

对每个孩子 `i`，都有一个胃口值 `g[i]`，这是能让孩子们满足胃口的饼干的最小尺寸；并且每块饼干 `j`，都有一个尺寸 `s[j]`。如果 `s[j] >= g[i]`，我们可以将这个饼干 `j` 分配给孩子 `i`，这个孩子会得到满足。你的目标是尽可能满足越多数量的孩子，并输出这个最大数值。

示例 1:
> 输入: g = [1, 2, 3], s = [1, 1]  
> 输出：1  
> 解释：  
> 你有三个孩子和两块小饼干，3 个孩子的胃口值分别是：1, 2, 3。  
> 虽然你有两块小饼干，由于他们的尺寸都是 1，你只能让胃口值是 1 的孩子满足。  
> 所以你应该输出 1。

示例 2:
> 输入: g = [1, 2], s = [1, 2, 3]  
> 输出：2  
> 解释：  
> 你有两个孩子和三块小饼干，2 个孩子的胃口值分别是 1, 2。  
> 你拥有的饼干数量和尺寸都足以让所有孩子满足。  
> 所以你应该输出 2。

先对孩子的满足度和饼干的大小排序，然后依次为每个孩子分配满足其满足度的最小饼干。

解题步骤：

1. **排序**：将孩子的胃口数组 `g` 和饼干尺寸数组 `s` 分别进行排序。
2. **匹配**：使用两个指针，一个指向孩子的胃口数组，另一个指向饼干尺寸数组。依次尝试用当前最小的饼干去满足当前最小的胃口。
3. **更新指针**：如果当前饼干可以满足当前孩子的胃口，两个指针都移动到下一个。如果不能，则只移动饼干的指针，尝试用下一个较大的饼干去满足当前孩子的胃口。
4. **结束条件**：当两个指针都到达数组末尾时，匹配结束，返回满足孩子的数量。

代码实现：

```javascript
function findContentChildren(g, s) {
   // 对孩子的胃口数组和饼干尺寸数组进行排序
   g.sort((a, b) => a - b)
   s.sort((a, b) => a - b)

   let i = 0 // 孩子的指针
   let j = 0 // 饼干的指针
   let count = 0 // 满足的孩子数量

   // 当孩子和饼干都没有处理完时进行匹配
   while (i < g.length && j < s.length) {
      if (s[j] >= g[i]) {
         // 当前饼干可以满足当前孩子
         count++
         i++
      }
      // 无论是否满足，都尝试下一个饼干
      j++
   }

   return count
}

// 示例测试
console.log(findContentChildren([1, 2, 3], [1, 1])) // 输出：1
console.log(findContentChildren([1, 2], [1, 2, 3])) // 输出：2
console.log(findContentChildren([1, 2, 3], [3])) // 输出：1
console.log(findContentChildren([10, 9, 8, 7], [5, 6, 7, 8])) // 输出：2
```

- **时间复杂度**：O(n log n + m log m)，其中 `n` 是孩子数组的长度，`m` 是饼干数组的长度。这是因为排序需要 O(n log n) 和 O(m log m)。
- **空间复杂度**：O(1)，只需要常量级别的额外空间。

#### 柠檬水找零

题目来源：[LeetCode #860 简单](https://leetcode.cn/problems/lemonade-change/description/)

在柠檬水摊上，每一杯柠檬水的售价为 `5` 美元。顾客排队购买你的产品（按账单 `bills` 支付的顺序）一次购买一杯。

每位顾客只买一杯柠檬水，然后向你付 `5` 美元、`10` 美元或 `20` 美元。你必须给每个顾客正确找零，也就是说净交易是每位顾客向你支付 `5` 美元。

注意，一开始你手头没有任何零钱。

给你一个整数数组 `bills`，其中 `bills[i]` 是第 `i` 位顾客付的账。如果你能给每位顾客正确找零，返回 `true`，否则返回 `false`。

示例 1：
> 输入：bills = [5, 5, 5, 10, 20]  
> 输出：true  
> 解释：  
> 前 3 位顾客那里，我们按顺序收取 3 张 5 美元的钞票。  
> 第 4 位顾客那里，我们收取一张 10 美元的钞票，并返还 5 美元。  
> 第 5 位顾客那里，我们找还一张 10 美元的钞票和一张 5 美元的钞票。  
> 由于所有客户都得到了正确的找零，所以我们输出 true。

示例 2：
> 输入：bills = [5, 5, 10, 10, 20]  
> 输出：false  
> 解释：  
> 前 2 位顾客那里，我们按顺序收取 2 张 5 美元的钞票。  
> 对于接下来的 2 位顾客，我们收取一张 10 美元的钞票，然后返还 5 美元。  
> 对于最后一位顾客，我们无法退回 15 美元，因为我们现在只有两张 10 美元的钞票。  
> 由于不是每位顾客都得到了正确的找零，所以答案是 false。

遍历顾客给的钱，优先使用手中的大额钞票找零，从而保留小额钞票以应对后续的找零需求。

解题步骤：

1. **初始化钱箱**：使用两个变量 `five` 和 `ten` 来分别表示手中拥有的 5 美元和 10 美元的数量，初始值为 0。
2. **遍历账单**：遍历顾客付的每一张账单。
3. **处理账单**：
  - 如果顾客付的是 5 美元，直接收下。
  - 如果顾客付的是 10 美元，需要找零，检查是否有足够的 5 美元找零，如果有则找零，否则无法找零，返回 false。
  - 如果顾客付的是 20 美元，需要找零，优先使用 10 美元找零，然后再用 5 美元找零，如果都无法找零，则返回 false。
4. **返回结果**：遍历结束后，如果能够给每个顾客正确找零，则返回 true，否则返回 false。

代码实现：

```javascript
function lemonadeChange(bills) {
   let five = 0
   let ten = 0

   for (const bill of bills) {
      if (bill === 5) {
         // 顾客付 5 美元，直接收下
         five++
      } else if (bill === 10) {
         // 顾客付 10 美元，尝试找零，优先使用 10 美元找零
         if (five === 0) {
            return false // 无法找零，返回 false
         }
         five--
         ten++
      } else {
         // 顾客付 20 美元，尝试找零，优先使用 10 美元找零，再使用 5 美元找零
         if (ten > 0 && five > 0) {
            ten--
            five--
         } else if (five >= 3) {
            five -= 3
         } else {
            return false // 无法找零，返回 false
         }
      }
   }

   return true
}

// 示例测试
console.log(lemonadeChange([5, 5, 5, 10, 20])) // 输出：true
console.log(lemonadeChange([5, 5, 10, 10, 20])) // 输出：false
```

- **时间复杂度**：O(n)，其中 n 是账单的数量，我们需要遍历一次账单数组。
- **空间复杂度**：O(1)，只需要常数级别的额外空间来存储 5 美元和 10 美元的数量。

#### 跳跃游戏

题目来源：[LeetCode #55 中等](https://leetcode.cn/problems/jump-game/description/)

给你一个非负整数数组 `nums`，你最初位于数组的第一个下标。数组中的每个元素代表你在该位置可以跳跃的最大长度。

判断你是否能够到达最后一个下标，如果可以，返回 `true`；否则，返回 `false`。

示例 1：
> 输入：nums = [2, 3, 1, 1, 4]  
> 输出：true  
> 解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。

示例 2：
> 输入：nums = [3, 2, 1, 0, 4]   
> 输出：false  
> 解释：无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0，所以永远不可能到达最后一个下标。

从前往后遍历数组，维护当前能够到达的最远位置，如果在某一步能够到达或超过数组的最后一个位置，则返回 `true`。

解题步骤：

1. **初始化**：定义一个变量 `maxReach`，表示当前能够到达的最远位置，初始值为 `0`。
2. **遍历数组**：从头到尾遍历数组的每个位置，检查当前位置是否能够到达。如果当前位置大于 `maxReach`，说明不能到达当前位置，返回 `false`。
3. **更新最远可达位置**：如果当前位置在可达范围内，更新 `maxReach` 为 `max(maxReach, i + nums[i])`。
4. **检查是否可达**：如果在遍历过程中，`maxReach` 大于或等于数组的最后一个下标，返回 `true`。

代码实现：

```javascript
function canJump(nums) {
   let maxReach = 0

   for (let i = 0; i < nums.length; i++) {
      // 如果当前下标超过了能到达的最远位置
      if (i > maxReach) {
         return false
      }
      // 更新能到达的最远位置
      maxReach = Math.max(maxReach, i + nums[i])
      // 如果能到达或超过最后一个下标
      if (maxReach >= nums.length - 1) {
         return true
      }
   }

   return false
}

// 示例测试
console.log(canJump([2, 3, 1, 1, 4])) // 输出：true
console.log(canJump([3, 2, 1, 0, 4])) // 输出：false
console.log(canJump([0])) // 输出：true (只有一个元素，已经在最后一个下标)
console.log(canJump([2, 0])) // 输出：true (可以直接到达最后一个下标)
console.log(canJump([1, 2, 3, 4, 5])) // 输出：true (每步都能跳到最后)
```

1. **`canJump` 函数**：主函数，判断是否能够到达最后一个下标。
2. **初始化 `maxReach`**：定义变量 `maxReach` 表示当前能够到达的最远位置，初始值为 `0`。
3. **遍历数组**：
  - 对于每个位置 `i`，检查是否超过了 `maxReach`。如果是，返回 `false`，表示不能到达该位置。
  - 否则，更新 `maxReach` 为 `max(maxReach, i + nums[i])`，表示当前能够到达的最远位置。
4. **检查终止条件**：如果 `maxReach` 已经大于或等于数组的最后一个下标，返回 `true`。
5. **返回结果**：遍历结束后，如果没有返回 `true`，则返回 `false`。

- **时间复杂度**：O(n)，因为我们需要遍历一次数组。
- **空间复杂度**：O(1)，只需要常量级别的额外空间。

#### 无重叠区间

题目来源：[LeetCode #435 中等](https://leetcode.cn/problems/non-overlapping-intervals/description/)

给定一个区间的集合 `intervals`，其中 `intervals[i] = [starti, endi]` 。返回需要移除区间的最小数量，使剩余区间互不重叠。

示例 1:
> 输入: intervals = [[1, 2], [2, 3], [3, 4], [1, 3]]  
> 输出：1  
> 解释: 移除 [1, 3] 后，剩下的区间没有重叠。

示例 2:
> 输入: intervals = [[1, 2], [1,2], [1,2]]  
> 输出：2  
> 解释: 你需要移除两个 [1, 2] 来使剩下的区间没有重叠。

示例 3:
> 输入: intervals = [[1, 2], [2, 3]]  
> 输出：0  
> 解释：你不需要移除任何区间，因为它们已经是无重叠的了。

先按照区间的结束时间排序，然后依次选择结束时间最早且不与前一个选择的区间重叠的区间。对于这个问题，我们要尽可能多地保留区间，从而使得需要移除的区间数量最小。

解题步骤：

1. **排序**：首先将区间按照结束时间 `end` 进行排序。这样可以保证每次选择的区间结束时间尽可能早，以便留出更多的空间给后面的区间。
2. **贪心选择**：使用一个变量 `end` 来记录上一个选择的区间的结束时间。初始化 `end` 为负无穷大。
3. **遍历区间**：依次遍历排序后的区间，如果当前区间的起始时间 `start` 大于等于 `end`，说明这个区间可以保留，同时更新 `end` 为当前区间的结束时间 `end`。否则，这个区间需要移除。
4. **统计结果**：遍历结束后，计算需要移除的区间数量。

代码实现：

```javascript
function eraseOverlapIntervals(intervals) {
   if (intervals.length === 0) return 0

   // 按区间的结束时间进行排序
   intervals.sort((a, b) => a[1] - b[1])

   let count = 0
   let end = -Infinity

   for (const [start, finish] of intervals) {
      if (start >= end) {
         // 当前区间可以保留，更新结束时间
         end = finish
      } else {
         // 当前区间与上一个区间重叠，需要移除
         count++
      }
   }

   return count
}

// 示例测试
console.log(eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]])) // 输出：1
console.log(eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]])) // 输出：2
console.log(eraseOverlapIntervals([[1, 2], [2, 3]])) // 输出：0
console.log(eraseOverlapIntervals([[1, 2], [1, 3], [2, 4], [3, 5]])) // 输出：1
console.log(eraseOverlapIntervals([[0, 2], [1, 3], [2, 4], [3, 5], [4, 6]])) // 输出：2
```
1. **`eraseOverlapIntervals` 函数**：主函数，计算需要移除的区间数量。
2. **排序**：将区间按照结束时间进行排序，使得每次选择的区间结束时间尽可能早。
3. **初始化变量**：`count` 用于记录需要移除的区间数量，`end` 初始化为负无穷大。
4. **遍历区间**：
  - 如果当前区间的起始时间 `start` 大于等于 `end`，说明这个区间可以保留，并更新 `end` 为当前区间的结束时间 `finish`。
  - 否则，这个区间与上一个区间重叠，需要移除，增加 `count` 计数器。
5. **返回结果**：遍历结束后，返回需要移除的区间数量 `count`。

- **时间复杂度**：O(n log n)，因为我们需要对区间进行排序。
- **空间复杂度**：O(1)，不需要额外的空间，除了用于存储输入的区间列表。

#### 分发糖果

题目来源：[LeetCode #135 困难](https://leetcode.cn/problems/candy/description/)

`n` 个孩子站成一排。给你一个整数数组 `ratings` 表示每个孩子的评分。

你需要按照以下要求，给这些孩子分发糖果：

- 每个孩子至少分配到 `1` 个糖果。
- 相邻两个孩子评分更高的孩子会获得更多的糖果。

请你给每个孩子分发糖果，计算并返回需要准备的最少糖果数目。

示例 1：
> 输入：ratings = [1, 0, 2]  
> 输出：5  
> 解释：你可以分别给第一个、第二个、第三个孩子分发 2、1、2 颗糖果。

示例 2：
> 输入：ratings = [1, 2, 2]  
> 输出：4  
> 解释：你可以分别给第一个、第二个、第三个孩子分发 1、2、1 颗糖果。  
> 第三个孩子只得到 1 颗糖果，这满足题面中的两个条件。

先从左到右扫描数组，确保右边的评分更高的孩子获得更多糖果；再从右到左扫描数组，确保左边的评分更高的孩子获得更多糖果。

解题步骤：

1. **初始化**：创建一个数组 `candies`，初始化每个孩子的糖果数为 1，表示每个孩子至少有一个糖果。
2. **从左到右遍历**：检查每个孩子与前一个孩子的评分，如果当前孩子的评分比前一个孩子高，则更新当前孩子的糖果数为 `candies[i-1] + 1`。
3. **从右到左遍历**：检查每个孩子与后一个孩子的评分，如果当前孩子的评分比后一个孩子高且糖果数不大于后一个孩子，则更新当前孩子的糖果数为 `candies[i+1] + 1`。
4. **计算总糖果数**：遍历 `candies` 数组，求和得到最少需要的糖果数。

代码实现：

```javascript
function candy(ratings) {
   const n = ratings.length
   const candies = new Array(n).fill(1)

   // 从左到右遍历，保证右边孩子评分高的糖果更多
   for (let i = 1; i < n; i++) {
      if (ratings[i] > ratings[i - 1]) {
         candies[i] = candies[i - 1] + 1
      }
   }

   // 从右到左遍历，保证左边孩子评分高的糖果更多
   for (let i = n - 2; i >= 0; i--) {
      if (ratings[i] > ratings[i + 1]) {
         candies[i] = Math.max(candies[i], candies[i + 1] + 1)
      }
   }

   // 计算总糖果数
   return candies.reduce((sum, candy) => sum + candy, 0)
}

// 示例测试
console.log(candy([1, 0, 2])) // 输出：5
console.log(candy([1, 2, 2])) // 输出：4
console.log(candy([1, 3, 2, 2, 1])) // 输出：7
console.log(candy([1, 2, 3, 4, 5])) // 输出：15
console.log(candy([5, 4, 3, 2, 1])) // 输出：15
```

1. **`candy` 函数**：主函数，计算最少需要的糖果数。
2. **初始化 `candies` 数组**：每个孩子至少分配 1 个糖果。
3. **从左到右遍历**：
  - 如果当前孩子的评分高于前一个孩子，则当前孩子的糖果数等于前一个孩子的糖果数加 1。
4. **从右到左遍历**：
  - 如果当前孩子的评分高于后一个孩子且糖果数不大于后一个孩子，则更新当前孩子的糖果数为 `candies[i + 1] + 1`。
5. **计算总糖果数**：通过遍历 `candies` 数组求和得到最少需要的糖果数。

- **时间复杂度**：O(n)，因为我们需要遍历两次数组，每次遍历的时间复杂度都是 O(n)。
- **空间复杂度**：O(n)，因为我们需要额外的数组 `candies` 来存储每个孩子的糖果数。

## 回溯算法

回溯算法是一种通过逐步构建解决方案的方法，当遇到某一步无法继续前进时，回溯算法会回退到上一步，尝试其他的选择，直到找到问题的解决方案或确定无解。回溯算法通常通过深度优先搜索的方式实现。

### 基本步骤

1. **选择决策树**：将问题抽象成一个决策树，每个节点代表一个决策点。
2. **深度优先搜索**：从根节点开始，采用深度优先搜索的方式探索决策树的所有分支。
3. **做出选择**：在每个节点处，根据问题的限制条件，做出一个选择。
4. **检查约束条件**：检查当前选择是否满足问题的约束条件，如果满足则继续探索，否则回溯到上一步。
5. **标记路径**：在探索过程中，记录已经探索过的路径，避免重复探索。
6. **撤销选择**：在回溯时，撤销当前节点的选择，回到上一层继续探索其他分支。
7. **判断终止条件**：当到达叶子节点或者无法继续探索时，判断是否找到了问题的解决方案。

### 使用场景

回溯算法通常用于以下几类问题：
- **组合问题**：如组合总和、组合总和 II 等问题。
- **排列问题**：如全排列、字符串的全排列等问题。
- **搜索问题**：如解数独、N 皇后问题等。
- **子集问题**：如子集、子集 II 等问题。

### 回溯算法的应用

#### 全排列

题目来源：[LeetCode #46 中等](https://leetcode.cn/problems/permutations/description/)

给定一个不含重复数字的数组 `nums`，返回其所有可能的全排列。你可以按任意顺序返回答案。

示例 1：
> 输入：nums = [1, 2, 3]  
> 输出：[[1, 2, 3], [1, 3, 2], [2, 1 ,3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]

示例 2：
> 输入：nums = [0, 1]  
> 输出：[[0, 1], [1, 0]]

示例 3：
> 输入：nums = [1]  
> 输出：[[1]]

提示：
- `1 <= nums.length <= 6`
- `-10 <= nums[i] <= 10`
- `nums` 中的所有整数互不相同

解题步骤：

1. **初始化结果集**：创建一个结果数组 `result` 来存储所有的排列。
2. **回溯函数**：定义一个回溯函数 `backtrack`，参数为当前路径 `path` 和剩余可选择的数字 `choices`。
3. **终止条件**：当路径长度等于输入数组长度时，表明我们找到了一种排列，将其加入结果集。
4. **选择和探索**：遍历剩余可选择的数字，将每个数字加入当前路径，并递归调用回溯函数，传递更新后的路径和剩余可选择的数字。
5. **回溯**：在递归调用结束后，撤销上一步选择，进行下一轮选择和探索。

代码实现：

```javascript
function permute(nums) {
   const result = []

   function backtrack(path, choices) {
      if (path.length === nums.length) {
         result.push([...path])
         return
      }
      for (let i = 0; i < choices.length; i++) {
         path.push(choices[i])
         backtrack(path, choices.slice(0, i).concat(choices.slice(i + 1)))
         path.pop()
      }
   }

   backtrack([], nums)
   return result
}

// 示例测试
console.log(permute([1, 2, 3])) // 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
console.log(permute([0, 1])) // 输出：[[0,1],[1,0]]
console.log(permute([1])) // 输出：[[1]]
```

1. **`permute` 函数**：主函数，接收输入数组 `nums`，返回所有的排列。
2. **初始化结果集**：创建一个空数组 `result` 来存储所有的排列结果。
3. **`backtrack` 函数**：递归函数，构建排列。参数 `path` 表示当前路径，`choices` 表示当前剩余的可选择数字。
4. **终止条件**：当路径长度等于输入数组长度时，将当前路径加入结果集。
5. **选择和探索**：遍历剩余可选择的数字，将每个数字加入当前路径，递归调用 `backtrack` 函数，并传递更新后的路径和剩余可选择的数字。
6. **回溯**：在递归调用结束后，撤销上一步选择，通过 `path.pop()` 将最后一个元素移除，进行下一轮选择和探索。

- **时间复杂度**：O(n * n!)，其中 n 是输入数组的长度。总共有 n! 种排列，每种排列需要 O(n) 的时间来构建。
- **空间复杂度**：O(n)，用于存储递归调用栈和临时路径。

#### 子集

题目来源：[LeetCode 78 中等](https://leetcode.cn/problems/subsets/description/)

给你一个整数数组 `nums`，数组中的元素互不相同。返回该数组所有可能的子集（幂集）。

解集不能包含重复的子集。你可以按任意顺序返回解集。

示例 1：
> 输入：nums = [1, 2, 3]  
> 输出：[[], [1], [2], [1,2], [3], [1, 3], [2, 3], [1, 2, 3]]

示例 2：
> 输入：nums = [0]  
> 输出：[[], [0]]

提示：

- `1 <= nums.length <= 10`
- `-10 <= nums[i] <= 10`
- `nums` 中的所有元素互不相同

解题步骤：

1. **初始化结果集**：创建一个结果数组 `result` 来存储所有的子集。
2. **回溯函数**：定义一个回溯函数 `backtrack`，参数为当前路径 `path` 和起始索引 `start`。
3. **添加当前路径到结果集**：将当前路径 `path` 的拷贝加入结果集 `result`。
4. **选择和探索**：从起始索引开始遍历 `nums` 数组，将每个数字加入当前路径，并递归调用回溯函数，传递更新后的路径和新的起始索引。
5. **回溯**：在递归调用结束后，撤销上一步选择，进行下一轮选择和探索。

代码实现：

```javascript
function subsets(nums) {
   const result = []

   function backtrack(path, start) {
      // 将当前路径加入结果集
      result.push([...path])
      // 从当前索引开始遍历 nums 数组
      for (let i = start; i < nums.length; i++) {
         // 将当前数字加入路径
         path.push(nums[i])
         // 递归调用回溯函数，传递更新后的路径和新的起始索引
         backtrack(path, i + 1)
         // 回溯，撤销上一步选择
         path.pop()
      }
   }

   // 初始化回溯
   backtrack([], 0)
   return result
}

// 示例测试
console.log(subsets([1, 2, 3])) // 输出：[[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]
console.log(subsets([0])) // 输出：[[], [0]]
```

1. **`subsets` 函数**：主函数，接收输入数组 `nums`，返回所有的子集。
2. **初始化结果集**：创建一个空数组 `result` 来存储所有的子集结果。
3. **`backtrack` 函数**：递归函数，构建子集。参数 `path` 表示当前路径，`start` 表示起始索引。
4. **添加当前路径到结果集**：将当前路径 `path` 的拷贝加入结果集 `result`。
5. **选择和探索**：从起始索引开始遍历 `nums` 数组，将每个数字加入当前路径 `path`，递归调用 `backtrack` 函数，并传递更新后的路径和新的起始索引 `i + 1`。
6. **回溯**：在递归调用结束后，撤销上一步选择，通过 `path.pop()` 将最后一个元素移除，进行下一轮选择和探索。

- **时间复杂度**：O(n * 2^n)，其中 n 是输入数组的长度。总共有 2^n 个子集，每个子集的平均长度为 n/2。
- **空间复杂度**：O(n)，用于存储递归调用栈和临时路径。

#### 单词拆分 II

题目来源：[LeetCode #140 困难](https://leetcode.cn/problems/word-break-ii/description/)

给定一个字符串 `s` 和一个字符串字典 `wordDict`，在字符串 `s` 中增加空格来构建一个句子，使得句子中所有的单词都在词典中。以任意顺序返回所有这些可能的句子。

注意：词典中的同一个单词可能在分段中被重复使用多次。

示例 1：
> 输入：s = "catsanddog", wordDict = ["cat", "cats", "and", "sand", "dog"]  
> 输出：["cats and dog", "cat sand dog"]

示例 2：
> 输入：s = "pineapplepenapple", wordDict = ["apple", "pen", "applepen", "pine", "pineapple"]  
> 输出：["pine apple pen apple", "pineapple pen apple", "pine applepen apple"]  
> 解释：注意你可以重复使用字典中的单词。

示例 3：
> 输入：s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]  
> 输出：[]

提示：
- `1 <= s.length <= 20`
- `1 <= wordDict.length <= 1000`
- `1 <= wordDict[i].length <= 10`
- `s` 和 `wordDict[i]` 仅有小写英文字母组成
- `wordDict` 中所有字符串都不同

要解决这个问题，我们可以使用回溯算法结合动态规划进行优化。具体来说，我们需要递归地尝试在字符串 `s` 中插入空格来构成单词，同时使用缓存来存储已经计算过的结果，避免重复计算。

解题步骤：

1. **定义缓存**：使用一个对象 `memo` 来存储已经计算过的子问题的结果。
2. **定义回溯函数**：递归函数 `backtrack`，参数为当前子字符串 `s`。
3. **递归终止条件**：如果当前子字符串 `s` 在缓存中，直接返回缓存中的结果；如果 `s` 为空字符串，返回包含一个空字符串的数组。
4. **遍历匹配**：遍历词典中的单词，如果当前子字符串 `s` 以该单词开头，则递归处理剩余部分的字符串，并将结果组合起来。
5. **更新缓存**：将当前子字符串的结果存入缓存中，并返回该结果。

代码实现：

```javascript
function wordBreak(s, wordDict) {
   const wordSet = new Set(wordDict)
   const memo = {}

   function backtrack(s) {
      // 如果当前子字符串已经在缓存中，直接返回缓存的结果
      if (memo[s] !== undefined) {
         return memo[s]
      }
      // 如果子字符串为空，返回包含一个空字符串的数组
      if (s === '') {
         return ['']
      }

      const result = []

      // 遍历词典中的每个单词
      for (const word of wordSet) {
         if (s.startsWith(word)) {
            const subResult = backtrack(s.slice(word.length))
            for (const sub of subResult) {
               result.push(word + (sub === '' ? '' : ' ') + sub)
            }
         }
      }

      // 将当前子字符串的结果存入缓存
      memo[s] = result
      return result
   }

   return backtrack(s)
}

// 示例测试
console.log(wordBreak('catsanddog', ['cat', 'cats', 'and', 'sand', 'dog']))
// 输出：["cats and dog", "cat sand dog"]

console.log(wordBreak('pineapplepenapple', ['apple', 'pen', 'applepen', 'pine', 'pineapple']))
// 输出：["pine apple pen apple", "pineapple pen apple", "pine applepen apple"]

console.log(wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat']))
// 输出：[]
```

1. **`wordBreak` 函数**：主函数，接收字符串 `s` 和词典 `wordDict`，返回所有可能的句子。
2. **初始化**：将词典转化为集合 `wordSet`，用于快速查找；定义缓存 `memo`。
3. **`backtrack` 函数**：递归函数，处理当前子字符串 `s`，返回其所有可能的句子组合。
4. **缓存查询**：如果当前子字符串 `s` 在缓存中，直接返回缓存中的结果。
5. **递归终止条件**：如果子字符串 `s` 为空，返回包含一个空字符串的数组。
6. **遍历词典**：对于每个单词，如果当前子字符串 `s` 以该单词开头，则递归处理剩余部分的字符串 `s.slice(word.length)`。
7. **组合结果**：将当前单词和递归结果组合成新的句子，并添加到结果集中。
8. **更新缓存**：将当前子字符串 `s` 的结果存入缓存 `memo`，避免重复计算。
9. **返回结果**：主函数调用 `backtrack` 函数，返回最终结果。


- **时间复杂度**：最坏情况下为 O(n^2 * k)，其中 n 是字符串 `s` 的长度，k 是词典 `wordDict` 的大小。每个子字符串的计算会涉及到对词典的遍历，并且需要组合结果。
- **空间复杂度**：O(n^2)，用于缓存子字符串的结果和存储递归栈。

