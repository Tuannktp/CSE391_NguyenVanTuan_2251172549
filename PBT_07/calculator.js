function calculate(num1, operator, num2) {
    const a = Number(num1);
    const b = Number(num2);
    
    if (Number.isNaN(a) || Number.isNaN(b)) {
        return 'Lỗi: Input phải là số hợp lệ.';
    }

    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b === 0) {
                return 'Lỗi: Không thể chia cho 0.';
            }
            return a / b;
        case '%':
            if (b === 0) {
                return 'Lỗi: Không thể chia cho 0.';
            }
            return a % b;
        case '**':
            return a ** b;
        default:
            return 'Lỗi: Operator không hợp lệ. Vui lòng dùng +, -, *, /, %, **.';
    }
}

module.exports = calculate;

console.log(calculate(10, "+", 5));    // → 15
console.log(calculate(10, "/", 0));    // → "Lỗi: Không thể chia cho 0"
console.log(calculate(10, "^", 5));    // → "Lỗi: Operator '^' không hợp lệ"
console.log(calculate("abc", "+", 5)); // → "Lỗi: Input không phải số"
console.log(calculate(2, "**", 10));