const factWithlMemo = () => {
  const cache = [1];

  const calculate = (n) => {
    if (!cache[n]) {
      cache[n] = n * calculate(n - 1);
    }

    return cache[n];
  };

  return calculate;
};

export default factWithlMemo();
