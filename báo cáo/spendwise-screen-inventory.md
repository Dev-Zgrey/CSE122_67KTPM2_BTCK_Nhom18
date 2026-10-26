# SpendWise – Bảng kiểm kê màn hình

> Tài liệu theo dõi phạm vi giao diện, nghiệp vụ, trạng thái và minh chứng triển khai của dự án SpendWise.
>
> **Quy ước trạng thái triển khai:** `Chưa làm` · `Đang làm` · `Đã làm` · `Cần duyệt`

## 1. Hướng dẫn sử dụng

Mỗi dòng trong bảng kiểm kê là một màn hình nghiệp vụ độc lập hoặc một trang có luồng tương tác hoàn chỉnh. Mỗi màn hình được mô tả bằng đúng 12 cột: **Role**, **User Goal**, **User Task**, **Screen**, **File**, **CRUD**, **States**, **AI**, **Assignee**, **Task ID**, **Branch**, **OBS**. Modal thêm/sửa, loading, empty, error và hộp xác nhận được ghi ở cột **CRUD** hoặc **States**, không tách thành màn hình mới nếu không có URL và luồng độc lập.

Trong phạm vi bản demo frontend local, **Đã làm** nghĩa là giao diện và luồng nghiệp vụ đã được triển khai trong mã nguồn; trạng thái này không thay thế kiểm thử hồi quy sau mỗi lần chỉnh sửa. Trang Tổng quan, Giao dịch, Ngân sách, Đăng ký/Đăng nhập và Quản lý tài khoản đã được kiểm tra luồng chính trên trình duyệt. Các màn hình còn lại cần được kiểm tra lại trước khi phát hành. Backend, dịch vụ AI thật, commit/PR và video OBS là phạm vi riêng.

**Giới hạn bản demo:** không có backend hoặc SQL. Dữ liệu được lưu trong `localStorage`; trang quản lý tài khoản dùng danh sách lưu trên thiết bị, không còn kết nối MockAPI. Các kho dữ liệu mới bắt đầu bằng mảng rỗng; dữ liệu `localStorage` đã có được giữ nguyên, không tự xóa. Đăng nhập, phân quyền và AI chỉ được mô phỏng phía frontend, không dùng cho dữ liệu thật hoặc bảo mật sản xuất.

**Quy ước lớp giao diện:** các tiền tố dài đã được rút gọn đồng bộ trong HTML, CSS, JavaScript và cây khung: `transaction-` → `tx-`, `budget-` → `bud-`, `overview-` → `ov-`, `summary-` → `sum-`, `sidebar-` → `side-`, `header-` → `head-`, `page-` → `pg-`, `account-` → `acc-`. Trạng thái tiếp tục dùng `is-*`; các móc `data-*` được cập nhật cùng tên để không lệch selector.

## 2. Bảng kiểm kê màn hình

### Kết quả rà soát

- Mỗi tệp HTML là một màn hình riêng; không còn gộp nhiều màn hình bằng tham số `?view=`. Quy mô hiện tại: **29 màn hình, 29 URL HTML** (landing nằm trong tổng này): 8 màn hình dùng chung (gồm landing), 6 của Người dùng, 5 của Huấn luyện viên, 4 của Kiểm duyệt viên, 6 của Quản trị viên.
- Đăng nhập, đăng ký, quên mật khẩu, hồ sơ và cài đặt là năm trang tách biệt trong `thanh-vien-2/dung-chung/`. `404.html` hiển thị cả lỗi 404 mặc định và lỗi 403 qua `?code=403`.
- Các màn hình được bổ sung so với bản trước: `register.html`, `forgot-password.html`, `settings.html` (cài đặt cá nhân), `budget.html` và `edit-resource.html` của Huấn luyện viên, `ai-review.html` của Kiểm duyệt viên, `audit.html`, `permissions.html`, `settings.html` của Quản trị viên, cùng `ai.html` của Người dùng. Các màn hình cũ đã gộp được tách lại thành từng trang.
- `Assignee` theo thư mục: `thanh-vien-1/` là Dương Phúc Thọ; `thanh-vien-2/` là Xuân Trường; `thanh-vien-3/` là Đào Hồng Tiến; trang không thuộc thư mục thành viên nào ghi là Chung. `Task ID` và `OBS` ghi rõ là chưa có khi chưa được cung cấp; không tự gán mã công việc hoặc liên kết video.
- Branch theo phạm vi hiện có: `feature/user-pages` cho Người dùng; `feature/coach-moderator` cho Tài khoản dùng chung và Huấn luyện viên; `feature/admin-integration` cho Kiểm duyệt viên và Quản trị viên; `master` cho landing/tích hợp.
- Cột States, CRUD và AI được suy ra từ cấu trúc từng trang (bảng, biểu mẫu, nút) và phạm vi trong đề bài; cần đối chiếu lại khi kiểm thử.

