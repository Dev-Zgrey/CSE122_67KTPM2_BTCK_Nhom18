# SpendWise – Bảng kiểm kê màn hình

> Tài liệu theo dõi phạm vi giao diện, nghiệp vụ, trạng thái và minh chứng triển khai của dự án SpendWise.
>
> **Quy ước trạng thái:** `Chưa làm` · `Đang làm` · `Đã làm` · `Cần duyệt`

## 1. Hướng dẫn sử dụng

Mỗi dòng là một màn hình nghiệp vụ độc lập hoặc một trang có luồng tương tác hoàn chỉnh. Modal thêm/sửa, loading, empty, error và hộp xác nhận được ghi ở cột **CRUD / trạng thái**, không tách thành màn hình mới nếu không có URL và luồng độc lập.

Một màn hình chỉ chuyển sang **Đã làm** khi đã có HTML semantic, CSS responsive, JavaScript tương tác, dữ liệu giả lập phù hợp, kiểm tra hợp lệ và minh chứng OBS/commit.

## 2. Màn hình dùng chung

| # | Role | Màn hình / file | Mục tiêu và chức năng chính | CRUD / trạng thái cần có | AI | Người phụ trách | Trạng thái | OBS / PR |
|---:|---|---|---|---|---|---|---|---|
| 1 | Tất cả | `index.html` – Landing | Giới thiệu SpendWise, lợi ích, đăng nhập/đăng ký, tài nguyên công khai. | R; loading, lỗi tải nội dung. | Không bắt buộc |  | Chưa làm |  |
| 2 | Tất cả | `login.html` – Đăng nhập | Đăng nhập, ghi nhớ phiên, chọn role, hiển thị lỗi tài khoản/mật khẩu. | C/R; thành công, sai thông tin, bị khóa, đang xử lý. | Không bắt buộc |  | Đã làm |  |
| 3 | Tất cả | `register.html` – Đăng ký | Tạo tài khoản, xác nhận mật khẩu, đồng ý điều khoản, kiểm tra email trùng. | C; rỗng, sai định dạng, email đã tồn tại, thành công. | Không bắt buộc |  | Chưa làm |  |
| 4 | Tất cả | `forgot-password.html` – Quên mật khẩu | Nhập email, gửi mã/đường dẫn, đặt mật khẩu mới. | U; mã sai, hết hạn, thành công, lỗi gửi. | Không bắt buộc |  | Chưa làm |  |
| 5 | Tất cả | `profile.html` – Hồ sơ | Xem/sửa thông tin cá nhân, ảnh đại diện, role và thông tin liên hệ. | R/U; đang lưu, validation lỗi, thành công. | Không bắt buộc |  | Chưa làm |  |
| 6 | Tất cả | `settings.html` – Cài đặt | Đổi mật khẩu, thông báo, tiền tệ, múi giờ, xóa/đăng xuất phiên. | R/U; vô hiệu hóa, xác nhận, thành công. | Không bắt buộc |  | Chưa làm |  |
| 7 | Tất cả | `notifications.html` – Thông báo | Xem, lọc, đánh dấu đã đọc và mở thông báo. | R/U; rỗng, chưa đọc, đã đọc. | Không bắt buộc |  | Chưa làm |  |
| 8 | Tất cả | `403.html` / `404.html` – Lỗi truy cập | Báo không có quyền hoặc không tìm thấy trang; quay lại dashboard. | Bị từ chối, không tồn tại. | Không bắt buộc |  | Chưa làm |  |

## 3. Role Người dùng

| # | Mục tiêu | Màn hình / file | Chức năng chính | CRUD / trạng thái | AI | Người phụ trách | Trạng thái | OBS / PR |
|---:|---|---|---|---|---|---|---|---|
| 9 | Theo dõi tổng quan | `user-finance-dashboard.html` / `index2.html` | Tổng thu/chi, số dư, ngân sách, giao dịch gần đây, cảnh báo, mục tiêu, biểu đồ. | R; loading, rỗng, lỗi tải dữ liệu. | Spending Pattern Insight tóm tắt. |  | Đã làm |  |
| 10 | Quản lý giao dịch | `user-transaction-management.html` / view Giao dịch | Tìm kiếm, lọc, thêm khoản thu/chi, xem, sửa, lưu trữ/xóa giao dịch. | C/R/U/D; form rỗng, validation, thành công, lỗi, rỗng. | Expense Categorizer gợi ý danh mục. |  | Đã làm |  |
| 11 | Lập kế hoạch ngân sách | `user-budget-management.html` / view Ngân sách | Tạo ngân sách theo tháng/danh mục, sửa hạn mức, theo dõi đã dùng/còn lại, cảnh báo. | C/R/U; chưa có dữ liệu, vượt hạn mức, khóa kỳ. | Spending Pattern Insight gợi ý hạn mức. |  | Đang làm |  |
| 12 | Quản lý mục tiêu | `user-saving-goals.html` / view Mục tiêu | Tạo mục tiêu, số tiền đích, hạn hoàn thành, cập nhật tiến độ, tạm dừng/hoàn thành. | C/R/U/D; chưa bắt đầu, đang tiến hành, hoàn thành, quá hạn. | Goal Coach tạo bước tiết kiệm. |  | Đang làm |  |
| 13 | Hiểu thói quen chi tiêu | `user-spending-insights.html` / view AI Insights | Biểu đồ theo danh mục/thời gian, so sánh kỳ, phát hiện khoản bất thường, giải thích. | R; loading, không đủ dữ liệu, lỗi, thành công. | Spending Pattern Insight có độ chắc chắn. |  | Đang làm |  |
| 14 | Xử lý đề xuất AI | `user-ai-recommendations.html` | Xem đề xuất, lý do, dữ liệu đầu vào; chấp nhận, sửa, từ chối, tạo lại, lưu. | C/R/U; đang xử lý, không chắc chắn, thất bại, đã lưu. | Expense Categorizer, Pattern Insight, Goal Coach. |  | Chưa làm |  |

