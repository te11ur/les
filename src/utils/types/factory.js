import {isFunction} from './isFunction.js';

export const factory = (cls, params = {}) => {
    const creatorFactory = function (...args) {
        const modifier = new cls();
		modifier.creatorFactory = creatorFactory;

        if(isFunction(modifier.init)) {
			modifier.init(params, ...args);
        }

        return modifier;
    };

    return creatorFactory;
};