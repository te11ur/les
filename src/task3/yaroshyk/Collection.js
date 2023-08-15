export class Collection {
	constructor() {
		this.items = [];
	}

	addItem(item) {
		this.items.push(item);
	}

	quickSort(collectionItems) {
		if (collectionItems.length <= 1) {
			return collectionItems;
		}
		const pivot = collectionItems[Math.floor(collectionItems.length / 2)];
		const left = [];
		const right = [];
		for (const num of collectionItems) {
			if (num < pivot) {
				left.push(num);
			} else if (num > pivot) {
				right.push(num);
			}
		}
		const sortedLeft = this.quickSort(left);
		const sortedRight = this.quickSort(right);
		const sortedArray = sortedLeft.concat([pivot], sortedRight);
		return sortedArray;
	}

	getItems() {
		return this.items;
	}
}