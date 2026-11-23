/* Estudio Díaz Abogados: menú mobile, aparición al hacer scroll y header */
(function(){
  var d=document;
  var btn=d.querySelector('.menu-btn'),nav=d.getElementById('menu');
  function setMenu(open){btn.setAttribute('aria-expanded',String(open));btn.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');nav.classList.toggle('open',open);}
  if(btn&&nav){
    btn.addEventListener('click',function(){setMenu(btn.getAttribute('aria-expanded')!=='true');});
    nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setMenu(false);});});
    d.addEventListener('keydown',function(e){if(e.key==='Escape'&&nav.classList.contains('open')){setMenu(false);btn.focus();}});
  }
  var els=d.querySelectorAll('.rv');
  if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(el){io.observe(el);});
  } else { els.forEach(function(el){el.classList.add('in');}); }
  var hd=d.querySelector('.site-header');
  if(hd){var f=function(){hd.classList.toggle('scrolled',window.scrollY>10);};f();window.addEventListener('scroll',f,{passive:true});}
  var y=d.getElementById('year'); if(y) y.textContent=new Date().getFullYear();
})();
