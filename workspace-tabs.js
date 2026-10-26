(() => {
  "use strict";

  const roleNavigation = {
    user: [
      ["Tổng quan", "../../thanh-vien-1/nguoi-dung/overview.html", "◫"],
      ["Giao dịch", "../../thanh-vien-1/nguoi-dung/transactions.html", "↔"],
      ["Ngân sách", "../../thanh-vien-1/nguoi-dung/budget.html", "▤"],
      ["Mục tiêu", "../../thanh-vien-1/nguoi-dung/goals.html", "◎"],
      ["Phân tích", "../../thanh-vien-1/nguoi-dung/insights.html", "⌁"],
      ["Gợi ý AI", "../../thanh-vien-1/nguoi-dung/ai.html", "✦"]
    ],
    coach: [
      ["Học viên", "../../thanh-vien-2/huan-luyen-vien/clients.html", "♙"],
      ["Duyệt ngân sách", "../../thanh-vien-2/huan-luyen-vien/budget.html", "▤"],
      ["Tài nguyên", "../../thanh-vien-2/huan-luyen-vien/resources.html", "▧"],
      ["Soạn tài nguyên", "../../thanh-vien-2/huan-luyen-vien/edit-resource.html", "✎"],
      ["Phản hồi", "../../thanh-vien-2/huan-luyen-vien/feedback.html", "✉"]
    ],
    moderator: [
      ["Duyệt nội dung", "../../thanh-vien-3/kiem-duyet-vien/resources.html", "✓"],
      ["Mẫu AI", "../../thanh-vien-3/kiem-duyet-vien/ai-templates.html", "✧"],
      ["Kiểm tra AI", "../../thanh-vien-3/kiem-duyet-vien/ai-review.html", "◎"],
      ["Báo cáo", "../../thanh-vien-3/kiem-duyet-vien/feedback.html", "⚑"]
    ],
    admin: [
      ["Tổng hệ thống", "../../thanh-vien-3/quan-tri-vien/dashboard.html", "◫"],
      ["Danh mục", "../../thanh-vien-3/quan-tri-vien/categories.html", "◈"],
      ["Tài khoản", "../../thanh-vien-3/quan-tri-vien/users.html", "♙"],
      ["Phân quyền", "../../thanh-vien-3/quan-tri-vien/permissions.html", "⚿"],
      ["Kiểm toán", "../../thanh-vien-3/quan-tri-vien/audit.html", "≡"],
      ["Cấu hình", "../../thanh-vien-3/quan-tri-vien/settings.html", "⚙"]
    ]
  };

  document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("[data-workspace-root], [data-acc-root], [data-route-group], [data-page]");
    const role = document.body.dataset.role || (window.location.pathname.includes("/thanh-vien-1/nguoi-dung/") ? "user" : "");
    if (!root) return;

    const roleLinks = roleNavigation[role];
    const sidebarNav = root.querySelector(".nav");
    if (roleLinks && sidebarNav) {
      const currentPage = window.location.pathname.split("/").pop();
      sidebarNav.innerHTML = roleLinks.map(([label, href, icon]) => {
        const active = href.endsWith(`/${currentPage}`);
        return `<a class="nav-link${active ? " is-active" : ""}" ${active ? 'aria-current="page"' : ""} href="${href}"><span class="nav-icon">${icon}</span>${label}</a>`;
      }).join("");
    }
  }, { once: true });
})();
