// CHÚ THÍCH BỔ SUNG: Nạp tùy chọn cá nhân, lưu thay đổi, khôi phục thiết lập mặc định và xử lý đăng xuất.
// ==========================================
// CÀI ĐẶT HỆ THỐNG DEMO - SPENDWISE
// Dành cho sinh viên năm 2 - Dễ hiểu, dễ bảo vệ
// ==========================================

const STORAGE_KEY = "spendwise.settings";

const DEFAULT_SETTINGS = {
  currency: "VND",
  timezone: "Asia/Ho_Chi_Minh",
  notifications: true
};

// Khởi chạy sau khi HTML tải xong để đồng bộ tùy chọn với các điều khiển trên giao diện.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-form]");
  const successBox = document.querySelector("[data-success]");
  const signoutBtn = document.querySelector("[data-signout]");
  const resetBtn = document.querySelector("[data-reset]");

  if (!form) return;

  // 1. Tải cài đặt hiện có
  let currentSettings = DEFAULT_SETTINGS;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) currentSettings = JSON.parse(saved);
  } catch (e) {
    currentSettings = DEFAULT_SETTINGS;
  }

  if (form.elements["currency"]) form.elements["currency"].value = currentSettings.currency;
  if (form.elements["timezone"]) form.elements["timezone"].value = currentSettings.timezone;
  if (form.elements["notifications"]) form.elements["notifications"].checked = currentSettings.notifications;

  // 2. Lưu cài đặt
  // Đọc các lựa chọn và kiểm tra dữ liệu trước khi cập nhật cài đặt trong localStorage.
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const currency = form.elements["currency"].value;
    const timezone = form.elements["timezone"].value;
    const notifications = form.elements["notifications"].checked;

    const newSettings = { currency, timezone, notifications };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));

    if (successBox) {
      successBox.hidden = false;
      successBox.textContent = "Đã lưu cấu hình cài đặt thành công!";
    }
  });

  // 3. Đăng xuất
  if (signoutBtn) {
    signoutBtn.addEventListener("click", () => {
      localStorage.removeItem("spendwise.session");
      window.location.href = "login.html";
    });
  }

  // 4. Xóa dữ liệu reset demo
  if (resetBtn) {
    // Khôi phục bộ giá trị mặc định và cập nhật lại các điều khiển tương ứng.
    resetBtn.addEventListener("click", () => {
      if (confirm("Bạn có chắc muốn đặt lại toàn bộ dữ liệu demo về trạng thái ban đầu?")) {
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith("spendwise.")) {
            localStorage.removeItem(key);
          }
        });
        alert("Đã đặt lại dữ liệu demo thành công. Hãy tải lại trang!");
        window.location.reload();
      }
    });
  }
});
