import {promise, timer} from "./decorators.js";

class Math {

    @promise()
    @timer()
    factorial(n) {
        let res = 1;
        while (n != 0) {
            res *= n
            n--;
        }
        return res;
    }

    @promise()
    sqrt(a) {
        for (let i = 0; i <= a; i++) {
            if (i * i === a) return i;
        }
    }

    @promise()
    pow(a, b) {
        let res = 1;
        while (b > 0) {
            res *= a;
            b--;
        }
        return res;
    }

    @promise()
    lerp(start, end, t) {
        return start * (1 - t) + end * t;
    }
}

export const math = new Math()