| Role | User Goal | User Task | Screen | File | CRUD | States | AI | Assignee | Task ID | Branch | OBS |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Tất cả | Tìm hiểu SpendWise và bắt đầu sử dụng ứng dụng. | Xem giới thiệu, chọn đăng nhập hoặc đăng ký. | Landing | `index.html` | R; không có thao tác dữ liệu | Nội dung sẵn sàng; đang tải; lỗi tải nội dung. | Không có. | Chung | Chưa cấp | `master` | Chưa có |
| Tất cả | Truy cập tài khoản đã có. | Nhập email, mật khẩu, chọn role demo và đăng nhập; mở liên kết quên mật khẩu hoặc đăng ký. | Đăng nhập | `thanh-vien-2/dung-chung/login.html` | R; ghi phiên đăng nhập | Biểu mẫu; đang xử lý; dữ liệu không hợp lệ; sai email/mật khẩu; thành công; lỗi. | Không có. | Xuân Trường | Chưa cấp | `feature/coach-moderator` | Chưa có |
| Tất cả | Tạo tài khoản mới để dùng SpendWise. | Nhập họ tên, email, mật khẩu, xác nhận mật khẩu, đồng ý điều khoản và tạo tài khoản. | Đăng ký | `thanh-vien-2/dung-chung/register.html` | C | Biểu mẫu; dữ liệu không hợp lệ; mật khẩu không khớp; email trùng; thành công; lỗi. | Không có. | Xuân Trường | Chưa cấp | `feature/coach-moderator` | Chưa có |
| Tất cả | Lấy lại quyền truy cập khi quên mật khẩu. | Nhập email, mật khẩu mới và xác nhận để đặt lại mật khẩu demo. | Quên mật khẩu | `thanh-vien-2/dung-chung/forgot-password.html` | U | Biểu mẫu; không tìm thấy email; mật khẩu không khớp; cập nhật thành công; lỗi. | Không có. | Xuân Trường | Chưa cấp | `feature/coach-moderator` | Chưa có |
| Tất cả | Cập nhật thông tin cá nhân. | Xem và sửa họ tên, email, số điện thoại, nghề nghiệp rồi lưu thay đổi. | Hồ sơ | `thanh-vien-2/dung-chung/profile.html` | R/U | Hồ sơ; đang chỉnh sửa; validation; lưu thành công; lỗi. | Không có. | Xuân Trường | Chưa cấp | `feature/coach-moderator` | Chưa có |
| Tất cả | Tùy chỉnh trải nghiệm sử dụng và quản lý dữ liệu demo. | Chọn tiền tệ, múi giờ, thông báo; lưu cài đặt, đăng xuất hoặc đặt lại toàn bộ dữ liệu demo. | Cài đặt | `thanh-vien-2/dung-chung/settings.html` | R/U; có xác nhận đặt lại dữ liệu | Cài đặt hiện tại; xác nhận đặt lại; lưu thành công; lỗi. | Không có. | Xuân Trường | Chưa cấp | `feature/coach-moderator` | Chưa có |
| Tất cả | Nắm bắt và xử lý các cập nhật của tài khoản. | Xem/lọc thông báo, đánh dấu đã đọc và mở nội dung liên quan. | Thông báo | `thanh-vien-2/dung-chung/notifications.html` | R/U | Có thông báo; danh sách rỗng; chưa đọc; đã đọc; đã cập nhật trạng thái. | Không có. | Xuân Trường | Chưa cấp | `feature/coach-moderator` | Chưa có |
| Tất cả | Hiểu lý do không truy cập được trang và quay lại luồng phù hợp. | Xem trang lỗi 404 hoặc 403 (`?code=403`) và chọn điều hướng trở lại. | Lỗi truy cập (403/404) | `thanh-vien-2/dung-chung/404.html` | Không có thao tác dữ liệu | Lỗi 403; lỗi 404; điều hướng về trang phù hợp. | Không có. | Xuân Trường | Chưa cấp | `feature/coach-moderator` | Chưa có |
| Người dùng | Theo dõi nhanh tình hình thu chi, số dư và tiến độ tài chính. | Xem KPI thu/chi, ngân sách, giao dịch gần đây, cảnh báo, mục tiêu và biểu đồ. | Tổng quan | `thanh-vien-1/nguoi-dung/overview.html` | R | Đang tải; có dữ liệu; chưa có dữ liệu; lỗi tải dữ liệu. | Spending Pattern Insight tóm tắt xu hướng chi tiêu. | Dương Phúc Thọ | Chưa cấp | `feature/user-pages` | Chưa có |
| Người dùng | Ghi nhận và kiểm soát các khoản thu chi. | Tìm kiếm/lọc giao dịch; thêm, xem, sửa, xóa hoặc xuất khoản thu/chi. | Giao dịch | `thanh-vien-1/nguoi-dung/transactions.html` | C/R/U/D | Danh sách có dữ liệu; rỗng; đang tìm/lọc; biểu mẫu thêm/sửa; validation; thành công; lỗi; xác nhận xóa. | Expense Categorizer gợi ý danh mục cho giao dịch. | Dương Phúc Thọ | Chưa cấp | `feature/user-pages` | Chưa có |
| Người dùng | Lập và theo dõi hạn mức chi tiêu theo kỳ/danh mục. | Chọn tháng, tạo ngân sách, chọn danh mục/hạn mức, sửa/xóa ngân sách và xem số đã dùng/còn lại. | Ngân sách | `thanh-vien-1/nguoi-dung/budget.html` | C/R/U/D | Có ngân sách; chưa có dữ liệu; đang chỉnh sửa; sắp đạt/vượt hạn mức; xác nhận xóa; lỗi lưu. | Spending Pattern Insight gợi ý hạn mức. | Dương Phúc Thọ | Chưa cấp | `feature/user-pages` | Chưa có |
| Người dùng | Đạt mục tiêu tài chính trong thời hạn đã chọn. | Tạo mục tiêu với số tiền đích và hạn hoàn thành; cập nhật tiến độ, sửa, xóa hoặc xuất mục tiêu. | Mục tiêu tiết kiệm | `thanh-vien-1/nguoi-dung/goals.html` | C/R/U/D | Có mục tiêu; rỗng; đang sửa; validation; đã hoàn thành; xác nhận xóa; lỗi. | Goal Coach gợi ý kế hoạch tiết kiệm. | Dương Phúc Thọ | Chưa cấp | `feature/user-pages` | Chưa có |
| Người dùng | Hiểu xu hướng chi tiêu của bản thân. | So sánh chi tiêu kỳ này với kỳ trước theo danh mục, xem nhận định và độ chắc chắn. | Phân tích chi tiêu | `thanh-vien-1/nguoi-dung/insights.html` | R | Đang xử lý; có insight; thiếu dữ liệu; không chắc chắn; lỗi. | Spending Pattern Insight. | Dương Phúc Thọ | Chưa cấp | `feature/user-pages` | Chưa có |
| Người dùng | Chọn hành động phù hợp từ các đề xuất của hệ thống. | Xem đề xuất, lý do và độ chắc chắn; chấp nhận, sửa, từ chối hoặc thêm/xóa đề xuất. | Đề xuất thông minh | `thanh-vien-1/nguoi-dung/ai.html` | C/R/U/D | Có đề xuất; rỗng; chờ xem xét; đã chấp nhận; đã từ chối; xác nhận xóa; lỗi. | Expense Categorizer; Spending Pattern Insight; Goal Coach. | Dương Phúc Thọ | Chưa cấp | `feature/user-pages` | Chưa có |
| Huấn luyện viên tài chính giáo dục | Theo dõi tình hình học viên. | Tìm/lọc danh sách học viên, xem email, mục tiêu, ngân sách, trạng thái; sửa thông tin hoặc cập nhật trạng thái. | Danh sách học viên | `thanh-vien-2/huan-luyen-vien/clients.html` | R/U | Danh sách rỗng/có dữ liệu; đang lọc; đang sửa; lưu thành công; lỗi. | Insight do Coach xác nhận trước khi gửi. | Xuân Trường | Chưa cấp | `feature/coach-moderator` | Chưa có |
| Huấn luyện viên tài chính giáo dục | Hỗ trợ học viên cải thiện ngân sách. | Tạo yêu cầu review, nhận xét và đề xuất cho ngân sách của học viên; cập nhật trạng thái và xuất dữ liệu. | Duyệt ngân sách | `thanh-vien-2/huan-luyen-vien/budget.html` | C/R/U/D | Chờ review; đang review; cần bổ sung; đã duyệt; từ chối; rỗng; lỗi. | Insight do Coach xác nhận trước khi gửi. | Xuân Trường | Chưa cấp | `feature/coach-moderator` | Chưa có |
| Huấn luyện viên tài chính giáo dục | Cung cấp tài liệu giáo dục tài chính phù hợp. | Tạo, tìm/lọc, sửa, xóa và xuất tài nguyên; đổi trạng thái; mở trình soạn. | Quản lý tài nguyên | `thanh-vien-2/huan-luyen-vien/resources.html` | C/R/U/D | Thư viện rỗng/có dữ liệu; nháp; chờ duyệt; xuất bản; cần chỉnh sửa; lưu trữ; xác nhận xóa; lỗi. | Gợi ý tiêu đề/tóm tắt; người dùng có thể sửa nội dung. | Xuân Trường | Chưa cấp | `feature/coach-moderator` | Chưa có |
| Huấn luyện viên tài chính giáo dục | Soạn nội dung tài nguyên và gửi duyệt. | Soạn bài mới hoặc sửa bài: tiêu đề, loại, đối tượng, tóm tắt, nội dung; lưu nháp hoặc gửi duyệt. | Soạn nội dung tài nguyên | `thanh-vien-2/huan-luyen-vien/edit-resource.html` | C/R/U/D | Bài mới; đang sửa; validation; nháp; chờ duyệt; lưu thành công; lỗi. | Gợi ý tiêu đề/tóm tắt; người dùng có thể sửa nội dung. | Xuân Trường | Chưa cấp | `feature/coach-moderator` | Chưa có |
| Huấn luyện viên tài chính giáo dục | Theo dõi và phản hồi câu hỏi/ý kiến của học viên. | Xem câu hỏi/phản hồi, tạo phản hồi, trả lời, cập nhật trạng thái hoặc chuyển Moderator/Admin. | Phản hồi học viên | `thanh-vien-2/huan-luyen-vien/feedback.html` | C/R/U/D | Chưa xử lý; đang xử lý; đã trả lời; đã đóng; đã chuyển; rỗng; lỗi. | Không có. | Xuân Trường | Chưa cấp | `feature/coach-moderator` | Chưa có |
| Kiểm duyệt viên | Đảm bảo tài nguyên xuất bản phù hợp tiêu chuẩn nội dung. | Mở hàng chờ, kiểm tra tài nguyên, ghi ghi chú kiểm duyệt; yêu cầu sửa hoặc duyệt/từ chối kèm lý do. | Kiểm duyệt nội dung | `thanh-vien-3/kiem-duyet-vien/resources.html` | R/U | Hàng chờ; chờ duyệt; đang kiểm tra; cần sửa; đã duyệt; từ chối; lỗi. | Gợi ý điểm cần kiểm tra; quyết định cuối cùng do người kiểm duyệt. | Đào Hồng Tiến | Chưa cấp | `feature/admin-integration` | Chưa có |
| Kiểm duyệt viên | Quản lý chất lượng prompt của các tính năng AI. | Tạo/sửa/xóa mẫu AI: tên, mô hình, phiên bản, prompt, phương án dự phòng; bật/tắt và xuất dữ liệu. | Quản lý mẫu AI | `thanh-vien-3/kiem-duyet-vien/ai-templates.html` | C/R/U/D | Nháp; đang thử nghiệm; hoạt động; ngừng dùng; rỗng; xác nhận xóa; lỗi. | Quản lý prompt Expense Categorizer, Spending Pattern Insight, Goal Coach và fallback. | Đào Hồng Tiến | Chưa cấp | `feature/admin-integration` | Chưa có |
| Kiểm duyệt viên | Kiểm tra đầu ra của các tính năng AI. | Ghi nhận phiên AI; xem dữ liệu đầu vào, kết quả, độ chắc chắn; đánh giá đạt, cần xem xét hoặc lỗi kèm ghi chú. | Kiểm tra kết quả AI | `thanh-vien-3/kiem-duyet-vien/ai-review.html` | C/R/U/D | Có phiên AI; rỗng; đạt; cần xem xét; lỗi; đã xử lý; xác nhận xóa. | Kiểm tra AI-1, AI-2, AI-3 và fallback. | Đào Hồng Tiến | Chưa cấp | `feature/admin-integration` | Chưa có |
| Kiểm duyệt viên | Tiếp nhận và xử lý báo cáo về nội dung/người dùng. | Tiếp nhận báo cáo, lọc theo mức độ, gán người xử lý, phản hồi, đóng hoặc chuyển Admin. | Trung tâm báo cáo | `thanh-vien-3/kiem-duyet-vien/feedback.html` | C/R/U/D | Mới; đang xử lý; chờ phản hồi; đã đóng; từ chối; đã chuyển; rỗng; lỗi. | AI phân loại mức độ; người kiểm duyệt xác nhận. | Đào Hồng Tiến | Chưa cấp | `feature/admin-integration` | Chưa có |
| Quản trị viên | Theo dõi chỉ số hoạt động của hệ thống. | Xem KPI hệ thống và hoạt động gần đây; mở nhật ký kiểm toán; xuất dữ liệu. | Tổng quan hệ thống | `thanh-vien-3/quan-tri-vien/dashboard.html` | R | Có dữ liệu; không có dữ liệu; đang lọc; lỗi tải/xuất. | Không có. | Đào Hồng Tiến | Chưa cấp | `feature/admin-integration` | Chưa có |
| Quản trị viên | Truy vết hoạt động trong hệ thống. | Tìm kiếm, lọc theo kết quả và xuất nhật ký kiểm toán. | Nhật ký kiểm toán | `thanh-vien-3/quan-tri-vien/audit.html` | R | Có dữ liệu; rỗng; đang lọc; lỗi tải/xuất. | Không có. | Đào Hồng Tiến | Chưa cấp | `feature/admin-integration` | Chưa có |
| Quản trị viên | Quản lý tài khoản người dùng. | Tìm/lọc, tạo, xem, sửa, khóa/mở khóa hoặc xóa tài khoản; gán vai trò. | Quản lý tài khoản | `thanh-vien-3/quan-tri-vien/users.html` | C/R/U/D | Danh sách có dữ liệu/rỗng; email trùng; hoạt động; khóa; chờ duyệt; xác nhận xóa; lỗi lưu. | Không có. | Đào Hồng Tiến | Chưa cấp | `feature/admin-integration` | Chưa có |
| Quản trị viên | Kiểm soát quyền truy cập theo vai trò. | Thêm, sửa, xóa quy tắc quyền xem/sửa theo role và màn hình/dữ liệu; xuất dữ liệu. | Quản lý phân quyền | `thanh-vien-3/quan-tri-vien/permissions.html` | C/R/U/D | Danh sách có dữ liệu/rỗng; đang sửa; bật/tắt quyền; xác nhận xóa; lỗi lưu. | Không có. | Đào Hồng Tiến | Chưa cấp | `feature/admin-integration` | Chưa có |
| Quản trị viên | Quản lý danh mục thu chi dùng chung. | Thêm, sửa, tắt/bật, xóa danh mục; đặt biểu tượng và thứ tự. | Quản lý danh mục | `thanh-vien-3/quan-tri-vien/categories.html` | C/R/U/D | Danh sách có dữ liệu/rỗng; tên trùng; danh mục đang dùng; xác nhận; lưu thành công; lỗi lưu. | Danh mục là đầu vào của Expense Categorizer. | Đào Hồng Tiến | Chưa cấp | `feature/admin-integration` | Chưa có |
| Quản trị viên | Thiết lập quy tắc hệ thống. | Thêm, sửa, xóa thiết lập theo nhóm: cảnh báo, AI, thông báo, quyền riêng tư; xuất dữ liệu. | Cấu hình hệ thống | `thanh-vien-3/quan-tri-vien/settings.html` | C/R/U/D | Có thiết lập; rỗng; đang sửa; lưu thành công; xác nhận xóa; lỗi. | Cấu hình tùy chọn AI; không có tác vụ AI tự động bắt buộc. | Đào Hồng Tiến | Chưa cấp | `feature/admin-integration` | Chưa có |

