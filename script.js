const BASE = document.documentElement.dataset.base || ".";
const PAGE = document.documentElement.dataset.page || "home";
const API_BASE = String(window.PAWS_API_BASE || "").replace(/\/$/, "");

const navItems = [
  ["home", "HOME", `${BASE}/`],
  ["how-it-works", "HOW IT WORKS", `${BASE}/how-it-works/`],
  ["about", "ABOUT", `${BASE}/about/`],
  ["contact", "CONTACT", `${BASE}/contact/`],
];

const products = [
  ["custom-sage-everyday-sweater.webp", "Sage Everyday Sweater", "Soft, breathable and perfect for all seasons.", "Apricot dog in a sage crochet sweater"],
  ["custom-lilac-summer-top.webp", "Lilac Summer Top", "Lightweight and airy for sunny days.", "Tabby cat in a lilac crochet top"],
  ["custom-blush-harness-top.webp", "Blush Harness Top", "Comfortable and secure with a sunny edge.", "Small white dog in a blush crochet harness top"],
  ["custom-oatmeal-turtleneck.webp", "Oatmeal Turtleneck", "Minimal, cozy and effortlessly stylish.", "Tabby cat in an oatmeal crochet turtleneck"],
  ["custom-stripe-chic-sweater.webp", "Stripe Chic Sweater", "Timeless stripes for a classic look.", "Small dog in a striped crochet sweater"],
  ["custom-sage-collar-cape.webp", "Sage Collar Cape", "Elegant and light, made to stand out.", "Tabby cat in a sage crochet collar cape"],
  ["custom-navy-hoodie.webp", "Navy Hoodie", "Warm, cozy and perfect for cooler days.", "Apricot dog in a navy crochet hoodie"],
];

const processSteps = [
  ["consult.svg", "process-consult.webp", "CONSULT", "We get to know your pet, their needs and your preferences.", "Apricot dog ready for a consultation"],
  ["needle.svg", "process-design.webp", "DESIGN", "We design a piece just for your pet with style and comfort in mind.", "Sketchbook and crochet design tools"],
  ["yarn.svg", "process-handmade.webp", "HANDMADE", "Lovingly crocheted by hand with care and quality yarns.", "Hands crocheting with neutral yarn"],
  ["gift.svg", "process-delivered.webp", "DELIVERED", "Carefully packaged and delivered to your door, ready to love.", "Finished crochet piece in premium packaging"],
];

function AnnouncementBar() {
  return `<div class="announcement">HANDMADE CROCHET WEAR <span>•</span> CUSTOM ORDERS ONLY</div>`;
}

function Logo() {
  return `<a class="logo" href="${BASE}/" aria-label="Paws & Loops home"><img src="${BASE}/assets/logo/paws-and-loops-logo-sketch.svg" alt="Paws & Loops — crochet wear for dogs and cats" width="624" height="164"></a>`;
}

function Navigation() {
  return `<nav id="primary-navigation" class="navigation" aria-label="Main navigation">${navItems.map(([id, label, href]) => `<a class="nav-link${PAGE === id ? " active" : ""}" href="${href}"${PAGE === id ? ' aria-current="page"' : ""}>${label}</a>`).join("")}</nav>`;
}

function OrderButton(label = "START YOUR ORDER", className = "") {
  return `<button class="button button-primary order-trigger ${className}" type="button">${label}</button>`;
}

function Header() {
  return `${AnnouncementBar()}<header class="site-header"><div class="header-inner">${Logo()}<button class="menu-button" type="button" aria-expanded="false" aria-controls="primary-navigation" aria-label="Open menu"><img src="${BASE}/assets/icons/menu.svg" alt="" aria-hidden="true"></button>${Navigation()}<div class="header-actions">${OrderButton()}</div></div></header>`;
}

function BrandValue(icon, title, body) {
  return `<article class="brand-value"><img src="${BASE}/assets/icons/${icon}" alt="" aria-hidden="true"><div><h2>${title}</h2><p>${body}</p></div></article>`;
}

function Footer() {
  return `<footer class="site-footer"><div class="footer-main">${Logo()}${BrandValue("consult.svg", "We listen", "We get to know your pet and your vision.")}${BrandValue("needle.svg", "We create", "We design a custom piece just for them.")}${BrandValue("yarn.svg", "We make", "Handcrafted with care and attention.")}${BrandValue("heart.svg", "They enjoy", "A perfect fit, made with love.")}</div><div class="footer-bottom"><small>© 2024 Paws & Loops. All rights reserved.</small><p class="brand-script">Made with love,<br>just for them... ♡</p></div></footer>`;
}

function ProductCard([image, name, description, alt]) {
  return `<article class="product-card"><img src="${BASE}/assets/images/previous-customs/${image}" alt="${alt}" width="1200" height="1500" loading="lazy"><h3>${name}</h3><p>${description}</p><button class="button button-outline order-trigger" type="button">ORDER THIS LOOK</button></article>`;
}

function ProcessStep(step, index) {
  const [icon, image, title, body, alt] = step;
  return `<article class="process-step"><img class="process-icon" src="${BASE}/assets/icons/${icon}" alt="" aria-hidden="true"><h2>${index + 1}. ${title}</h2><img class="process-image" src="${BASE}/assets/images/how-it-works/${image}" alt="${alt}" loading="lazy"><p>${body}</p></article>`;
}

