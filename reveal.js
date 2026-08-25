/* New Car — reveal on scroll */
(function(){
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var targets = document.querySelectorAll('.section, .principles, .photo-break, .contact, footer');
  if (!('IntersectionObserver' in window)) { targets.forEach(function(el){el.classList.add('in');}); return; }
  targets.forEach(function(el){ el.classList.add('reveal'); });
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
    });
  }, {threshold: 0.12, rootMargin: '0px 0px -40px 0px'});
  targets.forEach(function(el){ io.observe(el); });
})();/* Map click-to-load */
(function(){
  var btn=document.querySelector('.map-load');
  if(!btn) return;
  btn.addEventListener('click',function(){
    var f=document.createElement('iframe');
    f.src=btn.getAttribute('data-map-src');
    f.title='Localização da New Car no Google Maps';
    f.loading='lazy';
    f.referrerPolicy='no-referrer-when-downgrade';
    btn.replaceWith(f);
  });
})();

/* Auto play/pause video on scroll (com som; fallback mutado se o navegador bloquear) */
(function(){
  var v=document.querySelector('.auto-video');
  if(!v || window.matchMedia('(prefers-reduced-motion: reduce)').matches){ if(v) v.controls=true; return; }
  var playing=false;
  function start(){
    v.removeAttribute('muted');
    var p=v.play();
    if(p!==undefined){ p.catch(function(){ v.setAttribute('muted',''); v.play(); }); }
  }
  function stop(){ v.pause(); }
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          if(!playing){ playing=true; start(); }
        } else if(playing){
          playing=false; stop();
        }
      });
    },{threshold:0.2,rootMargin:'0px 0px -8% 0px'});
    io.observe(v);
  } else { v.controls=true; }
})();