## 3. Ma trận bao phủ role

| Role | Màn hình nền tảng cần hoàn thành | Luồng nghiệp vụ cốt lõi |
|---|---|---|
| Tất cả | Landing, Đăng nhập, Đăng ký, Quên mật khẩu, Hồ sơ, Cài đặt, Thông báo, Lỗi truy cập | Mở trang chủ → đăng ký/đăng nhập → vào khu vực theo role → cập nhật hồ sơ/cài đặt → đăng xuất. |
| Người dùng | Tổng quan, Giao dịch, Ngân sách, Mục tiêu, Phân tích chi tiêu, Đề xuất thông minh | Ghi nhận giao dịch → phân loại → lập ngân sách → theo dõi → đọc insight và xử lý đề xuất. |
| Huấn luyện viên tài chính giáo dục | Danh sách học viên, Duyệt ngân sách, Quản lý tài nguyên, Soạn nội dung tài nguyên, Phản hồi học viên | Chọn học viên → review ngân sách → phản hồi/đề xuất → soạn và gửi tài nguyên duyệt. |
| Kiểm duyệt viên | Kiểm duyệt nội dung, Quản lý mẫu AI, Kiểm tra kết quả AI, Trung tâm báo cáo | Nhận hàng chờ → kiểm tra nội dung/AI → duyệt, yêu cầu sửa hoặc đóng báo cáo. |
| Quản trị viên | Tổng quan hệ thống, Nhật ký kiểm toán, Quản lý tài khoản, Quản lý phân quyền, Quản lý danh mục, Cấu hình hệ thống | Theo dõi hệ thống → quản lý tài khoản/quyền → quản lý danh mục/cấu hình → kiểm toán.

