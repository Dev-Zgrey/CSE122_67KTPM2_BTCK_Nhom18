window.WorkspacePage = {
  "slug": "admin-user-management",
  "title": "Quản lý tài khoản",
  "description": "Tìm tài khoản demo và cập nhật vai trò, trạng thái, hồ sơ.",
  "role": "admin",
  "active": "users",
  "storeKey": "demoUsers",
  "columns": [
    {
      "key": "name",
      "label": "Họ tên"
    },
    {
      "key": "email",
      "label": "Email"
    },
    {
      "key": "role",
      "label": "Vai trò"
    },
    {
      "key": "createdAt",
      "label": "Ngày tạo",
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
      "label": "Họ và tên",
      "required": true,
      "full": false
    },
    {
      "key": "email",
      "label": "Email",
      "type": "email",
      "required": true,
      "full": false
    },
    {
      "key": "role",
      "label": "Vai trò",
      "type": "select",
      "required": true,
      "options": [
        "Người dùng",
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
        "Hoạt động",
        "Chờ xác minh",
        "Tạm ngưng",
        "Đã khóa"
      ]
    },
    {
      "key": "goal",
      "label": "Mục tiêu",
      "full": false
    },
    {
      "key": "budget",
      "label": "Tình trạng ngân sách",
      "full": false
    }
  ],
  "seed": [
    {
      "id": "usr-an",
      "name": "Nguyễn An",
      "email": "an.tran@spendwise.demo",
      "role": "Người dùng",
      "status": "Hoạt động",
      "goal": "Quỹ dự phòng",
      "budget": "Đúng kế hoạch",
      "createdAt": "2026-09-01"
    },
    {
      "id": "usr-minh",
      "name": "Trần Minh",
      "email": "minh.tran@example.test",
      "role": "Người dùng",
      "status": "Hoạt động",
      "goal": "Du lịch Đà Lạt",
      "budget": "Cần theo dõi",
      "createdAt": "2026-08-15"
    },
    {
      "id": "usr-linh",
      "name": "Lê Linh",
      "email": "linh.le@example.test",
      "role": "Người dùng",
      "status": "Chờ xác minh",
      "goal": "Quỹ học tập",
      "budget": "Đúng kế hoạch",
      "createdAt": "2026-10-01"
    }
  ],
  "createLabel": "Tạo tài khoản demo",
  "singular": "tài khoản",
  "filters": [
    "Hoạt động",
    "Chờ xác minh",
    "Tạm ngưng",
    "Đã khóa"
  ],
  "defaultRecord": {
    "status": "Hoạt động",
    "createdAt": "2026-10-17"
  },
  "labelKey": "name",
  "uniqueKeys": [
    "email"
  ],
  "duplicateMessage": "Email này đã được dùng cho một tài khoản demo khác.",
  "exportable": true
};
