// CHÚ THÍCH BỔ SUNG: Xử lý biểu mẫu đăng nhập demo, kiểm tra tài khoản, lưu phiên và điều hướng theo vai trò.
// ==========================================
// ĐĂNG NHẬP - SPENDWISE DEMO
// Dành cho sinh viên năm 2 - Dễ hiểu, dễ bảo vệ
// ==========================================

// Tài khoản demo mặc định nếu chưa có
const DEFAULT_ACCOUNT = {
  email: "an.tran@spendwise.demo",
  password: "spendwise",
  name: "Nguyễn An"
};

const ROLE_HOMES = {
  user: "../../thanh-vien-1/nguoi-dung/overview.html",
  coach: "../../thanh-vien-2/huan-luyen-vien/clients.html",
  moderator: "../../thanh-vien-3/kiem-duyet-vien/resources.html",
  admin: "../../thanh-vien-3/quan-tri-vien/dashboard.html"
};

// Chờ HTML được dựng xong rồi mới tìm biểu mẫu và gắn các trình xử lý.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-form]");
  const errorBox = document.querySelector("[data-error]");

  if (!form) return;

  // Chặn tải lại trang, kiểm tra thông tin nhập, sau đó lưu phiên hoặc hiện lỗi.
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    errorBox.textContent = "";

    const email = form.elements["email"].value.trim().toLowerCase();
    const password = form.elements["password"].value;
    const role = form.elements["role"].value || "user";

    // 1. Đọc danh sách tài khoản đã đăng ký trong LocalStorage
    let registeredAccounts = [];
    try {
      const saved = localStorage.getItem("spendwise.demoAccounts");
      if (saved) registeredAccounts = JSON.parse(saved);
    } catch (err) {
      registeredAccounts = [];
    }

    // 2. Kiểm tra tài khoản
    let matchedAccount = registeredAccounts.find((acc) => acc.email === email);
    let defaultPassword = DEFAULT_ACCOUNT.password;
    try {
      defaultPassword = localStorage.getItem("spendwise.defaultPassword") || DEFAULT_ACCOUNT.password;
    } catch (err) {
      // Keep the built-in demo credentials available when storage is blocked.
    }
    const isDefault = email === DEFAULT_ACCOUNT.email && password === defaultPassword;

    if (!isDefault && (!matchedAccount || matchedAccount.password !== password)) {
      errorBox.textContent = "Email hoặc mật khẩu không đúng. Vui lòng kiểm tra lại!";
      return;
    }

    // 3. Xác định tên hiển thị
    const userName = matchedAccount ? matchedAccount.name : DEFAULT_ACCOUNT.name;

    // 4. Lưu phiên đăng nhập (Session) vào LocalStorage
    const sessionData = {
      email: email,
      name: userName,
      role: role,
      signedInAt: new Date().toISOString()
    };
    localStorage.setItem("spendwise.session", JSON.stringify(sessionData));

    // 5. Chuyển hướng tới trang chính tương ứng với vai trò đã chọn
    const targetUrl = ROLE_HOMES[role] || ROLE_HOMES.user;
    window.location.href = targetUrl;
  });
});
