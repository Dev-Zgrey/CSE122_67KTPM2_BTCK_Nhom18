window.WorkspacePage = {
  "slug": "moderator-ai-template-management",
  "title": "Quản lý mẫu AI",
  "description": "Quản lý prompt, thử nghiệm đầu ra và bật hoặc tắt phiên bản AI.",
  "role": "moderator",
  "active": "templates",
  "storeKey": "aiTemplates",
  "columns": [
    {
      "key": "name",
      "label": "Tên mẫu"
    },
    {
      "key": "model",
      "label": "Mô hình"
    },
    {
      "key": "version",
      "label": "Phiên bản"
    },
    {
      "key": "updatedAt",
      "label": "Cập nhật",
      "format": "date"
    },
    {
      "key": "status",
      "label": "Trạng thái",
      "format": "status"
    }
  ],
  "fields": [
    {
      "key": "name",
      "label": "Tên mẫu",
      "required": true,
      "full": false
    },
    {
      "key": "model",
      "label": "Mô hình",
      "type": "select",
      "required": true,
      "options": [
        "Expense Categorizer",
        "Spending Pattern Insight",
        "Goal Coach"
      ]
    },
    {
      "key": "version",
      "label": "Phiên bản",
      "required": true,
      "full": false
    },
    {
      "key": "status",
      "label": "Trạng thái",
      "type": "select",
      "required": true,
      "options": [
        "Bản nháp",
        "Đang thử nghiệm",
        "Hoạt động",
        "Vô hiệu hóa",
        "Đã lưu trữ"
      ]
    },
    {
      "key": "prompt",
      "label": "Prompt / mẫu phản hồi",
      "type": "textarea",
      "required": true,
      "full": true
    },
    {
      "key": "fallback",
      "label": "Phản hồi dự phòng",
      "type": "textarea",
      "full": true
    }
  ],
  "seed": [
    {
      "id": "tpl-1",
      "name": "Expense Categorizer",
      "model": "Expense Categorizer",
      "version": "1.2",
      "updatedAt": "2026-10-08",
      "status": "Hoạt động",
      "prompt": "Phân loại giao dịch vào danh mục phù hợp và giải thích ngắn gọn.",
      "fallback": "Chưa đủ dữ liệu để gợi ý."
    },
    {
      "id": "tpl-2",
      "name": "Goal Coach",
      "model": "Goal Coach",
      "version": "0.9",
      "updatedAt": "2026-10-02",
      "status": "Đang thử nghiệm",
      "prompt": "Đề xuất kế hoạch tiết kiệm có thể điều chỉnh.",
      "fallback": "Hãy thử lại sau."
    }
  ],
  "createLabel": "Tạo mẫu AI",
  "singular": "mẫu",
  "filters": [
    "Bản nháp",
    "Đang thử nghiệm",
    "Hoạt động",
    "Vô hiệu hóa",
    "Đã lưu trữ"
  ],
  "defaultRecord": {
    "status": "Bản nháp"
  },
  "labelKey": "name",
  "exportable": true
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
    // Giao dien tinh da duoc dinh nghia trong HTML

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
