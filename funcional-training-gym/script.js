/* Funcional Training Gym — menú mobile, aparición al scroll y "abierto ahora" */
(function () {
  var d = document;
  d.documentElement.classList.remove("no-js");

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

  // Abierto ahora: lunes a viernes de 8 a 22 (hora de Argentina)
  var st = d.getElementById("status");
  if (st) {
    try {
      var parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Argentina/Cordoba", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
      var g = function (t) { return (parts.find(function (p) { return p.type === t; }) || {}).value; };
      var day = g("weekday"), m = (parseInt(g("hour"), 10) % 24) * 60 + parseInt(g("minute"), 10);
      var open = ["Mon", "Tue", "Wed", "Thu", "Fri"].indexOf(day) > -1 && m >= 480 && m < 1320;
      st.textContent = open ? "Abierto ahora · Av. Italia 147" : "Ahora cerrado · escribinos por WhatsApp";
      st.classList.toggle("is-open", open);
    } catch (e) {}
  }
})();