## 4. Role Huấn luyện viên tài chính giáo dục

| # | Mục tiêu | Màn hình / file | Chức năng chính | CRUD / trạng thái | AI | Người phụ trách | Trạng thái | OBS / PR |
|---:|---|---|---|---|---|---|---|---|
| 15 | Theo dõi người được hướng dẫn | `coach-client-list.html` | Danh sách User, tìm kiếm/lọc, trạng thái hoạt động, mục tiêu và cảnh báo ngân sách. | R; loading, rỗng, lỗi, hạn chế quyền. | Tóm tắt pattern khi được cấp quyền. |  | Chưa làm |  |
| 16 | Đánh giá ngân sách | `coach-budget-review.html` | Xem dữ liệu được chia sẻ, ghi nhận xét, đề xuất điều chỉnh, yêu cầu bổ sung, đánh dấu review. | R/C/U; chờ review, cần bổ sung, đã duyệt, từ chối. | Gợi ý insight, Coach xác nhận trước khi gửi. |  | Chưa làm |  |
| 17 | Quản lý tài nguyên | `coach-resource-management.html` | Tạo, xem, sửa, phân loại, xuất bản, lưu trữ tài liệu/bài học. | C/R/U/D; bản nháp, chờ duyệt, xuất bản, lưu trữ. | Gợi ý tiêu đề, tóm tắt, tag. |  | Chưa làm |  |
| 18 | Soạn tài nguyên | `coach-resource-editor.html` | Nhập nội dung, mục tiêu, ví dụ, bài tập; xem trước responsive và gửi duyệt. | C/U; validation, bản nháp, gửi duyệt, lỗi lưu. | Hỗ trợ soạn nháp, luôn cho phép sửa. |  | Chưa làm |  |
| 19 | Theo dõi phản hồi | `coach-feedback.html` | Xem câu hỏi/phản hồi, trả lời, gắn trạng thái, chuyển Moderator/Admin. | R/C/U; chưa xử lý, đang xử lý, đã trả lời, đã đóng. | Không bắt buộc |  | Chưa làm |  |

## 5. Role Kiểm duyệt viên

| # | Mục tiêu | Màn hình / file | Chức năng chính | CRUD / trạng thái | AI | Người phụ trách | Trạng thái | OBS / PR |
|---:|---|---|---|---|---|---|---|---|
| 20 | Kiểm duyệt nội dung | `moderator-resource-review.html` | Xem hàng chờ, kiểm tra, yêu cầu sửa, duyệt/từ chối kèm lý do. | R/U; chờ duyệt, cần sửa, đã duyệt, từ chối, lỗi. | Gợi ý điểm kiểm tra, không thay quyết định. |  | Chưa làm |  |
| 21 | Quản lý mẫu AI | `moderator-ai-template-management.html` | Tạo, sửa, thử nghiệm, bật/tắt, lưu trữ prompt/mẫu phản hồi và phiên bản. | C/R/U/D; nháp, thử nghiệm, hoạt động, vô hiệu hóa. | Kiểm tra đầu ra và fallback. |  | Chưa làm |  |
| 22 | Xử lý báo cáo | `moderator-feedback-center.html` | Tiếp nhận báo cáo, lọc mức độ, gán người xử lý, phản hồi, đóng/chuyển Admin. | C/R/U/D; mới, xử lý, chờ phản hồi, đóng, từ chối. | Phân loại mức độ có người xác nhận. |  | Chưa làm |  |
| 23 | Kiểm tra chi tiết AI | `moderator-ai-review.html` | So sánh input/output, xem log phiên bản, đánh dấu lỗi và yêu cầu sửa mẫu. | R/U; đạt, cần xem xét, lỗi, đã xử lý. | Bắt buộc với AI-1, AI-2, AI-3. |  | Chưa làm |  |

## 6. Role Quản trị viên

