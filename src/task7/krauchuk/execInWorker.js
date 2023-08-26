export default (fn) => {
  if (!fn && fn.toString) return null;

  const fnStr = fn.toString();
  const fnBody = fnStr.slice(fnStr.indexOf('{'), fnStr.lastIndexOf('}') + 1);

  const workerStr = `self.onmessage = (message) => {
    const { data } = message;
    const fn = function(data) ${fnBody}
    const result = fn(data);

    Promise.resolve(result).then(data => self.postMessage(data))
    
  }`;

  const blob = new Blob([workerStr], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);

  return async (...args) => {
    const worker = new Worker(url);
    worker.postMessage(...args);

    const result = await new Promise((res) => {
      worker.onmessage = (message) => res(message.data);
    });

    worker.terminate();

    return result;
  };
};
