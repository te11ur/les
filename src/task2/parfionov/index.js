const result = () => {
    const prevResults = [1];
    const factorial = (num) => {
        if (num > prevResults.length) {
            const length = prevResults.length
            for (let i = length; i <= num; i++) {
                prevResults.push(prevResults[i - 1] *= i + 1);
            }
        }
        return prevResults[num - 2];
    }
    return factorial
}

const res = result();

res(10)
res(3)
res(15)
res(5)
