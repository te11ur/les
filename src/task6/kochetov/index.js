import { createBlob } from '../../task5/kochetov/createBlob.js';
import { worker } from './worker.js';

const convertToString = (cb) => {
	if (!cb) return;
	const string = cb.toString();
	return string.slice(string.indexOf('{'), string.lastIndexOf('}') + 1);
};

const propsToString = (cb) => {
	const string = cb.toString();
	return string.slice(string.indexOf('(') + 1, string.indexOf(')'));
};

const sendToWorker = (cb) => {
	return (...args) => {
		const cbString = convertToString(cb.toString());
		const propsString = propsToString(cb.toString());
		const pathWorker = createBlob(convertToString(worker));
		const apiWorker = new Worker(pathWorker);

		apiWorker.postMessage({ args: args, cbString, propsString });

		return new Promise((resolve, reject) => {
			apiWorker.onmessage = (e) => {
				resolve(e.data);
				apiWorker.terminate();
			};
		});
	};
};

const ab = sendToWorker((a, b) => a + b);
const res = ab(5, 2);

res.then(data => {
	console.log(data);
});
