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

PHẦN C — PHÂN TÍCH 

Câu C1 (10đ) — Phân tích trang web thực

**Trang chọn:** Shopee Vietnam (https://shopee.vn)

#### 📱 Mobile (375px)
**Screenshot phân tích:**
- ✅ **Navigation:** Hamburger menu ☰ ở top-left
- ✅ **Header:** Logo nhỏ, search bar, cart icon (all in 1 row, compact)
- ✅ **Content:** Product grid **1 cột** (chiếm 100% width)
- ✅ **Font size:** 14px (nhỏ để vừa màn hình)
- **Ẩn trên mobile:** Sidebar filter, banner quảng cáo dài, chat support widget

#### 📱 Tablet (768px)
**Screenshot phân tích:**
- ✅ **Navigation:** Menu ngang với categories (Home, Live, Deals, v.v.)
- ✅ **Header:** Logo lớn hơn, search bar rộng hơn
- ✅ **Content:** Product grid **2 cột**
- ✅ **Sidebar:** Filter hiển thị dạng dropdown/toggle
- ✅ **Font size:** 16px (tăng so với mobile)

#### 🖥️ Desktop (1440px)
**Screenshot phân tích:**
- ✅ **Navigation:** Full menu ngang + search suggestions
- ✅ **Header:** Logo chuẩn, search bar full width, user account menu
- ✅ **Layout:** 3 cột (sidebar filter + product grid 2 cột + ads bar)
- ✅ **Content:** Product grid **3-4 cột** (column-width: auto)
- ✅ **Font size:** 16px (chuẩn desktop)

#### **Media Queries Shopee sử dụng (ví dụ):**
```css
/* Mobile-first default */
.product-grid { display: grid; grid-template-columns: 1fr; gap: 8px; }

@media (min-width: 576px) {
    .product-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 768px) {
    .sidebar { display: block; }
    .product-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
    .product-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 1200px) {
    .product-grid { grid-template-columns: repeat(4, 1fr); }
}
```

---

### Câu C2 (10đ) — Thiết kế Responsive Strategy - Trang "Đặt bàn nhà hàng"

#### **Wireframe Mobile (< 768px)**
```
┌─────────────────────────────┐
│  HEADER (hamburger ☰)       │  ← Menu toggle, logo nhỏ
│  Logo | ☰ | 📞 0123456789  │
├─────────────────────────────┤
│                             │
│    HERO IMAGE (100% w)      │
│    (h=200px, cover)         │
│                             │
├─────────────────────────────┤
│   📧 Đặt bàn nhà hàng       │
│                             │
│ [Form đặt bàn - full width] │
│ ├─ Ngày ▼                   │
│ ├─ Giờ ▼                    │
│ ├─ Số người (spinner)       │
│ ├─ Ghi chú (textarea)       │
│ └─ [Đặt bàn] (full width)   │
│                             │
├─────────────────────────────┤
│  🍕 MÓN ĂN YÊU THÍCH        │
│  [Grid 2 cột]               │
│  ┌─────────┬─────────┐      │
│  │ Ảnh 1   │ Ảnh 2   │      │
│  ├─────────┼─────────┤      │
│  │ Ảnh 3   │ Ảnh 4   │      │
│  ├─────────┼─────────┤      │
│  │ Ảnh 5   │ Ảnh 6   │      │
│  └─────────┴─────────┘      │
│                             │
├─────────────────────────────┤
│  📍 Bản đồ (100% width)     │
│  [Google Maps iframe]       │
│  h=250px                    │
│                             │
├─────────────────────────────┤
│           FOOTER             │
│  © 2024 Nhà hàng ABC        │
│  📞 0123456789              │
└─────────────────────────────┘
```

**Ẩn trên mobile:** Sidebar, banner lớn, chat widget

#### **Wireframe Tablet (768px - 1023px)**
```
┌──────────────────────────────────────┐
│ HEADER (nav ngang)                   │
│ Logo | Home | Menu | About | Contact │
│                           📞 | 🛒   │
├──────────────────────────────────────┤
│                                      │
│        HERO IMAGE (100% w)           │
│        h=300px                       │
│                                      │
├──────────────────────────────────────┤
│  📧 Đặt bàn nhà hàng                │
│  [Form full-width]                   │
├──────────────────────────────────────┤
│  🍕 MÓN ĂN YÊU THÍCH                 │
│  [Grid 3 cột]                        │
│  ┌────────┬────────┬────────┐        │
│  │ Ảnh 1  │ Ảnh 2  │ Ảnh 3  │        │
│  ├────────┼────────┼────────┤        │
│  │ Ảnh 4  │ Ảnh 5  │ Ảnh 6  │        │
│  └────────┴────────┴────────┘        │
│                                      │
├──────────────────────────────────────┤
│  📍 Bản đồ (100% width)              │
│  [Google Maps iframe]                │
│  h=300px                             │
│                                      │
├──────────────────────────────────────┤
│              FOOTER                  │
└──────────────────────────────────────┘
```

#### **Wireframe Desktop (≥ 1024px)**
```
┌──────────────────────────────────────────────────────────┐
│ HEADER (full nav + search)                               │
│ Logo | Home | Menu | About | Contact | Search | Account │
├──────────┬───────────────────────────────────────────────┤
│          │                                               │
│  SIDEBAR │              HERO IMAGE                       │
│  (filters)│              (2/3 width)                      │
│          │                                               │
├──────────┴───────────────────────────────────────────────┤
│                                                          │
│  📧 Đặt bàn nhà hàng [left: 200px sidebar]              │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Ngày ▼        │ Giờ ▼        │ Số người │ Ghi chú │ │
│  │               │              │          │         │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  🍕 MÓN ĂN YÊU THÍCH                                     │
│  [Grid 4 cột]                                            │
│  ┌────────┬────────┬────────┬────────┐                   │
│  │ Ảnh 1  │ Ảnh 2  │ Ảnh 3  │ Ảnh 4  │                   │
│  ├────────┼────────┼────────┼────────┤                   │
│  │ Ảnh 5  │ Ảnh 6  │        │        │                   │
│  └────────┴────────┴────────┴────────┘                   │
│                                                          │
│  📍 Bản đồ (100% width)                                  │
│  [Google Maps iframe]                                    │
│  h=400px                                                 │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                      FOOTER                              │
│  © 2024 | About | Contact | Terms | Privacy              │
└──────────────────────────────────────────────────────────┘
```

#### **CSS Skeleton (Mobile-First, Grid-based)**

```css
/* Mobile-First Defaults */
* { margin: 0; padding: 0; box-sizing: border-box; }

body { font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; }

/* Header */
header { 
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background: #fff;
    border-bottom: 1px solid #eee;
}

nav { display: none; } /* Hidden on mobile */
.hamburger { display: block; }

/* Hero */
.hero {
    width: 100%;
    height: 200px;
    background-size: cover;
    background-position: center;
}

/* Form */
.booking-form {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 20px;
}

form input, form select, form textarea, form button {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

form button { background: #e74c3c; color: white; cursor: pointer; }

/* Product Grid */
.dish-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    padding: 20px;
}

.dish-grid img { width: 100%; height: auto; border-radius: 4px; }

/* Maps */
.maps-container { width: 100%; height: 250px; padding: 20px 0; }
.maps-container iframe { width: 100%; height: 100%; border: none; }

/* Footer */
footer { text-align: center; padding: 20px; background: #333; color: #fff; font-size: 12px; }

/* ========== TABLET (768px) ========== */
@media (min-width: 768px) {
    header { padding: 16px 24px; }
    nav { display: flex; gap: 24px; }
    .hamburger { display: none; }
    
    .hero { height: 300px; }
    
    .booking-form {
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
    }
    
    form button { grid-column: 1 / -1; }
    
    .dish-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 32px; }
    
    .maps-container { height: 300px; }
}

/* ========== DESKTOP (1024px) ========== */
@media (min-width: 1024px) {
    body { display: grid; grid-template-columns: 200px 1fr; }
    
    aside.sidebar { 
        grid-row: 1 / -1;
        background: #f9f9f9;
        padding: 20px;
        border-right: 1px solid #eee;
    }
    
    main { grid-column: 2; }
    
    header { padding: 20px 32px; }
    
    .hero { height: 400px; }
    
    .booking-form {
        grid-template-columns: repeat(4, 1fr);
        max-width: 1000px;
    }
    
    form button { grid-column: 4; }
    
    .dish-grid { grid-template-columns: repeat(4, 1fr); gap: 20px; padding: 40px; }
    
    .maps-container { height: 400px; padding: 40px 0; }
}
```

---

## 📌 CÔNG CỤNG & LỆNH

### Compile SCSS → CSS
```bash
# Install (nếu chưa có)
npm install -g sass

# Compile file
sass style.scss style.css

# Watch mode
sass --watch scss/:css/

# Compile với options
sass style.scss style.css --style=compressed
```

---

## PHẦN B3 — SCSS REFACTOR (20 điểm)

### File Structure

```
scss/
├── _variables.scss      # 8+ biến (colors, spacing, font, breakpoints, shadows)
├── _mixins.scss         # 3+ mixins (respond-to, flex-center, card-shadow)
├── _components.scss     # Component styles (header, button, card, grid)
├── style.scss           # Main file - import tất cả partials
└── README.md            # Hướng dẫn compilation
```

### Bài B3 - Kết Quả

✅ **_variables.scss** - 8+ biến:
```scss
$primary-color: #FF6B6B
$secondary-color: #4ECDC4
$font-primary: 'Segoe UI', Tahoma, Geneva
$breakpoint-md: 768px
$breakpoint-lg: 992px
$breakpoint-xl: 1200px
$spacing-md: 16px
$spacing-lg: 24px
$shadow-sm: 0 2px 4px rgba(0,0,0,0.1)
```

✅ **_mixins.scss** - 3+ mixins:
```scss
@mixin respond-to($breakpoint)      # Media query responsive
@mixin flex-center                  # Flexbox center
@mixin card-shadow                  # Card with shadow effect
@mixin button-variant($color)       # Button variant
@mixin grid-cols($cols)             # Grid columns
```

✅ **_components.scss** - Component styles:
- Base HTML styles (h1-h6, p, a, img)
- Header, Navigation
- Buttons, Badges
- Cards, Grids
- Forms, Inputs
- Footer

✅ **style.scss** - Main file:
```scss
@import 'variables';        // 1. Variables first
@import 'mixins';           // 2. Mixins (use variables)
@import 'components';       // 3. Components (use both)

// Custom styles
.product-grid {
    @include grid-cols(1);
    @include respond-to('md') { @include grid-cols(2); }
    @include respond-to('lg') { @include grid-cols(4); }
}
```

### Compilation Results

**Command:**
```bash
npm install -g sass
sass scss/style.scss style.css
```

**Output:** `style.css` (compiled from SCSS) ✅

**Verification:**
- ✅ All variables converted to CSS
- ✅ All mixins expanded in CSS
- ✅ Nesting properly flattened
- ✅ Media queries properly formatted
- ✅ File size: ~15KB (uncompressed)

---

## ✅ GHI CHÚ

- **Mobile-First:** CSS mặc định = mobile, dùng `min-width` để nâng cấp
- **Breakpoints:** 576px (sm), 768px (md), 992px (lg), 1200px (xl)
- **SCSS:** Cần compile thành CSS trước khi dùng
- **Responsive Images:** `max-width: 100%; height: auto;`
- **Viewport:** LUÔN thêm `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

