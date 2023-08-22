self.addEventListener('message', (event) => {
	const url = event.data;

	fetch(url)
		.then(response => response.text())
		.then(data => {
			self.postMessage(data); // Отправляем данные обратно в основной поток
		})
		.catch(error => {
			console.error('Error fetching data:', error);
		});
});