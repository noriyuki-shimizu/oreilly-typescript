function* fib(): Generator<number> {
    let a = 0, b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b]
    }
}

const gen = fib()
for (let i = 1; i < 10; i++) {
    console.log(gen.next().value)
}


const numbers = {
    *[Symbol.iterator]() {
        for (let n = 1; n <= 10; n++) {
            yield n;
        }
    }
}

for (let a of numbers) {
    console.log(a);
}

let allNumbers = [...numbers];
console.log(allNumbers);

let [one, two, ...rest] = numbers;
console.log(one, two, rest);
