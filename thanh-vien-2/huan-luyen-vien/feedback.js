// GHI CHÚ: Nạp/lưu phản hồi, hiển thị theo bộ lọc và xử lý thao tác thêm, sửa hoặc phản hồi qua modal.
// ==========================================
// QUẢN LÝ PHẢN HỒI HỌC VIÊN - SPENDWISE
// Dành cho sinh viên năm 2 - Dễ hiểu, dễ bảo vệ
// ==========================================

// 1. DỮ LIỆU MẪU BAN ĐẦU (Dùng khi LocalStorage chưa có dữ liệu)
const DEFAULT_FEEDBACKS = [
  {
    id: "fb-1",
    sender: "Nguyễn An",
    subject: "Câu hỏi về ngân sách ăn uống",
    priority: "Bình thường",
    assigned: "Huấn luyện viên",
    status: "Mới",
    message: "Làm thế nào để theo dõi khoản ăn uống linh hoạt?",
    response: "",
    updatedAt: "2026-10-12"
  },
  {
    id: "fb-2",
    sender: "Trần Minh",
    subject: "Báo cáo nội dung không phù hợp",
    priority: "Cao",
    assigned: "Kiểm duyệt viên",
    status: "Đang xử lý",
    message: "Một tài liệu cần được kiểm tra lại ví dụ minh họa.",
    response: "",
    updatedAt: "2026-10-10"
  }
];

// Khóa lưu trong LocalStorage để đồng bộ giữa các trang
const STORAGE_KEY = "spendwise.feedback";

// Mảng chứa danh sách phản hồi hiện tại
let feedbacks = [];

// ==========================================
// 2. CÁC HÀM XỬ LÝ LOCALSTORAGE
// ==========================================

// Đọc dữ liệu từ LocalStorage
// Nạp các phản hồi đã lưu và xử lý trường hợp dữ liệu chưa được khởi tạo.
function loadFeedbacks() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      feedbacks = JSON.parse(data);
    } catch (e) {
      feedbacks = DEFAULT_FEEDBACKS;
    }
  } else {
    feedbacks = DEFAULT_FEEDBACKS;
    saveFeedbacks();
  }
}

// Lưu dữ liệu vào LocalStorage
// Ghi danh sách phản hồi hiện tại xuống localStorage.
function saveFeedbacks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbacks));
}

