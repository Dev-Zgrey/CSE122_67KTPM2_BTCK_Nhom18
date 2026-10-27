# Layout – Kiểm duyệt nội dung (`resources`)

> Vai trò Kiểm duyệt viên · Desktop-first, responsive tới 320 px · HTML/CSS/JavaScript thuần · Dữ liệu `localStorage`
>
> Nguồn: `thanh-vien-3/kiem-duyet-vien/resources.html`, `resources.css`, `resources.js`

## 1. Định danh màn hình

| Mục | Giá trị |
|---|---|
| URL | `thanh-vien-3/kiem-duyet-vien/resources.html` |
| Vai trò | `moderator` – Kiểm duyệt viên |
| Tiêu đề tab | Kiểm duyệt nội dung |
| Breadcrumb | Kiểm duyệt viên / Kiểm duyệt nội dung |
| Khóa lưu trữ | `spendwise.resources` (2 bản ghi seed) |
| Nhật ký phụ | `spendwise.auditLog` (ghi sau mỗi lần lưu trạng thái/nội dung) |
| Shell dùng chung | Nạp `workspace-tabs.js`, `workspace-tabs.css`; `darkmode.css` được chèn tự động |
| Chế độ xem | Không sinh thanh `view-tabs`; tham số `?view=` không đổi nội dung |
| Xuất dữ liệu | CSV UTF-8, tên `moderator-resource-review-YYYY-MM-DD.csv` |

## 2. Sơ đồ bố cục

### Desktop (≥ 981 px)

