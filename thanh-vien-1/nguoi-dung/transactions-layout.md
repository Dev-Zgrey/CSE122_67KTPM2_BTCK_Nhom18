# Transactions Page Layout / Cây bố cục trang Giao dịch
```text
.container.tx-page — page root
├── .sidebar — side navigation
│   ├── .brand — brand link
│   │   └── .brand-mark — logo mark
│   ├── .side-label — user role
│   ├── .side-nav — primary navigation
│   │   ├── .nav-item — navigation link
│   │   │   └── .nav-icon — link icon
│   │   └── .nav-item.is-active — current page link
│   ├── .side-account — account summary
│   │   ├── .avatar — account avatar
│   │   ├── .acc-profile — account name and type
│   │   └── .settings-link — settings link
│   └── .side-links — profile and notifications links
├── .header — page header
│   ├── .breadcrumb — current location
│   │   └── .breadcrumb-separator — breadcrumb separator
│   └── .acc-area — date and account actions
│       ├── .date-label — current date
│       ├── .icon-button — notifications button
│       └── .avatar.avatar-small — small avatar
├── .main — main content
│   ├── .pg-header — title and page actions
│   │   ├── .pg-heading — heading content
│   │   │   └── .eyebrow — section label
│   │   └── .pg-actions — export and add actions
│   │       ├── .button.button-secondary — export
│   │       └── .button.button-primary — add transaction
│   ├── .sum-grid.sum-grid-three — monthly summary
│   │   └── .sum-card (3 cards) — one metric card
│   │       ├── .sum-card-top — card label and icon
│   │       │   └── .sum-icon — metric icon
│   │       │       ├── .sum-icon-green — income icon style
│   │       │       ├── .sum-icon-coral — expense icon style
│   │       │       └── .sum-icon-blue — transaction icon style
│   │       ├── .sum-value — metric value
│   │       └── .sum-note — supporting note
│   │           └── .metric-caption — note text
│   └── .pg-content.tx-content — transaction content
│       └── .panel.tx-panel — transaction panel
│           ├── .panel-heading.panel-heading-table — panel title and count
│           │   └── .table-heading-action — heading action
│           │       └── .button.button-quiet — clear filters
│           ├── .filter-area.tx-filters — search and filters
│           │   ├── .search-field — search input
│           │   └── .select-field (3 filters) — filter controls
│           │       └── .visually-hidden — accessible label
│           └── .table-scroll — table and empty state area
│               ├── .data-table — transaction table
│               │   └── th.amount-column — amount column
│               └── .empty-stat — no-results message
│                   ├── .empty-stat-icon — empty-state icon
│                   └── .button.button-primary — add transaction
├── .footer — page footer
├── .modal-backdrop — dialog backdrop
│   └── .modal — add/edit transaction dialog
│       ├── .modal-heading — dialog heading
│       │   └── .eyebrow — dialog section label
│       ├── .icon-button.modal-close — close button
│       └── .form-grid — transaction form
│           ├── .form-field.form-field-full — full-width form field
│           │   └── .segment-control — transaction type selector
│           ├── .form-field — regular form field
│           │   ├── .field-label — field label
│           │   └── .field-option — optional note
│           ├── .form-error.form-field-full — validation message
│           └── .modal-action.form-field-full — dialog actions
│               ├── .button.button-secondary — cancel
│               └── .button.button-primary — save
└── .toast-region — temporary notifications
```

## Tiếng Việt

