import { createBlob } from '../../task5/kochetov/createBlob.js';
import { worker } from '../../task6/kochetov/worker.js';

import BaseComponent from './BaseComponent.js';

const convertToString = (cb) => {
	if (!cb) return;
	const string = cb.toString();
	return string.slice(string.indexOf('{'), string.lastIndexOf('}') + 1);
};

const propsToString = (cb) => {
	const string = cb.toString();
	return string.slice(string.indexOf('(') + 1, string.indexOf(')'));
};

const sendToWorker = (cb) => {
	return (...args) => {
		const cbString = convertToString(cb.toString());
		const propsString = propsToString(cb.toString());
		const pathWorker = createBlob(convertToString(worker));
		const apiWorker = new Worker(pathWorker);

		apiWorker.postMessage({ args, cbString, propsString });

		return new Promise((resolve, reject) => {
			apiWorker.onmessage = (e) => {
				resolve(e.data);
				apiWorker.terminate();
			};
		});
	};
};

const wrapper = new BaseComponent(document.body, 'div', ['wrapper']);
const video = new BaseComponent(wrapper.node, 'video').node;
const button = new BaseComponent(wrapper.node, 'button', [], 'Take photo').node;
const canvas = new BaseComponent(wrapper.node, 'canvas').node;
const resultImage = new BaseComponent(wrapper.node, 'img').node;

canvas.width = 640;
canvas.height = 480;
video.autoplay = true;

async function initWebcam() {
	if (navigator.mediaDevices.getUserMedia) {
		const stream = await navigator.mediaDevices.getUserMedia({ video: true });
		video.srcObject = stream;
		video.play();
	} else {
		console.error('ERROR');
	}
}

initWebcam();

function takeSnapshot() {
	const canvasContext = canvas.getContext('2d');
	canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);
	const imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
	return imageData;
}

function getBase64Image(img) {
	let base64String = '';
	const { data } = img;
	for (let i = 0; i < data.length; i++) {
		base64String += btoa(String.fromCharCode(data[i]));
	}
	return base64String.replace(/=/g, '');
}

button.addEventListener('click', () => {
	const img = takeSnapshot();
	const a = sendToWorker(getBase64Image);
	const res = a(img);

	res.then(data => {
		console.log(data.data);
		resultImage.src = `data:image/png;base64, ${data.data}`;
	});
});