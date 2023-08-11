const saveDate = createBase();

function createBase() {
	let base = {};

	return function (value, result) {
		if (value && result) base[value] = result;
		return base;
	}
}

export default function getFactorial(value) {
	let sum = 1;
	const base = saveDate();

	if (base[value]) return base[value];
	if (value - 1 > 0) sum = getFactorial(value-1) * value;

	saveDate(value, sum);

	return sum;
}