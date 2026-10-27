# Giải thích chi tiết 3 trang của Thành viên 1: Gợi ý AI, Giao dịch, Ngân sách

Thư mục: `thanh-vien-1/nguoi-dung/`. Vai trò sử dụng: **Người dùng**.
Dự án là bản demo frontend thuần (HTML/CSS/JS), **không có backend**. Mọi dữ liệu lưu trong `localStorage` của trình duyệt.

## 0. Kiến trúc chung

| Trang | File | Cơ chế JS |
|---|---|---|
| Gợi ý AI | `ai.html`, `ai.css`, `ai.js` | Dùng engine dùng chung `workspace-engine.js` (CRUD dạng bảng) |
| Giao dịch | `transactions.html/.css/.js` | Script riêng, tự viết |
| Ngân sách | `budget.html/.css/.js` | Script riêng, tự viết |

### Khóa localStorage

| Khóa | Nội dung | Trang dùng |
|---|---|---|
| `spendwise.transactions.v1` | Danh sách giao dịch | Giao dịch (ghi), Ngân sách (đọc) |
| `spendwise.budgets.v1` | Danh sách ngân sách | Ngân sách |
| `spendwise.recommendations` | Danh sách đề xuất AI | Gợi ý AI |
| `spendwise.categories` | Danh mục do Quản trị viên cấu hình | Giao dịch, Ngân sách (đọc) |
| `spendwise.auditLog` | Nhật ký kiểm toán (tối đa 500 dòng) | Cả 3 trang ghi vào |
| `spendwise.session`, `spendwise.pro` | Phiên đăng nhập, hồ sơ | Hiển thị tên, đăng xuất |

### Khung giao diện chung
Cả 3 trang có cùng bố cục: **sidebar** (logo, nhãn vai trò, menu 6 mục: Tổng quan, Giao dịch, Ngân sách, Mục tiêu, Phân tích, Gợi ý AI, kèm Hồ sơ/Cài đặt/Thông báo), **header** (breadcrumb, tên người dùng, nút Đăng xuất), **main**, **footer** và **toast** (thông báo nổi). `workspace-tabs.js` được nạp thêm để xử lý tab workspace.

---

## 1. Trang Gợi ý AI (`ai.html`)

### 1.1 Mục đích
Trang "Đề xuất thông minh": hiển thị các đề xuất của AI (phân loại chi tiêu, thói quen chi tiêu, mục tiêu tiết kiệm) kèm **lý do, dữ liệu đầu vào, độ chắc chắn**, để người dùng **chủ động chấp nhận, chỉnh sửa, từ chối hoặc yêu cầu tạo lại**.

> Lưu ý: trong bản demo, đây **chưa phải AI thật**. Không có thuật toán sinh đề xuất; các đề xuất là bản ghi do người dùng/dữ liệu mẫu nhập vào và quản lý. Trang mô phỏng giao diện *quản lý vòng đời một đề xuất*.

### 1.2 Cách khởi tạo
`ai.js` chỉ gọi:

```js
SpendWiseWorkspace.mount({
  slug: "user-ai-recommendations",   // tên file CSV khi xuất
  storeKey: "recommendations",       // localStorage: spendwise.recommendations
  labelKey: "title",                 // trường dùng trong hộp xác nhận xóa
  defaultRecord: { status: "Chờ xem xét" }  // đề xuất mới mặc định chờ xem xét
});
```

Vì HTML đã có sẵn (`data-static-workspace`), engine **không dựng lại giao diện**, chỉ gắn hành vi. Cấu hình cột và trường form được **tự suy ra từ HTML**: các `<th data-key>` thành cột, các input có `name` trong `data-form` thành trường form (đọc nhãn, kiểu, `required`).

### 1.3 Thành phần giao diện
1. **Tiêu đề trang** và 2 nút: `＋ Thêm đề xuất` (mở form), `↓ Xuất dữ liệu` (xuất CSV).
2. **4 thẻ thống kê** (`data-stat`): Tổng đề xuất; Chờ xem xét; Đã chấp nhận; Đã từ chối. Tính trực tiếp từ danh sách (đếm theo `status`).
3. **Thanh lọc**: ô tìm kiếm, dropdown trạng thái (Chờ xem xét / Đã chấp nhận / Đã chỉnh sửa / Đã từ chối / Đã tạo lại), nút *Làm mới bộ lọc*.
4. **Bảng** với các cột: Đề xuất (`title`), Loại (`kind`), Lý do (`reason`), Độ chắc chắn (`confidence`), Trạng thái (`status`, hiển thị dạng badge), và cột thao tác.
5. **Trạng thái rỗng** ("Chưa có dữ liệu phù hợp") kèm nút thêm.
6. **Modal** thêm/sửa đề xuất.

