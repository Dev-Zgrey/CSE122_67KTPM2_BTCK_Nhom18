
const DEFAULT_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "Cảnh báo ngân sách",
    type: "Ngân sách",
    message: "Hạn mức chi tiêu Ăn uống của bạn đã đạt 85%.",
    date: "2026-10-15",
    status: "Chưa đọc"
  },
  {
    id: "notif-2",
    title: "Mục tiêu tiết kiệm",
    type: "Gợi ý",
    message: "Bạn đã hoàn thành 50% mục tiêu Quỹ dự phòng!",
    date: "2026-10-12",
    status: "Đã đọc"
  },
  {
    id: "notif-3",
    title: "Cập nhật hệ thống",
    type: "Hệ thống",
    message: "Phiên bản SpendWise Frontend demo đã sẵn sàng.",
    date: "2026-10-01",
    status: "Đã đọc"
  }
];

const STORAGE_KEY = "spendwise.notifications";
let notifications = [];
function loadNotifications() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      notifications = JSON.parse(data);
    } catch (e) {
      notifications = DEFAULT_NOTIFICATIONS;
    }
  } else {
    notifications = DEFAULT_NOTIFICATIONS;
    saveNotifications();
  }
}
function saveNotifications() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
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

  const filteredList = notifications.filter((item) => {
    const matchSearch =
      !keyword ||
      item.title.toLowerCase().includes(keyword) ||
      item.message.toLowerCase().includes(keyword);

    const matchStatus = !selectedStatus || item.status === selectedStatus;
    return matchSearch && matchStatus;
  });

  if (countLabel) {
    countLabel.textContent = `${filteredList.length} thông báo · ${notifications.length} tổng cộng`;
  }

  if (statsContainer) {
    const total = notifications.length;
    const unreadCount = notifications.filter((x) => x.status === "Chưa đọc").length;
    const readCount = notifications.filter((x) => x.status === "Đã đọc").length;

    statsContainer.innerHTML = `
      <article class="stat-card"><span>Tổng số</span><strong>${total}</strong></article>
      <article class="stat-card"><span>Chưa đọc</span><strong>${unreadCount}</strong></article>
      <article class="stat-card"><span>Đã đọc</span><strong>${readCount}</strong></article>
    `;
  }

  if (emptyState) emptyState.hidden = filteredList.length > 0;
  const tableScroll = document.querySelector(".table-scroll");
  if (tableScroll) tableScroll.hidden = filteredList.length === 0;

  if (!tableBody) return;
  tableBody.innerHTML = "";

  filteredList.forEach((item) => {
    const isUnread = item.status === "Chưa đọc";
    const badgeClass = isUnread ? "status-badge is-warning" : "status-badge";

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${item.title}</strong></td>
      <td>${item.type}</td>
      <td>${item.message}</td>
      <td>${item.date}</td>
      <td><span class="${badgeClass}">${item.status}</span></td>
      <td>
        <div class="row-action">
          <button class="icon-button" type="button" title="Đánh dấu đã đọc" data-toggle="${item.id}">✓</button>
          <button class="icon-button" type="button" title="Xóa" data-delete="${item.id}">×</button>
        </div>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}
function showToast(message) {
  const container = document.querySelector("[data-toasts]");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
document.addEventListener("DOMContentLoaded", () => {
  loadNotifications();
  renderUI();

  const modal = document.querySelector("[data-modal]");
  const form = document.querySelector("[data-form]");
  const errorBox = document.querySelector("[data-error]");
  const openModal = () => {
    if (!modal || !form) return;
    form.reset();
    errorBox.textContent = "";
    form.elements["date"].value = new Date().toISOString().slice(0, 10);
    form.elements["status"].value = "Chưa đọc";
    modal.hidden = false;
  };
  const closeModal = () => { if (modal) modal.hidden = true; };
  document.querySelectorAll("[data-create]").forEach((button) => button.addEventListener("click", openModal));
  document.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", closeModal));
  if (modal) modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });
  if (form) form.addEventListener("submit", (event) => {
    event.preventDefault();
    errorBox.textContent = "";
    const notification = {
      id: `notif-${Date.now()}`,
      title: form.elements["title"].value.trim(),
      type: form.elements["type"].value,
      message: form.elements["message"].value.trim(),
      date: form.elements["date"].value,
      status: form.elements["status"].value
    };
    notifications.unshift(notification);
    saveNotifications();
    closeModal();
    renderUI();
    showToast("Đã tạo thông báo.");
  });

  const tableBody = document.querySelector("[data-rows]");
  if (tableBody) {
    tableBody.addEventListener("click", (e) => {
      const toggleBtn = e.target.closest("[data-toggle]");
      if (toggleBtn) {
        const id = toggleBtn.dataset.toggle;
        const item = notifications.find((x) => x.id === id);
        if (item) {
          item.status = item.status === "Chưa đọc" ? "Đã đọc" : "Chưa đọc";
          saveNotifications();
          renderUI();
        }
        return;
      }
      const deleteBtn = e.target.closest("[data-delete]");
      if (deleteBtn) {
        const id = deleteBtn.dataset.delete;
        notifications = notifications.filter((x) => x.id !== id);
        saveNotifications();
        renderUI();
      }
    });
  }

  const searchInput = document.querySelector("[data-search]");
  if (searchInput) searchInput.addEventListener("input", renderUI);

  const statusFilter = document.querySelector("[data-status-filter]");
  if (statusFilter) statusFilter.addEventListener("change", renderUI);

  const clearBtn = document.querySelector("[data-clear]");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (statusFilter) statusFilter.value = "";
      renderUI();
    });
  }

  const exportBtn = document.querySelector("[data-export]");
  if (exportBtn) exportBtn.addEventListener("click", () => {
    const columns = ["Tiêu đề", "Loại", "Nội dung", "Ngày", "Trạng thái"];
    const escapeCSV = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
    const rows = notifications.map((item) => [item.title, item.type, item.message, item.date, item.status]);
    const csv = [columns, ...rows].map((row) => row.map(escapeCSV).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "spendwise-notifications.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  const signoutBtn = document.querySelector("[data-signout]");
  if (signoutBtn) {
    signoutBtn.addEventListener("click", () => {
      localStorage.removeItem("spendwise.session");
      window.location.href = "login.html";
    });
  }
});
