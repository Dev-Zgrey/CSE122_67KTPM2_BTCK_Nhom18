# Layout – Quản lý mẫu AI (`ai-templates`)

> Vai trò Kiểm duyệt viên · Desktop-first, responsive tới 320 px · HTML/CSS/JavaScript thuần · Dữ liệu `localStorage`
>
> Nguồn: `thanh-vien-3/kiem-duyet-vien/ai-templates.html`, `ai-templates.css`, `ai-templates.js`

## 1. Định danh màn hình

| Mục | Giá trị |
|---|---|
| URL | `thanh-vien-3/kiem-duyet-vien/ai-templates.html` |
| Vai trò | `moderator` – Kiểm duyệt viên |
| Tiêu đề tab | Quản lý mẫu AI |
| Breadcrumb | Kiểm duyệt viên / Quản lý mẫu AI |
| Khóa lưu trữ | `spendwise.aiTemplates` (2 bản ghi seed) |
| Nhật ký phụ | `spendwise.auditLog` (ghi sau mỗi lần lưu/xóa) |
| Shell dùng chung | Nạp `workspace-tabs.js`, `workspace-tabs.css`; `darkmode.css` được chèn tự động |
| Chế độ xem | Không sinh thanh `view-tabs`; tham số `?view=` không đổi nội dung |
| Xuất dữ liệu | CSV UTF-8, tên `moderator-ai-template-management-YYYY-MM-DD.csv` |

## 2. Sơ đồ bố cục

### Desktop (≥ 981 px)

```
┌──────────────────┬───────────────────────────────────────────────┐
│ SIDEBAR 244 px   │ HEADER 63 px                                  │
│ SpendWise        │ Kiểm duyệt viên / Quản lý mẫu AI   An + Đăng xuất │
│ KIỂM DUYỆT VIÊN  ├───────────────────────────────────────────────┤
│ • Duyệt nội dung │ PAGE HEADER                                   │
│ • Mẫu AI (active)│ EYEBROW                                       │
│ • Báo cáo        │ Quản lý mẫu AI      [Tạo mẫu AI] [Xuất dữ liệu]│
│ • Kiểm tra AI    │ Mô tả ngắn                                    │
│                  ├───────────────────────────────────────────────┤
│                  │ STATS: 4 thẻ đều nhau                         │
│                  │ [Tổng số] [Đang hiển thị] [Hoạt động] [Cần xử lý]
│                  ├───────────────────────────────────────────────┤
│                  │ PANEL                                         │
│                  │  Quản lý mẫu AI · 2 mục · 2 tổng cộng         │
│                  │  [Tìm kiếm..............] [Trạng thái ▾] [Làm mới]
│                  │  ┌────────┬────────┬────────┬────────┬───────┐ │
│                  │  │Tên mẫu │Mô hình │Phiên bản│Cập nhật│Trạng thái│ ✎ × │
│                  │  ├────────┼────────┼────────┼────────┼───────┤ │
│                  │  │ ...    │ ...    │ ...    │ ...    │ badge │ │
│                  │  └────────┴────────┴────────┴────────┴───────┘ │
│                  │  (empty state thay bảng khi lọc ra 0 dòng)    │
│ ─────────────────│                                               │
│ avatar + tên     │ FOOTER                                        │
│ Hồ sơ · Cài đặt  │                                               │
└──────────────────┴───────────────────────────────────────────────┘
                                              [Sáng/Tối] nút nổi
```

### Mobile (≤ 700 px)

```
┌──────────────────────────────┐
│ SIDEBAR sticky, full width   │
│ SpendWise                    │
│ [Duyệt nội dung][AI][Báo cáo]│ ← nav ngang, cuộn
├──────────────────────────────┤
│ HEADER 48 px                 │
├──────────────────────────────┤
│ PAGE HEADER xếp cột dọc      │
│ [Tạo mẫu AI][Xuất dữ liệu]   │
├──────────────────────────────┤
│ STATS 2 cột                  │
├──────────────────────────────┤
│ PANEL                        │
│ [Tìm kiếm 100%] [Trạng thái] │
│ Bảng cuộn ngang              │
└──────────────────────────────┘
```

## 3. Khung và lưới