### 1.4 Form đề xuất (modal)
| Trường | Kiểu | Bắt buộc |
|---|---|---|
| Tên đề xuất (`title`) | text | Có |
| Loại đề xuất (`kind`) | select: Phân loại chi tiêu / Thói quen chi tiêu / Mục tiêu tiết kiệm | Có |
| Giải thích và dữ liệu đầu vào (`reason`) | textarea | Có |
| Độ chắc chắn (`confidence`) | select: Cao / Trung bình / Thấp | Có |
| Trạng thái (`status`) | select 5 giá trị | Có |
| Ghi chú của bạn (`note`) | textarea | Không |

Tiêu đề modal: "Thêm đề xuất" khi tạo mới, "Sửa đề xuất" khi sửa (`data-edit-title`).

### 1.5 Các hoạt động
- **Hiển thị (render)**: đọc `records` từ localStorage; lọc theo từ khóa (tìm trong **mọi trường** của bản ghi, không phân biệt hoa thường theo locale `vi`) và theo trạng thái; cập nhật dòng "N mục · M tổng cộng"; ẩn bảng/hiện trạng thái rỗng khi không có kết quả; cập nhật các thẻ thống kê (thống kê tính trên toàn bộ danh sách, không phụ thuộc bộ lọc).
- **Thêm**: bấm nút → modal mở, trạng thái mặc định "Chờ xem xét" → bấm *Lưu thay đổi*.
- **Kiểm tra dữ liệu khi lưu**: trường bắt buộc rỗng (sau `trim`) → hiện lỗi "Vui lòng nhập …" và focus vào trường; trường số âm bị chặn (không áp dụng thực tế vì form không có trường số).
- **Lưu**: tạo bản ghi có `id` (UUID), `updatedAt`; bản ghi mới được **chèn đầu danh sách**. Nếu ghi localStorage lỗi thì **hoàn tác** (rollback về danh sách cũ) và báo lỗi.
- **Sửa**: nút ✎ mở modal điền sẵn dữ liệu; lưu sẽ ghi đè bản ghi cùng `id`.
- **Xóa**: nút × → hộp `confirm` ("Bạn có chắc muốn xóa “tên”?") → xóa và báo thành công.
- **Đổi trạng thái nhanh**: nếu cấu hình có `statuses` sẽ có dropdown ngay trên dòng; ở trang này không cấu hình nên trạng thái đổi qua form sửa.
- **Quy trình xử lý đề xuất** (theo trạng thái): *Chờ xem xét* → người dùng **Chấp nhận** / **Chỉnh sửa** (rồi lưu "Đã chỉnh sửa") / **Từ chối** / **Tạo lại**.
- **Badge trạng thái**: màu cảnh báo (warning) cho chữ "chờ/cần/đang xử lý"; màu nguy hiểm (danger) cho "từ chối/khóa/quá hạn/lỗi/vượt"; còn lại màu thường.
- **Xuất CSV**: tạo file `user-ai-recommendations-YYYY-MM-DD.csv` (có BOM UTF-8 để Excel đọc tiếng Việt), gồm các cột hiển thị.
- **Phím Esc / click nền modal**: đóng modal.
- **Đồng bộ**: lắng nghe sự kiện `spendwise:data`; nếu khóa `recommendations` đổi (từ trang khác, ví dụ Kiểm duyệt viên) thì đọc lại và vẽ lại.
- **Nhật ký kiểm toán**: mỗi lần lưu ghi một dòng "Cập nhật dữ liệu – Đề xuất thông minh" vào `auditLog`.
- **Đăng xuất**: xóa `spendwise.session` rồi chuyển về trang đăng nhập.
- **Chống XSS**: mọi giá trị đưa vào HTML đều qua `escapeHtml`.

### 1.6 Luồng liên quan
Kiểm duyệt viên (Thành viên 3) có trang *Kiểm tra AI / Mẫu AI* quản lý kiểm duyệt đề xuất; dữ liệu `recommendations` dùng chung nên thay đổi được đồng bộ qua sự kiện.

---

## 2. Trang Giao dịch (`transactions.html`)

### 2.1 Mục đích
Quản lý **toàn bộ khoản thu và khoản chi**: thêm, sửa, xóa, tìm kiếm, lọc, xuất CSV. Đây là **nguồn dữ liệu gốc** cho Ngân sách (và các trang Tổng quan, Phân tích).

