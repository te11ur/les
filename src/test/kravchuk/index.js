export const HELLO = 'hello';

// class Node {id, next,prev,children,parent}
// add, remove, each

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  add(value) {
    const newNode = new Node(value);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;

      this.tail = newNode;
    }

    this.length++;
  }

  insert(position, value) {
    if (position < 0 || this.length < position) {
      return false;
    }

    let node = new Node(value);

    if (position === 0) {
      node.next = this.head;
      this.head.prev = node;

      this.head = node;
    } else if (position === this.length) {
      this.tail.next = node;
      node.prev = this.tail;

      this.tail = node;
    } else {
      let current = this.head;
      let prev = null;
      let index = 0;

      while (index < position) {
        prev = current;
        current = current.next;
        index++;
      }

      prev.next = node;
      node.prev = prev;

      node.next = current;
      current.prev = node;
    }

    this.length++;
  }

  removeAt(position) {
    if (position < 0 || this.length <= position) {
      return null;
    }

    let current;

    if (position === 0) {
      current = this.head;

      this.head = this.head.next;
      this.head.prev = null;
    } else if (position === this.length - 1) {
      current = this.tail;

      this.tail = this.tail.prev;
      this.tail.next = null;
    } else {
      current = this.head;

      let prev = null;
      let index = 0;

      while (index < position) {
        prev = current;
        current = current.next;
        index++;
      }

      prev.next = current.next;
      current.next.prev = prev;
    }

    this.length--;
    return current.value;
  }

  remove(element) {
    this.removeAt(this.indexOf(element));
  }

  indexOf(element) {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.value === element) {
        return index;
      }

      current = current.next;
      index++;
    }

    return -1;
  }

  get(position) {
    if (position < 0 || this.length <= position) {
      return null;
    }

    let current = this.head;
    let index = 0;

    while (index < position) {
      current = current.next;
      index++;
    }

    return current.value;
  }

  isEmpty() {
    return this.length === 0;
  }

  size() {
    return this.length;
  }

  print() {
    let current = this.head;

    while (current) {
      console.log(current.value);
      current = current.next;
    }
  }
}

function addItem() {
  console.log('\n---Add Item---');

  list.add({ a: 1 });
  list.add({ a: 2 });
  list.add({ a: 3 });

  list.insert(2, payload);

  list.insert(0, { a: 5 });
  list.insert(5, { a: 6 });

  list.print();
}

function getItem() {
  console.log('\n---Get Item---');

  console.log('get(4):', list.get(4));
  console.log('get(0):', list.get(0));
  console.log('get(-5):', list.get(-5));

  console.log('indexOf {a: 5}:', list.indexOf({ a: 5 }));
  console.log('indexOf payload:', list.indexOf(payload));
}

function removeItem() {
  console.log('\n---Remove Item---');

  console.log('Before:');
  list.print();

  list.remove(payload);

  console.log('After:');
  list.print();
}
