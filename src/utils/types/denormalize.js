export const denormalize = (value, array) => {
	switch (array.constructor) {
		case Float32Array:
			return value;
		case Uint16Array:
			return value / 65535.;
		case Uint8Array:
			return value / 255.;
		case Int16Array:
			return Math.max(value / 32767., -1.);
		case Int8Array:
			return Math.max(value / 127., -1.);
		default:
			console.error('Invalid component type.');
	}

	return value;
};