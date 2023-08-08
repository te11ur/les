// class Node {id, next,prev,children,parent}
// add, remove, each

import { Node } from './Node.js';

const rootNode = new Node('root');

const l1Child1 = new Node('level1_1');
const l1Child2 = new Node('level1_2');
const l1Child3 = new Node('level1_3');
const l1Child4 = new Node('level1_4');
const l1Child5 = new Node('level1_5');

rootNode.add(l1Child1, l1Child2, l1Child3, l1Child4, l1Child5);

// l1Child5.removeSelf();
// console.log(l1Child5);

// rootNode.removeChild(l1Child4);
// console.log(l1Child4);

// rootNode.eachChild((child) => console.log(child.value));
// l1Child1.eachSibling((sibling) => console.log(sibling.value));

rootNode.eachChild((child) => console.log(child.value));
rootNode.reverseChildren();
console.log('-\\\\-//-\\\\-//-');
rootNode.eachChild((child) => console.log(child.value));
console.log(rootNode.children);
