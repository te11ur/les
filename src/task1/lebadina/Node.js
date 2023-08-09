import {uid} from "./uid.js";

export class Node {
    id = uid();

    next = null;
    prev = null;
    child = null;
    parent = null;

    constructor() {

    }

    add(...args) {
        args.forEach(child => {
            if (!this.child) {
                this.child = child
                child.parent = this;
            } else {
                let currChild = this.child;
                while (currChild.next) {
                    currChild = currChild.next;
                }
                currChild.next = child;
                child.prev = currChild;
                child.parent = this;
            }
        })
    }

    getChildren() {
        const children = [];
        if (this.child) {
            children.push(this.child);
            let next = this.child.next
            while (next) {
                children.push(next);
                next = next.next
            }
        }
        return children
    }

    each(cb) {
        if (this.child) {
            let next = this.child
            while (next) {
                cb(next);
                next = next.next
            }
        }
    }

    traverse(cb) {
        if (this.child) {
            let next = this.child
            while (next) {
                cb(next);
                next.traverse(cb)
                next = next.next
            }
        }
    }

    swap(id1, id2){
        let node1 = this.findChild(id1);
        let node2 = this.findChild(id2);
        if(!node1 || !node2) return;

        let bufNode = {};
        Object.assign(bufNode, node2)

        node2.child = node1.child;
        node1.child = bufNode.child;

        Object.assign(node2, {id: node1.id})
        Object.assign(node1, {id: bufNode.id})
        // Object.assign(node2, node1)

        // node1.next && (node1.next.prev = node2);
        // node1.prev && (node1.prev.next = node2);
        // node2.next && (node2.next.prev = node1);
        // node2.prev && (node2.prev.next = node1);

    }
    findChild(id) {
        if (this.id === id) return this;

        if (this.next) {
            if (this.next.id !== id) {
                let subNext = this.next.findChild(id);
                if (subNext) return subNext
            } else {
                return this.next
            }
        }
        if (this.child) {
            if (this.child.id !== id) {
                let subChild = this.child.findChild(id);
                if (subChild) return subChild
            } else {
                return this.child
            }
        }
        return null;
    }

    remove(id) {
        const child = this.findChild(id);
        if (!child) return;

        if(child.child){
            child.each((i) => {
                let id = i.id;
                i.parent.remove(id)
            })
        }

        if (child.parent && child.parent !== this) {
            child.parent.remove(id);
        } else {
            const prev = child.prev;
            const next = child.next;

            if (child === this.child && next) {
                this.child = next;
            }
            prev && (prev.next = next)
            next && (next.prev = prev)
        }

    }

    getHtml(params = {}) {
        const {
            position = {x: 0, y: 0},
            width = 1000,
            cb = null
        }
            = params;
        const elem = document.createElement('div');
        elem.style.border = '3px solid green';
        elem.style.borderRadius = '30px';
        elem.style.hight = '50px';
        elem.style.width = `${width}px`;
        elem.style.position = 'absolute';
        elem.style.top = `${position.y}px`;
        elem.style.left = `${position.x}px`;
        elem.style.textAlign = 'center';
        elem.style.boxSizing = 'border-box';
        elem.style.backgroundColor = '#CCCCCC';
        elem.innerText = this.id;
        cb && elem.addEventListener('click', () => cb(this));

        return elem;
    }

    renderElem(params = {}) {
        const {
            position = {x: 0, y: 0},
            width = 500,
            cb = null
        }
            = params;
        document.body.appendChild(this.getHtml({position, width, cb}));
        const childrenLength = this.getChildren().length;

        if (this.next) {
            this.next.renderElem({
                position: {x: position.x + width - 10, y: position.y},
                width: width,
                cb
            });
        }

        if (this.child) {
            this.child.renderElem({
                position: {x: position.x, y: position.y + 80},
                width: width / childrenLength,
                cb
            });
        }
    }
}