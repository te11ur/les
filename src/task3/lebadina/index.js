import {Collection} from "./Collection.js";

let collection = new Collection();
collection.setSortFn((a, b) => {
    if (typeof a === 'string' && typeof b === 'string') {
        return a.toLowerCase().charCodeAt(0) - b.toLowerCase().charCodeAt(0)
    }
    if (typeof a === 'string' && typeof b === 'number') {
        return 1
    }
    if (typeof a === 'number' && typeof b === 'string') {
        return -1
    }
    return a - b
})


collection.push(1, 'aa', -15, 'ooo');
console.log(collection.value)

// let arr = [];
// for (let i = 0; i < 30000; i++) {
//     arr.push((Math.random() * 10))
// }
// collection.push(...arr);
collection.push(-10, -5, 'fff', 500, 1, -500);
console.log(collection.value)
collection.setSortFn((a, b) => {
    if (typeof a === 'string' && typeof b === 'string') {
        return b.toLowerCase().charCodeAt(0) - a.toLowerCase().charCodeAt(0)
    }
    if (typeof a === 'string' && typeof b === 'number') {
        return -1
    }
    if (typeof a === 'number' && typeof b === 'string') {
        return 1
    }
    return b - a
})
console.log(collection.value)

console.log(collection.pop())
console.log(collection.value)
console.log(collection.shift())
console.log(collection.value)

