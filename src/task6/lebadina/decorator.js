const functionGetBody = (fn) => {
    const match = fn.match(/{([\s\S]*)}/);

    if (match && match[1]) {
        return match[1].trim();
    } else return null;
}
const functionGetParams = (fn) => {
    const match = fn.match(/\(([^)]+)\)/);

    if (match && match[1]) {
        return match[1].trim();
    } else return null;
}

const a = () => {
    self.onmessage = e => {
        const method = new Function(e.data.methodParams, e.data.methodString);
        method(...e.data.args, (r) => {self.postMessage({res: r})});
    };
};

const ab = functionGetBody(a.toString());
const ac = new Blob([ab], {
    type: 'application/javascript',
});
const url = URL.createObjectURL(ac);
const worker = new Worker(url);

export const decorator = () => {
    return (target, key, descriptor) => {
        const method = descriptor.value;
        const methodParams = functionGetParams(method.toString());
        const methodString = functionGetBody(method.toString());

        descriptor.value = function (...args) {
            return new Promise((resolve, reject) => {

            worker.onmessage = (e) => {
                resolve(e.data.res)
                worker.terminate();
            };
            worker.postMessage({methodString, methodParams, args});
            });
        };
    };
};
