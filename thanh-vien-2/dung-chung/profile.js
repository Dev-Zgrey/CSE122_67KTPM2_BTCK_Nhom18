// CHÚ THÍCH BỔ SUNG: Trang hồ sơ cá nhân; tải thông tin đã lưu, điền vào biểu mẫu và lưu các thay đổi.
/* GHI CHÚ: Trang hồ sơ cá nhân. Tải thông tin từ LocalStorage, đưa vào biểu mẫu,
 * kiểm tra dữ liệu khi lưu và đồng bộ tên trong phiên đăng nhập demo.
 * LocalStorage chỉ lưu dữ liệu trên trình duyệt/thiết bị hiện tại. */
// ==========================================
// HỒ SƠ CÁ NHÂN - SPENDWISE
// Dành cho sinh viên năm 2 - Dễ hiểu, dễ bảo vệ
// ==========================================

// Khóa định danh: mọi lần đọc/ghi hồ sơ đều dùng cùng tên để tìm đúng mục trong LocalStorage.
const STORAGE_KEY = "spendwise.profile";

// Dữ liệu dự phòng dùng khi người dùng chưa lưu hồ sơ hoặc dữ liệu lưu trước đó không đọc được.
const DEFAULT_PROFILE = {
  name: "Nguyễn An",
  email: "an.tran@spendwise.demo",
  phone: "0901234567",
  occupation: "Sinh viên / Freelancer"
};

// Đợi HTML sẵn sàng để lấy hồ sơ, điền các trường và gắn xử lý gửi biểu mẫu.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-form]");
  const successBox = document.querySelector("[data-success]");
  const errorBox = document.querySelector("[data-error]");

  if (!form) return;

  // 1. Tải thông tin hồ sơ hiện có từ LocalStorage
  // Bắt đầu bằng dữ liệu mặc định; nếu có bản đã lưu hợp lệ thì thay bằng bản đó.
  let currentProfile = DEFAULT_PROFILE;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) currentProfile = JSON.parse(saved);
  } catch (e) {
    currentProfile = DEFAULT_PROFILE;
  }

  // Điền dữ liệu vào các ô input
  // Đưa dữ liệu vào các ô tương ứng theo thuộc tính name của input; || "" tránh điền giá trị null.
  if (form.elements["name"]) form.elements["name"].value = currentProfile.name || "";
  if (form.elements["email"]) form.elements["email"].value = currentProfile.email || "";
  if (form.elements["phone"]) form.elements["phone"].value = currentProfile.phone || "";
  if (form.elements["occupation"]) form.elements["occupation"].value = currentProfile.occupation || "";

  // 2. Lưu thay đổi khi submit
  // Thu thập các giá trị mới và lưu hồ sơ; đồng bộ tên nếu hồ sơ thuộc phiên hiện tại.
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (errorBox) errorBox.textContent = "";
    if (successBox) successBox.hidden = true;

    // trim() loại bỏ khoảng trắng thừa ở đầu/cuối trước khi kiểm tra và lưu.
    const name = form.elements["name"].value.trim();
    const email = form.elements["email"].value.trim();
    const phone = form.elements["phone"].value.trim();
    const occupation = form.elements["occupation"].value.trim();

    // Họ tên và email là trường bắt buộc; dừng submit nếu người dùng bỏ trống.
    if (!name || !email) {
      if (errorBox) errorBox.textContent = "Vui lòng nhập họ tên và email hợp lệ.";
      return;
    }

    // Gom các giá trị đã kiểm tra thành một đối tượng rồi tuần tự hóa để lưu dạng chuỗi JSON.
    const updated = { name, email, phone, occupation };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Cập nhật tên trong session nếu cùng email
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
