function factorialCalculator() {
	const cache = [];

	function factorial(n) {
		if (cache[n] !== undefined) {
			console.log(`Cached result for ${n}!`);
			return cache[n];
		}

		if (n === 0 || n === 1) {
			cache[n] = 1;
		} else {
			cache[n] = n * factorial(n - 1);
		}

		return cache[n];
	}

	return factorial;
}

const calculateFactorial = factorialCalculator();

console.log(calculateFactorial(5));
console.log(calculateFactorial(3));
console.log(calculateFactorial(10));
console.log(calculateFactorial(8));