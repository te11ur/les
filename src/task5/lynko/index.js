const url = 'https://dummyjson.com/products/1';
const worker = new Worker('./worker.js');

worker.onmessage = (EO) => {
    console.log(EO.data);
}
worker.postMessage(url);