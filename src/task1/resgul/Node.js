import {newID} from './newID.js'

const WRAPPER = [];
WRAPPER.name = 'WRAPPER';

// {id, next,prev,children,parent}
export class Node {
  parent = null;
  children = [];

  constructor(parent) {
    this._id = newID();
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

  get id() {
    return this._id;
  };

  each(cb) {
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      cb?.(child, i);
    };
  };
};
