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
        const resBufArr = [];
        for (let i = 0; i <= a; i += 0.01) {
            let res = i * i;
            if (res > a - 0.5 && res < a + 0.5) {
                resBufArr.push(i)
            };
        }
        return (resBufArr.reduce((sum, item) => sum + item, 0) / resBufArr.length).toFixed(4)
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
