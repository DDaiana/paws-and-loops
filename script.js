
const pages = [...document.querySelectorAll(".page")];
const navLinks = [...document.querySelectorAll("[data-nav]")];
const menu = document.querySelector(".nav");
const menuToggle = document.querySelector(".menu-toggle");
const modal = document.querySelector("#order-modal");
const closeTargets = document.querySelectorAll("[data-close]");
let lastFocused = null;

function showPage(id, push = true) {
  const target = document.getElementById(id) || document.getElementById("home");
  pages.forEach(p => p.classList.toggle("active", p === target));
  navLinks.forEach(a => {
    const active = a.dataset.nav === target.id;
    a.classList.toggle("active", active);
    if (active) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  if (push && location.hash !== `#${target.id}`) history.pushState(null, "", `#${target.id}`);
  const heading = target.querySelector("h1")?.textContent.trim();
  document.title = target.id === "home" ? "Paws & Loops" : `${heading} | Paws & Loops`;
  window.scrollTo({top: 0, behavior: "auto"});
  menu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}

navLinks.forEach(link => link.addEventListener("click", e => {
  e.preventDefault();
  showPage(link.dataset.nav);
}));

window.addEventListener("popstate", () => showPage(location.hash.slice(1) || "home", false));
window.addEventListener("hashchange", () => showPage(location.hash.slice(1) || "home", false));

menuToggle.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

function openModal() {
  lastFocused = document.activeElement;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  setTimeout(() => modal.querySelector("input")?.focus(), 0);
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  lastFocused?.focus?.();
}

document.querySelectorAll(".open-order").forEach(btn => btn.addEventListener("click", openModal));
closeTargets.forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  if (e.key === "Tab" && modal.classList.contains("open")) {
    const focusable = [...modal.querySelectorAll('button, input, select, textarea, [href], [tabindex]:not([tabindex="-1"])')]
      .filter(el => !el.disabled && el.offsetParent !== null);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

document.querySelector("#order-form").addEventListener("submit", e => {
  e.preventDefault();
  const status = e.currentTarget.querySelector(".form-status");
  status.textContent = "Thank you — your consultation request has been recorded.";
  e.currentTarget.reset();
});

document.querySelector("#contact-form").addEventListener("submit", e => {
  e.preventDefault();
  const status = e.currentTarget.querySelector(".form-status");
  status.textContent = "Thank you — your message has been recorded.";
  e.currentTarget.reset();
});

const initialPage = pages.some(page => page.id === location.hash.slice(1)) ? location.hash.slice(1) : "home";
if (location.hash !== `#${initialPage}`) history.replaceState(null, "", `#${initialPage}`);
showPage(initialPage, false);
