(() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {
    window.SpendWiseWorkspace.mount({
      slug: "user-ai-recommendations",
      storeKey: "recommendations",
      labelKey: "title",
      defaultRecord: { status: "Chờ xem xét" }
    });
  });
})();
