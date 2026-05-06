Phần A:
    Câu A1(5đ) — HTTP & Browser

        Câu 1:5 Bước Chính từ DNS Lookup đến Render:
            Bước 1: DNS Lookup
                Trình duyệt chuyển đổi domain shopee.vn thành IP address của server thực tế
                Nguồn: tuan_1_html5/01_introduction_html_universe.md - Phần "1.2. HTTP — Ngôn  ngữ để Client và Server hiểu nhau" (liên quan đến kiến trúc Client-Server)
            Bước 2:Kết nối mạng & Gửi HTTP Request
                Request của bạn xuất phát từ laptop → qua router WiFi → qua ISP (nhà mạng) → chạy qua cáp quang xuyên đất → đến Data Center của Shopee
                Nguồn: tuan_1_html5/01_introduction_html_universe.md - Phần "Cuộc Hành Trình 0.3 Giây Xuyên Đại Dương":
            Bước 3:Server Xử lý & Gửi Response
                Server nhận request, xử lý logic (query database, chuẩn bị dữ liệu) → gửi trả file HTML, CSS, JavaScript
                Nguồn: tuan_1_html5/01_introduction_html_universe.md - 
            Bước 4:Browser Parse HTML/CSS/JS
                Chrome nhận file từ server
                Parse HTML: Đọc cấu trúc DOM (các phần tử, tags)
                Parse CSS: Đọc styling (màu sắc, bố cục, font)
                Execute JavaScript: Chạy logic tương tác
                Nguồn: tuan_1_html5/01_introduction_html_universe.md - Phần "1.3. Browser Rendering":
            Bước 5:Paint & Render (Hiển thị Giao diện)
                Browser vẽ trang web lên màn hình → Bạn thấy trang Shopee
                Nguồn: tuan_1_html5/01_introduction_html_universe.md - Phần "1.3. Browser Rendering":
    Câu 2:
        Các thông tin chính:
        Danh sách Requests - Tất cả HTTP requests được gửi:
            HTML files, CSS files, JS files
            Hình ảnh, fonts, media
            API calls (fetch requests)
        Response Status & Code:
            200 OK - Thành công
            404 Not Found - File không tìm thấy
            500 Server Error - Lỗi server
            Nguồn:(Theo tuan_1_html5/01_introduction_html_universe.md - phần HTTP Response Codes)
        Headers (Request & Response):
            Content-Type, User-Agent
            Authorization tokens
            Cache control info
            Response Body
        Data trả về từ server (JSON, HTML, CSS, etc.):
            Waterfall & Timing
            DNS Lookup time
            Connection time
            Request time
            Response time
            Nguồn:(Liên quan đến khái niệm "0.3 giây" trong tuan_1_html5/01_introduction_html_universe.md
            ![Ảnh screenshot](CauA1.png)
    Câu A2:
        Google Dùng AI/Bot Để "Đọc" Trang Web
        Google bot không nhìn trang web như con người
        Nó chỉ đọc HTML code để hiểu nội dung
        Nếu code dùng <div> ở khắp nơi → Bot không biết phần nào là gì.
        4 lỗi semantic:
        Lỗi 1: Dùng `<div class="header">` thay vì `<header>`
        Trước 
        <div class="header">
            <div class="logo">ShopTLU</div>
        </div>
        Sau 
        <header>
            <div class="logo">ShopTLU</div>
        </header>

        ---
        Lỗi 2: Dùng `<div>` thay vì `<nav>` cho menu
        Trước 
        <div class="menu">
            <div><a href="/">Trang chủ</a></div>
            <div><a href="/products">Sản phẩm</a></div>
        </div>
        Sau 
        <nav>
            <ul>
                <li><a href="/">Trang chủ</a></li>
                <li><a href="/products">Sản phẩm</a></li>
            </ul>
        </nav>
        ---
        Lỗi 3: Dùng `<div class="main">` thay vì `<main>`
        Trước 
        <div class="main">
            <div class="product">...</div>
        </div>

        Sau 
        <main>
            <article class="product">...</article>
        </main>

        ---
        Lỗi 4: Dùng `<div class="product">` thay vì `<article>`
        Trước
        <div class="product">
            <div class="title">iPhone 16 Pro</div>
            <div class="price">25.990.000đ</div>
            <div class="image"><img src="iphone.jpg"></div>
        </div>
        Sau 
        <article class="product">
            <h2>iPhone 16 Pro</h2>
            <p class="price">25.990.000đ</p>
            <figure>
                <img src="iphone.jpg" alt="iPhone 16 Pro">
                <figcaption>iPhone 16 Pro</figcaption>
            </figure>
        </article>
    Câu A3:
        <div>Hộp 1</div>	Kiểu:Block   
       -> Xuống dòng mới → chiếm cả dòng
        <span>Text A</span>	Kiểu:Inline	
       -> Nằm trên cùng dòng với phần tử inline kế tiếp
        <span>Text B</span>	Kiểu:Inline	
       -> Nằm cạnh Text A (cùng dòng)
        <div>Hộp 2</div>	Kiểu:Block	
       -> Xuống dòng mới → chiếm cả dòng
        <span>Text C</span>	Kiểu:Inline	
        ->Nằm trên cùng dòng với Text D
        <strong>Text D</strong>	Kiểu:Inline	
        ->Nằm cạnh Text C (cùng dòng)
        <div>Hộp 3</div>	Kiểu:Block	
        ->Xuống dòng mới → chiếm cả dòng.
    Câu A4:

        Sự khác nhau cơ bản:
        Element	    Vai Trò 	    Nội Dung	            Hiển Thị
        <thead>	    Đầu bảng	    Tiêu đề cột (header)	In đậm, nền xám
        <tbody>	    Thân bảng	    Dữ liệu chính	        Text bình thường
        <tfoot>	    Chân bảng	    Tổng kết, summary	    Có thể highlight
        Tại sao KHÔNG NÊN dùng table để tạo layout trang web?
            Lỗi 1: SEO Bị Suy Giảm Nghiêm Trọng
            Vấn đề:
                Table được thiết kế cho dữ liệu dạng bảng, không phải layout
                Google bot đọc table từ trái → phải, trên → dưới
                Nếu dùng table làm layout → nội dung bị xáo trộn khi bot đọc.
            Lỗi 2: Trang Web KHÔNG Responsive (Mobile Unfriendly)
            Vấn đề:
                Table có chiều rộng cố định từ thuộc tính width
                Trên mobile, table không thể scale down → user phải cuộn ngang
                CSS Grid/Flexbox có thể responsive dễ dàng    
            Lỗi 3: Code HTML Phức Tạp & Khó Bảo Trì
            Vấn đề:
                Table layout cần nhiều nested <tr><td> để tạo layout
                Mỗi khi thay đổi design → phải sửa cả HTML lẫn CSS
                Dễ gây lỗi alignment khi update.
    Phần B: 
        Bài 3:Debug html
            Lỗi 1: Dòng 1 — Thiếu khai báo kiểu tài liệu đầy đủ — Cách sửa: Sửa thành <!DOCTYPE html>.
            Lỗi 2: Dòng 2 — Thiếu thuộc tính ngôn ngữ cho thẻ html — Cách sửa: Sửa thành <html lang="vi">.
            Lỗi 3: Dòng 3 — Thẻ <title> chưa có thẻ đóng — Cách sửa: Thêm </title> sau chữ "Trang web".
            Lỗi 4: Dòng 4 — Giá trị charset không chuẩn và đặt sai vị trí (nên đặt đầu thẻ head) — Cách sửa: Sửa thành <meta charset="UTF-8">.
            Lỗi 5: Dòng 6 — Sai thẻ đóng cho tiêu đề <h1> — Cách sửa: Sửa <h1>Welcome to ShopTLU<h1> thành <h1>Welcome to ShopTLU</h1>.
            Lỗi 6: Dòng 10 — Thẻ <a> đầu tiên chưa đóng đúng — Cách sửa: Sửa <a> ở cuối dòng thành </a>.
            Lỗi 7: Dòng 10, 11 — Đường dẫn href thiếu phần mở rộng .html — Cách sửa: Sửa thành href="home.html" và href="products.html".
            Lỗi 8: Dòng 18 — Thẻ <img> thiếu thuộc tính alt và dấu ngoặc kép cho src — Cách sửa: Sửa thành <img src="iphone.jpg" alt="iPhone 16 Pro">.
            Lỗi 9: Dòng 20 — Đóng thẻ sai thứ tự (thẻ <b> đóng sau thẻ <p>) — Cách sửa: Sửa thành <p>Giá: <b>25.990.000đ</b></p>.
            Lỗi 10: Dòng 36 — Sử dụng thẻ <main> lần thứ hai (một trang web chỉ được có duy nhất một thẻ <main>) — Cách sửa: Thay thẻ <main> này thành thẻ <aside> vì đây là nội dung phụ (Sidebar).
        Bài 4:
            4.1
            Ô khoanh tròn màu dương là thẻ semantic ,thẻ <html> với lang="vi" khai báo ngôn ngữ trang
            Ô khoanh tròn màu đen là thẻ semantic ,thẻ <main> chứa nội dung chính của trang đăng nhập
            Ô khoanh tròn màu xanh lá cây là thẻ semantic ,   thẻ <script> với type="text,javascript" định dạng rõ ràng
            Hình ảnh:   PBT_01/screenshots/PhanB_bai4.1.png
            4.2
            1.Table chứa nội dung:
            Nội dung: Nó chứa danh sách các liên kết liên quan đến chủ đề "Diễn viên" (như bạn thấy trên thanh địa chỉ là wiki/Diễn_viên).
            Chức năng: Giúp người đọc nhanh chóng tìm thấy các bài viết cùng chuyên mục như: Nghề nghiệp trong ngành phim, Kỹ thuật diễn xuất, Các hội đoàn diễn viên...

            2.Có dùng <thead> và <tbody> không?
            Dựa vào quy chuẩn của Wikipedia và những gì hiển thị trong tab Elements:
            <tbody>: CHẮC CHẮN CÓ. Hầu như tất cả các bảng trên Wikipedia đều tự động bọc toàn bộ hàng (<tr>) vào trong một thẻ <tbody>. Nếu bạn bấm vào dấu mũi tên nhỏ ở thẻ <table> trong ảnh, bạn sẽ thấy thẻ <tbody> hiện ra ngay lập tức.
            <thead>: CÓ THỂ KHÔNG. Các bảng điều hướng kiểu này thường chỉ dùng thẻ <tr> kết hợp với thẻ <th> (ô tiêu đề) để tạo hàng tiêu đề luôn, thay vì chia ra một khu vực <thead> riêng biệt. PBT_01/screenshots/PhanB_bai4.2.png
            4.3
            Form đó có action và method gì?
            Method: Thường là POST. Vì đây là form dùng để thay đổi cài đặt người dùng hoặc giao diện, việc dùng POST giúp bảo mật dữ liệu và cho phép gửi lượng dữ liệu lớn hơn so với GET.

            Action: Thường trỏ đến một đường dẫn xử lý nội bộ của Wikipedia (ví dụ: /w/api.php hoặc chính URL hiện tại với các tham số truy vấn). Mục đích là gửi các lựa chọn của bạn về máy chủ để lưu lại cấu trúc giao diện mới.
            Input types nào được dùng? 
            type="radio": Được dùng cho các lựa chọn mà bạn chỉ được chọn một (ví dụ: chọn giữa "Cỡ chữ nhỏ", "Cỡ chữ tiêu chuẩn" hoặc "Cỡ chữ lớn").

            type="checkbox": Dùng cho các tùy chọn có thể bật/tắt độc lập (ví dụ: "Bật chế độ đọc ban đêm", "Ẩn thanh menu bên trái").

            type="hidden": Đây là loại input cực kỳ quan trọng mà người dùng không thấy được trên màn hình. Nó dùng để gửi kèm các mã bảo mật (token) hoặc ID phiên làm việc để đảm bảo form được gửi đi một cách an toàn. PBT_01/screenshots/PhanB_bai4.3.png     
    Phần C:
        Đoạn văn phản biện:
        Chào đồng nghiệp, mình hiểu cảm giác của bạn. Khi chạy deadline hay làm bài tập lớn, dùng <div> cho nhanh rồi "đắp" CSS vào là xong chuyện. Nhưng với góc độ một sinh viên Kỹ thuật phần mềm , mình thấy việc bỏ qua Semantic HTML giống như xây nhà mà chỉ chú trọng sơn tường mà quên mất khung xương vậy. Có hai lý do kỹ thuật cực kỳ quan trọng mà mình đã rút ra được:

        Đầu tiên là SEO (Tối ưu hóa công cụ tìm kiếm). Google không "nhìn" trang web như chúng ta; nó dùng các con bot để đọc cấu trúc. Nếu mọi thứ đều là <div>, con bot sẽ bối rối không biết đâu là nội dung chính, đâu là phần phụ. Dùng thẻ <main>, <article> hay <h1> giống như việc bạn gắn nhãn rõ ràng, giúp trang web dễ dàng leo lên top tìm kiếm hơn. Thứ hai là Accessibility (Khả năng tiếp cận). Một Tester giỏi sẽ luôn quan tâm đến người dùng khiếm thị sử dụng trình đọc màn hình (Screen Reader). Trình đọc sẽ thông báo "Đây là một khu vực điều hướng" khi thấy thẻ <nav>, nhưng sẽ hoàn toàn im lặng nếu đó chỉ là một thẻ <div>.

        Hãy nhìn vào ví dụ cụ thể về Breadcrumb. Nếu dùng <div> lồng nhau, trình duyệt chỉ coi đó là các khối văn bản rời rạc. Nhưng nếu dùng:

        HTML
        <nav aria-label="breadcrumb">
            <ol>
                <li><a href="/">Trang chủ</a></li>
                <li aria-current="page">Sản phẩm</li>
            </ol>
        </nav>
        Trình duyệt sẽ hiểu ngay đây là một danh sách có thứ tự và đang ở trang nào. Điều này giúp cấu trúc DOM sạch sẽ và cực kỳ dễ bảo trì.Tất nhiên, mình không cực đoan đến mức bài trừ <div>. Thực tế, <div> vẫn là "vua" trong các trường hợp phục vụ mục đích trình bày (styling). Khi mình cần tạo một lớp bao (wrapper) để căn giữa nội dung bằng Flexbox hoặc tạo một khối trang trí không mang ý nghĩa nội dung, thì <div> chính là lựa chọn phù hợp nhất vì nó trung lập.   




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
