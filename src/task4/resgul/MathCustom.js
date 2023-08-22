const promisify = (options) => {
	return (target, property, descriptor) => {
		let func = descriptor.value;
		descriptor.value = (...args) => {
			return new Promise(resolve => {
				const result = func.apply(this, args);
				resolve(result)
			})
		}
	}
}

export class MathCustom {
	PI=3.14;

	@promisify()
	sum(a,b) {
		return a + b;
	}

	@promisify()
	sub(a,b) {
		return a - b;
	}

	@promisify()
	mul(a,b) {
		return a * b;
	}

	@promisify()
	pow(a,b) {
		return a ** b;
	}
}