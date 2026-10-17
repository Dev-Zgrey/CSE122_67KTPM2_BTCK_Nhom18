window.WorkspacePage = {
  "slug": "admin-system-dashboard",
  "title": "Tổng quan hệ thống",
  "description": "Theo dõi tài khoản, giao dịch, ngân sách và hoạt động gần đây.",
  "role": "admin",
  "active": "dashboard",
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
  "listTitle": "Hoạt động hệ thống gần đây",
  "stats": [
    {
      "label": "Tài khoản",
      "value": {
        "count": "demoUsers"
      }
    },
    {
      "label": "Giao dịch",
      "value": {
        "count": "transactions.v1"
      }
    },
    {
      "label": "Ngân sách",
      "value": {
        "count": "budgets.v1"
      }
    },
    {
      "label": "Nội dung chờ duyệt",
      "value": 2
    }
  ],
  "exportable": true,
  "secondaryAction": {
    "label": "Mở nhật ký kiểm toán",
    "href": "admin-audit-log.html"
  }
};