```
┌──────────────────┬───────────────────────────────────────────────┐
│ SIDEBAR 244 px   │ HEADER 63 px                                  │
│ SpendWise        │ Kiểm duyệt viên / Kiểm duyệt nội dung  An + Đăng xuất │
│ KIỂM DUYỆT VIÊN  ├───────────────────────────────────────────────┤
│ • Duyệt nội dung │ PAGE HEADER                                   │
│   (active)       │ EYEBROW                                       │
│ • Mẫu AI         │ Kiểm duyệt nội dung          [Xuất dữ liệu]   │
│ • Báo cáo        │ Mô tả ngắn                                    │
│ • Kiểm tra AI    ├───────────────────────────────────────────────┤
│                  │ STATS: 4 thẻ đều nhau                         │
│                  │ [Tổng số] [Đang hiển thị] [Hoạt động] [Cần xử lý]
│                  ├───────────────────────────────────────────────┤
│                  │ PANEL                                         │
│                  │  Kiểm duyệt nội dung · 2 mục · 2 tổng cộng    │
│                  │  [Tìm kiếm..............] [Trạng thái ▾] [Làm mới]
│                  │  ┌──────────┬──────┬─────────┬────────┬───────┐│
│                  │  │Tài nguyên│ Loại │ Đối tượng│Cập nhật│Trạng thái│ [Trạng thái ▾] ✎ │
│                  │  ├──────────┼──────┼─────────┼────────┼───────┤│
│                  │  │ ...      │ ...  │ ...     │ ...    │ badge ││
│                  │  └──────────┴──────┴─────────┴────────┴───────┘│
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
│ [Xuất dữ liệu]               │
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

## 4. Thành phần giao diện

### 4.1 Sidebar

- **Brand**: ô chữ `S` nền xanh chanh + chữ SpendWise, liên kết về trang chủ.
- **Nhãn vai trò**: “KIỂM DUYỆT VIÊN”, chữ hoa 10 px.
- **Điều hướng tĩnh** (4 mục): Duyệt nội dung (active), Mẫu AI, Báo cáo, Kiểm tra AI.
- **Điều hướng sau khi JS chạy** (3 mục): Duyệt nội dung, AI, Báo cáo — mục “Kiểm tra AI” bị thay thế, xem mục 11.
- **Khối cuối**: avatar viết tắt, tên + vai trò, liên kết Hồ sơ / Cài đặt / Thông báo.

### 4.2 Header

- Trái: breadcrumb “Kiểm duyệt viên / Kiểm duyệt nội dung”.
- Phải: tên người dùng và nút “Đăng xuất” kiểu quiet.
- Đăng xuất xóa `spendwise.session` rồi chuyển về `login.html`.

### 4.3 Page header

- Eyebrow “Kiểm duyệt viên”, H1 “Kiểm duyệt nội dung”, mô tả “Kiểm duyệt nội dung, ghi lý do và cập nhật trạng thái kiểm duyệt.”
- Nhóm hành động bên phải chỉ có nút phụ “Xuất dữ liệu”; **không có nút tạo mới** trên giao diện.
- Wrapper dùng class `.actions` (số nhiều) trong khi CSS chỉ định nghĩa `.action` (số ít), xem mục 11.

### 4.4 Thẻ thống kê

Render động từ `config.stats` mặc định (không khai báo riêng):

| Thẻ | Công thức |
|---|---|
| Tổng số | Tổng bản ghi |
| Đang hiển thị | Số bản ghi sau tìm kiếm + lọc |
| Đang hoạt động | Bản ghi không có trạng thái hoặc trạng thái khớp `/đang|hoạt động|đã duyệt|đã trả lời|mới/` |
| Cần xử lý | Trạng thái khớp `/chờ|cần bổ sung|mới|đang xử lý|cần xem xét/` |

Với dữ liệu seed: 2 / 2 / 0 / 1. Thẻ gồm nhãn 9 px và số 19 px, `padding: 14px 15px`, bo 9 px.

### 4.5 Panel danh sách

- **Panel header**: tiêu đề “Kiểm duyệt nội dung” và dòng đếm `N mục · M tổng cộng`.
- **Filter bar**:
  - Ô tìm kiếm chiếm phần còn lại, rộng tối thiểu 170 px, lọc khi gõ.
  - Select trạng thái: Tất cả, Bản nháp, Chờ duyệt, Đã xuất bản, Cần chỉnh sửa, Đã lưu trữ.
  - Nút quiet “Làm mới bộ lọc”.
- **Bảng** (5 cột dữ liệu + 1 cột thao tác):

| Cột | Nội dung | Định dạng |
|---|---|---|
| Tài nguyên | `title` | Chữ đậm |
| Loại | `type` | Văn bản |
| Đối tượng | `audience` | Văn bản |
| Cập nhật | `updatedAt` | `dd MMM yyyy` theo `vi-VN` |
| Trạng thái | `status` | Badge bo tròn 20 px |
| (Thao tác) | Select trạng thái nội tuyến + nút Sửa | Select rộng tối đa 125 px, cao 26 px |

- Không có nút xóa, không có nút tạo mới, không phân trang.
- **Empty state**: biểu tượng `✓`, “Chưa có dữ liệu phù hợp”, gợi ý đổi bộ lọc; không có nút hành động.
- Wrapper bảng dùng `.table-scroll`, khớp với CSS và hàm `render()`.

### 4.6 Modal sửa

- Không có nút tạo mới; modal chỉ mở từ nút sửa trên dòng, tiêu đề “Sửa tài nguyên”.
- Nền mờ `rgba(20, 38, 27, .42)` + blur, đóng khi bấm nền hoặc `Escape`.
- Lưới form 2 cột:

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| Tiêu đề | text | Có | |
| Loại nội dung | text | Có | Chuỗi tự do |
| Đối tượng | text | Có | Chuỗi tự do |
| Trạng thái | select | Có | 5 trạng thái |
| Tóm tắt | text | Có | Một dòng |
| Lý do / yêu cầu chỉnh sửa | textarea | Không | Full-width, dùng cho phản hồi kiểm duyệt |
| Vùng lỗi | text | — | `role="alert"` |
| Hành động | — | — | Hủy + Lưu thay đổi, căn phải |

- Các trường không có trong form (`objective`, `content`, `exercise`, `tags`) được giữ nguyên khi lưu vì bản ghi cũ được trải trước dữ liệu mới.
- Tiêu đề mặc định trong markup là “Tạo tài nguyên” nhưng không có luồng tạo mới nào mở modal ở trạng thái này.

### 4.7 Phản hồi hệ thống

- **Toast** góc phải dưới, tự ẩn sau 3,5 giây, biến thể đỏ cho lỗi.
- Thông điệp: cập nhật dữ liệu, cập nhật trạng thái, lỗi đọc/ghi.
- Không có xác nhận xóa vì đã ẩn nút xóa.
- Không có loading/skeleton do đọc đồng bộ từ `localStorage`.

### 4.8 Footer và theme

- Footer: “SpendWise · Bản demo frontend · Dữ liệu lưu trên thiết bị này”.
- Nút đổi Sáng/Tối cố định góc phải dưới, trạng thái lưu ở `spendwise-theme`.

## 5. Dữ liệu và trạng thái

| Mục | Chi tiết |
|---|---|
| Bản ghi | `id`, `title`, `type`, `audience`, `status`, `summary`, `moderationNote`, `objective`, `content`, `exercise`, `tags`, `updatedAt` |
| Seed | “Lập ngân sách 50/30/20” (Bài học, Chờ duyệt), “Xây dựng quỹ dự phòng” (Hướng dẫn, Đã xuất bản) |
| Trạng thái hợp lệ | Bản nháp, Chờ duyệt, Đã xuất bản, Cần chỉnh sửa, Đã lưu trữ |
| Sắp xếp | Bản ghi mới lên đầu; bản ghi sửa giữ nguyên vị trí |
| Nhật ký | Mỗi lần lưu thêm `{actor, action: "Cập nhật dữ liệu", target: "Kiểm duyệt nội dung", status: "Thành công", date}` vào `auditLog`, tối đa 500 dòng |
| Xuất CSV | Toàn bộ bản ghi (không theo bộ lọc), cột `title, type, audience, updatedAt, status`, có BOM UTF-8 |
| Đồng bộ | Lắng nghe `spendwise:data` cùng khóa để render lại |

## 6. Tương tác

- Gõ tìm kiếm: lọc không phân biệt hoa thường theo tiếng Việt trên mọi giá trị.
- Chọn trạng thái: kết hợp AND với tìm kiếm.
- Đổi trạng thái nội tuyến: lưu ngay, hiện toast.
- Sửa: mở modal, cập nhật bản ghi và `updatedAt`.
- Xuất dữ liệu: tải CSV.
- Bàn phím: `Escape` đóng modal; focus-visible 3 px màu accent.
- Không có thao tác xóa hoặc tạo mới trong cấu hình hiện tại.

## 7. Các trạng thái màn hình

| Trạng thái | Điều kiện | Hiển thị |
|---|---|---|
| Mặc định | Có dữ liệu | 4 thẻ + bảng đầy đủ |
| Lọc rỗng | Không bản ghi khớp | Bảng ẩn, empty state hiện |
| Đọc lỗi | `localStorage` hỏng/không đọc được | Danh sách rỗng + toast đỏ |
| Ghi lỗi | `setItem` thất bại | Hoàn tác + toast đỏ |
| Thành công | Sửa/đổi trạng thái | Toast xanh, thẻ và bảng cập nhật |

## 8. Responsive

| Breakpoint | Thay đổi |
|---|---|
| ≥ 981 px | Bố cục mặc định, sidebar 244 px, stats 4 cột |
| ≤ 980 px | Sidebar 210 px; main/header/footer lùi theo; padding ngang 22 px; stats 2 cột |
| ≤ 700 px | Sidebar sticky full-width, nav cuộn ngang; ẩn nhãn vai trò và khối người dùng; header 48 px; page header xếp cột; panel header căn trên |
| ≤ 420 px | Padding ngang 11 px; stats `gap` 7 px, thẻ 11 px; form 1 cột; ô tìm kiếm rộng 100 % |

Lưu ý: quy tắc `≤ 700 px` làm nút hành động giãn đều chỉ áp dụng cho `.action`, không áp dụng cho `.actions` đang dùng ở trang này.

## 9. Design tokens

| Token | Giá trị | Dùng cho |
|---|---|---|
| `--ink` | `#192820` | Chữ chính |
| `--muted` | `#78867f` | Mô tả, chữ phụ |
| `--line` | `#e7ece8` | Viền, đường phân cách |
| `--paper` | `#f6f8f5` | Nền trang |
| `--surface` | `#fff` | Sidebar, panel, thẻ |
| `--green` | `#205c47` | Màu thương hiệu |
| `--accent` | `#62538f` | Nút chính, nav active, badge |
| `--accent-soft` | `#f0edf8` | Nền nav active, badge, hover |
| `--danger` | `#b9584c` | Cảnh báo |

