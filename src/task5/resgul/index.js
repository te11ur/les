if (window.Worker) {
  const worker = new Worker('./worker.js');

  worker.onmessage = (e) => {
    const { data } = e;

    if (data) {
      console.log(data);
    }
  };

  worker.onerror = (err) => {
      console.log(err.message);
  };

  worker.postMessage('https://jsonplaceholder.typicode.com/todos/1');
  // worker.postMessage('https://jsonplaceholder.typicode.com/todos/2000');
}

