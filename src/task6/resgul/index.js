const addWorkerMethods = (func) => {
	return `
		{
			self.onmessage = async (e) => {
				${func};
				const result = await ${func.name}(...e.data.msg);
				self.postMessage(result);
			}
		}
		`;
};

const sendToWorker = (func) => {
	return (...args) => {
		const stringedFunc = addWorkerMethods(func);
		const data = new Blob([stringedFunc], { type: 'application/javascript' });
		const url = URL.createObjectURL(data);
		const worker = new Worker(url);

		worker.postMessage({ msg: args });

		return new Promise((resolve, reject) => {
			worker.onmessage =  (e) => {
				resolve(e.data);
				worker.terminate();
			};
			worker.onerror =  (err) => {
				reject(err.message);
				worker.terminate();
			};
		})
	};
};

// TEST_1
const fetchUrl = (url) => {
	return fetch(url)
		.then(response => response.json())
		.then(data => data);
};

const worksifiedFetch = sendToWorker(fetchUrl);
const result_1 = worksifiedFetch('https://jsonplaceholder.typicode.com/todos/1');

result_1.then(data => {
	console.log(data);
})

// TEST_2
const sum = (a, b) => a + b;
const worksifiedSum = sendToWorker(sum);
const result_2 = worksifiedSum(100, 200);

result_2.then(data => {
	console.log(data);
})