// Hiển thị thông báo nhỏ (Toast)
// Hiển thị kết quả thao tác (thành công hoặc lỗi) tạm thời trên giao diện.
function showToast(message, isError = false) {
  const container = document.querySelector("[data-toasts]");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = isError ? "toast is-danger" : "toast";
  toast.textContent = message;
  container.appendChild(toast);

  // Tự động xóa sau 3 giây
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// ==========================================
// 3. HIỂN THỊ DỮ LIỆU RA GIAO DIỆN (RENDER)
// ==========================================

// Lọc phản hồi theo điều kiện, cập nhật số liệu và dựng lại danh sách/bảng hiển thị.
function renderUI() {
  const searchInput = document.querySelector("[data-search]");
  const statusFilter = document.querySelector("[data-status-filter]");
  const tableBody = document.querySelector("[data-rows]");
  const emptyState = document.querySelector("[data-empty]");
  const countLabel = document.querySelector("[data-count]");
  const statsContainer = document.querySelector("[data-stats]");

  const keyword = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const selectedStatus = statusFilter ? statusFilter.value : "";

  // Lọc theo từ khóa tìm kiếm và trạng thái
  const filteredList = feedbacks.filter((item) => {
    const matchSearch =
      !keyword ||
      item.sender.toLowerCase().includes(keyword) ||
      item.subject.toLowerCase().includes(keyword) ||
      (item.message && item.message.toLowerCase().includes(keyword));

    const matchStatus = !selectedStatus || item.status === selectedStatus;

    return matchSearch && matchStatus;
  });

  // 1. Cập nhật số lượng
  if (countLabel) {
    countLabel.textContent = `${filteredList.length} mục · ${feedbacks.length} tổng cộng`;
  }

  // 2. Cập nhật thẻ thống kê (Stats Grid)
  if (statsContainer) {
    const total = feedbacks.length;
    const displaying = filteredList.length;
    const activeCount = feedbacks.filter((item) => item.status === "Mới" || item.status === "Đang xử lý").length;
    const pendingCount = feedbacks.filter((item) => item.status === "Chờ phản hồi" || item.status === "Mới").length;

    statsContainer.innerHTML = `
      <article class="stat-card"><span>Tổng số</span><strong>${total}</strong></article>
      <article class="stat-card"><span>Đang hiển thị</span><strong>${displaying}</strong></article>
      <article class="stat-card"><span>Đang hoạt động</span><strong>${activeCount}</strong></article>
      <article class="stat-card"><span>Cần xử lý</span><strong>${pendingCount}</strong></article>
    `;
  }

  // 3. Kiểm tra danh sách rỗng
  if (emptyState) {
    emptyState.hidden = filteredList.length > 0;
  }
  const tableScroll = document.querySelector(".table-scroll");
  if (tableScroll) {
    tableScroll.hidden = filteredList.length === 0;
  }

  // 4. Render các dòng của bảng
  if (!tableBody) return;
  tableBody.innerHTML = "";

  filteredList.forEach((item) => {
    // Xác định màu nhãn trạng thái
    let badgeClass = "status-badge";
    if (item.status === "Đã đóng") badgeClass += " is-danger";
    else if (item.status === "Chờ phản hồi" || item.status === "Đang xử lý") badgeClass += " is-warning";

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.sender}</td>
      <td>${item.subject}</td>
      <td>${item.priority}</td>
      <td>${item.assigned}</td>
      <td><span class="${badgeClass}">${item.status}</span></td>
      <td>${item.updatedAt || "—"}</td>
      <td>
        <div class="row-action">
          <select class="status-select" data-change-status="${item.id}" aria-label="Đổi trạng thái">
            <option value="Mới" ${item.status === "Mới" ? "selected" : ""}>Mới</option>
            <option value="Đang xử lý" ${item.status === "Đang xử lý" ? "selected" : ""}>Đang xử lý</option>
            <option value="Chờ phản hồi" ${item.status === "Chờ phản hồi" ? "selected" : ""}>Chờ phản hồi</option>
            <option value="Đã trả lời" ${item.status === "Đã trả lời" ? "selected" : ""}>Đã trả lời</option>
            <option value="Đã đóng" ${item.status === "Đã đóng" ? "selected" : ""}>Đã đóng</option>
          </select>
          <button class="icon-button" type="button" title="Sửa" data-edit="${item.id}">✎</button>
          <button class="icon-button" type="button" title="Xóa" data-delete="${item.id}">×</button>
        </div>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

// ==========================================
// 4. XỬ LÝ MODAL (THÊM / SỬA PHẢN HỒI)
// ==========================================

const modal = document.querySelector("[data-modal]");
const form = document.querySelector("[data-form]");
const modalTitle = document.querySelector("#modal-title");
const errorBox = document.querySelector("[data-error]");

// Mở form phản hồi mới hoặc nạp nội dung phản hồi đã chọn vào các trường chỉnh sửa.
function openModal(editId = null) {
  if (!modal || !form) return;
  form.reset();
  errorBox.textContent = "";

  if (editId) {
    // Chế độ Sửa
    const record = feedbacks.find((item) => item.id === editId);
    if (!record) return;

    modalTitle.textContent = "Sửa phản hồi";
    form.elements["id"].value = record.id;
    form.elements["sender"].value = record.sender;
    form.elements["subject"].value = record.subject;
    form.elements["priority"].value = record.priority;
    form.elements["assigned"].value = record.assigned;
    form.elements["status"].value = record.status;
    form.elements["message"].value = record.message;
    form.elements["response"].value = record.response || "";
  } else {
    // Chế độ Thêm mới
    modalTitle.textContent = "Tạo phản hồi";
    form.elements["id"].value = "";
    form.elements["status"].value = "Mới";
    form.elements["assigned"].value = "Huấn luyện viên";
  }

  modal.hidden = false;
}

// Ẩn modal khi hủy hoặc khi lưu xong.
function closeModal() {
  if (modal) modal.hidden = true;
}

// ==========================================
// 5. KHỞI CHẠY VÀ GẮN SỰ KIỆN (EVENT LISTENERS)
// ==========================================

// Tải dữ liệu ban đầu và gắn sự kiện cho form, thao tác bảng, bộ lọc và xuất CSV.
document.addEventListener("DOMContentLoaded", () => {
  // 1. Tải dữ liệu ban đầu
  loadFeedbacks();
  renderUI();

  // 2. Mở Modal khi nhấn nút Thêm mới
  document.querySelectorAll("[data-create]").forEach((btn) => {
    btn.addEventListener("click", () => openModal());
  });

  // 3. Đóng Modal khi nhấn nút Hủy hoặc dấu ×
  document.querySelectorAll("[data-close]").forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });

  // Đóng Modal khi bấm ra vùng xám mờ bên ngoài
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // 4. Lưu Form (Thêm mới hoặc Cập nhật)
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const id = form.elements["id"].value;
      const sender = form.elements["sender"].value.trim();
      const subject = form.elements["subject"].value.trim();
      const priority = form.elements["priority"].value;
      const assigned = form.elements["assigned"].value;
      const status = form.elements["status"].value;
      const message = form.elements["message"].value.trim();
      const response = form.elements["response"].value.trim();

      // Kiểm tra tính hợp lệ cơ bản (Validation)
      if (!sender || !subject || !message) {
        errorBox.textContent = "Vui lòng nhập đầy đủ các thông tin bắt buộc (*).";
        return;
      }

      const today = new Date().toISOString().slice(0, 10);

      if (id) {
        // Cập nhật phản hồi cũ
        const index = feedbacks.findIndex((item) => item.id === id);
        if (index !== -1) {
          feedbacks[index] = {
            ...feedbacks[index],
            sender,
            subject,
            priority,
            assigned,
            status,
            message,
            response,
            updatedAt: today
          };
          showToast("Đã cập nhật phản hồi thành công.");
        }
      } else {
        // Thêm phản hồi mới
        const newRecord = {
          id: "fb-" + Date.now(),
          sender,
          subject,
          priority,
          assigned,
          status,
          message,
          response,
          updatedAt: today
        };
        feedbacks.unshift(newRecord);
        showToast("Đã tạo phản hồi mới.");
      }

      saveFeedbacks();
      closeModal();
      renderUI();
    });
  }

  // 5. Thao tác trên bảng (Sửa, Xóa, Đổi trạng thái nhanh)
  const tableBody = document.querySelector("[data-rows]");
  if (tableBody) {
    tableBody.addEventListener("click", (e) => {
      // Nút Sửa
      const editBtn = e.target.closest("[data-edit]");
      if (editBtn) {
        const id = editBtn.dataset.edit;
        openModal(id);
        return;
      }

      // Nút Xóa
      const deleteBtn = e.target.closest("[data-delete]");
      if (deleteBtn) {
        const id = deleteBtn.dataset.delete;
        const item = feedbacks.find((x) => x.id === id);
        if (!item) return;

        if (confirm(`Bạn có chắc muốn xóa phản hồi của "${item.sender}"?`)) {
          feedbacks = feedbacks.filter((x) => x.id !== id);
          saveFeedbacks();
          renderUI();
          showToast("Đã xóa phản hồi.");
        }
      }
    });

    // Bắt sự kiện chọn nhanh dropdown trạng thái trên từng dòng
    tableBody.addEventListener("change", (e) => {
      const select = e.target.closest("[data-change-status]");
      if (select) {
        const id = select.dataset.changeStatus;
        const item = feedbacks.find((x) => x.id === id);
        if (item) {
          item.status = select.value;
          saveFeedbacks();
          renderUI();
          showToast("Đã đổi trạng thái sang: " + select.value);
        }
      }
    });
  }

  // 6. Tìm kiếm và Bộ lọc
  const searchInput = document.querySelector("[data-search]");
  if (searchInput) {
    searchInput.addEventListener("input", renderUI);
  }

  const statusFilter = document.querySelector("[data-status-filter]");
  if (statusFilter) {
    statusFilter.addEventListener("change", renderUI);
  }

  // Nút Làm mới bộ lọc
  const clearBtn = document.querySelector("[data-clear]");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (statusFilter) statusFilter.value = "";
      renderUI();
    });
  }

  // 7. Xuất file CSV dữ liệu
  const exportBtn = document.querySelector("[data-export]");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      if (feedbacks.length === 0) {
        alert("Chưa có dữ liệu để xuất.");
        return;
      }
      let csvContent = "\uFEFFNgười gửi,Chủ đề,Mức độ,Phụ trách,Trạng thái,Ngày\r\n";
      feedbacks.forEach((item) => {
        csvContent += `"${item.sender}","${item.subject}","${item.priority}","${item.assigned}","${item.status}","${item.updatedAt}"\r\n`;
      });

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `danh-sach-phan-hoi-${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    });
  }

  // 8. Nút Đăng xuất
  const signoutBtn = document.querySelector("[data-signout]");
  if (signoutBtn) {
    signoutBtn.addEventListener("click", () => {
      localStorage.removeItem("spendwise.session");
      window.location.href = "../../thanh-vien-2/dung-chung/login.html";
    });
  }
});
