window.WorkspacePage = {
  "slug": "admin-system-dashboard",
  "title": "Tổng quan hệ thống",
  "description": "Theo dõi tài khoản, giao dịch, ngân sách và hoạt động gần đây.",
  "role": "admin",
  "active": "dashboard",
  "storeKey": "auditLog",
  "columns": [
    {
      "key": "actor",
      "label": "Người thực hiện"
    },
    {
      "key": "action",
      "label": "Hoạt động"
    },
    {
      "key": "target",
      "label": "Đối tượng"
    },
    {
      "key": "status",
      "label": "Kết quả",
      "format": "status"
    },
    {
      "key": "date",
      "label": "Thời điểm",
      "format": "date"
    }
  ],
  "fields": [],
  "seed": [
    {
      "id": "log-1",
      "actor": "Huấn luyện viên",
      "action": "Gửi tài nguyên kiểm duyệt",
      "target": "Lập ngân sách 50/30/20",
      "status": "Chờ xử lý",
      "date": "2026-10-12"
    },
    {
      "id": "log-2",
      "actor": "Nguyễn An",
      "action": "Tạo giao dịch",
      "target": "Ăn uống",
      "status": "Thành công",
      "date": "2026-10-11"
    }
  ],
  "readOnly": true,
  "hideCreate": true,
  "listTitle": "Hoạt động hệ thống gần đây",
  "stats": [
    {
      "label": "Tài khoản",
      "value": {
        "count": "demoUsers"
      }
    },
    {
      "label": "Giao dịch",
      "value": {
        "count": "transactions.v1"
      }
    },
    {
      "label": "Ngân sách",
      "value": {
        "count": "budgets.v1"
      }
    },
    {
      "label": "Nội dung chờ duyệt",
      "value": 2
    }
  ],
  "exportable": true,
  "secondaryAction": {
    "label": "Mở nhật ký kiểm toán",
    "href": "dashboard.html?view=audit"
  }
};

