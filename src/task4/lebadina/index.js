import {Collection2, Collection3} from "./Collection.js";
import {math} from "./Math.js";

let arr = [];
for (let i = 0; i < 20000; i++) {
    arr.push((Math.random() * 10))
}

let collection = new Collection2();
collection.push(...arr)//ExTime push: 594.0830078125 ms
let collection2 = new Collection3();
collection2.add(...arr)//ExTime add: 2061.384033203125
console.log(collection.length)
console.log(collection2.items.length)


math.factorial(1000000000)
    .then((res) => {
        console.log(res)
    })

math.lerp(0, 50, 0.5)
    .then((res) => {
        console.log(res)
    })

math.sqrt(40)
    .then((res) => {
        console.log(res)
})

math.pow(5, 2)
    .then((res) => {
    console.log(res)
})
