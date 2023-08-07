import png from './stone_grass_ui.png';

const imag = new Image();
imag.src = png;
imag.height = 512;

document.body.appendChild(imag);
console.log('hi');