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