| Vùng | Class | Quy tắc |
|---|---|---|
| Sidebar | `.sidebar` | Cố định trái, rộng 244 px, cao 100 vh, `padding: 24px 16px 16px`, viền phải 1 px, nền trắng, `z-index: 3` |
| Header | `.header` | Cách trái 244 px, cao tối thiểu 63 px, `padding: 0 38px`, flex hai đầu, viền dưới |
| Main | `.main` | Cách trái 244 px, `padding: 0 38px 22px`, cao tối thiểu `calc(100vh - 100px)` |
| Page header | `.page-header` | Flex, căn đáy, hai đầu, `gap: 20px`, `padding: 30px 0 20px` |
| Stats | `.stats-grid` | Grid 4 cột bằng nhau, `gap: 12px`, `margin-bottom: 14px` |
| Panel | `.panel` | Viền 1 px, bo 10 px, nền `--surface`, không đổ bóng |
| Footer | `.footer` | Cách trái 244 px, `padding: 18px 38px 0` |
| Modal | `.modal` | Rộng tối đa 510 px, bo 12 px, `padding: 22px`, cao tối đa `calc(100vh - 36px)` |
| Toast | `.toast-region` | Cố định góc phải dưới, cách 18 px |

Khoảng cách dọc giữa các khối: page header → stats → panel lần lượt 14–20 px, không dùng container bọc ngoài.

## 4. Thành phần giao diện

### 4.1 Sidebar

- **Brand**: ô chữ `S` nền xanh chanh + chữ SpendWise, liên kết về trang chủ.
- **Nhãn vai trò**: chữ hoa, 10 px, giãn chữ, màu xám.
- **Điều hướng tĩnh** (4 mục): Duyệt nội dung, Mẫu AI (đang active), Báo cáo, Kiểm tra AI.
- **Điều hướng sau khi JS chạy** (3 mục): Duyệt nội dung, AI, Báo cáo — mục “Kiểm tra AI” bị thay thế, xem mục 11.
- **Khối cuối**: avatar 33 px (chữ viết tắt), tên người dùng + vai trò, ba liên kết Hồ sơ / Cài đặt / Thông báo.
- Nav active dùng nền `--accent-soft`, chữ `--accent`; hover nền xanh nhạt.

### 4.2 Header

- Trái: breadcrumb “Kiểm duyệt viên / Quản lý mẫu AI”.
- Phải: tên người dùng và nút “Đăng xuất” kiểu quiet.
- Đăng xuất xóa `spendwise.session` rồi chuyển về `login.html`.

### 4.3 Page header

- Eyebrow “Kiểm duyệt viên”, H1 “Quản lý mẫu AI” cỡ `clamp(23px, 3vw, 30px)`, mô tả một dòng.
- Nhóm hành động bên phải: nút chính “Tạo mẫu AI”, nút phụ “Xuất dữ liệu”.
- Nút “Tạo mẫu AI” xuất hiện ở cả page header và empty state.

### 4.4 Thẻ thống kê

Render động từ `config.stats` mặc định (không khai báo riêng):

| Thẻ | Công thức |
|---|---|
| Tổng số | Tổng bản ghi |
| Đang hiển thị | Số bản ghi sau tìm kiếm + lọc |
| Đang hoạt động | Bản ghi không có trạng thái hoặc trạng thái khớp `/đang|hoạt động|đã duyệt|đã trả lời|mới/` |
| Cần xử lý | Trạng thái khớp `/chờ|cần bổ sung|mới|đang xử lý|cần xem xét/` |

Với dữ liệu seed: 2 / 2 / 2 / 0. Thẻ gồm nhãn 9 px phía trên và số 19 px phía dưới, `padding: 14px 15px`, bo 9 px.

### 4.5 Panel danh sách

- **Panel header**: tiêu đề “Quản lý mẫu AI” và dòng đếm dạng `N mục · M tổng cộng`.
- **Filter bar**:
  - Ô tìm kiếm chiếm phần còn lại, rộng tối thiểu 170 px, lọc trực tiếp khi gõ.
  - Select trạng thái: Tất cả, Bản nháp, Đang thử nghiệm, Hoạt động, Vô hiệu hóa, Đã lưu trữ.
  - Nút quiet “Làm mới bộ lọc” đặt lại cả hai điều kiện.
- **Bảng** (5 cột dữ liệu + 1 cột thao tác):

| Cột | Nội dung | Định dạng |
|---|---|---|
| Tên mẫu | `name` | Chữ đậm, màu đậm hơn các cột khác |
| Mô hình | `model` | Văn bản |
| Phiên bản | `version` | Văn bản |
| Cập nhật | `updatedAt` | `dd MMM yyyy` theo `vi-VN` |
| Trạng thái | `status` | Badge bo tròn 20 px |
| (Thao tác) | Sửa, Xóa | Hai nút icon 27 × 27 px |

