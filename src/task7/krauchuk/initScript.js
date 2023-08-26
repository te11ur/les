import execInWorker from './execInWorker.js';

export default async (target = document.body) => {
  const videoElement = target.querySelector('#camera');
  const captureButton = target.querySelector('#capture');
  const photoElement = target.querySelector('#photo');

  await setupCamera(videoElement).catch(console.error);

  const canvas = document.createElement('canvas');

  captureButton.addEventListener('click', async () => {
    if (!videoElement.videoWidth || !videoElement.videoHeight) return;

    const imageBitmap = await capturePhoto(canvas, videoElement);
    photoElement.src = await toBase64({ imageBitmap }, [imageBitmap]);
  });
};

const toBase64 = execInWorker((data) => {
  const { imageBitmap } = data;

  const canvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height);
  const context = canvas.getContext('2d');

  context.drawImage(imageBitmap, 0, 0);

  const blobPromise = canvas.convertToBlob({ type: 'image/webp', quality: 0.95 });

  const reader = new FileReader();
  blobPromise.then((blob) => reader.readAsDataURL(blob));

  return new Promise((res) => {
    reader.onloadend = () => res(reader.result);
  });
});

const setupCamera = async (videoElement) => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  videoElement.srcObject = stream;
};

const capturePhoto = (canvas, videoElement) => {
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  return createImageBitmap(canvas);
};
