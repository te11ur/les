import {txtWorker} from './worker.js';

const imgUrl = 'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg';
// const imgUrl = 'https://image.shutterstock.com/image-photo/blue-dark-night-sky-many-260nw-371943640.jpg';

const img = document.createElement('img');
document.body.appendChild(img)

if (window.Worker) {
    const url = URL.createObjectURL(new Blob([txtWorker]));
    const worker = new Worker(url);
    worker.onmessage = (e) => {
        img.src = URL.createObjectURL(e.data);
    }
    worker.postMessage(imgUrl);
} else {
    fetch(imgUrl)
        .then(res => {
            return res.blob();
        })
        .then(res => {
            img.src = URL.createObjectURL(res);
        })
}
