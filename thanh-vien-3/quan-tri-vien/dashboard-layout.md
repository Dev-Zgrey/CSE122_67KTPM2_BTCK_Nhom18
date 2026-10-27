# Layout – Tổng quan hệ thống (`dashboard`)

> Vai trò Quản trị viên · Desktop-first, responsive tới 320 px · HTML/CSS/JavaScript thuần · Dữ liệu `localStorage`
>
> Nguồn: `thanh-vien-3/quan-tri-vien/dashboard.html`, `dashboard.css`, `dashboard.js`; chế độ nhật ký dùng `audit.css`, `audit.js`

## 1. Định danh màn hình

| Mục | Giá trị |
|---|---|
| URL | `thanh-vien-3/quan-tri-vien/dashboard.html` (mặc định `?view=overview`) |
| Chế độ xem | `overview` → `dashboard.css/js`; `audit` → `audit.css/js` |
| Vai trò | `admin` – Quản trị viên |
| Tiêu đề tab | Tổng quan hệ thống |
| Breadcrumb | Quản trị viên / Tổng quan hệ thống |
| Khóa lưu trữ | `spendwise.auditLog` (2 bản ghi seed) |
| Khóa đọc thống kê | `spendwise.demoUsers`, `spendwise.transactions.v1`, `spendwise.budgets.v1` |
| Shell dùng chung | `workspace-loader.js` nạp CSS/JS theo `view`; `workspace-tabs.js`, `workspace-tabs.css`; `darkmode.css` chèn tự động |
| Xuất dữ liệu | CSV UTF-8, tên `admin-system-dashboard-YYYY-MM-DD.csv` |

## 2. Sơ đồ bố cục

### Desktop (≥ 981 px)

```
┌──────────────────┬───────────────────────────────────────────────┐
│ SIDEBAR 244 px   │ HEADER 63 px                                  │
│ SpendWise        │ Quản trị viên / Tổng quan hệ thống  An + Đăng xuất │
│ QUẢN TRỊ VIÊN    ├───────────────────────────────────────────────┤
│ • Tổng hệ thống  │ [Tổng quan] [Nhật ký kiểm toán]  ← view-tabs  │
│   (active)       ├───────────────────────────────────────────────┤
│ • Danh mục       │ PAGE HEADER                                   │
│ • Tài khoản      │ EYEBROW                                       │
│ • Phân quyền     │ Tổng quan hệ thống        [↓ Xuất dữ liệu]    │
│ • Kiểm toán      │ Mô tả ngắn                                    │
│ • Cấu hình       ├───────────────────────────────────────────────┤
│                  │ STATS: 4 thẻ đều nhau                         │
│                  │ [Tài khoản] [Giao dịch] [Ngân sách] [Chờ duyệt]
│                  ├───────────────────────────────────────────────┤
│                  │ PANEL                                         │
│                  │  Hoạt động hệ thống gần đây · 2 mục · 2 tổng  │
│                  │                        [Mở nhật ký kiểm toán] │
│                  │  [Tìm kiếm..............................] [Làm mới]
│                  │  ┌────────────┬──────────┬─────────┬──────┬──────┐
│                  │  │Người thực  │ Hoạt động│ Đối tượng│Kết quả│Thời điểm│
│                  │  │hiện        │          │          │      │        │
│                  │  ├────────────┼──────────┼─────────┼──────┼──────┤
│                  │  │ ...        │ ...      │ ...      │ ...  │ ...  │
│                  │  └────────────┴──────────┴─────────┴──────┴──────┘
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
│ [Tổng hệ thống][Cấu hình][Tài khoản] │ ← nav ngang, cuộn
├──────────────────────────────┤
│ HEADER 48 px                 │
├──────────────────────────────┤
│ [Tổng quan][Nhật ký kiểm toán]│ ← view-tabs cuộn ngang
├──────────────────────────────┤
│ PAGE HEADER xếp cột dọc      │
│ [↓ Xuất dữ liệu]             │
├──────────────────────────────┤
│ STATS 2 cột                  │
├──────────────────────────────┤
│ PANEL                        │
│ [Tìm kiếm 100%] [Làm mới]    │
│ Bảng cuộn ngang              │
└──────────────────────────────┘
```

## 3. Khung và lưới

