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

const STORAGE_KEY = "spendwise.feedback";

let feedbacks = [];

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

function saveFeedbacks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbacks));
}

function showToast(message, isError = false) {
  const container = document.querySelector("[data-toasts]");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = isError ? "toast is-danger" : "toast";
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function renderUI() {
  const searchInput = document.querySelector("[data-search]");
  const statusFilter = document.querySelector("[data-status-filter]");
  const tableBody = document.querySelector("[data-rows]");
  const emptyState = document.querySelector("[data-empty]");
  const countLabel = document.querySelector("[data-count]");
  const statsContainer = document.querySelector("[data-stats]");

  const keyword = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const selectedStatus = statusFilter ? statusFilter.value : "";

  const filteredList = feedbacks.filter((item) => {
    const matchSearch =
      !keyword ||
      item.sender.toLowerCase().includes(keyword) ||
      item.subject.toLowerCase().includes(keyword) ||
      (item.message && item.message.toLowerCase().includes(keyword));

    const matchStatus = !selectedStatus || item.status === selectedStatus;

    return matchSearch && matchStatus;
  });

  if (countLabel) {
    countLabel.textContent = `${filteredList.length} mục · ${feedbacks.length} tổng cộng`;
  }

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

  if (emptyState) {
    emptyState.hidden = filteredList.length > 0;
  }
  const tableScroll = document.querySelector(".table-scroll");
  if (tableScroll) {
    tableScroll.hidden = filteredList.length === 0;
  }

  if (!tableBody) return;
  tableBody.innerHTML = "";

  filteredList.forEach((item) => {

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

const modal = document.querySelector("[data-modal]");
const form = document.querySelector("[data-form]");
const modalTitle = document.querySelector("#modal-title");
const errorBox = document.querySelector("[data-error]");

function openModal(editId = null) {
  if (!modal || !form) return;
  form.reset();
  errorBox.textContent = "";

  if (editId) {

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

    modalTitle.textContent = "Tạo phản hồi";
    form.elements["id"].value = "";
    form.elements["status"].value = "Mới";
    form.elements["assigned"].value = "Huấn luyện viên";
  }

  modal.hidden = false;
}

function closeModal() {
  if (modal) modal.hidden = true;
}

document.addEventListener("DOMContentLoaded", () => {

  loadFeedbacks();
  renderUI();

  document.querySelectorAll("[data-create]").forEach((btn) => {
    btn.addEventListener("click", () => openModal());
  });

  document.querySelectorAll("[data-close]").forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

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

      if (!sender || !subject || !message) {
        errorBox.textContent = "Vui lòng nhập đầy đủ các thông tin bắt buộc (*).";
        return;
      }

      const today = new Date().toISOString().slice(0, 10);

      if (id) {

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

  const tableBody = document.querySelector("[data-rows]");
  if (tableBody) {
    tableBody.addEventListener("click", (e) => {

      const editBtn = e.target.closest("[data-edit]");
      if (editBtn) {
        const id = editBtn.dataset.edit;
        openModal(id);
        return;
      }

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

  const searchInput = document.querySelector("[data-search]");
  if (searchInput) {
    searchInput.addEventListener("input", renderUI);
  }

  const statusFilter = document.querySelector("[data-status-filter]");
  if (statusFilter) {
    statusFilter.addEventListener("change", renderUI);
  }

  const clearBtn = document.querySelector("[data-clear]");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (statusFilter) statusFilter.value = "";
      renderUI();
    });
  }

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

  const signoutBtn = document.querySelector("[data-signout]");
  if (signoutBtn) {
    signoutBtn.addEventListener("click", () => {
      localStorage.removeItem("spendwise.session");
      window.location.href = "../../thanh-vien-2/dung-chung/login.html";
    });
  }
});
