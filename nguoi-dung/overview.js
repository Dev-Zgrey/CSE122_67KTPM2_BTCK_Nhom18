(() => {
  "use strict";
  const keys = { transactions: "spendwise.transactions.v1", budgets: "spendwise.budgets.v1" };
  const expenseCategories = ["Nhà cửa", "Ăn uống", "Di chuyển", "Mua sắm", "Sức khỏe", "Giải trí", "Hóa đơn", "Khác"];
  const incomeCategories = ["Lương", "Thưởng", "Đầu tư", "Làm thêm", "Khác"];
  const categoryIcons = { "Nhà cửa": "⌂", "Ăn uống": "♨", "Di chuyển": "↗", "Mua sắm": "◇", "Sức khỏe": "✚", "Giải trí": "♫", "Hóa đơn": "▧", "Khác": "◌", "Lương": "▤", "Thưởng": "✦", "Đầu tư": "↗", "Làm thêm": "✎" };
  const today = new Date();
  const currentMonth = monthKey(today);
  const currency = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 });
  const defaultCategories = [
    ...expenseCategories.map((name, index) => ({ id: `expense-${index}`, name, type: "Chi tiêu", status: "Hoạt động", order: index + 1 })),
    ...incomeCategories.map((name, index) => ({ id: `income-${index}`, name, type: "Thu nhập", status: "Hoạt động", order: index + 1 }))
  ];
  function id() { return globalThis.crypto?.randomUUID?.() || `sw-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`; }
  function monthKey(date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`; }
  function dateKey(date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`; }
  function monthDate(offset, day) { return dateKey(new Date(today.getFullYear(), today.getMonth() + offset, day)); }
  function formatDate(value) {
    const [year, month, day] = String(value).slice(0, 10).split("-").map(Number);
    return dateFormatter.format(new Date(year, month - 1, day));
  }
  const dateFormatter = new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "short", year: "numeric" });
  const monthFormatter = new Intl.DateTimeFormat("vi-VN", { month: "long", year: "numeric" });
  function escape(value) { return String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]); }
  const sampleTransactions = () => [
    ["income", "Lương tháng", "Lương", 22000000, monthDate(0, 1), "Chuyển khoản"],
    ["expense", "Tiền thuê nhà", "Nhà cửa", 5500000, monthDate(0, 2), "Chuyển khoản"],
    ["expense", "Đi chợ cuối tuần", "Ăn uống", 420000, monthDate(0, 3), "Ví điện tử"],
    ["expense", "Di chuyển", "Di chuyển", 180000, monthDate(0, 4), "Ví điện tử"],
    ["income", "Dự án tự do", "Làm thêm", 1800000, monthDate(0, 6), "Chuyển khoản"],
    ["expense", "Hóa đơn điện nước", "Hóa đơn", 650000, monthDate(0, 7), "Chuyển khoản"],
    ["expense", "Bữa tối cùng bạn bè", "Ăn uống", 350000, monthDate(0, 9), "Thẻ ngân hàng"],
    ["expense", "Sách và văn phòng phẩm", "Mua sắm", 290000, monthDate(0, 11), "Thẻ ngân hàng"],
    ["income", "Lương tháng trước", "Lương", 22000000, monthDate(-1, 1), "Chuyển khoản"],
    ["expense", "Hóa đơn sinh hoạt", "Hóa đơn", 690000, monthDate(-1, 8), "Chuyển khoản"],
    ["expense", "Mua sắm gia đình", "Mua sắm", 1250000, monthDate(-1, 15), "Thẻ ngân hàng"],
    ["income", "Lương tháng trước", "Lương", 22000000, monthDate(-2, 1), "Chuyển khoản"],
    ["expense", "Ăn uống và đi lại", "Ăn uống", 2100000, monthDate(-2, 14), "Ví điện tử"]
  ].map(([type, title, category, amount, date, method]) => ({ id: id(), type, title, category, amount, date, method, note: "" }));
  const sampleBudgets = () => [
    ["Nhà cửa", 6500000], ["Ăn uống", 3500000], ["Di chuyển", 1500000],
    ["Mua sắm", 2000000], ["Hóa đơn", 1200000], ["Giải trí", 1000000]
  ].map(([category, limit]) => ({ id: id(), category, limit, month: currentMonth }));
  function load(key, seed) {
    try {
      const saved = localStorage.getItem(key);
      if (saved === null) {
        localStorage.setItem(key, JSON.stringify(seed()));
        return JSON.parse(localStorage.getItem(key));
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
      let saved = localStorage.getItem("spendwise.categories");
      if (saved === null) {
        saved = JSON.stringify(defaultCategories);
        localStorage.setItem("spendwise.categories", saved);
      }
      const configured = JSON.parse(saved);
      if (!Array.isArray(configured)) throw new Error("Danh mục không đúng định dạng.");
      const enabled = configured.filter((item) => item.status === "Hoạt động");
      const currentExpense = enabled.filter((item) => item.type === "Chi tiêu").map((item) => item.name);
      const currentIncome = enabled.filter((item) => item.type === "Thu nhập").map((item) => item.name);
      if (currentExpense.length) expenseCategories.splice(0, expenseCategories.length, ...currentExpense);
      if (currentIncome.length) incomeCategories.splice(0, incomeCategories.length, ...currentIncome);
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
  const D = window.SpendWiseUserData;
  if (!D) return;
  const root = document.querySelector('[data-page="dashboard"]');
  if (!root) return;
  const set = (name, value) => root.querySelectorAll(`[data-metric="${name}"]`).forEach((element) => { element.textContent = value; });
  const current = new Intl.DateTimeFormat("vi-VN", { weekday: "short", day: "numeric", month: "short" }).format(D.today);
  root.querySelector("[data-today]").textContent = current;

  function render() {
    try {
      const transactions = D.load(D.keys.transactions, () => []);
      const budgets = D.load(D.keys.budgets, () => []);
      const allTotals = D.totals(transactions);
      const thisMonth = D.currentTransactions(transactions);
      const monthTotals = D.totals(thisMonth);
      const monthBudgets = budgets.filter((budget) => budget.month === D.currentMonth);
      const budgetTotal = monthBudgets.reduce((sum, budget) => sum + Number(budget.limit), 0);
      const spent = monthTotals.expense;
      const remaining = budgetTotal - spent;
      const percent = budgetTotal ? spent / budgetTotal * 100 : 0;
      set("balance", D.money(allTotals.income - allTotals.expense));
      set("balance-note", "Thu nhập trừ chi tiêu đã ghi nhận");
      set("income", D.money(monthTotals.income));
      set("expense", D.money(spent));
      set("expense-note", `${thisMonth.filter((item) => item.type === "expense").length} khoản chi đã ghi nhận`);
      set("remaining", D.money(remaining));
      set("remaining-inline", D.money(remaining));
      set("budget-total", D.money(budgetTotal));
      set("budget-spent", D.money(spent));
      set("budget-note", budgetTotal ? `${Math.round(percent)}% hạn mức đã sử dụng` : "Chưa lập ngân sách tháng này");
      const progress = root.querySelector("[data-budget-progress]");
      progress.style.width = D.progress(percent);
      progress.className = `progress-fill ${D.progressClass(percent)}`;
      const spending = D.expensesByCategory(transactions);
      const preview = root.querySelector("[data-budget-preview]");
      const ordered = [...monthBudgets].sort((a, b) => (spending[b.category] || 0) / b.limit - (spending[a.category] || 0) / a.limit).slice(0, 4);
      preview.innerHTML = ordered.length ? ordered.map((budget) => {
        const used = spending[budget.category] || 0;
        const ratio = budget.limit ? used / budget.limit * 100 : 0;
        return `<div class="budget-category-row"><span class="budget-category-name">${D.escape(budget.category)}</span><span class="budget-category-amount">${D.shortMoney(used)} / ${D.shortMoney(budget.limit)}</span><div class="progress-track"><div class="progress-fill ${D.progressClass(ratio)}" style="width:${D.progress(ratio)}"></div></div></div>`;
      }).join("") : `<div class="empty-inline">Chưa có ngân sách. <a class="text-link" href="budget.html">Tạo ngân sách →</a></div>`;
      const recent = [...transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);
      root.querySelector("[data-recent-transactions]").innerHTML = recent.length ? recent.map((item) => `<div class="recent-item"><div class="category-icon ${item.type === "income" ? "category-icon-income" : ""}">${D.escape(D.categoryIcons[item.category] || "◌")}</div><div class="recent-info"><strong>${D.escape(item.title)}</strong><span>${D.escape(item.category)} · ${D.formatDate(item.date)}</span></div><div class="recent-amount ${item.type === "income" ? "recent-amount-income" : "recent-amount-expense"}">${item.type === "income" ? "+" : "−"}${D.shortMoney(item.amount)}</div></div>`).join("") : `<div class="empty-inline">Chưa có giao dịch nào.</div>`;
      const insight = root.querySelector("[data-insight-text]");
      insight.textContent = spent && budgetTotal
        ? (percent >= 80 ? `Bạn đã sử dụng ${Math.round(percent)}% ngân sách tháng. Hãy xem lại các khoản chi để giữ kế hoạch đúng hướng.` : `Bạn đã sử dụng ${Math.round(percent)}% ngân sách tháng. Tiếp tục ghi nhận chi tiêu để theo dõi tiến độ nhé.`)
        : spent ? `Bạn đã ghi nhận ${D.money(spent)} chi tiêu trong tháng. Tạo ngân sách để theo dõi hạn mức hiệu quả hơn.` : "Ghi lại giao dịch để SpendWise giúp bạn nhìn rõ hơn thói quen chi tiêu.";
      renderChart(transactions);
    } catch (error) {
      D.notify(error.message, true);
    }
  }
  function renderChart(transactions) {
    const months = [];
    for (let offset = -5; offset <= 0; offset += 1) months.push(D.monthKey(new Date(D.today.getFullYear(), D.today.getMonth() + offset, 1)));
    const values = months.map((month) => D.totals(D.currentTransactions(transactions, month)));
    const max = Math.max(1, ...values.flatMap((item) => [item.income, item.expense]));
    root.querySelector("[data-chart]").innerHTML = months.map((month, index) => {
      const totals = values[index];
      const label = new Intl.DateTimeFormat("vi-VN", { month: "short" }).format(new Date(`${month}-01T12:00:00`)).replace(".", "");
      const income = totals.income ? Math.max(5, totals.income / max * 100) : 3;
      const expense = totals.expense ? Math.max(5, totals.expense / max * 100) : 3;
      return `<div class="chart-mon" aria-label="${D.escape(label)}: thu ${D.money(totals.income)}, chi ${D.money(totals.expense)}"><div class="chart-label"><div class="chart-bar" style="height:${income}%" title="Thu ${D.money(totals.income)}"></div><div class="chart-bar chart-bar-expense" style="height:${expense}%" title="Chi ${D.money(totals.expense)}"></div></div><span class="chart-mon-label">${D.escape(label)}</span></div>`;
    }).join("");
  }
  window.addEventListener("spendwise:user-data", render);
  window.addEventListener("storage", (event) => { if (event.key === D.keys.transactions || event.key === D.keys.budgets) render(); });
  render();
})();
