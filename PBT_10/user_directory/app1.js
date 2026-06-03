// Hàm viết tắt lấy DOM nhanh theo ID
const $ = id => document.getElementById(id);
const baseURL = "https://jsonplaceholder.typicode.com/users";

const app = {
    all: [],
    
    // Hàm gọi API dùng chung rút gọn tối đa cho 4 phương thức GET, POST, PUT, DELETE
    async req(url, method = 'GET', body) {
        const res = await fetch(url, { method, headers: {'Content-Type': 'application/json'}, body: JSON.stringify(body) });
        if (!res.ok) throw new Error();
        return res.json();
    },

    // Hàm render table kiêm xử lý Skeleton Loader và Trạng thái Trống (No users found)
    render(data = this.all, isLoading = false) {
        const container = $('usersContainer');
        if (isLoading) {
            container.innerHTML = `<table>${'<tr><td colspan="5"><div class="skeleton-line"></div></td></tr>'.repeat(5)}</table>`;
            return;
        }
        container.innerHTML = data.length ? `<table><thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Actions</th></tr></thead><tbody>${data.map(u => `
            <tr><td>${u.id}</td><td><b>${u.name}</b></td><td>${u.email}</td><td>${u.phone || '-'}</td><td class="actions">
                <button class="btn btn-edit" onclick="app.edit(${u.id})">Edit</button>
                <button class="btn btn-delete" onclick="app.del(${u.id})">Delete</button>
            </td></tr>`).join('')}</tbody></table>` : '<p style="text-align:center;color:#666;padding:20px;">No users found</p>';
    },

    // Xử lý tạo mới HOẶC cập nhật thông tin User khi Submit Form
    async save(e) {
        e.preventDefault();
        const id = $('userId').value, user = {
            name: $('userName').value, email: $('userEmail').value,
            phone: $('userPhone').value, company: { name: $('userCompany').value }
        };
        if (!user.name || !user.email) return this.toast('⚠️ Name and Email are required');
        
        try {
            if (id) {
                await this.req(`${baseURL}/${id}`, 'PUT', user);
                this.all = this.all.map(u => u.id == id ? {...u, ...user} : u);
                this.toast('✅ User updated successfully');
            } else {
                const res = await this.req(baseURL, 'POST', user);
                this.all.unshift({...res, id: this.all.length > 0 ? Math.max(...this.all.map(x => x.id)) + 1 : 1}); // Tạo ID tăng dần tránh bug trùng ID:11 từ API mock
                this.toast('✅ User created successfully');
            }
            this.toggle();
            this.render();
        } catch (err) { this.toast('❌ Error saving data'); }
    },

    // Click Edit: Đổ nhanh toàn bộ dữ liệu cũ vào các ô Input của Form
    edit(id) {
        const u = this.all.find(x => x.id === id);
        if (!u) return;
        ['userId', 'userName', 'userEmail', 'userPhone'].forEach(k => $(k).value = u[k.replace('user', '').toLowerCase()] || '');
        $('userCompany').value = u.company?.name || '';
        this.toggle('Edit User');
    },

    // Click Delete: Xác nhận -> Gọi API DELETE -> Xóa trực tiếp khỏi mảng local
    async del(id) {
        if (confirm('Are you sure you want to delete this user?')) {
            try {
                await this.req(`${baseURL}/${id}`, 'DELETE');
                this.all = this.all.filter(u => u.id !== id);
                this.render();
                this.toast('✅ User deleted successfully');
            } catch (err) { this.toast('❌ Error deleting user'); }
        }
    },

    // Hàm đa năng: Đóng/Mở Modal, Thay đổi tiêu đề, Tự động Reset Form
    toggle(title = 'Add User') {
        if (!title.target) $('userForm').reset(), $('formTitle').textContent = title;
        $('formModal').classList.toggle('active', !!title.target ? false : undefined);
    },

    // Hàm hiển thị Toast thông báo thành công hoặc lỗi (Tự biến mất sau 2.5s)
    toast(msg) {
        const container = document.querySelector(".container");
        const msgDiv = document.createElement("div");
        msgDiv.className = msg.includes('❌') || msg.includes('⚠️') ? "error show" : "success-msg";
        msgDiv.textContent = msg;
        container.insertBefore(msgDiv, container.firstChild);
        setTimeout(() => msgDiv.remove(), 2500);
    },

    // Khởi chạy ứng dụng và lắng nghe toàn bộ sự kiện đầu vào
    init() {
        $('addUserBtn').onclick = () => this.toggle();
        $('cancelBtn').onclick = () => this.toggle();
        $('userForm').onsubmit = (e) => this.save(e);
        $('searchInput').oninput = (e) => this.render(this.all.filter(u => 
            [u.name, u.email].some(v => v.toLowerCase().includes(e.target.value.toLowerCase()))));
        
        // Đóng modal khi bấm ra ngoài form
        window.onclick = (e) => { if(e.target === $('formModal')) this.toggle(); };

        // Kích hoạt Skeleton Loader trước khi gọi API lấy dữ liệu thực tế
        this.render([], true); 
        this.req(baseURL)
            .then(data => { this.all = data; this.render(); })
            .catch(() => { $('errorDiv').textContent = "❌ Failed to load users from API."; $('errorDiv').classList.add('show'); });
    }
};

document.addEventListener("DOMContentLoaded", () => app.init());