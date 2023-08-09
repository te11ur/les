import { uid } from "./uid.js";

export class Node {
  constructor(name) {
    this.name = name;
    this.previous = null;
    this.next = null;
    this.parent = null;
    this.id = uid();
    this.children = null;
    this.length = 0;
  }

  add = (child) => {
    const newChild = child;
    newChild.parent = this;
    // if (!newChild.id) newChild.id = uid();
    this.length++;
    if (!this.children) {
      this.children = {};
    }
    this.children[`${newChild.id}`] = newChild;
    this._updateChildren();
  };

  remove = (child) => {
    Object.keys(this.children).forEach((key) => {
      if (parseInt(key) === child.id) {
        // delete this.children[key].id;
        delete this.children[key];
      }
    });
    this._updateChildren();
  };

  each = (cb) => {
    for (let key in this.children) {
      cb && cb(this.children[key]);
      if (this.children[key].children) {
        this.children[key].each(cb);
      }
    }
  };

  _updateChildren = () => {
    const childrenArr = Object.values(this.children).sort(
      (a, b) => a.id - b.id
    );
    for (let i = 0; i < childrenArr.length; i++) {
      childrenArr[i].previous = childrenArr[i - 1] ? childrenArr[i - 1] : null;
      childrenArr[i].next = childrenArr[i + 1] ? childrenArr[i + 1] : null;
    }
  };
}
