(() => {
  "use strict";
  const keys = { transactions: "spendwise.transactions.v1", budgets: "spendwise.budgets.v1" };
  const categoryOptions = JSON.parse(document.querySelector("[data-category-options]").textContent);
  const expenseCategories = categoryOptions.expense.map((item) => item.name);
  const incomeCategories = categoryOptions.income.map((item) => item.name);
  const categoryIcons = Object.fromEntries([...categoryOptions.expense, ...categoryOptions.income].map((item) => [item.name, item.icon]));
  const today = new Date();
  const currentMonth = monthKey(today);
  const currency = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 });
  function id() { return globalThis.crypto?.randomUUID?.() || `sw-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`; }
  function monthKey(date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`; }
  function dateKey(date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`; }
  function formatDate(value) {
    const [year, month, day] = String(value).slice(0, 10).split("-").map(Number);
    return dateFormatter.format(new Date(year, month - 1, day));
  }
  const dateFormatter = new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "short", year: "numeric" });
  const monthFormatter = new Intl.DateTimeFormat("vi-VN", { month: "long", year: "numeric" });
  function escape(value) { return String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]); }
  function load(key, empty = []) {
    try {
      const saved = localStorage.getItem(key);
      if (saved === null) {
        localStorage.setItem(key, JSON.stringify(empty));
        return empty;
      }
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) throw new Error("Dữ liệu không đúng định dạng.");
      return parsed;
    } catch (error) {
      throw new Error(`Không thể đọc dữ liệu lưu trên trình duyệt (${error.message}).`);
    }
  }
  function save(type, records) {
    try {
      localStorage.setItem(keys[type], JSON.stringify(records));
      window.dispatchEvent(new CustomEvent("spendwise:user-data", { detail: { type } }));
      try {
        const history = JSON.parse(localStorage.getItem("spendwise.auditLog") || "[]");
        history.unshift({ id: id(), actor: "Người dùng", action: type === "transactions" ? "Cập nhật giao dịch" : "Cập nhật ngân sách", target: type === "transactions" ? "Giao dịch" : "Ngân sách", status: "Thành công", date: new Date().toISOString() });
        localStorage.setItem("spendwise.auditLog", JSON.stringify(history.slice(0, 500)));
      } catch (error) {
        notify(`Đã lưu thay đổi nhưng không ghi được nhật ký kiểm toán: ${error.message}`, true);
      }
    } catch (error) {
      throw new Error(`Không thể lưu dữ liệu (${error.message}).`);
    }
  }
  function totals(records) {
    return records.reduce((sum, item) => {
      sum[item.type] += Number(item.amount) || 0;
      return sum;
    }, { income: 0, expense: 0 });
  }
  function currentTransactions(records, month = currentMonth) { return records.filter((item) => item.date.startsWith(month)); }
  function expensesByCategory(records, month = currentMonth) {
    return currentTransactions(records, month).reduce((sum, item) => {
      if (item.type === "expense") sum[item.category] = (sum[item.category] || 0) + Number(item.amount);
      return sum;
    }, {});
  }
  function money(value) { return currency.format(Number(value) || 0); }
  function shortMoney(value) {
    const amount = Number(value) || 0;
    if (amount >= 1000000) return `${(amount / 1000000).toLocaleString("vi-VN", { maximumFractionDigits: 1 })} tr`;
    if (amount >= 1000) return `${Math.round(amount / 1000).toLocaleString("vi-VN")}k`;
    return amount.toLocaleString("vi-VN");
  }
  function progress(percent) { return `${Math.min(100, Math.max(0, percent))}%`; }
  function progressClass(percent) { return percent >= 100 ? "is-over-limit" : percent >= 80 ? "is-warning" : ""; }
  function notify(message, isError = false) {
    const region = document.querySelector("[data-toast-region]");
    if (!region) return;
    const toast = document.createElement("div");
    toast.className = `toast${isError ? " toast-error" : ""}`;
    toast.textContent = message;
    region.append(toast);
    window.setTimeout(() => toast.remove(), 3600);
  }
  function refreshCategories() {
    try {
      const saved = localStorage.getItem("spendwise.categories");
      if (saved === null) return;
      const configured = JSON.parse(saved);
      if (!Array.isArray(configured)) throw new Error("Danh mục không đúng định dạng.");
      const enabled = configured.filter((item) => item.status === "Hoạt động");
      const currentExpense = enabled.filter((item) => item.type === "Chi tiêu").map((item) => item.name);
      const currentIncome = enabled.filter((item) => item.type === "Thu nhập").map((item) => item.name);
      if (currentExpense.length) expenseCategories.splice(0, expenseCategories.length, ...currentExpense);
      if (currentIncome.length) incomeCategories.splice(0, incomeCategories.length, ...currentIncome);
      enabled.forEach((item) => { categoryIcons[item.name] = item.icon || categoryIcons[item.name] || "◌"; });
    } catch (error) {
      window.setTimeout(() => notify(`Không thể tải danh mục quản trị: ${error.message}`, true), 0);
    }
  }
  refreshCategories();
  window.addEventListener("spendwise:data", (event) => { if (event.detail?.key === "categories") refreshCategories(); });
  window.addEventListener("storage", (event) => { if (event.key === "spendwise.categories") refreshCategories(); });
  window.SpendWiseUserData = { keys, expenseCategories, incomeCategories, categoryIcons, today, currentMonth, monthKey, dateKey, monthFormatter, id, escape, formatDate, load, save, totals, currentTransactions, expensesByCategory, money, shortMoney, progress, progressClass, notify };
})();

