import { MyMath } from './MyMath.js';

console.log('MyMath.pow(2, 3):', MyMath.pow(2, 3));
MyMath.pow(2, 3).then((res) => console.log('MyMath.pow(2, 3).then(res => {}):', res));

// MyMath.PI = 1;
console.log('MyMath.PI:', MyMath.PI);

console.log('MyMath.clamp(24, 4, 16):', MyMath.clamp(24, 4, 16));
