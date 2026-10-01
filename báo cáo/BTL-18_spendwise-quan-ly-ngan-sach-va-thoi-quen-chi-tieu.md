# BTL-18 – SpendWise – Quản lý ngân sách và thói quen chi tiêu

> **Học phần:** PHÁT TRIỂN ỨNG DỤNG WEB CƠ BẢN – CSE122  
> **Nhóm thực hiện:** 3 sinh viên  
> **Loại sản phẩm:** Sản phẩm Web Frontend (nguyên mẫu) có nhiều vai trò, CRUD, responsive, tương tác JavaScript và trải nghiệm AI  
> **Nguyên tắc minh chứng:** Mỗi giao diện thực tế đã được duyệt trong bảng kiểm kê màn hình = 1 video OBS có mặt sinh viên + commit/PR GitHub tương ứng.

---

## 1. Lĩnh vực

**Tài chính cá nhân / Financial Literacy**

## 2. Tóm tắt sản phẩm

**SpendWise – Quản lý ngân sách và thói quen chi tiêu** là một sản phẩm Frontend giải quyết bài toán thực tế trong lĩnh vực **Tài chính cá nhân / Financial Literacy**, được thiết kế như một mini-product có nhiều role, nhiều luồng nghiệp vụ và các tính năng AI có thể mô phỏng ngay ở phía Frontend.

## 3. Ngữ cảnh

Người mới quản lý tài chính biết số tiền đã tiêu nhưng khó hiểu pattern và chuyển insight thành hành động. Bài tập không cung cấp tư vấn đầu tư.

## 4. Phát biểu vấn đề

- **P1.** Giao dịch khó phân loại nhất quán.
- **P2.** Mục tiêu tiết kiệm thiếu kế hoạch.
- **P3.** Dashboard nhiều số nhưng ít giải thích.
- **P4.** Khoản chi bất thường khó nhận ra.

## 5. Mục tiêu

- **O1.** Biến bài toán thực tế thành một sản phẩm Frontend có hành trình người dùng rõ ràng.
- **O2.** Thiết kế đầy đủ giao diện cho từng vai trò, bảo đảm mỗi vai trò có ít nhất 3 màn hình.
- **O3.** Thể hiện các thao tác CRUD hoặc trạng thái nghiệp vụ phù hợp thay vì CRUD hình thức.
- **O4.** Sử dụng JavaScript/DOM cho tìm kiếm, lọc, kiểm tra hợp lệ, cửa sổ bật, thẻ, trạng thái và kết xuất dữ liệu.
- **O5.** Sử dụng JSON giả lập / LocalStorage / MockAPI / API công khai khi phù hợp.
- **O6.** Thiết kế ít nhất 3 trải nghiệm AI có thể mô phỏng được ở Frontend.
- **O7.** Tổ chức làm việc nhóm bằng Trello/Jira/Notion và Git/GitHub theo nhánh + yêu cầu hợp nhất.

## 6. Các vai trò

| Vai trò | Trách nhiệm chính |
|---|---|
| Người dùng | Quản lý giao dịch và mục tiêu |
| Huấn luyện viên tài chính giáo dục | Review và tạo tài nguyên |
| Kiểm duyệt viên | Kiểm nội dung và mẫu ai |
| Quản trị viên | Quản lý danh mục và tài khoản |

## 7. Hành trình người dùng tổng quát

```text
Khám phá / đăng nhập
↓
Thực hiện nghiệp vụ chính theo vai trò
↓
Xem trạng thái / dữ liệu / phản hồi
↓
AI hỗ trợ phân tích hoặc gợi ý
↓
Người dùng Chấp nhận / Sửa / Từ chối / Lưu
↓
Vai trò vận hành duyệt / xử lý
↓
Bảng điều khiển / báo cáo / hoàn tất
```


## NGUYÊN TẮC PHẠM VI – BẮT BUỘC ÁP DỤNG

> **Con số “tối thiểu 3 giao diện cho mỗi vai trò” chỉ là NGƯỠNG TỐI THIỂU để ngăn nhóm cố tình làm ít. Đây KHÔNG phải mục tiêu số lượng.**

Sinh viên phải phân tích đầy đủ:

```text
Ngữ cảnh
→ Vấn đề
→ Vai trò
→ Mục tiêu người dùng
→ Nhiệm vụ người dùng
→ Luồng người dùng
→ Bảng kiểm kê màn hình
→ Bao phủ trạng thái
→ Triển khai
```

Và xây dựng **toàn bộ các màn hình cần thiết** để các luồng nghiệp vụ chính có thể được mô phỏng đầy đủ từ đầu đến cuối.

Một vai trò có thể cần 3, 5, 7 hoặc nhiều hơn màn hình tùy bản chất nghiệp vụ. Không được cắt bỏ màn hình cần thiết chỉ vì đã đạt số lượng tối thiểu; đồng thời không được tách một chức năng đơn giản thành nhiều trang vô nghĩa chỉ để tăng số lượng.

