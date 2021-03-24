import Graph from './graph';
// ---------------- 封装的图构测试 ---------------- //
console.log('// ----- 图结构测试 START -----//');


// 测试代码
let graph = new Graph()
// 添加顶点
let myVertexes = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
for (let i = 0; i < myVertexes.length; i++) {
    graph.addVertex(myVertexes[i])
}
// 添加边
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');
// 输出图结构
console.log(graph.toString())


// 调用广度优先算法
let result = ""
graph.bfs(function (v) {
    result += v + " "
})
// 输出广度优先
console.log(result) // A B C D E F G H I 

// 调用深度优先算法
result = ""
graph.dfs(function (v) {
    result += v + " "
})
// 输出深度优先
console.log(result)  //A B E I F C D G H

console.log('// ----- 图结构测试 END -----//');