# ai.html layout
```text
.container
├── .sidebar
│   ├── .brand
│   │   └── .brand-mark
│   ├── .role-label
│   ├── .nav
│   │   ├── .nav-link
│   │   │   └── .nav-icon
│   │   └── .nav-link.is-active
│   │       └── .nav-icon
│   ├── .side-bottom
│   │   ├── .identity
│   │   │   ├── .avatar
│   │   │   └── .identity-text
│   │   └── .side-links
├── .header
│   ├── .breadcrumb
│   └── .head-actions
│       └── .button.button-quiet
├── .main
│   ├── .pg-header
│   │   ├── .eyebrow
│   │   └── .action
│   │       ├── .button
│   │       └── .button.button-secondary
│   ├── .stats-grid
│   │   └── .stat-card
│   ├── .panel
│   │   ├── .panel-header
│   │   ├── .filter-bar
│   │   │   └── .button.button-quiet
│   │   ├── .table-scroll
│   │   │   └── .table
│   │   │       └── .visually-hidden
│   │   └── .empty
│   │       └── .button
├── .footer
├── .modal-backdrop
│   └── .modal
│       ├── .modal-header
│       │   └── .icon-button
│       └── .form-grid
│           ├── .field
│           ├── .field.field-full
│           ├── .field.field-full (lỗi)
│           └── .modal-action.field-full
│               ├── .button.button-secondary
│               └── .button
└── .toast-region
```

## Tiếng Việt

```text
.container — khung gốc trang
├── .sidebar — thanh điều hướng bên
│   ├── .brand — liên kết thương hiệu
│   │   └── .brand-mark — biểu tượng logo
│   ├── .role-label — nhãn vai trò người dùng
│   ├── .nav — điều hướng chính
│   │   ├── .nav-link — liên kết điều hướng
│   │   │   └── .nav-icon — biểu tượng liên kết
│   │   └── .nav-link.is-active — liên kết trang hiện tại
│   │       └── .nav-icon — biểu tượng liên kết
│   ├── .side-bottom — phần dưới thanh bên
│   │   ├── .identity — thông tin người dùng
│   │   │   ├── .avatar — ảnh đại diện
│   │   │   └── .identity-text — tên và vai trò
│   │   └── .side-links — liên kết hồ sơ, cài đặt, thông báo
├── .header — phần đầu trang
│   ├── .breadcrumb — vị trí hiện tại
│   └── .head-actions — thao tác đầu trang
│       └── .button.button-quiet — nút đăng xuất
├── .main — nội dung chính
│   ├── .pg-header — tiêu đề và thao tác trang
│   │   ├── .eyebrow — nhãn chủ đề
│   │   └── .action — nhóm nút thao tác
│   │       ├── .button — thêm đề xuất
│   │       └── .button.button-secondary — xuất dữ liệu
│   ├── .stats-grid — lưới thống kê
│   │   └── .stat-card — thẻ thống kê
│   ├── .panel — khung danh sách đề xuất
│   │   ├── .panel-header — tiêu đề khung và số lượng
│   │   ├── .filter-bar — thanh tìm kiếm và bộ lọc
│   │   │   └── .button.button-quiet — làm mới bộ lọc
│   │   ├── .table-scroll — vùng cuộn của bảng
│   │   │   └── .table — bảng đề xuất
│   │   │       └── .visually-hidden — nhãn ẩn hỗ trợ truy cập
│   │   └── .empty — trạng thái không có dữ liệu
│   │       └── .button — thêm đề xuất
├── .footer — chân trang
├── .modal-backdrop — lớp phủ hộp thoại
│   └── .modal — hộp thoại thêm/sửa đề xuất
│       ├── .modal-header — tiêu đề hộp thoại
│       │   └── .icon-button — nút đóng
│       └── .form-grid — biểu mẫu đề xuất
│           ├── .field — trường thông thường
│           ├── .field.field-full — trường toàn chiều rộng
│           ├── .field.field-full (lỗi) — thông báo lỗi kiểm tra dữ liệu
│           └── .modal-action.field-full — nhóm nút của hộp thoại
│               ├── .button.button-secondary — hủy
│               └── .button — lưu thay đổi
└── .toast-region — thông báo tạm thời
```
