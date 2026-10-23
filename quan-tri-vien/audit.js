window.WorkspacePage = {
  "slug": "admin-audit-log",
  "title": "Nhật ký kiểm toán",
  "description": "Tra cứu đăng nhập và thay đổi dữ liệu đã ghi trong bản demo.",
  "role": "admin",
  "active": "audit",
  "storeKey": "auditLog",
  "columns": [
    {
      "key": "actor",
      "label": "Người thực hiện"
    },
    {
      "key": "action",
      "label": "Hoạt động"
    },
    {
      "key": "target",
      "label": "Đối tượng"
    },
    {
      "key": "status",
      "label": "Kết quả",
      "format": "status"
    },
    {
      "key": "date",
      "label": "Thời điểm",
      "format": "date"
    }
  ],
  "fields": [],
  "seed": [
    {
      "id": "log-1",
      "actor": "Huấn luyện viên",
      "action": "Gửi tài nguyên kiểm duyệt",
      "target": "Lập ngân sách 50/30/20",
      "status": "Chờ xử lý",
      "date": "2026-10-12"
    },
    {
      "id": "log-2",
      "actor": "Nguyễn An",
      "action": "Tạo giao dịch",
      "target": "Ăn uống",
      "status": "Thành công",
      "date": "2026-10-11"
    }
  ],
  "readOnly": true,
  "hideCreate": true,
  "filters": [
    "Thành công",
    "Chờ xử lý",
    "Thất bại"
  ],
  "listTitle": "Các sự kiện đã ghi nhận",
  "exportable": true
};
