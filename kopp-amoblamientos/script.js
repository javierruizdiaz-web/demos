/* Kopp Amoblamientos — menú, filtro por ambiente, presupuesto con medidas y reveal */
(function () {
  var d = document, root = d.documentElement;
  root.classList.remove("no-js");
  root.classList.add("js");
  var WA = "5493416803807";

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

  // Filtro por ambiente
  var chips = d.querySelectorAll(".chip"), cards = d.querySelectorAll(".card");
  function filter(f) {
    chips.forEach(function (c) {
      var on = c.dataset.f === f;
      c.classList.toggle("is-on", on);
      c.setAttribute("aria-pressed", on ? "true" : "false");
    });
    cards.forEach(function (c) {
      var show = f === "todos" || c.dataset.cat === f;
      c.hidden = !show;
      if (show) c.classList.add("is-in");
    });
  }
  chips.forEach(function (c) { c.addEventListener("click", function () { filter(c.dataset.f); }); });
  d.querySelectorAll("[data-go]").forEach(function (a) {
    a.addEventListener("click", function () { filter(a.dataset.go); });
  });

  // "Pedir presupuesto" de cada tarjeta: precarga el formulario
  var amb = d.getElementById("q-amb"), prod = d.getElementById("q-prod"), prodLabel = d.getElementById("q-prod-label");
  d.querySelectorAll(".js-quote").forEach(function (b) {
    b.addEventListener("click", function () {
      prod.value = b.dataset.p;
      amb.value = b.dataset.a;
      prodLabel.textContent = "Modelo de referencia: " + b.dataset.p;
      prodLabel.hidden = false;
      d.getElementById("presupuesto").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      setTimeout(function () { d.getElementById("q-w").focus({ preventScroll: true }); }, 500);
    });
  });
  amb.addEventListener("change", function () { prod.value = ""; prodLabel.hidden = true; });

  // Plano que muestra las medidas que se escriben
  var w = d.getElementById("q-w"), h = d.getElementById("q-h");
  function plan() {
    d.getElementById("plan-w").textContent = "ancho " + (w.value.trim() || "?") + " m";
    d.getElementById("plan-h").textContent = "alto " + (h.value.trim() || "?") + " m";
  }
  w.addEventListener("input", plan); h.addEventListener("input", plan);

  // Envío por WhatsApp
  d.getElementById("qform").addEventListener("submit", function (e) {
    e.preventDefault();
    var v = function (id) { return d.getElementById(id).value.trim(); };
    var lines = ["Hola, quiero pedir presupuesto: " + (prod.value || amb.value) + "."];
    var m = [];
    if (v("q-w")) m.push("ancho " + v("q-w") + " m");
    if (v("q-h")) m.push("alto " + v("q-h") + " m");
    if (v("q-d")) m.push("profundidad " + v("q-d") + " m");
    if (m.length) lines.push("Medidas aproximadas: " + m.join(", ") + ".");
    if (v("q-loc")) lines.push("Zona: " + v("q-loc") + ".");
    if (v("q-msg")) lines.push(v("q-msg"));
    window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");
  });

  // Reveal
  var els = d.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add("is-in"); }); }
})();