**Tiêu chí đánh giá: ĐỘ ĐẦY ĐỦ CỦA NGHIỆP VỤ > SỐ LƯỢNG GIAO DIỆN.**

### Bảng kiểm kê màn hình bắt buộc trước khi viết mã

Nhóm phải lập và được duyệt bảng:

| Vai trò | Mục tiêu người dùng | Nhiệm vụ người dùng | Màn hình | Tệp | CRUD/Trạng thái | AI | Người phụ trách |
|---|---|---|---|---|---|---|---|

Giảng viên duyệt **bảng kiểm kê màn hình + luồng người dùng + Figma/Canva** trước khi nhóm triển khai code chính thức.

### Bao phủ trạng thái bắt buộc

Mỗi chức năng quan trọng phải xem xét các trạng thái phù hợp:

- Bình thường
- Đang tải
- Rỗng
- Thành công
- Lỗi
- Vô hiệu hóa
- Đang chờ
- Bị từ chối
- Hoàn thành
- Đã hủy/Đã lưu trữ khi có nghiệp vụ tương ứng

Không phải trang nào cũng cần đủ mọi trạng thái, nhưng sinh viên phải chứng minh đã phân tích trạng thái phù hợp.

### Màn hình dùng chung

Ngoài màn hình theo role, nhóm phải phân tích các màn hình dùng chung khi cần, ví dụ:

- `index.html`
- `login.html`
- `register.html`
- `forgot-password.html`
- `profile.html`
- `settings.html`
- `notifications.html`
- `403.html`
- `404.html`

Các màn hình này **không bắt buộc một cách máy móc**, nhưng phải được xem xét trong bảng kiểm kê màn hình.

### Định nghĩa hoàn thành cho mỗi màn hình

Một màn hình chỉ được tính là **DONE** khi các mục phù hợp đã hoàn thành:

- [ ] Bản mô phỏng Figma/Canva
- [ ] HTML ngữ nghĩa
- [ ] CSS hoàn chỉnh
- [ ] Responsive
- [ ] Tương tác JavaScript
- [ ] Kiểm tra hợp lệ nếu có biểu mẫu
- [ ] Dữ liệu giả lập/API nếu cần
- [ ] Trạng thái rỗng
- [ ] Trạng thái đang tải/lỗi khi phù hợp
- [ ] Khả năng tiếp cận cơ bản
- [ ] Yêu cầu hợp nhất đã được duyệt
- [ ] Hợp nhất vào `dev`
- [ ] Video OBS
- [ ] README/bảng kiểm kê màn hình đã cập nhật

### Lát cắt dọc bắt buộc cho từng sinh viên

Mỗi sinh viên phải tự hoàn thành ít nhất một luồng end-to-end:

```text
Bản mô phỏng
→ HTML
→ CSS
→ JavaScript
→ Dữ liệu
→ Responsive
→ Nhánh Git
→ Ghi nhận thay đổi
→ yêu cầu hợp nhất
→ OBS
```

Không chấp nhận cách phân công mà một sinh viên chỉ làm tài liệu/Figma, một người chỉ HTML, một người chỉ JavaScript.

### Trải nghiệm khi AI thất bại

Mỗi AI feature quan trọng phải có ít nhất một trạng thái thất bại hoặc không chắc chắn, ví dụ:

- “Không đủ dữ liệu để đưa ra đề xuất.”
- “AI chưa chắc chắn về kết quả này.”
- “Không thể xử lý yêu cầu lúc này.”

Và cung cấp thao tác thích hợp:

- Chỉnh sửa
- Thử lại
- Bỏ qua
- Báo cáo
- Dùng thủ công

### Bảo vệ / Chỉnh sửa ngẫu nhiên

Khi bảo vệ, giảng viên có thể yêu cầu ngẫu nhiên một thay đổi nhỏ trong 5–10 phút, ví dụ:

- thêm filter;
- đổi table thành card;
- thêm field + validation;
- xử lý API trả về rỗng;
- thay đổi layout responsive;
- thêm trạng thái mới.

Mục tiêu là kiểm tra sinh viên **có thực sự hiểu và điều khiển được sản phẩm** hay không.

---

## 8. Bảng kiểm kê màn hình đầy đủ theo từng role

Bảng dưới đây là danh sách cần triển khai để các luồng nghiệp vụ chính hoạt động từ đầu đến cuối. Các file trong danh sách giao diện nền tảng bắt buộc được giữ nguyên; các màn hình bổ sung giúp bao phủ xác thực, hồ sơ, thông báo, chi tiết dữ liệu, phê duyệt và các trạng thái lỗi.

### 8.1. Màn hình dùng chung

