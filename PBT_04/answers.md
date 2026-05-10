Phần A:
    Position	Vẫn chiếm chỗ trong flow?	Tham chiếu vị trí	        Cuộn theo trang?	Use case
    static	    có                          Không dùng (mặc định flow)  Cuộn bình thường    Mặc định, giữ nguyên vị trí
    relative	có                          Chính nó (vị trí gốc)       Cuộn bình thường    Dịch nhẹ, làm mốc cho absolute
    absolute	không                       Cha relative gần nhất       Tùy cha             Badge, dropdown, tooltip
    fixed	    không                       Viewport (màn hình)         Không cuộn          Chat button, modal overlay  
    sticky	    có                          Viewport (khi dính)         Có thành không      Sticky header, sidebar
    Nếu parent là position: relative (hoặc absolute, fixed) → absolute tham chiếu parent
    Nếu parent là static (mặc định) → absolute bỏ qua parent, tìm tổ tiên khác
    Nếu KHÔNG có tổ tiên nào là positioned → absolute tham chiếu body/html

    Câu A2
        /* Trường hợp 1 */
        .container { display: flex; }
        .item { flex: 1; }
        /* 4 items → Bố cục = PBT_04/screenshots/th1.jpg

        /* Trường hợp 2 */
        .container { display: flex; flex-wrap: wrap; }
        .item { width: 45%; margin: 2.5%; }
        /* 6 items → Bố cục = PBT_04/screenshots/th2.jpg

        /* Trường hợp 3 */
        .container { display: flex; justify-content: space-between; align-items: center; }
        /* 3 items → Bố cục = PBT_04/screenshots/th3.jpg    

        /* Trường hợp 4 */
        .container { display: grid; grid-template-columns: 200px 1fr 200px; gap: 20px; }
        /* 3 items → Bố cục = PBT_04/screenshots/th4.jpg

        /* Trường hợp 5 */
        .container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        /* 7 items → Bố cục = PBT_04/screenshots/th5.jpg

        