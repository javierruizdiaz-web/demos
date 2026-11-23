/* Veterinaria Córdoba — menú mobile, aparición al scroll y "abierto ahora" */
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

  // Abierto ahora (hora de Argentina)
  // L-V 8:30-12:30 y 16:30-20:30 · Sáb 9-13 y 17:30-19:30
  var sched = {
    1: [[510, 750], [990, 1230]], 2: [[510, 750], [990, 1230]], 3: [[510, 750], [990, 1230]],
    4: [[510, 750], [990, 1230]], 5: [[510, 750], [990, 1230]], 6: [[540, 780], [1050, 1170]], 0: []
  };
  try {
    var parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Argentina/Buenos_Aires", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
    var g = function (t) { return (parts.find(function (p) { return p.type === t; }) || {}).value; };
    var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(g("weekday"));
    var m = (parseInt(g("hour"), 10) % 24) * 60 + parseInt(g("minute"), 10);
    var open = (sched[day] || []).some(function (r) { return m >= r[0] && m < r[1]; });
    var st = d.getElementById("status");
    if (st) {
      st.textContent = open ? "Abierto ahora" : "Ahora cerrado · revisá los horarios";
      st.classList.toggle("is-open", open);
      st.hidden = false;
    }
    d.querySelectorAll(".hours__table tr[data-days]").forEach(function (tr) {
      if (tr.getAttribute("data-days").split(",").indexOf(String(day)) > -1) tr.classList.add("is-today");
    });
  } catch (e) {}
})();
