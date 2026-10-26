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
  if (!userData) return;
  const root = document.querySelector('[data-page="dashboard"]');
  if (!root) return;
  const set = (name, value) => root.querySelectorAll(`[data-metric="${name}"]`).forEach((element) => { element.textContent = value; });
  const current = new Intl.DateTimeFormat("vi-VN", { weekday: "short", day: "numeric", month: "short" }).format(userData.today);
  root.querySelector("[data-today]").textContent = current;

  function render() {
    try {
      const transactions = userData.load(userData.keys.transactions, []);
      const budgets = userData.load(userData.keys.budgets, []);
      const allTotals = userData.totals(transactions);
      const thisMonth = userData.currentTransactions(transactions);
      const monthTotals = userData.totals(thisMonth);
      const monthBudgets = budgets.filter((budget) => budget.month === userData.currentMonth);
      const budgetTotal = monthBudgets.reduce((sum, budget) => sum + Number(budget.limit), 0);
      const spent = monthTotals.expense;
      const remaining = budgetTotal - spent;
      const percent = budgetTotal ? spent / budgetTotal * 100 : 0;
      set("balance", userData.money(allTotals.income - allTotals.expense));
      set("balance-note", "Thu nhập trừ chi tiêu đã ghi nhận");
      set("income", userData.money(monthTotals.income));
      set("expense", userData.money(spent));
      set("expense-note", `${thisMonth.filter((item) => item.type === "expense").length} khoản chi đã ghi nhận`);
      set("remaining", userData.money(remaining));
      set("remaining-inline", userData.money(remaining));
      set("bud-total", userData.money(budgetTotal));
      set("bud-spent", userData.money(spent));
      set("bud-note", budgetTotal ? `${Math.round(percent)}% hạn mức đã sử dụng` : "Chưa lập ngân sách tháng này");
      const progress = root.querySelector("[data-bud-progress]");
      progress.style.width = userData.progress(percent);
      progress.className = `progress-fill ${userData.progressClass(percent)}`;
      const spending = userData.expensesByCategory(transactions);
      const preview = root.querySelector("[data-bud-preview]");
      const ordered = [...monthBudgets].sort((a, b) => (spending[b.category] || 0) / b.limit - (spending[a.category] || 0) / a.limit).slice(0, 4);
      preview.innerHTML = ordered.length ? ordered.map((budget) => {
        const used = spending[budget.category] || 0;
        const ratio = budget.limit ? used / budget.limit * 100 : 0;
        return `<div class="bud-category-row"><span class="bud-category-name">${userData.escape(budget.category)}</span><span class="bud-category-amount">${userData.shortMoney(used)} / ${userData.shortMoney(budget.limit)}</span><div class="progress-track"><div class="progress-fill ${userData.progressClass(ratio)}" style="width:${userData.progress(ratio)}"></div></div></div>`;
      }).join("") : `<div class="empty-inline">Chưa có ngân sách. <a class="text-link" href="budget.html">Tạo ngân sách →</a></div>`;
      const recent = [...transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);
      root.querySelector("[data-recent-transactions]").innerHTML = recent.length ? recent.map((item) => `<div class="recent-item"><div class="category-icon ${item.type === "income" ? "category-icon-income" : ""}">${userData.escape(userData.categoryIcons[item.category] || "◌")}</div><div class="recent-info"><strong>${userData.escape(item.title)}</strong><span>${userData.escape(item.category)} · ${userData.formatDate(item.date)}</span></div><div class="recent-amount ${item.type === "income" ? "recent-amount-income" : "recent-amount-expense"}">${item.type === "income" ? "+" : "−"}${userData.shortMoney(item.amount)}</div></div>`).join("") : `<div class="empty-inline">Chưa có giao dịch nào.</div>`;
      const insight = root.querySelector("[data-insight-text]");
      insight.textContent = spent && budgetTotal
        ? (percent >= 80 ? `Bạn đã sử dụng ${Math.round(percent)}% ngân sách tháng. Hãy xem lại các khoản chi để giữ kế hoạch đúng hướng.` : `Bạn đã sử dụng ${Math.round(percent)}% ngân sách tháng. Tiếp tục ghi nhận chi tiêu để theo dõi tiến độ nhé.`)
        : spent ? `Bạn đã ghi nhận ${userData.money(spent)} chi tiêu trong tháng. Tạo ngân sách để theo dõi hạn mức hiệu quả hơn.` : "Ghi lại giao dịch để SpendWise giúp bạn nhìn rõ hơn thói quen chi tiêu.";
      renderChart(transactions);
    } catch (error) {
      userData.notify(error.message, true);
    }
  }
  function renderChart(transactions) {
    const months = [];
    for (let offset = -5; offset <= 0; offset += 1) months.push(userData.monthKey(new Date(userData.today.getFullYear(), userData.today.getMonth() + offset, 1)));
    const values = months.map((month) => userData.totals(userData.currentTransactions(transactions, month)));
    const max = Math.max(1, ...values.flatMap((item) => [item.income, item.expense]));
    root.querySelector("[data-chart]").innerHTML = months.map((month, index) => {
      const totals = values[index];
      const label = new Intl.DateTimeFormat("vi-VN", { month: "short" }).format(new Date(`${month}-01T12:00:00`)).replace(".", "");
      const income = totals.income ? Math.max(5, totals.income / max * 100) : 3;
      const expense = totals.expense ? Math.max(5, totals.expense / max * 100) : 3;
      return `<div class="chart-mon" aria-label="${userData.escape(label)}: thu ${userData.money(totals.income)}, chi ${userData.money(totals.expense)}"><div class="chart-label"><div class="chart-bar" style="height:${income}%" title="Thu ${userData.money(totals.income)}"></div><div class="chart-bar chart-bar-expense" style="height:${expense}%" title="Chi ${userData.money(totals.expense)}"></div></div><span class="chart-mon-label">${userData.escape(label)}</span></div>`;
    }).join("");
  }
  window.addEventListener("spendwise:user-data", render);
  window.addEventListener("storage", (event) => { if (event.key === userData.keys.transactions || event.key === userData.keys.budgets) render(); });
  render();
})();
