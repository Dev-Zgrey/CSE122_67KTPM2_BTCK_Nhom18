(() => {
  "use strict";

  const modules = {
    "account-auth": { login: "login", register: "register", forgot: "forgot-password" },
    "user-insights": { insights: "insights", ai: "ai" },
    "coach-clients": { clients: "clients", review: "budget" },
    "coach-resources": { library: "resources", editor: "edit-resource" },
    "moderator-ai": { templates: "ai-templates", review: "ai-review" },
    "admin-monitoring": { overview: "dashboard", audit: "audit" },
    "admin-access": { users: "users", permissions: "permissions" },
    "admin-configuration": { categories: "categories", settings: "settings" },
    "account-settings": { profile: "profile", settings: "settings" },
    error: { "404": "404" }
  };
  const group = document.currentScript?.dataset.group;
  const options = modules[group];
  if (!options) return;
  const params = new URLSearchParams(window.location.search);
  const page = window.location.pathname.split("/").pop();
  const requested = params.get("view") || params.get("code") || (group === "user-insights" && page === "ai.html" ? "ai" : "");
  const view = Object.hasOwn(options, requested) ? requested : Object.keys(options)[0];
  const moduleName = options[view];
  document.write(`<link rel="stylesheet" href="${moduleName}.css">`);
  document.write(`<script src="${moduleName}.js" defer><\/script>`);
})();
