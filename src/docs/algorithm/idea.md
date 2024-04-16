# 算法设计思想

## 分而治之

分而治之是算法设计的一种方法。它将一个问题分成多个和原问题相似的小问题，递归解决小问题，再将结果合并以解决原来的问题。

场景一：归并排序

- 分：把数组从中间一分为二。
- 解：递归地对两个子数组进行归并排序。
- 合：合并有序子数组。

场景二：快速排序

- 分：选基准把数组分成两个子数组。
- 解：递归地两个子数组进行快速排序。
- 合：对两个子数组进行合并。

### 猜数字大小 (二分搜索)

leetcode 374

https://leetcode.cn/problems/guess-number-higher-or-lower/description/

猜数字游戏的规则如下：

- 每轮游戏，我都会从 1 到 n 随机选择一个数字。请你猜选出的是哪个数字。
- 如果你猜错了，我会告诉你，你猜测的数字比我选出的数字是大了还是小了。

思路：

- 二分搜索，同样具备“分、解、合”的特性。
- 考虑选择分而治之。

解题步骤：

- 分：计算中间元素，分割数组。
- 解：递归地在较大或者较小数组进行二分搜索。
- 合：不需要此步，因为在子数组中搜索到就返回。

代码实现：

```js
const guessNumber = function (n) {
  const rec = (low, high) => {
    if (low > high) return
    const mid = Math.floor((low + high) / 2)
    const res = guess(mid)
    if (res === 0) {
      return mid
    }
    if (res === 1) {
      return rec(mid + 1, high)
    }
    return rec(1, mid - 1)
  }
  return rec(1, n)
}
```

时间复杂度 O(logn)，空间复杂度 O(logn)

### 翻转二叉树

思路：

- 先翻转左右子树，再将子树换个位置。
- 符合“分、解、合”特性。
- 考虑分而治之
  解题步骤：

解题步骤：

- 分：获取左右子树。
- 解：递归地翻转左右子树。
- 合：将翻转后的左右子树换个位置放到根节点上。

代码实现：

```js
const invertTree = function (root) {
  if (!root) return null
  return {
    val: root.val,
    left: invertTree(root.right),
    right: invertTree(root.left)
  }
}
```
时间复杂度 O(n)，空间复杂度 O(n)

### 相同的树

leetcode 100

https://leetcode.cn/problems/same-tree/description/

给你两棵二叉树的根节点 p 和 q，编写一个函数来检验这两棵树是否相同。

如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。

思路：

- 两个树：根节点的值相同，左子树相同，右子树相同。
- 符合“分、解、合”特性。
- 考虑选择分而治之。

解题步骤：

- 分：获取两个树的左子树和右子树。
- 解：递归地判断两个树的左子树是否相同，右子树是否相同。
- 合：将上述结果合并，如果根节点的值也相同，树就相同。

代码实现：

```js
const isSameTree = function (p, q) {
  if (!p && !q) return true
  if (p && q && p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right)) {
    return true
  }
  return false
}
```

时间复杂度 O(n)，空间复杂度 O(n)

### 对称二叉树

leetcode 101

https://leetcode.cn/problems/symmetric-tree/description/

给你一个二叉树的根节点 root，检查它是否轴对称。

思路：

- 转化为：左右子树是否为镜像。
- 分解为：树 1 的左子树和树 2 的右子树是否为镜像，树 1 的右子树和树 2 的左子树是否镜像。
- 符合“分、解、合”特性，考虑选择分而治之。

解题步骤：

- 分：获取两个树的左子树和右子树。
- 解：递归地判断树 1 的左子树和树 2 的右子树是否为镜像，树 1 的右子树和树 2 的左子树是否镜像。
- 合：如果上述都成立，且根节点值也相同，两个树就镜像。

```js
const isSymmetric = function (root) {
  if (!root) return true
  const isMirror = (l, r) => {
    if (!l && !r) return true
    if (l && r && l.val === r.val && isMirror(l.left, r.right) && isMirror(l.right, r.left)) {
      return true
    }
    return false
  }
  return isMirror(root.left, root.right)
}
```

时间复杂度 O(n)，空间复杂度 O(n)。

## 动态规划

动态规划是算法设计的一种方法。它将一个问题分解为相互重叠的子问题，通过反复求解子问题，来解决原来的问题。

![img](../public/images/algorithm/img-01.png)

- 定义子问题：F(n) = F(n - 1) + F(n - 2)
- 反复执行：从 2 循环到 n，执行上述公式。

### 爬楼梯问题

leetcode 70

https://leetcode.cn/problems/climbing-stairs/description/

假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

思路：

- 爬到第 n 阶可以在第 n-1 阶爬 1 个台阶，或者在第 n-2 阶爬 2 个台阶。
- F(n) = F(n-1) + F(n-2)
- 使用动态规划。

解题步骤：

- 定义子问题：F(n) = F(n-1) + F(n-2)
- 反复执行：从 2 循环到 n，执行上述公式。

代码实现：

```js
const climbStairs1 = function (n) {
  if (n < 2) return 1
  const dp = [1, 1]
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
}
// 时间复杂度 O(n) 临时变量数组空间复杂度 O(n)

// 空数组改为两个变量，将空间复杂度下降至 O(1)
const climbStairs2 = function (n) {
  if (n < 2) return 1
  let dp0 = 1
  let dp1 = 1
  for (let i = 2; i <= n; i++) {
    const temp = dp0
    dp0 = dp1
    dp1 = dp0 + temp
  }
  return dp1
}
```