(() => {
  "use strict";
  const userData = window.SpendWiseUserData;
  const root = document.querySelector('[data-page="transactions"]');
  if (!userData || !root) return;
  const rows = root.querySelector("[data-tx-rows]");
  const search = root.querySelector("[data-tx-search]");
  const typeFilter = root.querySelector("[data-tx-type]");
  const categoryFilter = root.querySelector("[data-tx-category]");
  const monthFilter = root.querySelector("[data-tx-month]");
  const modal = root.querySelector("[data-tx-modal]");
  const form = root.querySelector("[data-tx-form]");
  const categoryField = root.querySelector("[data-tx-form-category]");
  const error = root.querySelector("[data-tx-error]");
  let transactions = [];
  const typeLabels = { income: "Khoản thu", expense: "Khoản chi" };

  function fillFormCategories(type, selected) {
    const categories = type === "income" ? userData.incomeCategories : userData.expenseCategories;
    categoryField.innerHTML = categories.map((category) => `<option>${userData.escape(category)}</option>`).join("");
    if (selected && categories.includes(selected)) categoryField.value = selected;
  }
  function refreshFilters() {
    const selectedCategory = categoryFilter.value;
    const selectedMonth = monthFilter.value;
    const categories = [...new Set(transactions.map((item) => item.category))].sort((a, b) => a.localeCompare(b, "vi"));
    categoryFilter.innerHTML = `<option value="all">Tất cả danh mục</option>${categories.map((name) => `<option>${userData.escape(name)}</option>`).join("")}`;
    if (categories.includes(selectedCategory)) categoryFilter.value = selectedCategory;
    const months = [...new Set(transactions.map((item) => item.date.slice(0, 7)))].sort().reverse();
    monthFilter.innerHTML = `<option value="all">Tất cả thời gian</option>${months.map((month) => `<option value="${month}">${userData.escape(userData.monthFormatter.format(new Date(`${month}-01T12:00:00`)))}</option>`).join("")}`;
    if (months.includes(selectedMonth)) monthFilter.value = selectedMonth;
  }
  function render() {
    try {
      transactions = userData.load(userData.keys.transactions, []);
      refreshFilters();
      const query = search.value.trim().toLocaleLowerCase("vi");
      const filtered = transactions.filter((item) => (!query || `${item.title} ${item.category} ${item.note || ""}`.toLocaleLowerCase("vi").includes(query))
        && (typeFilter.value === "all" || item.type === typeFilter.value)
        && (categoryFilter.value === "all" || item.category === categoryFilter.value)
        && (monthFilter.value === "all" || item.date.startsWith(monthFilter.value)))
        .sort((a, b) => b.date.localeCompare(a.date));
      root.querySelector("[data-filtered-count]").textContent = filtered.length;
      root.querySelector("[data-tx-empty]").hidden = !!filtered.length;
      root.querySelector(".table-scroll").hidden = !filtered.length;
      rows.innerHTML = filtered.map((item) => `<tr><td><div class="tx-table"><div class="category-icon ${item.type === "income" ? "category-icon-income" : ""}">${userData.escape(userData.categoryIcons[item.category] || "◌")}</div><div><strong>${userData.escape(item.title)}</strong><span>${userData.escape(item.note || typeLabels[item.type])}</span></div></div></td><td><span class="category-tag">${userData.escape(item.category)}</span></td><td>${userData.formatDate(item.date)}</td><td>${userData.escape(item.method || "Tiền mặt")}</td><td class="amount-cell ${item.type === "income" ? "amount-cell-income" : ""}">${item.type === "income" ? "+" : "−"}${userData.money(item.amount)}</td><td><div class="row-action-icon"><button class="row-action" type="button" aria-label="Sửa ${userData.escape(item.title)}" data-edit-transaction="${userData.escape(item.id)}">✎</button><button class="row-action row-action-delete" type="button" aria-label="Xóa ${userData.escape(item.title)}" data-delete-transaction="${userData.escape(item.id)}">×</button></div></td></tr>`).join("");
      const monthly = userData.totals(userData.currentTransactions(transactions));
      root.querySelectorAll('[data-metric="income"]').forEach((el) => { el.textContent = userData.money(monthly.income); });
      root.querySelectorAll('[data-metric="expense"]').forEach((el) => { el.textContent = userData.money(monthly.expense); });
      root.querySelectorAll('[data-metric="tx-count"]').forEach((el) => { el.textContent = userData.currentTransactions(transactions).length; });
    } catch (exception) { userData.notify(exception.message, true); }
  }
  function open(item) {
    form.reset();
    form.elements.id.value = item?.id || "";
    const type = item?.type || "expense";
    form.querySelector(`input[name="type"][value="${type}"]`).checked = true;
    fillFormCategories(type, item?.category);
    form.elements.title.value = item?.title || "";
    form.elements.amount.value = item?.amount || "";
    form.elements.date.value = item?.date || userData.dateKey(userData.today);
    form.elements.method.value = item?.method || "Tiền mặt";
    form.elements.note.value = item?.note || "";
    root.querySelector("#tx-modal-title").textContent = item ? "Chỉnh sửa giao dịch" : "Thêm giao dịch";
    form.querySelector('[type="submit"]').textContent = item ? "Lưu thay đổi" : "Lưu giao dịch";
    error.textContent = "";
    modal.hidden = false;
    document.body.classList.add("modal-open");
    form.elements.title.focus();
  }
  function close() { modal.hidden = true; document.body.classList.remove("modal-open"); }
  root.querySelectorAll("[data-open-transaction]").forEach((button) => button.addEventListener("click", () => open()));
  root.querySelectorAll("[data-close-transaction]").forEach((button) => button.addEventListener("click", close));
  modal.addEventListener("click", (event) => { if (event.target === modal) close(); });
  form.querySelectorAll('input[name="type"]').forEach((radio) => radio.addEventListener("change", () => fillFormCategories(radio.value)));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    error.textContent = "";
    const data = Object.fromEntries(new FormData(form).entries());
    const amount = Number(data.amount);
    if (!Number.isFinite(amount) || amount <= 0) { error.textContent = "Nhập số tiền lớn hơn 0."; return; }
    if (new Date(`${data.date}T12:00:00`) > new Date(new Date().setHours(23, 59, 59, 999))) { error.textContent = "Ngày giao dịch không thể ở tương lai."; return; }
    const record = { ...data, amount, id: data.id || userData.id(), title: data.title.trim(), note: data.note.trim() };
    const previous = transactions;
    transactions = data.id ? previous.map((item) => item.id === data.id ? record : item) : [record, ...previous];
    try { userData.save("transactions", transactions); close(); render(); userData.notify(data.id ? "Đã cập nhật giao dịch." : "Đã thêm giao dịch."); }
    catch (exception) { transactions = previous; error.textContent = exception.message; }
  });
  rows.addEventListener("click", (event) => {
    const edit = event.target.closest("[data-edit-transaction]");
    const remove = event.target.closest("[data-delete-transaction]");
    if (edit) open(transactions.find((item) => item.id === edit.dataset.editTransaction));
    if (remove) {
      const item = transactions.find((record) => record.id === remove.dataset.deleteTransaction);
      if (!item || !window.confirm(`Bạn có chắc muốn xóa giao dịch “${item.title}”?`)) return;
      const previous = transactions;
      transactions = previous.filter((record) => record.id !== item.id);
      try { userData.save("transactions", transactions); render(); userData.notify("Đã xóa giao dịch."); } catch (exception) { transactions = previous; userData.notify(exception.message, true); }
    }
  });
  [search, typeFilter, categoryFilter, monthFilter].forEach((control) => control.addEventListener(control === search ? "input" : "change", render));
  root.querySelector("[data-clear-filters]").addEventListener("click", () => { search.value = ""; typeFilter.value = "all"; categoryFilter.value = "all"; monthFilter.value = "all"; render(); });
  root.querySelector("[data-export-transactions]").addEventListener("click", () => {
    if (!transactions.length) { userData.notify("Chưa có giao dịch để xuất.", true); return; }
    const content = `\uFEFF${[["Ngày", "Loại", "Tên giao dịch", "Danh mục", "Số tiền", "Phương thức", "Ghi chú"], ...transactions.map((item) => [item.date, typeLabels[item.type], item.title, item.category, item.amount, item.method, item.note])].map((line) => line.map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`).join(",")).join("\r\n")}`;
    const url = URL.createObjectURL(new Blob([content], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = `spendwise-giao-dich-${userData.currentMonth}.csv`; anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
    userData.notify("Đã xuất danh sách giao dịch.");
  });
  if (new URLSearchParams(location.search).has("new")) open();
  window.addEventListener("spendwise:user-data", render);
  window.addEventListener("storage", (event) => { if (event.key === userData.keys.transactions) render(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !modal.hidden) close(); });
  root.querySelector("[data-today]").textContent = new Intl.DateTimeFormat("vi-VN", { weekday: "short", day: "numeric", month: "short" }).format(userData.today);
  render();
})();
