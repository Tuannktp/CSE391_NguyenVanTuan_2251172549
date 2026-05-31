const secret臨umber = Math.floor(Math.random() * 100) + 1;

const MAX_ATTEMPTS = 7;
let attempts = 0;
let guessedNumbers = []; 
let isWin = false;

alert("Chào mừng bạn đến với Game Đoán Số!\nMáy đã chọn ngẫu nhiên 1 số từ 1 đến 100. Bạn có tối đa 7 lượt đoán!");

while (attempts < MAX_ATTEMPTS) {
    let remaining = MAX_ATTEMPTS - attempts;
    let input = prompt(`Lượt thứ ${attempts + 1}/${MAX_ATTEMPTS} (Còn ${remaining} lượt).\nNhập số bạn đoán (1-100):`);
    
    if (input === null) {
        alert("Bạn đã thoát trò chơi.");
        break;
    }
    
    let guess = parseInt(input);
    
    if (isNaN(guess) || guess < 1 || guess > 100) {
        alert("Lỗi: Vui lòng chỉ nhập số nguyên hợp lệ trong khoảng từ 1 đến 100!");
        continue;
    }
    
    let isDuplicated = false;
    for (let i = 0; i < guessedNumbers.length; i++) {
        if (guessedNumbers[i] === guess) {
            isDuplicated = true;
            break;
        }
    }
    if (isDuplicated) {
        alert(`Bạn đã đoán số ${guess} này rồi! Vui lòng chọn số khác.`);
        continue; 
    }
    
    guessedNumbers.push(guess);
    attempts++;
    
    if (guess === secret臨umber) {
        alert(`Đúng rồi!\nBạn đoán đúng sau ${attempts} lần!`);
        isWin = true;
        break;
    } else if (guess > secret臨umber) {
        alert("Thấp hơn!");
    } else {
        alert("Cao hơn!");
    }
}

if (!isWin && attempts === MAX_ATTEMPTS) {
    alert(`Bạn đã hết lượt đoán! Bạn đã THUA.\nĐáp án chính xác là: ${secret臨umber}`);
}