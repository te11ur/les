import { Node } from './Node.js';

const root = new Node();

const el1 = new Node();
const el2 = new Node();
const el3 = new Node();
const el4 = new Node();
const el5 = new Node();
const el6 = new Node();
const el7 = new Node();
const el8 = new Node();
const el9 = new Node();

el3.add(el1);
el3.add(el2);
el4.add(el5);
el4.add(el6);

el7.add(el3);
el7.add(el8);

root.add(el4);
root.add(el9);
root.add(el7);

root.remove(3);
root.each((node) => {
	console.log(node.id);
});

// root.remove(1)
// root.each((node)=>{console.log(node.id)})