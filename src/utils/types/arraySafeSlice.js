import { isDefined } from './isDefined.js';
import { isTypedArray } from './isTypedArray.js';

/**
 * in ios9 array.subarray(from, undefined) will return empty array
 * but array.subarray(from) or array.subarray(from, len) is correct
 * @param array
 * @param from
 * @param to
 * @returns {array}
 */
export const arraySafeSlice = (array, from, to) => {
	if (isTypedArray(array)) {
		return new array.constructor(array.subarray(from, isDefined(to) ? to : array.length));
	}

	return array.slice(from, to);
};