export class Collection {
    value = [];
    length = 0;
    sortFn = (a, b) => a - b;

    push(...args) {
        this.value = this._sortedInsert(args);
        this.length = this.value.length;

        return this;
    }

    pop() {
        let elem = this.value[this.length - 1];
        this.length = this.value.length--;
        this.length--;

        return elem;
    }

    shift() {
        let elem = this.value[0];
        for (let i = 0; i < this.length - 1; i++) {
            this.value[i] = this.value[i + 1]
        }
        this.length = this.value.length--;
        this.length--;

        return elem;
    }

    setSortFn(fn) {
        this.sortFn = fn;
        const bufArr = this.value;
        this.value = [];
        this.push(...bufArr);
        return this;
    }

    indexOf(value) {
        for (let i = 0; i < this.length; i++) {
            if (this.value[i] === value) {
                return i;
            }
        }
        return -1;
    }

    _binarySearchIndex(array, value) {
        let left = 0;
        let right = array.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (this.sortFn(array[mid], value) <= 0) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return left;
    }

    _sortedInsert(array) {
        const newArray = [...this.value];
        let length = newArray.length;

        for (const value of array) {
            const insertionIndex = this._binarySearchIndex(newArray, value);

            for (let i = length; i > insertionIndex; i--) {
                newArray[i] = newArray[i - 1];
            }

            newArray[insertionIndex] = value;
            length++;
        }

        return newArray;
    }


}