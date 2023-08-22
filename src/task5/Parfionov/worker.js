const uri = 'https://jsonplaceholder.typicode.com/posts?exact=true';
const initDetails = {
    method: 'get',
    headers: {
        "Content-Type": "application/json; charset=utf-8"
    },
    mode: "cors"
}
onmessage = (e) => {
    console.log(e.data)
    fetch(uri, initDetails)
        .then(res => res.json())
        .then(data => {
            self.postMessage(data[e.data]);
        })
}