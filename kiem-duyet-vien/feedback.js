window.WorkspacePage = {
  "slug": "moderator-feedback-center",
  "title": "Trung tâm báo cáo",
  "description": "Tiếp nhận, phân loại, giao xử lý và đóng các báo cáo phản hồi.",
  "role": "moderator",
  "active": "reports",
  "storeKey": "feedback",
  "columns": [
    {
      "key": "sender",
      "label": "Người gửi"
    },
    {
      "key": "subject",
      "label": "Báo cáo"
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
      "label": "Tiêu đề báo cáo",
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
      "label": "Người phụ trách",
      "type": "select",
      "required": true,
      "options": [
        "Kiểm duyệt viên",
        "Quản trị viên",
        "Huấn luyện viên"
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
        "Đã đóng",
        "Từ chối"
      ]
    },
    {
      "key": "message",
      "label": "Nội dung báo cáo",
      "type": "textarea",
      "required": true,
      "full": true
    },
    {
      "key": "response",
      "label": "Phản hồi / lý do xử lý",
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
  "createLabel": "Tiếp nhận báo cáo",
  "singular": "báo cáo",
  "filters": [
    "Mới",
    "Đang xử lý",
    "Chờ phản hồi",
    "Đã trả lời",
    "Đã đóng",
    "Từ chối"
  ],
  "statuses": [
    "Mới",
    "Đang xử lý",
    "Chờ phản hồi",
    "Đã trả lời",
    "Đã đóng",
    "Từ chối"
  ],
  "defaultRecord": {
    "status": "Mới",
    "assigned": "Kiểm duyệt viên"
  },
  "exportable": true
};
