self.addEventListener('message', async (event) => {
	const url = event.data;
	try {
		const response = await fetch(url);
		const data = await response.json();
		self.postMessage(data);
	} catch (error) {
		self.postMessage({ error: error.message });
	}
});
