import execInWorker from './execInWorker.js';

const sum = (...numbers) => {
  return numbers.reduce((prev, current) => prev + current);
};
const sumInWorker = execInWorker(sum);
sumInWorker(1, 2, 3, 4).then((result) => console.log(result));
