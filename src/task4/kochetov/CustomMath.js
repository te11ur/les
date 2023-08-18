let time = 100;

const promise = () => {
	const timeout = 1000 + time;
	time += 200;

	return (target, key, descriptor) => {
		descriptor.writable = false;
		let value = descriptor.value;

		descriptor.value = (...args) => new Promise((resolve, reject) => {
			console.log(args);
			setTimeout(() => {
				let res = value.apply(this, args);
				resolve(res);
			}, timeout);
		});
	};
}

export class CustomMath {
	@promise()
	sum(...args) {
		return args.reduce((acc, a) => a + acc, 0);
	}

	@promise()
	pow(a, degree) {
		if (degree === 0) {
			return 1;
		}
		let result = 1;
		for (let i = 0; i < degree; i++) {
			result = result * a;
		}
		return result;
	}
}
