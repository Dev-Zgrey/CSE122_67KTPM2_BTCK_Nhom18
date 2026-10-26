// GHI CHÚ: Mã xử lý danh sách tài liệu: tải/lưu dữ liệu, dựng giao diện, tìm kiếm và thêm/sửa/xuất.
const STORAGE_KEY = "spendwise.resources";
let resources = [];

// Đọc danh sách JSON đã lưu; nếu dữ liệu hỏng thì dùng danh sách rỗng để trang vẫn hoạt động.
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

// Ghi danh sách tài nguyên hiện tại vào localStorage để giữ các thay đổi.
function saveResources(){
  localStorage.setItem(STORAGE_KEY,JSON.stringify(resources));
}

// Mã hóa ký tự HTML đặc biệt trước khi ghép dữ liệu người dùng vào markup.
function escapeHTML(value){
  return String(value ?? "").replace(/[&<>"']/g, (character) =>({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

// Định dạng một ô CSV, nhân đôi dấu ngoặc kép nằm bên trong giá trị.
function escapeCSV(value){
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}


// Hiển thị thông báo thao tác tạm thời rồi tự xóa sau ba giây.
function showToast(message){
  const container = document.querySelector("[data-toasts]");
  if(!container) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(),3000);
}

// Lọc theo từ khóa/trạng thái, cập nhật thống kê và dựng bảng hoặc trạng thái rỗng.
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
 if (emptyState) emptyState.hidden = filteredList.length > 0; /*thông báo rỗng , nếu .length>0 thì hidden = true, =0 thì false và sẽ hiển thị đáp án */
  const tableScroll = document.querySelector(".table-scroll");
  if (tableScroll) tableScroll.hidden = filteredList.length === 0; //nếu không có dữ liệu thì ẩn bảng

  if (!tableBody) return;
  tableBody.innerHTML = ""; //nếu ko tìm thấy <tbody> thì xóa toàn bổ mảng cũ

  filteredList.forEach((item) => /*ForEach chạy qua từng phần tử*/{
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

function openModal(editId = null) /*tạo hàm Modal ,nếu editId =NULL thì tạo bài mới ,ngược lại thì sửa */ {
  if (!modal || !form) return; //nếu ko có Modal or Form thì dừng
  form.reset();
  if (errorBox) errorBox.textContent = "";

  if (editId) {
    const record = resources.find((x) => x.id === editId); //tìm bài có ID tương ứng
    if (!record) return;
    form.elements["id"].value = record.id;
    if (form.elements["title"]) form.elements["title"].value = record.title;
    if (form.elements["type"]) form.elements["type"].value = record.type;
    if (form.elements["audience"]) form.elements["audience"].value = record.audience;
    if (form.elements["status"]) form.elements["status"].value = record.status;
    if (form.elements["summary"]) form.elements["summary"].value = record.summary || ""; // nếu có record thì lấy ko thì chuỗi rỗng
    if (form.elements["content"]) form.elements["content"].value = record.content || "";
  } else {
    form.elements["id"].value = ""; //tạo bài mới
    if (form.elements["status"]) form.elements["status"].value = "Bản nháp";
  }

  modal.hidden = false; //hiện moadal
}

// Ẩn hộp thoại; dữ liệu chỉ được ghi ở luồng gửi biểu mẫu.
function closeModal() {
  if (modal) modal.hidden = true; // ẩn modal
}

// Khởi tạo dữ liệu và giao diện sau khi HTML sẵn sàng, rồi gắn các thao tác người dùng.
document.addEventListener("DOMContentLoaded", () => {
  loadResources();
  renderUI();

  document.querySelectorAll("[data-create]").forEach((btn) => 
    btn.addEventListener("click", () => openModal()));
  /*tìm phần tử có data-create khi click thì mở modal  */
  document.querySelectorAll("[data-close]").forEach((btn) => 
    btn.addEventListener("click", closeModal));

  //khi click vào modal thì sự kiện cho vào e
  if (modal) modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // ngăn trình duyệt reload trang
      if (errorBox) errorBox.textContent = "";
      const id = form.elements["id"].value;
      const title = form.elements["title"] ? form.elements["title"].value.trim() : "";
      const type = form.elements["type"] ? form.elements["type"].value : "Bài học";
      const audience = form.elements["audience"] ? form.elements["audience"].value.trim() : "Tất cả";
      const status = form.elements["status"] ? form.elements["status"].value : "Bản nháp";
      const summary = form.elements["summary"] ? form.elements["summary"].value.trim() : "";
      const content = form.elements["content"] ? form.elements["content"].value.trim() : "";
      const today = new Date().toISOString().slice(0, 10); //lấy ngày hiện tại

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
        const index = resources.findIndex((x) => x.id === id); // tìm ví trí của trong mảng
        if (index !== -1) {
          resources[index] = { ...resources[index] /*dữ lại các dấu hiệu cũ,rồi thêm dấu hiệu mới */, title, type, audience, status, summary, content, updatedAt: today };
          showToast("Đã cập nhật bài soạn.");
        }
      } else {
        //unshift: thêm phần tử vào đầu mảng
        resources.unshift({ id: "res-" + Date.now(), title, type, audience, status, summary, content, updatedAt: today });
        showToast("Đã lưu bài soạn mới.");
      }

      saveResources(); //lưu và cập nhật giao diện
      closeModal(); //đóng form
      renderUI(); // vẽ lại giao diện
    });
  }

  //xử lý nút cần xóa
  const tableBody = document.querySelector("[data-rows]");
  if (tableBody) {
    tableBody.addEventListener("click", (e) => {
      const editBtn = e.target.closest("[data-edit]"); //closet: tìm phần từ gần nhất có data-edit
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
          resources = resources.filter((x) => x.id !== id); //giữ lại tất cả bài
          saveResources();
          renderUI();
          showToast("Đã xóa bài soạn.");
        }
      }
    });
  }

  const searchInput = document.querySelector("[data-search]");
  if (searchInput) searchInput.addEventListener("input", renderUI);
//gọi lại , hàm renderUI bảng được lọc ngay lập tức
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

