window.WorkspacePage = {
  "slug": "user-saving-goals",
  "title": "Mục tiêu tiết kiệm",
  "description": "Tạo mục tiêu, cập nhật tiến độ và theo dõi hạn hoàn thành.",
  "role": "user",
  "active": "goals",
  "storeKey": "goals",
  "columns": [
    {
      "key": "title",
      "label": "Mục tiêu"
    },
    {
      "key": "target",
      "label": "Số tiền mục tiêu",
      "format": "money"
    },
    {
      "key": "saved",
      "label": "Đã tiết kiệm",
      "format": "money"
    },
    {
      "key": "deadline",
      "label": "Hạn hoàn thành",
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
      "label": "Tên mục tiêu",
      "required": true,
      "full": false
    },
    {
      "key": "target",
      "label": "Số tiền mục tiêu (₫)",
      "type": "number",
      "required": true,
      "full": false
    },
    {
      "key": "saved",
      "label": "Đã tiết kiệm (₫)",
      "type": "number",
      "default": 0
    },
    {
      "key": "deadline",
      "label": "Ngày hoàn thành",
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
        "Chưa bắt đầu",
        "Đang tiến hành",
        "Tạm dừng",
        "Hoàn thành",
        "Quá hạn"
      ]
    },
    {
      "key": "note",
      "label": "Ghi chú",
      "type": "textarea",
      "full": true
    }
  ],
  "seed": [
    {
      "id": "goal-1",
      "title": "Quỹ dự phòng",
      "target": 30000000,
      "saved": 12500000,
      "deadline": "2027-03-31",
      "status": "Đang tiến hành",
      "note": "Tiết kiệm tự động mỗi tháng."
    },
    {
      "id": "goal-2",
      "title": "Du lịch Đà Lạt",
      "target": 8000000,
      "saved": 2600000,
      "deadline": "2027-01-15",
      "status": "Đang tiến hành",
      "note": "Dành cho chuyến đi đầu năm."
    }
  ],
  "createLabel": "Tạo mục tiêu",
  "singular": "mục tiêu",
  "filters": [
    "Chưa bắt đầu",
    "Đang tiến hành",
    "Tạm dừng",
    "Hoàn thành",
    "Quá hạn"
  ],
  "defaultRecord": {
    "status": "Chưa bắt đầu"
  },
  "labelKey": "title",
  "exportable": true
};
