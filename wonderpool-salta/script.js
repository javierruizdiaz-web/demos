(() => {
  const WA = 'https://wa.me/5493874671884?text=';

  // Menú mobile
  const btn = document.querySelector('.menu-btn');
  const nav = document.getElementById('nav');
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('open', !open);
  });
  nav.addEventListener('click', e => {
    if (e.target.closest('a')) { btn.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); }
  });

  // Filtro del catálogo
  const pills = document.querySelectorAll('.pill');
  const cards = document.querySelectorAll('.card');
  pills.forEach(p => p.addEventListener('click', () => {
    const f = p.dataset.f;
    pills.forEach(x => x.setAttribute('aria-pressed', x === p ? 'true' : 'false'));
    cards.forEach(c => { c.hidden = !(f === 'all' || c.dataset.cat === f); });
  }));

  // Cuenta regresiva al verano (21 de diciembre)
  const cd = document.getElementById('countdown');
  const season = document.getElementById('season');
  const now = new Date();
  const y = now.getFullYear();
  const start = new Date(y, 11, 21);
  const end = new Date(y, 2, 20);
  const day = 864e5;
  if (now < start && now > end) {
    const days = Math.ceil((start - now) / day);
    cd.innerHTML = `<b>${days}</b><span>días para que arranque el verano.<br>Con 5 días de instalación, llegás.</span>`;
    cd.hidden = false;
  } else {
    season.lastChild.textContent = ' Es verano: tu pileta en 5 días';
  }

  // Cotizador: arma el mensaje y abre WhatsApp
  const form = document.getElementById('qform');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const que = document.getElementById('f-que').value;
    const largo = document.getElementById('f-largo').value;
    const ancho = document.getElementById('f-ancho').value;
    const zona = document.getElementById('f-zona').value;
    let msg = `Hola Wonderpool, quiero cotizar: ${que}.`;
    if (largo && ancho) msg += ` Tengo un espacio de ${largo} x ${ancho} m.`;
    msg += ` Es en ${zona}.`;
    window.open(WA + encodeURIComponent(msg), '_blank', 'noopener');
  });

  // Aparición al hacer scroll
  const els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: .12 });
    els.forEach(el => io.observe(el));
  } else els.forEach(el => el.classList.add('in'));
})();
