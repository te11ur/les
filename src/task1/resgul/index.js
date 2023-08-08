import {newID} from './newID.js'

const WRAPPER = [];
WRAPPER.name = 'WRAPPER';

// {id, next,prev,children,parent}
class Node {
  id = 0;
  parent = null;
  children = [];

  constructor(parent) {
    this.id = newID();
    this.name = `node_` + this.id;
    // определение родителя
    if (parent) {
      this.parent = parent;
      parent.add(this);
    } else {
      this.parent = WRAPPER;
      this.parent.push(this);
    };
  };

  add(nodes) {
    // возможность добавлять несколько нод за раз
    for (let i = 0; i < arguments.length; i++) {
      const node = arguments[i];
      if (this === node) {
        console.error('попытка добавить node в самого себя');
        break;
      }
      
      // удаление из предыдущего родителя
      if (Array.isArray(node.parent)) {
        const removeNode = this.remove.bind(WRAPPER);
        removeNode(node, false);
      } else node.parent.remove(node, false);

      // назначение нового родителя и добавляю в новых чилдов
      node.parent = this;
      this.children.push(node);
    };
  };

  remove(node, completely = true) {
    const removeCompletely = completely;
    const children = (Array.isArray(this)) ? this : this.children;
    const index = children.indexOf(node);

    if (index === -1) {
      console.error('попытка удалить node, которго нет в чилдренах');
      return;
    }
    // удаление элемента из чилдов текщего перента
    children.splice(index, 1);
    // если полное удаление, а не перемещение
    if (removeCompletely) {
      for (let prop in node) delete node[prop];
    };
  };

  get next() {
    const children = Array.isArray(this.parent) ? this.parent : this.parent.children;
    const index = children.indexOf(this);
    const nextElement = (index > -1 && children[index + 1]) ? 
    children[index + 1] : null;
    return nextElement;
  };

  get prev() {
    const children = Array.isArray(this.parent) ? this.parent : this.parent.children;
    const index = children.indexOf(this);
    const prevElement = (index > -1 && children[index - 1]) ? 
    children[index - 1] : null;
    return prevElement;
  };

  each(cb) {
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      cb?.(child, i);
    };
  };
};

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

console.log('node4_children: ', node4.children);
console.log('prev_of_node3: ', node3.prev);
console.log('next_of_node3: ', node3.next);
console.log('next_of_node4: ', node4.next);
console.log('wrapper_arr: ', WRAPPER);