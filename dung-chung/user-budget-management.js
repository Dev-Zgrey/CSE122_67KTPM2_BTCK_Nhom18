(() => {
  "use strict";
  const D = window.SpendWiseUserData;
  const root = document.querySelector('[data-page="budgets"]');
  if (!D || !root) return;
  const monthSelect = root.querySelector("[data-budget-month-select]");
  const form = root.querySelector("[data-budget-form]");
  const modal = root.querySelector("[data-budget-modal]");
  const categoryField = root.querySelector("[data-budget-category]");
  const error = root.querySelector("[data-budget-error]");
  let budgets = [];
  let transactions = [];
  let selectedMonth = D.currentMonth;

  function fillMonths() {
    const before = monthSelect.value;
    const months = new Set([D.currentMonth, ...budgets.map((item) => item.month)]);
    for (let offset = -5; offset <= 5; offset += 1) months.add(D.monthKey(new Date(D.today.getFullYear(), D.today.getMonth() + offset, 1)));
    monthSelect.innerHTML = [...months].sort().reverse().map((month) => `<option value="${month}">${D.escape(D.monthFormatter.format(new Date(`${month}-01T12:00:00`)))}</option>`).join("");
    if (months.has(selectedMonth)) monthSelect.value = selectedMonth;
    else if (months.has(before)) { selectedMonth = before; monthSelect.value = before; }
  }
  function render() {
    try {
      budgets = D.load(D.keys.budgets, () => []);
      transactions = D.load(D.keys.transactions, () => []);
      fillMonths();
      const monthBudgets = budgets.filter((item) => item.month === selectedMonth).sort((a, b) => a.category.localeCompare(b.category, "vi"));
      const spending = D.expensesByCategory(transactions, selectedMonth);
      const totalLimit = monthBudgets.reduce((sum, item) => sum + Number(item.limit), 0);
      const totalSpent = Object.values(spending).reduce((sum, value) => sum + value, 0);
      const remaining = totalLimit - totalSpent;
      const percent = totalLimit ? totalSpent / totalLimit * 100 : 0;
      root.querySelectorAll('[data-metric="budget-total"]').forEach((el) => { el.textContent = D.money(totalLimit); });
      root.querySelectorAll('[data-metric="budget-spent"]').forEach((el) => { el.textContent = D.money(totalSpent); });
      root.querySelectorAll('[data-metric="remaining"]').forEach((el) => { el.textContent = D.money(remaining); });
      root.querySelectorAll('[data-metric="budget-spent-note"]').forEach((el) => { el.textContent = `${D.currentTransactions(transactions, selectedMonth).filter((item) => item.type === "expense").length} khoản chi trong tháng`; });
      root.querySelectorAll('[data-metric="budget-remaining-note"]').forEach((el) => { el.textContent = remaining < 0 ? "Đã vượt tổng hạn mức" : "Trong hạn mức ngân sách"; });
      root.querySelector("[data-budget-month-label]").textContent = D.monthFormatter.format(new Date(`${selectedMonth}-01T12:00:00`));
      root.querySelector("[data-budget-overview-percent]").textContent = `${Math.round(percent)}%`;
      root.querySelector("[data-budget-overview-copy]").textContent = !totalLimit ? "Tạo ngân sách cho tháng này để bắt đầu theo dõi kế hoạch chi tiêu."
        : percent >= 100 ? "Chi tiêu đã vượt tổng hạn mức. Hãy xem lại các danh mục đang sử dụng nhiều ngân sách."
          : percent >= 80 ? "Bạn đang tiến gần tổng hạn mức. Theo dõi các khoản chi còn lại trong tháng."
            : "Tiến độ chi tiêu đang được cập nhật từ các giao dịch của bạn.";
      const progress = root.querySelector("[data-budget-overview-progress]");
      progress.style.width = D.progress(percent);
      progress.className = `user-progress-fill ${D.progressClass(percent)}`;
      root.querySelector("[data-budget-empty]").hidden = monthBudgets.length > 0;
      root.querySelector("[data-budget-list]").innerHTML = monthBudgets.map((budget) => {
        const spent = spending[budget.category] || 0;
        const ratio = Number(budget.limit) ? spent / Number(budget.limit) * 100 : 0;
        const balance = Number(budget.limit) - spent;
        return `<article class="user-panel user-budget-category-card"><div class="user-budget-card-top"><div class="user-category-icon">${D.escape(D.categoryIcons[budget.category] || "◌")}</div><div class="user-budget-card-heading"><strong>${D.escape(budget.category)}</strong><span>Ngân sách theo tháng</span></div><div class="user-budget-menu"><button class="user-row-action" type="button" aria-label="Sửa ngân sách ${D.escape(budget.category)}" data-edit-budget="${D.escape(budget.id)}">✎</button><button class="user-row-action user-row-action--delete" type="button" aria-label="Xóa ngân sách ${D.escape(budget.category)}" data-delete-budget="${D.escape(budget.id)}">×</button></div></div><div class="user-budget-card-amounts"><strong>${D.money(spent)}</strong><span>trên ${D.money(budget.limit)}</span></div><div class="user-progress-track user-budget-card-progress"><div class="user-progress-fill ${D.progressClass(ratio)}" style="width:${D.progress(ratio)}"></div></div><div class="user-budget-card-foot"><span>${Math.round(ratio)}% đã sử dụng</span><strong class="${balance < 0 ? "user-over-limit" : ""}">${balance < 0 ? `Vượt ${D.money(Math.abs(balance))}` : `Còn ${D.money(balance)}`}</strong></div><div class="user-budget-card-note">${ratio >= 100 ? "Bạn đã vượt hạn mức danh mục này." : ratio >= 80 ? "Sắp đạt hạn mức, hãy theo dõi chi tiêu." : "Bạn đang trong giới hạn ngân sách."}</div></article>`;
      }).join("");
    } catch (exception) { D.notify(exception.message, true); }
  }
  function fillCategories(selected) {
    categoryField.innerHTML = D.expenseCategories.map((name) => `<option>${D.escape(name)}</option>`).join("");
    if (selected) categoryField.value = selected;
  }
  function open(budget) {
    form.reset();
    form.elements.id.value = budget?.id || "";
    fillCategories(budget?.category);
    form.elements.limit.value = budget?.limit || "";
    form.elements.month.value = budget?.month || selectedMonth;
    root.querySelector("#budget-modal-title").textContent = budget ? "Chỉnh sửa ngân sách" : "Tạo ngân sách";
    form.querySelector('[type="submit"]').textContent = budget ? "Lưu thay đổi" : "Lưu ngân sách";
    error.textContent = "";
    modal.hidden = false;
    document.body.classList.add("user-modal-open");
    categoryField.focus();
  }
  function close() { modal.hidden = true; document.body.classList.remove("user-modal-open"); }
  root.querySelectorAll("[data-open-budget]").forEach((button) => button.addEventListener("click", () => open()));
  root.querySelectorAll("[data-close-budget]").forEach((button) => button.addEventListener("click", close));
  modal.addEventListener("click", (event) => { if (event.target === modal) close(); });
  monthSelect.addEventListener("change", () => { selectedMonth = monthSelect.value; render(); });
  root.querySelector("[data-budget-month-prev]").addEventListener("click", () => {
    const date = new Date(`${selectedMonth}-01T12:00:00`);
    selectedMonth = D.monthKey(new Date(date.getFullYear(), date.getMonth() - 1, 1));
    render();
  });
  root.querySelector("[data-budget-month-next]").addEventListener("click", () => {
    const date = new Date(`${selectedMonth}-01T12:00:00`);
    selectedMonth = D.monthKey(new Date(date.getFullYear(), date.getMonth() + 1, 1));
    render();
  });
  root.querySelector("[data-budget-month-current]").addEventListener("click", () => { selectedMonth = D.currentMonth; render(); });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    error.textContent = "";
    const data = Object.fromEntries(new FormData(form).entries());
    const amount = Number(data.limit);
    if (!Number.isFinite(amount) || amount <= 0) { error.textContent = "Nhập hạn mức lớn hơn 0."; return; }
    if (budgets.some((item) => item.month === data.month && item.category === data.category && item.id !== data.id)) { error.textContent = "Danh mục này đã có ngân sách trong tháng đã chọn."; return; }
    const record = { id: data.id || D.id(), category: data.category, limit: amount, month: data.month };
    const previous = budgets;
    budgets = data.id ? previous.map((item) => item.id === data.id ? record : item) : [record, ...previous];
    try { D.save("budgets", budgets); selectedMonth = record.month; close(); render(); D.notify(data.id ? "Đã cập nhật ngân sách." : "Đã tạo ngân sách."); }
    catch (exception) { budgets = previous; error.textContent = exception.message; }
  });
  root.querySelector("[data-budget-list]").addEventListener("click", (event) => {
    const edit = event.target.closest("[data-edit-budget]");
    const remove = event.target.closest("[data-delete-budget]");
    if (edit) open(budgets.find((item) => item.id === edit.dataset.editBudget));
    if (remove) {
      const budget = budgets.find((item) => item.id === remove.dataset.deleteBudget);
      if (!budget || !window.confirm(`Bạn có chắc muốn xóa ngân sách “${budget.category}”?`)) return;
      const previous = budgets;
      budgets = previous.filter((item) => item.id !== budget.id);
      try { D.save("budgets", budgets); render(); D.notify("Đã xóa ngân sách."); }
      catch (exception) { budgets = previous; D.notify(exception.message, true); }
    }
  });
  window.addEventListener("spendwise:user-data", render);
  window.addEventListener("storage", (event) => { if (event.key === D.keys.transactions || event.key === D.keys.budgets) render(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !modal.hidden) close(); });
  root.querySelector("[data-today]").textContent = new Intl.DateTimeFormat("vi-VN", { weekday: "short", day: "numeric", month: "short" }).format(D.today);
  render();
})();
