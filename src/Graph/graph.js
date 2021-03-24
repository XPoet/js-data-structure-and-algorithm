import Dictionay from "../Map/map"
import Queue from "../Queue/queue"
// 封装图类
export default class Graph {
    constructor() {
        this.vertexes = []    // 存储顶点
        this.adjList = new Dictionay()   //存储边信息
    }
    // 添加顶点
    addVertex(val) {
        // 添加点
        this.vertexes.push(val)
        // 添加点的关系  采用邻接矩阵法 结构用set
        this.adjList.set(val, [])
    }

    // 添加边
    addEdge(val1, val2) {
        // 添加边需要传入两个顶点, 因为边是两个顶点之间的边, 边不可能单独存在.
        // 这里实现的是无向图, 所以这里不考虑方向问题
        this.adjList.get(val1).push(val2)
        this.adjList.get(val2).push(val1)
    }

    // 输出图结构
    toString() {
        let res = ''
        for (let i = 0; i < this.vertexes.length; i++) {
            res += this.vertexes[i] + "->"
            let adj = this.adjList.get(this.vertexes[i])
            for (let j = 0; j < adj.length; j++) {
                res += adj[j] + ""
            }
            res += "\n"
        }
        return res
    }

    // 初始化顶点的颜色
    _initializeColor() {
        // 白色: 表示该顶点还没有被访问.
        // 灰色: 表示该顶点被访问过, 但并未被探索过.
        // 黑色: 表示该顶点被访问过且被完全探索过.
        let colors = []
        for (let i = 0; i < this.vertexes.length; i++) {
            colors[this.vertexes[i]] = "white"
        }
        return colors
    }

    // 广度优先搜索
    bfs(handle) {
        // 1.初始化颜色
        let color = this._initializeColor()
        // 2. 创建队列
        let queue = new Queue
        // 3. 将传入的顶点放入队列
        queue.enqueue(this.vertexes[0])
        // 4.依赖队列操作数据   队列不为空时一直持续
        while (!queue.isEmpty()) {
            // 4.1 拿到队头
            let qVal = queue.dequeue()
            //  4.2 拿到队头所关联（相连）的点并设置为访问中状态（灰色）
            let qAdj = this.adjList.get(qVal)
            color[qVal] = "gray"
            // 4.3 将队头关联的点添加到队尾
            // 这一步是完成bfs的关键，依赖队列的先进先出的特点。
            for (let i = 0; i < qAdj.length; i++) {
                let a = qAdj[i]
                if (color[a] === "white") {
                    color[a] = "gray"
                    queue.enqueue(a)
                }
            }
            // 4.5设置访问完的点为黑色。
            color[qVal] = "black"
            if (handle) [
                handle(qVal)
            ]
        }
    }

    // 深度优先搜索
    dfs(handle) {
        // 1.初始化颜色
        let color = this._initializeColor()
        // 2. 遍历所有顶点，开始访问
        for (let i = 0; i < this.vertexes.length; i++) {
            if (color[this.vertexes[i]] === "white") {
                this._dfsVisit(this.vertexes[i], color, handle)
            }
        }
    }
    // dfs的递归方法  这里直接使用函数的调用栈
    _dfsVisit(val, color, handle) {
        // 1. 将颜色设置为访问中
        color[val] = "gray"
        // 2. 执行相应的回调
        if (handle) {
            handle(val)
        }
        // 3. 拿与该点相邻的点，对每个点操作
        let adj = this.adjList.get(val)
        for (let i = 0; i < adj.length; i++) {
            let w = adj[i]
            // 如果相邻点未未访问状态，开始访问。
            if (color[w] === "white") {
                this._dfsVisit(w, color, handle)
            }
        }
        // 4. 处理完后设置为访问过点。
        color[val] = "black"
    }
}