- Không có phân trang, không sắp xếp cột; bảng cuộn ngang khi hẹp.
- **Empty state**: biểu tượng, tiêu đề “Chưa có dữ liệu phù hợp”, gợi ý đổi bộ lọc và nút “Tạo mẫu AI”; bảng được ẩn khi danh sách lọc rỗng.

### 4.6 Modal tạo/sửa

- Mở từ nút “Tạo mẫu AI” hoặc nút sửa trên dòng; tiêu đề lần lượt “Tạo mẫu AI” / “Sửa mẫu”.
- Nền mờ `rgba(20, 38, 27, .42)` + `backdrop-filter: blur(2px)`, đóng khi bấm nền hoặc `Escape`.
- Lưới form 2 cột, các trường full-width chiếm cả hàng:

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| Tên mẫu | text | Có | Không kiểm tra trùng |
| Mô hình | select | Có | Expense Categorizer / Spending Pattern Insight / Goal Coach |
| Phiên bản | text | Có | Chuỗi tự do, không ràng buộc định dạng |
| Trạng thái | select | Có | 5 trạng thái, mặc định “Bản nháp” |
| Prompt / mẫu phản hồi | textarea | Có | Full-width, cao tối thiểu 74 px |
| Phản hồi dự phòng | textarea | Không | Full-width |
| Vùng lỗi | text | — | `role="alert"`, full-width |
| Hành động | — | — | Hủy (phụ) + Lưu thay đổi (chính), căn phải |

- Khi mở: form reset, đổ dữ liệu bản ghi, focus ô đầu tiên, xóa thông báo lỗi.
- Khi lưu: kiểm tra trường bắt buộc, gán `updatedAt` mới, ghi `localStorage`; nếu ghi lỗi thì hoàn tác dữ liệu và báo toast.

### 4.7 Phản hồi hệ thống

- **Toast**: góc phải dưới, tự ẩn sau 3,5 giây, biến thể `is-danger` cho lỗi.
- Thông điệp: tạo mới, cập nhật, xóa, cập nhật trạng thái, lỗi đọc/ghi dữ liệu.
- **Xác nhận xóa**: hộp thoại `window.confirm` của trình duyệt, hiển thị tên mẫu.
- Không có trạng thái loading/skeleton vì dữ liệu đọc đồng bộ từ `localStorage`.

### 4.8 Footer và theme

- Footer: “SpendWise - Bản demo frontend - Dữ liệu lưu trên thiết bị này”.
- `workspace-tabs.js` chèn nút đổi Sáng/Tối cố định góc phải dưới; trạng thái lưu ở `spendwise-theme`, áp vào `html[data-theme="dark"]`.

## 5. Dữ liệu và trạng thái

| Mục | Chi tiết |
|---|---|
| Bản ghi | `id`, `name`, `model`, `version`, `status`, `prompt`, `fallback`, `updatedAt` |
| Seed | Expense Categorizer 1.2 (Hoạt động), Goal Coach 0.9 (Đang thử nghiệm) |
| Trạng thái hợp lệ | Bản nháp, Đang thử nghiệm, Hoạt động, Vô hiệu hóa, Đã lưu trữ |
| Sắp xếp | Bản ghi mới chèn lên đầu, không sắp xếp lại |
| Nhật ký | Mỗi lần lưu thêm một dòng `{actor, action: "Cập nhật dữ liệu", target: "Quản lý mẫu AI", status: "Thành công", date}` vào đầu `auditLog`, giữ tối đa 500 dòng |
| Xuất CSV | Xuất toàn bộ bản ghi (không theo bộ lọc), chỉ 5 cột hiển thị, có BOM UTF-8 |
| Đồng bộ | Lắng nghe sự kiện `spendwise:data` cùng khóa để render lại |

## 6. Tương tác

- Gõ tìm kiếm: lọc không phân biệt hoa thường theo tiếng Việt trên mọi giá trị của bản ghi.
- Chọn trạng thái: kết hợp AND với tìm kiếm.
- Sửa: mở modal với dữ liệu hiện tại.
- Xóa: xác nhận rồi xóa vĩnh viễn khỏi `localStorage`.
- Xuất dữ liệu: tải CSV ngay trên trình duyệt.
- Bàn phím: `Escape` đóng modal; focus-visible có viền 3 px màu accent.

## 7. Các trạng thái màn hình

