import { Math } from './Math.js';

const newMAth = new Math();

newMAth.sum(2, 3)
	.then((res) => {
		console.log(res)
	})
