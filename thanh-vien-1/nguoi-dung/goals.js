(() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    window.SpendWiseWorkspace.mount({
      slug: "user-saving-goals",
      storeKey: "goals",
      labelKey: "title",
      defaultRecord: { status: "Chưa bắt đầu" }
    });
  });
})();
