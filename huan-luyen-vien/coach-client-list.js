window.WorkspacePage = {
  "slug": "coach-client-list",
  "title": "Danh sách học viên",
  "description": "Tìm người được hướng dẫn và xem mục tiêu, ngân sách được chia sẻ.",
  "role": "coach",
  "active": "clients",
  "storeKey": "demoUsers",
  "columns": [
    {
      "key": "name",
      "label": "Học viên"
    },
    {
      "key": "email",
      "label": "Email"
    },
    {
      "key": "goal",
      "label": "Mục tiêu"
    },
    {
      "key": "budget",
      "label": "Ngân sách"
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
      "label": "Họ tên",
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
      "key": "goal",
      "label": "Mục tiêu",
      "full": false
    },
    {
      "key": "budget",
      "label": "Tình trạng ngân sách",
      "full": false
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
  "readOnly": true,
  "hideCreate": true,
  "filters": [
    "Hoạt động",
    "Chờ xác minh",
    "Tạm ngưng",
    "Đã khóa"
  ],
  "stats": [
    {
      "label": "Tổng học viên",
      "value": {
        "count": "demoUsers"
      }
    },
    {
      "label": "Đang hoạt động",
      "value": 2
    },
    {
      "label": "Chờ xác minh",
      "value": 1
    },
    {
      "label": "Cần theo dõi",
      "value": 1
    }
  ],
  "listTitle": "Học viên được chia sẻ"
};
