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

