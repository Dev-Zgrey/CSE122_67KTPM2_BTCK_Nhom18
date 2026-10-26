// CHÚ THÍCH BỔ SUNG: Mô phỏng đặt lại mật khẩu cho tài khoản demo ngay trên trình duyệt, không gửi email.
// ==========================================
// QUÊN MẬT KHẨU - SPENDWISE
// Dành cho sinh viên năm 2 - Dễ hiểu, dễ bảo vệ
// ==========================================

// Chờ cấu trúc trang sẵn sàng trước khi truy cập các phần tử biểu mẫu.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-form]");
  const errorBox = document.querySelector("[data-error]");
  const successBox = document.querySelector("[data-success]");

  if (!form) return;

  // Ngăn tải lại trang, xác nhận thông tin tài khoản/mật khẩu rồi lưu mật khẩu mới.
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    errorBox.textContent = "";
    if (successBox) successBox.hidden = true;

    const email = form.elements["email"].value.trim().toLowerCase();
    const password = form.elements["password"].value;
    const confirm = form.elements["confirm"].value;

    if (password.length < 6) {
      errorBox.textContent = "Mật khẩu mới phải có ít nhất 6 ký tự.";
      return;
    }

    if (password !== confirm) {
      errorBox.textContent = "Hai mật khẩu nhập vào chưa khớp nhau.";
      return;
    }

    // Đọc danh sách tài khoản
    let accounts = [];
    try {
      const saved = localStorage.getItem("spendwise.demoAccounts");
      if (saved) accounts = JSON.parse(saved);
    } catch (err) {
      accounts = [];
    }

    const account = accounts.find((acc) => acc.email === email);
    const isDefault = email === "an.tran@spendwise.demo";

    if (!account && !isDefault) {
      errorBox.textContent = "Không tìm thấy email này trong hệ thống dữ liệu demo.";
      return;
    }

    if (account) {
      account.password = password;
      localStorage.setItem("spendwise.demoAccounts", JSON.stringify(accounts));
    } else {
      // The built-in demo account is not stored in demoAccounts.
      localStorage.setItem("spendwise.defaultPassword", password);
    }

    if (successBox) {
      successBox.hidden = false;
      successBox.textContent = "Đã cập nhật mật khẩu mới thành công! Bạn có thể quay lại đăng nhập.";
    }
    form.reset();
  });
});
