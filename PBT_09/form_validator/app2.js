// --- TRUY VẤN CÁC PHẦN TỬ DOM ---
const form = document.getElementById('registerForm');
const username = document.getElementById('username');
const usernameIcon = document.getElementById('usernameIcon');
const usernameError = document.getElementById('usernameError');

const email = document.getElementById('email');
const emailError = document.getElementById('emailError');

const password = document.getElementById('password');
const strengthBarContainer = document.querySelector('.strength-bar-container');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

const confirmPassword = document.getElementById('confirmPassword');
const confirmPasswordError = document.getElementById('confirmPasswordError');

const phone = document.getElementById('phone');
const phoneError = document.getElementById('phoneError');

const submitBtn = document.getElementById('submitBtn');

const successModal = document.getElementById('successModal');
const modalData = document.getElementById('modalData');
const closeModalBtn = document.getElementById('closeModalBtn');

// --- TRẠNG THÁI VALID CỦA CÁC Ô NHẬP ---
let validState = { username: false, email: false, password: false, confirmPassword: false, phone: false };

// Hàm kiểm tra tổng thể để bật/tắt nút Submit
function checkFormValidity() {
    const isFormValid = Object.values(validState).every(status => status === true);
    submitBtn.disabled = !isFormValid;
}

// 1. VALIDATE TÊN (2 - 50 ký tự)
username.addEventListener('input', () => {
    const val = username.value.trim();
    if (val.length >= 2 && val.length <= 50) {
        usernameIcon.textContent = '✅';
        usernameError.textContent = '';
        validState.username = true;
    } else {
        usernameIcon.textContent = '❌';
        usernameError.textContent = 'Tên phải nằm trong khoảng 2 - 50 ký tự.';
        validState.username = false;
    }
    checkFormValidity();
});

// 2. VALIDATE EMAIL (Dùng Regex chuẩn)
email.addEventListener('input', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email.value)) {
        emailError.textContent = '';
        validState.email = true;
    } else {
        emailError.textContent = 'Định dạng Email không hợp lệ (ví dụ: abc@gmail.com).';
        validState.email = false;
    }
    checkFormValidity();
});

// 3. VALIDATE & ĐO ĐỘ MẠNH PASSWORD
password.addEventListener('input', () => {
    const val = password.value;
    
    if (val.length === 0) {
        strengthBarContainer.style.display = 'none';
        strengthText.textContent = '';
        validState.password = false;
        checkFormValidity();
        return;
    }

    strengthBarContainer.style.display = 'block';
    strengthBar.className = 'strength-bar'; // Reset class màu cũ

    // Thiết lập các Regex điều kiện
    const hasLetter = /[a-zA-Z]/.test(val);
    const hasDigit = /\d/.test(val);
    const hasUpper = /[A-Z]/.test(val);
    const hasLower = /[a-z]/.test(val);
    const hasSpecial = /[^a-zA-Z0-9]/.test(val);

    // Tính toán độ mạnh dựa trên tiêu chí đề bài
    if (val.length >= 8 && hasUpper && hasLower && hasDigit && hasSpecial) {
        strengthBar.classList.add('strong');
        strengthText.textContent = 'Mức độ: Mạnh';
        strengthText.style.color = '#00cc66';
        validState.password = true;
    } else if (val.length >= 8 && hasLetter && hasDigit) {
        strengthBar.classList.add('medium');
        strengthText.textContent = 'Mức độ: Trung bình';
        strengthText.style.color = '#ffcc00';
        validState.password = true;
    } else {
        strengthBar.classList.add('weak');
        strengthText.textContent = 'Mức độ: Yếu (Mật khẩu cần tối thiểu 8 ký tự)';
        strengthText.style.color = '#ff3333';
        validState.password = false;
    }

    // Tiện thể check lại ô Confirm Password xem còn khớp không nếu mật khẩu chính thay đổi
    validateConfirmPassword();
    checkFormValidity();
});

// 4. VALIDATE CONFIRM PASSWORD (Real-time đối chiếu)
confirmPassword.addEventListener('input', validateConfirmPassword);

function validateConfirmPassword() {
    if (confirmPassword.value === password.value && password.value.length > 0) {
        confirmPasswordError.textContent = '';
        validState.confirmPassword = true;
    } else {
        confirmPasswordError.textContent = 'Mật khẩu xác nhận không trùng khớp.';
        validState.confirmPassword = false;
    }
    checkFormValidity();
}

// 5. VALIDATE PHONE (Tự gạch nối định dạng: 0901-234-567)
phone.addEventListener('input', (e) => {
    // Chỉ lấy các chữ số từ dữ liệu nhập vào
    let rawVal = phone.value.replace(/\D/g, ''); 
    let formattedVal = '';

    // Tiến hành gộp nối chuỗi bằng dấu gạch ngang theo độ dài
    if (rawVal.length > 0) {
        formattedVal = rawVal.substring(0, 4);
    }
    if (rawVal.length > 4) {
        formattedVal += '-' + rawVal.substring(4, 7);
    }
    if (rawVal.length > 7) {
        formattedVal += '-' + rawVal.substring(7, 10);
    }

    // Gán lại chuỗi đã format đẹp mắt vào input
    phone.value = formattedVal;

    // Kiểm tra xem số điện thoại thô đã đủ 10 số hay chưa
    if (rawVal.length === 10) {
        phoneError.textContent = '';
        validState.phone = true;
    } else {
        phoneError.textContent = 'Số điện thoại phải bao gồm đúng 10 chữ số.';
        validState.phone = false;
    }
    checkFormValidity();
});

// 6. XỬ LÝ SỰ KIỆN SUBMIT FORM & HIỂN THỊ MODAL THÔNG TIN
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Ngăn hành vi tải lại trang mặc định của form

    // Chèn thông tin đã đăng ký hợp lệ vào cấu trúc của Modal (Dùng textContent bảo mật)
    modalData.innerHTML = ''; // Clear dữ liệu cũ
    
    const pName = document.createElement('p'); pName.textContent = `• Họ tên: ${username.value}`;
    const pEmail = document.createElement('p'); pEmail.textContent = `• Email: ${email.value}`;
    const pPhone = document.createElement('p'); pPhone.textContent = `• Điện thoại: ${phone.value}`;

    modalData.appendChild(pName);
    modalData.appendChild(pEmail);
    modalData.appendChild(pPhone);

    // Mở hiển thị Modal
    successModal.style.display = 'flex';
});

// Đóng modal, đồng thời reset form về trạng thái ban đầu để đăng ký lượt mới
closeModalBtn.addEventListener('click', () => {
    successModal.style.display = 'none';
    form.reset();
    strengthBarContainer.style.display = 'none';
    strengthText.textContent = '';
    usernameIcon.textContent = '';
    validState = { username: false, email: false, password: false, confirmPassword: false, phone: false };
    checkFormValidity();
});