| Vùng | Class | Quy tắc |
|---|---|---|
| Sidebar | `.sidebar` | Cố định trái, rộng 244 px, cao 100 vh, `padding: 24px 16px 16px`, viền phải, nền trắng, `z-index: 3` |
| Header | `.header` | Cách trái 244 px, cao tối thiểu 63 px, `padding: 0 38px`, flex hai đầu, viền dưới |
| Main | `.main` | Cách trái 244 px, `padding: 0 38px 22px`, cao tối thiểu `calc(100vh - 100px)` |
| View tabs | `.view-tabs` | Chèn đầu `main`, flex, `margin: 20px 0 0`, viền dưới, tab active gạch chân 2 px màu accent |
| Page header | `.page-header` | Flex căn đáy, `gap: 20px`, `padding: 30px 0 20px` |
| Stats | `.stats-grid` | Grid 4 cột, `gap: 12px`, `margin-bottom: 14px` |
| Panel | `.panel` | Viền 1 px, bo 10 px, nền `--surface`, không đổ bóng |
| Footer | `.footer` | Cách trái 244 px, `padding: 18px 38px 0` |
| Toast | `.toast-region` | Cố định góc phải dưới, cách 18 px |

Thứ tự dọc trong `main`: view tabs → page header → stats → panel. Khi `?view=audit`, khung và thứ tự giữ nguyên, chỉ đổi nguồn CSS/JS và tab active.

## 4. Thành phần giao diện

### 4.1 Sidebar

- **Brand**: ô chữ `S` nền xanh chanh + SpendWise.
- **Nhãn vai trò**: “QUẢN TRỊ VIÊN”.
- **Điều hướng tĩnh** (6 mục): Tổng hệ thống (active), Danh mục, Tài khoản, Phân quyền, Kiểm toán, Cấu hình.
- **Điều hướng sau khi JS chạy** (3 mục): Tổng hệ thống, Cấu hình, Tài khoản — `workspace-tabs.js` ghi đè toàn bộ nav.
- **Khối cuối**: avatar viết tắt, tên + vai trò, liên kết Hồ sơ / Cài đặt / Thông báo.

### 4.2 Header

- Trái: breadcrumb “Quản trị viên / Tổng quan hệ thống”.
- Phải: tên người dùng + nút “Đăng xuất” kiểu quiet.
- Đăng xuất xóa `spendwise.session` rồi chuyển về `login.html`.

### 4.3 Thanh chế độ xem

- Do `workspace-tabs.js` sinh cho nhóm `admin-monitoring`: “Tổng quan” và “Nhật ký kiểm toán”.
- Mặc định `overview`; `?view=audit` đánh dấu tab thứ hai.
- Mỗi tab là link cùng trang với `?view=...`; thanh cuộn ngang khi hẹp.

### 4.4 Page header

- Eyebrow “Quản trị viên”, H1 “Tổng quan hệ thống”, mô tả “Theo dõi tài khoản, giao dịch, ngân sách và hoạt động gần đây.”
- Một nút phụ “↓ Xuất dữ liệu” trong wrapper `.action`.
- H1 và breadcrumb là markup tĩnh, **không đổi** khi chuyển sang `?view=audit`.

### 4.5 Thẻ thống kê

Bốn thẻ cấu hình riêng, không dùng công thức mặc định:

| Thẻ | Nguồn | Ghi chú |
|---|---|---|
| Tài khoản | Độ dài mảng `spendwise.demoUsers` | Tạo mảng rỗng nếu chưa có |
| Giao dịch | Độ dài mảng `spendwise.transactions.v1` | Khóa dùng chung với role Người dùng |
| Ngân sách | Độ dài mảng `spendwise.budgets.v1` | Khóa dùng chung với role Người dùng |
| Nội dung chờ duyệt | Giá trị cố định `2` | Không tính từ dữ liệu thật |

Thẻ gồm nhãn 9 px và số 19 px, `padding: 14px 15px`, bo 9 px.

### 4.6 Panel hoạt động

- **Panel header**: tiêu đề “Hoạt động hệ thống gần đây”, dòng đếm `N mục · M tổng cộng`, nút phụ “Mở nhật ký kiểm toán” chuyển tới `dashboard.html?view=audit`.
- **Filter bar**: chỉ có ô tìm kiếm (chiếm phần còn lại, tối thiểu 170 px) và nút quiet “Làm mới bộ lọc”; **không có select trạng thái**.
- **Bảng**:

