(() => {
  "use strict";

  const modules = {
    "acc-auth": { login: "login", register: "register", forgot: "forgot-password" },
    "acc-settings": { profile: "profile", settings: "settings" },
    error: { "404": "404" },
    "user-insights": { insights: "insights", ai: "ai" },
    "coach-clients": { clients: "clients", review: "budget" },
    "coach-resources": { library: "resources", editor: "edit-resource" },
    "moderator-ai": { templates: "ai-templates", review: "ai-review" },
    "admin-monitoring": { overview: "dashboard", audit: "audit" },
    "admin-access": { users: "users", permissions: "permissions" },
    "admin-configuration": { categories: "categories", settings: "settings" }
  };
  const group = document.currentScript?.dataset.group;
  const views = modules[group];
  if (!views) return;

  const params = new URLSearchParams(location.search);
  const page = location.pathname.split("/").pop();
  const requested = params.get("view") || (group === "user-insights" && page === "ai.html" ? "ai" : "");
  const module = Object.hasOwn(views, requested) ? views[requested] : Object.values(views)[0];
  if (group === "acc-auth" || group === "acc-settings" || group === "error") {
    document.documentElement.dataset.accountView = module;
    document.write(`<link rel="stylesheet" href="${module}.css">`);
    document.write(`<script src="${module}.js" defer><\/script>`);
    return;
  }
  document.documentElement.dataset.workspaceModule = module;
  document.write(`<link rel="stylesheet" href="${module}.css">`);
  document.write('<script src="../../workspace-engine.js" defer><\/script>');
})();
