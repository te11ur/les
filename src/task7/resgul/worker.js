const worker_wrapper = () => {
	onmessage = (e) => {
		const data = e.data;
		const based64Data = btoa(data);
		postMessage(based64Data);
	};
};

export default worker_wrapper;