function factorial() {
  const oldResult = {};

  const saveResultFactorial = (key, value) => {
    oldResult[key] = value;
  }
  

  const calculateFactorial = (n) => {
    if (typeof n !== 'number' || n < 0) {
      return;
    }

    if (n === 0) {
      return 1;
    }

    let num = 1;
    let result = 1;

    if (oldResult[n]) {
      console.log(`Result from memory: ${n}: ${oldResult[n]}`);
      return oldResult[n];
    }

    for(let i = n; i > 0; i--) {
      if (oldResult[i]) {
        num = i;
        result = oldResult[i]
        break;
      }
    }
    

    while(num < n) {
      num ++;
      result = result * num;
      saveResultFactorial(num, result);
    }
    return result;
  }
  
  return calculateFactorial;
}

const factorialRes = factorial();

console.log(factorialRes(50));

console.log(factorialRes(55));


console.log(factorialRes(10));