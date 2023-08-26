export default (target = document.body) => {
  target.insertAdjacentHTML(
    'afterbegin',
    `<div style="display: flex;">
        <video id="camera" autoplay style="width: 50%"></video>
        <img id="photo" style="width: 50%"></img>
    </div>
    <button id="capture" style="margin: 1em 5em; font-size: 2em; padding: 0.5em;">Capture Photo</button>`
  );
};
