import { isDefined } from './isDefined.js';

export const hasOffscreenCanvas = () => isDefined(OffscreenCanvas) && (new OffscreenCanvas(1, 1).getContext('2d')) !== null;