let id = 0;

export class Node {
	id;
	next = null;
	prev = null;
	children = null;
	parent = null;

	constructor() {
		this.id = id++;
	}

	add(argument) {
		if (this.children) {
			this.children.prev = argument;
			argument.next = this.children;
		}
		this.children = argument;
		argument.parent = this;
	}

	remove(id) {
		const element = this.find(id);
		if (element) {
			if (element.parent.children.id === id) {
				if (!element.next) {
					element.parent.children = null;
				} else {
					element.parent.children = element.next;
					element.next.prev = null;
				}
			} else {
				if (!element.next) {
					element.prev.next = null;
				} else {
					element.prev.next = element.next;
					element.next.prev = element.prev;
				}
			}
		}
	}

	find(id) {
		if (this.id === id) {
			return this;
		}
		if (this.next === null && this.children === null) {
			return null;
		}
		if (this.children) {
			const children = this.children.find(id);
			if (children === null) {
				if (this.next === null) {
					return null;
				} else {
					return this.next.find(id);
				}
			} else {
				return children;
			}
		}
		return this.next.find(id);
	}

	each(fn) {
		fn(this);
		if (this.next === null && this.children === null) {
			return null;
		}
		if (this.children) {
			if (this.children.each(fn) === null) {
				if (this.next === null) {
					return null;
				} else {
					return this.next.each(fn);
				}
			} else {
				return null;
			}
		}
		return this.next.each(fn);
	}

}