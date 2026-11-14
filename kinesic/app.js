/* =========================================================
   Motor del template: arma todo el sitio a partir de window.DATA (data.js)
   No hace falta tocar este archivo para crear una demo.
   ========================================================= */
(function () {
  "use strict";
  var D = window.DATA;
  var app = document.getElementById("app");
  if (!D) { app.innerHTML = '<p style="padding:24px;font-family:sans-serif">No se encontró DATA. Revisá que data.js exista y no tenga errores de sintaxis (una coma o comilla de más).</p>'; return; }

  /* ---------- Fuentes por estilo (Google Fonts) ---------- */
  var FONTS = {
    salud:       "family=Plus+Jakarta+Sans:wght@400;500;600;700;800",
    gastronomia: "family=Playfair+Display:wght@600;700&family=Lato:wght@400;700",
    profesional: "family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700",
    belleza:     "family=Cormorant+Garamond:wght@500;600;700&family=Montserrat:wght@400;500;600;700",
    fitness:     "family=Oswald:wght@500;700&family=Inter:wght@400;500;600;700"
  };
  var estilo = FONTS[D.estilo] ? D.estilo : "salud";
  var root = document.documentElement;
  root.setAttribute("data-estilo", estilo);
  var lf = document.createElement("link");
  lf.rel = "stylesheet";
  lf.href = "https://fonts.googleapis.com/css2?" + FONTS[estilo] + "&display=swap";
  document.head.appendChild(lf);

  /* ---------- Colores ---------- */
  var col = D.colores || {};
  if (col.primario) root.style.setProperty("--p", col.primario);
  if (col.secundario) root.style.setProperty("--s", col.secundario);
  var pHex = col.primario || getComputedStyle(root).getPropertyValue("--p").trim();
  root.style.setProperty("--on-p", textOn(pHex));
  function textOn(hex) {
    var m = /^#?([0-9a-f]{6})$/i.exec((hex || "").trim()); if (!m) return "#fff";
    var n = parseInt(m[1], 16), r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    return (0.299 * r + 0.587 * g + 0.114 * b) > 165 ? "#111" : "#fff";
  }

  /* ---------- Helpers ---------- */
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function has(a) { return Array.isArray(a) && a.length > 0; }
  var N = D.negocio || {}, C = D.contacto || {};
  var iniciales = N.iniciales || (N.nombre || "N").split(/\s+/).filter(function (w) { return w.length > 2 || /^[A-Z]/.test(w); }).slice(0, 2).map(function (w) { return w[0]; }).join("").toUpperCase();
  function wa(msg) { return "https://wa.me/" + String(C.whatsapp || "").replace(/\D/g, "") + "?text=" + encodeURIComponent(msg || C.mensaje || ("Hola! Quiero hacer una consulta.")); }
  function stars(n) { n = Math.max(0, Math.min(5, Math.round(n || 5))); return "★★★★★".slice(0, n) + '<span style="opacity:.25">' + "★★★★★".slice(0, 5 - n) + "</span>"; }

  /* ---------- Iconos (nombre en data.js -> SVG). Si no existe, se muestra el texto/emoji tal cual ---------- */
  var P = {
    diente: '<path d="M7 3c-2.5 0-4 2-4 4.5 0 2 1 3.5 1.5 5.5.6 2.6.8 8 3 8 1.6 0 1.7-4.5 4.5-4.5s2.9 4.5 4.5 4.5c2.2 0 2.4-5.4 3-8 .5-2 1.5-3.5 1.5-5.5C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3z"/>',
    sonrisa: '<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
    corazon: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/>',
    salud: '<path d="M12 5v14M5 12h14"/><rect x="3" y="3" width="18" height="18" rx="4"/>',
    escudo: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    chispa: '<path d="M12 3l1.9 5.8L20 10l-6.1 1.2L12 17l-1.9-5.8L4 10l6.1-1.2z"/><path d="M19 17l.8 2.2L22 20l-2.2.8L19 23l-.8-2.2L16 20l2.2-.8z"/>',
    estrella: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
    reloj: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    calendario: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    cubiertos: '<path d="M3 2v7c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2V2M6 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>',
    copa: '<path d="M8 22h8M12 15v7M7 2h10l-1 8a4 4 0 0 1-8 0z"/>',
    cafe: '<path d="M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"/><path d="M6 2v2M10 2v2M14 2v2"/>',
    moto: '<circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6h2l3 7.5M5.5 17.5 9 10h6l3.5 7.5M9 10l-2-4H4"/>',
    fuego: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.1-.2-4 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.3 1-3.4.4 1.1 1.2 2.1 2.5 2.9z"/>',
    tijera: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12"/>',
    spa: '<path d="M12 22c4-2 8-5.5 8-11-3 0-6 1.5-8 4-2-2.5-5-4-8-4 0 5.5 4 9 8 11z"/><path d="M12 15c0-4 1-8 0-12-1 4 0 8 0 12z"/>',
    pesa: '<path d="M6.5 6.5v11M17.5 6.5v11M3 9v6M21 9v6M6.5 12h11"/>',
    balanza: '<path d="M12 3v18M5 21h14M7 7h10M3 15l4-8 4 8a4 4 0 0 1-8 0zM13 15l4-8 4 8a4 4 0 0 1-8 0z"/>',
    maletin: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M2 13h20"/>',
    documento: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
    casa: '<path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    llave: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',
    auto: '<path d="M5 17h14M5 17a2 2 0 1 1-4 0v-5l2.5-6h17L23 12v5a2 2 0 1 1-4 0"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
    hoja: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z"/><path d="M2 21c0-3 1.9-5.4 5.2-6"/>',
    bebe: '<circle cx="12" cy="8" r="5"/><path d="M9 8h.01M15 8h.01M10 10.5s.8.8 2 .8 2-.8 2-.8M6 21v-2a6 6 0 0 1 12 0v2"/>',
    usuario: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    telefono: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
    ubicacion: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>'
  };
  function icon(name) {
    if (P[name]) return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + P[name] + "</svg>";
    return '<span aria-hidden="true">' + esc(name || "•") + "</span>";
  }
  var WA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.44 9.43m8.03-17.46A11.27 11.27 0 0 0 12.04.72C5.79.72.7 5.8.7 12.06c0 2 .52 3.95 1.52 5.67L.6 23.6l6.02-1.58a11.33 11.33 0 0 0 5.42 1.38h.01c6.25 0 11.34-5.09 11.34-11.34 0-3.03-1.18-5.88-3.32-8.02"/></svg>';
  function waBtn(label, cls, msg) { return '<a class="btn ' + (cls || "btn-wa") + '" href="' + wa(msg) + '" target="_blank" rel="noopener">' + WA + '<span class="t">' + esc(label) + "</span></a>"; }

  /* ---------- SEO ---------- */
  var S = D.seo || {};
  var title = S.titulo || (N.nombre + " | " + (N.rubro || "") + (C.ciudad ? " en " + C.ciudad : ""));
  var desc = S.descripcion || N.slogan || "";
  var ogImg = S.imagen || (D.hero && D.hero.imagen) || "";
  document.title = title;
  function meta(sel, val) { var m = document.querySelector(sel); if (m && val) m.setAttribute("content", val); }
  meta('meta[name="description"]', desc); meta('meta[property="og:title"]', title);
  meta('meta[property="og:description"]', desc); meta('meta[property="og:image"]', ogImg);
  meta('meta[name="theme-color"]', pHex);
  var fav = document.createElement("link"); fav.rel = "icon";
  fav.href = N.logo || ("data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="' + pHex + '"/><text x="32" y="42" font-size="28" font-family="Arial" font-weight="700" text-anchor="middle" fill="' + textOn(pHex) + '">' + esc(iniciales) + "</text></svg>"));
  document.head.appendChild(fav);
  // Datos estructurados (Google: negocio local)
  var ld = { "@context": "https://schema.org", "@type": S.tipoSchema || "LocalBusiness", name: N.nombre, description: desc, image: ogImg, telephone: C.telefono || ("+" + C.whatsapp), address: { "@type": "PostalAddress", streetAddress: C.direccion, addressLocality: C.ciudad, addressCountry: C.pais || "AR" } };
  var lds = document.createElement("script"); lds.type = "application/ld+json"; lds.textContent = JSON.stringify(ld); document.head.appendChild(lds);

  /* ---------- Secciones ---------- */
  var H = D.hero || {}, A = D.sobre || {}, R = D.resenas || [], CAL = D.calificacion || null;
  var out = [];

  // Banner demo
  var demo = D.demo || {};
  if (demo.activo) {
    out.push('<div class="demo-bar" id="demoBar">' + (demo.texto ? esc(demo.texto) : 'Demo preparada para <b>' + esc(N.nombre) + "</b> — propuesta de diseño") + (demo.autor ? " · por " + esc(demo.autor) : "") + '<button type="button" aria-label="Cerrar" onclick="this.parentNode.remove()">×</button></div>');
  }

  // Header
  var links = [];
  if (has(D.servicios)) links.push(['#servicios', (D.textos && D.textos.servicios) || "Servicios"]);
  if (A.texto) links.push(['#nosotros', "Nosotros"]);
  if (has(D.galeria)) links.push(['#galeria', "Galería"]);
  if (has(R)) links.push(['#resenas', "Opiniones"]);
  links.push(['#contacto', "Contacto"]);
  out.push('<header><div class="wrap nav"><a class="brand" href="#">' +
    (N.logo ? '<img src="' + esc(N.logo) + '" alt="' + esc(N.nombre) + '">' : '<span class="ini">' + esc(iniciales) + "</span>") +
    "<span>" + esc(N.nombre) + "</span></a><ul>" +
    links.map(function (l) { return '<li><a href="' + l[0] + '">' + esc(l[1]) + "</a></li>"; }).join("") +
    "</ul>" + waBtn(H.ctaCorto || "Escribinos", "btn-wa") + "</div></header><main>");

  // Hero
  out.push('<section class="hero">' + (H.imagen ? '<img class="bgimg" src="' + esc(H.imagen) + '" alt="" fetchpriority="high">' : "") +
    '<div class="wrap">' + (N.rubro ? '<span class="tag">' + esc(N.rubro) + (C.ciudad ? " · " + esc(C.ciudad) : "") + "</span>" : "") +
    "<h1>" + esc(H.titulo || N.nombre) + "</h1><p>" + esc(H.subtitulo || N.slogan || "") + "</p>" +
    '<div class="ctas">' + waBtn(H.cta || "Pedí tu turno por WhatsApp", "btn-wa", H.mensajeCta) +
    (has(D.servicios) ? '<a class="btn btn-o" href="#servicios">' + esc(H.ctaSecundario || "Ver servicios") + "</a>" : "") + "</div>" +
    (CAL ? '<div class="rating"><span class="stars">' + stars(CAL.promedio) + "</span><span><b>" + esc(CAL.promedio) + "</b> · " + esc(CAL.total) + " reseñas en " + esc(CAL.fuente || "Google") + "</span></div>" : "") +
    "</div></section>");

  // Servicios
  if (has(D.servicios)) {
    var T = D.textos || {};
    out.push('<section id="servicios"><div class="wrap"><div class="center"><span class="eyebrow">' + esc(T.servicios || "Servicios") + "</span><h2>" + esc(T.serviciosTitulo || "¿En qué te podemos ayudar?") + '</h2>' + (T.serviciosLead ? '<p class="lead">' + esc(T.serviciosLead) + "</p>" : "") + '</div><div class="cards">' +
      D.servicios.map(function (s) { return '<article class="card rv"><div class="ico">' + icon(s.icono) + "</div><h3>" + esc(s.titulo) + "</h3><p>" + esc(s.texto) + "</p>" + (s.precio ? '<div class="price">' + esc(s.precio) + "</div>" : "") + "</article>"; }).join("") +
      "</div></div></section>");
  }

  // Sobre nosotros
  if (A.texto) {
    out.push('<section id="nosotros" class="alt"><div class="wrap about">' + (A.imagen ? '<img class="rv" src="' + esc(A.imagen) + '" alt="' + esc(N.nombre) + '" loading="lazy">' : "") +
      '<div class="rv"><span class="eyebrow">' + esc(A.etiqueta || "Sobre nosotros") + "</span><h2>" + esc(A.titulo || N.nombre) + "</h2>" +
      (Array.isArray(A.texto) ? A.texto : [A.texto]).map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") +
      (has(A.puntos) ? '<ul class="points">' + A.puntos.map(function (p) { return "<li>" + icon("check") + "<span>" + esc(p) + "</span></li>"; }).join("") + "</ul>" : "") +
      "</div></div></section>");
  }

  // Galería
  if (has(D.galeria)) {
    out.push('<section id="galeria"><div class="wrap"><div class="center"><span class="eyebrow">Galería</span><h2>' + esc((D.textos && D.textos.galeriaTitulo) || "Conocé nuestro espacio") + '</h2></div><div class="gal">' +
      D.galeria.slice(0, 7).map(function (g) { var src = typeof g === "string" ? g : g.url, alt = typeof g === "string" ? N.nombre : (g.alt || N.nombre); return '<button type="button" class="rv" data-full="' + esc(src) + '"><img src="' + esc(src) + '" alt="' + esc(alt) + '" loading="lazy"></button>'; }).join("") +
      '</div></div></section><dialog class="lb" id="lb"><button type="button" aria-label="Cerrar">×</button><img alt=""></dialog>');
  }

  // Reseñas
  if (has(R)) {
    out.push('<section id="resenas" class="alt"><div class="wrap"><div class="center"><span class="eyebrow">Opiniones</span><h2>Lo que dicen nuestros clientes</h2>' +
      (CAL ? '<div class="score"><span class="stars">' + stars(CAL.promedio) + "</span>" + esc(CAL.promedio) + " / 5 · " + esc(CAL.total) + " reseñas</div>" : "") +
      '</div><div class="reviews">' +
      R.map(function (r) { var ini = (r.nombre || "?").split(/\s+/).map(function (w) { return w[0]; }).slice(0, 2).join("").toUpperCase(); return '<article class="review rv"><div class="stars">' + stars(r.estrellas) + "</div><p>“" + esc(r.texto) + '”</p><div class="who"><i>' + esc(ini) + "</i><span>" + esc(r.nombre) + "<small>" + esc(r.detalle || "Reseña de Google") + "</small></span></div></article>"; }).join("") +
      "</div></div></section>");
  }

  // Horarios + mapa + contacto
  var dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  var hoy = dias[new Date().getDay()];
  function norm(s) { return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  var DN = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];
  function esHoy(dia) { // acepta "Lunes", "Lunes a viernes", "Sábados y domingos" (nombres completos de días)
    var t = norm(dia), h = DN.indexOf(norm(hoy)), found = [];
    DN.forEach(function (d, i) { var k = t.indexOf(d); if (k > -1) found.push([k, i]); });
    found.sort(function (a, b) { return a[0] - b[0]; });
    if (found.length === 2 && /\s(a|al)\s|-|–/.test(t)) return h >= found[0][1] && h <= found[1][1];
    return found.some(function (f) { return f[1] === h; });
  }
  var abierto = null;
  var hs = D.horarios || [];
  hs.forEach(function (h) {
    if (!esHoy(h.dia)) return;
    var now = new Date(), mins = now.getHours() * 60 + now.getMinutes();
    abierto = false;
    (String(h.horas).match(/(\d{1,2})[:.](\d{2})\s*[-–a]+\s*(\d{1,2})[:.](\d{2})/g) || []).forEach(function (r) {
      var m = /(\d{1,2})[:.](\d{2})\s*[-–a]+\s*(\d{1,2})[:.](\d{2})/.exec(r);
      var a = +m[1] * 60 + +m[2], b = +m[3] * 60 + +m[4]; if (b <= a) b += 1440;
      if (mins >= a && mins < b) abierto = true;
    });
  });
  var mapQ = C.mapa || [C.direccion, C.ciudad, C.provincia, C.paisNombre].filter(Boolean).join(", ");
  out.push('<section id="contacto"><div class="wrap"><div class="center"><span class="eyebrow">Visitanos</span><h2>Horarios y ubicación</h2></div><div class="visit">' +
    '<div class="box rv"><h3>Horarios' + (abierto === null ? "" : '<span class="status ' + (abierto ? "open" : "closed") + '">' + (abierto ? "Abierto ahora" : "Cerrado ahora") + "</span>") + "</h3>" +
    (hs.length ? '<ul class="hours">' + hs.map(function (h) { return '<li class="' + (esHoy(h.dia) ? "today" : "") + '"><span>' + esc(h.dia) + "</span><span>" + esc(h.horas) + "</span></li>"; }).join("") + "</ul>" : "") +
    '<ul class="contact-list">' +
    (C.direccion ? "<li>" + icon("ubicacion") + "<span>" + esc(C.direccion) + (C.ciudad ? ", " + esc(C.ciudad) : "") + "</span></li>" : "") +
    (C.whatsapp ? "<li>" + icon("telefono") + '<a href="' + wa() + '" target="_blank" rel="noopener">' + esc(C.telefono || ("+" + C.whatsapp)) + "</a></li>" : "") +
    (C.email ? "<li>" + icon("mail") + '<a href="mailto:' + esc(C.email) + '">' + esc(C.email) + "</a></li>" : "") +
    (C.instagram ? "<li>" + icon("instagram") + '<a href="https://instagram.com/' + esc(C.instagram.replace("@", "")) + '" target="_blank" rel="noopener">@' + esc(C.instagram.replace("@", "")) + "</a></li>" : "") +
    "</ul></div>" +
    (mapQ ? '<div class="map rv"><iframe title="Mapa de ' + esc(N.nombre) + '" src="https://maps.google.com/maps?q=' + encodeURIComponent(mapQ) + '&z=16&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>' : "") +
    "</div></div></section>");

  // FAQ
  if (has(D.faq)) {
    out.push('<section id="faq" class="alt"><div class="wrap"><div class="center"><span class="eyebrow">Preguntas frecuentes</span><h2>¿Tenés dudas?</h2></div><div class="faq">' +
      D.faq.map(function (f) { return "<details><summary>" + esc(f.pregunta) + "</summary><p>" + esc(f.respuesta) + "</p></details>"; }).join("") + "</div></div></section>");
  }

  // CTA final
  var CF = D.ctaFinal || {};
  out.push('<section><div class="wrap"><div class="cta rv"><h2>' + esc(CF.titulo || "¿Hablamos?") + '</h2><p class="lead">' + esc(CF.texto || "Escribinos por WhatsApp y te respondemos a la brevedad.") + "</p>" + waBtn(CF.boton || "Escribinos por WhatsApp", "btn-wa") + "</div></div></section></main>");

  // Footer
  out.push('<footer><div class="wrap"><div class="foot"><div><h3>' + esc(N.nombre) + "</h3><p>" + esc(N.slogan || "") + '</p><div class="social">' +
    (C.instagram ? '<a href="https://instagram.com/' + esc(C.instagram.replace("@", "")) + '" target="_blank" rel="noopener" aria-label="Instagram">' + icon("instagram") + "</a>" : "") +
    (C.facebook ? '<a href="' + esc(C.facebook) + '" target="_blank" rel="noopener" aria-label="Facebook">' + icon("facebook") + "</a>" : "") +
    '<a href="' + wa() + '" target="_blank" rel="noopener" aria-label="WhatsApp">' + WA + "</a></div></div>" +
    "<div><h3>Contacto</h3><ul>" + (C.direccion ? "<li>" + esc(C.direccion) + "</li>" : "") + (C.ciudad ? "<li>" + esc(C.ciudad) + "</li>" : "") + (C.telefono ? "<li>" + esc(C.telefono) + "</li>" : "") + (C.email ? '<li><a href="mailto:' + esc(C.email) + '">' + esc(C.email) + "</a></li>" : "") + "</ul></div>" +
    "<div><h3>Secciones</h3><ul>" + links.map(function (l) { return '<li><a href="' + l[0] + '">' + esc(l[1]) + "</a></li>"; }).join("") + "</ul></div></div>" +
    '<div class="copy"><span>© ' + new Date().getFullYear() + " " + esc(N.nombre) + ". Todos los derechos reservados.</span>" + (D.credito ? "<span>" + esc(D.credito) + "</span>" : "") + "</div></div></footer>");

  out.push('<a class="wa-float" href="' + wa() + '" target="_blank" rel="noopener" aria-label="Escribir por WhatsApp">' + WA + "</a>");
  app.innerHTML = out.join("");

  /* ---------- Interacciones ---------- */
  // Imágenes rotas: no mostrar el ícono roto
  Array.prototype.forEach.call(document.images, function (img) { img.addEventListener("error", function () { img.classList.add("broken"); }); });

  // Lightbox galería
  var lb = document.getElementById("lb");
  if (lb && lb.showModal) {
    var lbImg = lb.querySelector("img");
    document.querySelectorAll(".gal button").forEach(function (b) { b.addEventListener("click", function () { lbImg.src = b.dataset.full; lb.showModal(); }); });
    lb.addEventListener("click", function () { lb.close(); });
  }

  // Animación de entrada
  var els = document.querySelectorAll(".rv");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: 0.1 });
    els.forEach(function (el) { io.observe(el); });
  } else els.forEach(function (el) { el.classList.add("in"); });
})();
