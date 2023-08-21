import workerSrc from './api_worker.txt';

const workerText = atob(workerSrc.slice(workerSrc.indexOf(',') + 1));
const workerUrl = URL.createObjectURL(new Blob([workerText]));

const apiWorker = new Worker(workerUrl);

apiWorker.onmessage = (event) => {
  const { data } = event;
  console.log(data);

  if (data.data.content) {
    console.log(
      '%c' + data.data.content,
      'color: black; background: white; font-size: 18px; font-weight: bold; padding: 3px; border-radius: 3px;'
    );
  }
};

apiWorker.postMessage({ type: 'quote' });
