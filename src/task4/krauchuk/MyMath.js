import { isFunction } from '../../utils/types/isFunction.js';

const locked = (_target, _key, descriptor) => ({
  ...descriptor,
  writable: false,
});

const toPromise = (_target, _name, descriptor) => {
  const original = descriptor.value;
  let value = original;

  if (isFunction(original)) {
    value = (...args) => Promise.resolve(original(...args));
  }

  return { ...descriptor, value };
};

export class MyMath {
  @locked
  static PI = 3.14159265359;
  @locked
  static E = 2.718281828459045;

  @toPromise
  static abs(n) {
    return n > 0 ? n : n * -1;
  }

  @toPromise
  static pow(a, b) {
    return a ** b;
  }

  @toPromise
  static sqrt(n) {
    return n ** 0.5;
  }

  @toPromise
  static sign(val) {
    return val === 0 ? 0 : val > 0 ? 1 : -1;
  }

  @toPromise
  static min(a, b) {
    return a < b ? a : b;
  }

  @toPromise
  static max(a, b) {
    return a > b ? a : b;
  }

  @toPromise
  static clamp(val, min, max) {
    return MyMath.min(MyMath.max(val, min), max);
  }

  @toPromise
  static withinRange(val, min, max) {
    return val >= min && val <= max;
  }

  @toPromise
  static lerp(a, b, alpha) {
    return a + alpha * (b - a);
  }

  @toPromise
  static degToRad(degrees) {
    return degrees * (MyMath.PI / 180);
  }

  @toPromise
  static radToDeg(radians) {
    return radians * (180 / MyMath.PI);
  }

  static distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return MyMath.sqrt(dx * dx + dy * dy);
  }
}
