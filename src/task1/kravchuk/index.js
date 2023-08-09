// class Node {id, next,prev,children,parent}
// add, remove, each

import { Node } from './Node.js';

const rootNode = new Node('root');

const child_11 = new Node('child_11');
const child_12 = new Node('child_12');
const child_13 = new Node('child_13');
const child_14 = new Node('child_14');
const child_15 = new Node('child_15');

const child_21 = new Node('child_21');
const child_22 = new Node('child_22');
const child_23 = new Node('child_23');
const child_24 = new Node('child_24');
const child_25 = new Node('child_25');

rootNode.add(child_11, child_12, child_13, child_14, child_15);

child_11.add(child_21);
child_12.add(child_22);
child_22.add(child_23);
child_23.add(child_24);
child_13.add(child_25);

// child_23.removeSelf();
// console.log(child_23);

/* child_23.swapSelf(child_13);
console.log(child_23);
console.log(child_23.children === child_25);
console.log(child_13.children === child_24);
console.log(child_24.parent === child_13);
console.log(child_25.parent === child_23); */

// l1Child5.removeSelf();
// console.log(l1Child5);

// rootNode.removeChild(l1Child4);
// console.log(l1Child4);

// rootNode.eachChild((child) => console.log(child.value));
// l1Child1.eachSibling((sibling) => console.log(sibling.value));

/* rootNode.eachChild((child) => console.log(child.value));
rootNode.reverseChildren();
console.log('--//--');
rootNode.eachChild((child) => console.log(child.value));
console.log(rootNode.children); */

rootNode.eachSuccessor((node) => console.log(node.value));
