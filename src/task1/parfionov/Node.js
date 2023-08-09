let id = 0;
let length = 0
let lastAddedNode = null

export class Node {
    id;
    length;
    name;
    firstChild = null;
    parent = null;
    next = null;
    prev = null;

    constructor(name = null) {
        this.id = id++;
        this.name = name;
        this.length = length;

    }

    add(...childrens) {
        childrens.forEach((child) => {
            child.parent = this;
            if (!this.length) {
                this.firstChild = child;
                child.next = null;
                child.prev = null;
            } else {
                child.next = null;
                child.prev = lastAddedNode;
                child.prev.next = child;
            }

            this.length++;
            lastAddedNode = child;
        });
    }

    traverse(cb) {
        for (let node = this.firstChild; node !== null; node = node.next) {
            cb(node);
        }
    }

    remove() {
        if (!this.prev && !this.next) {
            console.log('Err, this is root Node')
            return
        }
        if (!this.prev) {
            this.parent.firstChild = this.next;
            this.next.prev = null
            this.next = null
        } else {
            this.prev.next = this.next
            this.next.prev = this.prev
            this.next = null
            this.prev = null
        }
        this.parent.length--
    }

    removeChild(id = null) {
        if (!this.firstChild) {
            console.log('I had no children')
            return
        }
        if (!id) {
            console.log('where is id?')
            return
        }
        this.traverse((node) => {
            if (id === node.id) {
                node.remove()
            }
        })
    }

    getNext() {
        return this.next ? this.next : 'next not found'
    }

    getPrev() {
        return this.prev ? this.prev : 'prev not found'
    }
};
