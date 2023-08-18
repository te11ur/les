import { MathCustom } from './MathCustom.js';

const math = new MathCustom();

math.pow(3, 2)
	.then((data) => {
		console.log(data);
	});

console.log(math.sum(1,2));

