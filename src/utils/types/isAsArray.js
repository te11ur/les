import { isArray } from './isArray.js';
import { isObject } from './isObject.js';
import { isArrayBuffer } from './isArrayBuffer.js';

export const isAsArray = value => value !== null && isObject(value) && (isArray(value) || isArrayBuffer(value.buffer));