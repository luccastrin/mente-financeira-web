/**
 * Carrega fragmentos HTML listados em ordem (atributo data-include).
 * Requer servidor HTTP (ex.: GitHub Pages, `npx serve`); file:// não carrega fetch.
 */
export async function loadIncludes(root = document) {
  const nodes = [...root.querySelectorAll("[data-include]")];
  for (const el of nodes) {
    const path = el.getAttribute("data-include");
    if (!path) continue;
    const url = new URL(path, window.location.href);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Falha ao carregar include: ${path} (${res.status})`);
    el.innerHTML = await res.text();
  }
}
