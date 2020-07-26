import Queue from './queue.js';

// 利用队列结构的特点实现击鼓传花游戏求解方法的封装
export default function passGame(nameList, number) {
  // 1、new 一个 Queue 对象
  const queue = new Queue();

  // 2、将 nameList 里面的每一个元素入队
  for (const name of nameList) {
    queue.enqueue(name);
  }

  // 3、开始数数
  // 队列中只剩下 1 个元素时就停止数数
  while (queue.size() > 1) {
    // 不是 number 时，重新加入到队尾
    // 是 number 时，将其删除

    for (let i = 0; i < number - 1; i++) {
      // number 数字之前的人重新放入到队尾（即把队头删除的元素，重新加入到队列中）
      queue.enqueue(queue.dequeue());
    }

    // number 对应这个人，直接从队列中删除
    // 由于队列没有像数组一样的下标值不能直接取到某一元素，
    // 所以采用，把 number 前面的 number - 1 个元素先删除后添加到队列末尾，
    // 这样第 number 个元素就排到了队列的最前面，可以直接使用 dequeue 方法进行删除
    queue.dequeue();
  }

  // 4、获取最后剩下的那个人
  const endName = queue.front();

  // 5、返回这个人在原数组中对应的索引
  return nameList.indexOf(endName);
}
