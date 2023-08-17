const decorator = (func) => {
	return function(...args) {
		return new Promise(resolve => {
			let result = func.apply(this, args);
			resolve(result);
		})
	}
}

export class MathCustom {
	constructor() {
		// декорирую методы?
		for (let method in this) {
			if (typeof(this[method]) === 'function') {
				this[method] = decorator(this[method]);
			}
		}
	}

	sum(a,b) {
		return a + b;
	}
	sub(a,b) {
		return a - b;
	}

	mul(a,b) {
		return a * b;
	}

	pow(a,b) {
		return a ** b;
	}
}