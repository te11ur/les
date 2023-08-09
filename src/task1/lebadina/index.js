import {Node} from "./Node.js";

const rootNode = new Node();//id 1

const сhildNode2 = new Node();//id 2
const сhildNode3 = new Node();//id 3

const сhildNode4 = new Node();//id 4
const сhildNode5 = new Node();//id 5
const сhildNode6 = new Node();//id 6
const сhildNode7 = new Node();//id 7

const сhildNode8 = new Node();//id 8
const сhildNode9 = new Node();//id 9
const сhildNode10 = new Node();//id 10
const сhildNode11 = new Node();//id 11
const сhildNode12 = new Node();//id 12
const сhildNode13 = new Node();//id 13


rootNode.remove(4)
//              1
//          2             3
//    5     6     7       4
//        11 12          8 9

сhildNode3.add(сhildNode4);
сhildNode4.add(сhildNode8, сhildNode9);
сhildNode6.add(сhildNode11, сhildNode12);
сhildNode2.add(сhildNode5, сhildNode6, сhildNode7);
rootNode.add(сhildNode2, сhildNode3, сhildNode13);

document.body.style.width = '100%';
document.body.style.height = '100%';
document.body.style.position = 'relative';
const clearRender = () => document.body.innerHTML = '';

//add(...args) - добавляет в ноду чайлов, в связанный лист
//remove(id) - на parent (любой вложенности)
//getChildren() - перебирает связанный список и возвращает чайлов массивом
//each(cb) - первый уровень чайлдов
//traverse(cb) - все чайлды
//findChild(id) - на parent (любой вложенности)
//swap(id1, id2) - меняет местами двух чайлдов одного parent
//renderElem(params = {}) - рисует иерархию чайлов

// сhildNode2.traverse((i) => console.log(i))
// сhildNode4.each((i) => console.log(i))

const cb = (node) => {console.log(node)}
rootNode.renderElem({cb});


rootNode.swap(3, 13);
сhildNode2.swap(6, 7);
rootNode.swap(2, 3);
// rootNode.remove(3);

clearRender();
rootNode.renderElem({cb});
