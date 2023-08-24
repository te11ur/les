import {workerBody} from './worker.js';

let workerFetch = (fetchUrl, reqParams) => {
    const url = URL.createObjectURL(new Blob([workerBody]));
    const worker = new Worker(url);
    worker.postMessage([fetchUrl, reqParams]);
    return new Promise((resolve, reject) => {
        worker.onmessage = (event) => {
            const {data} = event;
            resolve(data);
            worker.terminate();
        }
        worker.onerror = (event) => {
            reject(new Error(event.message));
            worker.terminate();
        };
    })
}

const validator = (fn) => {
    return function (...args) {
        if (args.length === 2 || args[0] instanceof String || args[1] instanceof Object) {
            return fn(...args);
        } else {
            throw new Error('validate your args')
        }

    }
}

const getData = validator(workerFetch);
getData('https://jsonplaceholder.typicode.com/posts?exact=true', {
    method: "get",
    headers: {
        "Content-Type": "application/json; charset=utf-8"
    },
}).then((res) => {
    console.log(res)
})