import {each} from '../collections/each.js';
import {isDefined} from '../types/isDefined.js';
import {isObject} from '../types/isObject.js';

export const extend = (obj = {}, ...args) => {
    const length = args.length;
    if (length === 1) {
        const [dist] = args;
        each(dist, (value, key) => {
            const src = obj[key];
            if(isDefined(src) && isObject(value) && isObject(src) && value !== null && src !== null) {
                extend(src, value);
            }else {
                obj[key] = value;
            }
        });
    } else if (length > 1) {
        each(args, value => extend(obj, value));
    }
    return obj;
};