### 打家劫舍

leetcode 198

https://leetcode.cn/problems/house-robber/description/

你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下，一夜之内能够偷窃到的最高金额。

思路：

- f(k) = 从前 K 个房屋中能窃取的最大数额。
- Ak = 第 k 个房屋的钱数。
- f(k) = max(f(k-2)+Ak,f(k-1))
- 考虑动态规划

解题步骤：

- 定义子问题：f(k) = max(f(k-2)+Ak,f(k-1))。
- 反复执行：从 2 循环到 n，执行上述公式。

代码实现：

```js
const rob = function (nums) {
  if (nums.length === 0) return 0
  const dp = [0, nums[0]]
  for (let i = 2; i <= nums.length; i++) {
    dp[i] = Math.max(dp[i - 2] + nums[i - 1], dp[i - 1])
  }
  return dp[dp.length - 1]
}
```

## 贪心算法

贪心算法是算法设计中的一种方法。期盼通过每个阶段的局部最优选择，从而达到全局的最优。结果并不一定是最优。

### 分发饼干

leetcode 455

https://leetcode.cn/problems/assign-cookies/description/

假设你是一位很棒的家长，想要给你的孩子们一些小饼干。但是，每个孩子最多只能给一块饼干。

对每个孩子 `i`，都有一个胃口值 `g[i]`，这是能让孩子们满足胃口的饼干的最小尺寸；并且每块饼干 j，都有一个尺寸 `s[j]` 。如果 `s[j] >= g[i]`，我们可以将这个饼干 `j` 分配给孩子 `i` ，这个孩子会得到满足。你的目标是尽可能满足越多数量的孩子，并输出这个最大数值。

思路：

- 局部最优：既能满足孩子，还消耗最小。
- 先将“较小的饼干”分给“胃口最小”的孩子。
-
解题步骤：

- 对饼干数组和胃口数组升序排序。
- 遍历饼干数组，找到能满足第一个孩子的饼干
- 然后继续遍历饼干，找到满足第二、三、.....、n 个孩子的饼干。

代码实现：

```js
const findContentChildren = function (g, s) {
  const sortFunc = function (a, b) {
    return a - b
  }
  g.sort(sortFunc)
  s.sort(sortFunc)
  let i = 0
  s.forEach((n) => {
    if (n >= g[i]) {
      i++
    }
  })
  return i
}
```

### 买卖股票的最佳时机

leetcode 122

https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/description/

给你一个整数数组 prices，其中 `prices[i]` 表示某支股票第 i 天的价格。

在每一天，你可以决定是否购买和/或出售股票。你在任何时候 最多 只能持有 一股 股票。你也可以先购买，然后在同一天出售。

返回你能获得的最大利润。

思路：

- 前提：上帝视角，知道未来的价格。
- 局部最优：见好就收，见差不动，不做任何长远打算。

解题步骤：

- 新建一个变量，用来统计总利润。
- 遍历价格数组，如果当前价格。

代码实现：

```js
const maxProfit = function (prices) {
  let profit = 0
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      profit += prices[i] - prices[i - 1]
    }
  }
  return profit
}
```

## 回溯算法

- 回溯算法是算法设计的一种方法。
- 回溯算法是一种渐进式寻找构建问题解决的策略。
- 回溯算法会先从一个可能的动作开始解问题，如果不行，就回溯并选择另一个动作，直到问题解决。

什么问题适合回溯算法解决？

- 有很多路。
- 这些路里，有死路，也有出路。
- 通常需要递归模拟所有的路。

### 全排列

leetcode 46

https://leetcode.cn/problems/permutations/description/


思路：

- 要求：1、所有排列情况 2、没有重复元素
- 有出路、有死路
- 考虑回溯算法

解题步骤：

- 有递归模拟所有的情况。
- 遇到包含重复元素的情况，就回溯。
- 收集所有到达递归的情况，并返回。

代码实现：

```js
const permute = function (nums) {
  const res = []
  const backtrack = (path) => {
    // 返回函数
    if (path.length === nums.length) {
      // 长度相等就返回
      res.push(path)
      return
    }
    nums.forEach((n) => {
      if (path.includes(n)) {
        // 不能包含一模一样的数字
        return
      }
      backtrack(path.concat(n))
    })
  }
  backtrack([])
  return res
}
```

### 子集问题

leetcode 78

https://leetcode.cn/problems/subsets/description/

给你一个整数数组 `nums`，数组中的元素互不相同。返回该数组所有可能的子集（幂集）。

解集不能包含重复的子集。你可以按任意顺序返回解集。

思路：

- 要求：1、所有子集；2、没有重复元素
- 有出路、有死路。
- 考虑使用回溯算法。

解题步骤：

- 用递归模拟出所有情况
- 保证接的数字都是后面的数字。
- 收集所有到达递归终点的情况，并返回。

代码实现：

```js
const subsets = function (nums) {
  const res = []
  const backtrack = (path, l, start) => {
    if (path.length === l) {
      res.push(path)
      return
    }
    for (let i = start; i < nums.length; i++) {
      backtrack(path.concat(nums[i]), l, i + 1)
    }
  }
  for (let i = 0; i <= nums.length; i++) {
    backtrack([], i, 0)
  }
  return res
}
```
