let id = 0;

export class Node {
	constructor() {
		const resultId = id++;

		this.id = resultId;

		this.parent = null;
		this.children = null;
		this.next = null;
		this.prev = null;
	}

	add(newNode) {
		///this пред нода
		if (!this.children) {
			this.children = newNode;
		} else {
			this.children.prev = newNode;
			newNode.next = this.children;
		}

		this.children = newNode;
		newNode.parent = this;
	}

	remove(id) {
		const getNode = (id) => {
			let currentNode = this;

			while (currentNode) {
				if (currentNode.id === id) {
					return currentNode;
				}

				if (currentNode.next && currentNode.next.id === id) {
					return currentNode.next;
				} else if (currentNode.children && currentNode.children.id === id) {
					return currentNode.children;
				}

				if (currentNode.next) {
					currentNode = currentNode.next;
				} else if (currentNode.children) {
					currentNode = currentNode.children;
				} else {
					currentNode = currentNode.next;
				}
			}

			return null;
		};

		const node = getNode(id);

		if (!node) {
			console.log(`Node with this ID: ${id} does not exist.`);
			return;
		}

		if (node.prev && node.parent === node.prev.parent) {
			node.prev.next = node.next;
		}

		if (node.next && node.parent === node.next.parent) {
			node.next.prev = node.prev;
		}
	}

	each(cb) {
		if (!cb) {
			return;
		}

		let currentNode = this;

		if (!currentNode.next) {
			currentNode = currentNode.children;
		}

		while (currentNode) {
			cb(currentNode);
			currentNode = currentNode.next;
		}
	}
}
