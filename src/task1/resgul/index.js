import {newID} from './newID.js'

const Nodes = new Map();

// {id, next,prev,children,parent}
class Node {
  id = 0;
  parent = null;
  children = new Map();

  constructor() {
    this.id = newID();

    Nodes.set(this.id, this);
  };

  add(node) {
    this.children.set(node.id, node);
  };

  remove(id) {
    this.children.delete(id);
  };

  next() {

  };

  prev() {

  };

  eachChild(cb) {
    for (let i = 0; i < this.children.size - 1; i++) {
      

    };
  };

};

const node1 = new Node();

console.log(Nodes);
