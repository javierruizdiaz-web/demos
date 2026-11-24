/* MyM Muebles Modernos — menú, búsqueda + filtro, "mi consulta" y cotización por WhatsApp */
(function () {
  var d = document;
  d.documentElement.classList.remove("no-js");
  var WA = "5493416609132";
  var wa = function (txt) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(txt); };

  // Menú mobile
  var tg = d.querySelector(".nav__toggle"), menu = d.getElementById("menu");
  tg.addEventListener("click", function () {
    var o = menu.classList.toggle("is-open");
    tg.setAttribute("aria-expanded", o ? "true" : "false");
  });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) { menu.classList.remove("is-open"); tg.setAttribute("aria-expanded", "false"); } });

  // Cotizar un producto
  d.querySelectorAll(".js-wa").forEach(function (a) {
    a.href = wa("Hola, quiero cotizar: " + a.dataset.p);
    a.target = "_blank"; a.rel = "noopener";
  });

  // Búsqueda + filtro
  var cat = "todos", q = d.getElementById("q"), prods = d.querySelectorAll(".prod"), empty = d.getElementById("empty");
  var norm = function (s) { return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); };
  function apply() {
    var term = norm(q.value.trim()), n = 0;
    prods.forEach(function (p) {
      var txt = norm(p.dataset.k + " " + p.querySelector("h3").textContent);
      var ok = (cat === "todos" || p.dataset.cat === cat) && (!term || txt.indexOf(term) > -1);
      p.hidden = !ok; if (ok) n++;
    });
    empty.hidden = n > 0;
  }
  d.querySelectorAll(".chip").forEach(function (c) {
    c.addEventListener("click", function () {
      cat = c.dataset.f;
      d.querySelectorAll(".chip").forEach(function (x) { var on = x === c; x.classList.toggle("is-on", on); x.setAttribute("aria-pressed", on ? "true" : "false"); });
      apply();
    });
  });
  q.addEventListener("input", apply);

  // Mi consulta (lista de productos para cotizar juntos)
  var list = [], listbtn = d.getElementById("listbtn"), count = d.getElementById("count");
  var drawer = d.getElementById("drawer"), scrim = d.getElementById("scrim"), dlist = d.getElementById("dlist");
  var dempty = d.getElementById("dempty"), dsend = d.getElementById("dsend"), dcity = d.getElementById("dcity");
  var toast = d.getElementById("toast"), tt;
  function say(m) { toast.textContent = m; toast.classList.add("is-on"); clearTimeout(tt); tt = setTimeout(function () { toast.classList.remove("is-on"); }, 2200); }
  function render() {
    count.textContent = list.length;
    dlist.innerHTML = "";
    list.forEach(function (p) {
      var li = d.createElement("li"), s = d.createElement("span"), b = d.createElement("button");
      s.textContent = p; b.textContent = "Quitar"; b.type = "button";
      b.addEventListener("click", function () { toggle(p); });
      li.appendChild(s); li.appendChild(b); dlist.appendChild(li);
    });
    dempty.hidden = list.length > 0;
    d.querySelectorAll(".js-add").forEach(function (b) {
      var on = list.indexOf(b.dataset.p) > -1;
      b.classList.toggle("is-on", on); b.textContent = on ? "✓" : "+";
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    var txt = "Hola, quiero cotizar:\n" + list.map(function (p) { return "• " + p; }).join("\n");
    if (dcity.value.trim()) txt += "\nEnvío a: " + dcity.value.trim();
    dsend.href = wa(txt);
    dsend.setAttribute("aria-disabled", list.length ? "false" : "true");
  }
  function toggle(p) {
    var i = list.indexOf(p);
    if (i > -1) { list.splice(i, 1); say("Quitaste: " + p); }
    else { list.push(p); say("Sumado a tu consulta: " + p); listbtn.classList.add("bump"); setTimeout(function () { listbtn.classList.remove("bump"); }, 300); }
    render();
  }
  d.querySelectorAll(".js-add").forEach(function (b) { b.addEventListener("click", function () { toggle(b.dataset.p); }); });
  dcity.addEventListener("input", render);

  function openD() { drawer.classList.add("is-open"); drawer.setAttribute("aria-hidden", "false"); scrim.hidden = false; listbtn.setAttribute("aria-expanded", "true"); d.body.classList.add("lock"); d.getElementById("drawerx").focus(); }
  function closeD() { drawer.classList.remove("is-open"); drawer.setAttribute("aria-hidden", "true"); scrim.hidden = true; listbtn.setAttribute("aria-expanded", "false"); d.body.classList.remove("lock"); listbtn.focus(); }
  listbtn.addEventListener("click", openD);
  d.getElementById("drawerx").addEventListener("click", closeD);
  scrim.addEventListener("click", closeD);
  d.addEventListener("keydown", function (e) { if (e.key === "Escape" && drawer.classList.contains("is-open")) closeD(); });

  render();
})();