| # | Role | Màn hình / file HTML | Chức năng cần có | CRUD / trạng thái | Vai trò của giao diện |
|---:|---|---|---|---|---|
| 1 | Tất cả role | `index.html` – Landing / giới thiệu | Giới thiệu SpendWise, lợi ích, nút đăng nhập/đăng ký, điều hướng đến tài nguyên công khai. | R; loading, lỗi tải nội dung | Điểm vào sản phẩm và định hướng người dùng chưa đăng nhập. |
| 2 | Tất cả role | `login.html` – Đăng nhập | Đăng nhập, ghi nhớ phiên, chọn role nếu tài khoản có nhiều quyền, hiển thị lỗi tài khoản/mật khẩu. | C/R; thành công, sai thông tin, bị khóa, đang xử lý | Cổng xác thực trước khi vào khu vực theo role. |
| 3 | Tất cả role | `register.html` – Đăng ký | Tạo tài khoản, xác nhận mật khẩu, đồng ý điều khoản, kiểm tra email trùng. | C; rỗng, sai định dạng, email đã tồn tại, thành công | Tạo tài khoản User hoặc yêu cầu cấp quyền phù hợp. |
| 4 | Tất cả role | `forgot-password.html` – Quên mật khẩu | Nhập email, gửi mã/đường dẫn khôi phục, đặt mật khẩu mới. | U; mã sai, hết hạn, thành công, lỗi gửi | Khôi phục quyền truy cập khi người dùng quên mật khẩu. |
| 5 | Tất cả role | `profile.html` – Hồ sơ cá nhân | Xem/sửa thông tin cá nhân, ảnh đại diện, role hiện tại và dữ liệu liên hệ. | R/U; đang lưu, lỗi validation, thành công | Quản lý danh tính dùng chung cho mọi role. |
| 6 | Tất cả role | `settings.html` – Cài đặt | Đổi mật khẩu, tùy chọn thông báo, tiền tệ, múi giờ, xóa/đăng xuất khỏi phiên. | R/U; vô hiệu hóa, xác nhận, thành công | Điều chỉnh trải nghiệm và bảo mật tài khoản. |
| 7 | Tất cả role | `notifications.html` – Thông báo | Xem, lọc, đánh dấu đã đọc và mở thông báo về ngân sách, duyệt nội dung, phản hồi hoặc hệ thống. | R/U; rỗng, chưa đọc, đã đọc | Tập trung mọi phản hồi và sự kiện cần người dùng xử lý. |
| 8 | Tất cả role | `403.html` / `404.html` – Lỗi truy cập | Hiển thị không có quyền hoặc không tìm thấy trang; nút quay lại/dashboard. | Trạng thái bị từ chối, không tồn tại | Bảo vệ luồng khi truy cập sai role hoặc sai đường dẫn. |

### 8.2. Role Người dùng

| # | Mục tiêu | Màn hình / file HTML | Chức năng cần có | CRUD / trạng thái | AI | Vai trò của giao diện |
|---:|---|---|---|---|---|---|
| 9 | Theo dõi tổng quan | `user-finance-dashboard.html` | Tổng thu/chi, số dư, ngân sách còn lại, giao dịch gần đây, cảnh báo vượt ngân sách, mục tiêu và biểu đồ theo kỳ. | R; loading, rỗng, lỗi tải dữ liệu | Hiển thị Spending Pattern Insight dạng tóm tắt | Màn hình điều hành chính để User biết tình hình tài chính và chọn hành động tiếp theo. |
| 10 | Quản lý giao dịch | `user-transaction-management.html` | Danh sách, tìm kiếm/lọc theo ngày, loại, danh mục; thêm khoản thu/chi; xem chi tiết; sửa; lưu trữ/xóa; import dữ liệu nếu cần. | C/R/U/D; form rỗng, validation, thành công, lỗi, rỗng | Expense Categorizer: gợi ý danh mục và lý do | Nơi ghi nhận dữ liệu tài chính gốc, làm nguồn cho ngân sách và insight. |
| 11 | Lập kế hoạch ngân sách | `user-budget-management.html` | Tạo ngân sách theo tháng/danh mục, phân bổ hạn mức, sửa hạn mức, theo dõi đã dùng/còn lại, cảnh báo ngưỡng. | C/R/U; chưa có dữ liệu, vượt hạn mức, đã khóa kỳ | Spending Pattern Insight gợi ý hạn mức tham khảo | Biến dữ liệu giao dịch thành kế hoạch chi tiêu có thể kiểm soát. |
| 12 | Quản lý mục tiêu | `user-saving-goals.html` | Tạo mục tiêu, số tiền đích, hạn hoàn thành; cập nhật tiến độ; chỉnh sửa; tạm dừng/hoàn thành/lưu trữ. | C/R/U/D; chưa bắt đầu, đang tiến hành, hoàn thành, quá hạn | Goal Coach tạo các bước tiết kiệm | Giúp User chuyển mong muốn tiết kiệm thành kế hoạch và tiến độ đo được. |
| 13 | Hiểu thói quen chi tiêu | `user-spending-insights.html` | Biểu đồ theo danh mục/thời gian, so sánh kỳ, phát hiện khoản bất thường, lọc dữ liệu và xem giải thích. | R; loading, không đủ dữ liệu, lỗi, thành công | Spending Pattern Insight với giải thích và độ chắc chắn | Chuyển dữ liệu thô thành nhận xét có thể dùng để ra quyết định. |
| 14 | Nhận và xử lý đề xuất AI | `user-ai-recommendations.html` | Xem đề xuất, lý do, dữ liệu đầu vào; chấp nhận, sửa, từ chối, tạo lại hoặc lưu đề xuất. | C/R/U; đang xử lý, không chắc chắn, thất bại, đã lưu | Bao phủ Expense Categorizer, Pattern Insight, Goal Coach | Bảo đảm AI có người kiểm soát và kết quả được đưa vào nghiệp vụ thật. |

