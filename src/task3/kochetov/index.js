class CustomArray {
	length = 0;
	data = {};


	push(value) {
		this.data[this.length] = value;
		this.length++;
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
		const newData = {};
		const index = 0;

		if (this.data[index]) {
			newData[index] = value;
			for (let i = 0; i < this.length; i++) {
				newData[i + 1] = this.data[i];
			}
			this.data = newData;
		}

		if (!this.data[index]) {
			this.data[index] = value;
		}
		this.length++;
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
		let index = 0;
		const {
			data,
			length,
		} = this;
		console.log(collections);

		const newDate = { ...data };

		while (collections[index]) {
			newDate[length + index] = collections[index];
			index++;
		}

		console.log(newDate);
		return newDate;

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

	_quickSort(arr) {
		const { data, length } = arr;
		if (length < 2) {
			return arr;
		}

		const head = { '0': data[0] };
		const leftPart = new CustomArray();
		const rightPart = new CustomArray();
		console.log(data);

		for (let i = 1; i < length; i++) {
			if (head[0] >= data[i]) {
				leftPart.push(data[i]);
			} else {
				rightPart.push(data[i]);
			}
		}


		console.log(leftPart, rightPart);
		leftPart.concat(head, rightPart);

		const sortedLeft = this._quickSort(leftPart);
		const sortedRight = this._quickSort(rightPart);

		const result = new CustomArray();
		result.concat(sortedLeft, head, sortedRight);
		return result.data;
		///return this._quickSort(leftPart).concat(head, rightPart)
	}

}


const myArray = new CustomArray();
myArray.push(5);
myArray.push(2);
myArray.push(6);
myArray.push(4);
myArray.push(1);

let aaa = myArray._quickSort(myArray);

console.log(aaa);
