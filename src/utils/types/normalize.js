export const normalize = (value, array) => {
	switch (array.constructor) {
		case Float32Array:
			return value;
		case Uint16Array:
			return Math.round(value * 65535.);
		case Uint8Array:
			return Math.round(value * 255.);
		case Int16Array:
			return Math.round(value * 32767.);
		case Int8Array:
			return Math.round(value * 127.);
		default:
			console.error('Invalid component type.');
	}

	return value;
};