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
})();

/* Map click-to-load */
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

/* Load and play the intro video only when it approaches the viewport. */
(function(){
  var v=document.querySelector('.auto-video');
  if(!v) return;
  var loaded=false;
  var loading=null;

  function loadVideo(){
    if(loaded) return Promise.resolve();
    if(loading) return loading;
    var src=v.getAttribute('data-src');
    if(!src) return Promise.resolve();
    var source=document.createElement('source');
    source.src=src;
    source.type='video/mp4';
    v.appendChild(source);
    v.preload='metadata';
    v.load();
    loading=new Promise(function(resolve){
      function finish(){ loaded=true; resolve(); }
      if(v.readyState>=2) finish();
      else {
        v.addEventListener('loadeddata',finish,{once:true});
        v.addEventListener('error',finish,{once:true});
      }
    });
    return loading;
  }

  function start(){
    loadVideo().then(function(){
      v.removeAttribute('muted');
      var p=v.play();
      if(p!==undefined){
        p.catch(function(){
          v.setAttribute('muted','');
          v.play().catch(function(){});
        });
      }
    });
  }

  function stop(){
    if(!v.paused) v.pause();
  }

  /* A tap/click on the poster is also a valid lazy-load trigger. */
  v.addEventListener('pointerdown',loadVideo,{once:true});

  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    v.controls=true;
    return;
  }

  var playing=false;
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
  } else {
    v.controls=true;
  }
})();
