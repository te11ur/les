const worker = new Worker('./worker.js', { type: 'module' });

worker.onmessage = (event) => {
    const {data} = event;
    console.log(data);
}
worker.postMessage(2);