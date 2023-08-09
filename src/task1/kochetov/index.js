import { Node } from './Node.js';

const node = new Node();
const node2 = new Node();
const node3 = new Node();
const node4 = new Node();
const node5 = new Node();
const node6 = new Node();
const node7 = new Node();

node.add(node2);
node.add(node3);
node.add(node5);
node.add(node6);
node.add(node7);
node2.add(node4);

node.remove(4);

node.each((node) => {
	console.log(node);
});

console.log(node);