function ConsultationForm() {
  return `<form id="consultation-form" class="form modal-form" novalidate>
    <div class="honeypot" aria-hidden="true"><label for="order-website">Website</label><input id="order-website" name="website" tabindex="-1" autocomplete="off"></div>
    <label for="order-name">NAME <span>*</span></label><input id="order-name" name="name" autocomplete="name" required maxlength="100" placeholder="Your name"><p class="field-error" data-error-for="order-name"></p>
    <label for="order-date">PREFERRED DATE &amp; TIME <span>*</span></label><input id="order-date" name="datetime" type="datetime-local" required><p class="field-error" data-error-for="order-date"></p>
    <label for="order-place">PLACE OF CONSULTATION <span>*</span></label><input id="order-place" name="place" required maxlength="250" placeholder="Your preferred place"><small>E.g. a café, your home, a park - anywhere convenient for you.</small><p class="field-error" data-error-for="order-place"></p>
    <label for="order-phone">PHONE <span>*</span></label><input id="order-phone" name="phone" type="tel" autocomplete="tel" required maxlength="50" placeholder="Your phone number"><p class="field-error" data-error-for="order-phone"></p>
    <label for="order-email">EMAIL <span>*</span></label><input id="order-email" name="email" type="email" autocomplete="email" required maxlength="254" placeholder="Your email address"><p class="field-error" data-error-for="order-email"></p>
    <button class="button button-primary button-full" type="submit">BOOK CONSULTATION</button><p class="form-status" aria-live="polite"></p>
  </form>`;
}

function ConsultationModal() {
  return `<div id="consultation-modal" class="modal" aria-hidden="true"><div class="modal-backdrop" data-modal-close></div><section class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button class="modal-close" type="button" data-modal-close aria-label="Close consultation form"><img src="${BASE}/assets/icons/close.svg" alt="" aria-hidden="true"></button><h2 id="modal-title">START YOUR CUSTOM ORDER <span aria-hidden="true">♡</span></h2><p>Let's start with a consultation to create something<br>perfectly made for your pet.</p>${ConsultationForm()}</section></div>`;
}

document.querySelector("#site-header").innerHTML = Header();
document.querySelector("#site-footer").innerHTML = Footer();
document.querySelector("#modal-root").innerHTML = ConsultationModal();
document.querySelector("#product-grid")?.insertAdjacentHTML("beforeend", products.map(ProductCard).join(""));
document.querySelector("#process-grid")?.insertAdjacentHTML("beforeend", processSteps.map(ProcessStep).join(""));

const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".navigation");
menuButton.addEventListener("click", () => {
  const open = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

const modal = document.querySelector("#consultation-modal");
const modalPanel = modal.querySelector(".modal-panel");
let lastFocused = null;

function openModal() {
  lastFocused = document.activeElement;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modal.querySelector("input")?.focus();
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  lastFocused?.focus();
}

document.addEventListener("click", (event) => {
  if (event.target.closest(".order-trigger")) openModal();
  if (event.target.closest("[data-modal-close]")) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (!modal.classList.contains("open")) return;
  if (event.key === "Escape") return closeModal();
  if (event.key !== "Tab") return;
  const focusable = [...modalPanel.querySelectorAll('button,input,select,textarea,[href],[tabindex]:not([tabindex="-1"])')].filter(el => !el.disabled && el.offsetParent !== null);
  const first = focusable[0];
  const last = focusable.at(-1);
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});

function validateForm(form) {
  let valid = true;
  form.querySelectorAll("[required]").forEach(field => {
    const error = form.querySelector(`[data-error-for="${field.id}"]`);
    const invalid = !field.value.trim() || !field.checkValidity();
    field.setAttribute("aria-invalid", String(invalid));
    error.textContent = invalid ? "Please complete this field." : "";
    if (invalid && valid) field.focus();
    valid = valid && !invalid;
  });
  return valid;
}

document.querySelectorAll(".form").forEach(form => form.addEventListener("submit", async event => {
  event.preventDefault();
  if (!validateForm(form)) return;
  const status = form.querySelector(".form-status");
  const button = form.querySelector('button[type="submit"]');
  const originalLabel = button.textContent;
  const isContact = form.id === "contact-form";
  button.disabled = true;
  button.textContent = isContact ? "SENDING..." : "BOOKING...";
  status.className = "form-status";
  status.textContent = "";
  try {
    if (!API_BASE) throw new Error("Submission service is not configured.");
    const payload = Object.fromEntries(new FormData(form).entries());
    const response = await fetch(`${API_BASE}/api/${isContact ? "contact" : "consultation"}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("Submission failed.");
    status.classList.add("success");
    status.textContent = isContact
      ? "Thank you — your message has been sent."
      : "Thank you — your consultation request has been sent. We’ll be in touch soon.";
    form.reset();
  } catch {
    status.classList.add("error");
    status.textContent = "Something went wrong. Please try again.";
  } finally {
    button.disabled = false;
    button.textContent = originalLabel;
  }
}));
