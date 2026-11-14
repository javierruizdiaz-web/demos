(function () {
  // WhatsApp: arma el link con el mensaje prellenado
  document.querySelectorAll("a.wa[data-msg]").forEach(function (a) {
    a.href = a.getAttribute("href").split("?")[0] + "?text=" + encodeURIComponent(a.dataset.msg);
  });
  // Header sólido al scrollear
  var header = document.querySelector(".header");
  var onScroll = function () { header.classList.toggle("solid", window.scrollY > 120); };
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  // Menú mobile
  var btn = document.querySelector(".menu-btn"), nav = document.getElementById("mnav");
  var set = function (o) {
    nav.classList.toggle("open", o); document.body.classList.toggle("menu-open", o);
    btn.setAttribute("aria-expanded", o); btn.setAttribute("aria-label", o ? "Cerrar menú" : "Abrir menú");
  };
  btn.addEventListener("click", function () { set(btn.getAttribute("aria-expanded") !== "true"); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("open")) { set(false); btn.focus(); } });
  // Aparición lenta
  var els = document.querySelectorAll(".rv");
  if (!("IntersectionObserver" in window)) { els.forEach(function (el) { el.classList.add("in"); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.06 });
  els.forEach(function (el) { io.observe(el); });
})();
