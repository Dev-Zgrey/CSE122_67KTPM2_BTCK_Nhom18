window.WorkspacePage = {
  "slug": "coach-budget-review",
  "title": "Đánh giá ngân sách",
  "description": "Ghi nhận xét, đề xuất điều chỉnh và cập nhật trạng thái review.",
  "role": "coach",
  "active": "reviews",
  "storeKey": "coachReviews",
  "columns": [
    {
      "key": "client",
      "label": "Học viên"
    },
    {
      "key": "period",
      "label": "Kỳ ngân sách"
    },
    {
      "key": "submitted",
      "label": "Ngày gửi",
      "format": "date"
    },
    {
      "key": "status",
      "label": "Trạng thái",
      "format": "status"
    },
    {
      "key": "comment",
      "label": "Nhận xét"
    }
  ],
  "fields": [
    {
      "key": "client",
      "label": "Học viên",
      "required": true,
      "full": false
    },
    {
      "key": "period",
      "label": "Kỳ ngân sách",
      "type": "month",
      "required": true,
      "full": false
    },
    {
      "key": "submitted",
      "label": "Ngày gửi",
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
        "Chờ review",
        "Cần bổ sung",
        "Đã duyệt",
        "Từ chối"
      ]
    },
    {
      "key": "comment",
      "label": "Nhận xét huấn luyện viên",
      "type": "textarea",
      "full": true
    },
    {
      "key": "suggestion",
      "label": "Đề xuất điều chỉnh",
      "type": "textarea",
      "full": true
    }
  ],
  "seed": [
    {
      "id": "rev-1",
      "client": "Nguyễn An",
      "period": "2026-10",
      "submitted": "2026-10-12",
      "status": "Chờ review",
      "comment": "",
      "suggestion": ""
    },
    {
      "id": "rev-2",
      "client": "Trần Minh",
      "period": "2026-09",
      "submitted": "2026-10-03",
      "status": "Cần bổ sung",
      "comment": "Vui lòng bổ sung khoản thu định kỳ.",
      "suggestion": "Cập nhật thu nhập thực nhận."
    }
  ],
  "createLabel": "Tạo yêu cầu review",
  "singular": "review",
  "filters": [
    "Chờ review",
    "Cần bổ sung",
    "Đã duyệt",
    "Từ chối"
  ],
  "defaultRecord": {
    "status": "Chờ review"
  },
  "exportable": true
};
