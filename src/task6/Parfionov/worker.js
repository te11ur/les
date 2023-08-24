export const workerBody = `onmessage = (e) => {
    fetch(
   e.data[0], e.data[1]
    )
        .then(res => res.json())
        .then(res => {
            self.postMessage(res);
        })
        .catch((event) => {
        self.postMessage('event.message');
  })
}`
