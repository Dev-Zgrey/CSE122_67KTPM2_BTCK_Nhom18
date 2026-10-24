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
      progress.className = `progress-fill ${D.progressClass(percent)}`;
      root.querySelector("[data-budget-empty]").hidden = monthBudgets.length > 0;
      root.querySelector("[data-budget-list]").innerHTML = monthBudgets.map((budget) => {
        const spent = spending[budget.category] || 0;
        const ratio = Number(budget.limit) ? spent / Number(budget.limit) * 100 : 0;
        const balance = Number(budget.limit) - spent;
        return `<article class="panel budget-category-card"><div class="budget-card-header"><div class="category-icon">${D.escape(D.categoryIcons[budget.category] || "◌")}</div><div class="budget-card-heading"><strong>${D.escape(budget.category)}</strong><span>Ngân sách theo tháng</span></div><div class="budget-month-select"><button class="row-action" type="button" aria-label="Sửa ngân sách ${D.escape(budget.category)}" data-edit-budget="${D.escape(budget.id)}">✎</button><button class="row-action row-action-delete" type="button" aria-label="Xóa ngân sách ${D.escape(budget.category)}" data-delete-budget="${D.escape(budget.id)}">×</button></div></div><div class="budget-card-amount"><strong>${D.money(spent)}</strong><span>trên ${D.money(budget.limit)}</span></div><div class="progress-track budget-card-progress"><div class="progress-fill ${D.progressClass(ratio)}" style="width:${D.progress(ratio)}"></div></div><div class="budget-card-note"><span>${Math.round(ratio)}% đã sử dụng</span><strong class="${balance < 0 ? "overview-limit" : ""}">${balance < 0 ? `Vượt ${D.money(Math.abs(balance))}` : `Còn ${D.money(balance)}`}</strong></div><div class="budget-card-warning">${ratio >= 100 ? "Bạn đã vượt hạn mức danh mục này." : ratio >= 80 ? "Sắp đạt hạn mức, hãy theo dõi chi tiêu." : "Bạn đang trong giới hạn ngân sách."}</div></article>`;
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
    document.body.classList.add("modal-open");
    categoryField.focus();
  }
  function close() { modal.hidden = true; document.body.classList.remove("modal-open"); }
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
