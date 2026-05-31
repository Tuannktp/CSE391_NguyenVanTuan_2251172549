                                            Phiếu bài tập số 7
Phần A:
    Câu A1:
    Đoán output:

    Đoạn 1:
    in ra: undefined

    Đoạn 2:
    lỗi ReferenceError (không thể truy cập y trước khi khởi tạo)

    Đoạn 3:
    lỗi TypeError (gán lại cho const z không được phép), không đến được console.log(z)

    Đoạn 4:
    in ra: [1, 2, 3, 4]

    Đoạn 5:
    in ra:
    Trong block: 2
    Ngoài block: 1
    Giải thích sau khi chạy code:
        var x = 5
        var hoisted nên x tồn tại trước console.log, nhưng chưa được gán giá trị, nên kết quả là undefined.

        let y = 10
        let cũng hoisted nhưng vào “Temporal Dead Zone” (TDZ). Truy cập trước khi khởi tạo sẽ gây ReferenceError.

        const z = 15
        const tạo binding hằng. Cố gắng gán lại z = 20 gây TypeError và ngăn dòng console.log(z) chạy.

        const arr = [1, 2, 3]
        const chỉ khóa binding, không khóa nội dung object/array. arr.push(4) vẫn hợp lệ, nên mảng thành [1, 2, 3, 4].

        let a = 1
        let có block scope. Biến a bên trong block là một biến khác, nên console.log("Trong block:", a) in 2, còn bên ngoài vẫn là 1.

    Câu A2:
        Dự đoán kết quả
        console.log(typeof null); → object
        console.log(typeof undefined); → undefined
        console.log(typeof NaN); → number
        console.log("5" + 3); → "53"
        console.log("5" - 3); → 2
        console.log("5" * "3"); → 15
        console.log(true + true); → 2
        console.log([] + []); → "" (empty string)
        console.log([] + {}); → "[object Object]"
        console.log({} + []); → "[object Object]"

        Giải thích vì sao "5" + 3 và "5" - 3 khác nhau
        + là toán tử đặc biệt trong JavaScript: nếu một toán hạng là string, nó chuyển sang nối chuỗi.
        "5" + 3 → "5" + "3" → "53"
        - chỉ là toán tử số học, nên JavaScript chuyển cả hai toán hạng sang number trước khi tính.
        "5" - 3 → 5 - 3 → 2
    
    Câu A3:
        Dự đoán:
        5 == "5" → true
        5 === "5" → false
        null == undefined → true
        null === undefined → false
        NaN == NaN → false
        0 == false → true
        0 === false → false
        "" == false → true
        Quy tắc:
            Nên dùng === (strict equality) thay vì ==
            Vì === so sánh cả giá trị và kiểu, không tự động ép kiểu
            == gây ra nhiều kết quả bất ngờ do coercion, ví dụ "" == false, 0 == false, null == undefined
            Chỉ dùng == khi bạn thực sự muốn kiểm tra null và undefined cùng lúc, ví dụ value == null để kiểm null hoặc undefined cùng lúc

    Câu A4:
        Giá trị falsy trong JavaScript
        false
        0
        -0
        0n
        "" (empty string)
        null
        undefined
        NaN
        Tất cả giá trị khác trong JS đều là truthy.

        Dự đoán kết quả
            if ("0") console.log("A"); → In A
            if ("") console.log("B"); → Không in
            if ([]) console.log("C"); → In C
            if ({}) console.log("D"); → In D
            if (null) console.log("E"); → Không in
            if (0) console.log("F"); → Không in
            if (-1) console.log("G"); → In G
            if (" ") console.log("H"); → In H

    Câu A5:
        Viết lại 3 cách nối:
        Cách 1:
        var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

        Cách 2:
        var url = `https://api.example.com/users/${userId}/orders?page=${page}`;

        Cách 3:
        var html = `
            <h1>${title}</h1>
            <p>${description}</p>
            <p>Giá: ${price}đ</p>
            `;

Phần C:

        Câu C1:Sửa lại đoạn code
       Các lỗi tìm thấy & Cách khắc phụcLỗi cú pháp (Syntax error): if (phanTramGiam 100) — Thiếu toán tử so sánh; đã sửa thành phanTram < 0 || phanTram > 100 để kiểm tra khoảng giá trị hợp lệ.
       Sai sót giữa so sánh và gán dữ liệu (Invalid comparison / assignment): if (giaSauGiam = 0) — Sử dụng nhầm toán tử gán (=); đã sửa thành toán tử so sánh bằng nghiêm ngặt if (giaSauGiam === 0).
       Chưa xử lý kiểu dữ liệu đầu vào (No input type handling): giaBan và phanTramGiam có thể là chuỗi ký tự (string) $\rightarrow$ dễ dẫn đến kết quả NaN hoặc lỗi không mong muốn; đã khắc phục bằng cách ép kiểu sang số với Number() và kiểm tra bằng isFinite / isNaN.Thiếu kiểm tra tính hợp lệ của phần trăm: 
       Giá trị phần trăm không được kiểm tra trước khi tính toán (Ví dụ: truyền vào 110); hiện tại hàm sẽ trả về chuỗi "Phần trăm giảm không hợp lệ".Lỗi Closure khi dùng var trong vòng lặp (Closure bug with var in loop): 
       Vòng lặp for (var i = 0; i < 5; i++) kết hợp với setTimeout sẽ in ra giá trị cuối cùng của i cho tất cả các hàm callback; đã đổi thành let i để mỗi lượt lặp tự lưu giữ (capture) một giá trị i riêng biệt.Xử lý lỗi chưa nhất quán/chưa rõ ràng: 
       Hàm cũ có thể bị crash (quăng lỗi) hoặc trả về NaN; hiện tại hàm đã trả về các chuỗi thông báo lỗi rõ ràng nếu đầu vào không hợp lệ, ngược lại sẽ trả về một kết quả kiểu số chuẩn xác.