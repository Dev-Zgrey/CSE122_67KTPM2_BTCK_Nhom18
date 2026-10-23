window.WorkspacePage = {
  "slug": "admin-role-permission-management",
  "title": "Quản lý phân quyền",
  "description": "Gán quyền theo vai trò và phạm vi dữ liệu trong bản demo.",
  "role": "admin",
  "active": "permissions",
  "storeKey": "permissions",
  "columns": [
    {
      "key": "role",
      "label": "Vai trò"
    },
    {
      "key": "module",
      "label": "Màn hình / dữ liệu"
    },
    {
      "key": "read",
      "label": "Xem"
    },
    {
      "key": "write",
      "label": "Sửa"
    },
    {
      "key": "status",
      "label": "Trạng thái",
      "format": "status"
    }
  ],
  "fields": [
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
      "key": "module",
      "label": "Màn hình hoặc dữ liệu",
      "required": true,
      "full": false
    },
    {
      "key": "read",
      "label": "Quyền xem",
      "type": "select",
      "required": true,
      "options": [
        "Cho phép",
        "Từ chối"
      ]
    },
    {
      "key": "write",
      "label": "Quyền chỉnh sửa",
      "type": "select",
      "required": true,
      "options": [
        "Cho phép",
        "Từ chối"
      ]
    },
    {
      "key": "status",
      "label": "Trạng thái",
      "type": "select",
      "required": true,
      "options": [
        "Hoạt động",
        "Chờ duyệt",
        "Bị từ chối"
      ]
    }
  ],
  "seed": [
    {
      "id": "perm-1",
      "role": "Người dùng",
      "module": "Giao dịch cá nhân",
      "read": "Cho phép",
      "write": "Cho phép",
      "status": "Hoạt động"
    },
    {
      "id": "perm-2",
      "role": "Huấn luyện viên",
      "module": "Ngân sách được chia sẻ",
      "read": "Cho phép",
      "write": "Từ chối",
      "status": "Hoạt động"
    },
    {
      "id": "perm-3",
      "role": "Kiểm duyệt viên",
      "module": "Nội dung chờ duyệt",
      "read": "Cho phép",
      "write": "Cho phép",
      "status": "Hoạt động"
    }
  ],
  "createLabel": "Thêm quy tắc",
  "singular": "quy tắc quyền",
  "filters": [
    "Hoạt động",
    "Chờ duyệt",
    "Bị từ chối"
  ],
  "defaultRecord": {
    "status": "Chờ duyệt"
  },
  "uniqueKeys": [
    "role",
    "module"
  ],
  "duplicateMessage": "Vai trò này đã có quy tắc cho màn hình hoặc dữ liệu đó.",
  "exportable": true
};
