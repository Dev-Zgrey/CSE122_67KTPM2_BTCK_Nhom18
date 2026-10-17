window.WorkspacePage = {
  "slug": "moderator-ai-review",
  "title": "Kiểm tra kết quả AI",
  "description": "So sánh dữ liệu vào và đầu ra, đánh dấu lỗi và theo dõi xử lý.",
  "role": "moderator",
  "active": "ai",
  "storeKey": "aiRuns",
  "columns": [
    {
      "key": "task",
      "label": "Tính năng AI"
    },
    {
      "key": "input",
      "label": "Dữ liệu đầu vào"
    },
    {
      "key": "output",
      "label": "Kết quả"
    },
    {
      "key": "confidence",
      "label": "Độ chắc chắn"
    },
    {
      "key": "status",
      "label": "Đánh giá",
      "format": "status"
    }
  ],
  "fields": [
    {
      "key": "task",
      "label": "Tính năng AI",
      "type": "select",
      "required": true,
      "options": [
        "Expense Categorizer",
        "Spending Pattern Insight",
        "Goal Coach"
      ]
    },
    {
      "key": "input",
      "label": "Dữ liệu đầu vào",
      "type": "textarea",
      "required": true,
      "full": true
    },
    {
      "key": "output",
      "label": "Kết quả AI",
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
      "label": "Đánh giá",
      "type": "select",
      "required": true,
      "options": [
        "Chờ xem xét",
        "Đạt",
        "Cần xem xét",
        "Lỗi",
        "Đã xử lý"
      ]
    },
    {
      "key": "reviewNote",
      "label": "Ghi chú kiểm duyệt",
      "type": "textarea",
      "full": true
    }
  ],
  "seed": [
    {
      "id": "ai-1",
      "task": "Expense Categorizer",
      "input": "Giao dịch: Cà phê 65.000 ₫",
      "output": "Danh mục đề xuất: Ăn uống",
      "confidence": "Cao",
      "status": "Chờ xem xét",
      "reviewNote": ""
    },
    {
      "id": "ai-2",
      "task": "Spending Pattern Insight",
      "input": "Tổng chi ăn uống tăng 24% trong tháng",
      "output": "Gợi ý xem xét ngân sách theo tuần.",
      "confidence": "Trung bình",
      "status": "Cần xem xét",
      "reviewNote": "Xác nhận dữ liệu so sánh."
    },
    {
      "id": "ai-3",
      "task": "Goal Coach",
      "input": "Mục tiêu quỹ dự phòng 30 triệu trong 12 tháng",
      "output": "Đề xuất tiết kiệm 2,5 triệu mỗi tháng.",
      "confidence": "Cao",
      "status": "Đạt",
      "reviewNote": ""
    }
  ],
  "createLabel": "Ghi nhận phiên AI",
  "singular": "phiên AI",
  "filters": [
    "Chờ xem xét",
    "Đạt",
    "Cần xem xét",
    "Lỗi",
    "Đã xử lý"
  ],
  "defaultRecord": {
    "status": "Chờ xem xét"
  },
  "exportable": true
};
