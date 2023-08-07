export class Pool {
	items = [];

	creator;

	initializer;

	constructor(creator, initializer) {
		this.creator = creator;
		this.initializer = initializer;
	}

	pop(...args) {
		const {
			items,
			creator,
			initializer
		} = this;

		const item = items.length > 0 ?
			items.pop() :
			creator(...args);

		return initializer ?
			initializer(item, ...args) :
			item;
	}

	free(item) {
		if (item.reset) {
			item.reset();
		}
		this.items.push(item);
	}

	freeAll(items) {
		for (let i = 0; i < items.length; i++) {
			if (items[i].reset) {
				items[i].reset();
			}
			this.items[i] = items[i];
		}
	}

	clear() {
		this.items.length = 0;
	}
}