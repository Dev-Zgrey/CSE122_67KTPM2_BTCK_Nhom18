const STORAGE_KEY = "spendwise.resources";
let resources = [];

function loadResources(){
  const data = localStorage.getItem(STORAGE_KEY);
  if(data){
    try{
      resources = JSON.parse(data);
    } catch (e) {
    resources=[];
    }
  }
}

function saveResources(){
  localStorage.setItem(STORAGE_KEY,JSON.stringify(resources));
}

function escapeHTML(value){
  return String(value ?? "").replace(/[&<>"']/g, (character) =>({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function escapeCSV(value){
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function showToast(message){
  const container = document.querySelector("[data-toasts]");
  if(!container) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(),3000);
}

function renderUI() {
  const searchInput = document.querySelector("[data-search]");
  const statusFilter = document.querySelector("[data-status-filter]");
  const tableBody = document.querySelector("[data-rows]");
  const emptyState = document.querySelector("[data-empty]");
  const countLabel = document.querySelector("[data-count]");
  const statsContainer = document.querySelector("[data-stats]");

  const keyword = searchInput ? searchInput.value.trim().toLowerCase() :"";
  const selectedStatus = statusFilter ? statusFilter.value :"";

  const filteredList = resources.filter((item)=> {
    const matchSearch =
    !keyword ||
    item.title.toLowerCase().includes(keyword) ||
    (item.summary && item.summary.toLowerCase().includes(keyword));

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
      <article class="stat-card"><span>Tổng bài soạn</span><strong>${total}</strong></article>
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
          <button class="icon-button" type="button" title="Sửa bài soạn" data-edit="${escapeHTML(item.id)}">✎</button>
          <button class="icon-button" type="button" title="Xóa" data-delete="${escapeHTML(item.id)}">×</button>
        </div>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

const modal = document.querySelector("[data-modal]");
const form = document.querySelector("[data-form]");
const errorBox = document.querySelector("[data-error]");

function openModal(editId = null)  {
  if (!modal || !form) return;
  form.reset();
  if (errorBox) errorBox.textContent = "";

  if (editId) {
    const record = resources.find((x) => x.id === editId);
    if (!record) return;
    form.elements["id"].value = record.id;
    if (form.elements["title"]) form.elements["title"].value = record.title;
    if (form.elements["type"]) form.elements["type"].value = record.type;
    if (form.elements["audience"]) form.elements["audience"].value = record.audience;
    if (form.elements["status"]) form.elements["status"].value = record.status;
    if (form.elements["summary"]) form.elements["summary"].value = record.summary || "";
    if (form.elements["content"]) form.elements["content"].value = record.content || "";
  } else {
    form.elements["id"].value = "";
    if (form.elements["status"]) form.elements["status"].value = "Bản nháp";
  }

  modal.hidden = false;
}

function closeModal() {
  if (modal) modal.hidden = true;
}

document.addEventListener("DOMContentLoaded", () => {
  loadResources();
  renderUI();

  document.querySelectorAll("[data-create]").forEach((btn) =>
    btn.addEventListener("click", () => openModal()));

  document.querySelectorAll("[data-close]").forEach((btn) =>
    btn.addEventListener("click", closeModal));

  if (modal) modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (errorBox) errorBox.textContent = "";
      const id = form.elements["id"].value;
      const title = form.elements["title"] ? form.elements["title"].value.trim() : "";
      const type = form.elements["type"] ? form.elements["type"].value : "Bài học";
      const audience = form.elements["audience"] ? form.elements["audience"].value.trim() : "Tất cả";
      const status = form.elements["status"] ? form.elements["status"].value : "Bản nháp";
      const summary = form.elements["summary"] ? form.elements["summary"].value.trim() : "";
      const content = form.elements["content"] ? form.elements["content"].value.trim() : "";
      const today = new Date().toISOString().slice(0, 10);

      if (!title) {
        if (errorBox) errorBox.textContent = "Vui lòng nhập tiêu đề bài soạn.";
        else alert("Vui lòng nhập tiêu đề bài soạn.");
        return;
      }
      if (!content) {
        if (errorBox) errorBox.textContent = "Vui lòng nhập nội dung chi tiết.";
        else alert("Vui lòng nhập nội dung chi tiết.");
        return;
      }

      if (id) {
        const index = resources.findIndex((x) => x.id === id);
        if (index !== -1) {
          resources[index] = { ...resources[index] , title, type, audience, status, summary, content, updatedAt: today };
          showToast("Đã cập nhật bài soạn.");
        }
      } else {

        resources.unshift({ id: "res-" + Date.now(), title, type, audience, status, summary, content, updatedAt: today });
        showToast("Đã lưu bài soạn mới.");
      }

      saveResources();
      closeModal();
      renderUI();
    });
  }

  const tableBody = document.querySelector("[data-rows]");
  if (tableBody) {
    tableBody.addEventListener("click", (e) => {
      const editBtn = e.target.closest("[data-edit]");
      if (editBtn) {
        openModal(editBtn.dataset.edit);
        return;
      }
      const deleteBtn = e.target.closest("[data-delete]");
      if (deleteBtn) {
        const id = deleteBtn.dataset.delete;
        const item = resources.find((x) => x.id === id);
        if (!item) return;
        if (confirm(`Bạn có chắc muốn xóa bài soạn "${item.title}"?`)) {
          resources = resources.filter((x) => x.id !== id);
          saveResources();
          renderUI();
          showToast("Đã xóa bài soạn.");
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
      if (resources.length === 0) {
        showToast("Chưa có bài soạn để xuất.");
        return;
      }

      const headings = ["Tiêu đề", "Loại", "Đối tượng", "Trạng thái", "Tóm tắt", "Nội dung", "Ngày cập nhật"];
      const rows = resources.map((item) => [
        item.title, item.type, item.audience, item.status,
        item.summary, item.content, item.updatedAt
      ]);
      const csv = "\uFEFF" + [headings, ...rows]
        .map((row) => row.map(escapeCSV).join(","))
        .join("\r\n");
      const file = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = `bai-soan-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      showToast("Đã xuất danh sách bài soạn.");
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

