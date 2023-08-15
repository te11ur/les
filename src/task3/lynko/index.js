import { Collection } from "./Collection.js";

const collection = new Collection();


collection.push(7);
collection.push(5);
collection.push(3);
collection.push(1);
collection.push('world');
collection.push('hello');
collection.push('!!!');
collection.push([1, 2, 3, 4]);
collection.push({1: 'a', 2: 'b', 3: 'c'});
collection.push(['bbb', 'aaa']);
collection.sort();

collection.pop('number');
collection.pop('string');
collection.pop('object');
collection.sort();

collection.unshift(4);
collection.unshift('???');
collection.unshift(['ggg', 'fff', 'eee', 'ddd', 'ccc']);
collection.sort();


collection.shift('number');
collection.shift('string');
collection.shift('object');
collection.sort();


collection.each((elem) => console.log(elem));
console.log(collection, `length: ${collection.length}`);