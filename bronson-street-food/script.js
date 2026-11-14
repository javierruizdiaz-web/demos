(function () {
  // Menú mobile
  var btn = document.getElementById('burgerBtn');
  var nav = document.getElementById('nav');
  function setNav(open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    if (open) nav.style.setProperty('--nav-top', document.querySelector('.top').getBoundingClientRect().bottom + 'px');
    nav.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  btn.addEventListener('click', function () { setNav(btn.getAttribute('aria-expanded') !== 'true'); });
  nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setNav(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setNav(false); });
  window.matchMedia('(min-width: 960px)').addEventListener('change', function () { setNav(false); });

  // ¿Abierto ahora? Todos los días 19:30 a 00:30 (cruza la medianoche), hora de Resistencia.
  function minutesAR() {
    var p = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Argentina/Buenos_Aires', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
    var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
    return (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10);
  }
  var OPEN = 19 * 60 + 30, CLOSE = 30; // 00:30 del día siguiente
  function isOpen(m) { return m >= OPEN || m < CLOSE; }
  function update() {
    var open = isOpen(minutesAR());
    var live = document.getElementById('live');
    var ns = document.getElementById('neonStatus');
    if (live) { live.textContent = open ? 'Abierto · hasta 00:30' : 'Abrimos 19:30'; live.classList.toggle('is-open', open); }
    if (ns) { ns.textContent = open ? 'Abierto ahora · cocina en marcha' : 'Cerrado ahora · abrimos a las 19:30'; ns.classList.toggle('is-closed', !open); }
  }
  update();
  setInterval(update, 60000);

  var y = document.getElementById('y'); if (y) y.textContent = new Date().getFullYear();
})();
