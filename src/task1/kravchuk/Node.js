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

      if (nextChild) {
        nextChild.prev = child;
        child.next = nextChild;
      }

      this.children = child;
      child.parent = this;
    });
  }

  /**
   * Delete self
   * @returns {Node} self node
   */
  removeSelf() {
    const { next, prev, parent } = this;

    this.parent = this.next = this.prev = null;

    if (!prev) {
      // этот первый — следующий становится первым
      if (parent.children === this) {
        parent.children = next;
        return this;
      }

      // ошибка в структуре
      throw Error("don't have prev and isn't first");
    }

    // нету следующего — у предыдущего обнуляем next
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
   * @returns {Node} removed child
   */
  removeChild(child) {
    if (!(child instanceof Node)) {
      throw Error('child should be instanceof Node');
    }

    if (isNumber(child)) {
      let next = children;
      do {
        if (next.id === child) {
          return next.removeSelf();
          break;
        }
        next = next.next;
      } while (next);
    } else {
      return child.removeSelf();
    }
  }

  /**
   * @param {Function} fn - handler function
   */
  eachSibling(fn) {
    if (!isFunction(fn)) {
      throw Error('argument must be a function');
    }

    const first = getFirstSibling(this);

    eachNode(first, fn);
  }

  /**
   * @param {Function} fn - handler function
   */
  eachChild(fn) {
    if (!isFunction(fn)) {
      throw Error('argument must be a function');
    }

    eachNode(this.children, fn);
  }

  /**
   * Revers childrens chain
   */
  reverseChildren() {
    let current = this.children;
    let next, prev;

    do {
      next = current.next;
      prev = current.prev;

      current.prev = next;
      current.next = prev;

      if (next) {
        current = next;
      }
    } while (next);

    this.children = current;
  }

  /**
   * Swap any nodes
   * @param {Node} node1
   * @param {Node} node2
   */
  swap(node1, node2) {
    if (!(node1 instanceof Node && node1 instanceof Node)) {
      throw Error('both arguments should be instanceof Node');
    }

    swapNodes(node1, node2);
  }

  swapSelf(node) {
    swapNodes(this, node);
  }
}

const swapNodes = (node1, node2) => {
  const parent1 = node1.parent;
  const parent2 = node2.parent;
  if (parent1) parent1.children = node2;
  if (parent2) parent2.children = node1;
  node1.parent = parent2;
  node2.parent = parent1;

  const children1 = node1.children;
  const children2 = node2.children;
  if (children1) children1.parent = node2;
  if (children2) children2.parent = node1;
  node2.children = children1;
  node1.children = children2;

  const next1 = node1.next;
  const next2 = node2.next;
  if (next1) next1.prev = node2;
  if (next2) next2.prev = node1;
  node2.next = next1;
  node1.next = next2;

  const prev1 = node1.prev;
  const prev2 = node2.prev;
  if (prev1) prev1.next = node2;
  if (prev2) prev2.next = node1;
  node1.prev = prev2;
  node2.prev = prev1;
};

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
    first = node;
    while (first.prev) {
      first = first.prev;
    }
  }

  return first;
};
