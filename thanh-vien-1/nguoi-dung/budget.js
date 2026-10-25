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
  const root = document.querySelector('[data-page="budgets"]');
  if (!userData || !root) return;
  const monthSelect = root.querySelector("[data-bud-month-select]");
  const form = root.querySelector("[data-bud-form]");
  const modal = root.querySelector("[data-bud-modal]");
  const categoryField = root.querySelector("[data-bud-category]");
  const error = root.querySelector("[data-bud-error]");
  let budgets = [];
  let transactions = [];
  let selectedMonth = userData.currentMonth;

  function fillMonths() {
    const before = monthSelect.value;
    const months = new Set([userData.currentMonth, ...budgets.map((item) => item.month)]);
    for (let offset = -5; offset <= 5; offset += 1) months.add(userData.monthKey(new Date(userData.today.getFullYear(), userData.today.getMonth() + offset, 1)));
    monthSelect.innerHTML = [...months].sort().reverse().map((month) => `<option value="${month}">${userData.escape(userData.monthFormatter.format(new Date(`${month}-01T12:00:00`)))}</option>`).join("");
    if (months.has(selectedMonth)) monthSelect.value = selectedMonth;
    else if (months.has(before)) { selectedMonth = before; monthSelect.value = before; }
  }
  function render() {
    try {
      budgets = userData.load(userData.keys.budgets, []);
      transactions = userData.load(userData.keys.transactions, []);
      fillMonths();
      const monthBudgets = budgets.filter((item) => item.month === selectedMonth).sort((a, b) => a.category.localeCompare(b.category, "vi"));
      const spending = userData.expensesByCategory(transactions, selectedMonth);
      const totalLimit = monthBudgets.reduce((sum, item) => sum + Number(item.limit), 0);
      const totalSpent = Object.values(spending).reduce((sum, value) => sum + value, 0);
      const remaining = totalLimit - totalSpent;
      const percent = totalLimit ? totalSpent / totalLimit * 100 : 0;
      root.querySelectorAll('[data-metric="bud-total"]').forEach((el) => { el.textContent = userData.money(totalLimit); });
      root.querySelectorAll('[data-metric="bud-spent"]').forEach((el) => { el.textContent = userData.money(totalSpent); });
      root.querySelectorAll('[data-metric="remaining"]').forEach((el) => { el.textContent = userData.money(remaining); });
      root.querySelectorAll('[data-metric="bud-spent-note"]').forEach((el) => { el.textContent = `${userData.currentTransactions(transactions, selectedMonth).filter((item) => item.type === "expense").length} khoản chi trong tháng`; });
      root.querySelectorAll('[data-metric="bud-remaining-note"]').forEach((el) => { el.textContent = remaining < 0 ? "Đã vượt tổng hạn mức" : "Trong hạn mức ngân sách"; });
      root.querySelector("[data-bud-month-label]").textContent = userData.monthFormatter.format(new Date(`${selectedMonth}-01T12:00:00`));
      root.querySelector("[data-bud-ov-percent]").textContent = `${Math.round(percent)}%`;
      root.querySelector("[data-bud-ov-copy]").textContent = !totalLimit ? "Tạo ngân sách cho tháng này để bắt đầu theo dõi kế hoạch chi tiêu."
        : percent >= 100 ? "Chi tiêu đã vượt tổng hạn mức. Hãy xem lại các danh mục đang sử dụng nhiều ngân sách."
          : percent >= 80 ? "Bạn đang tiến gần tổng hạn mức. Theo dõi các khoản chi còn lại trong tháng."
            : "Tiến độ chi tiêu đang được cập nhật từ các giao dịch của bạn.";
      const progress = root.querySelector("[data-bud-ov-progress]");
      progress.style.width = userData.progress(percent);
      progress.className = `progress-fill ${userData.progressClass(percent)}`;
      root.querySelector("[data-bud-empty]").hidden = monthBudgets.length > 0;
      root.querySelector("[data-bud-list]").innerHTML = monthBudgets.map((budget) => {
        const spent = spending[budget.category] || 0;
        const ratio = Number(budget.limit) ? spent / Number(budget.limit) * 100 : 0;
        const balance = Number(budget.limit) - spent;
        return `<article class="panel bud-category-card"><div class="bud-card-header"><div class="category-icon">${userData.escape(userData.categoryIcons[budget.category] || "◌")}</div><div class="bud-card-heading"><strong>${userData.escape(budget.category)}</strong><span>Ngân sách theo tháng</span></div><div class="bud-card-actions"><button class="row-action" type="button" aria-label="Sửa ngân sách ${userData.escape(budget.category)}" data-edit-budget="${userData.escape(budget.id)}">✎</button><button class="row-action row-action-delete" type="button" aria-label="Xóa ngân sách ${userData.escape(budget.category)}" data-delete-budget="${userData.escape(budget.id)}">×</button></div></div><div class="bud-card-amount"><strong>${userData.money(spent)}</strong><span>trên ${userData.money(budget.limit)}</span></div><div class="progress-track bud-card-progress"><div class="progress-fill ${userData.progressClass(ratio)}" style="width:${userData.progress(ratio)}"></div></div><div class="bud-card-note"><span>${Math.round(ratio)}% đã sử dụng</span><strong class="${balance < 0 ? "ov-limit" : ""}">${balance < 0 ? `Vượt ${userData.money(Math.abs(balance))}` : `Còn ${userData.money(balance)}`}</strong></div><div class="bud-card-warning">${ratio >= 100 ? "Bạn đã vượt hạn mức danh mục này." : ratio >= 80 ? "Sắp đạt hạn mức, hãy theo dõi chi tiêu." : "Bạn đang trong giới hạn ngân sách."}</div></article>`;
      }).join("");
    } catch (exception) { userData.notify(exception.message, true); }
  }
  function fillCategories(selected) {
    categoryField.innerHTML = userData.expenseCategories.map((name) => `<option>${userData.escape(name)}</option>`).join("");
    if (selected) categoryField.value = selected;
  }
  function open(budget) {
    form.reset();
    form.elements.id.value = budget?.id || "";
    fillCategories(budget?.category);
    form.elements.limit.value = budget?.limit || "";
    form.elements.month.value = budget?.month || selectedMonth;
    root.querySelector("#bud-modal-title").textContent = budget ? "Chỉnh sửa ngân sách" : "Tạo ngân sách";
    form.querySelector('[type="submit"]').textContent = budget ? "Lưu thay đổi" : "Lưu ngân sách";
    error.textContent = "";
    modal.hidden = false;
    document.body.classList.add("modal-open");
    categoryField.focus();
  }
  function close() { modal.hidden = true; document.body.classList.remove("modal-open"); }
  root.querySelectorAll("[data-open-budget]").forEach((button) => button.addEventListener("click", () => open()));
  root.querySelectorAll("[data-close-budget]").forEach((button) => button.addEventListener("click", close));
  modal.addEventListener("click", (event) => { if (event.target === modal) close(); });
  monthSelect.addEventListener("change", () => { selectedMonth = monthSelect.value; render(); });
  root.querySelector("[data-bud-month-prev]").addEventListener("click", () => {
    const date = new Date(`${selectedMonth}-01T12:00:00`);
    selectedMonth = userData.monthKey(new Date(date.getFullYear(), date.getMonth() - 1, 1));
    render();
  });
  root.querySelector("[data-bud-month-next]").addEventListener("click", () => {
    const date = new Date(`${selectedMonth}-01T12:00:00`);
    selectedMonth = userData.monthKey(new Date(date.getFullYear(), date.getMonth() + 1, 1));
    render();
  });
  root.querySelector("[data-bud-month-current]").addEventListener("click", () => { selectedMonth = userData.currentMonth; render(); });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    error.textContent = "";
    const data = Object.fromEntries(new FormData(form).entries());
    const amount = Number(data.limit);
    if (!Number.isFinite(amount) || amount <= 0) { error.textContent = "Nhập hạn mức lớn hơn 0."; return; }
    if (budgets.some((item) => item.month === data.month && item.category === data.category && item.id !== data.id)) { error.textContent = "Danh mục này đã có ngân sách trong tháng đã chọn."; return; }
    const record = { id: data.id || userData.id(), category: data.category, limit: amount, month: data.month };
    const previous = budgets;
    budgets = data.id ? previous.map((item) => item.id === data.id ? record : item) : [record, ...previous];
    try { userData.save("budgets", budgets); selectedMonth = record.month; close(); render(); userData.notify(data.id ? "Đã cập nhật ngân sách." : "Đã tạo ngân sách."); }
    catch (exception) { budgets = previous; error.textContent = exception.message; }
  });
  root.querySelector("[data-bud-list]").addEventListener("click", (event) => {
    const edit = event.target.closest("[data-edit-budget]");
    const remove = event.target.closest("[data-delete-budget]");
    if (edit) open(budgets.find((item) => item.id === edit.dataset.editBudget));
    if (remove) {
      const budget = budgets.find((item) => item.id === remove.dataset.deleteBudget);
      if (!budget || !window.confirm(`Bạn có chắc muốn xóa ngân sách “${budget.category}”?`)) return;
      const previous = budgets;
      budgets = previous.filter((item) => item.id !== budget.id);
      try { userData.save("budgets", budgets); render(); userData.notify("Đã xóa ngân sách."); }
      catch (exception) { budgets = previous; userData.notify(exception.message, true); }
    }
  });
  window.addEventListener("spendwise:user-data", render);
  window.addEventListener("storage", (event) => { if (event.key === userData.keys.transactions || event.key === userData.keys.budgets) render(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !modal.hidden) close(); });
  root.querySelector("[data-today]").textContent = new Intl.DateTimeFormat("vi-VN", { weekday: "short", day: "numeric", month: "short" }).format(userData.today);
  render();
})();
