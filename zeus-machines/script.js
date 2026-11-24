(function () {
  var WA = '5493476587600';

  // Menú mobile
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');
  var hdr = document.getElementById('hdr');
  function setMenu(open) {
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    if (open) menu.style.setProperty('--menu-top', hdr.getBoundingClientRect().bottom + 'px');
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', function () { setMenu(burger.getAttribute('aria-expanded') !== 'true'); });
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  window.matchMedia('(min-width: 861px)').addEventListener('change', function () { setMenu(false); });

  // Filtro por categoría
  var chips = document.querySelectorAll('.chip');
  var cards = document.querySelectorAll('#grid .pcard');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.dataset.filter;
      chips.forEach(function (c) { var on = c === chip; c.classList.toggle('is-on', on); c.setAttribute('aria-pressed', on ? 'true' : 'false'); });
      cards.forEach(function (card) { card.hidden = !(f === 'all' || card.dataset.cat === f); });
    });
  });

  // Pedir cotización por WhatsApp con el producto nombrado
  document.querySelectorAll('.btn-quote').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = 'Hola, quiero cotizar: ' + btn.dataset.product;
      window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
    });
  });

  // Aparición al hacer scroll
  var els = document.querySelectorAll('.pcard, .q-head, .q-grid li, .origin-fig, .origin-copy, .steps-list li, .contact-copy, .map');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { el.classList.add('rv'); io.observe(el); });
  }
})();
