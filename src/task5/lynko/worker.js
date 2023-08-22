onmessage = (EO) => {
    fetch(EO.data) 
        .then(res => res.json())
        .then(data => postMessage(data));
}