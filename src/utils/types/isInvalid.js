import { isDefined } from './isDefined.js';

export const isInvalid = value => value === false || value === null || isNaN(value) || !isDefined(value);