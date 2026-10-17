window.WorkspacePage = {
  "slug": "coach-resource-editor",
  "title": "Soạn tài nguyên",
  "description": "Soạn bài học, mục tiêu, ví dụ và bài tập; lưu nháp hoặc gửi duyệt.",
  "role": "coach",
  "active": "editor",
  "storeKey": "resources",
  "columns": [
    {
      "key": "title",
      "label": "Tiêu đề"
    },
    {
      "key": "objective",
      "label": "Mục tiêu"
    },
    {
      "key": "type",
      "label": "Loại"
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
      "key": "title",
      "label": "Tiêu đề tài nguyên",
      "required": true,
      "full": false
    },
    {
      "key": "type",
      "label": "Loại nội dung",
      "type": "select",
      "required": true,
      "options": [
        "Bài học",
        "Hướng dẫn",
        "Bài tập",
        "Tài liệu"
      ]
    },
    {
      "key": "audience",
      "label": "Đối tượng",
      "required": true,
      "full": false
    },
    {
      "key": "objective",
      "label": "Mục tiêu học tập",
      "type": "textarea",
      "required": true,
      "full": true
    },
    {
      "key": "content",
      "label": "Nội dung",
      "type": "textarea",
      "required": true,
      "full": true
    },
    {
      "key": "exercise",
      "label": "Ví dụ / bài tập",
      "type": "textarea",
      "full": true
    },
    {
      "key": "status",
      "label": "Trạng thái",
      "type": "select",
      "required": true,
      "options": [
        "Bản nháp",
        "Chờ duyệt",
        "Đã xuất bản",
        "Cần chỉnh sửa",
        "Đã lưu trữ"
      ]
    },
    {
      "key": "summary",
      "label": "Tóm tắt",
      "full": false
    }
  ],
  "seed": [
    {
      "id": "res-1",
      "title": "Lập ngân sách 50/30/20",
      "type": "Bài học",
      "audience": "Người mới bắt đầu",
      "status": "Chờ duyệt",
      "summary": "Hướng dẫn chia thu nhập thành nhu cầu, mong muốn và tiết kiệm.",
      "objective": "Lập ngân sách tháng đầu tiên",
      "content": "Bắt đầu từ thu nhập thực nhận. Phân loại chi phí thiết yếu, mong muốn và tiết kiệm.",
      "exercise": "Ghi lại ba nhóm chi tiêu trong một tuần.",
      "tags": "ngân sách, cơ bản",
      "updatedAt": "2026-10-08"
    },
    {
      "id": "res-2",
      "title": "Xây dựng quỹ dự phòng",
      "type": "Hướng dẫn",
      "audience": "Người dùng",
      "status": "Đã xuất bản",
      "summary": "Các bước xây dựng quỹ dự phòng theo khả năng thực tế.",
      "objective": "Xác định mục tiêu quỹ dự phòng",
      "content": "Tính chi phí thiết yếu theo tháng rồi đặt mốc tiết kiệm phù hợp.",
      "exercise": "Chọn khoản chuyển tự động nhỏ mỗi tháng.",
      "tags": "tiết kiệm, mục tiêu",
      "updatedAt": "2026-09-24"
    }
  ],
  "createLabel": "Soạn bài mới",
  "singular": "tài nguyên",
  "filters": [
    "Bản nháp",
    "Chờ duyệt",
    "Đã xuất bản",
    "Cần chỉnh sửa",
    "Đã lưu trữ"
  ],
  "defaultRecord": {
    "status": "Bản nháp"
  },
  "labelKey": "title",
  "exportable": true
};
