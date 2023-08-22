onmessage = (e) => {
	const url = e.data;

	fetch(url)
		.then(response => {
			if (response.status === 404) throw new Error('status 404');
			return response.json();
		})
		.then(data => postMessage(data));
};