## 4. Ba trải nghiệm AI bắt buộc

| Mã | Tính năng | Luồng tối thiểu | Trạng thái thất bại bắt buộc |
|---|---|---|---|
| AI-1 | Expense Categorizer | Nhập giao dịch → đang xử lý → gợi ý danh mục → giải thích → chấp nhận/sửa/từ chối/tạo lại/lưu. | Không đủ dữ liệu hoặc AI không chắc chắn. |
| AI-2 | Spending Pattern Insight | Chọn kỳ dữ liệu → đang xử lý → insight → lý do/độ chắc chắn → chấp nhận/sửa/từ chối/lưu. | Không đủ dữ liệu để đưa ra đề xuất. |
| AI-3 | Goal Coach | Nhập mục tiêu → đang xử lý → kế hoạch tiết kiệm → giải thích → sửa/chấp nhận/từ chối/lưu. | Không thể xử lý yêu cầu lúc này, có thao tác dùng thủ công. |

## 5. Checklist hoàn thành mỗi màn hình

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

## 6. Quy ước CRUD

- `C` = Create / Tạo
- `R` = Read / Đọc
- `U` = Update / Sửa
- `D` = Delete / Xóa
- Có thể thay xóa bằng **Hủy**, **Lưu trữ**, **Vô hiệu hóa** hoặc **Đóng** khi phù hợp nghiệp vụ.

