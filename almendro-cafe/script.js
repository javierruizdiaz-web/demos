/* Almendro: menú mobile, aparición al hacer scroll, header y "abierto ahora" (hora de Argentina) */
(function(){
  var d=document;
  var btn=d.querySelector('.menu-btn'),nav=d.getElementById('menu');
  function setMenu(open){btn.setAttribute('aria-expanded',String(open));btn.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');btn.querySelector('span').textContent=open?'Cerrar':'Menú';nav.classList.toggle('open',open);}
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

  /* Horario: lunes a sábados 8 a 12; todos los días 17 a 21 */
  try{
    var parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/Argentina/Buenos_Aires',weekday:'short',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date());
    var get=function(t){for(var i=0;i<parts.length;i++){if(parts[i].type===t)return parts[i].value;}return '';};
    var day=get('weekday'),h=parseInt(get('hour'),10)%24,m=parseInt(get('minute'),10),t=h*60+m;
    var morning=day!=='Sun'&&t>=480&&t<720, evening=t>=1020&&t<1260;
    var st=d.querySelector('[data-status]'),txt=st&&st.querySelector('.status-txt');
    if(st&&txt){
      if(morning||evening){st.classList.add('open');txt.textContent=morning?'Abierto ahora · hasta las 12 hs':'Abierto ahora · hasta las 21 hs';}
      else{txt.textContent=(t<480&&day!=='Sun')?'Cerrado · abre a las 8 hs':(t<1020?'Cerrado · abre a las 17 hs':'Cerrado · abre mañana');}
    }
    var tm=d.querySelector('[data-turno="manana"]'),tt=d.querySelector('[data-turno="tarde"]');
    if(morning&&tm)tm.classList.add('is-now');
    if(evening&&tt)tt.classList.add('is-now');
  }catch(e){}
})();