### 8.3. Role Huấn luyện viên tài chính giáo dục

| # | Mục tiêu | Màn hình / file HTML | Chức năng cần có | CRUD / trạng thái | AI | Vai trò của giao diện |
|---:|---|---|---|---|---|---|
| 15 | Theo dõi người được hướng dẫn | `coach-client-list.html` | Danh sách User, tìm kiếm/lọc, xem trạng thái hoạt động, mục tiêu, cảnh báo ngân sách và lịch sử tương tác. | R; loading, rỗng, lỗi, bị hạn chế quyền | Tóm tắt pattern theo từng User nếu được cấp quyền | Điểm bắt đầu để Coach chọn đúng User cần review. |
| 16 | Đánh giá ngân sách | `coach-budget-review.html` | Xem ngân sách và giao dịch được chia sẻ, ghi nhận xét, đề xuất điều chỉnh, gửi yêu cầu bổ sung dữ liệu, đánh dấu đã review. | R/C/U; chờ review, cần bổ sung, đã duyệt, từ chối | Gợi ý insight, Coach phải xác nhận trước khi gửi | Biến dữ liệu User thành phản hồi giáo dục có trách nhiệm. |
| 17 | Quản lý tài nguyên | `coach-resource-management.html` | Tạo, xem, sửa, phân loại, xuất bản, lưu trữ tài liệu/bài học về ngân sách và thói quen chi tiêu. | C/R/U/D; bản nháp, chờ duyệt, đã xuất bản, lưu trữ | Gợi ý tiêu đề, tóm tắt hoặc tag, không tự xuất bản | Kho nội dung chuyên môn do Coach xây dựng cho User. |
| 18 | Soạn tài nguyên | `coach-resource-editor.html` | Nhập nội dung, mục tiêu học tập, ví dụ, bài tập, đối tượng áp dụng; xem trước responsive và gửi duyệt. | C/U; validation, bản nháp, gửi duyệt, lỗi lưu | Có thể gọi AI hỗ trợ soạn nháp và phải cho phép sửa | Nơi hoàn thiện nội dung trước khi đưa vào quy trình kiểm duyệt. |
| 19 | Theo dõi phản hồi | `coach-feedback.html` | Xem câu hỏi/phản hồi của User, trả lời, gắn trạng thái, chuyển vấn đề cho Moderator/Admin. | R/C/U; chưa xử lý, đang xử lý, đã trả lời, đã đóng | Không bắt buộc | Đóng vòng lặp hỗ trợ giữa tài nguyên và nhu cầu thực tế của User. |

### 8.4. Role Kiểm duyệt viên

| # | Mục tiêu | Màn hình / file HTML | Chức năng cần có | CRUD / trạng thái | AI | Vai trò của giao diện |
|---:|---|---|---|---|---|---|
| 20 | Kiểm duyệt nội dung | `moderator-resource-review.html` | Xem hàng chờ, mở nội dung, kiểm tra tính chính xác/ngôn ngữ, yêu cầu sửa, duyệt hoặc từ chối kèm lý do. | R/U; chờ duyệt, cần sửa, đã duyệt, từ chối, lỗi | Gợi ý điểm cần kiểm tra, không thay quyết định | Cổng kiểm soát chất lượng trước khi tài nguyên hiển thị cho User. |
| 21 | Quản lý mẫu AI | `moderator-ai-template-management.html` | Tạo, xem, sửa, thử nghiệm, bật/tắt và lưu trữ prompt/mẫu phản hồi AI; quản lý phiên bản. | C/R/U/D; bản nháp, thử nghiệm, hoạt động, vô hiệu hóa | Kiểm tra đầu ra mẫu, độ chắc chắn và fallback | Kiểm soát nội dung AI để phản hồi nhất quán, an toàn và có thể kiểm tra. |
| 22 | Xử lý phản hồi/báo cáo | `moderator-feedback-center.html` | Tiếp nhận báo cáo nội dung hoặc AI, lọc mức độ, gán người xử lý, phản hồi, đóng hoặc chuyển Admin. | C/R/U/D; mới, đang xử lý, chờ phản hồi, đã đóng, từ chối | Phân loại mức độ ưu tiên có người xác nhận | Nơi xử lý các vấn đề phát sinh từ User và nội dung đã xuất bản. |
| 23 | Kiểm tra chi tiết AI | `moderator-ai-review.html` | So sánh input/output, xem giải thích, log phiên bản, đánh dấu lỗi hoặc kết quả không chắc chắn, tạo yêu cầu sửa mẫu. | R/U; đạt, cần xem xét, lỗi, đã xử lý | Bắt buộc với AI-1, AI-2, AI-3 | Bảo đảm kết quả AI có thể truy vết và có phương án xử lý khi thất bại. |

