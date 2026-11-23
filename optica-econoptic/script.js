/* Óptica EconOptic — menú mobile, aparición al scroll y "abierto ahora" */
(function () {
  var d = document, root = d.documentElement;
  root.classList.remove("no-js");
  root.classList.add("js-ready");

  // Menú mobile
  var btn = d.querySelector(".nav__toggle"), menu = d.getElementById("menu"), lbl = d.querySelector(".nav__lbl");
  if (btn && menu) {
    var set = function (open) {
      menu.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      if (lbl) lbl.textContent = open ? "Cerrar" : "Menú";
    };
    btn.addEventListener("click", function () { set(!menu.classList.contains("is-open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); });
    d.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }

  // Aparición al hacer scroll
  var els = d.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add("is-in"); }); }

  // Abierto ahora — Lun a sáb 8:30 a 12:30 y 16:30 a 20:30
  try {
    var parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Argentina/Buenos_Aires", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
    var g = function (t) { return (parts.find(function (p) { return p.type === t; }) || {}).value; };
    var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(g("weekday"));
    var m = (parseInt(g("hour"), 10) % 24) * 60 + parseInt(g("minute"), 10);
    var open = day >= 1 && day <= 6 && ((m >= 510 && m < 750) || (m >= 990 && m < 1230));
    var now = d.getElementById("now");
    if (now) {
      now.textContent = open ? "Abierto ahora" : "Ahora cerrado · escribinos por WhatsApp";
      now.classList.toggle("is-open", open);
      now.hidden = false;
    }
  } catch (e) {}
})();
