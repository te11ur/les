const worker_wrapper = () => {
	onmessage = (e) => {
		const url = e.data;

		fetch(url)
			.then(response => response.json())
			.then(data => postMessage(data));
	};
};

export default worker_wrapper;