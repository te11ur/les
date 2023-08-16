import { SortCollection } from './SortCollection.js';

const map = new SortCollection([10, -Infinity, 1, 4, 5, 3]);
console.log(map.items);
map.add(15, 16, -100, -3.4e-6);
console.log(map.items);

const sumArray = (array, cache) => {
	if (cache.has(array)) {
		return cache.get(array);
	}

	let sum = 0;

	for (let i = 0, length = array.length; i < length; i++) {
		sum += array[i];
	}

	cache.set(array, sum);

	return sum;
};

const wightSort = () => {
	const cache = new Map();

	return (a, b) => {
		const sa = sumArray(a, cache);
		const sb = sumArray(b, cache);

		return sa - sb;
	};
};

const map2 = new SortCollection([[1, 3, Infinity], [0, 0, -3], [30, 140, 1]], wightSort());
console.log(map2.items);
map2.add([-Infinity, +Infinity, 1.2e-10]);
console.log(map2.items);