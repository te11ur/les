function fetchWithWorker() {
	return async function(url) {
		const workerCode = `
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
    `;

		const blob = new Blob([workerCode], { type: 'application/javascript' });
		const worker = new Worker(URL.createObjectURL(blob));

		return new Promise((resolve, reject) => {
			worker.addEventListener('message', (event) => {
				resolve(event.data);
				worker.terminate();
			});

			worker.addEventListener('error', (event) => {
				reject(new Error(event.message));
				worker.terminate();
			});

			worker.postMessage(url);
		});
	};
}

const fetchWithWorkerDecorator = fetchWithWorker(fetch);

const fetchData = async () => {
	try {
		const data = await fetchWithWorkerDecorator('https://catfact.ninja/fact');
		console.log(data);
	} catch (error) {
		console.error(error);
	}
};

fetchData();
