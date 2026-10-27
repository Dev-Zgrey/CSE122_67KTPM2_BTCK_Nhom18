const DEFAULT_REVIEWS = [
  {
    id: "rev-1",
    client: "Nguyễn An",
    period: "2026-10",
    submitted: "2026-10-05",
    status: "Chờ review",
    comment: "Ngân sách tháng này có bổ sung chi phí khóa học lập trình.",
    suggestion: "Có thể tối ưu chi phí ăn uống để bù lại."
  },
  {
    id: "rev-2",
    client: "Trần Minh",
    period: "2026-09",
    submitted: "2026-09-08",
    status: "Đã duyệt",
    comment: "Kế hoạch phân bổ tài chính rất hợp lý.",
    suggestion: "Tiếp tục duy trì thói quen chi tiêu này."
  }
];

const STORAGE_KEY = "spendwise.coachReviews";
let reviews = [];
function loadReviews() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      reviews = JSON.parse(data);
    } catch (e) {
      reviews = DEFAULT_REVIEWS;
    }
  } else {
    reviews = DEFAULT_REVIEWS;
    saveReviews();
  }
}
function saveReviews() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
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

  const filteredList = reviews.filter((item) => {
    const matchSearch =
      !keyword ||
      item.client.toLowerCase().includes(keyword) ||
      (item.comment && item.comment.toLowerCase().includes(keyword));

    const matchStatus = !selectedStatus || item.status === selectedStatus;

    return matchSearch && matchStatus;
  });

  if (countLabel) {
    countLabel.textContent = `${filteredList.length} mục · ${reviews.length} tổng cộng`;
  }

  if (statsContainer) {
    const total = reviews.length;
    const pendingCount = reviews.filter((x) => x.status === "Chờ review" || x.status === "Cần bổ sung").length;
    const approvedCount = reviews.filter((x) => x.status === "Đã duyệt").length;
    const rejectedCount = reviews.filter((x) => x.status === "Từ chối").length;

    statsContainer.innerHTML = `
      <article class="stat-card"><span>Tổng số review</span><strong>${total}</strong></article>
      <article class="stat-card"><span>Chờ duyệt</span><strong>${pendingCount}</strong></article>
      <article class="stat-card"><span>Đã duyệt</span><strong>${approvedCount}</strong></article>
      <article class="stat-card"><span>Từ chối</span><strong>${rejectedCount}</strong></article>
    `;
  }

  if (emptyState) emptyState.hidden = filteredList.length > 0;
  const tableScroll = document.querySelector(".table-scroll");
  if (tableScroll) tableScroll.hidden = filteredList.length === 0;

  if (!tableBody) return;
  tableBody.innerHTML = "";

  filteredList.forEach((item) => {
    let badgeClass = "status-badge";
    if (item.status === "Từ chối") badgeClass += " is-danger";
    else if (item.status === "Chờ review" || item.status === "Cần bổ sung") badgeClass += " is-warning";

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.client}</td>
      <td>${item.period}</td>
      <td>${item.submitted || "—"}</td>
      <td><span class="${badgeClass}">${item.status}</span></td>
      <td>${item.comment || "—"}</td>
      <td>
        <div class="row-action">
          <select class="status-select" data-change-status="${item.id}" aria-label="Đổi trạng thái">
            <option value="Chờ review" ${item.status === "Chờ review" ? "selected" : ""}>Chờ review</option>
            <option value="Cần bổ sung" ${item.status === "Cần bổ sung" ? "selected" : ""}>Cần bổ sung</option>
            <option value="Đã duyệt" ${item.status === "Đã duyệt" ? "selected" : ""}>Đã duyệt</option>
            <option value="Từ chối" ${item.status === "Từ chối" ? "selected" : ""}>Từ chối</option>
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
function openModal(editId = null) {
  if (!modal || !form) return;
  form.reset();

  if (editId) {
    const record = reviews.find((x) => x.id === editId);
    if (!record) return;
    if (modalTitle) modalTitle.textContent = "Sửa đánh giá ngân sách";
    form.elements["id"].value = record.id;
    if (form.elements["client"]) form.elements["client"].value = record.client;
    if (form.elements["period"]) form.elements["period"].value = record.period;
    if (form.elements["submitted"]) form.elements["submitted"].value = record.submitted;
    if (form.elements["status"]) form.elements["status"].value = record.status;
    if (form.elements["comment"]) form.elements["comment"].value = record.comment || "";
    if (form.elements["suggestion"]) form.elements["suggestion"].value = record.suggestion || "";
  } else {
    if (modalTitle) modalTitle.textContent = "Tạo yêu cầu review ngân sách";
    form.elements["id"].value = "";
    if (form.elements["status"]) form.elements["status"].value = "Chờ review";
    if (form.elements["submitted"]) form.elements["submitted"].value = new Date().toISOString().slice(0, 10);
  }

  modal.hidden = false;
}
function closeModal() {
  if (modal) modal.hidden = true;
}
document.addEventListener("DOMContentLoaded", () => {
  loadReviews();
  renderUI();
  document.querySelectorAll("[data-create]").forEach((btn) => btn.addEventListener("click", () => openModal()));
  document.querySelectorAll("[data-close]").forEach((btn) => btn.addEventListener("click", closeModal));
  if (modal) modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = form.elements["id"].value;
      const client = form.elements["client"] ? form.elements["client"].value.trim() : "";
      const period = form.elements["period"] ? form.elements["period"].value : "";
      const submitted = form.elements["submitted"] ? form.elements["submitted"].value : new Date().toISOString().slice(0, 10);
      const status = form.elements["status"] ? form.elements["status"].value : "Chờ review";
      const comment = form.elements["comment"] ? form.elements["comment"].value.trim() : "";
      const suggestion = form.elements["suggestion"] ? form.elements["suggestion"].value.trim() : "";

      if (!client) {
        alert("Vui lòng nhập tên học viên!");
        return;
      }

      if (id) {
        const index = reviews.findIndex((x) => x.id === id);
        if (index !== -1) {
          reviews[index] = { ...reviews[index], client, period, submitted, status, comment, suggestion };
          showToast("Đã cập nhật đánh giá ngân sách.");
        }
      } else {
        reviews.unshift({ id: "rev-" + Date.now(), client, period, submitted, status, comment, suggestion });
        showToast("Đã tạo yêu cầu review mới.");
      }

      saveReviews();
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
        const item = reviews.find((x) => x.id === id);
        if (!item) return;
        if (confirm(`Bạn có chắc muốn xóa đánh giá của "${item.client}"?`)) {
          reviews = reviews.filter((x) => x.id !== id);
          saveReviews();
          renderUI();
          showToast("Đã xóa đánh giá.");
        }
      }
    });

    tableBody.addEventListener("change", (e) => {
      const select = e.target.closest("[data-change-status]");
      if (select) {
        const id = select.dataset.changeStatus;
        const item = reviews.find((x) => x.id === id);
        if (item) {
          item.status = select.value;
          saveReviews();
          renderUI();
          showToast("Đã cập nhật trạng thái review sang: " + select.value);
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
      let csv = "\uFEFFHọc viên,Kỳ ngân sách,Ngày gửi,Trạng thái,Nhận xét\r\n";
      reviews.forEach((x) => {
        csv += `"${x.client}","${x.period}","${x.submitted}","${x.status}","${x.comment}"\r\n`;
      });
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `danh-gia-ngan-sach-${new Date().toISOString().slice(0, 10)}.csv`;
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