| Cột | Nội dung | Định dạng |
|---|---|---|
| Người thực hiện | `actor` | Chữ đậm |
| Hoạt động | `action` | Văn bản |
| Đối tượng | `target` | Văn bản |
| Kết quả | `status` | Badge (cảnh báo nếu chứa “chờ”, “cần”, “đang xử lý”; nguy hiểm nếu chứa “từ chối”, “khóa”, “quá hạn”, “lỗi”, “vượt”) |
| Thời điểm | `date` | `dd MMM yyyy` theo `vi-VN` |
| (Thao tác) | — | Cột rỗng vì danh sách chỉ đọc |

- Không phân trang, không sắp xếp cột; bảng cuộn ngang khi hẹp.
- **Empty state**: biểu tượng `◫`, “Chưa có dữ liệu phù hợp”, gợi ý đổi bộ lọc; không có nút hành động.
- Bảng dùng đúng `.table-scroll` nên không gặp lỗi render như trang Kiểm duyệt nội dung.

### 4.7 Modal

- Markup modal có trong HTML nhưng `fields: []`, `readOnly: true`, `hideCreate: true`; không có nút nào mở modal.
- Đây là markup thừa, không thuộc luồng sử dụng của màn hình.

### 4.8 Phản hồi hệ thống

- Toast góc phải dưới, tự ẩn sau 3,5 giây, biến thể đỏ cho lỗi đọc dữ liệu.
- Không có thao tác ghi nên không có toast lưu thành công trên trang này.
- Không có loading/skeleton do đọc đồng bộ từ `localStorage`.

### 4.9 Footer và theme

- Footer: “SpendWise · Bản demo frontend · Dữ liệu lưu trên thiết bị này”.
- Nút Sáng/Tối cố định góc phải dưới, lưu ở `spendwise-theme`, áp `html[data-theme="dark"]`.

## 5. Dữ liệu và trạng thái

| Mục | Chi tiết |
|---|---|
| Bản ghi nhật ký | `id`, `actor`, `action`, `target`, `status`, `date` |
| Seed | “Huấn luyện viên gửi tài nguyên kiểm duyệt” (Chờ xử lý), “Nguyễn An tạo giao dịch” (Thành công) |
| Quyền | Chỉ đọc; không tạo, sửa, xóa trên màn hình này |
| Nguồn ghi | Các trang workspace khác ghi vào cùng `spendwise.auditLog`, giữ tối đa 500 dòng |
| Sắp xếp | Theo thứ tự mảng; bản ghi mới do trang khác chèn lên đầu |
| Xuất CSV | Toàn bộ bản ghi (không theo bộ lọc), cột `actor, action, target, status, date`, có BOM UTF-8 |
| Đồng bộ | Lắng nghe `spendwise:data` cùng khóa |

## 6. Tương tác

- Gõ tìm kiếm: lọc không phân biệt hoa thường theo tiếng Việt trên mọi giá trị.
- “Làm mới bộ lọc”: xóa từ khóa và render lại.
- “Mở nhật ký kiểm toán”: điều hướng tải lại trang với `?view=audit`.
- “Xuất dữ liệu”: tải CSV ngay trên trình duyệt.
- Chuyển tab: tải lại cùng trang, thay bộ CSS/JS theo `workspace-loader.js`.
- Bàn phím: tab điều hướng chuẩn; focus-visible 3 px màu accent.

## 7. Các trạng thái màn hình

| Trạng thái | Điều kiện | Hiển thị |
|---|---|---|
| Mặc định | Có dữ liệu | 4 thẻ + bảng đầy đủ |
| Lọc rỗng | Không bản ghi khớp | Bảng ẩn, empty state hiện |
| Đọc lỗi | `localStorage` hỏng/không đọc được | Danh sách rỗng + toast đỏ |
| Nhật ký | `?view=audit` | Cùng khung, tab “Nhật ký kiểm toán” active, dùng `audit.js` |
| Rỗng hoàn toàn | `auditLog` là mảng rỗng | Bảng rỗng + empty state; 4 thẻ vẫn hiển thị theo nguồn tương ứng |

## 8. Responsive

