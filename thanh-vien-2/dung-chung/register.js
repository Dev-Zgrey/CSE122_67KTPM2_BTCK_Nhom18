document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-form]");
  const errorBox = document.querySelector("[data-error]");
  const successBox = document.querySelector("[data-success]");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    errorBox.textContent = "";
    if (successBox) successBox.hidden = true;

    const name = form.elements["name"].value.trim();
    const email = form.elements["email"].value.trim().toLowerCase();
    const password = form.elements["password"].value;
    const confirm = form.elements["confirm"].value;

    if (password.length < 6) {
      errorBox.textContent = "Mật khẩu cần ít nhất 6 ký tự.";
      return;
    }

    if (password !== confirm) {
      errorBox.textContent = "Mật khẩu xác nhận chưa khớp.";
      return;
    }

    let accounts = [];
    try {
      const saved = localStorage.getItem("spendwise.demoAccounts");
      if (saved) accounts = JSON.parse(saved);
    } catch (err) {
      accounts = [];
    }

    if (accounts.some((acc) => acc.email === email) || email === "an.tran@spendwise.demo") {
      errorBox.textContent = "Email này đã được sử dụng. Vui lòng chọn email khác!";
      return;
    }

    const newAccount = {
      id: "usr-" + Date.now(),
      name: name,
      email: email,
      password: password,
      role: "user",
      createdAt: new Date().toISOString().slice(0, 10)
    };
    accounts.push(newAccount);
    localStorage.setItem("spendwise.demoAccounts", JSON.stringify(accounts));

    try {
      let users = JSON.parse(localStorage.getItem("spendwise.demoUsers") || "[]");
      users.push({
        id: newAccount.id,
        name: name,
        email: email,
        role: "Người dùng",
        status: "Hoạt động",
        goal: "Chưa thiết lập",
        budget: "Đúng kế hoạch"
      });
      localStorage.setItem("spendwise.demoUsers", JSON.stringify(users));
    } catch (err) {}

    if (successBox) {
      successBox.hidden = false;
      successBox.textContent = "Đăng ký thành công! Đang chuyển đến trang đăng nhập...";
    }
    form.reset();

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1200);
  });
});
