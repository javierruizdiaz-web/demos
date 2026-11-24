/* Lelio Valle — menú mobile, aparición al scroll, filtro del catálogo y cotización por WhatsApp */
(function () {
  var d = document;
  d.documentElement.classList.remove("no-js");
  d.documentElement.classList.add("js");
  var WA = "5493416029945";

  // Menú mobile
  var btn = d.getElementById("burger"), menu = d.getElementById("menu");
  function setTop() {
    var nav = d.querySelector(".nav");
    if (nav) d.documentElement.style.setProperty("--menu-top", nav.getBoundingClientRect().bottom + "px");
  }
  function close() { menu.classList.remove("is-open"); btn.setAttribute("aria-expanded", "false"); btn.setAttribute("aria-label", "Abrir menú"); }
  if (btn && menu) {
    btn.addEventListener("click", function () {
      setTop();
      var open = menu.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) close(); });
    d.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    window.addEventListener("resize", function () { if (window.innerWidth > 880) close(); });
  }

  // Aparición al hacer scroll
  var els = d.querySelectorAll(".reveal");
  var io = null;
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add("is-in"); }); }

  // Mensaje prellenado por producto
  d.querySelectorAll(".js-wa").forEach(function (a) {
    var p = a.getAttribute("data-p");
    a.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent("Hola, quiero cotizar: " + p + ". ¿Me pasan precio y disponibilidad? Gracias.");
  });

  // Filtro por categoría
  var chips = d.querySelectorAll(".chip"), prods = d.querySelectorAll(".prod"), count = d.getElementById("count");
  chips.forEach(function (c) {
    c.addEventListener("click", function () {
      var f = c.getAttribute("data-f"), n = 0;
      chips.forEach(function (x) { var on = x === c; x.classList.toggle("is-on", on); x.setAttribute("aria-pressed", on ? "true" : "false"); });
      prods.forEach(function (p) {
        var show = f === "all" || p.getAttribute("data-cat") === f;
        p.hidden = !show;
        if (show) { n++; p.classList.add("is-in"); }
      });
      if (count) count.textContent = n + (n === 1 ? " máquina" : " máquinas");
    });
  });
})();