### 2.2 Phần lõi dữ liệu dùng chung (`window.SpendWiseUserData`)
Đầu file `transactions.js` (và lặp lại trong `budget.js`) có một module tiện ích được xuất ra `window.SpendWiseUserData`:

| Hàm/giá trị | Chức năng |
|---|---|
| `keys` | Tên khóa localStorage của giao dịch và ngân sách |
| `expenseCategories`, `incomeCategories`, `categoryIcons` | Danh mục chi/thu và icon; khởi tạo từ JSON nhúng `data-category-options` trong HTML (Nhà cửa, Ăn uống, Di chuyển, Mua sắm, Sức khỏe, Giải trí, Hóa đơn, Khác…) |
| `load(key)` | Đọc mảng từ localStorage; nếu chưa có thì tạo mảng rỗng; nếu không phải mảng thì ném lỗi |
| `save(type, records)` | Ghi localStorage, phát sự kiện `spendwise:user-data` (để các trang/tab khác vẽ lại), và ghi nhật ký kiểm toán ("Cập nhật giao dịch"/"Cập nhật ngân sách"); lỗi ghi nhật ký chỉ cảnh báo, không làm hỏng việc lưu chính |
| `totals(records)` | Tổng thu và tổng chi |
| `currentTransactions(records, month)` | Lọc giao dịch theo tháng (`date` bắt đầu bằng `YYYY-MM`) |
| `expensesByCategory(records, month)` | Tổng chi theo danh mục trong tháng |
| `money`, `shortMoney` | Định dạng tiền VND (`1.500.000 ₫`; dạng ngắn `1,5 tr`, `150k`) |
| `progress`, `progressClass` | Phần trăm thanh tiến độ (kẹp 0–100%); lớp `is-warning` từ 80%, `is-over-limit` từ 100% |
| `escape`, `formatDate`, `dateKey`, `monthKey`, `id`, `notify` | Tiện ích: chống XSS, định dạng ngày, khóa ngày/tháng, tạo UUID, hiện toast |

**Đồng bộ danh mục với Quản trị viên**: `refreshCategories()` đọc `spendwise.categories`, chỉ lấy mục có trạng thái "Hoạt động", tách thành danh mục *Chi tiêu* và *Thu nhập*, cập nhật icon. Được gọi khi tải trang, khi có sự kiện `spendwise:data` (key `categories`) hoặc sự kiện `storage` (tab khác). Nhờ đó admin thêm/tắt danh mục thì form giao dịch và ngân sách đổi theo.

### 2.3 Thành phần giao diện
1. **Tiêu đề** + nút *Thêm giao dịch*, nút *Xuất CSV*; hiển thị ngày hôm nay (`data-today`, ví dụ "T2, 27 thg 10").
2. **3 thẻ chỉ số của tháng hiện tại**: Tổng thu (`income`), Tổng chi (`expense`), Số giao dịch (`tx-count`).
3. **Thanh lọc**: tìm kiếm; loại (Tất cả / Khoản chi / Khoản thu); danh mục; thời gian (tháng); nút *Làm mới bộ lọc*; đếm số kết quả (`data-filtered-count`).
4. **Bảng giao dịch** gồm các cột: Giao dịch (icon danh mục + tên + ghi chú hoặc nhãn loại), Danh mục, Ngày, Phương thức, Số tiền, Thao tác (✎ sửa, × xóa).
5. **Trạng thái rỗng** khi không có kết quả.
6. **Modal** thêm/sửa giao dịch.

### 2.4 Form giao dịch
| Trường | Ràng buộc |
|---|---|
| Loại giao dịch (radio) | Khoản chi (mặc định) / Khoản thu |
| Tên giao dịch | bắt buộc, tối đa 80 ký tự |
| Số tiền (₫) | bắt buộc, số, `min=0`, bước 1.000 |
| Danh mục | bắt buộc; **thay đổi theo loại** (chi → danh mục chi, thu → danh mục thu) |
| Ngày giao dịch | bắt buộc, mặc định hôm nay |
| Phương thức | Tiền mặt (mặc định) / Chuyển khoản / Thẻ ngân hàng / Ví điện tử |
| Ghi chú | không bắt buộc, tối đa 200 ký tự |