### 8.5. Role Quản trị viên

| # | Mục tiêu | Màn hình / file HTML | Chức năng cần có | CRUD / trạng thái | Vai trò của giao diện |
|---:|---|---|---|---|---|
| 24 | Theo dõi toàn hệ thống | `admin-system-dashboard.html` | KPI tài khoản, giao dịch, ngân sách, mục tiêu, nội dung chờ duyệt, lỗi hệ thống và biểu đồ hoạt động. | R; loading, rỗng, lỗi, cảnh báo | Màn hình điều hành tổng thể để phát hiện vấn đề và điều phối xử lý. |
| 25 | Quản lý danh mục | `admin-expense-category-management.html` | Tạo, xem, sửa, sắp xếp, bật/tắt và lưu trữ danh mục thu/chi; kiểm tra giao dịch đang dùng danh mục. | C/R/U/D; trùng tên, đang được sử dụng, hoạt động, vô hiệu hóa | Quản lý nền dữ liệu cho Expense Categorizer | Bảo đảm hệ thống có taxonomy thống nhất để phân loại và báo cáo. |
| 26 | Quản lý tài khoản | `admin-user-management.html` | Tìm kiếm, xem chi tiết, tạo/sửa tài khoản, gán role, khóa/mở khóa, đặt lại mật khẩu, xem lịch sử hoạt động. | C/R/U/D; hoạt động, bị khóa, chờ xác minh, vô hiệu hóa | Không bắt buộc | Kiểm soát vòng đời tài khoản và quyền truy cập. |
| 27 | Quản lý phân quyền | `admin-role-permission-management.html` | Xem role, gán quyền, giới hạn truy cập entity/màn hình, kiểm tra xung đột quyền và lưu thay đổi. | C/R/U/D; chờ duyệt, hoạt động, bị từ chối | Không bắt buộc | Đảm bảo mỗi role chỉ truy cập đúng chức năng được giao. |
| 28 | Nhật ký và kiểm toán | `admin-audit-log.html` | Tìm kiếm log đăng nhập, thay đổi dữ liệu, duyệt nội dung, khóa tài khoản; lọc theo User, role, thời gian và hành động. | R; không có dữ liệu, lỗi, đã lưu trữ | Không bắt buộc | Truy vết sự kiện quan trọng và hỗ trợ xử lý tranh chấp/sự cố. |
| 29 | Cấu hình hệ thống | `admin-system-settings.html` | Cấu hình ngưỡng cảnh báo, trạng thái AI, thông báo, danh mục mặc định, sao lưu/xuất dữ liệu mô phỏng. | R/U; đang lưu, thành công, lỗi, xác nhận nguy hiểm | Bật/tắt từng AI feature và fallback | Quản lý các tham số vận hành mà không sửa trực tiếp mã nguồn. |

### 8.6. Ma trận bao phủ role và file bắt buộc

| Role | File nền tảng bắt buộc | Chức năng cốt lõi phải hoàn thành |
|---|---|---|
| Người dùng | `user-finance-dashboard.html`, `user-transaction-management.html`, `user-saving-goals.html` | Dashboard tài chính, giao dịch, ngân sách, mục tiêu, insight chi tiêu, AI gợi ý và hồ sơ cá nhân. |
| Huấn luyện viên tài chính giáo dục | `coach-client-list.html`, `coach-budget-review.html`, `coach-resource-management.html` | Quản lý User được phân công, review ngân sách, tạo/sửa/gửi duyệt tài nguyên và phản hồi. |
| Kiểm duyệt viên | `moderator-resource-review.html`, `moderator-ai-template-management.html`, `moderator-feedback-center.html` | Duyệt nội dung, quản lý mẫu AI, xử lý báo cáo và kiểm tra kết quả AI. |
| Quản trị viên | `admin-expense-category-management.html`, `admin-user-management.html`, `admin-system-dashboard.html` | Dashboard hệ thống, danh mục, tài khoản, phân quyền, nhật ký và cấu hình. |

> **Quy tắc phạm vi:** Một dòng trong bảng là một màn hình nghiệp vụ độc lập hoặc một trang có luồng tương tác hoàn chỉnh. Modal thêm/sửa, trạng thái loading/rỗng/lỗi và hộp xác nhận được tính là trạng thái của màn hình đó, không tách thành màn hình mới nếu không có URL và luồng độc lập.

