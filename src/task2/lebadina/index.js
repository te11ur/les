function calculator() {
    let mem = {};
    let memMax = 0;

    const clearMemory = () => {
        console.log('memory cleared')
        mem = {};
        memMax = 0
    };

    return function getFactorial(number, clearMem = false) {
        console.time(`Execution Time ${number}`);

        if(clearMem){
            clearMemory()
        }

        if(number <= 0) return;

        let n = memMax;
        let f = n ? mem[n] : 1;

        if(number <= n) {
            console.timeEnd(`Execution Time ${number}`);
            return mem[number];
        }
        else memMax = number;

        for (let i =  n ? n : 1; i <= number; i++){
            f *= i;
            if(!mem[i]) {
                mem[i] = f
            }
        }
        console.timeEnd(`Execution Time ${number}`);
        return f;
    }
}

const c = calculator();
console.log(c(10000));

console.log(c(10000));

console.log(c(10000, true));

//на низкой производительности - замедление цп х6:
//Execution Time 10000: 7.574951171875 ms
// index.js:46 Infinity
// index.js:29 Execution Time 10000: 0.005126953125 ms
// index.js:51 Infinity
// index.js:7 memory cleared
// index.js:40 Execution Time 10000: 3.228271484375 ms
// index.js:53 Infinity

