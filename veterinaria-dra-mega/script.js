/* Veterinaria Dra. Mega — menú mobile, aparición al scroll y "abierto ahora" */
(function () {
  var d = document, root = d.documentElement;
  root.classList.remove("no-js");
  root.classList.add("js-ready");

  // Menú mobile
  var btn = d.querySelector(".nav__toggle"), menu = d.getElementById("menu");
  if (btn && menu) {
    var close = function () { menu.classList.remove("is-open"); btn.setAttribute("aria-expanded", "false"); };
    btn.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) close(); });
    d.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  // Aparición al hacer scroll
  var els = d.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add("is-in"); }); }

  // Abierto ahora — Lun a sáb 9 a 12:30 · Lun a vie 16:30 a 20:30
  try {
    var parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Argentina/Buenos_Aires", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
    var g = function (t) { return (parts.find(function (p) { return p.type === t; }) || {}).value; };
    var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(g("weekday"));
    var m = (parseInt(g("hour"), 10) % 24) * 60 + parseInt(g("minute"), 10);
    var morning = day >= 1 && day <= 6 && m >= 540 && m < 750;
    var afternoon = day >= 1 && day <= 5 && m >= 990 && m < 1230;
    var open = morning || afternoon;
    var now = d.getElementById("now"), s = d.getElementById("status"), ss = d.getElementById("status-short");
    if (now) {
      now.textContent = open ? "Abierto ahora" : "Ahora cerrado · escribinos y te respondemos";
      now.classList.toggle("is-open", open);
      now.hidden = false;
    }
    if (s && ss) {
      ss.textContent = open ? "Abierto" : "Cerrado";
      ss.classList.toggle("is-open", open);
      s.textContent = open ? "ahora mismo" : "pedí turno por WhatsApp";
    }
  } catch (e) {}
})();