- Badge cảnh báo: `#fff4e3` / `#96691f`. Badge nguy hiểm: `#fbecea` / `#ab5146`.
- Font: Segoe UI, Tahoma, Verdana, Arial. Thang chữ 9 / 10 / 12 / 13 / 17 / 19 px + H1 clamp.
- Bo góc: 6 px ô nhập, 7 px nút, 9 px thẻ, 10 px panel, 12 px modal, 20 px badge.

## 10. Tiếp cận

- Có `aside`, `header`, `main`, `footer`; nav có `aria-label`; mục active có `aria-current`.
- Select trạng thái trên dòng có `aria-label="Cập nhật trạng thái"`; nút icon có `aria-label` + `title`.
- Modal dùng `role="dialog"`, `aria-modal`, `aria-labelledby`; đóng bằng `Escape`.
- Toast có `aria-live="polite"`; tiêu đề cột thao tác ẩn bằng `.visually-hidden`.
- Focus-visible toàn cục 3 px.

## 11. Ghi chú triển khai

- **Wrapper bảng**: trước đây HTML dùng `table-roll` lệch với `.table-scroll` khiến `render()` ném lỗi và bảng không hiển thị; đã đổi sang `table-scroll` và kiểm chứng trên trình duyệt (thẻ 2/2/0/1, 2 dòng dữ liệu, không lỗi console).
- **Class hành động sai**: `.actions` không có trong CSS; chỉ `.action` được định nghĩa. Hiện chỉ có một nút nên ít ảnh hưởng, nhưng trên mobile nút không giãn đều như trang Mẫu AI.
- **Điều hướng bị JS thay đổi**: HTML có 4 mục, `workspace-tabs.js` ghi đè còn 3 mục (Duyệt nội dung, AI, Báo cáo); “Kiểm tra AI” bị bỏ khỏi sidebar.
- **Chưa nối chế độ xem**: trang không nạp `workspace-loader.js`, không có `data-workspace-group`, nên không sinh `view-tabs`; bảng kiểm kê mô tả `?view=library|editor` là của trang Huấn luyện viên, không phải trang này.
- **Modal tạo mới là markup thừa**: `hideCreate: true` và không có nút `[data-create]`; modal chỉ dùng để sửa.
- **Bảng không hiển thị `summary`/`moderationNote`**: hai trường này chỉ có trong modal, người kiểm duyệt không đọc được tóm tắt trên danh sách.
- **Nhãn form chưa gắn lập trình**: `<label>` không có `for` và không bọc ô nhập.
- **Bảng thiếu `scope="col"`** trên `<th>`.
- Không kiểm tra trùng tiêu đề, không giới hạn độ dài; `type` và `audience` là chuỗi tự do thay vì select.
