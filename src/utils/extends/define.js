import { each } from '../collections/each.js';
import { isDefined } from '../types/isDefined.js';

/**
 * @param src {object}
 * @param properties {PropertyDescriptorMap}
 * @return {object}
 */
export const define = (src, properties) => {
	each(properties, (property, name) => {
		property = Object.assign({
			writable: true,
			configurable: true,
			enumerable: true,
		}, property);

		if (isDefined(property.get) || isDefined(property.set)) {
			delete property.writable;
		}

		Object.defineProperty(src, name, property);
	});

	return src;
};