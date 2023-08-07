// class Node {id, next,prev,children,parent}
// add, remove, each

import { Node } from './Node.js';

const rootNode = new Node('root');

const l1Child1 = new Node('level1');
const l1Child2 = new Node('level1');
const l1Child3 = new Node('level1');
const l1Child4 = new Node('level1');
const l1Child5 = new Node('level1');

rootNode.add(l1Child1, l1Child2, l1Child3, l1Child4, l1Child5);

// l1Child5.removeSelf();
rootNode.removeChild(l1Child4);

// console.log(l1Child4);
