PHẦN A — KIỂM TRA ĐỌC HIỂU 

Câu A1 — Viewport & Mobile-First

1. Thẻ `<meta viewport>` chuẩn:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Giải thích từng thuộc tính:
- `name="viewport"`: Cho trình duyệt biết đây là chỉ thị viewport
- `width=device-width`: Chiều rộng viewport bằng chiều rộng thiết bị (không cố định 980px)
- `initial-scale=1.0`: Mức zoom ban đầu là 100% (không tự phóng to/thu nhỏ)

Các thuộc tính bổ sung phổ biến:
- `maximum-scale=5.0`: Cho phép zoom tối đa 500%
- `user-scalable=yes`: Cho phép người dùng zoom

2. Thiếu thẻ `<meta viewport>`, iPhone sẽ:
- Hiển thị trang web ở mức zoom *980px* (viewport mặc định của Safari iOS)
- Trang sẽ *bị thu nhỏ* để vừa màn hình nhỏ
- Text *rất khó đọc*
- Người dùng phải *pinch-to-zoom* để thấy rõ nội dung
- Trải nghiệm người dùng kém ⚠️

3. Mobile-First vs Desktop-First:

*Desktop-First (cũ):*
```css
/* CSS mặc định cho desktop */
.container { width: 1200px; display: flex; }
.sidebar { width: 25%; }
.content { width: 75%; }

/* Giảm xuống mobile */
@media (max-width: 768px) {
    .container { width: 100%; flex-direction: column; }
    .sidebar { width: 100%; }
    .content { width: 100%; }
}
```
*Mobile-First (mới):*
```css
/* CSS mặc định cho mobile */
.container { width: 100%; display: flex; flex-direction: column; }
.sidebar { width: 100%; }
.content { width: 100%; }

/* Tăng lên desktop */
@media (min-width: 768px) {
    .container { width: 1200px; flex-direction: row; }
    .sidebar { width: 25%; }
    .content { width: 75%; }
}
```
*Tại sao Mobile-First được khuyên dùng:*
- CSS ít code hơn (min-width thường cần ít override)
- Phù hợp với xu hướng "mobile-first" của thế giới
- Tính toán `min-width` nhanh hơn `max-width`
- Performance tốt hơn (tải nhanh trên mobile)
- Dễ maintain khi thêm breakpoint mới


 Câu A2 — Breakpoints

*Breakpoints chuẩn theo Bootstrap v5:*

Breakpoint | Tên | Min Width | Max Width | Thiết bị | Grid Columns | Ví dụ |
|----------|-----|-----------|-----------|---------|---|---------|
| XS | Extra small | 0 | < 576px | Điện thoại | 1 | iPhone SE, Galaxy A |
| SM | Small | 576px | 768px | Điện thoại lớn | 2 | iPhone 12, 13 |
| MD | Medium | 768px | 992px | Tablet | 2-3 | iPad, Tab S |
| LG | Large | 992px | 1200px | Laptop nhỏ | 3-4 | MacBook Air, Dell 13" |
| XL | Extra Large | 1200px | 1400px | Desktop | 4 | Desktop 24" |
| XXL | Extra Extra Large | 1400px | ∞ | Desktop 4K | 4+ | Màn hình 27" |

*Ví dụ lưới sản phẩm (grid columns):*
- *Mobile (< 576px):* 1 cột (toàn bộ chiều rộng)
- *Tablet nhỏ (576-768px):* 2 cột
- *Tablet (768-992px):** 2-3 cột
- *Desktop (992-1200px):* 3-4 cột
- *Desktop lớn (≥ 1200px):* 4 cột



Câu A3 — Media Queries

*Bảng trả lời:*

| Chiều rộng màn hình | `.container` width | Lý do |
|---------------------|--------------------|---------|
| 375px (iPhone SE) | 100% | Không match breakpoint nào, dùng CSS base |
| 600px | 540px | Match `min-width: 576px` |
| 800px | 720px | Match `min-width: 768px` |
| 1000px | 960px | Match `min-width: 992px` |
| 1400px | 1140px | Match `min-width: 1200px` |

*Ghi chú:* CSS dùng `min-width` → mỗi media query sau **ghi đè** những cái trước. Giá trị width cuối cùng match được dùng.

Câu A4  — SCSS Basics

*4 tính năng chính của SCSS:*

1. *Variables* — Lưu trữ giá trị tái sử dụng
```scss
$primary-color: #3498db;
$font-size-base: 16px;
$border-radius: 4px;

body { 
    color: $primary-color;
    font-size: $font-size-base;
}

.btn { border-radius: $border-radius; }
```

*Lợi ích:* Thay đổi color toàn project chỉ cần đổi 1 chỗ

2. *Nesting* — Viết CSS lồng nhau (giống HTML structure)
```scss
.card {
    background: white;
    padding: 16px;
    
    .card-header {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 8px;
    }
    
    .card-body {
        color: #666;
    }
    
    &:hover {
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
}
```

*Lợi ích:* Khai báo `&` cho parent selector, code gọn và dễ đọc

3. *Mixins* — Tái sử dụng block CSS (function)
```scss
@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

@mixin respond-to($breakpoint) {
    @if $breakpoint == "mobile" {
        @media (max-width: 576px) { @content; }
    } @else if $breakpoint == "tablet" {
        @media (max-width: 768px) { @content; }
    }
}

.container {
    @include flex-center;
}

.hero {
    @include respond-to("mobile") {
        font-size: 18px;
    }
}
```

*Lợi ích:* Tránh lặp lại code, dễ maintain

4. *@extend / Inheritance* — Kế thừa CSS từ selector khác
```scss
.button-base {
    padding: 12px 24px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
}

.button-primary {
    @extend .button-base;
    background: #3498db;
    color: white;
}

.button-danger {
    @extend .button-base;
    background: #e74c3c;
    color: white;
}
```

*Lợi ích:* DRY (Don't Repeat Yourself), code gọn hơn

*Tại sao trình duyệt KHÔNG đọc `.scss`?*

Trình duyệt chỉ hiểu **CSS**, không hiểu SCSS. SCSS là *preprocessor* → cần compile thành CSS.
Phần B:Bài 3
Báo cáo Biên dịch SCSS sang CSS

Em sử dụng tiện ích **Live Sass Compiler** (phiên bản của Glenn Marks) trên Visual Studio Code để thực hiện biên dịch tự động theo thời gian thực (Real-time).

1. Cấu trúc thư mục dự án
```text
thumuc-duan/
├── index.html
└── scss/
    ├── _variables.scss
    ├── _mixins.scss
    ├── _components.scss
    └── style.scss  (File tổng cấu trúc quản lý @import)


