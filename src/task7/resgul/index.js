import takePhoto from './takePhoto.js';
import src_code from './worker.js';
import newWorker from './workerHelper.js';

const drawImg = (src) => {
	const img = document.createElement('img');
	img.src = src;

	document.body.append(img);
};

const worker = newWorker(src_code);

worker.onmessage = (e) => {
	const { data } = e;

	drawImg(data);
	worker.terminate();
};

const imgBlob = await takePhoto();
worker.postMessage(imgBlob);
