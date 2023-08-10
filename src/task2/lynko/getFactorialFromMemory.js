
const saveResult = (cb) => {
    let numbers = {};
    return (...params) => {
    let number = params[0];
      if (number in numbers) {
        return numbers[number];
      } else {
        let factorial = cb(number);
        numbers[number] = factorial;
        return factorial;
      }
    };
  };
  
export const getFactorialFromMemory = saveResult((number) => {
  let result = 0;
    if (number == 1) {
      result = number;
    } else {
      result = number * getFactorialFromMemory(number - 1);
    }
    return result;
});