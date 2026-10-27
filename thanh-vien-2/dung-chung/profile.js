
const STORAGE_KEY = "spendwise.profile";
const DEFAULT_PROFILE = {
  name: "Nguyễn An",
  email: "an.tran@spendwise.demo",
  phone: "0901234567",
  occupation: "Sinh viên / Freelancer"
};
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-form]");
  const successBox = document.querySelector("[data-success]");
  const errorBox = document.querySelector("[data-error]");

  if (!form) return;
  let currentProfile = DEFAULT_PROFILE;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) currentProfile = JSON.parse(saved);
  } catch (e) {
    currentProfile = DEFAULT_PROFILE;
  }
  if (form.elements["name"]) form.elements["name"].value = currentProfile.name || "";
  if (form.elements["email"]) form.elements["email"].value = currentProfile.email || "";
  if (form.elements["phone"]) form.elements["phone"].value = currentProfile.phone || "";
  if (form.elements["occupation"]) form.elements["occupation"].value = currentProfile.occupation || "";
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (errorBox) errorBox.textContent = "";
    if (successBox) successBox.hidden = true;
    const name = form.elements["name"].value.trim();
    const email = form.elements["email"].value.trim();
    const phone = form.elements["phone"].value.trim();
    const occupation = form.elements["occupation"].value.trim();
    if (!name || !email) {
      if (errorBox) errorBox.textContent = "Vui lòng nhập họ tên và email hợp lệ.";
      return;
    }
    const updated = { name, email, phone, occupation };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    try {
      const session = JSON.parse(localStorage.getItem("spendwise.session") || "{}");
      if (session && session.email === email) {
        session.name = name;
        localStorage.setItem("spendwise.session", JSON.stringify(session));
      }
    } catch (err) {}

    if (successBox) {
      successBox.hidden = false;
      successBox.textContent = "Đã lưu thay đổi hồ sơ thành công trên thiết bị này!";
    }
  });
});
