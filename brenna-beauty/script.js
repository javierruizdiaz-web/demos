(function () {
  document.documentElement.classList.add("js");
  // WhatsApp: arma el link con el mensaje prellenado
  document.querySelectorAll("a.wa[data-msg]").forEach(function (a) {
    a.href = a.getAttribute("href").split("?")[0] + "?text=" + encodeURIComponent(a.dataset.msg);
  });
  // Menú mobile
  var btn = document.querySelector(".menu-btn"), nav = document.getElementById("nav");
  if (btn && nav) {
    var set = function (o) { nav.classList.toggle("open", o); btn.setAttribute("aria-expanded", o); btn.setAttribute("aria-label", o ? "Cerrar menú" : "Abrir menú"); };
    btn.addEventListener("click", function () { set(btn.getAttribute("aria-expanded") !== "true"); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { set(false); } });
  }
  // Aparición suave al scrollear
  var els = document.querySelectorAll(".rv");
  if (!("IntersectionObserver" in window)) { els.forEach(function (el) { el.classList.add("in"); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  els.forEach(function (el) { io.observe(el); });
})();
