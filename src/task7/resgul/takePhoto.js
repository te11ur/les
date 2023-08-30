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

					// Освобождение ресурсов и остановка записи с камеры
					const tracks = stream.getTracks();
					tracks.forEach(track => track.stop());

					return new Promise((resolve) => {
						canvas.toBlob((blob) => {
							resolve(blob);
						} , 'image/jpeg', 0.9);
					})
				});
		});
};

export default takePhoto;