| Breakpoint | Thay đổi |
|---|---|
| ≥ 981 px | Bố cục mặc định, sidebar 244 px, stats 4 cột |
| ≤ 980 px | Sidebar 210 px; main/header/footer lùi theo; padding ngang 22 px; stats 2 cột |
| ≤ 700 px | Sidebar sticky full-width, nav cuộn ngang; ẩn nhãn vai trò và khối người dùng; header 48 px; view tabs `margin-top` 12 px, tab cao 36 px; page header xếp cột; nút hành động giãn đều; panel header căn trên |
| ≤ 420 px | Padding ngang 11 px; stats `gap` 7 px, thẻ 11 px, số 16 px; ô tìm kiếm rộng 100 % |

## 9. Design tokens

| Token | Giá trị | Dùng cho |
|---|---|---|
| `--ink` | `#192820` | Chữ chính |
| `--muted` | `#78867f` | Mô tả, chữ phụ |
| `--line` | `#e7ece8` | Viền, đường phân cách |
| `--paper` | `#f6f8f5` | Nền trang |
| `--surface` | `#fff` | Sidebar, panel, thẻ |
| `--green` | `#205c47` | Màu thương hiệu |
| `--accent` | `#62538f` | Nút, nav active, tab active |
| `--accent-soft` | `#f0edf8` | Nền nav active, badge, hover |
| `--danger` | `#b9584c` | Cảnh báo |

- Badge cảnh báo: `#fff4e3` / `#96691f`. Badge nguy hiểm: `#fbecea` / `#ab5146`.
- Font: Segoe UI, Tahoma, Verdana, Arial. Thang chữ 9 / 10 / 12 / 13 / 17 / 19 px + H1 clamp.
- Bo góc: 6 px ô nhập, 7 px nút, 9 px thẻ, 10 px panel, 12 px modal, 20 px badge.
- Bóng: modal `0 20px 70px #10231940`, toast `0 8px 30px #1e3a2b12`.

## 10. Tiếp cận

- Có `aside`, `header`, `main`, `footer`; nav có `aria-label="Điều hướng chính"`, mục active có `aria-current`.
- View tabs có `aria-label="Chế độ xem"`, tab active có `aria-current="page"`.
- Tiêu đề cột thao tác ẩn bằng `.visually-hidden`.
- Toast có `aria-live="polite"`; focus-visible toàn cục 3 px.
- Bảng thiếu `scope="col"` trên `<th>`.

## 11. Ghi chú triển khai

- **Một URL, hai chế độ**: `dashboard.html` là trang host; `workspace-loader.js` đọc `?view=` và ghi thẻ CSS/JS tương ứng. HTML tĩnh luôn là bố cục tổng quan, còn `audit.js` chỉ thay dữ liệu, thẻ và bảng — **không đổi H1, breadcrumb hay tiêu đề panel**. Vì vậy khi xem nhật ký, tiêu đề vẫn là “Tổng quan hệ thống” và panel vẫn là “Hoạt động hệ thống gần đây”; đây là điểm lệch nội dung cần lưu ý khi chụp minh chứng.
- **Điều hướng bị JS thay đổi**: 6 mục tĩnh bị ghi đè còn 3 mục (Tổng hệ thống, Cấu hình, Tài khoản). Các alias `audit.html → dashboard.html?view=audit`, `permissions.html → users.html?view=permissions`, `settings.html → categories.html?view=settings` không còn hiển thị trên sidebar.
- **Trùng đường dẫn chuyển nhật ký**: nút “Mở nhật ký kiểm toán” trỏ trực tiếp `dashboard.html?view=audit`, trong khi `workspace-tabs.js` cũng ánh xạ `audit.html` sang cùng URL; nên chọn một cách để tránh sai lệch sau này.
- **Số “Nội dung chờ duyệt” đang hard-code 2**, không phản ánh dữ liệu thật; nếu muốn chính xác phải đếm từ `spendwise.resources` theo trạng thái “Chờ duyệt”.
- **Danh sách chỉ đọc nhưng vẫn có cột thao tác rỗng** và modal không dùng; có thể bỏ để giảm nhiễu.
- **Không có lọc theo trạng thái/kết quả** dù cột “Kết quả” có nhiều giá trị; chỉ có tìm kiếm từ khóa.
- **Không có loading**; lỗi đọc dữ liệu chỉ báo bằng toast, không có khối lỗi trong panel.
- **Bảng thiếu `scope="col"`**; dòng đếm không có `aria-live`.
