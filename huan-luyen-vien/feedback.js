window.WorkspacePage = {
  "slug": "coach-feedback",
  "title": "Phản hồi học viên",
  "description": "Theo dõi câu hỏi, trả lời và chuyển báo cáo đúng người phụ trách.",
  "role": "coach",
  "active": "feedback",
  "storeKey": "feedback",
  "columns": [
    {
      "key": "sender",
      "label": "Người gửi"
    },
    {
      "key": "subject",
      "label": "Chủ đề"
    },
    {
      "key": "priority",
      "label": "Mức độ"
    },
    {
      "key": "assigned",
      "label": "Phụ trách"
    },
    {
      "key": "status",
      "label": "Trạng thái",
      "format": "status"
    },
    {
      "key": "updatedAt",
      "label": "Ngày",
      "format": "date"
    }
  ],
  "fields": [
    {
      "key": "sender",
      "label": "Người gửi",
      "required": true,
      "full": false
    },
    {
      "key": "subject",
      "label": "Chủ đề",
      "required": true,
      "full": false
    },
    {
      "key": "priority",
      "label": "Mức độ",
      "type": "select",
      "required": true,
      "options": [
        "Thấp",
        "Bình thường",
        "Cao",
        "Khẩn cấp"
      ]
    },
    {
      "key": "assigned",
      "label": "Chuyển tới",
      "type": "select",
      "required": true,
      "options": [
        "Huấn luyện viên",
        "Kiểm duyệt viên",
        "Quản trị viên"
      ]
    },
    {
      "key": "status",
      "label": "Trạng thái",
      "type": "select",
      "required": true,
      "options": [
        "Mới",
        "Đang xử lý",
        "Chờ phản hồi",
        "Đã trả lời",
        "Đã đóng"
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
      "key": "response",
      "label": "Phản hồi",
      "type": "textarea",
      "full": true
    }
  ],
  "seed": [
    {
      "id": "fb-1",
      "sender": "Nguyễn An",
      "subject": "Câu hỏi về ngân sách ăn uống",
      "priority": "Bình thường",
      "assigned": "Huấn luyện viên",
      "status": "Mới",
      "message": "Làm thế nào để theo dõi khoản ăn uống linh hoạt?",
      "response": "",
      "updatedAt": "2026-10-12"
    },
    {
      "id": "fb-2",
      "sender": "Trần Minh",
      "subject": "Báo cáo nội dung không phù hợp",
      "priority": "Cao",
      "assigned": "Kiểm duyệt viên",
      "status": "Đang xử lý",
      "message": "Một tài liệu cần được kiểm tra lại ví dụ minh họa.",
      "response": "",
      "updatedAt": "2026-10-10"
    }
  ],
  "createLabel": "Tạo phản hồi",
  "singular": "phản hồi",
  "filters": [
    "Mới",
    "Đang xử lý",
    "Chờ phản hồi",
    "Đã trả lời",
    "Đã đóng"
  ],
  "defaultRecord": {
    "status": "Mới",
    "assigned": "Huấn luyện viên"
  },
  "exportable": true
};
