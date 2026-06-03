 Weather App (B1) — Ngắn gọn

API (gợi ý): `Open-Meteo` hoặc `wttr.in` (không cần API key).

Tính năng chính:
- Input tên thành phố + nút "Tìm"
- Hiển thị Nhiệt độ, Độ ẩm, Mô tả (và icon nếu có)
- 3 trạng thái: Loading / Success / Error
- Lưu 5 tìm kiếm gần nhất vào `localStorage`

Cách chạy:
1. Mở `CCC_Frontend/weather_app/index.html` trong trình duyệt.
2. Nhập tên thành phố → nhấn "Tìm".

Ghi chú: kiểm tra Console khi gặp lỗi mạng hoặc CORS.

User Directory (B2) — Ngắn gọn

API: `https://jsonplaceholder.typicode.com/users` (CRUD endpoints).

Tính năng chính:
- READ: Hiển thị danh sách users
- CREATE / UPDATE / DELETE: Form + API (mô phỏng với JSONPlaceholder)
- SEARCH client-side theo tên/email
- Loading states và error handling

Cách chạy:
1. Mở `CCC_Frontend/user_directory/index.html` trong trình duyệt.

Ghi chú: JSONPlaceholder không lưu thay đổi thật trên server (fake API), nhưng UI sẽ cập nhật sau POST/PUT/DELETE.

Gallery (B3) — Infinite Scroll Gallery

API: Mặc định dùng `Lorem Picsum` (`https://picsum.photos/v2/list`).

Tính năng chính:
- Load 20 ảnh đầu tiên khi mở trang
- Infinite scroll tự động (IntersectionObserver)
- Hiện `Đang tải thêm...` khi fetch
- Lazy load ảnh khi vào viewport
- Click ảnh mở lightbox để xem ảnh lớn
- Grid responsive: 4 cột (desktop), 2 cột (tablet), 1 cột (mobile)

Cách chạy:
1. Mở `gallery/index.html` trong trình duyệt.
2. Muốn dùng `JSONPlaceholder` thay Picsum, chỉnh `USE_PICSUM = false` trong `gallery/app.js`.

Ghi chú: kiểm tra Console nếu ảnh không hiện (mạng / CORS / API lỗi).

Dashboard (B4) — Multi-API Dashboard

APIs used (examples):
- `https://jsonplaceholder.typicode.com/users` (Users)
- `https://randomuser.me/api/?results=5` (Random users)
- `https://dog.ceo/api/breeds/image/random/6` (Dog images)

Tính năng chính:
- Gọi song song 3 APIs bằng `Promise.allSettled()`
- Hiện loading tổng thể khi fetch
- Mỗi widget có trạng thái riêng (loading / success / error)
- Nút `Refresh All` để tải lại tất cả widgets
- Hiển thị thời gian fetch: "Data loaded in X ms"

Cách chạy:
1. Mở `dashboard/index.html` trong trình duyệt.

Ghi chú: mỗi widget xử lý lỗi riêng (1 API lỗi không ảnh hưởng các widget khác).