## 7. Phân chia branch cho nhóm

Các màn hình workspace dùng `workspace-loader.js` để chọn chế độ qua query `view`, sau đó dùng `workspace-engine.js` chung. Cấu hình các màn hình được lưu dưới dạng JSON trong HTML, ngoại trừ trang Mục tiêu và Đề xuất AI có cấu hình riêng trong `goals.js` và `ai.js`; các module JavaScript riêng lặp lại engine đã được gỡ. Các trang thành viên 1 dùng chung tên class cho thành phần bố cục, điều hướng, hồ sơ, hành động và thống kê; biến màu CSS và alias dữ liệu dùng chung cũng theo một quy ước nhất quán. Các trang tài khoản vẫn giữ các script riêng, còn ba trang tài chính dùng JavaScript riêng và danh mục mặc định đặt trong HTML. `workspace-tabs.js` cập nhật tab, sidebar và các liên kết cũ.

Các màn hình tài chính, tài khoản và quản trị lưu dữ liệu trên thiết bị. Giao dịch, ngân sách và danh sách tài khoản không còn được tạo bằng dữ liệu mẫu khi mở lần đầu; danh mục mặc định là lựa chọn tĩnh trong HTML. Đăng ký tạo tài khoản trên thiết bị, còn trang quản trị đọc và sửa danh sách tài khoản cục bộ. Dữ liệu đã có trong `localStorage` được giữ lại để tránh mất thông tin.

