import { CustomMath } from './CustomMath.js';

const math = new CustomMath();

console.log(math.sum(1, 2, 5, 3)
	.then(res => console.log(res)));

console.log(math.pow(5, 3).then(res => console.log(res)));
