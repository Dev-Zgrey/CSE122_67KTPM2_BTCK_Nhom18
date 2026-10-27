# budget.html layout
```text
.container.bud-page
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
│   │   ├── .avatar
│   │   ├── .identity-text
│   │   └── .settings-link
│   └── .side-links
├── .header
│   ├── .breadcrumb
│   │   └── .breadcrumb-separator
│   └── .head-actions
│       ├── .date-label
│       ├── .icon-button
│       └── .avatar.avatar-small
├── .main
│   ├── .pg-header
│   │   ├── .pg-heading
│   │   │   └── .eyebrow
│   │   └── .action
│   │       └── .button.button-primary
│   ├── .stats-grid.stats-grid-three
│   │   └── .stat-card (3 thẻ)
│   │       ├── .stat-card-top
│   │       │   └── .stat-icon
│   │       │       ├── .stat-icon-blue
│   │       │       ├── .stat-icon-coral
│   │       │       └── .stat-icon-green
│   │       ├── .stat-value
│   │       └── .stat-note
│   │           └── .stat-caption
│   └── .pg-content.bud-content
│       ├── .bud-toolbar
│       │   ├── .month-switcher
│       │   │   └── .icon-button
│       │   └── .text-link
│       ├── .bud-overview.panel
│       │   ├── .ov-copy
│       │   │   └── .eyebrow
│       │   └── .ov-total
│       │       └── .progress-track.progress-track-large
│       │           └── .progress-fill
│       ├── .bud-list-heading
│       │   └── .select-field
│       │       └── .visually-hidden
│       ├── .bud-card-list
│       └── .empty-stat.panel
│           ├── .empty-stat-icon
│           └── .button.button-primary
├── .footer
├── .modal-backdrop
│   └── .modal
│       ├── .modal-heading
│       │   ├── .eyebrow
│       │   └── .icon-button.modal-close
│       └── .form-grid
│           ├── .form-field.form-field-full
│           │   └── .field-label
│           ├── .form-error.form-field-full
│           └── .modal-action.form-field-full
│               ├── .button.button-secondary
│               └── .button.button-primary
└── .toast-region
```

## Tiếng Việt

```text
.container.bud-page — khung gốc trang
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
│   │   ├── .avatar — ảnh đại diện
│   │   ├── .identity-text — tên và vai trò
│   │   └── .settings-link — liên kết cài đặt
│   └── .side-links — liên kết hồ sơ và thông báo
├── .header — phần đầu trang
│   ├── .breadcrumb — vị trí hiện tại
│   │   └── .breadcrumb-separator — dấu phân cách đường dẫn
│   └── .head-actions — thao tác đầu trang
│       ├── .date-label — ngày hiện tại
│       ├── .icon-button — nút thông báo
│       └── .avatar.avatar-small — ảnh đại diện nhỏ
├── .main — nội dung chính
│   ├── .pg-header — tiêu đề và thao tác trang
│   │   ├── .pg-heading — nội dung tiêu đề
│   │   │   └── .eyebrow — nhãn chủ đề
│   │   └── .action — nhóm nút thao tác
│   │       └── .button.button-primary — tạo ngân sách
│   ├── .stats-grid.stats-grid-three — lưới 3 chỉ số
│   │   └── .stat-card (3 thẻ) — thẻ tổng hạn mức, đã chi, còn lại
│   │       ├── .stat-card-top — nhãn và biểu tượng thẻ
│   │       │   └── .stat-icon — biểu tượng chỉ số
│   │       │       ├── .stat-icon-blue — kiểu biểu tượng xanh dương
│   │       │       ├── .stat-icon-coral — kiểu biểu tượng san hô
│   │       │       └── .stat-icon-green — kiểu biểu tượng xanh lá
│   │       ├── .stat-value — giá trị chỉ số
│   │       └── .stat-note — ghi chú bổ sung
│   │           └── .stat-caption — nội dung ghi chú
│   └── .pg-content.bud-content — nội dung ngân sách
│       ├── .bud-toolbar — thanh công cụ chọn tháng
│       │   ├── .month-switcher — bộ chuyển tháng
│       │   │   └── .icon-button — nút tháng trước/sau
│       │   └── .text-link — liên kết "Tháng hiện tại"
│       ├── .bud-overview.panel — khung tổng quan ngân sách
│       │   ├── .ov-copy — câu nhận xét tổng quan
│       │   │   └── .eyebrow — nhãn tháng
│       │   └── .ov-total — tổng đã chi và phần trăm
│       │       └── .progress-track.progress-track-large — thanh tiến độ lớn
│       │           └── .progress-fill — phần đã sử dụng
│       ├── .bud-list-heading — tiêu đề danh sách ngân sách
│       │   └── .select-field — bộ chọn tháng
│       │       └── .visually-hidden — nhãn ẩn hỗ trợ truy cập
│       ├── .bud-card-list — danh sách thẻ ngân sách theo danh mục
│       └── .empty-stat.panel — trạng thái chưa có ngân sách
│           ├── .empty-stat-icon — biểu tượng trạng thái rỗng
│           └── .button.button-primary — tạo ngân sách
├── .footer — chân trang
├── .modal-backdrop — lớp phủ hộp thoại
│   └── .modal — hộp thoại tạo/sửa ngân sách
│       ├── .modal-heading — tiêu đề hộp thoại
│       │   ├── .eyebrow — nhãn chủ đề hộp thoại
│       │   └── .icon-button.modal-close — nút đóng
│       └── .form-grid — biểu mẫu ngân sách
│           ├── .form-field.form-field-full — trường toàn chiều rộng
│           │   └── .field-label — nhãn trường
│           ├── .form-error.form-field-full — thông báo lỗi kiểm tra dữ liệu
│           └── .modal-action.form-field-full — nhóm nút của hộp thoại
│               ├── .button.button-secondary — hủy
│               └── .button.button-primary — lưu ngân sách
└── .toast-region — thông báo tạm thời
```