| Trạng thái | Điều kiện | Hiển thị |
|---|---|---|
| Mặc định | Có dữ liệu | 4 thẻ + bảng đầy đủ |
| Lọc rỗng | Không bản ghi khớp | Bảng ẩn, empty state hiện |
| Đọc lỗi | `localStorage` hỏng/không đọc được | Danh sách rỗng + toast đỏ |
| Ghi lỗi | `setItem` thất bại | Hoàn tác dữ liệu + toast đỏ |
| Thành công | Tạo/sửa/xóa | Toast xanh, bảng và thẻ cập nhật lại |

## 8. Responsive

| Breakpoint | Thay đổi |
|---|---|
| ≥ 981 px | Bố cục mặc định, sidebar 244 px, stats 4 cột |
| ≤ 980 px | Sidebar 210 px; main/header/footer lùi theo; padding ngang 22 px; stats 2 cột |
| ≤ 700 px | Sidebar thành sticky full-width, nav cuộn ngang; ẩn nhãn vai trò và khối người dùng; header 48 px; page header xếp cột; nút hành động chia đều chiều rộng; panel header căn trên |
| ≤ 420 px | Padding ngang 11 px; stats `gap` 7 px, thẻ 11 px, số 16 px; form 1 cột; ô tìm kiếm rộng 100 % |

## 9. Design tokens

| Token | Giá trị | Dùng cho |
|---|---|---|
| `--ink` | `#192820` | Chữ chính |
| `--muted` | `#78867f` | Mô tả, chữ phụ |
| `--line` | `#e7ece8` | Viền, đường phân cách |
| `--paper` | `#f6f8f5` | Nền trang |
| `--surface` | `#fff` | Sidebar, panel, thẻ |
| `--green` | `#205c47` | Màu thương hiệu |
| `--accent` | `#62538f` | Nút chính, nav active |
| `--accent-soft` | `#f0edf8` | Nền nav active, badge, hover icon |
| `--danger` | `#b9584c` | Cảnh báo (khai báo) |

- Badge cảnh báo: nền `#fff4e3`, chữ `#96691f`. Badge nguy hiểm: nền `#fbecea`, chữ `#ab5146`.
- Font: Segoe UI, Tahoma, Verdana, Arial. Thang chữ 9 / 10 / 12 / 13 / 17 / 19 px + H1 clamp.
- Bo góc: 6 px (ô nhập), 7 px (nút), 9 px (thẻ), 10 px (panel), 12 px (modal), 20 px (badge).
- Bóng: modal `0 20px 70px #10231940`, toast `0 8px 30px #1e3a2b12`.

## 10. Tiếp cận

- Có `aside`, `header`, `main`, `footer`, nav có `aria-label="Điều hướng chính"`.
- Modal dùng `role="dialog"`, `aria-modal="true"`, `aria-labelledby`; focus vào ô đầu tiên; đóng bằng `Escape`/nền.
- Nút icon có `aria-label` và `title`; toast có `aria-live="polite"`.
- Tiêu đề cột thao tác ẩn bằng `.visually-hidden`; focus-visible toàn cục 3 px.

## 11. Ghi chú triển khai

- **Điều hướng bị JS thay đổi**: HTML có 4 mục, nhưng `workspace-tabs.js` ghi đè sidebar theo `roleNavigation.moderator` còn 3 mục (Duyệt nội dung, AI, Báo cáo). Tài liệu kiểm kê vẫn liệt kê “Kiểm tra AI”; cần thống nhất trước khi chụp minh chứng.
- **Chưa nối chế độ xem**: `?view=templates|review` trong bảng kiểm kê không có tác dụng vì trang không nạp `workspace-loader.js` và không có `data-workspace-group`; `ai-review.html` vẫn là trang riêng và bị `workspace-tabs.js` chuyển hướng về `ai-templates.html?view=review`.
- **Không có cập nhật trạng thái trực tiếp trên dòng**: cấu hình không khai báo `statuses`, nên chỉ có nút sửa/xóa; đổi trạng thái phải qua modal.
- **Nhãn form chưa gắn lập trình**: các `<label>` không có `for` và không bọc ô nhập, nên trình đọc màn hình chưa đọc được liên kết nhãn.
- **Bảng thiếu `scope="col"`** trên `<th>`; nên bổ sung khi rà soát tiếp cận.
- Không kiểm tra trùng tên, không giới hạn độ dài; `version` là chuỗi tự do.
- Dòng đếm không có `aria-live`, thay đổi không được thông báo cho trình đọc màn hình.
