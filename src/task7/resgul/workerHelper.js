const functionGetBody = (str) => {
	const indexBracket = str.indexOf('{');
	return str.slice(indexBracket);
}

const newWorker = (src) => {
	const stringedWorkerFunction = functionGetBody(src.toString());
	const data = new Blob([stringedWorkerFunction], { type: 'application/javascript' });
	const url = URL.createObjectURL(data);

	return new Worker(url);
}

export default newWorker;

