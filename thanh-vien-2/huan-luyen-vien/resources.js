// GHI CHÚ: Nạp/lưu tài nguyên, render danh sách, mở form thêm/sửa và cập nhật nội dung theo tìm kiếm/bộ lọc.
// ==========================================
// QUẢN LÝ TÀI NGUYÊN GIÁO DỤC - SPENDWISE
// Dành cho sinh viên năm 2 - Dễ hiểu, dễ bảo vệ
// ==========================================

// 1. DỮ LIỆU MẪU BAN ĐẦU
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

// Nạp dữ liệu đã lưu; dùng danh sách mặc định khi chưa có dữ liệu hoặc JSON không hợp lệ.
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

// Tuần tự hóa mảng tài nguyên và lưu vào localStorage.
function saveResources() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resources));
}

// Hiển thị phản hồi ngắn trên giao diện rồi tự gỡ thông báo.
function showToast(message) {
  const container = document.querySelector("[data-toasts]");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ==========================================
// 2. HIỂN THỊ DỮ LIỆU RA GIAO DIỆN (RENDER)
// ==========================================

// Áp dụng tìm kiếm/bộ lọc, tính thống kê và dựng lại bảng tài nguyên.
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
      <td>${item.title}</td>
      <td>${item.type}</td>
      <td>${item.audience}</td>
      <td>${item.updatedAt || "—"}</td>
      <td><span class="${badgeClass}">${item.status}</span></td>
      <td>
        <div class="row-action">
          <button class="icon-button" type="button" title="Sửa" data-edit="${item.id}">✎</button>
          <button class="icon-button" type="button" title="Xóa" data-delete="${item.id}">×</button>
        </div>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

// ==========================================
// 3. XỬ LÝ MODAL (THÊM / SỬA)
// ==========================================

const modal = document.querySelector("[data-modal]");
const form = document.querySelector("[data-form]");
const modalTitle = document.querySelector("#modal-title");

// Mở form tạo mới hoặc điền dữ liệu bản ghi hiện tại vào form sửa.
function openModal(editId = null) {
  if (!modal || !form) return;
  form.reset();

  if (editId) {
    const record = resources.find((x) => x.id === editId);
    if (!record) return;
    if (modalTitle) modalTitle.textContent = "Sửa tài nguyên";
    form.elements["id"].value = record.id;
    if (form.elements["title"]) form.elements["title"].value = record.title;
    if (form.elements["type"]) form.elements["type"].value = record.type;
    if (form.elements["audience"]) form.elements["audience"].value = record.audience;
    if (form.elements["status"]) form.elements["status"].value = record.status;
    if (form.elements["summary"]) form.elements["summary"].value = record.summary || "";
    if (form.elements["content"]) form.elements["content"].value = record.content || "";
  } else {
    if (modalTitle) modalTitle.textContent = "Tạo tài nguyên";
    form.elements["id"].value = "";
    if (form.elements["status"]) form.elements["status"].value = "Bản nháp";
  }

  modal.hidden = false;
}

// Ẩn hộp thoại mà không tự lưu nội dung chưa gửi.
function closeModal() {
  if (modal) modal.hidden = true;
}

// ==========================================
// 4. KHỞI CHẠY VÀ GẮN SỰ KIỆN
// ==========================================

// Nạp dữ liệu, dựng giao diện ban đầu và đăng ký các trình xử lý sau khi DOM sẵn sàng.
document.addEventListener("DOMContentLoaded", () => {
  loadResources();
  renderUI();

  // Mở/Đóng Modal
  document.querySelectorAll("[data-create]").forEach((btn) => btn.addEventListener("click", () => openModal()));
  document.querySelectorAll("[data-close]").forEach((btn) => btn.addEventListener("click", closeModal));
  if (modal) modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

  // Lưu Form
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = form.elements["id"].value;
      const title = form.elements["title"] ? form.elements["title"].value.trim() : "";
      const type = form.elements["type"] ? form.elements["type"].value : "Bài học";
      const audience = form.elements["audience"] ? form.elements["audience"].value.trim() : "Tất cả";
      const status = form.elements["status"] ? form.elements["status"].value : "Bản nháp";
      const summary = form.elements["summary"] ? form.elements["summary"].value.trim() : "";
      const content = form.elements["content"] ? form.elements["content"].value.trim() : "";
      const today = new Date().toISOString().slice(0, 10);

      if (!title) {
        alert("Vui lòng nhập tiêu đề tài nguyên.");
        return;
      }

      if (id) {
        const index = resources.findIndex((x) => x.id === id);
        if (index !== -1) {
          resources[index] = { ...resources[index], title, type, audience, status, summary, content, updatedAt: today };
          showToast("Đã cập nhật tài nguyên.");
        }
      } else {
        resources.unshift({ id: "res-" + Date.now(), title, type, audience, status, summary, content, updatedAt: today });
        showToast("Đã tạo tài nguyên mới.");
      }

      saveResources();
      closeModal();
      renderUI();
    });
  }

  // Bảng sự kiện (Sửa / Xóa)
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
        if (confirm(`Bạn có chắc muốn xóa tài nguyên "${item.title}"?`)) {
          resources = resources.filter((x) => x.id !== id);
          saveResources();
          renderUI();
          showToast("Đã xóa tài nguyên.");
        }
      }
    });
  }

  // Tìm kiếm & Lọc
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

  // Xuất CSV
  const exportBtn = document.querySelector("[data-export]");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      let csv = "\uFEFFTiêu đề,Loại,Đối tượng,Ngày cập nhật,Trạng thái\r\n";
      resources.forEach((x) => {
        csv += `"${x.title}","${x.type}","${x.audience}","${x.updatedAt}","${x.status}"\r\n`;
      });
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `tai-nguyen-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  // Đăng xuất
  const signoutBtn = document.querySelector("[data-signout]");
  if (signoutBtn) {
    signoutBtn.addEventListener("click", () => {
      localStorage.removeItem("spendwise.session");
      window.location.href = "../../thanh-vien-2/dung-chung/login.html";
    });
  }
});