## 9. Chuẩn chi tiết cho TỪNG giao diện thực tế đã được duyệt

Mỗi giao diện ở mục 8 phải được nhóm triển khai đầy đủ theo danh sách kiểm tra sau:

- **Tệp HTML:** đúng tên tệp quy định.
- **Đầu trang / Điều hướng:** nhất quán trong toàn bộ vai trò.
- **Nội dung chính:** card, list, table, form hoặc dashboard phù hợp.
- **Trạng thái giao diện:** đang tải, rỗng, thành công, lỗi khi hợp lý.
- **Responsive:** desktop + tablet/mobile.
- **JavaScript:** tối thiểu một tương tác có ý nghĩa.
- **Kiểm tra hợp lệ:** với mọi biểu mẫu.
- **Dữ liệu giả lập:** không viết cứng rải rác; ưu tiên JSON/mô-đun dữ liệu.
- **Giao diện AI:** nếu trang có AI phải có Nhập → Đang xử lý → Kết quả → Giải thích → Người dùng kiểm soát.

### Quy tắc CRUD

- `C` = Tạo
- `R` = Đọc
- `U` = Sửa
- `D` = Xóa
- Với dữ liệu nghiệp vụ, có thể thay Xóa bằng **Hủy / Lưu trữ / Vô hiệu hóa / Đóng** khi hợp lý.

---

## 10. Ma trận thực thể & CRUD gợi ý

| Thực thể | Tạo | Đọc | Sửa | Xóa/Lưu trữ | Ghi chú |
|---|---:|---:|---:|---:|---|
| `transactions` | ✓ | ✓ | ✓ | ✓/Archive | Dùng mock data hoặc API giả lập. |
| `categories` | ✓ | ✓ | ✓ | ✓/Archive | Dùng mock data hoặc API giả lập. |
| `budgets` | ✓ | ✓ | ✓ | ✓/Archive | Dùng mock data hoặc API giả lập. |
| `goals` | ✓ | ✓ | ✓ | ✓/Archive | Dùng mock data hoặc API giả lập. |
| `coachNotes` | ✓ | ✓ | ✓ | ✓/Archive | Dùng mock data hoặc API giả lập. |
| `resources` | ✓ | ✓ | ✓ | ✓/Archive | Dùng mock data hoặc API giả lập. |

## 11. Tính năng AI bắt buộc

### AI-1

- Expense Categorizer: gợi ý danh mục giao dịch.
- **Trải nghiệm bắt buộc:** nhập dữ liệu → trạng thái đang xử lý → kết quả → lý do/giải thích → Chấp nhận/Sửa/Từ chối/Tạo lại/Lưu.
- **Cách mô phỏng:** JSON giả lập, JavaScript theo quy tắc, phản hồi định sẵn hoặc API LLM nếu nhóm đủ khả năng.

### AI-2

- Spending Pattern Insight: mô tả pattern chi tiêu.
- **Trải nghiệm bắt buộc:** nhập dữ liệu → trạng thái đang xử lý → kết quả → lý do/giải thích → Chấp nhận/Sửa/Từ chối/Tạo lại/Lưu.
- **Cách mô phỏng:** JSON giả lập, JavaScript theo quy tắc, phản hồi định sẵn hoặc API LLM nếu nhóm đủ khả năng.

### AI-3

- Goal Coach: tạo các bước tiết kiệm mang tính giáo dục.
- **Trải nghiệm bắt buộc:** nhập dữ liệu → trạng thái đang xử lý → kết quả → lý do/giải thích → Chấp nhận/Sửa/Từ chối/Tạo lại/Lưu.
- **Cách mô phỏng:** JSON giả lập, JavaScript theo quy tắc, phản hồi định sẵn hoặc API LLM nếu nhóm đủ khả năng.

## 12. Nguyên tắc trải nghiệm AI

```text
NGƯỜI DÙNG NHẬP
↓
KIỂM TRA HỢP LỆ
↓
AI ĐANG XỬ LÝ (đang tải / khung xương / tiến độ)
↓
KẾT QUẢ AI
↓
VÌ SAO CÓ KẾT QUẢ NÀY?
↓
CHẤP NHẬN / SỬA / TỪ CHỐI / TẠO LẠI
↓
LƯU VÀO TRẠNG THÁI ỨNG DỤNG
```

AI không được chỉ là một ô chat trang trí. Kết quả AI phải tác động vào luồng nghiệp vụ hoặc giúp người dùng đưa ra quyết định tốt hơn.

---

## 13. Dữ liệu giả lập / API

Các entity tối thiểu:

```text
transactions
categories
budgets
goals
coachNotes
resources
```

Có thể triển khai bằng:

- file JSON cục bộ;
- LocalStorage / SessionStorage;
- JSON Server;
- MockAPI;
- public API;
- LLM API tùy chọn.

