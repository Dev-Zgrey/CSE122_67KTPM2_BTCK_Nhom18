const errorCode = new URLSearchParams(window.location.search).get("code") === "403" ? "403" : "404";
window.AccountPage = errorCode === "403"
  ? { "type": "error", "code": errorCode, "title": "Bạn chưa có quyền truy cập", "description": "Tài khoản demo hiện tại không được phép mở nội dung này." }
  : { "type": "error", "code": errorCode, "title": "Không tìm thấy trang", "description": "Đường dẫn có thể đã thay đổi hoặc trang không tồn tại." };

(() => {
  function init() {
    "use strict";
    const config = window.AccountPage;
    const root = document.querySelector("[data-account-root]");
    if (!root || !config) return;
    const roles = { user: "Người dùng", coach: "Huấn luyện viên", moderator: "Kiểm duyệt viên", admin: "Quản trị viên" };
    const roleHome = { user: "../../thanh-vien-1/nguoi-dung/overview.html", coach: "../../thanh-vien-2/huan-luyen-vien/clients.html", moderator: "../../thanh-vien-3/kiem-duyet-vien/resources.html", admin: "../../thanh-vien-3/quan-tri-vien/dashboard.html" };
    const pageLinks = [
      ["Dùng chung", [["Đăng nhập", "login.html"], ["Đăng ký", "register.html"], ["Quên mật khẩu", "forgot-password.html"], ["Hồ sơ", "profile.html"], ["Cài đặt", "settings.html"], ["Thông báo", "notifications.html"], ["Không tìm thấy", "404.html"]]],
      ["Người dùng", [["Tổng quan tài chính", "../../thanh-vien-1/nguoi-dung/overview.html"], ["Giao dịch", "../../thanh-vien-1/nguoi-dung/transactions.html"], ["Ngân sách", "../../thanh-vien-1/nguoi-dung/budget.html"], ["Mục tiêu tiết kiệm", "../../thanh-vien-1/nguoi-dung/goals.html"], ["Phân tích chi tiêu", "../../thanh-vien-1/nguoi-dung/insights.html"]]],
      ["Huấn luyện viên", [["Danh sách học viên", "../../thanh-vien-2/huan-luyen-vien/clients.html"], ["Đánh giá ngân sách", "../../thanh-vien-2/huan-luyen-vien/budget.html"], ["Quản lý tài nguyên", "../../thanh-vien-2/huan-luyen-vien/resources.html"], ["Soạn tài nguyên", "../../thanh-vien-2/huan-luyen-vien/edit-resource.html"], ["Phản hồi", "../../thanh-vien-2/huan-luyen-vien/feedback.html"]]],
      ["Kiểm duyệt viên", [["Duyệt nội dung", "../../thanh-vien-3/kiem-duyet-vien/resources.html"], ["Mẫu AI", "../../thanh-vien-3/kiem-duyet-vien/ai-templates.html"], ["Trung tâm báo cáo", "../../thanh-vien-3/kiem-duyet-vien/feedback.html"]]],
      ["Quản trị viên", [["Tổng quan hệ thống", "../../thanh-vien-3/quan-tri-vien/dashboard.html"], ["Danh mục chi tiêu", "../../thanh-vien-3/quan-tri-vien/categories.html"], ["Tài khoản", "../../thanh-vien-3/quan-tri-vien/users.html"]]]
    ];
    const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
    const read = (key, fallback) => {
      const saved = localStorage.getItem(`spendwise.${key}`);
      return saved === null ? fallback : JSON.parse(saved);
    };
    const write = (key, value) => localStorage.setItem(`spendwise.${key}`, JSON.stringify(value));
    const makeId = () => globalThis.crypto?.randomUUID?.() || `sw-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const demoUsers = [
      { id: "usr-an", name: "Nguyễn An", email: "an.tran@spendwise.demo", role: "Người dùng", status: "Hoạt động", goal: "Quỹ dự phòng", budget: "Đúng kế hoạch", createdAt: "2026-09-01" },
      { id: "usr-minh", name: "Trần Minh", email: "minh.tran@example.test", role: "Người dùng", status: "Hoạt động", goal: "Du lịch Đà Lạt", budget: "Cần theo dõi", createdAt: "2026-08-15" },
      { id: "usr-linh", name: "Lê Linh", email: "linh.le@example.test", role: "Người dùng", status: "Chờ xác minh", goal: "Quỹ học tập", budget: "Đúng kế hoạch", createdAt: "2026-10-01" }
    ];
    const demoCategories = [
      { id: "cat-1", name: "Ăn uống", type: "Chi tiêu", icon: "♨", status: "Hoạt động", order: 1 },
      { id: "cat-2", name: "Nhà cửa", type: "Chi tiêu", icon: "⌂", status: "Hoạt động", order: 2 },
      { id: "cat-3", name: "Di chuyển", type: "Chi tiêu", icon: "↗", status: "Hoạt động", order: 3 },
      { id: "cat-4", name: "Lương", type: "Thu nhập", icon: "▤", status: "Hoạt động", order: 4 },
      { id: "cat-5", name: "Mua sắm", type: "Chi tiêu", icon: "◇", status: "Hoạt động", order: 5 },
      { id: "cat-6", name: "Sức khỏe", type: "Chi tiêu", icon: "✚", status: "Hoạt động", order: 6 },
      { id: "cat-7", name: "Giải trí", type: "Chi tiêu", icon: "♫", status: "Hoạt động", order: 7 },
      { id: "cat-8", name: "Hóa đơn", type: "Chi tiêu", icon: "▧", status: "Hoạt động", order: 8 },
      { id: "cat-9", name: "Khác", type: "Chi tiêu", icon: "◌", status: "Hoạt động", order: 9 },
      { id: "cat-10", name: "Thưởng", type: "Thu nhập", icon: "✦", status: "Hoạt động", order: 5 },
      { id: "cat-11", name: "Đầu tư", type: "Thu nhập", icon: "↗", status: "Hoạt động", order: 6 },
      { id: "cat-12", name: "Làm thêm", type: "Thu nhập", icon: "✎", status: "Hoạt động", order: 7 },
      { id: "cat-13", name: "Khác", type: "Thu nhập", icon: "◌", status: "Hoạt động", order: 8 }
    ];
    try {
      if (localStorage.getItem("spendwise.demoUsers") === null) write("demoUsers", demoUsers);
      if (localStorage.getItem("spendwise.categories") === null) write("categories", demoCategories);
    } catch (error) {
      root.dataset.storageError = `Dữ liệu demo chưa khởi tạo được: ${error.message}`;
    }
    const nav = `<header class="header"><a class="brand" href="../../index.html"><span class="brand-mark">S</span>SpendWise</a><nav class="header-links"><a href="../../index.html">Trang chủ</a><a href="login.html">Đăng nhập</a></nav></header>`;
    const shell = (content) => `<div class="container">${nav}<main class="main">${content}</main><footer class="footer">SpendWise · Bản demo frontend · Dữ liệu chỉ lưu trên trình duyệt</footer></div>`;
    const field = (label, name, type = "text", value = "", required = true, placeholder = "") => `<div class="field"><label for="${name}">${label}${required ? " *" : ""}</label><input id="${name}" name="${name}" type="${type}" value="${esc(value)}" placeholder="${esc(placeholder)}" ${required ? "required" : ""} ${type === "email" ? 'autocomplete="email"' : ""}></div>`;
    const formShell = (title, description, body, button) => `<section class="card"><h1>${title}</h1><p>${description}</p><form class="form" data-form>${body}<div class="error" data-error role="alert"></div><button class="button" type="submit">${button}</button><div class="success" data-success hidden></div></form></section>`;

    if (config.type === "landing") {
      if (!root.hasAttribute("data-static-account")) root.innerHTML = shell(`<section class="hero"><div class="kicker">Tiền của bạn, rõ ràng hơn</div><h1>Hiểu dòng tiền.<br>Xây thói quen tốt.</h1><p>SpendWise giúp bạn ghi nhận giao dịch, lập kế hoạch ngân sách và theo dõi mục tiêu tài chính trong một không gian dễ sử dụng.</p><div class="hero-actions"><a class="button" href="login.html">Bắt đầu sử dụng</a><a class="button button-secondary" href="register.html">Tạo tài khoản</a></div><div class="role-grid">${Object.entries(roles).map(([key, label]) => `<a class="role-card" href="${roleHome[key]}"><strong>${esc(label)}</strong><span>Mở bản demo theo vai trò →</span></a>`).join("")}</div></section><div class="directory">${pageLinks.map(([title, links]) => `<section class="group"><h2>${esc(title)}</h2>${links.map(([label, href]) => `<a href="${href}">${esc(label)}<span>→</span></a>`).join("")}</section>`).join("")}</div>`);
      return;
    }
    if (config.type === "login") {
      const body = `${field("Email", "email", "email", "an.tran@spendwise.demo", true)}${field("Mật khẩu", "password", "password", "spendwise", true)}<div class="field"><label for="role">Vai trò demo</label><select id="role" name="role"><option value="user">Người dùng</option><option value="coach">Huấn luyện viên</option><option value="moderator">Kiểm duyệt viên</option><option value="admin">Quản trị viên</option></select></div><label class="checkbox"><input name="remember" type="checkbox" checked><span>Ghi nhớ phiên đăng nhập trên thiết bị này</span></label>`;
      if (!root.hasAttribute("data-static-account")) root.innerHTML = shell(formShell("Đăng nhập", "Đăng nhập để tiếp tục hành trình tài chính của bạn.", body, "Đăng nhập vào SpendWise") + `<div class="divider"><a href="forgot-password.html">Quên mật khẩu?</a><a href="register.html">Tạo tài khoản</a></div><div class="success" style="margin-top:14px">Tài khoản demo: <b>an.tran@spendwise.demo</b> · Mật khẩu: <b>spendwise</b>. Chọn vai trò để mở các màn hình tương ứng.</div>`);
      root.querySelector("[data-form]").addEventListener("submit", (event) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.currentTarget));
        const error = root.querySelector("[data-error]");
        const email = String(data.email).trim().toLowerCase();
        let accounts;
        try { accounts = read("demoAccounts", []); } catch { accounts = []; }
        const account = accounts.find((item) => item.email === email);
        if ((!account && !(email === "an.tran@spendwise.demo" && data.password === "spendwise")) || (account && account.password !== data.password)) {
          error.textContent = "Email hoặc mật khẩu không đúng. Kiểm tra lại hoặc dùng tài khoản demo được cung cấp.";
          return;
        }
        const role = data.role || account?.role || "user";
        const name = account?.name || (role === "user" ? "Nguyễn An" : roles[role]);
        write("session", { email, name, role, signedInAt: new Date().toISOString(), remember: !!data.remember });
        try {
          write("auditLog", [...read("auditLog", []), { id: makeId(), actor: name, action: "Đăng nhập bản demo", target: role, status: "Thành công", date: new Date().toISOString() }]);
          location.href = roleHome[role] || roleHome.user;
        } catch (exception) {
          error.textContent = `Không thể lưu phiên demo: ${exception.message}`;
        }
      });
      return;
    }
    if (config.type === "register") {
      const body = `${field("Họ và tên", "name", "text", "", true, "Tên hiển thị")}${field("Email", "email", "email", "", true, "ban@example.com")}${field("Mật khẩu", "password", "password", "", true, "Ít nhất 8 ký tự")}${field("Xác nhận mật khẩu", "confirm", "password", "")}<label class="checkbox"><input name="terms" type="checkbox" required><span>Tôi đồng ý với điều khoản sử dụng và chính sách quyền riêng tư.</span></label>`;
      if (!root.hasAttribute("data-static-account")) root.innerHTML = shell(formShell("Tạo tài khoản", "Bắt đầu xây dựng thói quen tài chính lành mạnh.", body, "Tạo tài khoản") + `<div class="divider"><span>Đã có tài khoản?</span><a href="login.html">Đăng nhập</a></div>`);
      root.querySelector("[data-form]").addEventListener("submit", (event) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.currentTarget));
        const error = root.querySelector("[data-error]");
        if (String(data.password).length < 8) { error.textContent = "Mật khẩu cần ít nhất 8 ký tự."; return; }
        if (data.password !== data.confirm) { error.textContent = "Mật khẩu xác nhận chưa khớp."; return; }
        try {
          const accounts = read("demoAccounts", []);
          const email = String(data.email).trim().toLowerCase();
          if (accounts.some((item) => item.email === email) || email === "an.tran@spendwise.demo") { error.textContent = "Email này đã được sử dụng."; return; }
          const newAccount = { id: makeId(), name: String(data.name).trim(), email, password: data.password, role: "user", createdAt: new Date().toISOString() };
          accounts.push(newAccount);
          write("demoAccounts", accounts);
          const users = read("demoUsers", demoUsers);
          users.push({ ...newAccount, role: "Người dùng", status: "Hoạt động", goal: "", budget: "Chưa có dữ liệu" });
          write("demoUsers", users);
          write("profile", { name: String(data.name).trim(), email, phone: "", occupation: "" });
          root.querySelector("[data-success]").hidden = false;
          root.querySelector("[data-success]").textContent = "Đăng ký thành công. Đang chuyển tới trang đăng nhập…";
          event.currentTarget.reset();
          setTimeout(() => { location.href = "login.html"; }, 900);
        } catch (exception) { error.textContent = `Không thể lưu tài khoản demo: ${exception.message}`; }
      });
      return;
    }
    if (config.type === "forgot") {
      const body = `${field("Email tài khoản", "email", "email", "", true, "ban@example.com")}${field("Mật khẩu mới", "password", "password")}${field("Xác nhận mật khẩu mới", "confirm", "password")}`;
      if (!root.hasAttribute("data-static-account")) root.innerHTML = shell(formShell("Đặt lại mật khẩu", "Bản demo đổi mật khẩu cục bộ, không gửi email hoặc mã xác nhận.", body, "Cập nhật mật khẩu") + `<div class="divider"><a href="login.html">Quay lại đăng nhập</a></div>`);
      root.querySelector("[data-form]").addEventListener("submit", (event) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.currentTarget));
        const error = root.querySelector("[data-error]");
        if (data.password.length < 8 || data.password !== data.confirm) { error.textContent = "Mật khẩu phải có ít nhất 8 ký tự và hai trường phải khớp."; return; }
        try {
          const accounts = read("demoAccounts", []);
          const account = accounts.find((item) => item.email === String(data.email).toLowerCase());
          if (!account) { error.textContent = "Không tìm thấy email đã đăng ký trong dữ liệu demo."; return; }
          account.password = data.password;
          write("demoAccounts", accounts);
          root.querySelector("[data-success]").hidden = false;
          root.querySelector("[data-success]").textContent = "Đã cập nhật mật khẩu demo. Bạn có thể đăng nhập bằng mật khẩu mới.";
          event.currentTarget.reset();
        } catch (exception) { error.textContent = `Không thể cập nhật: ${exception.message}`; }
      });
      return;
    }
    if (config.type === "profile") {
      const profile = read("profile", { name: "Nguyễn An", email: "an.tran@spendwise.demo", phone: "", occupation: "" });
      const body = `${field("Họ và tên", "name", "text", profile.name)}${field("Email", "email", "email", profile.email)}${field("Số điện thoại", "phone", "tel", profile.phone || "", false)}${field("Nghề nghiệp", "occupation", "text", profile.occupation || "", false)}`;
      if (!root.hasAttribute("data-static-account")) root.innerHTML = shell(formShell("Hồ sơ cá nhân", "Cập nhật thông tin hồ sơ hiển thị trên thiết bị này.", body, "Lưu thay đổi"));
      root.querySelector("[name=name]").value = profile.name;
      root.querySelector("[name=email]").value = profile.email;
      root.querySelector("[name=phone]").value = profile.phone || "";
      root.querySelector("[name=occupation]").value = profile.occupation || "";
      root.querySelector("[data-form]").addEventListener("submit", (event) => {
        event.preventDefault();
        try {
          const updated = Object.fromEntries(new FormData(event.currentTarget));
          write("profile", updated);
          const session = read("session", {});
          if (session.email === updated.email) { session.name = updated.name; write("session", session); }
          const success = root.querySelector("[data-success]"); success.hidden = false; success.textContent = "Đã lưu hồ sơ trên trình duyệt.";
        } catch (exception) { root.querySelector("[data-error]").textContent = `Không thể lưu hồ sơ: ${exception.message}`; }
      });
      return;
    }
    if (config.type === "settings") {
      const settings = read("settings", { currency: "VND", timezone: "Asia/Ho_Chi_Minh", notifications: true });
      const body = `<div class="field"><label for="currency">Đơn vị tiền tệ</label><select name="currency" id="currency"><option value="VND" ${settings.currency === "VND" ? "selected" : ""}>VND — Đồng Việt Nam</option><option value="USD" ${settings.currency === "USD" ? "selected" : ""}>USD — Đô la Mỹ</option></select></div><div class="field"><label for="timezone">Múi giờ</label><select name="timezone" id="timezone"><option value="Asia/Ho_Chi_Minh">Việt Nam (UTC+7)</option><option value="UTC">UTC</option></select></div><label class="checkbox"><input name="notifications" type="checkbox" ${settings.notifications ? "checked" : ""}><span>Cho phép thông báo trong bản demo</span></label><div class="field">${field("Mật khẩu mới (tùy chọn)", "password", "password", "", false)}${field("Xác nhận mật khẩu", "confirm", "password", "", false)}</div><button class="button button-secondary" type="button" data-signout>Đăng xuất trên thiết bị này</button><button class="button button-secondary" type="button" data-reset>Đặt lại dữ liệu demo</button>`;
      if (!root.hasAttribute("data-static-account")) root.innerHTML = shell(formShell("Cài đặt", "Tùy chỉnh trải nghiệm demo SpendWise trên thiết bị này.", body, "Lưu cài đặt"));
      root.querySelector("[name=currency]").value = settings.currency;
      root.querySelector("[name=timezone]").value = settings.timezone;
      root.querySelector("[name=notifications]").checked = settings.notifications;
      root.querySelector("[data-form]").addEventListener("submit", (event) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.currentTarget));
        if (data.password && (data.password.length < 8 || data.password !== data.confirm)) { root.querySelector("[data-error]").textContent = "Mật khẩu mới cần ít nhất 8 ký tự và hai trường phải khớp."; return; }
        try {
          write("settings", { currency: data.currency, timezone: data.timezone, notifications: !!data.notifications });
          if (data.password) {
            const accounts = read("demoAccounts", []);
            const session = read("session", {});
            const account = accounts.find((item) => item.email === session.email);
            if (account) { account.password = data.password; write("demoAccounts", accounts); }
          }
          const success = root.querySelector("[data-success]"); success.hidden = false; success.textContent = "Đã lưu cài đặt demo.";
        } catch (exception) { root.querySelector("[data-error]").textContent = `Không thể lưu cài đặt: ${exception.message}`; }
      });
      root.querySelector("[data-signout]").addEventListener("click", () => { localStorage.removeItem("spendwise.session"); location.href = "login.html"; });
      root.querySelector("[data-reset]").addEventListener("click", () => {
        if (!confirm("Đặt lại toàn bộ dữ liệu demo trên thiết bị này? Hành động này không thể hoàn tác.")) return;
        const keep = ["spendwise.session", "spendwise.pro"];
        Object.keys(localStorage).filter((key) => key.startsWith("spendwise.") && !keep.includes(key)).forEach((key) => localStorage.removeItem(key));
        root.querySelector("[data-success]").hidden = false; root.querySelector("[data-success]").textContent = "Dữ liệu demo đã được xóa. Tải lại các trang để tạo dữ liệu mẫu mới.";
      });
      return;
    }

    if (config.type === "error") {
      if (!root.hasAttribute("data-static-account")) root.innerHTML = shell(`<section class="error-view"><div class="error-code">${esc(config.code)}</div><h1>${esc(config.title)}</h1><p>${esc(config.description)}</p><div class="hero-actions"><a class="button" href="../../thanh-vien-1/nguoi-dung/overview.html">Về tổng quan</a><a class="button button-secondary" href="../../index.html">Trang chủ</a></div></section>`);
    }
  }
  if (document.readyState !== "complete") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