### 2.5 Các hoạt động chi tiết
- **`render()`**: (1) đọc lại giao dịch từ localStorage; (2) `refreshFilters()` dựng lại dropdown danh mục (lấy các danh mục **thực sự xuất hiện** trong giao dịch, sắp xếp theo tiếng Việt) và dropdown tháng (các tháng có giao dịch, mới nhất trước), giữ lại lựa chọn đang chọn nếu còn tồn tại; (3) lọc theo từ khóa (tên + danh mục + ghi chú), loại, danh mục, tháng; (4) **sắp xếp theo ngày giảm dần**; (5) vẽ các dòng; (6) cập nhật chỉ số tháng hiện tại. Số tiền thu có dấu `+` và màu thu nhập, chi có dấu `−`.
- **Lưu ý**: 3 thẻ chỉ số luôn tính cho **tháng hiện tại**, không theo bộ lọc; còn bảng thì theo bộ lọc.
- **Mở form (`open`)**: reset form, điền dữ liệu cũ nếu đang sửa; đổi tiêu đề thành "Chỉnh sửa giao dịch"/"Thêm giao dịch", nút thành "Lưu thay đổi"/"Lưu giao dịch"; khóa cuộn nền (`modal-open`); focus vào tên giao dịch.
- **Đổi loại thu/chi**: nạp lại danh sách danh mục tương ứng.
- **Kiểm tra khi lưu**:
  - Số tiền phải là số hữu hạn **> 0** ("Nhập số tiền lớn hơn 0.").
  - Ngày **không được ở tương lai** ("Ngày giao dịch không thể ở tương lai.").
- **Lưu**: tạo bản ghi `{type, title, amount, category, date, method, note, id}`; thêm mới chèn đầu mảng, sửa thay thế theo `id`. Gọi `save("transactions")`; thành công thì đóng modal, vẽ lại, toast "Đã thêm/cập nhật giao dịch."; lỗi thì **rollback** và hiện lỗi trong form.
- **Xóa**: `confirm` → xóa khỏi mảng → lưu; lỗi thì khôi phục.
- **Xuất CSV**: nếu chưa có giao dịch thì báo lỗi; ngược lại xuất **toàn bộ** giao dịch (không chỉ phần đã lọc) với cột Ngày, Loại, Tên giao dịch, Danh mục, Số tiền, Phương thức, Ghi chú; có BOM UTF-8, escape dấu `"`; tên file `spendwise-giao-dich-YYYY-MM.csv`.
- **Tham số `?new`**: mở thẳng form thêm giao dịch khi vào trang (dùng cho nút "Thêm giao dịch" từ Tổng quan).
- **Đồng bộ**: lắng nghe `spendwise:user-data` (cùng tab) và `storage` (tab khác) để vẽ lại.
- **Phím Esc / click nền**: đóng modal.

---

## 3. Trang Ngân sách (`budget.html`)

### 3.1 Mục đích
Đặt **hạn mức chi tiêu theo danh mục cho từng tháng** và theo dõi mức đã dùng, so sánh với giao dịch thực tế. Ngân sách chỉ **lưu hạn mức**; số đã chi được **tính tự động từ giao dịch**, không nhập tay.

### 3.2 Dữ liệu
Bản ghi ngân sách: `{ id, category, limit, month }` (`month` dạng `YYYY-MM`). Ràng buộc: **mỗi danh mục chỉ có 1 ngân sách trong một tháng**.

### 3.3 Thành phần giao diện
1. **Tiêu đề** + nút *Tạo ngân sách*; ngày hôm nay.
2. **3 thẻ chỉ số** (theo tháng đang chọn): Tổng hạn mức (`bud-total`), Đã chi (`bud-spent` + số khoản chi trong tháng), Còn lại (`remaining` + ghi chú).
3. **Khối tổng quan**: nhãn tháng, **phần trăm đã dùng**, thanh tiến độ, câu nhận xét.
4. **Bộ chọn tháng**: nút lùi tháng, tiến tháng, "Tháng hiện tại" và dropdown tháng.
5. **Danh sách thẻ ngân sách theo danh mục** (`bud-category-card`).
6. **Trạng thái rỗng** nếu tháng chưa có ngân sách.
7. **Modal** tạo/sửa ngân sách.

### 3.4 Cách tính (trong `render()`)
```
monthBudgets = ngân sách có month = tháng đang chọn (sắp theo tên danh mục, locale vi)
spending     = tổng chi theo danh mục của tháng đó (từ giao dịch loại "expense")
totalLimit   = Σ limit của monthBudgets
totalSpent   = Σ spending của TẤT CẢ danh mục chi trong tháng
remaining    = totalLimit − totalSpent
percent      = totalSpent / totalLimit × 100   (0 nếu totalLimit = 0)
```
Lưu ý: `totalSpent` cộng **cả danh mục chưa đặt ngân sách**, nên có thể lớn hơn tổng chi của các danh mục có ngân sách.

