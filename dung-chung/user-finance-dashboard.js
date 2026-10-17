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
      progress.className = `user-progress-fill ${D.progressClass(percent)}`;
      const spending = D.expensesByCategory(transactions);
      const preview = root.querySelector("[data-budget-preview]");
      const ordered = [...monthBudgets].sort((a, b) => (spending[b.category] || 0) / b.limit - (spending[a.category] || 0) / a.limit).slice(0, 4);
      preview.innerHTML = ordered.length ? ordered.map((budget) => {
        const used = spending[budget.category] || 0;
        const ratio = budget.limit ? used / budget.limit * 100 : 0;
        return `<div class="user-budget-category-row"><span class="user-budget-category-name">${D.escape(budget.category)}</span><span class="user-budget-category-amount">${D.shortMoney(used)} / ${D.shortMoney(budget.limit)}</span><div class="user-progress-track"><div class="user-progress-fill ${D.progressClass(ratio)}" style="width:${D.progress(ratio)}"></div></div></div>`;
      }).join("") : `<div class="user-empty-inline">Chưa có ngân sách. <a class="user-text-link" href="user-budget-management.html">Tạo ngân sách →</a></div>`;
      const recent = [...transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);
      root.querySelector("[data-recent-transactions]").innerHTML = recent.length ? recent.map((item) => `<div class="user-recent-item"><div class="user-category-icon ${item.type === "income" ? "user-category-icon--income" : ""}">${D.escape(D.categoryIcons[item.category] || "◌")}</div><div class="user-recent-info"><strong>${D.escape(item.title)}</strong><span>${D.escape(item.category)} · ${D.formatDate(item.date)}</span></div><div class="user-recent-amount ${item.type === "income" ? "user-recent-amount--income" : "user-recent-amount--expense"}">${item.type === "income" ? "+" : "−"}${D.shortMoney(item.amount)}</div></div>`).join("") : `<div class="user-empty-inline">Chưa có giao dịch nào.</div>`;
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
      return `<div class="user-chart-month" aria-label="${D.escape(label)}: thu ${D.money(totals.income)}, chi ${D.money(totals.expense)}"><div class="user-chart-bars"><div class="user-chart-bar" style="height:${income}%" title="Thu ${D.money(totals.income)}"></div><div class="user-chart-bar user-chart-bar--expense" style="height:${expense}%" title="Chi ${D.money(totals.expense)}"></div></div><span class="user-chart-month-label">${D.escape(label)}</span></div>`;
    }).join("");
  }
  window.addEventListener("spendwise:user-data", render);
  window.addEventListener("storage", (event) => { if (event.key === D.keys.transactions || event.key === D.keys.budgets) render(); });
  render();
})();
