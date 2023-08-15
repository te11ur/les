import { Collection } from './Collection.js';

const myCollection = new Collection();

myCollection.addItem(5);
myCollection.addItem(2);
myCollection.addItem(8);
myCollection.addItem(1);
myCollection.addItem(8);
myCollection.addItem(3);

const items = myCollection.getItems();

console.log(myCollection.quickSort(items));