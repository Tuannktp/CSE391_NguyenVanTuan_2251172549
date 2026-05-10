PHẦN A — KIỂM TRA ĐỌC HIỂU

    Câu A1:3 cách nhúng css:
        C1:INLINE CSS — Nhúng trực tiếp trong thẻ
        Ví dụ:  

                <h1 style="color: red; font-size: 24px; text-align: center;">Tiêu đề chính</h1>
                <button style="background-color: blue; color: white; padding: 10px 20px;">Bấm tôi</button>

        Ưu điểm:
            Nhanh chóng, không cần file riêng
            Dễ kiểm thử nhanh (debug)
            Độ ưu tiên cao, style này luôn "thắng"
        Nhược điểm:
            HTML bị "bẩn", khó đọc và bảo trì
            Không tái sử dụng được
            Vi phạm nguyên tắc separation of concerns (tách HTML & CSS)
            Nếu thay đổi style, phải sửa từng chỗ trong HTML
        Khi nào dùng:
            Debug nhanh trên DevTools
            Thử nghiệm style tạm thời
            KHÔNG dùng cho dự án thực tế
        C2:INTERNAL CSS — Nhúng trong thẻ <style>
        Ví dụ:
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    h1 {
                        color: red;
                        font-size: 24px;
                        text-align: center;
                    }
                    .btn-primary {
                        background-color: blue;
                        color: white;
                        padding: 10px 20px;
                        border: none;
                        border-radius: 5px;
                    }
                </style>
            </head>
            <body>
                <h1>Tiêu đề chính</h1>
                <button class="btn-primary">Bấm tôi</button>
            </body>
            </html>
            Ưu điểm:
                HTML sạch hơn (style tách riêng)
                Có thể tái sử dụng style trên nhiều element
                Tốc độ nhanh (1 file, không cần request file riêng)
                Phù hợp cho prototyping
            Nhược điểm:
                Chỉ áp dụng cho 1 file HTML duy nhất
                Nếu có nhiều trang web, phải copy-paste style (không DRY)
                File HTML bị nặng, có thể ảnh hưởng SEO
                Khó quản lý nếu style quá nhiều
            Khi nào dùng:
                Prototype, học tập
                Single-page app nhỏ
                Email HTML (một số email client chỉ hỗ trợ internal CSS)
        C3:EXTERNAL CSS — Link file CSS riêng
        Ví dụ:
        <!DOCTYPE html>
        <html>
        <head>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
            <h1>Tiêu đề chính</h1>
            <button class="btn-primary">Bấm tôi</button>
        </body>
        </html>
        File styles.css:
            h1 {
                color: red;
                font-size: 24px;
                text-align: center;
            }

            .btn-primary {
                background-color: blue;
                color: white;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
            }
        Ưu điểm:
            Chuẩn production — được sử dụng 100% trong dự án thực tế
            Tái sử dụng trên tất cả trang web (DRY principle)
            HTML sạch, riêng tư với CSS → dễ bảo trì
            Browser cache file CSS → tận dụng tốc độ
            Tiện quản lý: style tập trung, dễ chỉnh sửa toàn cục
            SEO tốt hơn (HTML nhẹ)
        Nhược điểm:
            Cần thêm HTTP request để tải file CSS
            Nếu CSS file quá lớn, có thể ảnh hưởng tốc độ (nhưng có thể tối ưu bằng minify, compress)
        Khi nào dùng:
            LUÔN dùng cho dự án thực tế
            Website có nhiều trang
            Dự án cần maintain lâu dài

        Nếu cùng 1 element có cả 3 cách CSS đồng thời áp dụng, cách nào "thắng"? Giải thích tại sao.
        Css sẽ thắng vì:

            Inline style có độ ưu tiên cao nhất (1000 points) vì nó "trực tiếp" gán style cho element
            Internal & External chỉ có 10 points (class selector)
            CSS cascade từ từ trên xuống (nếu specificity bằng nhau) → style cuối cùng thắng
    
    Câu A2:
        Không chạy code, cho biết mỗi selector sau chọn được element nào? (Ghi cụ thể text content)
        1.h1
            Chọn: <h1>ShopTLU</h1> → "ShopTLU"
            (Element type selector)
        2.price
            Chọn:
            <p class="price">25.990.000đ</p> → "25.990.000đ"
            <p class="price">45.990.000đ</p> → "45.990.000đ"
            (Class selector, chọn 2 element)
        3.#app header

            Chọn: <header class="top-bar dark"> (toàn bộ phần tử)
            (ID + descendant, chọn header con cháu của #app)
        4.nav a:first-child

            Chọn: <a href="/" class="active">Home</a> → "Home"
            (Pseudo-class :first-child, element a đầu tiên trong nav)
        5.product.featured h2

            Chọn: <h2>MacBook Pro</h2> → "MacBook Pro"
            (Chọn h2 trong article có cả 2 class "product" AND "featured")
        6.  article > p

            Chọn:
            <p class="price">25.990.000đ</p> → "25.990.000đ"
            <p>Mô tả sản phẩm...</p> → "Mô tả sản phẩm..."
            <p class="price">45.990.000đ</p> → "45.990.000đ"
            <p>Mô tả sản phẩm...</p> → "Mô tả sản phẩm..."
            (Child combinator ">", chọn 4 element p con trực tiếp của 2 article)
        7.a[href="/"]

            Chọn: <a href="/" class="active">Home</a> → "Home"
            (Attribute selector, a có href="/")
        8.top-bar.dark h1

            Chọn: <h1>ShopTLU</h1> → "ShopTLU"
            (Chọn h1 trong element có cả 2 class "top-bar" AND "dark")
    Câu A3:

        /* Trường hợp 1: content-box (mặc định) */
        .box-1 {
            width: 400px;
            padding: 20px;
            border: 5px solid black;
            margin: 10px;
        }
        → Chiều rộng hiển thị =  400 + 40 + 10 = 450px
        → Không gian chiếm trên trang = 450 + 20 = 470px

        /* Trường hợp 2: border-box */
        .box-2 {
            box-sizing: border-box;
            width: 400px;
            padding: 20px;
            border: 5px solid black;
            margin: 10px;
        }
        → Chiều rộng hiển thị = 400px
        → Kích thước content thực tế = 350px
        → Không gian chiếm trên trang = 400 + 20 = 420px

        /* Trường hợp 3: Margin collapse */
        .box-a { margin-bottom: 25px; }
        .box-b { margin-top: 40px; }
        → Khoảng cách giữa box-a và box-b = 40px (KHÔNG PHẢI 65px!)
        → Giải thích tại sao KHÔNG PHẢI 65px:Khi 2 block elements nằm dọc kề nhau, margin của chúng KHÔNG CỘNG mà GỘP THÀNH 1
                                             Giá trị được chọn = cái LỚN HƠN (max value)
                                             Ở đây: max(25px, 40px) = 40px

    Câu A4:
        BƯỚC 1: Tính Specificity Score (a, b, c)
        Công thức: (ID, Class, Element)

        Rule	Selector	ID (a)	Class (b)	Element (c) 	Score
        A	    p	        0	        0	       1	        (0, 0, 1)
        B	    .price	    0	        1	       0	        (0, 1, 0)
        C	    #main-price	1	        0	       0	        (1, 0, 0)
        D	    p.price	    0	        1	       1	        (0, 1, 1)   
        BƯỚC 2: Element Sẽ Có Màu Gì?
        Element sẽ là MÀU ĐỎ (Rule C thắng)
        Rule C: #main-price (1, 0, 0) ← THẮNG (specificity cao nhất)
        Rule D: p.price (0, 1, 1)
        Rule B: .price (0, 1, 0)
        Rule A: p (0, 0, 1)
        ID selector luôn cao hơn class + element.
        BƯỚC 3: Thêm Inline Style
        <p class="price" id="main-price" style="color: orange;">
        Kết quả:
        → Element sẽ là MÀU CAM (Inline style thắng)
        BƯỚC 4: Nếu Rule A Thêm !important
        p { color: black !important; }     /* Rule A + !important */
        .price { color: blue; }            /* Rule B */
        #main-price { color: red; }        /* Rule C */
        p.price { color: green; }          /* Rule D */
        Kết quả:
        → Element sẽ là MÀU ĐEN (Rule A + !important thắng)
        !important lấy độ ưu tiên HIGHEST, bỏ qua mọi quy tắc specificity

        Phần B:
        Liệt kê các selector đã sử dụng
        SELECTOR ĐƯỢC SỬ DỤNG
        Loại	            Số lần	Ví dụ
        Universal	        1	    *
        Element	            15+	    body, header, table, footer, ...
        Class	            1	    .active
        ID	                1	    #lien-he
        Descendant	        15+	    header h1, nav a, section h2, ...
        Child	            1	    nav > ul > li
        Attribute	        4+	    img[alt], a[href*="tlu"]
        Pseudo-class	    8+	    :hover, :nth-child, :first-child, :last-child, :focus, :active
        Pseudo-element	    5+	    ::before, ::after
        Grouping	        2	    h1, h2, h3
        Media Query	        1	    @media (max-width: 600px)

    Phần C:
        Hộp 1 (content-box): chiều rộng thực tế = 602.025 + 40 + 9.6 = 651.625 px
        Hộp 2 (border-box): chiều rộng thực tế =  552.425 + 40  + 9.6 = 602.025 px
        Giải thích sự khác biệt:
        Đây là chế độ mặc định của trình duyệt.
        Kích thước thực tế = width (trong code) + padding + border.
        Hiện tượng: Hộp luôn to hơn số bạn ghi trong code vì bị padding và border đắp thêm vào bên ngoài.



        10 CSS RULES (từ thấp đến cao theo specificity)

        #	Selector	        Specificity	Color
        1	p	                 (0,0,1)	🔴 Red
        2	.text	             (0,1,0)	🔵 Blue
        3	.highlight      	 (0,1,0)	🟢 Green
        4	p.text	             (0,1,1)	🟠 Orange
        5	.text.highlight	     (0,2,0)	🟣 Purple
        6	p.text.highlight	 (0,2,1)	🩷 Pink
        7	p[class~="text"]	 0,1,1)	    🟫 Brown
        8	p:first-child	     (0,1,1)	🟡 Yellow
        9	#demo.text	         (1,1,1)	🔷 Cyan
        10	#demo	             (1,0,0)	🔴 MAGENTA (THẮNG!)

        PHẦN TỬ HIỂN THỊ MÀU GÌ?

        Kết quả: MAGENTA** 🔴

        Tại sao

        Specificity từ thấp đến cao:
        (0,0,1) < (0,1,0) < (0,1,1) < (0,2,0) < (0,2,1) < (1,1,1) < (1,0,0)
        Red     Blue    Orange   Purple   Pink    Cyan   MAGENTA (THẮNG!)`

        Quy tắc:
        - So sánh ID đầu tiên: Rule 10 có ID = 1, tất cả khác = 0
        - ID thắng hết!→ Rule 10 (`#demo`) là champion

        THỰC NGHIỆM: THAY ĐỔI THỨ TỰ

        Câu hỏi
        > Nếu chúng ta di chuyển `#demo { color: #c2185b; }` lên đầu file CSS, kết quả có đổi không?

        Trả lời: KHÔNG ĐỔI! ✅

        Lý do:

        CSS Cascade Rule:"Later rules override earlier rules" CHỈ  khi specificity BẰNG NHAU

    Phần C:
       
        TÍNH CHIỀU RỘNG THỰC TẾ

        Sidebar:

        width: 300px + padding: 20px×2 = 300 + 40 = 340px
        + border: 1px×2 = 2px
        = 342px 

        Content

        width: 660px + padding: 30px×2 = 660 + 60 = 720px
        + border: 1px×2 = 2px
        = 722px 

        **Total: 342 + 722 = 1064px > 960px → VỠ!**

        TẠI SAO VỠ

        Content-Box (mặc định):
        - width = chỉ content, KHÔNG bao gồm padding + border
        - padding & border PHỈ RA NGOÀI
        - 342 + 722 = 1064px > 960px
        - Content bị đẩy xuống

        2 CÁCH SỬA

        Fix #1: Border-Box (RECOMMENDED)
        * {
            box-sizing: border-box;
        }

        .sidebar { width: 300px; padding: 20px; }
        .content { width: 660px; padding: 30px; }

        /* Kết quả: 300 + 660 = 960px ✅ */

        Ưu điểm:
        - Dễ tính (width = chiều rộng thực tế)
        - Chuẩn hiện đại

        Fix #2: Recalculate Width
        .sidebar { width: 278px; padding: 20px; }  /* 300 - 40 - 2 */
        .content { width: 598px; padding: 30px; }  /* 660 - 60 - 2 */

        /* Kết quả: (278+40+2) + (598+60+2) = 960px ✅ */

        Nhược điểm:
        - Khó tính
        - Cũ rồi

        KẾT LUẬN

        Mỗi CSS file nên bắt đầu với:
        * {
            box-sizing: border-box;
        }

        Câu C2:
        1."Sản phẩm A" (h2) có font-size = 20px và color = green
        2."Mô tả sản phẩm" (p trong card featured) có color = blue (Inheritance)
        3."Sản phẩm B" (h2) có font-size = 20px và color = blue (Inheritance)
        4."Mô tả sản phẩm B" (p.highlight) có color = green (từ !important) 


