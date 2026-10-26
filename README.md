# SpendWise

Ứng dụng quản lý ngân sách và thói quen chi tiêu. Bài tập lớn môn CSE122 – Nhóm 18, lớp 67KTPM2, Đại học Thủy Lợi.

> Đây là bản **demo giao diện** (HTML + CSS + JavaScript). Không có máy chủ hay cơ sở dữ liệu. Dữ liệu được lưu ngay trong trình duyệt của bạn.

## Chạy thử trong 3 bước

**Bước 1. Tải mã nguồn**

```bash
git clone https://github.com/Dev-Zgrey/CSE122_67KTPM2_BTCK_Nhom18.git
cd CSE122_67KTPM2_BTCK_Nhom18
```

**Bước 2. Mở trang web.** Chọn một trong hai cách:

| Cách | Làm thế nào | Khi nào dùng |
|---|---|---|
| A. Mở file | Nhấp đúp vào `index.html` | Muốn xem nhanh |
| B. Chạy máy chủ nhỏ | Gõ `python -m http.server 5500` rồi mở <http://localhost:5500> | Muốn chạy ổn định (khuyên dùng) |

Không có Python? Dùng extension **Live Server** của VS Code: bấm chuột phải vào `index.html` → **Open with Live Server**.

**Bước 3. Đăng nhập.** Bấm **Đăng nhập**, chọn một vai trò rồi vào xem.

## Có những vai trò nào?

| Vai trò | Dùng để làm gì | Thư mục |
|---|---|---|
| Người dùng | Ghi giao dịch, đặt ngân sách, xem gợi ý AI | `thanh-vien-1/nguoi-dung` |
| Huấn luyện viên | Xem học viên, soạn tài nguyên, phản hồi | `thanh-vien-2/huan-luyen-vien` |
| Kiểm duyệt viên | Duyệt nội dung và mẫu AI | `thanh-vien-3/kiem-duyet-vien` |
| Quản trị viên | Quản lý người dùng và danh mục | `thanh-vien-3/quan-tri-vien` |

Các trang dùng chung (đăng nhập, hồ sơ, cài đặt, thông báo) nằm ở `thanh-vien-2/dung-chung`.

## Xóa dữ liệu demo

Muốn bắt đầu lại từ đầu: nhấn **F12** → tab **Console** → dán lệnh sau rồi Enter.

```js
Object.keys(localStorage).filter(k => k.startsWith("spendwise.")).forEach(k => localStorage.removeItem(k));
location.reload();
```

## Gặp lỗi?

| Hiện tượng | Cách xử lý |
|---|---|
| Bị chuyển sang trang lỗi hoặc đăng nhập | Đăng nhập đúng vai trò của trang đó |
| Dữ liệu không lưu | Không dùng chế độ ẩn danh; thử cách B (máy chủ nhỏ) |
| Giao diện lỗi sau khi sửa code | Nhấn **Ctrl + F5** để tải lại, bỏ bộ nhớ đệm |
| Lệnh `python` không chạy | Thử `py -m http.server 5500`, hoặc dùng Live Server |

## Cấu trúc thư mục

```text
index.html               Trang chủ
workspace-*.js / .css    Phần dùng chung (dữ liệu, thanh chuyển chế độ xem)
thanh-vien-1/            Người dùng
thanh-vien-2/            Huấn luyện viên + trang dùng chung
thanh-vien-3/            Kiểm duyệt viên + Quản trị viên
báo cáo/                 Báo cáo, bảng kiểm kê màn hình, sơ đồ user flow
```

## Nhóm thực hiện

| Thành viên | Phụ trách |
|---|---|
| Dương Phúc Thọ | Người dùng (`thanh-vien-1`) |
| Xuân Trường | Huấn luyện viên và trang dùng chung (`thanh-vien-2`) |
| Đào Hồng Tiến | Kiểm duyệt viên và Quản trị viên (`thanh-vien-3`) |

## Tài liệu

- [Bảng kiểm kê màn hình](./báo%20cáo/spendwise-screen-inventory.md)
- [Sơ đồ user flow – Người dùng](./báo%20cáo/user-flow-nguoi-dung.md)
