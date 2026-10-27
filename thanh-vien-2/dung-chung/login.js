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
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-form]");
  const errorBox = document.querySelector("[data-error]");

  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    errorBox.textContent = "";

    const email = form.elements["email"].value.trim().toLowerCase();
    const password = form.elements["password"].value;
    const role = form.elements["role"].value || "user";
    let registeredAccounts = [];
    try {
      const saved = localStorage.getItem("spendwise.demoAccounts");
      if (saved) registeredAccounts = JSON.parse(saved);
    } catch (err) {
      registeredAccounts = [];
    }
    let matchedAccount = registeredAccounts.find((acc) => acc.email === email);
    let defaultPassword = DEFAULT_ACCOUNT.password;
    try {
      defaultPassword = localStorage.getItem("spendwise.defaultPassword") || DEFAULT_ACCOUNT.password;
    } catch (err) {
    }
    const isDefault = email === DEFAULT_ACCOUNT.email && password === defaultPassword;

    if (!isDefault && (!matchedAccount || matchedAccount.password !== password)) {
      errorBox.textContent = "Email hoặc mật khẩu không đúng. Vui lòng kiểm tra lại!";
      return;
    }
    const userName = matchedAccount ? matchedAccount.name : DEFAULT_ACCOUNT.name;
    const sessionData = {
      email: email,
      name: userName,
      role: role,
      signedInAt: new Date().toISOString()
    };
    localStorage.setItem("spendwise.session", JSON.stringify(sessionData));
    const targetUrl = ROLE_HOMES[role] || ROLE_HOMES.user;
    window.location.href = targetUrl;
  });
});