Không bắt buộc máy chủ thật.

---

## 14. Phân công nhóm 3 sinh viên

### SV1
- Phụ trách chính: **Người dùng**.
- Đồng phụ trách một phần giao diện dùng chung.
- Chịu trách nhiệm responsive và kiểm tra giao diện của phần mình.

### SV2
- Phụ trách chính: **Huấn luyện viên tài chính giáo dục**.
- Đồng phụ trách tương tác JavaScript / dữ liệu giả lập.
- Đánh giá yêu cầu hợp nhất của SV1 hoặc SV3.

### SV3
- Phụ trách chính: **Kiểm duyệt viên + Quản trị viên**.
- Chịu trách nhiệm tích hợp bố cục, điều hướng, bảng điều khiển/quản trị và phát hành.
- Đánh giá tính nhất quán toàn dự án.

> Nhóm có thể chia lại nhưng phải bảo đảm mỗi thành viên đều có HTML + CSS + JavaScript + Git + OBS và khối lượng công việc tương đối cân bằng.


### Trách nhiệm chéo bắt buộc

Ngoài phần việc theo vai trò, mỗi sinh viên phải có ít nhất một trách nhiệm xuyên suốt:

- Hệ thống thiết kế / Điều hướng / Khả năng tiếp cận;
- JavaScript / Dữ liệu / Tương tác AI;
- Responsive / Tích hợp / Phát hành / Đảm bảo chất lượng.

Mục tiêu là tránh việc tạo ra ba “website con” rời rạc và buộc nhóm cộng tác thực sự.


---

## 15. Kho mã nguồn GitHub

Tên repo gợi ý:

```text
cse122-spendwise-teamXX
```

### Chiến lược nhánh

```text
main
dev
feature/<feature-name>
fix/<bug-name>
docs/<document-name>
```

Ví dụ:

```text
feature/user-finance-dashboard
feature/coach-client-list
feature/moderator-resource-review
```

### Quy trình bắt buộc

```text
Công việc trên Trello
↓
Tạo nhánh
↓
Viết mã
↓
Ghi nhận thay đổi
↓
Đẩy lên máy chủ
↓
Yêu cầu hợp nhất
↓
Đánh giá chéo
↓
Merge vào dev
↓
Test tích hợp
↓
Merge main
```

### Mẫu ghi nhận thay đổi (commit)

```text
feat: add responsive dashboard layout
feat: render data from mock json
feat: add ai recommendation state
fix: validate empty form inputs
style: improve mobile navigation
refactor: split reusable ui modules
docs: update screen list and obs links
```

Không chấp nhận commit kiểu `update`, `done`, `final`, `fix code`.

Không đánh giá cao việc **spam commit**. Lịch sử phát triển phải thể hiện được quan hệ:

```text
Công việc ↔ Nhánh ↔ Ghi nhận thay đổi ↔ Yêu cầu hợp nhất ↔ Đánh giá ↔ Màn hình ↔ OBS
```

---

## 16. Bảng công việc Trello / Jira / Notion

Tối thiểu:

```text
TỒN ĐỌNG
↓
CẦN LÀM
↓
ĐANG LÀM
↓
CHỜ DUYỆT
↓
HOÀN THÀNH
```

Mỗi task phải có:

- mã công việc;
- giao diện/tệp;
- người thực hiện;
- hạn hoàn thành;
- nhánh;
- liên kết PR/commit;
- link video OBS sau khi hoàn thành.

Task mẫu:

- `TASK-01` – Khung dây + bản mô phỏng màn hình đầu tiên.
- `TASK-02` – HTML semantic cho vai trò 1.
- `TASK-03` – Responsive CSS.
- `TASK-04` – JavaScript tìm kiếm/lọc/biểu mẫu.
- `TASK-05` – Tích hợp dữ liệu giả lập/API.
- `TASK-06` – Nguyên mẫu trải nghiệm AI.
- `TASK-07` – Kiểm thử đa trình duyệt/di động.
- `TASK-08` – Minh chứng OBS + commit + README.

---

## 17. Video OBS – Minh chứng bắt buộc

**Mỗi trang giao diện thực tế đã được duyệt = 1 video.**

Số video OBS bằng số giao diện độc lập trong **bảng kiểm kê màn hình cuối cùng**. Không sử dụng con số 12 như một mục tiêu; nếu nghiệp vụ đầy đủ cần 16, 20, 24+ giao diện thì số video phải tương ứng.

Mỗi video phải:

1. Có mặt sinh viên thực hiện.
2. Hiển thị bản mô phỏng Figma/Canva.
3. Mở đúng tệp HTML/CSS/JS.
4. Giải thích bố cục và logic.
5. Thực hiện ít nhất một chỉnh sửa trực tiếp.
6. Chạy thử tương tác.
7. Ghi nhận thay đổi (commit) lên GitHub.
8. Nói rõ mã công việc/nhánh/commit.

