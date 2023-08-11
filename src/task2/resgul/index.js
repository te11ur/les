function createBase() {
  let base = {};

  return function (value, result) {
    if (value && result) base[value] = result;
    return base;
  }
}

function getFactorial(value) {
  let sum = 1;
  const base = saveDate();

  if (base[value]) return base[value];
  if (value - 1 > 0) sum = getFactorial(value-1) * value;

  saveDate(value, sum);

  return sum;
}

const saveDate = createBase();
console.log('factorial_4 = ' + getFactorial(4));
console.log('factorial_5 = ' + getFactorial(5));
console.log('factorial_3 = ' + getFactorial(3));