**Ghi chú động**:
- Ghi chú chi: "N khoản chi trong tháng".
- Ghi chú còn lại: "Đã vượt tổng hạn mức" nếu `remaining < 0`, ngược lại "Trong hạn mức ngân sách".
- Câu nhận xét tổng quan: chưa có ngân sách → gợi ý tạo; ≥100% → cảnh báo vượt; ≥80% → sắp chạm hạn mức; còn lại → "Tiến độ chi tiêu đang được cập nhật từ các giao dịch của bạn."
- Thanh tiến độ: rộng = % (kẹp 0–100), màu theo `progressClass` (bình thường / vàng ≥80% / đỏ ≥100%).

### 3.5 Thẻ ngân sách từng danh mục
Mỗi thẻ hiển thị: icon + tên danh mục, nút ✎/×, **đã chi trên hạn mức**, thanh tiến độ, `% đã sử dụng`, và số dư: "Còn X" hoặc "Vượt X" (đỏ). Dòng cảnh báo:
- ≥100%: "Bạn đã vượt hạn mức danh mục này."
- ≥80%: "Sắp đạt hạn mức, hãy theo dõi chi tiêu."
- còn lại: "Bạn đang trong giới hạn ngân sách."

### 3.6 Bộ chọn tháng (`fillMonths`)
Danh sách tháng gồm: tháng hiện tại + mọi tháng đã có ngân sách + **±5 tháng quanh hôm nay**, sắp giảm dần. Nút trước/sau dịch tháng đang chọn ±1; "Tháng hiện tại" quay về hôm nay. Mọi thay đổi đều gọi `render()`.

### 3.7 Form ngân sách
| Trường | Ràng buộc |
|---|---|
| Danh mục | select từ **danh mục chi** (đồng bộ với admin) |
| Hạn mức (₫) | bắt buộc, số, bước 10.000 |
| Tháng áp dụng | mặc định là tháng đang chọn |

**Kiểm tra khi lưu**:
- Hạn mức phải **> 0** ("Nhập hạn mức lớn hơn 0.").
- Không trùng (tháng, danh mục) với bản ghi khác ("Danh mục này đã có ngân sách trong tháng đã chọn."). Khi sửa, bỏ qua chính bản ghi đang sửa.

**Sau khi lưu**: `save("budgets")`, chuyển tháng đang xem sang tháng của ngân sách vừa lưu, đóng modal, vẽ lại, toast "Đã tạo/cập nhật ngân sách."; lỗi thì rollback.

### 3.8 Các hoạt động khác
- **Sửa/Xóa**: dùng ủy quyền sự kiện trên `[data-bud-list]`; xóa có `confirm`, lỗi lưu thì khôi phục.
- **Liên kết với Giao dịch**: ngân sách lắng nghe `spendwise:user-data` và `storage` (khóa giao dịch **hoặc** ngân sách) → khi thêm/sửa/xóa giao dịch, thanh tiến độ và số liệu ngân sách **tự cập nhật** mà không cần tải lại.
- **Esc / click nền**: đóng modal.

---

## 4. Mối quan hệ giữa 3 trang

```
Quản trị viên (categories) ──► danh mục chi/thu ──► form Giao dịch, form Ngân sách
Giao dịch ──(spendwise.transactions.v1)──► Ngân sách (tính số đã chi, % sử dụng)
Giao dịch/Ngân sách/AI ──► auditLog ──► trang Kiểm toán (Quản trị viên)
Gợi ý AI (recommendations) ◄──► Kiểm duyệt viên (Kiểm tra AI)
```

## 5. Hạn chế / lưu ý của bản demo
- Dữ liệu chỉ lưu trên trình duyệt, không có server, xóa cache là mất.
- Gợi ý AI chưa sinh đề xuất tự động; chưa có nút "Chấp nhận/Từ chối" riêng, thao tác qua form sửa trạng thái.
- Xuất CSV của Giao dịch lấy toàn bộ dữ liệu, không theo bộ lọc.
- Ngân sách: tổng "Đã chi" gồm cả danh mục chưa đặt hạn mức.
- `min=0` trong HTML cho phép nhập 0 nhưng JS vẫn chặn (phải > 0).
- Mã tiện ích dùng chung bị lặp ở cả `transactions.js` và `budget.js`; ghi chú: biến `SpendWiseUserData` được gán lại ở mỗi trang.
