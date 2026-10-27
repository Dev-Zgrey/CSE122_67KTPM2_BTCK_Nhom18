```text
.container.dashboard
├── .sidebar
│   ├── .brand
│   │   └── .brand-mark
│   ├── .side-label
│   ├── .side-nav
│   │   ├── .nav-item.is-active
│   │   │   └── .nav-icon
│   │   └── .nav-item
│   │       └── .nav-icon
│   ├── .side-account
│   │   ├── .avatar
│   │   ├── .acc-profile
│   │   └── .settings-link
│   └── .side-links
├── .header
│   ├── .breadcrumb
│   │   └── .breadcrumb-separator
│   └── .acc-area
│       ├── .date-label
│       ├── .icon-button
│       └── .avatar.avatar-small
├── .main
│   ├── .pg-header
│   │   ├── .pg-heading
│   │   │   ├── .eyebrow
│   │   │   └── .wave
│   │   └── .pg-actions
│   │       ├── .button.button-secondary
│   │       └── .button.button-primary
│   ├── .sum-grid
│   │   ├── .sum-card.sum-card-balance
│   │   │   ├── .sum-card-top
│   │   │   │   └── .sum-icon
│   │   │   ├── .sum-value
│   │   │   └── .sum-note
│   │   │       └── .trend.trend-positive
│   │   └── .sum-card
│   │       ├── .sum-card-top
│   │       │   ├── .sum-icon.sum-icon-green
│   │       │   ├── .sum-icon.sum-icon-coral
│   │       │   └── .sum-icon.sum-icon-blue
│   │       ├── .sum-value
│   │       └── .sum-note
│   │           └── .metric-caption
│   └── .dashboard-grid
│       ├── .panel.spending-panel
│       │   ├── .panel-heading
│       │   ├── .chart-legend
│       │   │   ├── .legend-dot.legend-dot-income
│       │   │   └── .legend-dot.legend-dot-expense
│       │   └── .chart-area
│       │       └── .chart-mon
│       │           ├── .chart-label
│       │           │   ├── .chart-bar
│       │           │   └── .chart-bar.chart-bar-expense
│       │           └── .chart-mon-label
│       ├── .panel.bud-panel
│       │   ├── .panel-heading
│       │   │   └── .text-link
│       │   ├── .bud-total
│       │   ├── .progress-track
│       │   │   ├── .progress-fill
│       │   │   ├── .progress-fill.is-warning
│       │   │   └── .progress-fill.is-over-limit
│       │   ├── .bud-remaining
│       │   └── .bud-category-list
│       │       ├── .bud-category-row
│       │       │   ├── .bud-category-name
│       │       │   ├── .bud-category-amount
│       │       │   └── .progress-track
│       │       │       ├── .progress-fill
│       │       │       ├── .progress-fill.is-warning
│       │       │       └── .progress-fill.is-over-limit
│       │       └── .empty-inline
│       │           └── .text-link
│       ├── .panel.recent-panel
│       │   ├── .panel-heading
│       │   │   └── .text-link
│       │   └── .recent-list
│       │       ├── .recent-item
│       │       │   ├── .category-icon
│       │       │   ├── .category-icon.category-icon-income
│       │       │   ├── .recent-info
│       │       │   ├── .recent-amount.recent-amount-income
│       │       │   └── .recent-amount.recent-amount-expense
│       │       └── .empty-inline
│       └── .panel.insight-panel
│           ├── .insight-decoration
│           ├── .eyebrow
│           └── .insight-link
├── .footer
└── .toast-region
```

## Tiếng Việt

