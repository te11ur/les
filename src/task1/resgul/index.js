import {Node} from './Node.js'

// debbug
const node0 = new Node();
const node1 = new Node();
const node2 = new Node();
const node3 = new Node();
const node4 = new Node();
// выдаст ошибку из-за node4
node4.add(node0, node3, node2, node4);
// выдаст ошибку из-за node1
node0.remove(node1);
node4.each((child, i) => {
  console.log('each_test: ', child.name, i);
})

// node0.id = 37;

console.log('node4_children: ', node4.children);
console.log('prev_of_node3: ', node3.prev);
console.log('next_of_node3: ', node3.next);
console.log('next_of_node4: ', node4.next);