document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-form]");
  const errorBox = document.querySelector("[data-error]");
  const successBox = document.querySelector("[data-success]");

  if (!form) return;

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

      localStorage.setItem("spendwise.defaultPassword", password);
    }

    if (successBox) {
      successBox.hidden = false;
      successBox.textContent = "Đã cập nhật mật khẩu mới thành công! Bạn có thể quay lại đăng nhập.";
    }
    form.reset();
  });
});