```text
.container.dashboard — khung gốc trang tổng quan
├── .sidebar — thanh điều hướng bên
│   ├── .brand — liên kết thương hiệu
│   │   └── .brand-mark — biểu tượng logo
│   ├── .side-label — vai trò người dùng
│   ├── .side-nav — điều hướng chính
│   │   ├── .nav-item.is-active — liên kết trang hiện tại
│   │   │   └── .nav-icon — biểu tượng liên kết
│   │   └── .nav-item — liên kết điều hướng
│   │       └── .nav-icon — biểu tượng liên kết
│   ├── .side-account — thông tin tài khoản
│   │   ├── .avatar — ảnh đại diện
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
│   │   │   ├── .eyebrow — nhãn chủ đề
│   │   │   └── .wave — biểu tượng chào mừng
│   │   └── .pg-actions — nhóm nút thao tác
│   │       ├── .button.button-secondary — nút phụ
│   │       └── .button.button-primary — nút chính (thêm giao dịch)
│   ├── .sum-grid — lưới thẻ tóm tắt
│   │   ├── .sum-card.sum-card-balance — thẻ số dư
│   │   │   ├── .sum-card-top — nhãn và biểu tượng thẻ
│   │   │   │   └── .sum-icon — biểu tượng chỉ số
│   │   │   ├── .sum-value — giá trị chỉ số
│   │   │   └── .sum-note — ghi chú bổ sung
│   │   │       └── .trend.trend-positive — xu hướng tăng
│   │   └── .sum-card — thẻ thu nhập, chi tiêu, tiết kiệm
│   │       ├── .sum-card-top — nhãn và biểu tượng thẻ
│   │       │   ├── .sum-icon.sum-icon-green — biểu tượng thu nhập
│   │       │   ├── .sum-icon.sum-icon-coral — biểu tượng chi tiêu
│   │       │   └── .sum-icon.sum-icon-blue — biểu tượng chỉ số khác
│   │       ├── .sum-value — giá trị chỉ số
│   │       └── .sum-note — ghi chú bổ sung
│   │           └── .metric-caption — nội dung ghi chú
│   └── .dashboard-grid — lưới các khung tổng quan
│       ├── .panel.spending-panel — khung biểu đồ thu chi
│       │   ├── .panel-heading — tiêu đề khung
│       │   ├── .chart-legend — chú giải biểu đồ
│       │   │   ├── .legend-dot.legend-dot-income — chấm màu thu nhập
│       │   │   └── .legend-dot.legend-dot-expense — chấm màu chi tiêu
│       │   └── .chart-area — vùng biểu đồ
│       │       └── .chart-mon — một cột tháng
│       │           ├── .chart-label — nhóm cột
│       │           │   ├── .chart-bar — cột thu nhập
│       │           │   └── .chart-bar.chart-bar-expense — cột chi tiêu
│       │           └── .chart-mon-label — nhãn tháng
│       ├── .panel.bud-panel — khung ngân sách
│       │   ├── .panel-heading — tiêu đề khung
│       │   │   └── .text-link — liên kết xem ngân sách
│       │   ├── .bud-total — tổng ngân sách
│       │   ├── .progress-track — thanh tiến độ tổng
│       │   │   ├── .progress-fill — mức bình thường
│       │   │   ├── .progress-fill.is-warning — mức cảnh báo (≥ 80%)
│       │   │   └── .progress-fill.is-over-limit — mức vượt hạn mức (≥ 100%)
│       │   ├── .bud-remaining — số tiền còn lại
│       │   └── .bud-category-list — danh sách danh mục ngân sách
│       │       ├── .bud-category-row — một dòng danh mục
│       │       │   ├── .bud-category-name — tên danh mục
│       │       │   ├── .bud-category-amount — số tiền đã chi/hạn mức
│       │       │   └── .progress-track — thanh tiến độ danh mục
│       │       │       ├── .progress-fill — mức bình thường
│       │       │       ├── .progress-fill.is-warning — mức cảnh báo
│       │       │       └── .progress-fill.is-over-limit — mức vượt hạn mức
│       │       └── .empty-inline — trạng thái rỗng gọn
│       │           └── .text-link — liên kết tạo ngân sách
│       ├── .panel.recent-panel — khung giao dịch gần đây
│       │   ├── .panel-heading — tiêu đề khung
│       │   │   └── .text-link — liên kết xem tất cả
│       │   └── .recent-list — danh sách giao dịch gần đây
│       │       ├── .recent-item — một giao dịch
│       │       │   ├── .category-icon — biểu tượng danh mục chi
│       │       │   ├── .category-icon.category-icon-income — biểu tượng danh mục thu
│       │       │   ├── .recent-info — tên và ngày giao dịch
│       │       │   ├── .recent-amount.recent-amount-income — số tiền thu
│       │       │   └── .recent-amount.recent-amount-expense — số tiền chi
│       │       └── .empty-inline — trạng thái rỗng gọn
│       └── .panel.insight-panel — khung gợi ý phân tích
│           ├── .insight-decoration — hình trang trí
│           ├── .eyebrow — nhãn chủ đề
│           └── .insight-link — liên kết xem phân tích
├── .footer — chân trang
└── .toast-region — thông báo tạm thời
```
