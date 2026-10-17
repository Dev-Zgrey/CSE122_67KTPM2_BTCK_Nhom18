(() => {
  "use strict";
  const D = window.SpendWiseUserData;
  const root = document.querySelector('[data-page="transactions"]');
  if (!D || !root) return;
  const rows = root.querySelector("[data-transaction-rows]");
  const search = root.querySelector("[data-transaction-search]");
  const typeFilter = root.querySelector("[data-transaction-type]");
  const categoryFilter = root.querySelector("[data-transaction-category]");
  const monthFilter = root.querySelector("[data-transaction-month]");
  const modal = root.querySelector("[data-transaction-modal]");
  const form = root.querySelector("[data-transaction-form]");
  const categoryField = root.querySelector("[data-transaction-form-category]");
  const error = root.querySelector("[data-transaction-error]");
  let transactions = [];
  const typeLabels = { income: "Khoản thu", expense: "Khoản chi" };

  function fillFormCategories(type, selected) {
    const categories = type === "income" ? D.incomeCategories : D.expenseCategories;
    categoryField.innerHTML = categories.map((category) => `<option>${D.escape(category)}</option>`).join("");
    if (selected && categories.includes(selected)) categoryField.value = selected;
  }
  function refreshFilters() {
    const selectedCategory = categoryFilter.value;
    const selectedMonth = monthFilter.value;
    const categories = [...new Set(transactions.map((item) => item.category))].sort((a, b) => a.localeCompare(b, "vi"));
    categoryFilter.innerHTML = `<option value="all">Tất cả danh mục</option>${categories.map((name) => `<option>${D.escape(name)}</option>`).join("")}`;
    if (categories.includes(selectedCategory)) categoryFilter.value = selectedCategory;
    const months = [...new Set(transactions.map((item) => item.date.slice(0, 7)))].sort().reverse();
    monthFilter.innerHTML = `<option value="all">Tất cả thời gian</option>${months.map((month) => `<option value="${month}">${D.escape(D.monthFormatter.format(new Date(`${month}-01T12:00:00`)))}</option>`).join("")}`;
    if (months.includes(selectedMonth)) monthFilter.value = selectedMonth;
  }
  function render() {
    try {
      transactions = D.load(D.keys.transactions, () => []);
      refreshFilters();
      const query = search.value.trim().toLocaleLowerCase("vi");
      const filtered = transactions.filter((item) => (!query || `${item.title} ${item.category} ${item.note || ""}`.toLocaleLowerCase("vi").includes(query))
        && (typeFilter.value === "all" || item.type === typeFilter.value)
        && (categoryFilter.value === "all" || item.category === categoryFilter.value)
        && (monthFilter.value === "all" || item.date.startsWith(monthFilter.value)))
        .sort((a, b) => b.date.localeCompare(a.date));
      root.querySelector("[data-filtered-count]").textContent = filtered.length;
      root.querySelector("[data-transaction-empty]").hidden = !!filtered.length;
      root.querySelector(".user-table-scroll").hidden = !filtered.length;
      rows.innerHTML = filtered.map((item) => `<tr><td><div class="user-table-transaction"><div class="user-category-icon ${item.type === "income" ? "user-category-icon--income" : ""}">${D.escape(D.categoryIcons[item.category] || "◌")}</div><div><strong>${D.escape(item.title)}</strong><span>${D.escape(item.note || typeLabels[item.type])}</span></div></div></td><td><span class="user-category-tag">${D.escape(item.category)}</span></td><td>${D.formatDate(item.date)}</td><td>${D.escape(item.method || "Tiền mặt")}</td><td class="user-amount-cell ${item.type === "income" ? "user-amount-cell--income" : ""}">${item.type === "income" ? "+" : "−"}${D.money(item.amount)}</td><td><div class="user-row-actions"><button class="user-row-action" type="button" aria-label="Sửa ${D.escape(item.title)}" data-edit-transaction="${D.escape(item.id)}">✎</button><button class="user-row-action user-row-action--delete" type="button" aria-label="Xóa ${D.escape(item.title)}" data-delete-transaction="${D.escape(item.id)}">×</button></div></td></tr>`).join("");
      const monthly = D.totals(D.currentTransactions(transactions));
      root.querySelectorAll('[data-metric="income"]').forEach((el) => { el.textContent = D.money(monthly.income); });
      root.querySelectorAll('[data-metric="expense"]').forEach((el) => { el.textContent = D.money(monthly.expense); });
      root.querySelectorAll('[data-metric="transaction-count"]').forEach((el) => { el.textContent = D.currentTransactions(transactions).length; });
    } catch (exception) { D.notify(exception.message, true); }
  }
  function open(item) {
    form.reset();
    form.elements.id.value = item?.id || "";
    const type = item?.type || "expense";
    form.querySelector(`input[name="type"][value="${type}"]`).checked = true;
    fillFormCategories(type, item?.category);
    form.elements.title.value = item?.title || "";
    form.elements.amount.value = item?.amount || "";
    form.elements.date.value = item?.date || D.dateKey(D.today);
    form.elements.method.value = item?.method || "Tiền mặt";
    form.elements.note.value = item?.note || "";
    root.querySelector("#transaction-modal-title").textContent = item ? "Chỉnh sửa giao dịch" : "Thêm giao dịch";
    form.querySelector('[type="submit"]').textContent = item ? "Lưu thay đổi" : "Lưu giao dịch";
    error.textContent = "";
    modal.hidden = false;
    document.body.classList.add("user-modal-open");
    form.elements.title.focus();
  }
  function close() { modal.hidden = true; document.body.classList.remove("user-modal-open"); }
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
    const record = { ...data, amount, id: data.id || D.id(), title: data.title.trim(), note: data.note.trim() };
    const previous = transactions;
    transactions = data.id ? previous.map((item) => item.id === data.id ? record : item) : [record, ...previous];
    try { D.save("transactions", transactions); close(); render(); D.notify(data.id ? "Đã cập nhật giao dịch." : "Đã thêm giao dịch."); }
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
      try { D.save("transactions", transactions); render(); D.notify("Đã xóa giao dịch."); } catch (exception) { transactions = previous; D.notify(exception.message, true); }
    }
  });
  [search, typeFilter, categoryFilter, monthFilter].forEach((control) => control.addEventListener(control === search ? "input" : "change", render));
  root.querySelector("[data-clear-filters]").addEventListener("click", () => { search.value = ""; typeFilter.value = "all"; categoryFilter.value = "all"; monthFilter.value = "all"; render(); });
  root.querySelector("[data-export-transactions]").addEventListener("click", () => {
    if (!transactions.length) { D.notify("Chưa có giao dịch để xuất.", true); return; }
    const content = `\uFEFF${[["Ngày", "Loại", "Tên giao dịch", "Danh mục", "Số tiền", "Phương thức", "Ghi chú"], ...transactions.map((item) => [item.date, typeLabels[item.type], item.title, item.category, item.amount, item.method, item.note])].map((line) => line.map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`).join(",")).join("\r\n")}`;
    const url = URL.createObjectURL(new Blob([content], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = `spendwise-giao-dich-${D.currentMonth}.csv`; anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
    D.notify("Đã xuất danh sách giao dịch.");
  });
  if (new URLSearchParams(location.search).has("new")) open();
  window.addEventListener("spendwise:user-data", render);
  window.addEventListener("storage", (event) => { if (event.key === D.keys.transactions) render(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !modal.hidden) close(); });
  root.querySelector("[data-today]").textContent = new Intl.DateTimeFormat("vi-VN", { weekday: "short", day: "numeric", month: "short" }).format(D.today);
  render();
})();
