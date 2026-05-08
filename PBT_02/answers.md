

                                       Phiếu trả lời bài tập tuần 2


    Phần A:Kiểm tra đọc hiểu 

        Câu A1:10 input types khác nhau trong HTML5:       

        type="email" → Ô nhập văn bản, tự kiểm tra định dạng phải có dấu @ → Dùng cho form đăng ký tài khoản.

        type="password" → Ô nhập ẩn ký tự (hiện dấu chấm/sao) để bảo mật → Dùng cho ô nhập mật khẩu.

        type="number" → Ô nhập số kèm nút tăng/giảm, chặn nhập chữ → Dùng để chọn số lượng sản phẩm.

        type="tel" → Ô nhập văn bản tối ưu bàn phím số trên điện thoại → Dùng nhập số điện thoại nhận hàng.

        type="date" → Hiển thị bộ chọn lịch (Calendar) trực quan → Dùng chọn ngày sinh khách hàng.

        type="checkbox" → Ô vuông cho phép chọn nhiều lựa chọn cùng lúc → Dùng cho bộ lọc (chọn nhiều thương hiệu).

        type="radio" → Nút tròn chỉ cho phép chọn 1 trong nhóm → Dùng chọn phương thức thanh toán.

        type="file" → Nút bấm để tải tệp tin từ thiết bị lên → Dùng để đăng ảnh đánh giá sản phẩm.

        type="search" → Ô nhập văn bản có nút xóa nhanh (x) nội dung → Dùng cho thanh tìm kiếm hàng hóa.

        type="range" → Thanh trượt chọn giá trị trong một khoảng → Dùng để lọc sản phẩm theo tầm giá.

        Câu A2:

        Trường hợp 1: <input type="text" required value="">
        KHÔNG CHO PHÉP SUBMIT — Hiện thông báo lỗi

        TẠI SAO:

        Attribute required bắt buộc phải có giá trị
        value="" là rỗng → vi phạm constraint
        Browser thông báo "Please fill out this field"

        Trường hợp 2: <input type="email" value="abc">
        KHÔNG CHO PHÉP SUBMIT — Hiện thông báo lỗi

        TẠI SAO:

        type="email" tự động validate format email
        "abc" không có @ → không phải email hợp lệ
        Browser sẽ hiện: "Please enter a valid email address"
        Browser thông báo "Please include an '@' in the email address. 'abc' is missing an '@'

        Trường hợp 3: <input type="number" min="1" max="10" value="15">
        KHÔNG CHO PHÉP SUBMIT — Hiện thông báo lỗi

        TẠI SAO:

        type="number" với min="1" max="10" → giá trị phải trong khoảng [1, 10]
        Giá trị 15 vượt quá max (15 > 10)
        Browser thông báo "Value must be less than or equal to 10"

        Trường hợp 4: <input type="text" pattern="[0-9]{10}" value="abc123">
        KHÔNG CHO PHÉP SUBMIT — Hiện thông báo lỗi

        TẠI SAO:

        pattern="[0-9]{10}" = regex yêu cầu 10 chữ số liên tiếp
        "abc123" = 6 ký tự gồm chữ + số → không khớp pattern
        Browser thông báo "Please match the requested format"

        Trường hợp 5: <input type="password" minlength="8" value="123">
        KHÔNG CHO PHÉP SUBMIT — Hiện thông báo lỗi

        TẠI SAO:

        minlength="8" → bắt buộc tối thiểu 8 ký tự
        "123" có độ dài 3 ký tự < 8 → vi phạm constraint.
        Sau khi chạy code thì đúng với kết quả dự đoán.

        Câu A3:

        1. <label for="email"> — Screen reader biết field gì
            Không <label>: Screen reader chỉ đọc "Input field" (mù mờ)
            Có <label>: Screen reader đọc "Email, input field" (rõ ràng)
            Bonus: Người dùng có thể click label → focus input
        2. <fieldset> + <legend> — Nhóm input liên quan
            Dùng khi:

            Nhóm địa chỉ, thanh toán, dịch vụ
            Nhóm radio buttons, checkboxes
            Lợi ích:

            Screen reader đọc <legend> → hiểu bối cảnh
            Dễ style CSS
        3. aria-label — Dùng khi nào?
            Dùng cho:

            Button chỉ icon: <button aria-label="Tìm kiếm"></button>
            Icon link: <a aria-label="Hồ sơ"></a>
            KHÔNG dùng khi đã có <label>:
            <!-- Dư thừa -->
            <label for="email">Email:</label>
            <input aria-label="Email">  <!-- Thừa -->

        Câu A4:

        1.
        Cải thiện gì:

        Tốc độ load trang: Chỉ load ảnh khi user scroll đến (không load hết ngay)
        Tiết kiệm bandwidth: User không xem ảnh dưới → không tải dữ liệu
        Core Web Vitals tốt: Google ưa trang load nhanh

        KHÔNG nên dùng loading="lazy" khi:

        Ảnh ở above the fold (hiển thị ngay khi load trang)
        Ảnh quan trọng cho user experience (hero banner, product carousel)
        User có kết nối 2G/3G chậm → chậm hơn khi scroll

        2.
        Tại vì: Mỗi browser/device hỗ trợ format khác nhau. Một format video duy nhất = một số user xem không được.
        3 format video phổ biến:MP4,WebM,Ogg/Theora.

        3.
        Thuộc tính alt trên <img> dùng để:
        Screen reader: Nói cho user mù/khiếm thị biết ảnh gì
        Ảnh lỗi: Hiển thị text thay vì ảnh trắng
        SEO: Google hiểu nội dung ảnh
            3 alt tốt cho 3 trường hợp.

            <img src="iphone.jpg" alt="iPhone 16 Pro Max màu titan tự nhiên, góc phải 45 độ">

            <img src="divider.png" alt="" role="presentation">

            <img src="chart.jpg" alt="Biểu đồ doanh thu Q1/2026: Tháng 1 đạt 500 triệu, Tháng 2 đạt 650 triệu, Tháng 3 đạt 800 triệu">

        Câu A5:
         <img> vs <figure> + <figcaption> — Khi nào nên dùng:   
            Cách 1: <img> đơn thuần — Khi nào dùng? 
            Dùng khi:

            Ảnh không cần caption hoặc caption ở ngoài
            Ảnh là phần tử độc lập, không liên kết với text mô tả
            Ảnh inline trong bài viết (không cần "tham chiếu" gì)
            Ví dụ 1: Avatar/Icon trong comment
            <div class="comment">
                <img src="avatar.jpg" alt="Avatar người dùng Nguyễn Minh" 
                    width="48" height="48">
                <p>Nguyễn Minh: "Sản phẩm tốt lắm!"</p>
            </div>
            Ví dụ 2: Logo trong header:
            <header>
                <img src="logo.png" alt="Logo Shopee" width="100">
                <nav>...</nav>
            </header>

            Cách 2: <figure> + <figcaption> — Khi nào dùng?
            Dùng khi:

            Ảnh có caption mô tả quan trọng
            Ảnh là referenced content (tham chiếu, minh họa)
            Ảnh + caption cần grouped lại (semantic HTML5)
            Ảnh cần 'figure out' (hiểu rõ) — câu chuyện hoàn chỉnh

            Ví dụ 1: Sản phẩm + Giá (e-commerce)
            <figure>
                <img src="iphone16.jpg" 
                    alt="iPhone 16 Pro Max 256GB màu titan tự nhiên" 
                    width="600" height="600">
                <figcaption>iPhone 16 Pro Max — 25.990.000đ — 🌟 Bán chạy</figcaption>
            </figure>

            Ví dụ 2: Biểu đồ + Giải thích
            <figure>
                <img src="revenue-chart.jpg" 
                    alt="Biểu đồ doanh thu Q1/2026"
                    width="600" height="400">
                <figcaption>
                    <strong>Hình 1:</strong> Doanh thu tăng 60% từ tháng 1 đến tháng 3, 
                    chủ yếu từ bán hàng online
                </figcaption>
            </figure>

            <!-- Screen reader: "Figure: Biểu đồ doanh thu... Caption: Doanh thu tăng 60%..."
                → Ảnh + giải thích là một thể hoàn chỉnh (tham chiếu trong báo cáo) -->
        Phần C:Phân tích và suy luận

        Câu C1:

            Lỗi 1: Dòng 2 — Input "Tên" không có <label for="..."> và thiếu id, name, required
            Sửa: <label for="name">Tên:</label> <input type="text" id="name" name="name" required>

            Lỗi 2: Dòng 4 — Input "Email" không có <label> liên kết, thiếu id, name, required (placeholder không thay thế label)
            Sửa: <label for="email">Email của bạn:</label> <input type="email" id="email" name="email" required>

            Lỗi 3: Dòng 6 — Input "Mật khẩu" không có <label>, thiếu id, name, required
            Sửa: <label for="password">Mật khẩu:</label> <input type="password" id="password" name="password" required>

            Lỗi 4: Dòng 7 — Input "Nhập lại mật khẩu" không có <label>, thiếu id, name, required
            Sửa: <label for="confirm_password">Nhập lại mật khẩu:</label> <input type="password" id="confirm_password" name="confirm_password" required>

            Lỗi 5: Dòng 9 — Input "Phone" dùng type="text" thay vì type="tel", không có <label>, thiếu id, name, dùng value làm placeholder
            Sửa: <label for="phone">Phone:</label> <input type="tel" id="phone" name="phone" placeholder="0901234567" required>

            Lỗi 6: Dòng 11 — <select> không có <label>, thiếu id, name, required, thiếu default option
            Sửa: <label for="city">Thành phố:</label>
            <select id="city" name="city" required>
                <option value="">-- Chọn thành phố --</option>
                <option value="hanoi">Hà Nội</option>
                <option value="hcm">TP.HCM</option>
            </select>

            Lỗi 7: Dòng 17 — <label> không có checkbox input, không có for attribute
            Sửa: <input type="checkbox" id="agree" name="agree" required>
            <label for="agree">Tôi đồng ý điều khoản</label>

            Lỗi 8: Dòng 1 — <form> thiếu method, action, và không có novalidate hoặc enctype (tuỳ mục đích)
            Sửa: <form method="POST" action="/submit" novalidate>
                 ...
                </form>
        
        Câu C2:

        pattern regex cho CMND/CCCD và Số tài khoản:
        CMND/CCCD (12 chữ số):^\d{12}$
        ^ = bắt đầu chuỗi
        \d{12} = đúng 12 chữ số
        $ = kết thúc chuỗi
        Số tài khoản (10-15 chữ số):^\d{10,15}$
        \d{10,15} = từ 10 đến 15 chữ số

        HTML5 validation đủ an toàn cho ứng dụng ngân hàng chưa? Tại sao?
        Vấn đề và giải thích
        Client-side dễ bypass->	Người dùng có thể tắt JavaScript hoặc inspect element để xóa required, pattern
        Chỉ kiểm tra format->Không thể xác nhận CMND/CCCD có tồn tại, số tài khoản có đúng chủ người không
        Không bảo mật->	Các thông tin nhạy cảm (PIN, tài khoản) được xử lý trên client
        Không ghi log, audit	->Không có track record về yêu cầu từ phía server
        Man-in-the-middle	->Nếu không dùng HTTPS, dữ liệu có thể bị chặn

        Liệt kê 3 loại validation mà HTML5 KHÔNG THỂ làm được (phải dùng JavaScript):
        Loại 1: Kiểm tra dữ liệu tồn tại trong Database
        Loại 2: Validation phức tạp giữa các field (Cross-field validation)
        Loại 3: Kiểm tra logic nghiệp vụ (Business Logic)

        Nêu 2 rủi ro bảo mật nếu chỉ validate trên Frontend mà không validate Backend:
        Rủi ro 1: SQL Injection & Code Injection
        Rủi ro 2: Bypass Quy Tắc Kinh Doanh & Gian Lận
