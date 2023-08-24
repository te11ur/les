import {decorator} from "./decorator.js";

const imgUrl = 'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg';

const img = document.createElement('img');
document.body.appendChild(img)

class Loader {
    @decorator()
    loadDataFromURL(url, onSuccess, onError) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {

                    const blob = xhr.response;
                    const fileReader = new FileReader();

                    fileReader.onload = function() {
                        const base64Image = fileReader.result;
                        onSuccess && onSuccess(base64Image)
                    };
                    fileReader.readAsDataURL(blob);
                } else {
                    onError && onError(new Error(`Request failed with status: ${xhr.status}`));
                }
            }
        };

        xhr.onerror = () => {
            onError && onError(new Error(`Request failed with status: ${xhr.status}`));
        };
        xhr.responseType = 'blob'
        xhr.send();
    }


}

const loader = new Loader();

console.log(loader.loadDataFromURL(imgUrl).then(res => {
    img.src = res;
}))
