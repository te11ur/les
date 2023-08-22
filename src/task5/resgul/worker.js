function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

onmessage = function (e) {
  console.log('внутри воркера');

  const num = e.data;
  if (Number.isInteger(parseInt(num))) {
    const result = fib(num);
    postMessage(result);
  } else {
   throw new Error('not a number')
  }
}