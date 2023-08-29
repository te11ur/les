const video = document.createElement('video');
const canvas = document.createElement('canvas');
const camera = window.navigator.mediaDevices
    .getUserMedia({video: true})
    .then(mediaStream => {
        video.srcObject = mediaStream;
        video.onloadedmetadata = (e) => {
            video.play();
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            btn.style.marginLeft = `${video.videoWidth / 2 - 75}px`;
        }
    });

const btn = document.createElement('div');
btn.innerText = 'MAKE PHOTO';

let state = 'video';
const ctx = canvas.getContext("2d");
btn.addEventListener('click', () => {
    if(state === 'video') {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
        const img = canvas.toDataURL("image/png");
        console.log(img)
        btn.innerText = 'TRY AGAIN'
        state = 'image'
    } else {
        state = 'video';
        btn.innerText = 'MAKE PHOTO';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
})


document.body.append(video);
document.body.append(btn);
document.body.append(canvas);

document.body.style.position = 'relative';
canvas.style.position = 'absolute';
canvas.style.top = '0px';
btn.style.width = '150px';
btn.style.height = '50px';
btn.style.border = '1px solid green';
btn.style.textAlign = 'center';
btn.style.paddingTop = '23px';
