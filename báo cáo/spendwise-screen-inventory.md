# SpendWise – Bảng kiểm kê màn hình

> Tài liệu theo dõi phạm vi giao diện, nghiệp vụ, trạng thái và minh chứng triển khai của dự án SpendWise.
>
> **Quy ước trạng thái:** `Chưa làm` · `Đang làm` · `Đã làm` · `Cần duyệt`

## 1. Hướng dẫn sử dụng

Mỗi dòng là một màn hình nghiệp vụ độc lập hoặc một trang có luồng tương tác hoàn chỉnh. Modal thêm/sửa, loading, empty, error và hộp xác nhận được ghi ở cột **CRUD / trạng thái**, không tách thành màn hình mới nếu không có URL và luồng độc lập.

Trong phạm vi bản demo frontend local, **Đã làm** nghĩa là giao diện HTML, CSS responsive, JavaScript và dữ liệu demo đã được triển khai; các luồng đại diện đã được kiểm tra trên trình duyệt. Backend, dịch vụ AI thật, commit/PR và video OBS là minh chứng hoặc phạm vi phát hành riêng, không được suy ra từ trạng thái này.

**Giới hạn bản demo:** không có backend hoặc SQL. Phần lớn dữ liệu được lưu trong `localStorage`; trang quản lý tài khoản đọc danh sách người dùng từ MockAPI, còn vai trò/trạng thái bổ sung vẫn là dữ liệu demo cục bộ. Đăng nhập, phân quyền và AI chỉ được mô phỏng phía frontend, không dùng cho dữ liệu thật hoặc bảo mật sản xuất.

**Quy ước lớp giao diện:** dùng tiền tố `account-` cho trang tài khoản, `ws-` cho các workspace CRUD và `user-` cho ba trang tài chính tùy biến; biến thể dùng `--`, trạng thái dùng `is-*`, còn `data-*` chỉ dành cho móc JavaScript.

## 2. Màn hình dùng chung

### Kết quả rà soát và gộp màn hình

- Đã gộp các luồng ít trang trong cùng role thành chế độ xem có URL query, giữ nguyên module CRUD và khóa `localStorage`: Phân tích/AI; Học viên/Review ngân sách; Thư viện/Soạn tài nguyên; Mẫu AI/Kiểm tra AI; Dashboard/Nhật ký; Tài khoản/Phân quyền; Danh mục/Cấu hình hệ thống.
- Đăng nhập, đăng ký và khôi phục mật khẩu cùng dùng `thanh-vien-2/dung-chung/login.html` với `?view=login|register|forgot`. Hồ sơ và cài đặt cùng dùng `profile.html` với `?view=profile|settings`.
- `404.html` hiển thị cả lỗi 404 mặc định và lỗi 403 qua `?code=403`. Landing `index.html` thay cho trang danh mục demo; chọn role vẫn có ở biểu mẫu đăng nhập.
- Quy mô sau gộp: 19 nhóm màn hình và 19 URL HTML; landing nằm trong tổng này. Hub demo, dashboard trùng và các trang đã nhập vào tab đã xóa.

| # | Role | Màn hình / file | Mục tiêu và chức năng chính | CRUD / trạng thái cần có | AI | Người phụ trách | Trạng thái | OBS / PR |
|---:|---|---|---|---|---|---|---|---|
| 1 | Tất cả | `index.html` – Landing | Giới thiệu SpendWise và mở đăng nhập/đăng ký. | R; loading, lỗi tải nội dung. | Không bắt buộc |  | Đã làm |  |
| 2 | Tất cả | `thanh-vien-2/dung-chung/login.html` – Tài khoản | Đăng nhập, tạo tài khoản hoặc khôi phục mật khẩu qua các tab `view=login|register|forgot`; chọn role demo. | C/R/U; xác thực lỗi, email trùng, mật khẩu sai, thành công. | Không bắt buộc |  | Đã làm |  |
| 3 | Tất cả | `thanh-vien-2/dung-chung/profile.html` – Hồ sơ & cài đặt | Sửa hồ sơ, tiền tệ, múi giờ, thông báo, mật khẩu demo; đăng xuất và đặt lại dữ liệu. | R/U; xác nhận, validation, thành công, lỗi. | Không bắt buộc |  | Đã làm |  |
| 4 | Tất cả | `thanh-vien-2/dung-chung/notifications.html` – Thông báo | Xem, lọc, đánh dấu đã đọc và mở thông báo. | R/U; rỗng, chưa đọc, đã đọc. | Không bắt buộc |  | Đã làm |  |
| 5 | Tất cả | `thanh-vien-2/dung-chung/404.html` – Lỗi truy cập | Hiển thị 404 mặc định hoặc 403 qua `?code=403`; điều hướng về nơi phù hợp. | Trạng thái 403 / 404. | Không bắt buộc |  | Đã làm |  |

## 3. Role Người dùng

