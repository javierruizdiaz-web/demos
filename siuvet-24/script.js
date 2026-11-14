/* SiuVet 24 — menú, reveal y reloj en vivo (hora de Argentina) */
(function () {
  var d = document;
  d.documentElement.classList.remove("no-js");

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

  var els = d.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add("is-in"); }); }

  var hh = d.getElementById("hh"), mm = d.getElementById("mm");
  if (hh && mm) {
    var fmt;
    try { fmt = new Intl.DateTimeFormat("es-AR", { timeZone: "America/Argentina/Cordoba", hour: "2-digit", minute: "2-digit", hour12: false }); } catch (e) {}
    var tick = function () {
      var now = new Date(), h, m;
      if (fmt) { var p = fmt.formatToParts(now); p.forEach(function (x) { if (x.type === "hour") h = x.value; if (x.type === "minute") m = x.value; }); }
      else { h = String(now.getHours()).padStart(2, "0"); m = String(now.getMinutes()).padStart(2, "0"); }
      hh.textContent = h === "24" ? "00" : h; mm.textContent = m;
    };
    tick(); setInterval(tick, 10000);
  }
})();
