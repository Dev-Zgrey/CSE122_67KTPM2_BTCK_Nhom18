# Cây nghiệp vụ – Soạn nội dung tài nguyên

## 1. Mục tiêu giao diện
Huấn luyện viên quản lý bài soạn tài nguyên: xem danh sách, tìm kiếm/lọc, tạo mới, chỉnh sửa, xóa và xuất dữ liệu CSV.

## 2. Cây nghiệp vụ

- **Soạn nội dung tài nguyên**
  - **Điều hướng và phiên làm việc**
    - Hiển thị vai trò Huấn luyện viên, menu chức năng và thông tin tài khoản.
    - Chọn các trang Học viên, Duyệt ngân sách, Tài nguyên, Soạn nội dung hoặc Phản hồi.
    - Mở Hồ sơ, Cài đặt, Thông báo.
    - Đăng xuất → xóa `spendwise.session` khỏi `localStorage` → chuyển đến trang đăng nhập.
  - **Khởi tạo trang**
    - Đọc danh sách từ `localStorage` với khóa `spendwise.resources`.
    - Nếu dữ liệu không hợp lệ/không đọc được → dùng danh sách rỗng.
    - Vẽ lại thống kê, bảng danh sách, số lượng và trạng thái rỗng.
  - **Theo dõi tổng quan**
    - Hiển thị tổng số bài soạn.
    - Đếm bài đã xuất bản.
    - Đếm bài chờ duyệt.
    - Đếm bản nháp.
  - **Tra cứu danh sách bài soạn**
    - Nhập từ khóa → tìm theo tiêu đề hoặc tóm tắt.
    - Chọn trạng thái → lọc theo trạng thái.
    - Kết hợp từ khóa và trạng thái.
    - Làm mới bộ lọc → xóa từ khóa và trạng thái đã chọn.
    - Có kết quả → hiển thị bảng gồm tiêu đề, loại, đối tượng, ngày cập nhật, trạng thái và thao tác.
    - Không có kết quả → ẩn bảng, hiện thông báo rỗng và nút soạn bài mới.
  - **Soạn bài mới**
    - Chọn “Soạn bài mới” → mở biểu mẫu, đặt trạng thái mặc định là “Bản nháp”.
    - Nhập tiêu đề (bắt buộc).
    - Chọn loại nội dung (bài học, hướng dẫn, bài tập, tài liệu).
    - Nhập đối tượng (bắt buộc).
    - Chọn trạng thái.
    - Nhập tóm tắt (không bắt buộc).
    - Nhập nội dung chi tiết (bắt buộc).
    - Gửi biểu mẫu:
      - Thiếu tiêu đề → báo lỗi, không lưu.
      - Thiếu nội dung chi tiết → báo lỗi, không lưu.
      - Hợp lệ → tạo mã bài soạn và ngày cập nhật, thêm vào đầu danh sách, lưu `localStorage`, đóng biểu mẫu, cập nhật giao diện và báo thành công.
  - **Chỉnh sửa bài soạn**
    - Chọn biểu tượng sửa tại một dòng → mở biểu mẫu với dữ liệu hiện tại.
    - Thay đổi thông tin và gửi biểu mẫu.
    - Kiểm tra tiêu đề và nội dung chi tiết.
    - Hợp lệ → cập nhật bản ghi và ngày cập nhật, lưu dữ liệu, đóng biểu mẫu, vẽ lại danh sách và báo thành công.
  - **Đóng biểu mẫu**
    - Chọn nút đóng hoặc Hủy → đóng biểu mẫu, không lưu thay đổi.
    - Bấm vùng nền bên ngoài biểu mẫu → đóng biểu mẫu.
  - **Xóa bài soạn**
    - Chọn nút xóa → hỏi xác nhận kèm tiêu đề bài.
    - Đồng ý → loại bài khỏi danh sách, lưu dữ liệu, vẽ lại giao diện và báo thành công.
    - Hủy xác nhận → giữ nguyên dữ liệu.
  - **Xuất dữ liệu**
    - Chọn “Xuất dữ liệu”.
    - Danh sách rỗng → thông báo chưa có bài để xuất.
    - Có dữ liệu → tạo tệp CSV UTF-8 gồm tiêu đề, loại, đối tượng, trạng thái, tóm tắt, nội dung và ngày cập nhật; tải xuống theo tên `bai-soan-YYYY-MM-DD.csv`.

## 3. Trạng thái bài soạn
- Bản nháp
- Chờ duyệt
- Đã xuất bản
- Cần chỉnh sửa
- Đã lưu trữ

## 4. Dữ liệu chính của một bài soạn
- `id`: mã định danh
- `title`: tiêu đề
- `type`: loại nội dung
- `audience`: đối tượng
- `status`: trạng thái
- `summary`: tóm tắt
- `content`: nội dung chi tiết
- `updatedAt`: ngày cập nhật

## 5. Quy tắc lưu và phản hồi
- Danh sách được lưu cục bộ trên trình duyệt trong `localStorage` (`spendwise.resources`).
- Các thao tác thêm, sửa, xóa đều cập nhật danh sách và dựng lại giao diện.
- Thông báo thao tác hiển thị dạng toast và tự ẩn sau khoảng 3 giây.
