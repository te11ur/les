let nodeId = 0;

export class Node {
	id = nodeId++;
	next = null;
	prev = null;
	parent = null;
	children = null;
	last = null;
	count = 0;

	add(node) {
		if (this === node.parent) {
			return this;
		}

		if (node.parent) {
			node.parent.remove(node);
		}

		node.parent = this;
		node.prev = null;
		node.next = this.children;

		if (this.children) {
			this.children.prev = node;
		}

		this.children = node;

		if (!this.last) {
			this.last = node;
		}

		this.count++;

		return this;
	}

	remove(node) {
		if (this !== node.parent) {
			return this;
		}

		const {
			prev,
			next,
		} = node;

		node.parent = null;

		if (prev) {
			prev.next = next;
		} else {
			this.children = next;
		}

		if (next) {
			next.prev = prev;
		} else {
			this.last = prev;
		}

		node.prev = null;
		node.next = null;

		this.count--;

		return this;
	}

	swap(node1, node2) {
		if (node1 === node2 || this !== node1.parent || this !== node2.parent) {
			return this;
		}

		const {
			prev: prev1,
			next: next1,
		} = node1;

		const {
			prev: prev2,
			next: next2,
		} = node2;

		if (prev1) {
			prev1.next = node2;
		}

		if (next1) {
			next1.prev = node2;
		}

		if (prev2) {
			prev2.next = node1;
		}

		if (next2) {
			next2.prev = node1;
		}

		if (this.children === node1) {
			this.children = node2;
		} else if (this.children === node2) {
			this.children = node1;
		}

		if (this.last === node1) {
			this.last = node2;
		} else if (this.last === node2) {
			this.last = node1;
		}

		return this;
	}

	revers(deep = true) {
		if (this.children !== this.last) {
			let node = this.children = this.last;
			let p = node;
			node = node.prev;

			while (node !== null) {
				const k = node.prev;
				p.next = node;
				node.prev = p;

				if (k) {
					p = node;
				} else {
					node.next = null;
					this.last = node;
				}

				node = k;
			}
		}

		if (deep) {
			for (let node = this.children; node !== null; node = node.next) {
				node.revers(deep);
			}
		}

		return this;
	}

	travers(cb, data) {
		for (let node = this.children; node !== null; node = node.next) {
			const d = cb(node, data);

			node.travers(cb, d);
		}
	}

	traversBack(cb, data) {
		for (let node = this.last; node !== null; node = node.prev) {
			const d = cb(node);

			node.traversBack(cb, d);
		}
	}
}