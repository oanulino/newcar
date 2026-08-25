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

/* Analytics dataLayer events — no personal data */
(function(){
  var dl=window.dataLayer=window.dataLayer||[];
  var pushed={};
  function push(event,params){
    var item=params||{};
    item.event=event;
    dl.push(item);
  }
  function ctaLocation(link){
    if(link.classList.contains('header-link')) return 'header';
    if(link.classList.contains('wa-float')) return 'floating';
    if(link.closest('.hero')) return 'hero';
    if(link.closest('.contact')) return 'contact';
    if(link.closest('footer')) return 'footer';
    return 'other';
  }
  function safeParam(value,max){
    return String(value||'').replace(/[^a-zA-Z0-9._-]/g,'_').slice(0,max||200);
  }

  document.addEventListener('click',function(e){
    var link=e.target.closest && e.target.closest('a');
    if(link){
      var href=link.getAttribute('href')||'';
      if(/(^|:)\/\/wa\.me\//i.test(href)){
        push('whatsapp_click',{
          cta_location:ctaLocation(link),
          destination_domain:'wa.me'
        });
      }
      if(link.hasAttribute('data-service')){
        push('service_interest',{
          service_name:link.getAttribute('data-service'),
          service_position:link.querySelector('span') ? text(link.querySelector('span')) : undefined
        });
      }
      if(/^https:\/\//i.test(href) && !/(^|:)\/\/wa\.me\//i.test(href) && !/google\.com\/maps/i.test(href)){
        try{
          var url=new URL(href,location.href);
          if(url.origin!==location.origin){
            push('outbound_click',{destination_domain:safeParam(url.hostname,253)});
          }
        }catch(_){ }
      }
    }
    var map=e.target.closest && e.target.closest('.map-load');
    if(map && !pushed.map_click){
      pushed.map_click=true;
      push('map_click',{map_id:'mapa_newcar',location_area:'uberlandia'});
    }
  });

  document.querySelectorAll('.faq details').forEach(function(detail,index){
    detail.addEventListener('toggle',function(){
      if(detail.open) push('faq_open',{faq_id:detail.getAttribute('data-faq')||String(index+1)});
    });
  });

  var video=document.querySelector('.auto-video');
  if(video){
    var progress={25:false,50:false,75:false};
    var lastTime=0;
    video.addEventListener('play',function(){
      if(!pushed.video_start){ pushed.video_start=true; push('video_start',{video_id:'newcar_office'}); }
    });
    video.addEventListener('timeupdate',function(){
      if(!video.duration || !isFinite(video.duration) || video.paused) return;
      var current=video.currentTime;
      var jumped=current-lastTime>1.5;
      lastTime=current;
      if(jumped) return;
      var pct=Math.floor(current/video.duration*100);
      [25,50,75].forEach(function(mark){
        if(pct>=mark && !progress[mark]){ progress[mark]=true; push('video_progress',{video_id:'newcar_office',video_percent:mark}); }
      });
    });
  }

  var scrollMarks={50:false,90:false};
  var maxScrollPercent=0;
  function checkScroll(){
    var doc=document.documentElement;
    var max=doc.scrollHeight-window.innerHeight;
    if(max<=0) return;
    var pct=Math.round(window.scrollY/max*100);
    maxScrollPercent=Math.max(maxScrollPercent,pct);
    [50,90].forEach(function(mark){
      if(maxScrollPercent>=mark && !scrollMarks[mark]){ scrollMarks[mark]=true; push('scroll_depth',{percent_scrolled:mark}); }
    });
  }
  window.addEventListener('scroll',checkScroll,{passive:true});
  window.addEventListener('resize',checkScroll);
  window.addEventListener('load',checkScroll);

  try{
    var params=new URLSearchParams(location.search), campaign={};
    ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','fbclid'].forEach(function(key){
      var value=params.get(key);
      if(value) campaign[key]=safeParam(value,200);
    });
    if(Object.keys(campaign).length) push('campaign_attribution',campaign);
  }catch(_){ }
})();
