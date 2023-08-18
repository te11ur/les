export const timer = () => {
    return (target, key, descriptor) => {
        const method = descriptor.value;

        descriptor.value = function (...args) {
            console.time(`ExTime ${key}`)
            const res = method.apply(this, args);
            console.timeEnd(`ExTime ${key}`)
            return res;
        };

        return descriptor;
    };
};
export const promise = () => {
    return (target, key, descriptor) => {

        const method = descriptor.value;

        descriptor.value = function (...args) {
            return new Promise((resolve) => {
                const res = method.apply(this, args);
                resolve(res);
            });
        }
    }
};

