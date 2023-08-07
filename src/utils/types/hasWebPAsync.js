import { createElementNS } from '../dom/createElementNS.js';

const webP1x1 = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA';
let promise;
/**
 * Lossy test image. Support for lossy images doesn't guarantee support for all
 * WebP images, unfortunately.
 * @returns {Promise<boolean>}
 */
export const hasWebPAsync = () => {
	if (!promise) {
		promise = new Promise(resolve => {
			const image = createElementNS('img');

			const removeListeners = () => {
				image.removeEventListener('load', onImageLoad, false);
				image.removeEventListener('error', onImageError, false);
			};

			const onImageLoad = () => {
				removeListeners();
				resolve(image.height === 1);
			};

			const onImageError = () => {
				removeListeners();
				resolve(false);
			};

			image.addEventListener('load', onImageLoad, false);
			image.addEventListener('error', onImageError, false);

			image.src = webP1x1;
		});
	}

	return promise;
};