### Quy tắc đặt tên video

```text
SV1-01-screen-name.mp4
SV1-02-screen-name.mp4
SV2-01-screen-name.mp4
SV3-01-screen-name.mp4
```

---

## 18. Figma / Canva

Trước khi code chính thức, nhóm phải có và được duyệt:

- sơ đồ trang;
- luồng người dùng;
- **bảng kiểm kê màn hình đầy đủ**;
- khung dây (khung dây);
- bản mô phỏng desktop;
- phiên bản responsive chính;
- hướng dẫn thành phần tối thiểu;
- trạng thái đang tải/rỗng/lỗi;
- bản mô phỏng tương tác AI.

Không được chỉ dùng ảnh AI sinh ra rồi viết mã theo ảnh mà không phân tích bố cục/thành phần.

---

## 19. Cấu trúc kho mã nguồn gợi ý

```text
project-root/
├── README.md
├── docs/
│   ├── project-proposal.md
│   ├── roles-and-features.md
│   ├── screen-list.md
│   ├── team-assignment.md
│   └── ai-usage-report.md
├── design/
│   ├── figma-link.txt
│   └── mockups/
├── pages/
├── assets/
│   ├── images/
│   ├── icons/
│   └── data/
├── css/
│   ├── style.css
│   └── responsive.css
└── js/
    ├── main.js
    ├── api.js
    └── modules/
```

---

## 20. Khai báo sử dụng AI

Trong `docs/ai-usage-report.md`, nhóm bắt buộc khai báo:

- công cụ AI đã dùng;
- câu lệnh (prompt) chính;
- phần AI sinh ra;
- phần sinh viên chỉnh sửa;
- lỗi AI gặp phải;
- cách sinh viên kiểm chứng;
- điều sinh viên học được;
- tính năng nào chỉ mock, tính năng nào gọi API thật.

---

## 21. Phạm vi sản phẩm tối thiểu (MVP)

### BẮT BUỘC PHẢI CÓ
- Đủ vai trò và **toàn bộ màn hình cần thiết theo bảng kiểm kê màn hình đã duyệt**; danh sách ở mục 8 chỉ là nền tảng ban đầu.
- Navigation xuyên suốt.
- Responsive.
- CRUD mô phỏng có ý nghĩa.
- Search/filter/form validation.
- Dữ liệu giả lập hoặc API.
- Tối thiểu 3 AI feature.
- Minh chứng Trello/Jira/Notion.
- Lịch sử Git + nhánh + PR.
- OBS cho từng trang.

### NÊN CÓ
- Biểu đồ/bảng điều khiển.
- Thông báo nổi.
- Trạng thái rỗng/đang tải/lỗi.
- Thành phần và token tạo kiểu tái sử dụng.
- Chế độ tối/sáng hoặc cải thiện khả năng tiếp cận nếu phù hợp.

### CÓ THÌ TỐT
- LLM API thật.
- Hoạt ảnh/tương tác vi mô.
- PWA/bộ đệm cục bộ.
- Cá nhân hóa chủ đề.
- Biểu đồ/bản đồ nâng cao.

---

## 22. Tiêu chí duyệt đề

Đề tài chỉ được coi là hoàn thành khi giảng viên có thể kiểm tra chuỗi:

```text
Ngữ cảnh
→ Vấn đề
→ Mục tiêu
→ Vai trò
→ Màn hình
→ Bản mô phỏng
→ Công việc
→ Nhánh
→ Ghi nhận thay đổi
→ yêu cầu hợp nhất
→ OBS
→ Sản phẩm
```

Nếu không chứng minh được chuỗi này, nhóm chưa chứng minh đầy đủ quá trình học và thực hành. Việc chỉ đạt ngưỡng số lượng tối thiểu không đồng nghĩa với hoàn thành tốt BTL.

---

## 23. Điểm sáng tạo của đề tài

Đề tài này khác CRUD truyền thống vì nó yêu cầu:

- nhiều vai trò tương tác;
- trạng thái nghiệp vụ rõ;
- UX quyết định/điều phối;
- AI có giải thích;
- dữ liệu được thể hiện bằng bảng điều khiển, danh sách, thẻ, bộ lọc hoặc dòng thời gian;
- teamwork và bằng chứng quá trình phát triển.

---

## 24. Chuẩn đầu ra mong đợi

Sau BTL, sinh viên phải chứng minh có thể:

- phân tích một vấn đề thực tế;
- chia hệ thống thành vai trò và màn hình;
- thiết kế UI/UX bằng Figma/Canva;
- hiện thực HTML semantic;
- dùng CSS/Bootstrap và responsive;
- lập trình DOM/sự kiện/biểu mẫu bằng JavaScript;
- dùng JSON/API;
- mô phỏng trải nghiệm AI có ý nghĩa;
- làm việc bằng Git/GitHub;
- giao việc và review;
- giải thích lại toàn bộ sản phẩm bằng video OBS.
