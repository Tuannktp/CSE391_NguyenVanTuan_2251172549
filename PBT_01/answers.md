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
        Câu C1:
        <!DOCTYPE html>
            <html lang="vi">
            <head>
                <meta charset="UTF-8"> <!-- khai báo bộ mã ký tự để hiển thị tiếng Việt -->
                <title>Chi tiết sản phẩm</title> <!-- tiêu đề hiển thị trên tab -->
            </head>
            <body>

                <!-- HEADER -->
                <header> <!-- dùng header vì đây là phần đầu của trang web -->
                    <h2>Logo</h2> <!-- dùng h2 để hiển thị logo dạng chữ -->
                    
                    <nav> <!-- dùng nav vì đây là khu vực chứa các liên kết điều hướng -->
                        <ul> <!-- dùng ul vì menu không cần thứ tự -->
                            <li><a href="#">Trang chủ</a></li> <!-- mỗi mục menu là 1 li -->
                            <li><a href="#">Danh mục</a></li>
                            <li><a href="#">Liên hệ</a></li>
                        </ul>
                    </nav>
                </header>

                <!-- BREADCRUMB -->
                <nav aria-label="breadcrumb"> <!-- dùng nav vì breadcrumb là điều hướng -->
                    <ol> <!-- dùng ol vì breadcrumb có thứ tự từ cấp cao đến thấp -->
                        <li><a href="#">Trang chủ</a></li> <!-- có link để quay lại -->
                        <li><a href="#">Điện thoại</a></li>
                        <li>iPhone 16</li> <!-- trang hiện tại nên không cần link -->
                    </ol>
                </nav>

                <!-- NỘI DUNG CHÍNH -->
                <main> <!-- dùng main vì đây là nội dung chính của trang -->

                    <!-- KHU VỰC SẢN PHẨM -->
                    <section> <!-- dùng section vì đây là một phần nội dung riêng -->
                        
                        <!-- ẢNH SẢN PHẨM -->
                        <div> <!-- dùng div để nhóm nhiều ảnh lại với nhau -->
                            <img src="#" alt="ảnh 1"> <!-- img dùng để hiển thị hình ảnh -->
                            <img src="#" alt="ảnh 2">
                            <img src="#" alt="ảnh 3">
                            <img src="#" alt="ảnh 4">
                            <img src="#" alt="ảnh 5">
                        </div>

                        <!-- THÔNG TIN SẢN PHẨM -->
                        <div> <!-- dùng div để chứa các thông tin -->
                            <h1>Tên sản phẩm</h1> <!-- h1 là tiêu đề chính của trang -->
                            <p>Giá sản phẩm</p> <!-- p để hiển thị giá -->
                            <p>★★★★★</p> <!-- hiển thị đánh giá sao -->
                            <p>Mô tả sản phẩm</p> <!-- mô tả dạng đoạn văn -->
                        </div>

                    </section>

                    <!-- THÔNG SỐ KỸ THUẬT -->
                    <section> <!-- dùng section vì là một phần riêng biệt -->
                        <h2>Thông số kỹ thuật</h2> <!-- tiêu đề phụ -->

                        <table> <!-- dùng table vì dữ liệu dạng bảng -->
                            <tr> <!-- tr là 1 hàng -->
                                <th>Thông số</th> <!-- th là ô tiêu đề -->
                                <th>Chi tiết</th>
                            </tr>
                            <tr>
                                <td>CPU</td> <!-- td là dữ liệu -->
                                <td>...</td>
                            </tr>
                            <tr>
                                <td>RAM</td>
                                <td>...</td>
                            </tr>
                        </table>
                    </section>

                    <!-- ĐÁNH GIÁ -->
                    <section> <!-- dùng section cho khu vực bình luận -->
                        <h2>Đánh giá</h2>

                        <div> <!-- dùng div để nhóm các bình luận -->
                            <p><strong>Người dùng 1</strong></p> <!-- strong để nhấn mạnh tên -->
                            <p>Nội dung bình luận...</p>
                        </div>

                        <div>
                            <p><strong>Người dùng 2</strong></p>
                            <p>Nội dung bình luận...</p>
                        </div>
                    </section>

                </main>

                <!-- SIDEBAR -->
                <aside> <!-- dùng aside vì đây là nội dung phụ bên cạnh -->
                    <h3>Sản phẩm tương tự</h3>

                    <ul> <!-- danh sách sản phẩm -->
                        <li><a href="#">Sản phẩm 1</a></li>
                        <li><a href="#">Sản phẩm 2</a></li>
                        <li><a href="#">Sản phẩm 3</a></li>
                    </ul>
                </aside>

                <!-- FOOTER -->
                <footer> <!-- dùng footer vì đây là phần cuối trang -->
                    <p>Thông tin cuối trang</p>
                </footer>

            </body>
            </html>
        Câu C2:
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




                                       