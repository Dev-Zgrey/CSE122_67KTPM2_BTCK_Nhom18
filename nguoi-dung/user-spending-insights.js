window.WorkspacePage = {
  "slug": "user-spending-insights",
  "title": "Phân tích chi tiêu",
  "description": "So sánh chi tiêu theo danh mục và đọc các nhận định có giải thích.",
  "role": "user",
  "active": "insights",
  "storeKey": "insights",
  "columns": [
    {
      "key": "category",
      "label": "Danh mục"
    },
    {
      "key": "spent",
      "label": "Chi kỳ này",
      "format": "money"
    },
    {
      "key": "previous",
      "label": "Kỳ trước",
      "format": "money"
    },
    {
      "key": "change",
      "label": "Thay đổi"
    },
    {
      "key": "insight",
      "label": "Nhận định"
    },
    {
      "key": "confidence",
      "label": "Độ chắc chắn"
    }
  ],
  "fields": [],
  "seed": [
    {
      "id": "ins-1",
      "category": "Ăn uống",
      "spent": 770000,
      "previous": 620000,
      "change": "+24%",
      "insight": "Chi tiêu tăng nhẹ; thử đặt giới hạn theo tuần.",
      "confidence": "Cao"
    },
    {
      "id": "ins-2",
      "category": "Nhà cửa",
      "spent": 5500000,
      "previous": 5500000,
      "change": "0%",
      "insight": "Khoản chi ổn định so với kỳ trước.",
      "confidence": "Cao"
    },
    {
      "id": "ins-3",
      "category": "Mua sắm",
      "spent": 290000,
      "previous": 1250000,
      "change": "−77%",
      "insight": "Chi tiêu giảm đáng kể trong kỳ.",
      "confidence": "Trung bình"
    },
    {
      "id": "ins-4",
      "category": "Di chuyển",
      "spent": 180000,
      "previous": 245000,
      "change": "−27%",
      "insight": "Chi phí di chuyển đang được kiểm soát.",
      "confidence": "Trung bình"
    }
  ],
  "readOnly": true,
  "hideCreate": true,
  "listTitle": "Insight theo danh mục",
  "stats": [
    {
      "label": "Danh mục phân tích",
      "value": 4
    },
    {
      "label": "Kỳ so sánh",
      "value": "Tháng này"
    },
    {
      "label": "Xu hướng tích cực",
      "value": 2
    },
    {
      "label": "Độ tin cậy",
      "value": "Tham khảo"
    }
  ],
  "exportable": true
};