| # | Mục tiêu | Màn hình / file | Chức năng chính | CRUD / trạng thái | AI | Người phụ trách | Trạng thái | OBS / PR |
|---:|---|---|---|---|---|---|---|---|
| 6 | Theo dõi tổng quan | `thanh-vien-1/nguoi-dung/overview.html` | Tổng thu/chi, số dư, ngân sách, giao dịch gần đây, cảnh báo, mục tiêu, biểu đồ. | R; loading, rỗng, lỗi tải dữ liệu. | Spending Pattern Insight tóm tắt. |  | Đã làm |  |
| 7 | Quản lý giao dịch | `thanh-vien-1/nguoi-dung/transactions.html` | Tìm kiếm, lọc, thêm khoản thu/chi, sửa, xóa giao dịch. | C/R/U/D; validation, thành công, lỗi, rỗng. | Expense Categorizer gợi ý danh mục. |  | Đã làm |  |
| 8 | Lập kế hoạch ngân sách | `thanh-vien-1/nguoi-dung/budget.html` | Tạo ngân sách theo tháng/danh mục, sửa hạn mức, theo dõi đã dùng/còn lại, cảnh báo. | C/R/U; chưa có dữ liệu, vượt hạn mức, khóa kỳ. | Spending Pattern Insight gợi ý hạn mức. |  | Đã làm |  |
| 9 | Quản lý mục tiêu | `thanh-vien-1/nguoi-dung/goals.html` | Tạo mục tiêu, số tiền đích, hạn hoàn thành, cập nhật tiến độ, tạm dừng/hoàn thành. | C/R/U/D; chưa bắt đầu, đang tiến hành, hoàn thành, quá hạn. | Goal Coach tạo bước tiết kiệm. |  | Đã làm |  |
| 10 | Phân tích & đề xuất AI | `thanh-vien-1/nguoi-dung/insights.html` với `?view=insights|ai` | So sánh chi tiêu theo danh mục, nhận insight có độ chắc chắn; xem lý do/đầu vào và chấp nhận, sửa, từ chối, tạo lại hoặc lưu đề xuất. | R/C/U; thiếu dữ liệu, không chắc chắn, lỗi, đã lưu. | Spending Pattern Insight, Expense Categorizer, Goal Coach. |  | Đã làm |  |

## 4. Role Huấn luyện viên tài chính giáo dục

| # | Mục tiêu | Màn hình / file | Chức năng chính | CRUD / trạng thái | AI | Người phụ trách | Trạng thái | OBS / PR |
|---:|---|---|---|---|---|---|---|---|
| 11 | Theo dõi học viên & review | `thanh-vien-2/huan-luyen-vien/clients.html` với `?view=clients|review` | Tìm kiếm học viên, xem dữ liệu được chia sẻ; tạo review ngân sách, nhận xét, đề xuất, yêu cầu bổ sung và cập nhật trạng thái. | R/C/U; chờ review, cần bổ sung, đã duyệt, từ chối. | Insight được Coach xác nhận trước khi gửi. |  | Đã làm |  |
| 12 | Quản lý & soạn tài nguyên | `thanh-vien-2/huan-luyen-vien/resources.html` với `?view=library|editor` | Tạo, phân loại, lưu trữ, xuất bản; soạn mục tiêu, ví dụ, nội dung và gửi duyệt. | C/R/U/D; nháp, chờ duyệt, xuất bản, cần chỉnh sửa, lưu trữ. | Gợi ý tiêu đề/tóm tắt; luôn cho phép sửa. |  | Đã làm |  |
| 13 | Theo dõi phản hồi | `thanh-vien-2/huan-luyen-vien/feedback.html` | Xem câu hỏi/phản hồi, trả lời, gắn trạng thái, chuyển Moderator/Admin. | R/C/U; chưa xử lý, đang xử lý, đã trả lời, đã đóng. | Không bắt buộc |  | Đã làm |  |

## 5. Role Kiểm duyệt viên

| # | Mục tiêu | Màn hình / file | Chức năng chính | CRUD / trạng thái | AI | Người phụ trách | Trạng thái | OBS / PR |
|---:|---|---|---|---|---|---|---|---|
| 14 | Kiểm duyệt nội dung | `thanh-vien-3/kiem-duyet-vien/resources.html` | Xem hàng chờ, kiểm tra, yêu cầu sửa, duyệt/từ chối kèm lý do. | R/U; chờ duyệt, cần sửa, đã duyệt, từ chối, lỗi. | Gợi ý điểm kiểm tra, không thay quyết định. |  | Đã làm |  |
| 15 | Mẫu AI & kiểm tra kết quả | `thanh-vien-3/kiem-duyet-vien/ai-templates.html` với `?view=templates|review` | Quản lý phiên bản prompt, thử nghiệm đầu ra; xem input/output và đánh dấu đạt, lỗi hoặc cần xem xét. | C/R/U/D; nháp, thử nghiệm, hoạt động, lỗi, đã xử lý. | Kiểm tra 3 trải nghiệm AI và fallback. |  | Đã làm |  |
| 16 | Xử lý báo cáo | `thanh-vien-3/kiem-duyet-vien/feedback.html` | Tiếp nhận báo cáo, lọc mức độ, gán người xử lý, phản hồi, đóng/chuyển Admin. | C/R/U/D; mới, xử lý, chờ phản hồi, đóng, từ chối. | Phân loại mức độ có người xác nhận. |  | Đã làm |  |

