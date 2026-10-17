window.WorkspacePage = {
  "slug": "notifications",
  "title": "Thông báo",
  "description": "Xem thông báo, lọc trạng thái và đánh dấu đã đọc.",
  "role": "user",
  "active": "notifications",
  "storeKey": "notifications",
  "columns": [
    {
      "key": "title",
      "label": "Thông báo"
    },
    {
      "key": "type",
      "label": "Loại"
    },
    {
      "key": "message",
      "label": "Nội dung"
    },
    {
      "key": "date",
      "label": "Ngày",
      "format": "date"
    },
    {
      "key": "status",
      "label": "Trạng thái",
      "format": "status"
    }
  ],
  "fields": [
    {
      "key": "title",
      "label": "Tiêu đề",
      "required": true,
      "full": false
    },
    {
      "key": "type",
      "label": "Loại",
      "type": "select",
      "required": true,
      "options": [
        "Ngân sách",
        "Tài khoản",
        "Gợi ý",
        "Hệ thống"
      ]
    },
    {
      "key": "message",
      "label": "Nội dung",
      "type": "textarea",
      "required": true,
      "full": true
    },
    {
      "key": "date",
      "label": "Ngày",
      "type": "date",
      "required": true,
      "full": false
    },
    {
      "key": "status",
      "label": "Trạng thái",
      "type": "select",
      "required": true,
      "options": [
        "Chưa đọc",
        "Đã đọc"
      ]
    }
  ],
  "seed": [
    {
      "id": "not-1",
      "title": "Ngân sách ăn uống sắp đạt hạn mức",
      "type": "Ngân sách",
      "message": "Bạn đã sử dụng phần lớn hạn mức tháng này.",
      "status": "Chưa đọc",
      "date": "2026-10-16"
    },
    {
      "id": "not-2",
      "title": "Đã cập nhật dữ liệu tài chính",
      "type": "Tài khoản",
      "message": "Các giao dịch gần đây đã được lưu trên thiết bị.",
      "status": "Đã đọc",
      "date": "2026-10-15"
    },
    {
      "id": "not-3",
      "title": "Mẹo nhỏ: tự động hóa tiết kiệm",
      "type": "Gợi ý",
      "message": "Thiết lập khoản tiết kiệm định kỳ để duy trì thói quen.",
      "status": "Chưa đọc",
      "date": "2026-10-13"
    }
  ],
  "createLabel": "Tạo thông báo demo",
  "singular": "thông báo",
  "filters": [
    "Chưa đọc",
    "Đã đọc"
  ],
  "statuses": [
    "Chưa đọc",
    "Đã đọc"
  ],
  "defaultRecord": {
    "status": "Chưa đọc"
  },
  "exportable": true
};