(() => {
  "use strict";

  const store = {
    read(key, fallback = []) {
      const value = localStorage.getItem(`spendwise.${key}`);
      if (value === null) {
        localStorage.setItem(`spendwise.${key}`, JSON.stringify(fallback));
        return fallback;
      }
      const parsed = JSON.parse(value);
      if (!Array.isArray(parsed) && (parsed === null || typeof parsed !== "object")) throw new Error(`Dữ liệu ${key} không hợp lệ.`);
      return parsed;
    },
    write(key, value) {
      localStorage.setItem(`spendwise.${key}`, JSON.stringify(value));
      window.dispatchEvent(new CustomEvent("spendwise:data", { detail: { key } }));
    }
  };
  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
  const labelize = (value) => String(value || "").replace(/[-_]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
  const id = () => globalThis.crypto?.randomUUID?.() || `sw-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const dateLabel = (value) => {
    if (!value) return "—";
    const date = new Date(value.length === 10 ? `${value}T12:00:00` : value);
    return Number.isNaN(date.getTime()) ? escapeHtml(value) : new Intl.DateTimeFormat("vi-VN", { day: "numeric", month: "short", year: "numeric" }).format(date);
  };
  function fieldMarkup(field) {
    const required = field.required ? "required" : "";
    const attributes = `${required}${field.maxLength ? ` maxlength="${field.maxLength}"` : ""}${field.min != null ? ` min="${field.min}"` : ""}${field.step ? ` step="${field.step}"` : ""}`;
    const options = field.options || [];
    const control = field.type === "textarea"
      ? `<textarea name="${escapeHtml(field.key)}" placeholder="${escapeHtml(field.placeholder || "")}" ${attributes}></textarea>`
      : field.type === "select"
        ? `<select name="${escapeHtml(field.key)}" ${attributes}>${options.map((option) => `<option>${escapeHtml(option)}</option>`).join("")}</select>`
        : `<input name="${escapeHtml(field.key)}" type="${escapeHtml(field.type || "text")}" placeholder="${escapeHtml(field.placeholder || "")}" value="${escapeHtml(field.default || "")}" ${attributes}>`;
    return `<div class="field ${field.full ? "field-full" : ""}"><label>${escapeHtml(field.label)}${field.required ? " *" : ""}</label>${control}</div>`;
  }

  const icons = { dashboard: "◫", transactions: "↔", budgets: "▤", goals: "◎", insights: "⌁", ai: "✦", clients: "♙", reviews: "◷", resources: "▧", editor: "✎", feedback: "✉", moderation: "✓", templates: "✧", reports: "⚑", audit: "≡", categories: "◈", users: "♙", permissions: "⚿", settings: "⚙", profile: "◉", notifications: "♧" };
  const nav = {
    user: [
      ["Tổng quan", "../../thanh-vien-1/nguoi-dung/overview.html", "dashboard"],
      ["Giao dịch", "../../thanh-vien-1/nguoi-dung/transactions.html", "transactions"],
      ["Ngân sách", "../../thanh-vien-1/nguoi-dung/budget.html", "budgets"],
      ["Mục tiêu", "../../thanh-vien-1/nguoi-dung/goals.html", "goals"],
      ["Phân tích", "../../thanh-vien-1/nguoi-dung/insights.html", "insights"],
      ["Gợi ý AI", "../../thanh-vien-1/nguoi-dung/ai.html", "ai"]
    ],
    coach: [
      ["Học viên", "../../thanh-vien-2/huan-luyen-vien/clients.html", "clients"],
      ["Duyệt ngân sách", "../../thanh-vien-2/huan-luyen-vien/budget.html", "reviews"],
      ["Tài nguyên", "../../thanh-vien-2/huan-luyen-vien/resources.html", "resources"],
      ["Soạn nội dung", "../../thanh-vien-2/huan-luyen-vien/edit-resource.html", "editor"],
      ["Phản hồi", "../../thanh-vien-2/huan-luyen-vien/feedback.html", "feedback"]
    ],
    moderator: [
      ["Duyệt nội dung", "../../thanh-vien-3/kiem-duyet-vien/resources.html", "moderation"],
      ["Mẫu AI", "../../thanh-vien-3/kiem-duyet-vien/ai-templates.html", "templates"],
      ["Báo cáo", "../../thanh-vien-3/kiem-duyet-vien/feedback.html", "reports"],
      ["Kiểm tra AI", "../../thanh-vien-3/kiem-duyet-vien/ai-review.html", "ai"]
    ],
    admin: [
      ["Tổng hệ thống", "../../thanh-vien-3/quan-tri-vien/dashboard.html", "dashboard"],
      ["Danh mục", "../../thanh-vien-3/quan-tri-vien/categories.html", "categories"],
      ["Tài khoản", "../../thanh-vien-3/quan-tri-vien/users.html", "users"],
      ["Phân quyền", "../../thanh-vien-3/quan-tri-vien/permissions.html", "permissions"],
      ["Kiểm toán", "../../thanh-vien-3/quan-tri-vien/audit.html", "audit"],
      ["Cấu hình", "../../thanh-vien-3/quan-tri-vien/settings.html", "settings"]
    ]
  };
  const roleLabels = { user: "Người dùng", coach: "Huấn luyện viên", moderator: "Kiểm duyệt viên", admin: "Quản trị viên" };

  function identity() {
    try {
      const saved = JSON.parse(localStorage.getItem("spendwise.pro") || "{}");
      const session = JSON.parse(localStorage.getItem("spendwise.session") || "{}");
      return { name: saved.name || session.name || "Nguyễn An", role: session.role || document.body.dataset.role || "user" };
    } catch {
      return { name: "Nguyễn An", role: document.body.dataset.role || "user" };
    }
  }

  function mount(config) {
    const root = document.querySelector("[data-workspace-root]");
    if (!root) return;
    const user = identity();
    const role = config.role || user.role;
    const links = nav[role] || nav.user;
    const initials = user.name.split(/\s+/).slice(-2).map((part) => part[0]).join("").toUpperCase();
    root.querySelectorAll("[data-user-name], [data-header-name]").forEach((element) => { element.textContent = user.name; });
    root.querySelectorAll("[data-initials]").forEach((element) => { element.textContent = initials; });
    if (!root.hasAttribute("data-static-workspace")) root.innerHTML = `
      <div class="container">
        <aside class="sidebar">
          <a class="brand" href="index.html"><span class="brand-mark">S</span><span>SpendWise</span></a>
          <div class="role-label">${escapeHtml(roleLabels[role] || "Không gian của bạn")}</div>
          <nav class="nav" aria-label="Điều hướng chính">${links.map(([text, href, icon]) => `<a class="nav-link ${config.active === icon ? "is-active" : ""}" ${config.active === icon ? 'aria-current="page"' : ""} href="${href}"><span class="nav-icon">${icons[icon] || "◦"}</span>${escapeHtml(text)}</a>`).join("")}</nav>
          <div class="sidebar-bottom"><div class="identity"><div class="avatar">${escapeHtml(initials)}</div><div class="identity-text"><strong>${escapeHtml(user.name)}</strong><span>${escapeHtml(roleLabels[role] || role)}</span></div></div><div class="sidebar-links"><a href="profile.html">Hồ sơ</a><a href="settings.html">Cài đặt</a><a href="notifications.html">Thông báo</a></div></div>
        </aside>
        <header class="header"><div class="breadcrumb"><span>${escapeHtml(roleLabels[role] || "SpendWise")}</span><span>/</span><strong>${escapeHtml(config.title)}</strong></div><div class="header-actions"><span>${escapeHtml(user.name)}</span><button type="button" class="button button-quiet" data-signout>Đăng xuất</button></div></header>
        <main class="main">
          <section class="page-header"><div><div class="eyebrow">${escapeHtml(config.kicker || roleLabels[role] || "SPENDWISE")}</div><h1>${escapeHtml(config.title)}</h1><p>${escapeHtml(config.description || "")}</p></div><div class="action">${config.readOnly || config.hideCreate ? "" : `<button class="button" type="button" data-create>＋ ${escapeHtml(config.createLabel || "Thêm mới")}</button>`}${config.exportable ? '<button class="button button-secondary" type="button" data-export>↓ Xuất dữ liệu</button>' : ""}</div></section>
          <section class="stats-grid" data-stats></section>
          <section class="panel"><div class="panel-header"><div><h2>${escapeHtml(config.listTitle || config.title)}</h2><p data-count></p></div>${config.secondaryAction ? `<button class="button button-secondary" data-secondary type="button">${escapeHtml(config.secondaryAction.label)}</button>` : ""}</div>
            <div class="filter-bar"><input type="search" data-search placeholder="${escapeHtml(config.searchPlaceholder || "Tìm kiếm...")}" aria-label="Tìm kiếm">${config.filters?.length ? `<select data-status-filter aria-label="Lọc danh sách"><option value="">Tất cả trạng thái</option>${config.filters.map((item) => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`).join("")}</select>` : ""}<button class="button button-quiet" type="button" data-clear>Làm mới bộ lọc</button></div>
            <div class="table-scroll"><table class="table"><thead><tr>${config.columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join("")}<th><span class="visually-hidden">Thao tác</span></th></tr></thead><tbody data-rows></tbody></table></div>
            <div class="empty" data-empty hidden><span aria-hidden="true">${icons[config.active] || "◦"}</span><strong>${escapeHtml(config.emptyTitle || "Chưa có dữ liệu phù hợp")}</strong><p>${escapeHtml(config.emptyMessage || "Thử đổi bộ lọc hoặc thêm một mục mới.")}</p>${config.readOnly || config.hideCreate ? "" : `<button class="button" type="button" data-create>${escapeHtml(config.createLabel || "Thêm mới")}</button>`}</div>
          </section>
        </main>
        <footer class="footer">SpendWise · Bản demo frontend · Dữ liệu lưu trên thiết bị này</footer>
        <div class="modal-backdrop" data-modal hidden><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal-header"><h2 id="modal-title">${escapeHtml(config.createLabel || "Thêm mới")}</h2><button type="button" class="icon-button" aria-label="Đóng" data-close>×</button></div><form class="form-grid" data-form><input type="hidden" name="id">${config.fields.map((field) => fieldMarkup(field)).join("")}<div class="field field-full" data-error role="alert"></div><div class="modal-action field-full"><button class="button button-secondary" type="button" data-close>Hủy</button><button class="button" type="submit">Lưu thay đổi</button></div></form></section></div>
        <div class="toast-region" data-toasts aria-live="polite"></div>
      </div>`;

    const notify = (message, isError = false) => {
      const toast = document.createElement("div");
      toast.className = `toast${isError ? " is-danger" : ""}`;
      toast.textContent = message;
      root.querySelector("[data-toasts]").append(toast);
      window.setTimeout(() => toast.remove(), 3500);
    };
    let records;
    try {
      records = store.read(config.storeKey, config.seed || []);
    } catch (error) {
      records = [];
      notify(`Không thể đọc dữ liệu: ${error.message}`, true);
    }
    const form = root.querySelector("[data-form]");
    const modal = root.querySelector("[data-modal]");
    const search = root.querySelector("[data-search]");
    const statusFilter = root.querySelector("[data-status-filter]");
    const rows = root.querySelector("[data-rows]");
    const save = () => {
      try {
        store.write(config.storeKey, records);
        if (config.storeKey !== "auditLog") {
          try {
            const history = store.read("auditLog", []);
            history.unshift({ id: id(), actor: user.name, action: "Cập nhật dữ liệu", target: config.title, status: "Thành công", date: new Date().toISOString() });
            store.write("auditLog", history.slice(0, 500));
          } catch (error) {
            notify(`Đã lưu dữ liệu nhưng không ghi được nhật ký kiểm toán: ${error.message}`, true);
          }
        }
        return true;
      } catch (error) {
        notify(`Không thể lưu dữ liệu: ${error.message}`, true);
        return false;
      }
    };
    const get = (record, key) => {
      const value = key.split(".").reduce((current, part) => current?.[part], record);
      return value instanceof Date ? value.toISOString() : value;
    };
    const formatCell = (record, column) => {
      const value = get(record, column.key);
      if (column.format === "date") return dateLabel(String(value || ""));
      if (column.format === "money") return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(Number(value) || 0);
      if (column.format === "status") return `<span class="status-badge ${/từ chối|khóa|quá hạn|lỗi|vượt/i.test(value || "") ? "is-danger" : /chờ|cần|đang xử lý/i.test(value || "") ? "is-warning" : ""}">${escapeHtml(value || "—")}</span>`;
      return escapeHtml(value || "—");
    };
    function render() {
      const query = search.value.trim().toLocaleLowerCase("vi");
      const status = statusFilter?.value || "";
      const filtered = records.filter((record) => {
        const text = Object.values(record).map((value) => String(value ?? "")).join(" ").toLocaleLowerCase("vi");
        return (!query || text.includes(query)) && (!status || record.status === status);
      });
      root.querySelector("[data-count]").textContent = `${filtered.length} mục · ${records.length} tổng cộng`;
      root.querySelector("[data-empty]").hidden = filtered.length > 0;
      root.querySelector(".table-scroll").hidden = filtered.length === 0;
      rows.innerHTML = filtered.map((record) => `<tr>${config.columns.map((column) => `<td>${formatCell(record, column)}</td>`).join("")}<td><div class="row-action">${!config.readOnly && config.statuses?.length ? `<select class="status-select" aria-label="Cập nhật trạng thái" data-status-id="${escapeHtml(record.id)}">${config.statuses.map((item) => `<option ${record.status === item ? "selected" : ""}>${escapeHtml(item)}</option>`).join("")}</select>` : ""}${!config.readOnly && !config.hideEdit ? `<button class="icon-button" type="button" aria-label="Sửa" title="Sửa" data-edit="${escapeHtml(record.id)}">✎</button>` : ""}${!config.readOnly && !config.hideDelete ? `<button class="icon-button" type="button" aria-label="Xóa" title="Xóa" data-delete="${escapeHtml(record.id)}">×</button>` : ""}</div></td></tr>`).join("");
      renderStats(filtered);
    }
    function renderStats(filtered) {
      const stats = config.stats || [
        { label: "Tổng số", value: records.length },
        { label: "Đang hiển thị", value: filtered.length },
        { label: "Đang hoạt động", value: records.filter((record) => !record.status || /đang|hoạt động|đã duyệt|đã trả lời|mới/i.test(record.status)).length },
        { label: "Cần xử lý", value: records.filter((record) => /chờ|cần bổ sung|mới|đang xử lý|cần xem xét/i.test(record.status || "")).length }
      ];
      root.querySelector("[data-stats]").innerHTML = stats.map((item) => {
        let value = item.value;
        if (typeof value === "function") value = value(records);
        else if (value && typeof value === "object" && value.count) {
          try { value = store.read(value.count, []).length; } catch { value = 0; }
        }
        return `<article class="stat-card"><span>${escapeHtml(item.label)}</span><strong>${escapeHtml(value)}</strong></article>`;
      }).join("");
    }
    function open(record) {
      form.reset();
      form.elements.id.value = record?.id || "";
      config.fields.forEach((field) => {
        const input = form.elements[field.key];
        const value = record?.[field.key] ?? config.defaultRecord?.[field.key] ?? field.default;
        if (input && value !== undefined && value !== null) input.value = value;
        else if (input && field.type === "select") input.selectedIndex = 0;
      });
      root.querySelector("#modal-title").textContent = record ? `Sửa ${config.singular || "thông tin"}` : config.createLabel || "Thêm mới";
      root.querySelector("[data-error]").textContent = "";
      modal.hidden = false;
      form.querySelector("input:not([type=hidden]),select,textarea")?.focus();
    }
    function close() { modal.hidden = true; }
    root.querySelectorAll("[data-create]").forEach((button) => button.addEventListener("click", () => open()));
    root.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", close));
    modal.addEventListener("click", (event) => { if (event.target === modal) close(); });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const error = root.querySelector("[data-error]");
      const data = Object.fromEntries(new FormData(form).entries());
      const duplicate = config.uniqueKeys?.length && records.find((item) => item.id !== data.id && config.uniqueKeys.every((key) => String(item[key] ?? "").trim().toLocaleLowerCase("vi") === String(data[key] ?? "").trim().toLocaleLowerCase("vi")));
      if (duplicate) {
        error.textContent = config.duplicateMessage || "Thông tin này đã tồn tại.";
        return;
      }
      for (const field of config.fields) {
        if (field.required && !String(data[field.key] || "").trim()) {
          error.textContent = `Vui lòng nhập ${field.label.toLocaleLowerCase("vi")}.`;
          form.elements[field.key].focus();
          return;
        }
        if (field.type === "number" && data[field.key] !== "" && Number(data[field.key]) < 0) {
          error.textContent = `${field.label} không được là số âm.`;
          form.elements[field.key].focus();
          return;
        }
      }
      config.fields.forEach((field) => {
        if (field.type === "number") data[field.key] = data[field.key] === "" ? 0 : Number(data[field.key]);
      });
      const previous = records;
      const record = { ...data, id: data.id || id(), updatedAt: new Date().toISOString() };
      records = data.id ? previous.map((item) => item.id === data.id ? { ...item, ...record } : item) : [{ ...(config.defaultRecord || {}), ...record }, ...previous];
      if (!save()) { records = previous; return; }
      close();
      render();
      notify(data.id ? "Đã cập nhật dữ liệu." : "Đã tạo mục mới.");
    });
    rows.addEventListener("click", (event) => {
      const edit = event.target.closest("[data-edit]");
      const remove = event.target.closest("[data-delete]");
      if (edit) open(records.find((record) => record.id === edit.dataset.edit));
      if (remove) {
        const record = records.find((item) => item.id === remove.dataset.delete);
        if (!record || !window.confirm(`Bạn có chắc muốn xóa “${record[config.labelKey || config.fields[0]?.key] || "mục này"}”?`)) return;
        const previous = records;
        records = previous.filter((item) => item.id !== record.id);
        if (save()) { render(); notify("Đã xóa mục."); } else records = previous;
      }
    });
    rows.addEventListener("change", (event) => {
      const select = event.target.closest("[data-status-id]");
      if (!select) return;
      const previous = records;
      records = previous.map((record) => record.id === select.dataset.statusId ? { ...record, status: select.value } : record);
      if (save()) { render(); notify("Đã cập nhật trạng thái."); } else records = previous;
    });
    search.addEventListener("input", render);
    statusFilter?.addEventListener("change", render);
    root.querySelector("[data-clear]").addEventListener("click", () => { search.value = ""; if (statusFilter) statusFilter.value = ""; render(); });
    const exportButton = root.querySelector("[data-export]");
    exportButton?.addEventListener("click", () => {
      const csv = `\uFEFF${[config.columns.map((column) => column.label), ...records.map((record) => config.columns.map((column) => get(record, column.key) ?? ""))].map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\r\n")}`;
      const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${config.slug || "spendwise"}-${new Date().toISOString().slice(0, 10)}.csv`;
      anchor.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 0);
    });
    root.querySelector("[data-secondary]")?.addEventListener("click", () => {
      window.location.href = config.secondaryAction.href;
    });
    root.querySelector("[data-signout]").addEventListener("click", () => {
      localStorage.removeItem("spendwise.session");
      window.location.href = "../../thanh-vien-2/dung-chung/login.html";
    });
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") close(); });
    window.addEventListener("spendwise:data", (event) => {
      if (event.detail?.key !== config.storeKey) return;
      try { records = store.read(config.storeKey, []); render(); } catch (error) { notify(`Không thể đồng bộ: ${error.message}`, true); }
    });
    render();
  }

  window.SpendWiseWorkspace = { mount, store, escapeHtml, labelize, dateLabel };
  document.addEventListener("DOMContentLoaded", () => {
    if (window.WorkspacePage) mount(window.WorkspacePage);
  });
})();
