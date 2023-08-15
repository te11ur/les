class CustomArray {
	length = 0;
	data = {};
	type = null;

	push(value) {
		if (!this._checkType(value)) {
			return this;
		}

		const { data, length } = this;

		data[length] = value;
		this.length++;
		this._bubbleSort();
		return this.length;
	}

	pop() {
		if (this.length === 0) {
			return;
		}
		this.length--;
		const last = this.data[this.length];
		delete this.data[this.length];
		return last;
	}

	unshift(value) {
		const { type, data, length } = this;
		if (!this._checkType(value)) {
			return this;
		}

		const newData = {};
		const index = 0;

		if (data[index]) {
			newData[index] = value;
			for (let i = 0; i < length; i++) {
				newData[i + 1] = data[i];
			}
			this.data = newData;
		}

		if (!data[index]) {
			data[index] = value;
		}

		this.length++;
		const sort = this._quickSort();
		this.data = sort.data;
	}

	shift() {
		if (this.length === 0) {
			return;
		}

		const newData = {};
		const index = 0;
		const first = this.data[index];

		delete this.data[index];
		this.length--;

		for (let i = 0; i < this.length; i++) {
			newData[i] = this.data[i + 1];
		}

		this.data = newData;

		return first;
	}

	concat(...collections) {
		const newCollection = this;

		for (let k = 0; k < collections.length; k++) {
			const collection = collections[k];
			for (let i = 0; i < collection.length; i++) {
				newCollection.push(collection.data[i]);
			}
		}

		return newCollection;
	}

	_checkType(value) {
		const { type } = this;

		if (!type) {
			this.type = typeof value;
		}

		if (type && type !== typeof value) {
			console.info(`You can only add a ${type}`);
			return false;
		}

		return true;
	}

	_bubbleSort() {
		for (let i = 0; i < this.length; i++) {
			for (let j = 0; j < this.length - 1 - i; j++) {
				const current = this.data[j];
				const next = this.data[j + 1];

				if (current > next) {
					this.data[j] = next;
					this.data[j + 1] = current;
				}
			}
		}

		return this.data;
	}

	_quickSort(collection = this) {
		const { data, length } = collection;

		if (length < 2) {
			return collection;
		}

		const head = new CustomArray();
		head.push(data[0]);
		const leftPart = new CustomArray();
		const rightPart = new CustomArray();

		for (let i = 1; i < length; i++) {
			if (head.data[0] >= data[i]) {
				leftPart.push(data[i]);
			} else {
				rightPart.push(data[i]);
			}
		}

		const sortedLeft = this._quickSort(leftPart);
		const sortedRight = this._quickSort(rightPart);

		return sortedLeft.concat(head, sortedRight);
	}
}


const myArray = new CustomArray();
myArray.unshift(50);
myArray.unshift('asd');
myArray.push(5);
myArray.push(2);
myArray.push(6);
myArray.push(4);
myArray.push(1);
myArray.unshift(-50);
myArray.push('456465');

console.log(myArray);

const secondArr = new CustomArray();
secondArr.push('a');
secondArr.push('v');
secondArr.push('4');

console.log(secondArr);

const thirdArr = new CustomArray();

thirdArr.push(true);
thirdArr.push(true);
thirdArr.push(false);
thirdArr.push('fdsafdsa');

console.log(thirdArr);
