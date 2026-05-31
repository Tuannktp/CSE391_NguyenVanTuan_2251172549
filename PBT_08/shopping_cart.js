function createCart() {
    // === PRIVATE DATA (Dữ liệu bảo mật bên trong Closure) ===
    let items = [];
    let activeDiscount = { code: "", type: "", value: 0 };

    return {
     
        addItem(product, quantity = 1) {
            if (quantity <= 0) return;
            
            // Tìm xem sản phẩm đã tồn tại trong giỏ hàng chưa
            const existingItem = items.find(item => item.id === product.id);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
              
                items.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: quantity
                });
            }
        },
        
       
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },
        
        
        updateQuantity(productId, newQuantity) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
                return;
            }
            const item = items.find(item => item.id === productId);
            if (item) {
                item.quantity = newQuantity;
            }
        },
        
       
        getTotal() {
           
            const subTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            
            if (activeDiscount.type === "percentage") {
                return subTotal * (1 - activeDiscount.value);
            } else if (activeDiscount.type === "fixed") {
                
                return Math.max(0, subTotal - activeDiscount.value);
            }
            
            return subTotal;
        },
        
       
        applyDiscount(code) {
            const formattedCode = code.toUpperCase().trim();
            
            switch (formattedCode) {
                case "SALE10":
                    activeDiscount = { code: formattedCode, type: "percentage", value: 0.1 };
                    console.log(`[Thông báo] Áp dụng mã ${formattedCode} thành công! Giảm 10%`);
                    break;
                case "SALE20":
                    activeDiscount = { code: formattedCode, type: "percentage", value: 0.2 };
                    console.log(`[Thông báo] Áp dụng mã ${formattedCode} thành công! Giảm 20%`);
                    break;
                case "FREESHIP":
                    activeDiscount = { code: formattedCode, type: "fixed", value: 30000 };
                    console.log(`[Thông báo] Áp dụng mã ${formattedCode} thành công! Giảm 30.000đ`);
                    break;
                default:
                    console.log(`[Lỗi] Mã giảm giá "${code}" không hợp lệ!`);
            }
        },
        
        
        printCart() {
            if (items.length === 0) {
                console.log("┌──────────────────────────────────────────────┐");
                console.log("│             Giỏ hàng trống trơn!             │");
                console.log("└──────────────────────────────────────────────┘");
                return;
            }

            console.log("┌──────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm       │ SL │ Đơn giá     │ Tổng        │");
            console.log("├───┼────────────────┼────┼─────────────┼─────────────┤");
            
            items.forEach((item, index) => {
                const stt = (index + 1).toString().padEnd(1, ' ');
                const name = item.name.padEnd(14, ' ');
                const qty = item.quantity.toString().padStart(2, ' ');
                const price = item.price.toLocaleString("vi-VN").padStart(11, ' ');
                const totalItem = (item.price * item.quantity).toLocaleString("vi-VN").padStart(11, ' ');
                
                console.log(`│ ${stt} │ ${name} │ ${qty} │ ${price} │ ${totalItem} │`);
            });
            
            console.log("├──────────────────────────────────────────────┤");
            
            
            if (activeDiscount.code) {
                const discountText = `Mã đã dùng: ${activeDiscount.code}`.padEnd(25, ' ');
                console.log(`│ ${discountText}                    │`);
            }
            
            const finalTotalStr = (this.getTotal().toLocaleString("vi-VN") + "đ").padStart(14, ' ');
            console.log(`│ Tổng cộng:                    ${finalTotalStr} │`);
            console.log("└──────────────────────────────────────────────┘");
        },
        
       
        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },
        
    
        clearCart() {
            items = [];
            activeDiscount = { code: "", type: "", value: 0 };
            console.log("[Thông báo] Đã xóa toàn bộ giỏ hàng.");
        }
    };
}

const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Tăng số lượng lên 2

// Test in giỏ hàng lần 1 (Chưa giảm giá)
cart.printCart();

// Test áp dụng mã giảm giá và in lại
cart.applyDiscount("SALE10");
cart.printCart();

// Test đếm tổng số lượng item
console.log("Số SP trong giỏ hiện tại:", cart.getItemCount()); // Kỳ vọng: 4

// Test xóa sản phẩm AirPods Pro (id: 3)
cart.removeItem(3);
console.log("Sau khi xóa AirPods Pro, tổng số lượng SP còn lại:", cart.getItemCount()); // Kỳ vọng: 2