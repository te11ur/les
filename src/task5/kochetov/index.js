import { createBlob } from './createBlob.js';
import { worker } from './worker.js';

const URL = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';

const convertToString = (cb) => {
	const string = cb.toString();
	return string.slice(string.indexOf('{'), string.lastIndexOf('}') + 1);
};

const pathWorker = createBlob(convertToString(worker));
const apiWorker = new Worker(pathWorker);

apiWorker.onmessage = (message) => {
	console.log(message);
	apiWorker.terminate()
};

apiWorker.postMessage({ url: URL });