Các branch thành viên chỉ chứa folder được giao; branch `master` là nơi tích hợp toàn bộ ứng dụng và folder báo cáo. Do các trang liên kết giữa nhiều folder, hãy chạy ứng dụng đầy đủ từ `master`.

| Branch | Phạm vi phụ trách | Tệp chính |
|---|---|---|
| `feature/user-pages` | Thành viên 1: Người dùng | `thanh-vien-1/nguoi-dung/` |
| `feature/coach-moderator` | Thành viên 2: Tài khoản dùng chung và Huấn luyện viên | `thanh-vien-2/dung-chung/`, `thanh-vien-2/huan-luyen-vien/` |
| `feature/admin-integration` | Thành viên 3: Kiểm duyệt viên và Quản trị viên | `thanh-vien-3/kiem-duyet-vien/`, `thanh-vien-3/quan-tri-vien/` |
| `master` | Ứng dụng tích hợp và báo cáo chung của nhóm | `báo cáo/` cùng toàn bộ mã nguồn |

Mỗi thành viên chỉ cập nhật folder thuộc phạm vi của mình trên branch được giao. Khi tích hợp, giữ nguyên các tên thư mục để liên kết giữa các nhóm vẫn hoạt động. Các thay đổi điều hướng hoặc cấu trúc dữ liệu `localStorage` cần được báo cho các thành viên còn lại.
