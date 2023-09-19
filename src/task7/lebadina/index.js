const workerSrc = `
   onmessage = async (e) => {
    const canvasData = e.data.canvasData;
    const imageBitmap = e.data.imageData; 

    const offscreenCanvas = new OffscreenCanvas(canvasData.width, canvasData.height);
    const offscreenContext = offscreenCanvas.getContext('2d');

    offscreenContext.drawImage(imageBitmap, 0, 0, offscreenCanvas.width, offscreenCanvas.height);

    offscreenCanvas.convertToBlob().then(blob => {
      const dataURL = new FileReaderSync().readAsDataURL(blob);
      postMessage(dataURL);
    })
    
};

`


const video = document.createElement('video');
const image = new Image();
const url = URL.createObjectURL(new Blob([workerSrc]));

const camera = window.navigator.mediaDevices
    .getUserMedia({video: true})
    .then(mediaStream => {
        video.srcObject = mediaStream;
        video.onloadedmetadata = (e) => {
            video.play();
        }
    });

const btn = document.createElement('div');
btn.innerText = 'MAKE PHOTO';

let state = 'video';

btn.addEventListener('click', () => {
    if (state === 'video') {
        const worker = new Worker(url);
        worker.onmessage = (e) => {
            image.src = e.data;
        };

        const canvasData = {width: video.videoWidth, height: video.videoHeight};
        createImageBitmap(video)
            .then(imageBitmap => {
                worker.postMessage({canvasData, imageData: imageBitmap}, [imageBitmap]);
            });

        btn.innerText = 'TRY AGAIN'
        state = 'image'
    } else {
        state = 'video';
        btn.innerText = 'MAKE PHOTO';
        image.src = '';
    }
})


document.body.append(video);
document.body.append(btn);
document.body.append(image);

document.body.style.position = 'relative';
image.style.position = 'absolute';
image.style.top = '0px';
btn.style.width = '150px';
btn.style.height = '50px';
btn.style.border = '1px solid green';
btn.style.textAlign = 'center';
btn.style.paddingTop = '23px';
