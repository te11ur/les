import {newID} from './newID.js'

const Nodes = new Map();

// {id, next,prev,children,parent}
class Node {
  id = 0;
  parent = null;
  children = new Map();
  name = '';

  constructor(parent) {
    this.id = newID();
    this.name = `нод с id = ${this.id}`;

    if (parent) this.parent = parent;
    else this.parent = Nodes;

    Nodes.set(this.id, this);
  };

  add(nodes) {
    // возможность добавлять несколько нод за раз
    for (let i = 0; i < arguments.length; i++) {
      const node = arguments[i];
      // добавления текущего нода в коллекцию
      this.children.set(node.id, node);
      // удаление предыдущего родителя, если есть
      if (node.parent.remove) node.parent.remove(node);
      if (node.parent.delete) node.parent.delete(node.id);
      // назначение нового родителя
      node.parent = this;
    };
  };

  remove(node) {
    this.children.delete(node.id);
  };

  get next() {
    const mapWithNeighbors = this.parent.children;
    const keys = mapWithNeighbors.keys();
    return keys.next();
  };

  prev() {

  };

  eachChild(cb) {
    let i = 0;
    const keys = this.children.keys();

    for (let key of keys) {
      const child = this.children.get(key);
      cb?.(child, i++);
    };
  };
};

// тест
const node1 = new Node();

const nodeChild1 = new Node();
const nodeChild2 = new Node();

const node2 = new Node();
const node3 = new Node();
const node4 = new Node();
const node5 = new Node();
const node6 = new Node();
const node7 = new Node();

// добавить в node1 два чилда
node1.add(nodeChild1, nodeChild2, node4);
// забрать одного чилда в node3
node3.add(nodeChild2);
// добавить нод с собственными чилдами в другой нод
node3.add(node1, nodeChild1, node2);
// удалить чилда
node3.remove(nodeChild2);
// форыч
node3.eachChild((child, i) => {
  console.log(child, i)
});


console.log(Nodes);

console.log(node4.next);
console.log(node4.next);
console.log(node4.next);
