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

