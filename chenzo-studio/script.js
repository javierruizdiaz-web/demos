/* CHENZO Studio — menú mobile, aparición al scroll y "abierto ahora"
   Horario según Google: mar 15-21, mié a sáb 10-21, dom cerrado; lunes sin dato confiable. */
(function () {
  var d = document, root = d.documentElement;
  root.classList.remove("no-js");
  root.classList.add("js");

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

  var st = d.getElementById("status");
  if (st) {
    try {
      var parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Argentina/Cordoba", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
      var g = function (t) { return (parts.find(function (p) { return p.type === t; }) || {}).value; };
      var day = g("weekday"), m = (parseInt(g("hour"), 10) % 24) * 60 + parseInt(g("minute"), 10);
      if (day === "Mon") {
        st.textContent = "Hoy lunes · consultá el horario por WhatsApp";
      } else {
        var open = (day === "Tue" && m >= 900 && m < 1260) || (["Wed", "Thu", "Fri", "Sat"].indexOf(day) > -1 && m >= 600 && m < 1260);
        st.textContent = open ? "Abierto ahora" : "Ahora cerrado · escribinos por WhatsApp";
        st.classList.toggle("is-open", open);
      }
      st.hidden = false;
    } catch (e) {}
  }
})();