## 6. Role Quản trị viên

| # | Mục tiêu | Màn hình / file | Chức năng chính | CRUD / trạng thái | Người phụ trách | Trạng thái | OBS / PR |
|---:|---|---|---|---|---|---|---|
| 17 | Tổng quan & nhật ký | `thanh-vien-3/quan-tri-vien/dashboard.html` với `?view=overview|audit` | Xem KPI hệ thống hoặc tìm kiếm/xuất nhật ký hoạt động gần đây. | R; không có dữ liệu, lỗi tải, lọc. |  |  | Đã làm |  |
| 18 | Tài khoản & phân quyền | `thanh-vien-3/quan-tri-vien/users.html` với `?view=users|permissions` | Quản lý tài khoản, vai trò/trạng thái và quy tắc quyền theo role/phạm vi dữ liệu. | C/R/U/D; email trùng, hoạt động, khóa, chờ duyệt. |  |  | Đã làm |  |
| 19 | Danh mục & cấu hình | `thanh-vien-3/quan-tri-vien/categories.html` với `?view=categories|settings` | CRUD danh mục thu/chi và cấu hình cảnh báo, AI, thông báo, quyền riêng tư. | C/R/U/D; trùng tên, đang dùng, xác nhận, lỗi lưu. |  |  | Đã làm |  |

## 7. Ma trận bao phủ role

| Role | Màn hình nền tảng cần hoàn thành | Luồng nghiệp vụ cốt lõi |
|---|---|---|
| Người dùng | Tổng quan, giao dịch, ngân sách, mục tiêu, Phân tích & AI | Ghi nhận giao dịch → phân loại → lập ngân sách → theo dõi → đọc insight và xử lý đề xuất. |
| Huấn luyện viên tài chính giáo dục | Học viên & review, Quản lý & soạn tài nguyên, phản hồi | Chọn User → review dữ liệu → phản hồi/đề xuất → soạn và gửi tài nguyên duyệt. |
| Kiểm duyệt viên | Duyệt nội dung, Mẫu AI & kiểm tra kết quả, xử lý báo cáo | Nhận hàng chờ → kiểm tra nội dung/AI → duyệt, yêu cầu sửa hoặc đóng báo cáo. |
| Quản trị viên | Tổng quan & nhật ký, Tài khoản & phân quyền, Danh mục & cấu hình | Theo dõi hệ thống → quản lý dữ liệu nền → quản lý tài khoản/quyền → kiểm toán. |

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

## 11. Phân chia branch cho nhóm

Các trang nghiệp vụ giữ module HTML/CSS/JavaScript theo chức năng; những module được gộp tải trên cùng trang host bằng `workspace-loader.js` và chuyển chế độ qua query `view` hoặc `code`. `workspace-tabs.js` cập nhật tab, sidebar và các liên kết cũ. Các trang tài chính tiếp tục dùng chung khóa `localStorage`; việc gộp URL không đổi schema hoặc xóa dữ liệu.

Các branch thành viên chỉ chứa folder được giao; branch `master` là nơi tích hợp toàn bộ ứng dụng và folder báo cáo. Do các trang liên kết giữa nhiều folder, hãy chạy ứng dụng đầy đủ từ `master`.

| Branch | Phạm vi phụ trách | Tệp chính |
|---|---|---|
| `feature/user-pages` | Thành viên 1: Người dùng | `thanh-vien-1/nguoi-dung/` |
| `feature/coach-moderator` | Thành viên 2: Tài khoản dùng chung và Huấn luyện viên | `thanh-vien-2/dung-chung/`, `thanh-vien-2/huan-luyen-vien/` |
| `feature/admin-integration` | Thành viên 3: Kiểm duyệt viên và Quản trị viên | `thanh-vien-3/kiem-duyet-vien/`, `thanh-vien-3/quan-tri-vien/` |
| `master` | Ứng dụng tích hợp và báo cáo chung của nhóm | `báo cáo/` cùng toàn bộ mã nguồn |

Mỗi thành viên chỉ cập nhật folder thuộc phạm vi của mình trên branch được giao. Khi tích hợp, giữ nguyên các tên thư mục để liên kết giữa các nhóm vẫn hoạt động. Các thay đổi điều hướng hoặc cấu trúc dữ liệu `localStorage` cần được báo cho các thành viên còn lại.
