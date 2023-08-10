function createBase() {
  let base = {};

  return function (value, result) {
    if (value && result) base[value] = result;
    return base;
  }
}

const saveDate = createBase();

let i = 0;

function getFactorial(value) {
  console.log(`iter_${i}, value_${value}`);
  let sum = 1;
  const base = saveDate();

  if (base[value]) return base[value];
  if (value - 1 > 0) sum = getFactorial(value-1) * value;

  saveDate(value, sum);

  return sum;
}

console.log('factorial_5 = ' + getFactorial(5));
console.log('factorial_6 = ' + getFactorial(6));
console.log('factorial_3 = ' + getFactorial(3));