| # | Mục tiêu | Màn hình / file | Chức năng chính | CRUD / trạng thái | Người phụ trách | Trạng thái | OBS / PR |
|---:|---|---|---|---|---|---|---|
| 24 | Theo dõi toàn hệ thống | `admin-system-dashboard.html` / `Dashboard_admin.html` | KPI tài khoản, giao dịch, ngân sách, mục tiêu, nội dung chờ duyệt, lỗi hệ thống. | R; loading, rỗng, lỗi, cảnh báo. |  | Đang làm |  |
| 25 | Quản lý danh mục | `admin-expense-category-management.html` | Tạo, xem, sửa, sắp xếp, bật/tắt, lưu trữ danh mục thu/chi. | C/R/U/D; trùng tên, đang dùng, hoạt động, vô hiệu hóa. |  | Chưa làm |  |
| 26 | Quản lý tài khoản | `admin-user-management.html` | Tìm kiếm, xem, tạo/sửa, gán role, khóa/mở khóa, reset mật khẩu, lịch sử. | C/R/U/D; hoạt động, khóa, chờ xác minh, vô hiệu hóa. |  | Chưa làm |  |
| 27 | Quản lý phân quyền | `admin-role-permission-management.html` | Gán quyền, giới hạn truy cập entity/màn hình, kiểm tra xung đột quyền. | C/R/U/D; chờ duyệt, hoạt động, bị từ chối. |  | Chưa làm |  |
| 28 | Nhật ký và kiểm toán | `admin-audit-log.html` | Tìm kiếm log đăng nhập, thay đổi dữ liệu, duyệt nội dung, khóa tài khoản. | R; không có dữ liệu, lỗi, đã lưu trữ. |  | Chưa làm |  |
| 29 | Cấu hình hệ thống | `admin-system-settings.html` | Cấu hình cảnh báo, AI, thông báo, danh mục mặc định, xuất dữ liệu mô phỏng. | R/U; đang lưu, thành công, lỗi, xác nhận nguy hiểm. |  | Chưa làm |  |

## 7. Ma trận bao phủ role

| Role | Màn hình nền tảng cần hoàn thành | Luồng nghiệp vụ cốt lõi |
|---|---|---|
| Người dùng | Dashboard, giao dịch, ngân sách, mục tiêu, insight, AI recommendations | Ghi nhận giao dịch → phân loại → lập ngân sách → theo dõi → nhận insight → chấp nhận/sửa/từ chối đề xuất. |
| Huấn luyện viên tài chính giáo dục | Client list, budget review, resource management, resource editor, feedback | Chọn User → review dữ liệu → phản hồi/đề xuất → tạo tài nguyên → gửi duyệt. |
| Kiểm duyệt viên | Resource review, AI template management, feedback center, AI review | Nhận hàng chờ → kiểm tra → duyệt/yêu cầu sửa/từ chối → xử lý báo cáo. |
| Quản trị viên | System dashboard, category management, user management, role permission, audit log, settings | Theo dõi hệ thống → quản lý dữ liệu nền → quản lý tài khoản/quyền → kiểm toán. |

## 8. Ba trải nghiệm AI bắt buộc

| Mã | Tính năng | Luồng tối thiểu | Trạng thái thất bại bắt buộc |
|---|---|---|---|
| AI-1 | Expense Categorizer | Nhập giao dịch → đang xử lý → gợi ý danh mục → giải thích → chấp nhận/sửa/từ chối/tạo lại/lưu. | Không đủ dữ liệu hoặc AI không chắc chắn. |
| AI-2 | Spending Pattern Insight | Chọn kỳ dữ liệu → đang xử lý → insight → lý do/độ chắc chắn → chấp nhận/sửa/từ chối/lưu. | Không đủ dữ liệu để đưa ra đề xuất. |
| AI-3 | Goal Coach | Nhập mục tiêu → đang xử lý → kế hoạch tiết kiệm → giải thích → sửa/chấp nhận/từ chối/lưu. | Không thể xử lý yêu cầu lúc này, có thao tác dùng thủ công. |

## 9. Checklist hoàn thành mỗi màn hình

- [ ] Bản mô phỏng Figma/Canva đã duyệt
- [ ] HTML semantic
- [ ] CSS hoàn chỉnh
- [ ] Responsive desktop/tablet/mobile
- [ ] Tương tác JavaScript có ý nghĩa
- [ ] Validation nếu có form
- [ ] Dữ liệu giả lập/API phù hợp
- [ ] Trạng thái rỗng
- [ ] Trạng thái loading/lỗi khi phù hợp
- [ ] Khả năng tiếp cận cơ bản
- [ ] Đã tạo branch và commit có ý nghĩa
- [ ] Pull request đã được review
- [ ] Đã merge vào `dev`
- [ ] Đã quay video OBS
- [ ] Đã cập nhật README và bảng kiểm kê

## 10. Quy ước CRUD

- `C` = Create / Tạo
- `R` = Read / Đọc
- `U` = Update / Sửa
- `D` = Delete / Xóa
- Có thể thay xóa bằng **Hủy**, **Lưu trữ**, **Vô hiệu hóa** hoặc **Đóng** khi phù hợp nghiệp vụ.
