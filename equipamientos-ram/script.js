(() => {
  const WA = 'https://wa.me/5493876157183?text=';

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

  // Catálogo: nombres tal como figuran en su web actual
  const LINES = {
    hammer:   { name: 'Importado Hammer', origin: 'Importado', items: ['Curl de bíceps','Curl de cuádriceps','Femorales','Prensa 45º','3D Smith','Power Rack','Prensa para tríceps','Remo T','Prensa para trapecio y remo','Prensa de hombro','Pecho plano bajo','Patada de burro','Dorsalera','Prensa de pecho convergente','Prensa de pecho plano','Hack','Remo bajo'] },
    gold:     { name: 'Importado Gold', origin: 'Importado', items: ['Sillón de cuádriceps','Sillón de cuádriceps y femorales','Prensa de hombros','Prensa horizontal','Silla romana bíceps','Porta mancuernas','Remo bajo','Rack sentadillas','Peck deck','Máquina de glúteos','Polea doble enfrentada','Pantorrillera','Polea alta','Pino porta discos','Multicadera'] },
    silver:   { name: 'Importado Silver', origin: 'Importado', items: ['Super squat','Soporte multiuso','Soporte para mancuernas','Sillón de cuádriceps','Soporte abdominales bajos y fondo de tríceps','Rotatorio de tronco','Rack sentadilla','Sillón de cuádriceps y femorales','Prensa 45º','Remo T','Silla para gemelos','Prensa horizontal','Prensa de hombros','Porta mancuernas','Porta barras'] },
    platinum: { name: 'Importado Platinum', origin: 'Importado', items: ['Sillón femoral','Tracción abdominal','Torso rotativo','Sillón de cuádriceps','Máquina de remo y trapecio','Máquina para deltoides (vuelo lateral)','Prensa de hombros','Mariposa','Prensa de piernas','Prensa de tríceps','Prensa de pecho','Máquina de gemelos','Máquina de glúteos','Curl de bíceps','Extensión trasera','Máquina abductores','Máquina aductores','Camilla femoral'] },
    curve:    { name: 'Línea Nacional Curve', origin: 'Nacional', items: ['Camilla femoral','Polea semi enfrentada','Polea doble enfrentada con regulación','Mancuernero','Jaula para sentadillas','Fondo para tríceps y abdominales bajos'] },
    omega:    { name: 'Línea Nacional Omega', origin: 'Nacional', items: [] },
    aerobica: { name: 'Línea Aeróbica', origin: 'Cardio', items: ['Cinta de correr profesional','Escalera eléctrica','Elíptico','Remo de agua','Remo contra viento','Bicicleta horizontal','Bicicleta de spinning','Bicicleta hogar'] },
    funcional:{ name: 'Funcional, discos y mancuernas', origin: 'Funcional', items: ['Disco bumper','Discos bumper calibrados','Discos engomados olímpicos','Mancuerna hexagonal engomada','Mancuernas rubber','Synergy 360 A','Synergy 360 B','Synergy 360 C','Synergy 360 D','Jaula de potencia'] },
    rehab:    { name: 'Línea Rehabilitación', origin: 'Clínicas', items: ['Escalera con rampa','Escalera sueca','Sillón de cuádriceps','Cinta de correr con arnés y doble motor','Paralela doble regulación'] }
  };
  const SHORT = { hammer:'Hammer', gold:'Gold', silver:'Silver', platinum:'Platinum', curve:'Curve', omega:'Omega', aerobica:'Aeróbica', funcional:'Funcional', rehab:'Rehabilitación' };

  const all = [];
  Object.entries(LINES).forEach(([key, l]) => l.items.forEach(n => all.push({ key, line: l.name, origin: l.origin, name: n })));

  const chipsEl = document.getElementById('chips');
  const grid = document.getElementById('products');
  const count = document.getElementById('count');
  const q = document.getElementById('q');
  const omega = document.getElementById('omega-note');
  let current = 'all';
  let expanded = false;

  const mkChip = (key, label) => {
    const b = document.createElement('button');
    b.className = 'chip'; b.type = 'button'; b.dataset.key = key; b.textContent = label;
    b.setAttribute('aria-pressed', key === current ? 'true' : 'false');
    b.addEventListener('click', () => setLine(key));
    chipsEl.appendChild(b);
  };
  mkChip('all', 'Todas');
  Object.keys(SHORT).forEach(k => mkChip(k, SHORT[k]));

  const icon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  function render() {
    const term = norm(q.value.trim());
    const list = all.filter(p => (current === 'all' || p.key === current) && (!term || norm(p.name + ' ' + p.line).includes(term)));
    grid.innerHTML = '';
    const frag = document.createDocumentFragment();
    const limit = (current === 'all' && !term && !expanded) ? 12 : Infinity;
    list.slice(0, limit).forEach(p => {
      const msg = encodeURIComponent(`Hola, quiero cotizar: ${p.name} (${p.line})`);
      const el = document.createElement('article');
      el.className = 'product';
      el.innerHTML = `<span class="p-line">${SHORT[p.key]}</span><span class="p-origin">${p.origin}</span><h3>${p.name}</h3><a class="p-cta" href="${WA}${msg}" target="_blank" rel="noopener">Pedir cotización ${icon}</a>`;
      frag.appendChild(el);
    });
    if (list.length > limit) {
      const more = document.createElement('button');
      more.type = 'button'; more.className = 'show-more';
      more.textContent = `Ver los ${list.length} equipos`;
      more.addEventListener('click', () => { expanded = true; render(); });
      frag.appendChild(more);
    }
    grid.appendChild(frag);
    const isOmega = current === 'omega' && !term;
    omega.hidden = !isOmega;
    grid.hidden = isOmega;
    if (!list.length && !isOmega) grid.innerHTML = '<p class="empty">No encontramos ese equipo en el catálogo. Escribinos por WhatsApp y te decimos si lo tenemos.</p>', grid.hidden = false;
    count.textContent = isOmega ? 'Línea Omega: modelos a consultar' : `${list.length} equipo${list.length === 1 ? '' : 's'}${current === 'all' ? ' en 8 líneas' : ' en ' + LINES[current].name}`;
  }
  function setLine(key) {
    current = key;
    chipsEl.querySelectorAll('.chip').forEach(c => c.setAttribute('aria-pressed', c.dataset.key === key ? 'true' : 'false'));
    render();
  }
  q.addEventListener('input', render);
  document.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => {
    q.value = '';
    setLine(b.dataset.go);
    document.getElementById('catalogo').scrollIntoView();
  }));
  render();

  // Abierto ahora (hora de Argentina)
  const openEl = document.getElementById('open');
  try {
    const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Argentina/Salta', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
    const get = t => parts.find(p => p.type === t).value;
    const day = get('weekday'); const h = (+get('hour') % 24) + (+get('minute')) / 60;
    let open = false;
    if (['Mon','Tue','Wed','Thu','Fri'].includes(day)) open = h >= 9 && h < 20;
    else if (day === 'Sat') open = h >= 10 && h < 13;
    openEl.textContent = open ? 'Abierto ahora' : 'Cerrado ahora';
    openEl.classList.toggle('closed', !open);
    openEl.hidden = false;
  } catch (e) {}

  // Aparición al hacer scroll
  const els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: .12 });
    els.forEach(el => io.observe(el));
  } else els.forEach(el => el.classList.add('in'));
})();
