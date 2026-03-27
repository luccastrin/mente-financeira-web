import { loadIncludes } from "./includes.js";
import { initApp } from "./app.js";

try {
  await loadIncludes();
  initApp();
} catch (err) {
  console.error(err);
  const main = document.getElementById("conteudo");
  if (main) {
    const p = document.createElement("p");
    p.setAttribute("role", "alert");
    p.style.cssText =
      "padding:2rem;text-align:center;color:#f87171;font-family:system-ui,sans-serif";
    p.textContent =
      "Não foi possível carregar partes da página. Abra o site via servidor HTTP (ex.: GitHub Pages ou `npx serve`).";
    main.prepend(p);
  }
}
