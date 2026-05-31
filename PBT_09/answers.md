                                                                Phiếu bài tập 9
Phần A:

    Câu A1:
        Sơ đồ DOM Tree:
        html
        └─ body
            └─ div.todo-app
                ├─ header
                │  ├─ h1              "Todo App"
                │  └─ nav
                │     ├─ a.active[href="#"]      "All"
                │     ├─ a[href="#"]             "Active"
                │     └─ a[href="#"]             "Completed"
                ├─ form
                │  └─ input[type="text"]        "Add"
                └─ ul#todoList
                    ├─ li.todo-item              "Learn HTML"
                    └─ li.todo-item              "Learn CSS"
        QuerySelector cho mỗi yêu cầu
        Chọn thẻ h1:

        document.querySelector('h1')
        Chọn input trong form:

        document.querySelector('form input')
        Chọn tất cả .todo-item:

        document.querySelectorAll('.todo-item')
        Chọn link đang active:

        document.querySelector('nav a.active')
        Chọn li đầu tiên trong #todoList:

        document.querySelector('#todoList li')
        Chọn tất cả li bên trong #todoList:

        document.querySelectorAll('#todoList li')

    Câu A2:
     
        Sự khác nhau giữa innerHTML và textContent:
        Sự khác nhau
            innerHTML:

            Đọc/ghi toàn bộ nội dung HTML bên trong một phần tử.
            Nếu gán giá trị chứa thẻ HTML, trình duyệt sẽ parse và tạo DOM mới.
            Dùng khi cần chèn cấu trúc HTML động, ví dụ <div><strong>...</strong></div>.
            textContent:

            Đọc/ghi chỉ văn bản thuần túy (plain text).
            Các ký tự <, > được coi là text, không được parse thành HTML.
            Dùng khi bạn chỉ muốn hiển thị nội dung người dùng nhập mà không muốn trình duyệt chạy HTML.
        Khi nào dùng mỗi cái:
        Dùng innerHTML khi bạn cần:

        tạo list, table, card bằng HTML động,
        chèn thẻ <span>, <a>, <strong>, v.v.
        Dùng textContent khi bạn cần:

        hiển thị text do người dùng nhập,
        tránh parse HTML,
        ngăn ngừa XSS.
        Câu hỏi bảo mật: tại sao innerHTML gây XSS?
        Vì innerHTML sẽ parse chuỗi thành HTML. Nếu chuỗi đó chứa mã độc như <script>...</script> hoặc onerror, trình duyệt sẽ thực thi.

        Ví dụ nguy hiểm:const userInput = document.querySelector("#search").value;
                        document.querySelector("#result").innerHTML = userInput;
        Sửa thế nào?
        Dùng textContent nếu chỉ hiển thị text:
        const userInput = document.querySelector("#search").value;
        document.querySelector("#result").textContent = userInput;
        Hoặc nếu cần chèn HTML nhưng vẫn muốn an toàn, phải sanitize đầu vào trước khi gán innerHTML.

    Câu A3:

        Khi click vào button thì thứ tự log là:
        BUTTON
        INNER
        OUTER
        Vì sự kiện click phát sinh ở #btn, sau đó bubble lên #inner, rồi tiếp tục bubble lên #outer.
        Nếu uncomment e.stopPropagation(), output chỉ còn
        BUTTON
        Bởi vì stopPropagation() dừng quá trình bubbling, nên #inner và #outer sẽ không nhận được sự kiện click nữa.


Phần C:
    Câu C1:

        Sửa lỗi (ít nhất 7)
        addEventListener("onclick", ...) phải là "click".
        countDisplay = count; gán sai biến DOM, phải cập nhật textContent.
        historyList.innerHTML = null; sẽ chèn "null" vào HTML; nên dùng ''.
        item.remove; không gọi hàm; phải là item.remove().
        localStorage.getItem("count") trả về chuỗi hoặc null; cần parse số và fallback.
        Restore history bằng innerHTML thì mất event listener trên li.
        deleteHistory(this) dùng this trong callback có thể gây hiểu nhầm; dùng biến tham chiếu rõ ràng hơn.
        (Thêm) innerHTML cho count nên dùng textContent để tránh lỗi.

    Câu C2:

        Vì sao bind event lên 1000 element riêng lẻ là BAD PRACTICE?
        Mỗi element sẽ nhận một function handler riêng, tức là tạo 1000 listeners. Điều này tốn bộ nhớ, tốn thời gian khi khởi tạo và khi remove.
        Nếu bạn cần thay đổi hoặc gỡ bỏ event, phải lặp lại từng element, dễ lỗi và chậm.
        Khi DOM lớn, nhiều listener còn làm chậm trình duyệt vì mỗi lần event xảy ra phải check nhiều handler.
        Event Delegation giải quyết thế nào?

        Thay vì gắn listener vào từng item, ta gắn một listener lên parent chung.
        Khi click vào một item, event sẽ bubble lên parent. Parent kiểm tra event.target hoặc event.target.closest(...) để biết item nào bị click.
        Như vậy chỉ cần 1 listener cho cả danh sách, tiết kiệm bộ nhớ, dễ quản lý, và vẫn xử lý được các item mới thêm động.

        DocumentFragment để chỉ gây 1 lần reflow
        Nếu bạn append từng item vào DOM thật, mỗi lần append có thể khiến browser tính toán lại layout/reflow nhiều lần.
        DocumentFragment là container tạm trong bộ nhớ, không phải DOM tree hiển thị. Bạn tạo nhiều phần tử trong fragment rồi chỉ append fragment một lần vào DOM.
        Khi append fragment, browser chỉ cần tính lại layout 1 lần cho toàn bộ nhóm, nên nhanh hơn nhiều so với append từng phần tử.