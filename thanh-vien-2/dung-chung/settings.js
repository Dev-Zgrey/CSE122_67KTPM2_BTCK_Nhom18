const STORAGE_KEY = "spendwise.settings";

const DEFAULT_SETTINGS = {
  currency: "VND",
  timezone: "Asia/Ho_Chi_Minh",
  notifications: true
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-form]");
  const successBox = document.querySelector("[data-success]");
  const signoutBtn = document.querySelector("[data-signout]");
  const resetBtn = document.querySelector("[data-reset]");

  if (!form) return;

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

  if (signoutBtn) {
    signoutBtn.addEventListener("click", () => {
      localStorage.removeItem("spendwise.session");
      window.location.href = "login.html";
    });
  }

  if (resetBtn) {

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
