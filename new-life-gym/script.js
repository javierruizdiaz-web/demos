(function () {
  // Menú mobile
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');
  function setMenu(open) {
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    if (open) menu.style.setProperty('--menu-top', document.querySelector('.nav').getBoundingClientRect().bottom + 'px');
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', function () { setMenu(burger.getAttribute('aria-expanded') !== 'true'); });
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  window.matchMedia('(min-width: 900px)').addEventListener('change', function () { setMenu(false); });

  // Hora de Resistencia (UTC-3)
  function nowAR() {
    var p = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Argentina/Buenos_Aires', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
    var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
    var days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return { d: days[o.weekday], m: (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10) };
  }
  var t = nowAR();
  var hours = { 1: [300, 1320], 2: [300, 1320], 3: [300, 1320], 4: [300, 1320], 5: [300, 1320], 6: [420, 840] };
  var h = hours[t.d];
  var open = h && t.m >= h[0] && t.m < h[1];
  var status = document.getElementById('status');
  if (status) {
    status.textContent = open ? 'Abierto ahora · Don Bosco 359' : 'Cerrado ahora · Don Bosco 359';
    status.classList.toggle('is-open', !!open);
  }
  document.querySelectorAll('.day[data-day="' + t.d + '"]').forEach(function (el) { el.classList.add('is-today'); });
  document.querySelectorAll('.hours__list li').forEach(function (li) {
    if (li.dataset.days.split(',').indexOf(String(t.d)) > -1) li.classList.add('is-today');
  });

  var y = document.getElementById('y'); if (y) y.textContent = new Date().getFullYear();

  // Reveal suave
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var els = document.querySelectorAll('.years__copy, .years__img, .act, .day, .rev, .hours__list li, .final__in, .loc__map');
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { el.classList.add('rv'); io.observe(el); });
  }
})();
