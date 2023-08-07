/**
 * assumes larger values usually on last
 * @param array
 * @returns {boolean}
 */
export const arrayNeedsUint32 = array => {
	for (let i = array.length - 1; i >= 0; --i) {
		if (array[i] > 65535) {
			return true;
		}
	}

	return false;
};