```text
.container.tx-page — khung gốc trang
├── .sidebar — thanh điều hướng bên
│   ├── .brand — liên kết thương hiệu
│   │   └── .brand-mark — biểu tượng logo
│   ├── .side-label — vai trò người dùng
│   ├── .side-nav — điều hướng chính
│   │   ├── .nav-item — liên kết điều hướng
│   │   │   └── .nav-icon — biểu tượng liên kết
│   │   └── .nav-item.is-active — liên kết trang hiện tại
│   ├── .side-account — thông tin tài khoản
│   │   ├── .avatar — ảnh đại diện tài khoản
│   │   ├── .acc-profile — tên và loại tài khoản
│   │   └── .settings-link — liên kết cài đặt
│   └── .side-links — liên kết hồ sơ và thông báo
├── .header — phần đầu trang
│   ├── .breadcrumb — vị trí hiện tại
│   │   └── .breadcrumb-separator — dấu phân cách đường dẫn
│   └── .acc-area — ngày và thao tác tài khoản
│       ├── .date-label — ngày hiện tại
│       ├── .icon-button — nút thông báo
│       └── .avatar.avatar-small — ảnh đại diện nhỏ
├── .main — nội dung chính
│   ├── .pg-header — tiêu đề và thao tác trang
│   │   ├── .pg-heading — nội dung tiêu đề
│   │   │   └── .eyebrow — nhãn chủ đề
│   │   └── .pg-actions — thao tác xuất và thêm
│   │       ├── .button.button-secondary — xuất dữ liệu
│   │       └── .button.button-primary — thêm giao dịch
│   ├── .sum-grid.sum-grid-three — tóm tắt tháng
│   │   └── .sum-card (3 thẻ) — một thẻ chỉ số
│   │       ├── .sum-card-top — nhãn và biểu tượng thẻ
│   │       │   └── .sum-icon — biểu tượng chỉ số
│   │       │       ├── .sum-icon-green — kiểu biểu tượng thu nhập
│   │       │       ├── .sum-icon-coral — kiểu biểu tượng chi tiêu
│   │       │       └── .sum-icon-blue — kiểu biểu tượng giao dịch
│   │       ├── .sum-value — giá trị chỉ số
│   │       └── .sum-note — ghi chú bổ sung
│   │           └── .metric-caption — nội dung ghi chú
│   └── .pg-content.tx-content — nội dung giao dịch
│       └── .panel.tx-panel — khung giao dịch
│           ├── .panel-heading.panel-heading-table — tiêu đề khung và số lượng
│           │   └── .table-heading-action — thao tác tiêu đề
│           │       └── .button.button-quiet — xóa bộ lọc
│           ├── .filter-area.tx-filters — tìm kiếm và bộ lọc
│           │   ├── .search-field — ô tìm kiếm
│           │   └── .select-field (3 bộ lọc) — các điều khiển lọc
│           │       └── .visually-hidden — nhãn hỗ trợ truy cập
│           └── .table-scroll — khu vực bảng và trạng thái rỗng
│               ├── .data-table — bảng giao dịch
│               │   └── th.amount-column — cột số tiền
│               └── .empty-stat — thông báo không có kết quả
│                   ├── .empty-stat-icon — biểu tượng trạng thái rỗng
│                   └── .button.button-primary — thêm giao dịch
├── .footer — chân trang
├── .modal-backdrop — lớp phủ hộp thoại
│   └── .modal — hộp thoại thêm/sửa giao dịch
│       ├── .modal-heading — tiêu đề hộp thoại
│       │   └── .eyebrow — nhãn chủ đề hộp thoại
│       ├── .icon-button.modal-close — nút đóng
│       └── .form-grid — biểu mẫu giao dịch
│           ├── .form-field.form-field-full — trường toàn chiều rộng
│           │   └── .segment-control — bộ chọn loại giao dịch
│           ├── .form-field — trường thông thường
│           │   ├── .field-label — nhãn trường
│           │   └── .field-option — ghi chú tùy chọn
│           ├── .form-error.form-field-full — thông báo kiểm tra dữ liệu
│           └── .modal-action.form-field-full — thao tác hộp thoại
│               ├── .button.button-secondary — hủy
│               └── .button.button-primary — lưu
└── .toast-region — thông báo tạm thời
```

### Dynamically added classes / Class được thêm động

`transactions.js` adds these classes to each transaction row:

`transactions.js` thêm các class này vào từng dòng giao dịch:

```text
.tx-table
├── .category-icon
│   └── .category-icon-income
├── .category-tag
├── .amount-cell
│   └── .amount-cell-income
└── .row-action-icon
    ├── .row-action
    └── .row-action-delete
```

`data-*` attributes such as `data-tx-rows` are JavaScript hooks, not CSS classes.

Các thuộc tính `data-*` như `data-tx-rows` là móc nối cho JavaScript, không phải class CSS.
