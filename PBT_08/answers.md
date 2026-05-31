                                                    Phiếu bài tập tuần 8
Phần A:
    Câu A1:

    1. Function Declaration
    function tinhThueBaoHiem(luong) {
    const thuong = luong > 11000000 ? luong * 0.1 : 0;
    const thuc_nhan = luong - thuong;
    return { thuong, thuc_nhan };
    }

    2. Function Expression
    const tinhThueBaoHiem = function(luong) {
    const thuong = luong > 11000000 ? luong * 0.1 : 0;
    const thuc_nhan = luong - thuong;
    return { thuong, thuc_nhan };
    };

    3. Arrow Function
    const tinhThueBaoHiem = (luong) => {
    const thuong = luong > 11000000 ? luong * 0.1 : 0;
    const thuc_nhan = luong - thuong;
    return { thuong, thuc_nhan };
    };
        
    Cách tính thuế
    Với luong > 11.000.000:

    thuong = luong * 0.1
    thuc_nhan = luong - thuong
    Với luong <= 11.000.000:

    thuong = 0
    thuc_nhan = luong

    Hoisting khác nhau không?
    Có, khác nhau.

    Function Declaration
    Được hoisted hoàn chỉnh, nên có thể gọi trước khi định nghĩa.
    console.log(tinhThueBaoHiem(12000000)); // hoạt động

    function tinhThueBaoHiem(luong) {
    return { thuong: luong > 11000000 ? luong * 0.1 : 0, thuc_nhan: luong - (luong > 11000000 ? luong * 0.1 : 0) };
    }
    Function Expression / Arrow Function
    Chỉ hoisted biến const/let/var, chứ không hoisted giá trị hàm. Nếu gọi trước định nghĩa sẽ lỗi.
    console.log(tinhThueBaoHiem(12000000)); // ReferenceError nếu dùng const/let

    const tinhThueBaoHiem = function(luong) {
    return { thuong: luong > 11000000 ? luong * 0.1 : 0, thuc_nhan: luong - (luong > 11000000 ? luong * 0.1 : 0) };
    };và với arrow:
    console.log(tinhThueBaoHiem(12000000)); // ReferenceError nếu dùng const/let

    const tinhThueBaoHiem = (luong) => {
    return { thuong: luong > 11000000 ? luong * 0.1 : 0, thuc_nhan: luong - (luong > 11000000 ? luong * 0.1 : 0) };
    };
    Ví dụ cụ thể:
     Declaration
        console.log(declare(12000000)); // OK
        function declare(luong) { return luong > 11000000 ? 1 : 0; }

        // Expression
        console.log(expr(12000000)); // ReferenceError
        const expr = function(luong) { return luong > 11000000 ? 1 : 0; };

        // Arrow
        console.log(arrow(12000000)); // ReferenceError
        const arrow = (luong) => luong > 11000000 ? 1 : 0;
    Câu A2:
    Đoạn 1:
     Dự đoán output:
        console.log(c.increment());  // 1
        console.log(c.increment());  // 2
        console.log(c.increment());  // 3
        console.log(c.decrement());  // 2
        console.log(c.getCount());   // 2
    Đoạn 2:
        for (var i = 0; i < 3; i++) {
            setTimeout(() => console.log("var:", i), 100);
        }
        for (let j = 0; j < 3; j++) {
            setTimeout(() => console.log("let:", j), 200);
        }
        Đự đoán output:
                var: 3
                var: 3
                var: 3
                let: 0
                let: 1
                let: 2`
    Tại sao var và let khác nhau?
        var
        var là biến function-scoped.
        Trong vòng lặp for (var i = 0; i < 3; i++), chỉ có một biến i chung cho tất cả các lần lặp.
        setTimeout là callback chạy muộn, sau khi vòng lặp đã kết thúc.
        Khi callback chạy, i đã tăng tới 3.
        Vì vậy cả 3 callback đều in 3.
        let
        let là biến block-scoped.
        Với for (let j = 0; j < 3; j++), mỗi lần lặp tạo một binding riêng cho j.
        Mỗi callback setTimeout nhớ đúng giá trị j tại lần lặp đó.
        Do đó kết quả lần lượt là 0, 1, 2.

    Câu A3:
        
        const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        1. Lấy các số chẵn
        const soChan = nums.filter(n => n % 2 === 0);

        2. Nhân mỗi số với 3
        const nhanBa = nums.map(n => n * 3);

        3. Tính tổng tất cả
        const tong = nums.reduce((acc, curr) => acc + curr, 0);

        4. Tìm số đầu tiên > 7
        const soDauTienLonHon7 = nums.find(n => n > 7);

        5. Kiểm tra CÓ số > 10 không
        const coSoLonHon10 = nums.some(n => n > 10);

        6. Kiểm tra TẤT CẢ đều > 0
        const tatCaLonHon0 = nums.every(n => n > 0);

        7. Tạo mảng "Số X là [chẵn/lẻ]"
        const mangChuoi = nums.map(n => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);

        8. Đảo ngược mảng (không mutate / không làm thay đổi mảng gốc nums)
        const daoNguoc = [...nums].reverse();