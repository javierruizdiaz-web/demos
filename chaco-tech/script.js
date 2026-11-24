/* CHACO TECH — menú mobile, aparición al scroll y cotizador con medidas por WhatsApp */
(function () {
  var d = document;
  d.documentElement.classList.remove("no-js");
  d.documentElement.classList.add("js");
  var WA = "5493644200611";

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
    window.addEventListener("resize", function () { if (window.innerWidth > 900) close(); });
  }

  // Aparición al hacer scroll
  var els = d.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add("is-in"); }); }

  // Cotizador
  var form = d.getElementById("qform");
  if (!form) return;
  var fTipo = d.getElementById("f-tipo"), fAncho = d.getElementById("f-ancho"),
      fLargo = d.getElementById("f-largo"), fAlto = d.getElementById("f-alto"),
      fLugar = d.getElementById("f-lugar"), err = d.getElementById("qerr");
  var shape = d.getElementById("plan-shape");
  var NS = "http://www.w3.org/2000/svg";

  function num(el) { var v = parseFloat(String(el.value).replace(",", ".")); return isFinite(v) ? v : NaN; }
  function fmt(v) { return (Math.round(v * 10) / 10).toString().replace(".", ","); }
  function attr(el, o) { for (var k in o) el.setAttribute(k, o[k]); }
  function add(tag, o) { var el = d.createElementNS(NS, tag); attr(el, o); shape.appendChild(el); return el; }

  function draw() {
    var tipo = fTipo.value;
    var a = num(fAncho), l = num(fLargo), h = num(fAlto);
    var A = a > 0 ? Math.min(a, 60) : 10, H = h > 0 ? Math.min(h, 15) : 5;
    var s = Math.min(250 / A, 140 / (H + 0.2 * A));
    var w = A * s, ph = H * s, rise = 0.2 * w;
    var x0 = 195 - w / 2, x1 = x0 + w, yb = 188, yt = yb - ph, mid = 195;
    while (shape.firstChild) shape.removeChild(shape.firstChild);
    add("line", { x1: 30, y1: yb, x2: 345, y2: yb, stroke: "#5c5a52", "stroke-width": 1.5 });
    var gable = /Galpón|Techo|seco/.test(tipo);
    if (gable) {
      add("path", { d: "M" + x0 + " " + yb + "V" + yt + "L" + mid + " " + (yt - rise) + "L" + x1 + " " + yt + "V" + yb });
      if (/Galpón|seco/.test(tipo)) {
        var dw = Math.min(w * 0.36, 90), dh = Math.min(ph * 0.75, ph - 6);
        add("rect", { x: mid - dw / 2, y: yb - dh, width: dw, height: dh, "stroke-width": 1.6 });
      }
      for (var i = 1; i < 6; i++) {
        var t = i / 6, xx = x0 + w * t, yy = t <= 0.5 ? yt - rise * (t / 0.5) : yt - rise * ((1 - t) / 0.5);
        add("line", { x1: xx, y1: yy, x2: xx, y2: yt, "stroke-width": 1, opacity: 0.5 });
      }
      add("line", { x1: x0, y1: yt, x2: x1, y2: yt, "stroke-width": 1.4 });
    } else {
      add("path", { d: "M" + x0 + " " + yb + "V" + yt + "Q" + mid + " " + (yt - 2 * rise) + " " + x1 + " " + yt + "V" + yb });
      add("path", { d: "M" + (x0 + 6) + " " + (yt + 4) + "Q" + mid + " " + (yt - 2 * rise + 14) + " " + (x1 - 6) + " " + (yt + 4), "stroke-width": 1.4 });
      for (var j = 1; j < 8; j++) {
        var u = j / 8, px = x0 + w * u, py = (1 - u) * (1 - u) * yt + 2 * u * (1 - u) * (yt - 2 * rise) + u * u * yt;
        add("line", { x1: px, y1: py, x2: px + (j % 2 ? 5 : -5), y2: py + 9, "stroke-width": 1, opacity: 0.7 });
      }
      add("line", { x1: x0 + w * 0.33, y1: yt + 2, x2: x0 + w * 0.33, y2: yb, "stroke-width": 1, opacity: 0.35 });
      add("line", { x1: x0 + w * 0.67, y1: yt + 2, x2: x0 + w * 0.67, y2: yb, "stroke-width": 1, opacity: 0.35 });
    }
    attr(d.getElementById("dim-w"), { x1: x0 + 4, y1: 204, x2: x1 - 4, y2: 204 });
    attr(d.getElementById("dim-h"), { x1: 40, y1: yb - 4, x2: 40, y2: yt + 4 });
    var tw = d.getElementById("t-w"), th = d.getElementById("t-h");
    attr(tw, { x: mid, y: 222 }); tw.textContent = "ANCHO " + (a > 0 ? fmt(a) : "?") + " M";
    attr(th, { x: 28, y: (yb + yt) / 2, transform: "rotate(-90 28 " + ((yb + yt) / 2) + ")" });
    th.textContent = h > 0 ? "ALTO " + fmt(h) + " M" : "ALTO";
    var area = a > 0 && l > 0 ? fmt(a * l) + " m²" : "Cargá ancho y largo";
    d.getElementById("plan-area").textContent = (l > 0 ? "Largo " + fmt(l) + " m · " : "") + area;
    d.getElementById("plan-tipo").textContent = tipo;
  }

  [fTipo, fAncho, fLargo, fAlto].forEach(function (el) { el.addEventListener("input", draw); el.addEventListener("change", draw); });
  draw();

  d.querySelectorAll(".js-quote").forEach(function (b) {
    b.addEventListener("click", function () {
      fTipo.value = b.getAttribute("data-tipo");
      draw();
      d.getElementById("cotizar").scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      setTimeout(function () { fAncho.focus({ preventScroll: true }); }, 500);
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var a = num(fAncho), l = num(fLargo), h = num(fAlto);
    if (!(a >= 3) || !(l >= 3)) { err.hidden = false; (a >= 3 ? fLargo : fAncho).focus(); return; }
    err.hidden = true;
    var uso = (form.querySelector('input[name="uso"]:checked') || {}).value || "";
    var lugar = fLugar.value.trim();
    var msg = "Hola CHACO TECH, quiero cotizar: " + fTipo.value + ".\n" +
      "Medidas: " + fmt(a) + " m de ancho x " + fmt(l) + " m de largo" + (h > 0 ? " x " + fmt(h) + " m de alto" : "") +
      " (" + fmt(a * l) + " m²).\n" +
      "Uso: " + uso + "." + (lugar ? "\nLugar de la obra: " + lugar + "." : "") +
      "\n¿Me pasan el presupuesto? Gracias.";
    window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
  });
})();
