TRACK B — TAILWINDCSS
PHẦN A — ĐỌC HIỂU (20 điểm)

Câu A1:

    flex → display: flex
    items-center → align-items: center
    justify-between → justify-content: space-between
    p-4 → padding: 1rem (16px)
    bg-white → background-color: #ffffff
    shadow-md → medium box-shadow
    rounded-lg → large border-radius
    hover:shadow-xl → on hover, apply extra-large box-shadow
    transition-shadow → animate changes to box-shadow
    duration-300 → transition duration 300ms
    w-16 → width: 4rem (64px)
    h-16 → height: 4rem (64px)
    rounded-full → full border-radius (circle)
    object-cover → object-fit: cover
    ml-4 → margin-left: 1rem (16px)
    flex-1 → flex: 1 1 0% (grow to fill available space)
    text-lg → large text size (usually 1.125rem)
    font-semibold → font-weight: 600
    text-gray-800 → dark gray text color
    truncate → truncate overflow text with ellipsis
    text-sm → small text size (usually 0.875rem)
    text-gray-500 → medium gray text color
    px-4 → horizontal padding 1rem (left/right)
    py-2 → vertical padding 0.5rem (top/bottom)
    bg-blue-500 → blue background at Tailwind shade 500
    text-white → white text color
    rounded-md → medium border-radius
    hover:bg-blue-600 → on hover, darker blue background
    focus:ring-2 → focus ring with 2px width
    focus:ring-blue-300 → focus ring color blue-300

Câu A2:

    Responsive prefixes:
    md: → áp dụng khi màn hình ≥ 768px (tablet trở lên)
    lg: → áp dụng khi màn hình ≥ 1024px
    xl: → áp dụng khi màn hình ≥ 1280px
    Ví dụ md:grid-cols-2 lg:grid-cols-4 nghĩa là:

    ->mặc định: không có grid-cols-2 / grid-cols-4
    trên màn hình md trở lên: grid-template-columns: repeat(2, minmax(0,1fr))
    trên màn hình lg trở lên: grid-template-columns: repeat(4, minmax(0,1fr))
    tức là: mobile có thể 1 cột, tablet trở lên 2 cột, desktop lớn hơn 4 cột
    State modifiers:
    hover: → áp dụng khi phần tử đang được rê chuột
    focus: → áp dụng khi phần tử nhận focus (input, button, ...), hoặc tab-chuyển đến
    active: → áp dụng khi phần tử đang ở trạng thái active / nhấn giữ chuột
    group-hover: → áp dụng cho phần tử con khi phần tử cha có class group đang hover
    Class Tailwind tương đương d-none d-md-flex:
    hidden md:flex

