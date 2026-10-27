const DEFAULT_RESOURCES = [
  {
    id: "res-1",
    title: "Hướng dẫn lập ngân sách 50/30/20",
    type: "Hướng dẫn",
    audience: "Người mới bắt đầu",
    status: "Đã xuất bản",
    summary: "Phương pháp phân bổ thu nhập thành các khoản thiết yếu, mong muốn và tiết kiệm.",
    tags: "ngân-sách, cơ-bản",
    content: "Chi tiết các bước chia thu nhập...",
    updatedAt: "2026-10-01"
  },
  {
    id: "res-2",
    title: "Bài tập nhận diện chi tiêu bốc đồng",
    type: "Bài tập",
    audience: "Học viên cần theo dõi",
    status: "Chờ duyệt",
    summary: "Nhật ký 7 ngày ghi nhận cảm xúc trước mỗi lần quẹt thẻ mua sắm.",
    tags: "thói-quen, tâm-lý",
    content: "Các câu hỏi tự vấn trước khi thanh toán...",
    updatedAt: "2026-10-08"
  }
];

const STORAGE_KEY = "spendwise.resources";
let resources = [];
function loadResources() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      resources = JSON.parse(data);
    } catch (e) {
      resources = DEFAULT_RESOURCES;
    }
  } else {
    resources = DEFAULT_RESOURCES;
    saveResources();
  }
}
function saveResources() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resources));
}
function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}
function escapeCSV(value) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
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

  const filteredList = resources.filter((item) => {
    const matchSearch =
      !keyword ||
      item.title.toLowerCase().includes(keyword) ||
      (item.summary && item.summary.toLowerCase().includes(keyword)) ||
      (item.tags && item.tags.toLowerCase().includes(keyword)) ||
      item.type.toLowerCase().includes(keyword) ||
      item.audience.toLowerCase().includes(keyword);

    const matchStatus = !selectedStatus || item.status === selectedStatus;

    return matchSearch && matchStatus;
  });

  if (countLabel) {
    countLabel.textContent = `${filteredList.length} mục · ${resources.length} tổng cộng`;
  }

  if (statsContainer) {
    const total = resources.length;
    const publishedCount = resources.filter((x) => x.status === "Đã xuất bản").length;
    const pendingCount = resources.filter((x) => x.status === "Chờ duyệt").length;
    const draftCount = resources.filter((x) => x.status === "Bản nháp").length;

    statsContainer.innerHTML = `
      <article class="stat-card"><span>Tổng số</span><strong>${total}</strong></article>
      <article class="stat-card"><span>Đã xuất bản</span><strong>${publishedCount}</strong></article>
      <article class="stat-card"><span>Chờ duyệt</span><strong>${pendingCount}</strong></article>
      <article class="stat-card"><span>Bản nháp</span><strong>${draftCount}</strong></article>
    `;
  }

  if (emptyState) emptyState.hidden = filteredList.length > 0;
  const tableScroll = document.querySelector(".table-scroll");
  if (tableScroll) tableScroll.hidden = filteredList.length === 0;

  if (!tableBody) return;
  tableBody.innerHTML = "";

  filteredList.forEach((item) => {
    let badgeClass = "status-badge";
    if (item.status === "Cần chỉnh sửa" || item.status === "Đã lưu trữ") badgeClass += " is-danger";
    else if (item.status === "Chờ duyệt") badgeClass += " is-warning";

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${escapeHTML(item.title)}</td>
      <td>${escapeHTML(item.type)}</td>
      <td>${escapeHTML(item.audience || "Tất cả")}</td>
      <td>${escapeHTML(item.updatedAt || "—")}</td>
      <td><span class="${badgeClass}">${escapeHTML(item.status)}</span></td>
      <td>
        <div class="row-action">
          <a class="button button-secondary row-edit-link" href="edit-resource.html?id=${encodeURIComponent(item.id)}">Soạn</a>
          <button class="icon-button" type="button" title="Xóa" aria-label="Xóa ${escapeHTML(item.title)}" data-delete="${escapeHTML(item.id)}">×</button>
        </div>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadResources();
  renderUI();
  const tableBody = document.querySelector("[data-rows]");
  if (tableBody) {
    tableBody.addEventListener("click", (e) => {
      const deleteBtn = e.target.closest("[data-delete]");
      if (deleteBtn) {
        const id = deleteBtn.dataset.delete;
        const item = resources.find((x) => x.id === id);
        if (!item) return;
        if (confirm(`Bạn có chắc muốn xóa tài nguyên "${item.title}"?`)) {
          resources = resources.filter((x) => x.id !== id);
          saveResources();
          renderUI();
          showToast("Đã xóa tài nguyên.");
        }
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
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      const headings = ["Tiêu đề", "Loại", "Đối tượng", "Thẻ", "Ngày cập nhật", "Trạng thái"];
      const rows = resources.map((item) => [item.title, item.type, item.audience, item.tags, item.updatedAt, item.status]);
      const csv = "\uFEFF" + [headings, ...rows].map((row) => row.map(escapeCSV).join(",")).join("\r\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `tai-nguyen-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
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
