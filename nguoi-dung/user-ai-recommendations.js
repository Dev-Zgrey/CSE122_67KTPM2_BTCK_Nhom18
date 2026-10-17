window.WorkspacePage = {
  "slug": "user-ai-recommendations",
  "title": "Đề xuất thông minh",
  "description": "Xem lý do, dữ liệu đầu vào và chủ động xử lý đề xuất AI.",
  "role": "user",
  "active": "ai",
  "storeKey": "recommendations",
  "columns": [
    {
      "key": "title",
      "label": "Đề xuất"
    },
    {
      "key": "kind",
      "label": "Loại"
    },
    {
      "key": "reason",
      "label": "Lý do"
    },
    {
      "key": "confidence",
      "label": "Độ chắc chắn"
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
      "label": "Tên đề xuất",
      "required": true,
      "full": false
    },
    {
      "key": "kind",
      "label": "Loại đề xuất",
      "type": "select",
      "required": true,
      "options": [
        "Phân loại chi tiêu",
        "Thói quen chi tiêu",
        "Mục tiêu tiết kiệm"
      ]
    },
    {
      "key": "reason",
      "label": "Giải thích và dữ liệu đầu vào",
      "type": "textarea",
      "required": true,
      "full": true
    },
    {
      "key": "confidence",
      "label": "Độ chắc chắn",
      "type": "select",
      "required": true,
      "options": [
        "Cao",
        "Trung bình",
        "Thấp"
      ]
    },
    {
      "key": "status",
      "label": "Trạng thái",
      "type": "select",
      "required": true,
      "options": [
        "Chờ xem xét",
        "Đã chấp nhận",
        "Đã chỉnh sửa",
        "Đã từ chối",
        "Đã tạo lại"
      ]
    },
    {
      "key": "note",
      "label": "Ghi chú của bạn",
      "type": "textarea",
      "full": true
    }
  ],
  "seed": [
    {
      "id": "rec-1",
      "title": "Tách riêng chi tiêu ăn uống",
      "kind": "Thói quen chi tiêu",
      "reason": "Chi phí ăn uống tăng so với kỳ trước; đề xuất đặt hạn mức theo tuần.",
      "confidence": "Trung bình",
      "status": "Chờ xem xét",
      "note": ""
    },
    {
      "id": "rec-2",
      "title": "Gợi ý danh mục: Di chuyển",
      "kind": "Phân loại chi tiêu",
      "reason": "Mô tả giao dịch giống các khoản di chuyển trước đây.",
      "confidence": "Cao",
      "status": "Chờ xem xét",
      "note": ""
    },
    {
      "id": "rec-3",
      "title": "Tự động chuyển tiền tiết kiệm",
      "kind": "Mục tiêu tiết kiệm",
      "reason": "Khoản tiết kiệm nhỏ định kỳ có thể giúp đạt quỹ dự phòng đúng hạn.",
      "confidence": "Trung bình",
      "status": "Đã chấp nhận",
      "note": ""
    }
  ],
  "createLabel": "Thêm đề xuất",
  "singular": "đề xuất",
  "filters": [
    "Chờ xem xét",
    "Đã chấp nhận",
    "Đã chỉnh sửa",
    "Đã từ chối",
    "Đã tạo lại"
  ],
  "defaultRecord": {
    "status": "Chờ xem xét"
  },
  "labelKey": "title",
  "exportable": true
};
