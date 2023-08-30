const worker_wrapper = () => {
	onmessage = (e) => {
		const blob = e.data;
		const reader = new FileReader();

		reader.readAsDataURL(blob);

		reader.onload = (e) => {
			const base64String = e.target.result;
			postMessage(base64String);
		};

	};
};

export default worker_wrapper;