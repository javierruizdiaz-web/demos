// Sombra de la barra al hacer scroll
const bar = document.querySelector('.bar');
const onScroll = () => bar.classList.toggle('is-scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Aparición suave
const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const sibs = [...e.target.parentElement.children].filter((el) => el.classList.contains('reveal'));
      e.target.style.transitionDelay = Math.min(sibs.indexOf(e.target), 5) * 80 + 'ms';
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add('is-in'));
}

// Flechas de la línea de tiempo
const track = document.querySelector('.track');
document.querySelectorAll('.navbtn').forEach((b) => {
  b.addEventListener('click', () => {
    const step = track.querySelector('.step');
    const w = step ? step.getBoundingClientRect().width + 16 : 320;
    track.scrollBy({ left: w * Number(b.dataset.dir), behavior: 'smooth' });
  });
});
