import { PLANS, formatBRL } from "./pricing.js";

export function initScrollHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

export function initMobileNav() {
  const menuBtn = document.querySelector(".menu-toggle");
  const navMobile = document.getElementById("nav-mobile");
  if (!menuBtn || !navMobile) return;

  menuBtn.addEventListener("click", () => {
    const open = navMobile.classList.toggle("is-open");
    navMobile.hidden = !open;
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });

  navMobile.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      navMobile.classList.remove("is-open");
      navMobile.hidden = true;
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Abrir menu");
    });
  });
}

export function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("is-visible");
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  reveals.forEach((el) => observer.observe(el));
}

export function initPricingToggle() {
  const toggle = document.getElementById("pricing-toggle");
  const saveBadge = document.getElementById("save-badge");
  const priceValue = document.getElementById("price-value");
  const pricePeriod = document.getElementById("price-period");
  const priceEquiv = document.getElementById("price-equiv");
  const priceProValue = document.getElementById("price-pro-value");
  const priceProPeriod = document.getElementById("price-pro-period");
  const priceProEquiv = document.getElementById("price-pro-equiv");

  function setPricing(period) {
    if (!toggle) return;
    toggle.dataset.period = period;
    toggle.querySelectorAll("button").forEach((b) => {
      b.classList.toggle("is-active", b.dataset.period === period);
    });

    if (saveBadge) saveBadge.hidden = period !== "yearly";

    if (period === "monthly") {
      if (priceValue) priceValue.textContent = formatBRL(PLANS.essential.monthly);
      if (pricePeriod)
        pricePeriod.textContent = "por mês, cancelamento a qualquer momento";
      if (priceEquiv) {
        priceEquiv.textContent = "";
        priceEquiv.classList.add("is-hidden");
      }
      if (priceProValue) priceProValue.textContent = formatBRL(PLANS.pro.monthly);
      if (priceProPeriod)
        priceProPeriod.textContent = "por mês, para investidores ativos";
      if (priceProEquiv) {
        priceProEquiv.textContent = "";
        priceProEquiv.classList.add("is-hidden");
      }
    } else {
      const mEss = PLANS.essential.yearly / 12;
      const mPro = PLANS.pro.yearly / 12;
      if (priceValue) priceValue.textContent = formatBRL(PLANS.essential.yearly);
      if (pricePeriod) pricePeriod.textContent = "por ano (cobrança única)";
      if (priceEquiv) {
        priceEquiv.textContent = `Equivale a R$ ${formatBRL(mEss)}/mês`;
        priceEquiv.classList.remove("is-hidden");
      }
      if (priceProValue) priceProValue.textContent = formatBRL(PLANS.pro.yearly);
      if (priceProPeriod) priceProPeriod.textContent = "por ano (cobrança única)";
      if (priceProEquiv) {
        priceProEquiv.textContent = `Equivale a R$ ${formatBRL(mPro)}/mês`;
        priceProEquiv.classList.remove("is-hidden");
      }
    }
  }

  if (toggle) {
    toggle.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () =>
        setPricing(btn.dataset.period || "monthly")
      );
    });
  }
}

export function initFaq() {
  document.querySelectorAll(".faq-item").forEach((item) => {
    const btn = item.querySelector("button");
    const panel = item.querySelector(".faq-panel");
    const inner = item.querySelector(".faq-panel-inner");
    if (!btn || !panel || !inner) return;

    btn.addEventListener("click", () => {
      const open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
      panel.style.maxHeight = open ? `${inner.scrollHeight + 24}px` : "0";
    });
  });
}

export function initApp() {
  initScrollHeader();
  initMobileNav();
  initScrollReveal();
  initPricingToggle();
  initFaq();
}
