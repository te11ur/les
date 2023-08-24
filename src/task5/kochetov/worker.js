export const worker = () => {
	onmessage = (e) => {
		const { data } = e;
		const response = fetch(data.url);
		response
			.then(res => res.json())
			.then(data => postMessage({ data }))
			.catch(error => postMessage({ error }));
	};
};