Phần C:

    CauC1: 
         
        1.HTML File Size (Kích thước file)
            CSS Thuần (Giao diện tách biệt):
            HTML: Rất nhẹ và ngắn gọn vì chỉ chứa các cấu trúc thẻ cơ bản và class đặt tên theo chuẩn (ví dụ: class="product-card", class="card-title").
            CSS: Dung lượng nằm ở file .css riêng biệt. Tổng dung lượng tải về của trình duyệt bằng HTML + CSS.

            Tailwind CSS (Utility-First):
            HTML: File size của riêng HTML sẽ phình to hơn đáng kể (tăng khoảng 2-3 lần) do phải gánh một lượng lớn các utility class nối đuôi nhau (class="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition overflow-hidden").
            Thực tế sản xuất (Production): Dù HTML lớn hơn, nhưng tổng dung lượng hệ thống lại nhỏ hơn. Khi dùng CDN hoặc build-tool, file CSS của Tailwind được tối ưu (Purge CSS) chỉ còn khoảng dưới 10KB cho toàn bộ dự án, trong khi CSS thuần sẽ liên tục phình to khi dự án mở rộng.

            Tiêu chí: Dễ đọc
            CSS Thuần	
            Dễ đọc?	Dễ đọc ban đầu: Cấu trúc HTML cực kỳ sạch sẽ. Tuy nhiên, khi dự án lớn, việc phải liên tục "nhảy" qua lại giữa file HTML và CSS để xem thuộc tính của một class rất mất thời gian.
            
            Tailwind CSS:
            Rối mắt ban đầu: Giao diện HTML trông như "bãi chiến trường" với hàng tá class. Nhưng khi đã quen, bạn chỉ cần nhìn vào HTML là biết ngay component đó có hình dáng, màu sắc, khoảng cách thế nào mà không cần mở file khác.

            Tiêu chí:Dễ sửa
            CSS Thuần
            Nguy cơ lỗi dây chuyền: Sửa một class ở file CSS chung có thể vô tình làm vỡ giao diện ở một trang khác mà bạn không hề hay biết (Hiệu ứng cánh bướm).

            Tailwind CSS:
            An toàn tuyệt đối: Việc chỉnh sửa class ở component nào thì chỉ có duy nhất component đó thay đổi. Bạn có thể xóa, sửa thoải mái mà không sợ ảnh hưởng đến các thành phần khác trên toàn hệ thống.

            Reusability (Khả năng tái sử dụng):

            Với CSS thuần:
            Tái sử dụng bằng cách copy đoạn code HTML và gắn class đã viết sẵn ở file CSS vào. Nếu muốn đổi màu một card riêng lẻ, ta phải viết thêm class phụ (modifier) như .product-card--orange.

            Với Tailwind CSS:
            Do Tailwind loại bỏ việc đặt tên class, việc tái sử dụng được giải quyết qua 2 cách chính:
            Tái sử dụng ở cấp độ Component (Khuyến khích): Nếu bạn dùng các thư viện/framework như React, Vue, Blade, hay PHP, cách tốt nhất là đóng gói component đó lại thành một file duy nhất (Ví dụ: <ProductCard />). Lúc này, bạn chỉ viết đống utility class đó đúng một lần.
            Sử dụng Directive @apply (Khi viết CSS truyền thống):
            Nếu không dùng framework và muốn gom các class Tailwind lại cho gọn gọn file HTML, bạn có thể dùng @apply trong file CSS như sau:
            /* Trong file input.css */
            .product-card-custom {
                @apply border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition overflow-hidden;
            }
        2.1. Tại sao file Tailwind CSS cuối cùng lại NHỎ HƠN Bootstrap CSS?
            Lý do cốt lõi nằm ở triết lý thiết kế và cách tiếp cận của hai framework:

            Bootstrap (Component-First): Bootstrap được xây dựng dựa trên các component có sẵn (như .btn, .card, .modal). File CSS của Bootstrap chứa tất cả các biến thể, màu sắc, và kích cỡ của các component này. Khi dự án lớn lên, bạn viết thêm CSS tùy chỉnh, khiến tổng dung lượng Bootstrap CSS + Custom CSS liên tục phình to tỷ lệ thuận với quy mô dự án.

            Tailwind CSS (Utility-First): Tailwind sử dụng các class tiện ích nguyên tử (atomic). Một class như .font-bold hay .pt-4 có thể tái sử dụng hàng nghìn lần ở hàng trăm component khác nhau trong file HTML. Vì vậy, khi dự án mở rộng, bạn chỉ tái sử dụng lại các class cũ chứ không sinh thêm CSS mới. Dung lượng file CSS của Tailwind sẽ đạt trần (chạm mốc tối đa) và dừng lại, không phình to thêm bất kể dự án có bao nhiêu trang.

            Nó loại bỏ những gì?
            Loại bỏ CSS thừa (Unused CSS): Bất kỳ class nào có trong thư viện mã nguồn của Tailwind mà bạn không gõ vào HTML/JS sẽ hoàn toàn bị loại bỏ, không xuất hiện trong file CSS cuối cùng.

            Ví dụ trực quan: Thư viện gốc của Tailwind có thể nặng tới vài Megabytes (chứa đủ mọi màu từ red-50 đến slate-950, đủ mọi kích thước padding, margin). Nhờ JIT và Purge, file CSS cuối cùng xuất ra môi trường production thường chỉ nặng khoảng 10KB - 50KB.

            Khi nào KHÔNG nên dùng Tailwind CSS? (2 tình huống cụ thể)
            Dù rất mạnh mẽ, Tailwind không phải là chiếc "chìa khóa vạn năng". Bạn không nên dùng nó trong các trường hợp sau:

            Tình huống 1: Dự án thuần CMS hoặc cho phép người dùng nhập nội dung thô (Ví dụ: Trang tin tức, Blog quản lý bằng CKEditor/WordPress)
            Lý do: Người dùng quản trị (Admin) khi viết bài báo sẽ nhập văn bản thô từ trình soạn thảo rich-text, tạo ra các thẻ HTML thuần không có class (như <h1>, <p>, <ul>).

            Hạn chế của Tailwind: Mặc định, Tailwind xóa bỏ (reset) toàn bộ style mặc định của trình duyệt (thẻ <h1> sẽ nhỏ như thẻ <p>). Nếu dùng Tailwind, bạn sẽ phải mất công viết đè CSS hoặc dùng thêm plugin @tailwindcss/typography để định dạng lại, điều này làm mất đi sự tiện lợi của utility classes.

            Tình huống 2: Khi xây dựng các Widget/Plugin nhúng vào website của bên thứ ba (Ví dụ: Chatbot widget, cổng thanh toán nhúng)
            Lý do: Khi bạn viết một mã nhúng (như một khung chat nhỏ ở góc màn hình) để khách hàng chèn vào website của họ, bạn không thể kiểm soát được website của khách hàng có dùng Tailwind hay không.

            Hạn chế của Tailwind: Nếu bạn nhúng cả thư viện Tailwind vào, nó có thể làm xung đột với CSS có sẵn của trang web đó (do tính chất reset CSS của Tailwind). Ngược lại, nếu bạn chỉ dùng một vài class, giao diện widget của bạn sẽ bị vỡ hoàn toàn nếu trang web đó không cài Tailwind. Trong tình huống này, CSS thuần (hoặc Shadow DOM / Inline CSS) là lựa chọn an toàn nhất để cô lập giao diện.
