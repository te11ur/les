export const txtWorker = `onmessage = (e) => {
    fetch(e.data)
        .then(res => {
            return res.blob();
        })
        .then(blobData => {
            postMessage(blobData);
        });
}`
