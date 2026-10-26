# User flow – Người dùng (SpendWise)

Cách đọc: mũi tên chỉ bước tiếp theo. Ô **tô màu** là màn hình, ô viền thường là hành động.

## 1. Bức tranh tổng quát

```mermaid
flowchart LR
    A([Bắt đầu]) --> B[Đăng nhập]
    B --> C[Tổng quan]
    C --> D[Ghi giao dịch]
    D --> E[Đặt ngân sách]
    E --> F[Đặt mục tiêu]
    F --> G[Xem phân tích]
    G --> H[Xem gợi ý AI]
    H --> I([Quyết định:<br/>chấp nhận / sửa / từ chối])

    classDef screen fill:#e8f3ec,stroke:#205c47,color:#174936;
    class C,D,E,F,G,H screen;
```

Người dùng đi từ trái sang phải. Thực tế có thể bấm menu bên trái để nhảy tới bất kỳ màn hình nào.

## 2. Tổng quan → đi đến đâu?

```mermaid
flowchart LR
    C[Tổng quan]:::screen --> D[＋ Thêm giao dịch] --> T[Giao dịch]:::screen
    C --> E[Xem ngân sách] --> G[Ngân sách]:::screen
    C --> F[Khám phá phân tích] --> I[Phân tích]:::screen
    classDef screen fill:#e8f3ec,stroke:#205c47,color:#174936;
```

## 3. Giao dịch: thêm một khoản chi

```mermaid
flowchart LR
    A[Bấm ＋ Thêm giao dịch] --> B[Chọn Chi hoặc Thu]
    B --> C[Nhập tên, số tiền,<br/>danh mục, ngày]
    C --> D{Hợp lệ?}
    D -->|Có| E[Lưu và hiện thông báo]
    D -->|Không| F[Báo lỗi trong form]
    F --> C
    E --> G[Số liệu và danh sách<br/>tự cập nhật]
```

Ngoài ra trên màn hình này: **Tìm kiếm / Lọc**, **Sửa**, **Xóa** và **Xuất dữ liệu**. Nếu lọc không ra kết quả, trang hiện trạng thái rỗng.

## 4. Ngân sách: đặt hạn mức cho một danh mục

```mermaid
flowchart LR
    A[Chọn tháng] --> B[Bấm Tạo ngân sách]
    B --> C[Chọn danh mục<br/>và nhập hạn mức]
    C --> D{Hợp lệ?}
    D -->|Có| E[Lưu và hiện thanh tiến độ]
    D -->|Không| F[Báo lỗi]
    F --> C
    E --> G{Đã chi vượt hạn mức?}
    G -->|Có| H[Cảnh báo vượt ngân sách]
    G -->|Không| I[Tiếp tục theo dõi]
```

Số đã chi được tính tự động từ các giao dịch. Nếu tháng chưa có ngân sách, trang hiện trạng thái rỗng.

## 5. Gợi ý AI: xử lý một đề xuất

```mermaid
flowchart LR
    A[Xem đề xuất] --> B[Đọc lý do<br/>và độ chắc chắn]
    B --> C{Bạn chọn gì?}
    C -->|Đồng ý| D[Chấp nhận]
    C -->|Cần chỉnh| E[Chỉnh sửa rồi lưu]
    C -->|Không phù hợp| F[Từ chối]
    C -->|Muốn cái khác| G[Tạo lại đề xuất]
    G --> A
```

Nếu AI lỗi hoặc không chắc chắn, hệ thống báo cho người dùng và cho nhập tay.

## 6. Bảng tóm tắt các màn hình

| Màn hình | Người dùng làm gì |
|---|---|
| Tổng quan | Xem nhanh số dư, thu, chi, ngân sách, giao dịch gần đây |
| Giao dịch | Thêm, sửa, xóa, tìm kiếm, lọc, xuất dữ liệu |
| Ngân sách | Đặt hạn mức theo danh mục, theo dõi tiến độ, nhận cảnh báo |
| Mục tiêu | Tạo mục tiêu tiết kiệm, cập nhật tiến độ |
| Phân tích | Xem biểu đồ và insight chi tiêu |
| Gợi ý AI | Xem đề xuất, chấp nhận, sửa hoặc từ chối |

> Luồng Giao dịch, Ngân sách, Gợi ý AI dựa trên HTML. Mục tiêu và Phân tích là mô tả chung, chưa đối chiếu chi tiết với `goals.html` và `insights.html`.
