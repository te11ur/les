import {Node} from './Node.js';

const rootNode = new Node('root');
const FirstChild1 = new Node('child1')
const FirstChild2 = new Node('child2')
const FirstChild3 = new Node('child3')
const FirstChild4 = new Node('child4')

rootNode.add(FirstChild1, FirstChild2, FirstChild3, FirstChild4);
// FirstChild1.remove()
// FirstChild2.remove()
// FirstChild1.getNext()
// FirstChild1.getPrev()
// rootNode.traverse((node)=> {
//     console.log(node.name)
// })
rootNode.removeChild(2)
// console.log(rootNode)
