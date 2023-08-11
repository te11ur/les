const factorial = (() => {
	const values = [0, 1];

	return n => {
		if (n < 0) {
			return 0;
		}

		const v = values[n];

		if (v >= 0) {
			return v;
		}

		let index = values.length;
		while (n >= index) {
			values[index] = index * values[index - 1];
			index++;
		}

		return values[values.length - 1];
	};
})();

console.log(factorial(10));
console.log(factorial(-1));
console.log(factorial(20));