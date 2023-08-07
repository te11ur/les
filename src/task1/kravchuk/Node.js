import { isFunction } from '../../utils/types/isFunction.js';
import { isNumber } from '../../utils/types/isNumber.js';

let id = 0;

export class Node {
  id;
  value;
  next = null;
  prev = null;
  children = null;
  parent = null;

  constructor(value = null) {
    this.id = id++;
    this.value = value;
  }

  add(...children) {
    children.forEach((child) => {
      const nextChild = this.children;
      this.children = child;
      child.next = nextChild;
      child.parent = this;
    });
  }

  removeSelf() {
    const { next, prev, parent } = this;

    console.log(next, prev, parent);

    if (!prev) {
      // этот первый — следуюзий становится первым
      if (parent.children === this) {
        parent.children = next;
        return this;
      }

      // ошибка в структуре
      throw Error("don't have prev and isn't first");
    }

    // нету следующего — у предыдузего обнуляем next
    if (!next) {
      prev.next = null;
      return this;
    }

    prev.next = next;
    next.prev = prev;
    return this;
  }

  /**
   *
   * @param {number|Node} child - child id or child itself
   */
  removeChild(child) {
    if (isNumber(child)) {
      let targetNode;
    } else {
      child.removeSelf();
    }
  }

  eachSibling(fn) {
    if (!isFunction(fn)) throw Error('argument must be a function');

    const first = getFirstSibling(this);

    eachNode(first, fn);
  }

  eachChild(fn) {
    if (!isFunction(fn)) throw Error('argument must be a function');

    eachNode(this.children, fn);
  }
}

const eachNode = (firstNode, fn) => {
  let next = firstNode;
  do {
    fn(next);
    next = next.next;
  } while (next);
};

const getFirstSibling = (node) => {
  let first;

  if (node.parent) {
    first = node.parent.children;
  } else {
    while (first.prev) {
      first = first.prev;
    }
  }

  return first;
};
