import { Node } from "./Node.js";

const rootNode = new Node("root");

const reshad = new Node("Reshad");
const aziz = new Node("Aziz");
const anton_p = new Node("Anton_P");

rootNode.add(reshad);
rootNode.add(aziz);
rootNode.add(anton_p);

const masha = new Node("Masha");
const nastya = new Node("Nastya");

reshad.add(masha);
reshad.add(nastya);

const anton_k = new Node("Anton_K");
const roma = new Node("Roma");
const lesha = new Node("Lesha");

aziz.add(anton_k);
aziz.add(roma);
aziz.add(lesha);

aziz.remove(roma);
reshad.remove(nastya);

anton_k.add(roma);
anton_k.add(nastya);

rootNode.each((person) => {
  person.bestOfTheBest = true;
});

console.log(rootNode);
