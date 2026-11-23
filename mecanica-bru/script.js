/* Mecánica Bru — menú mobile, aparición al scroll, "abierto ahora" y consulta por WhatsApp */
(function () {
  var d = document;
  d.documentElement.classList.remove("no-js");
  var WA = "5493624717215";

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
    window.addEventListener("resize", function () { if (window.innerWidth > 860) close(); });
  }

  // Aparición al hacer scroll
  var els = d.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add("is-in"); }); }

  // Abierto ahora: lun a vie 7:30-13, sáb 8-12 (hora de Argentina)
  try {
    var parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Argentina/Cordoba", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
    var g = function (t) { return (parts.find(function (p) { return p.type === t; }) || {}).value; };
    var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(g("weekday"));
    var m = (parseInt(g("hour"), 10) % 24) * 60 + parseInt(g("minute"), 10);
    var open = (day >= 1 && day <= 5 && m >= 450 && m < 780) || (day === 6 && m >= 480 && m < 720);
    var st = d.getElementById("status");
    if (st) {
      st.textContent = open ? "Taller abierto ahora" : "Taller cerrado · dejanos tu consulta por WhatsApp";
      st.classList.toggle("is-open", open);
    }
    var row = d.querySelector('.tabla tr[data-d="' + day + '"]');
    if (row) row.classList.add("is-today");
  } catch (e) {}

  // Consulta rápida -> WhatsApp
  var f = d.getElementById("consulta");
  if (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var auto = f.auto.value.trim(), tipo = f.tipo.value, det = f.detalle.value.trim();
      var txt = "Hola Mecánica Bru, quiero hacer una consulta.\n" +
        "Necesito: " + tipo + "\n" +
        (auto ? "Auto: " + auto + "\n" : "") +
        (det ? "Detalle: " + det : "");
      window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(txt.trim()), "_blank", "noopener");
    });
  }
})();
