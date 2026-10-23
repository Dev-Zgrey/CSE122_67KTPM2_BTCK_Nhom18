window.WorkspacePage = {
  "slug": "admin-expense-category-management",
  "title": "Quản lý danh mục",
  "description": "Tạo, sắp xếp và bật hoặc tắt danh mục thu chi cho bản demo.",
  "role": "admin",
  "active": "categories",
  "storeKey": "categories",
  "columns": [
    {
      "key": "name",
      "label": "Tên danh mục"
    },
    {
      "key": "type",
      "label": "Loại"
    },
    {
      "key": "icon",
      "label": "Biểu tượng"
    },
    {
      "key": "order",
      "label": "Thứ tự"
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
      "label": "Tên danh mục",
      "required": true,
      "full": false
    },
    {
      "key": "type",
      "label": "Loại",
      "type": "select",
      "required": true,
      "options": [
        "Chi tiêu",
        "Thu nhập"
      ]
    },
    {
      "key": "icon",
      "label": "Biểu tượng",
      "required": true,
      "full": false
    },
    {
      "key": "order",
      "label": "Thứ tự hiển thị",
      "type": "number",
      "required": true,
      "full": false
    },
    {
      "key": "status",
      "label": "Trạng thái",
      "type": "select",
      "required": true,
      "options": [
        "Hoạt động",
        "Vô hiệu hóa",
        "Lưu trữ"
      ]
    }
  ],
  "seed": [
    {
      "id": "cat-1",
      "name": "Ăn uống",
      "type": "Chi tiêu",
      "icon": "♨",
      "status": "Hoạt động",
      "order": 1
    },
    {
      "id": "cat-2",
      "name": "Nhà cửa",
      "type": "Chi tiêu",
      "icon": "⌂",
      "status": "Hoạt động",
      "order": 2
    },
    {
      "id": "cat-3",
      "name": "Di chuyển",
      "type": "Chi tiêu",
      "icon": "↗",
      "status": "Hoạt động",
      "order": 3
    },
    {
      "id": "cat-4",
      "name": "Lương",
      "type": "Thu nhập",
      "icon": "▤",
      "status": "Hoạt động",
      "order": 4
    },
    {
      "id": "cat-5",
      "name": "Mua sắm",
      "type": "Chi tiêu",
      "icon": "◇",
      "status": "Hoạt động",
      "order": 5
    },
    {
      "id": "cat-6",
      "name": "Sức khỏe",
      "type": "Chi tiêu",
      "icon": "✚",
      "status": "Hoạt động",
      "order": 6
    },
    {
      "id": "cat-7",
      "name": "Giải trí",
      "type": "Chi tiêu",
      "icon": "♫",
      "status": "Hoạt động",
      "order": 7
    },
    {
      "id": "cat-8",
      "name": "Hóa đơn",
      "type": "Chi tiêu",
      "icon": "▧",
      "status": "Hoạt động",
      "order": 8
    },
    {
      "id": "cat-9",
      "name": "Khác",
      "type": "Chi tiêu",
      "icon": "◌",
      "status": "Hoạt động",
      "order": 9
    },
    {
      "id": "cat-10",
      "name": "Thưởng",
      "type": "Thu nhập",
      "icon": "✦",
      "status": "Hoạt động",
      "order": 5
    },
    {
      "id": "cat-11",
      "name": "Đầu tư",
      "type": "Thu nhập",
      "icon": "↗",
      "status": "Hoạt động",
      "order": 6
    },
    {
      "id": "cat-12",
      "name": "Làm thêm",
      "type": "Thu nhập",
      "icon": "✎",
      "status": "Hoạt động",
      "order": 7
    },
    {
      "id": "cat-13",
      "name": "Khác",
      "type": "Thu nhập",
      "icon": "◌",
      "status": "Hoạt động",
      "order": 8
    }
  ],
  "createLabel": "Thêm danh mục",
  "singular": "danh mục",
  "filters": [
    "Hoạt động",
    "Vô hiệu hóa",
    "Lưu trữ"
  ],
  "defaultRecord": {
    "status": "Hoạt động",
    "order": 99
  },
  "labelKey": "name",
  "uniqueKeys": [
    "name",
    "type"
  ],
  "duplicateMessage": "Tên danh mục này đã có trong cùng loại.",
  "exportable": true
};
