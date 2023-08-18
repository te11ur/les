const decorator = (target, key, descriptor) => {
	let targetFunc = descriptor.value;
	descriptor.value = (...args) => {
		const result = targetFunc.apply(this, args);
		return new Promise(res => {
			res(result);
		});
	};
};

export class Math {
	@decorator
	sum(a, b) {
		return a + b;
	}

	@decorator
	static sub(a, b) {
		return a - b;
	}

	@decorator
	static mul(a, b) {
		return a * b;
	}

	@decorator
	static pow(a, b) {
		return a ** b;
	}
}