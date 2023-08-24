import src_code from './worker.js';

const functionGetBody = (str) => {
	const indexBracket = str.indexOf('{');
	return str.slice(indexBracket);
}

const stringedWorkerFunction = functionGetBody(src_code.toString());
const data = new Blob([stringedWorkerFunction], { type: 'application/javascript' });
const url = URL.createObjectURL(data);
const worker = new Worker(url);

worker.onmessage = (e) => {
	const { data } = e;

	if (data) {
		console.log(data);
		worker.terminate();
	}
};

worker.postMessage('https://jsonplaceholder.typicode.com/todos/1');


