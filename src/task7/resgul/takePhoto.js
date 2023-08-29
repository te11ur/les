const takePhoto = () => {
	return navigator.mediaDevices.getUserMedia({ video: true })
		.then(stream => {
			const video = document.createElement('video');
			video.srcObject = stream;

			return video.play()
				.then(() => {
					const canvas = document.createElement('canvas');
					const context = canvas.getContext('2d');
					context.drawImage(video, 0, 0, canvas.width, canvas.height);

					// Преобразование холста в Data URL изображения в формате JPEG
					const imageDataURL = canvas.toDataURL('image/jpeg');
					// Вот только уже в этот момент я получил base64 формат...

					// Освобождение ресурсов и остановка записи с камеры
					const tracks = stream.getTracks();
					tracks.forEach(track => track.stop());

					return imageDataURL;
				});
		});
};

export default takePhoto;