window.WorkspacePage = {
  "slug": "admin-system-settings",
  "title": "Cấu hình hệ thống",
  "description": "Chỉnh thông số demo, thông báo và trạng thái tính năng toàn cục.",
  "role": "admin",
  "active": "settings",
  "storeKey": "systemSettings",
  "columns": [
    {
      "key": "group",
      "label": "Nhóm"
    },
    {
      "key": "name",
      "label": "Thiết lập"
    },
    {
      "key": "value",
      "label": "Giá trị"
    },
    {
      "key": "updatedAt",
      "label": "Cập nhật",
      "format": "date"
    }
  ],
  "fields": [
    {
      "key": "group",
      "label": "Nhóm thiết lập",
      "type": "select",
      "required": true,
      "options": [
        "Thông báo",
        "AI",
        "Tài chính",
        "Quyền riêng tư"
      ]
    },
    {
      "key": "name",
      "label": "Tên thiết lập",
      "required": true,
      "full": false
    },
    {
      "key": "value",
      "label": "Giá trị",
      "required": true,
      "full": false
    },
    {
      "key": "description",
      "label": "Mô tả",
      "type": "textarea",
      "full": true
    }
  ],
  "seed": [
    {
      "id": "set-1",
      "group": "AI",
      "name": "Gợi ý AI trong demo",
      "value": "Bật",
      "description": "Chỉ mô phỏng nội dung, không gọi dịch vụ AI.",
      "updatedAt": "2026-10-01"
    },
    {
      "id": "set-2",
      "group": "Thông báo",
      "name": "Cảnh báo ngân sách",
      "value": "Bật",
      "description": "Hiển thị nhắc nhở khi gần hạn mức.",
      "updatedAt": "2026-10-01"
    }
  ],
  "createLabel": "Thêm thiết lập",
  "singular": "thiết lập",
  "filters": [
    "AI",
    "Thông báo",
    "Tài chính",
    "Quyền riêng tư"
  ],
  "defaultRecord": {
    "updatedAt": "2026-10-17"
  },
  "exportable": true
};
