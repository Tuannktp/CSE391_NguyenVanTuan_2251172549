                                                                Phiếu bài tập 10
Phần A:
    Câu A1:

     Dự đoán output:
        1 - Start
        4 - End
        3 - Promise
        6 - Promise 2
        2 - Timeout 0ms
        7 - Nested timeout
        5 - Timeout 100ms

        console.log("1 - Start") chạy ngay.
        setTimeout(..., 0) tạo một macrotask, không chạy ngay.
        Promise.resolve().then(...) tạo một microtask.
        console.log("4 - End") chạy ngay.
        Khi call stack trống, Event Loop ưu tiên chạy microtasks trước macrotasks.
        Microtask đầu tiên in 3 - Promise.
        Microtask tiếp theo in 6 - Promise 2 và trong đó nó thêm một setTimeout(..., 0) nữa vào macrotask queue.
        Sau khi tất cả microtasks xong, Event Loop mới xử lý macrotask queue:
        trước hết 2 - Timeout 0ms
        sau đó 7 - Nested timeout
        Cuối cùng, khi đủ 100ms và queue rảnh, 5 - Timeout 100ms chạy.

        JavaScript chỉ chạy một stack main thread.
        Khi stack trống, Event Loop kiểm tra:
        Microtask queue (Promise.then, queueMicrotask, MutationObserver)
        Nếu microtask queue rỗng, mới chạy một macrotask (setTimeout, setInterval, I/O, UI events)
        Vì vậy microtasks luôn chạy trước các timeout cùng tick.

    Câu A2:

        await fetch(...) — fetch trả về gì? Tại sao cần await?
        fetch(...) trả về một Promise chứa một đối tượng Response.
        Promise này ở trạng thái pending trong khi browser đang chờ server trả về.
        await dùng để “dừng” chờ Promise đó resolve, rồi gán kết quả trả về vào response.
        Nếu không dùng await, response sẽ là một Promise chứ không phải Response, nên ta không thể kiểm tra response.ok hay gọi response.json() trực tiếp.

        2. response.ok — Khi nào false? Liệt kê 3 status codes
        response.ok là một boolean, chỉ true khi HTTP status nằm trong khoảng 200-299.
        Nó sẽ là false khi server trả lỗi HTTP như:
        404 Not Found
        500 Internal Server Error
        403 Forbidden
        Lưu ý: fetch() không reject chỉ vì status lỗi. Nó vẫn resolve với một Response có ok = false, nên phải check thủ công.

        3. response.json() — Tại sao cần await lần nữa?
        response.json() cũng trả về một Promise.
        Hàm này đọc body response và parse JSON.
        Quá trình đọc body từ network/cached và parse JSON là bất đồng bộ, nên phải await để lấy được object JavaScript thực sự.
        Nếu không await, biến data sẽ là một Promise thay vì dữ liệu JSON đã giải mã.

        4. try...catch — Catch những lỗi gì?
        catch sẽ bắt:

        lỗi mạng, như Failed to fetch, mất kết nối, CORS, server không phản hồi
        lỗi do throw new Error(...) trong if (!response.ok) khi status HTTP không OK
        lỗi parse JSON trong await response.json() nếu server trả về body không hợp lệ
        lỗi khác phát sinh trong khối try
        Không phải mọi lỗi HTTP đều vào catch:

        404, 500, 403 sẽ không tự động vào catch trừ khi bạn throw như trong code.
        catch chủ yếu bắt network error, JSON error, và các lỗi do bạn tự ném (throw).

    Câu A3:

        Sơ đồ 3 trạng thái của Promise:
              Pending
            /       \
        Fulfilled   Rejected
        Pending — Promise đang chờ.
        Fulfilled — Promise hoàn thành thành công.
        Rejected — Promise bị từ chối lỗi.
        Dạng đầy đủ:
        Promise khởi tạo → pending

        nếu thành công → resolve(...) → fulfilled
        nếu lỗi → reject(...) → rejected
        Callback Hell là gì?
        Là tình trạng code callback cứ lồng vào callback, tạo thành “tháp ma” hoặc “pyramid of doom”.
        Khi mỗi bước async phụ thuộc vào kết quả bước trước, code trở nên khó đọc, khó debug và dễ sai.
        Nó thể hiện rõ ở các hàm function(result => { ... callback(result2 => { ... }) }).
         
        Ví dụ:
        getUser(userId, user => {
            getOrders(user.id, orders => {
                 getOrderDetails(orders[0].id, details => {
                     getShippingStatus(details.shippingId, status => {
                        console.log("Shipping:", status);
                    });
                });
             });
        });
        