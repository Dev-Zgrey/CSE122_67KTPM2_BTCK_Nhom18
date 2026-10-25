(() => {
  "use strict";

  const groups = {
    "account-auth": [["login", "Đăng nhập"], ["register", "Đăng ký"], ["forgot", "Quên mật khẩu"]],
    "coach-clients": [["clients", "Học viên"], ["review", "Đánh giá ngân sách"]],
    "coach-resources": [["library", "Tài nguyên"], ["editor", "Soạn tài nguyên"]],
    "moderator-ai": [["templates", "Mẫu AI"], ["review", "Kiểm tra AI"]],
    "admin-monitoring": [["overview", "Tổng quan"], ["audit", "Nhật ký kiểm toán"]],
    "admin-access": [["users", "Tài khoản"], ["permissions", "Phân quyền"]],
    "admin-configuration": [["categories", "Danh mục"], ["settings", "Cấu hình hệ thống"]],
    "account-settings": [["profile", "Hồ sơ"], ["settings", "Cài đặt"]]
  };
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
      ["Học viên & ngân sách", "../../thanh-vien-2/huan-luyen-vien/clients.html", "♙"],
      ["Tài nguyên", "../../thanh-vien-2/huan-luyen-vien/resources.html", "▧"],
      ["Phản hồi", "../../thanh-vien-2/huan-luyen-vien/feedback.html", "✉"]
    ],
    moderator: [
      ["Duyệt nội dung", "../../thanh-vien-3/kiem-duyet-vien/resources.html", "✓"],
      ["AI", "../../thanh-vien-3/kiem-duyet-vien/ai-templates.html", "✧"],
      ["Báo cáo", "../../thanh-vien-3/kiem-duyet-vien/feedback.html", "⚑"]
    ],
    admin: [
      ["Tổng hệ thống", "../../thanh-vien-3/quan-tri-vien/dashboard.html", "◫"],
      ["Cấu hình", "../../thanh-vien-3/quan-tri-vien/categories.html", "◈"],
      ["Tài khoản", "../../thanh-vien-3/quan-tri-vien/users.html", "♙"]
    ]
  };

  document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("[data-workspace-root], [data-account-root], [data-route-group], [data-page]");
    const main = root?.querySelector(".main");
    const group = document.body.dataset.workspaceGroup || document.body.dataset.accountGroup || root?.dataset.routeGroup;
    const role = document.body.dataset.role || (window.location.pathname.includes("/thanh-vien-1/nguoi-dung/") ? "user" : "");
    const tabs = groups[group];
    if (!root) return;

    const routeAliases = {
      coach: {
        "budget.html": "clients.html?view=review",
        "edit-resource.html": "resources.html?view=editor"
      },
      moderator: { "ai-review.html": "ai-templates.html?view=review" },
      admin: {
        "audit.html": "dashboard.html?view=audit",
        "permissions.html": "users.html?view=permissions",
        "settings.html": "categories.html?view=settings"
      }
    };
    const aliases = {
      "register.html": "login.html?view=register",
      "forgot-password.html": "login.html?view=forgot",
      "profile.html": "profile.html?view=profile",
      "403.html": "404.html?code=403"
    };
    const roleFolders = {
      user: "thanh-vien-1/nguoi-dung/",
      coach: "thanh-vien-2/huan-luyen-vien/",
      moderator: "thanh-vien-3/kiem-duyet-vien/",
      admin: "thanh-vien-3/quan-tri-vien/"
    };
    root.querySelectorAll("a[href]").forEach((link) => {
      const href = link.getAttribute("href");
      const filename = href.split("?")[0].split("/").pop();
      const isRoleRoute = href.includes(roleFolders[role] || "");
      const isRoleAlias = !href.includes("/") && !!routeAliases[role]?.[filename];
      const isAccountRoute = href.includes("dung-chung/") || !href.includes("/");
      const destination = (isAccountRoute && aliases[filename]) || (isRoleRoute && routeAliases[role]?.[filename]) || (isRoleAlias && routeAliases[role][filename]);
      if (destination) {
        const prefix = href.includes("/")
          ? href.slice(0, href.lastIndexOf("/") + 1)
          : isRoleAlias ? `../../${roleFolders[role]}`
            : roleFolders[role] ? "../../thanh-vien-2/dung-chung/" : "";
        link.setAttribute("href", `${prefix}${destination}`);
      } else if (filename === "settings.html" && isAccountRoute) {
        const prefix = href.includes("/")
          ? href.slice(0, href.lastIndexOf("/") + 1)
          : roleFolders[role] ? "../../thanh-vien-2/dung-chung/" : "";
        link.setAttribute("href", `${prefix}profile.html?view=settings`);
      } else if (filename === "404.html") {
        const prefix = href.includes("/") ? href.slice(0, href.lastIndexOf("/") + 1) : "";
        link.setAttribute("href", `${prefix}404.html?code=404`);
      } else if (filename === "index.html" && roleFolders[role]) {
        link.setAttribute("href", "../../index.html");
      } else if (filename === "index.html" && window.location.pathname.includes("/thanh-vien-2/dung-chung/")) {
        link.setAttribute("href", "../../index.html");
      }
    });

    const roleLinks = roleNavigation[role];
    const sidebarNav = root.querySelector(".nav");
    if (roleLinks && sidebarNav) {
      const currentPage = window.location.pathname.split("/").pop();
      sidebarNav.innerHTML = roleLinks.map(([label, href, icon]) => {
        const active = href.split("?")[0].endsWith(`/${currentPage}`);
        return `<a class="nav-link${active ? " is-active" : ""}" ${active ? 'aria-current="page"' : ""} href="${href}"><span class="nav-icon">${icon}</span>${label}</a>`;
      }).join("");
    }
    if (!main || !tabs) return;

    const currentView = new URLSearchParams(window.location.search).get("view") || tabs[0][0];
    const navigation = document.createElement("nav");
    navigation.className = "view-tabs";
    navigation.setAttribute("aria-label", "Chế độ xem");
    navigation.innerHTML = tabs.map(([view, label]) => {
      const link = document.createElement("a");
      link.className = `view-tab${view === currentView ? " is-active" : ""}`;
      link.href = `${window.location.pathname.split("/").pop()}?view=${encodeURIComponent(view)}`;
      link.textContent = label;
      if (view === currentView) link.setAttribute("aria-current", "page");
      return link.outerHTML;
    }).join("");
    main.prepend(navigation);

  }, { once: true });
})();
