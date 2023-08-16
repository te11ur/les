import { isArray } from '../../utils/types/isArray.js';

const defaultSort = (a, b) => a - b;

export class SortCollection {
	items;
	sortFn;

	constructor(items, sortFn = defaultSort) {
		if (isArray(items)) {
			this.items = items.slice();
		} else {
			this.items = [];
		}

		this.sortFn = sortFn;
		this.sort();
	}

	get count() {
		return this.items.length;
	}

	add(...items) {
		this.items.push.apply(this.items, items);

		return this.sort();
	}

	remove(...items) {
		const tmp = new Set(this.items);

		for (let i = 0, length = items.length; i < length; i++) {
			tmp.delete(items[i]);
		}

		this.items.length = 0;
		this.items.push.apply(this.items, tmp.values());

		return this.sort();
	}

	sort() {
		const {
			items,
			sortFn,
		} = this;

		const length = items.length;

		for (let i = 0; i < length; i++) {
			for (let j = i + 1; j < length; j++) {
				const up = sortFn(items[i], items[j]);

				if (up > 0) {
					const tmp = items[i];
					items[i] = items[j];
					items[j] = tmp;
				}
			}
		}

		return this;
	}
}