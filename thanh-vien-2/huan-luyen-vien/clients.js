// GHI CHÚ: Nạp học viên từ dữ liệu mẫu/LocalStorage, hiển thị danh sách và xử lý các thao tác lọc/tìm kiếm.
// ==========================================
// QUẢN LÝ DANH SÁCH HỌC VIÊN - SPENDWISE
// Dành cho sinh viên năm 2 - Dễ hiểu, dễ bảo vệ
// ==========================================

// 1. DỮ LIỆU MẪU BAN ĐẦU
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

// Khóa lưu demoUsers trong LocalStorage (dùng chung với trang Quản trị viên)
const STORAGE_KEY = "spendwise.demoUsers";
let clients = [];

// Đọc dữ liệu từ LocalStorage
// Đọc danh sách học viên demo từ bộ nhớ trình duyệt và nạp dữ liệu dự phòng khi cần.
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

// ==========================================
// 2. HIỂN THỊ DỮ LIỆU RA GIAO DIỆN (RENDER)
// ==========================================

// Áp dụng từ khóa/trạng thái lọc, sau đó cập nhật bảng học viên và trạng thái không có kết quả.
function renderUI() {
  const searchInput = document.querySelector("[data-search]");
  const statusFilter = document.querySelector("[data-status-filter]");
  const tableBody = document.querySelector("[data-rows]");
  const emptyState = document.querySelector("[data-empty]");
  const countLabel = document.querySelector("[data-count]");
  const statsContainer = document.querySelector("[data-stats]");

  const keyword = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const selectedStatus = statusFilter ? statusFilter.value : "";

  // Lọc học viên theo từ khóa (tên, email, mục tiêu) và trạng thái
  const filteredList = clients.filter((item) => {
    const matchSearch =
      !keyword ||
      item.name.toLowerCase().includes(keyword) ||
      item.email.toLowerCase().includes(keyword) ||
      (item.goal && item.goal.toLowerCase().includes(keyword));

    const matchStatus = !selectedStatus || item.status === selectedStatus;

    return matchSearch && matchStatus;
  });

  // 1. Cập nhật số lượng
  if (countLabel) {
    countLabel.textContent = `${filteredList.length} mục · ${clients.length} tổng cộng`;
  }

  // 2. Cập nhật thẻ thống kê
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

  // 3. Trạng thái rỗng
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
        </div>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

// ==========================================
// 3. KHỞI CHẠY VÀ GẮN SỰ KIỆN
// ==========================================

// Nạp và hiển thị danh sách ban đầu, rồi đăng ký các thao tác lọc sau khi DOM sẵn sàng.
document.addEventListener("DOMContentLoaded", () => {
  loadClients();
  renderUI();

  // Tìm kiếm
  const searchInput = document.querySelector("[data-search]");
  if (searchInput) {
    searchInput.addEventListener("input", renderUI);
  }

  // Bộ lọc trạng thái
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

  // Nút Đăng xuất
  const signoutBtn = document.querySelector("[data-signout]");
  if (signoutBtn) {
    signoutBtn.addEventListener("click", () => {
      localStorage.removeItem("spendwise.session");
      window.location.href = "../../thanh-vien-2/dung-chung/login.html";
    });
  }
});
