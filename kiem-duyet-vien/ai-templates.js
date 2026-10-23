window.WorkspacePage = {
  "slug": "moderator-ai-template-management",
  "title": "Quản lý mẫu AI",
  "description": "Quản lý prompt, thử nghiệm đầu ra và bật hoặc tắt phiên bản AI.",
  "role": "moderator",
  "active": "templates",
  "storeKey": "aiTemplates",
  "columns": [
    {
      "key": "name",
      "label": "Tên mẫu"
    },
    {
      "key": "model",
      "label": "Mô hình"
    },
    {
      "key": "version",
      "label": "Phiên bản"
    },
    {
      "key": "updatedAt",
      "label": "Cập nhật",
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
      "key": "name",
      "label": "Tên mẫu",
      "required": true,
      "full": false
    },
    {
      "key": "model",
      "label": "Mô hình",
      "type": "select",
      "required": true,
      "options": [
        "Expense Categorizer",
        "Spending Pattern Insight",
        "Goal Coach"
      ]
    },
    {
      "key": "version",
      "label": "Phiên bản",
      "required": true,
      "full": false
    },
    {
      "key": "status",
      "label": "Trạng thái",
      "type": "select",
      "required": true,
      "options": [
        "Bản nháp",
        "Đang thử nghiệm",
        "Hoạt động",
        "Vô hiệu hóa",
        "Đã lưu trữ"
      ]
    },
    {
      "key": "prompt",
      "label": "Prompt / mẫu phản hồi",
      "type": "textarea",
      "required": true,
      "full": true
    },
    {
      "key": "fallback",
      "label": "Phản hồi dự phòng",
      "type": "textarea",
      "full": true
    }
  ],
  "seed": [
    {
      "id": "tpl-1",
      "name": "Expense Categorizer",
      "model": "Expense Categorizer",
      "version": "1.2",
      "updatedAt": "2026-10-08",
      "status": "Hoạt động",
      "prompt": "Phân loại giao dịch vào danh mục phù hợp và giải thích ngắn gọn.",
      "fallback": "Chưa đủ dữ liệu để gợi ý."
    },
    {
      "id": "tpl-2",
      "name": "Goal Coach",
      "model": "Goal Coach",
      "version": "0.9",
      "updatedAt": "2026-10-02",
      "status": "Đang thử nghiệm",
      "prompt": "Đề xuất kế hoạch tiết kiệm có thể điều chỉnh.",
      "fallback": "Hãy thử lại sau."
    }
  ],
  "createLabel": "Tạo mẫu AI",
  "singular": "mẫu",
  "filters": [
    "Bản nháp",
    "Đang thử nghiệm",
    "Hoạt động",
    "Vô hiệu hóa",
    "Đã lưu trữ"
  ],
  "defaultRecord": {
    "status": "Bản nháp"
  },
  "labelKey": "name",
  "exportable": true
};
