
function pipe(...fns) {
    
    return function (initialValue) {
        
        return fns.reduce((currentValue, currentFn) => {
            return currentFn(currentValue);
        }, initialValue);
    };
}


console.log("=== TEST PIPE ===");
const process = pipe(
    x => x * 2,        
    x => x + 10,       
    x => x.toString(), 
    x => "Kết quả: " + x
);
console.log(process(5)); 
console.log("------------------------------------------\n");


function memoize(fn) {
    
    const cache = {};

    return function (...args) {
     
        const key = JSON.stringify(args);
        if (key in cache) {
            return cache[key];
        }

        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

console.log("=== TEST MEMOIZE ===");
const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});

console.log(expensiveCalc(1000000)); 
console.log(expensiveCalc(1000000)); 
console.log("------------------------------------------\n");



function debounce(fn, delay) {
    let timeoutId = null;

    return function (...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Thiết lập một bộ đếm giờ mới toanh
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

// --- Test debounce() ---
console.log("=== TEST DEBOUNCE ===");
const search = debounce((query) => {
    console.log("-> Bắt đầu tìm kiếm với từ khóa:", query);
}, 500);


search("j");
search("ja");
search("jav");
search("javas"); 



async function retry(fn, maxAttempts = 3) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            
            return await fn();
        } catch (error) {
            console.log(`[Lần thử ${attempt}/${maxAttempts}] Thất bại do: ${error.message}`);
            
           
            if (attempt === maxAttempts) {
                throw new Error(`Đã thử lại ${maxAttempts} lần nhưng vẫn thất bại hoàn toàn!`);
            }
        }
    }
}


const fetchUnstableData = (() => {
    let callCount = 0;
    return async () => {
        callCount++;
        if (callCount < 3) {
            throw new Error("Lỗi kết nối Server mạng (Timeout).");
        }
        return "Dữ liệu Server tải thành công!";
    };
})();


setTimeout(async () => {
    console.log("\n=== TEST RETRY ===");
    try {
        const data = await retry(fetchUnstableData, 3);
        console.log("Kết quả cuối cùng thu được:", data);
    } catch (err) {
        console.error("Lỗi nghiêm trọng:", err.message);
    }
}, 1000);