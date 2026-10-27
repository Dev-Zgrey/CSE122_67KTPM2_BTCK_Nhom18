
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
document.addEventListener("DOMContentLoaded", () => {
  loadNotifications();
  renderUI();

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

  const signoutBtn = document.querySelector("[data-signout]");
  if (signoutBtn) {
    signoutBtn.addEventListener("click", () => {
      localStorage.removeItem("spendwise.session");
      window.location.href = "login.html";
    });
  }
});
