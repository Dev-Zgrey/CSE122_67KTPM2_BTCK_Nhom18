const DEFAULT_CLIENTS = [
  {
    id: "usr-an",
    name: "Nguyễn An",
    email: "an.tran@spendwise.demo",
    role: "Người dùng",
    status: "Hoạt động",
    goal: "Quỹ dự phòng",
    budget: "Đúng kế hoạch",
    createdAt: "2026-09-01"
  },
  {
    id: "usr-minh",
    name: "Trần Minh",
    email: "minh.tran@example.test",
    role: "Người dùng",
    status: "Hoạt động",
    goal: "Du lịch Đà Lạt",
    budget: "Cần theo dõi",
    createdAt: "2026-08-15"
  },
  {
    id: "usr-linh",
    name: "Lê Linh",
    email: "linh.le@example.test",
    role: "Người dùng",
    status: "Chờ xác minh",
    goal: "Quỹ học tập",
    budget: "Đúng kế hoạch",
    createdAt: "2026-10-01"
  }
];
const STORAGE_KEY = "spendwise.demoUsers";
let clients = [];
function loadClients() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      clients = JSON.parse(data);
    } catch (e) {
      clients = DEFAULT_CLIENTS;
    }
  } else {
    clients = DEFAULT_CLIENTS;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
  }
}
function saveClients() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
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
function renderUI() {
  const searchInput = document.querySelector("[data-search]");
  const statusFilter = document.querySelector("[data-status-filter]");
  const tableBody = document.querySelector("[data-rows]");
  const emptyState = document.querySelector("[data-empty]");
  const countLabel = document.querySelector("[data-count]");
  const statsContainer = document.querySelector("[data-stats]");

  const keyword = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const selectedStatus = statusFilter ? statusFilter.value : "";
  const filteredList = clients.filter((item) => {
    const matchSearch =
      !keyword ||
      item.name.toLowerCase().includes(keyword) ||
      item.email.toLowerCase().includes(keyword) ||
      (item.goal && item.goal.toLowerCase().includes(keyword));

    const matchStatus = !selectedStatus || item.status === selectedStatus;

    return matchSearch && matchStatus;
  });
  if (countLabel) {
    countLabel.textContent = `${filteredList.length} mục · ${clients.length} tổng cộng`;
  }
  if (statsContainer) {
    const total = clients.length;
    const activeCount = clients.filter((x) => x.status === "Hoạt động").length;
    const pendingCount = clients.filter((x) => x.status === "Chờ xác minh").length;
    const watchCount = clients.filter((x) => x.budget && x.budget.includes("Cần theo dõi")).length;

    statsContainer.innerHTML = `
      <article class="stat-card"><span>Tổng học viên</span><strong>${total}</strong></article>
      <article class="stat-card"><span>Đang hoạt động</span><strong>${activeCount}</strong></article>
      <article class="stat-card"><span>Chờ xác minh</span><strong>${pendingCount}</strong></article>
      <article class="stat-card"><span>Cần theo dõi</span><strong>${watchCount}</strong></article>
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
    if (item.status === "Đã khóa" || item.status === "Tạm ngưng") badgeClass += " is-danger";
    else if (item.status === "Chờ xác minh") badgeClass += " is-warning";

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.name}</td>
      <td>${item.email}</td>
      <td>${item.goal || "—"}</td>
      <td>${item.budget || "—"}</td>
      <td><span class="${badgeClass}">${item.status}</span></td>
      <td>
        <div class="row-action">
          <a class="icon-button" style="text-decoration:none" title="Xem đánh giá" href="budget.html">↗</a>
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
  const record = editId ? clients.find((item) => item.id === editId) : null;
  if (editId && !record) return;
  modalTitle.textContent = record ? "Chỉnh sửa học viên" : "Thêm học viên";
  form.elements["id"].value = record?.id || "";
  form.elements["name"].value = record?.name || "";
  form.elements["email"].value = record?.email || "";
  form.elements["goal"].value = record?.goal || "";
  form.elements["budget"].value = record?.budget || "";
  form.elements["status"].value = record?.status || "Hoạt động";
  modal.hidden = false;
}
function closeModal() {
  if (modal) modal.hidden = true;
}
document.addEventListener("DOMContentLoaded", () => {
  loadClients();
  renderUI();
  document.querySelectorAll("[data-create]").forEach((button) => button.addEventListener("click", () => openModal()));
  document.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", closeModal));
  if (modal) modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });
  if (form) form.addEventListener("submit", (event) => {
    event.preventDefault();
    errorBox.textContent = "";
    const id = form.elements["id"].value;
    const client = {
      id: id || `client-${Date.now()}`,
      name: form.elements["name"].value.trim(),
      email: form.elements["email"].value.trim().toLowerCase(),
      goal: form.elements["goal"].value.trim(),
      budget: form.elements["budget"].value.trim(),
      status: form.elements["status"].value,
      role: "Người dùng",
      createdAt: new Date().toISOString().slice(0, 10)
    };
    if (clients.some((item) => item.email === client.email && item.id !== id)) {
      errorBox.textContent = "Email này đã có trong danh sách học viên.";
      return;
    }
    if (id) {
      const index = clients.findIndex((item) => item.id === id);
      if (index !== -1) clients[index] = { ...clients[index], ...client };
    } else {
      clients.unshift(client);
    }
    saveClients();
    closeModal();
    renderUI();
    showToast(id ? "Đã cập nhật học viên." : "Đã thêm học viên.");
  });
  const tableBody = document.querySelector("[data-rows]");
  if (tableBody) tableBody.addEventListener("click", (event) => {
    const editButton = event.target.closest("[data-edit]");
    if (editButton) {
      openModal(editButton.dataset.edit);
      return;
    }
    const deleteButton = event.target.closest("[data-delete]");
    if (deleteButton) {
      const client = clients.find((item) => item.id === deleteButton.dataset.delete);
      if (!client || !confirm(`Xóa học viên ${client.name}?`)) return;
      clients = clients.filter((item) => item.id !== client.id);
      saveClients();
      renderUI();
      showToast("Đã xóa học viên.");
    }
  });
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
  const signoutBtn = document.querySelector("[data-signout]");
  if (signoutBtn) {
    signoutBtn.addEventListener("click", () => {
      localStorage.removeItem("spendwise.session");
      window.location.href = "../../thanh-vien-2/dung-chung/login.html";
    });
  }
});
