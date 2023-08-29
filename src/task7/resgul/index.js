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

	const decompiledData = atob(data);

	drawImg(decompiledData);
};

const imgData = await takePhoto();

worker.postMessage(imgData);
