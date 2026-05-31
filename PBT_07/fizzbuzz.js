
console.log("=== VERSION 1: CLASSIC FIZZBUZZ ===");

for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
    } else if (i % 3 === 0) {
        console.log("Fizz");
    } else if (i % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
}

console.log("\n==========================================\n");


console.log("=== VERSION 2: CUSTOM FIZZBUZZ ===");

/**
 * Hàm customFizzBuzz in các số từ 1 đến n dựa trên bộ rules động
 * @param {number} n - Giới hạn số cần in
 * @param {Array} rules - Mảng các object chứa bộ lọc { divisor, word }
 */
function customFizzBuzz(n, rules) {
    for (let i = 1; i <= n; i++) {
        let resultStr = "";

        for (let j = 0; j < rules.length; j++) {
            if (i % rules[j].divisor === 0) {
                resultStr += rules[j].word;
            }
        }

        if (resultStr !== "") {
            console.log(`${i} = "${resultStr}"`);
        } else {
            console.log(i);
        }
    }
}

customFizzBuzz(30, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);