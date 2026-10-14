(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  root.dataset.mediaMotion = reduce ? 'reduced' : 'full';

  const reveal = () => {
    const items = document.querySelectorAll('.media-reveal, .evidence-item, .media-step');
    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
  };

  const tilt = () => {
    if (reduce || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    document.querySelectorAll('[data-media-tilt]').forEach((card) => {
      let frame = 0;
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          card.style.setProperty('--media-rx', `${(-y * 5).toFixed(2)}deg`);
          card.style.setProperty('--media-ry', `${(x * 7).toFixed(2)}deg`);
          card.style.setProperty('--media-glare-x', `${((x + .5) * 100).toFixed(1)}%`);
          card.style.setProperty('--media-glare-y', `${((y + .5) * 100).toFixed(1)}%`);
          card.classList.add('is-tilting');
        });
      });
      card.addEventListener('pointerleave', () => {
        cancelAnimationFrame(frame);
        card.classList.remove('is-tilting');
        card.style.setProperty('--media-rx', '0deg');
        card.style.setProperty('--media-ry', '0deg');
      });
    });
  };

  const modal = () => {
    const trigger = document.querySelector('[data-media-video]');
    if (!trigger) return;
    const dialog = document.createElement('div');
    dialog.className = 'media-modal';
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-label', 'BioCredit walkthrough');
    dialog.innerHTML = `<div class="media-modal__panel"><button class="media-modal__close" type="button" aria-label="Close walkthrough">×</button><p class="section-tag">BIOCREDIT / WALKTHROUGH</p><h3>Watch the 60-second BioCredit walkthrough</h3><p>This player is ready for the final narrated explainer. The visual rail below shows the product story now: identity becomes a consented signal, eligibility becomes a transparent score, and repayment becomes portable reputation.</p><div class="media-stage" style="min-height:220px"><div class="media-stage__grid"></div><div class="media-stage__orb" aria-hidden="true"></div><div class="media-stage__label">Transcript-first player / no audio loaded</div><div class="media-stage__readout">IDENTITY → REPAYMENT<br>CONSENT / AUDIT / OWNERSHIP</div></div></div>`;
    document.body.appendChild(dialog);
    const close = () => { dialog.classList.remove('is-open'); trigger.focus(); };
    trigger.addEventListener('click', (event) => { event.preventDefault(); dialog.classList.add('is-open'); dialog.querySelector('.media-modal__close').focus(); });
    dialog.querySelector('.media-modal__close').addEventListener('click', close);
    dialog.addEventListener('click', (event) => { if (event.target === dialog) close(); });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && dialog.classList.contains('is-open')) close(); });
  };

  const featureVisuals = () => {
    const cards = [...document.querySelectorAll('.projects-grid .project-card')].slice(0, 3);
    const labels = ['ECG IDENTITY / PRIVATE SIGNAL', 'PAYMENTS RAIL / RECONCILIATION', 'CREATIVE IP / WORLD BUILDING'];
    const images = ['assets/wakanda-biometric.png', 'assets/wakanda-ai.png', 'assets/wakanda-wozzo.png'];
    cards.forEach((card, index) => {
      if (card.querySelector('.feature-visual')) return;
      const visual = document.createElement('div');
      visual.className = 'feature-visual media-reveal';
      visual.setAttribute('aria-hidden', 'true');
      visual.innerHTML = `<img class="feature-visual__image" src="${images[index]}" alt="" loading="lazy"><div class="feature-visual__veil"></div><div class="feature-visual__ring"></div><div class="feature-visual__bars">${Array.from({ length: 13 }, (_, i) => `<i style="--h:${28 + ((i * 17 + index * 13) % 65)}%"></i>`).join('')}</div><span class="media-stage__label">${labels[index]}</span>`;
      card.prepend(visual);
      card.dataset.mediaTilt = 'true';
    });
  };

  const particleField = () => {
    const richMotion = window.matchMedia('(min-width: 701px) and (hover: hover) and (pointer: fine)').matches;
    if (reduce || !richMotion) return;
    document.querySelectorAll('.media-stage').forEach((stage) => {
      if (stage.querySelector('.media-particles')) return;
      const canvas = document.createElement('canvas'); canvas.className = 'media-particles'; canvas.setAttribute('aria-hidden', 'true'); stage.prepend(canvas);
      const ctx = canvas.getContext('2d');
      const particles = Array.from({ length: 42 }, (_, i) => ({ x: Math.random(), y: Math.random(), z: .25 + Math.random() * .75, size: .7 + Math.random() * 2.2, phase: i * .77 }));
      let frame = 0;
      const resize = () => { const rect = stage.getBoundingClientRect(); const ratio = window.devicePixelRatio || 1; canvas.width = rect.width * ratio; canvas.height = rect.height * ratio; canvas.style.width = `${rect.width}px`; canvas.style.height = `${rect.height}px`; ctx.setTransform(ratio, 0, 0, ratio, 0, 0); };
      const paint = (time) => { const rect = stage.getBoundingClientRect(); ctx.clearRect(0, 0, rect.width, rect.height); particles.forEach((p) => { const drift = Math.sin(time * .00035 + p.phase) * 10 * p.z; const x = p.x * rect.width + drift; const y = ((p.y * rect.height + time * .012 * p.z) % (rect.height + 24)) - 12; ctx.fillStyle = `rgba(233,185,93,${.18 + p.z * .5})`; ctx.beginPath(); ctx.arc(x, y, p.size * p.z, 0, Math.PI * 2); ctx.fill(); }); frame = requestAnimationFrame(paint); };
      resize(); window.addEventListener('resize', resize, { passive: true }); frame = requestAnimationFrame(paint);
      document.addEventListener('visibilitychange', () => { if (document.hidden) cancelAnimationFrame(frame); else frame = requestAnimationFrame(paint); }, { passive: true });
    });
  };

  const ambientWorld = () => {
    const targets = [...document.querySelectorAll('#bridge, #engine, #stack, #biocredit-case, #track, #cockpit, #garage, #blueprint, #credentials, #connect, .quote-band')];
    if (!targets.length) return;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const count = fine ? 34 : 16;
    targets.forEach((section, sectionIndex) => {
      if (section.querySelector('.ambient-particles')) return;
      section.classList.add('has-ambient-world');
      const canvas = document.createElement('canvas');
      canvas.className = 'ambient-particles'; canvas.setAttribute('aria-hidden', 'true');
      const orbit = document.createElement('div'); orbit.className = 'ambient-orbit'; orbit.setAttribute('aria-hidden', 'true');
      orbit.innerHTML = '<span></span><span></span><span></span>';
      section.prepend(canvas, orbit);
      const ctx = canvas.getContext('2d');
      const particles = Array.from({length: count}, (_, i) => ({x:Math.random(), y:Math.random(), z:.2+Math.random()*.8, r:.6+Math.random()*1.8, p:i*.71+sectionIndex}));
      let width=0,height=0,frame=0,visible=true;
      const resize=()=>{const rect=section.getBoundingClientRect(),ratio=Math.min(window.devicePixelRatio||1,2);width=rect.width;height=rect.height;canvas.width=width*ratio;canvas.height=height*ratio;canvas.style.width=`${width}px`;canvas.style.height=`${height}px`;ctx.setTransform(ratio,0,0,ratio,0,0)};
      const paint=(time)=>{if(!visible||document.hidden){frame=0;return}ctx.clearRect(0,0,width,height);particles.forEach(p=>{const x=p.x*width+Math.sin(time*.00018+p.p)*18*p.z;const y=((p.y*height+time*.009*p.z)%(height+32))-16;ctx.fillStyle=`rgba(${sectionIndex%2?'54,211,153':'245,196,96'},${.08+p.z*.26})`;ctx.beginPath();ctx.arc(x,y,p.r*p.z,0,Math.PI*2);ctx.fill()});frame=requestAnimationFrame(paint)};
      resize();
      const observer='IntersectionObserver' in window?new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible&&!reduce&&!frame)frame=requestAnimationFrame(paint)},{rootMargin:'20% 0px 20% 0px',threshold:0}):null;
      if(observer)observer.observe(section); else if(!reduce)frame=requestAnimationFrame(paint);
      window.addEventListener('resize',resize,{passive:true});
      if(fine&&!reduce){section.addEventListener('pointermove',(e)=>{const r=section.getBoundingClientRect();section.style.setProperty('--ambient-x',`${((e.clientX-r.left)/r.width-.5)*10}px`);section.style.setProperty('--ambient-y',`${((e.clientY-r.top)/r.height-.5)*8}px`)},{passive:true});section.addEventListener('pointerleave',()=>{section.style.setProperty('--ambient-x','0px');section.style.setProperty('--ambient-y','0px')},{passive:true})}
      document.addEventListener('visibilitychange',()=>{if(document.hidden&&frame)cancelAnimationFrame(frame);else if(!document.hidden&&visible&&!reduce&&!frame)frame=requestAnimationFrame(paint)},{passive:true});
    });
  };

  const railActivation = () => {
    const steps = [...document.querySelectorAll('.media-step')];
    if (!steps.length || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (!entry.isIntersecting) return; const index = steps.indexOf(entry.target); steps.forEach((step, stepIndex) => { step.classList.toggle('is-active', stepIndex === index); step.classList.toggle('is-complete', stepIndex < index); }); }), { rootMargin: '-30% 0px -55% 0px', threshold: 0 });
    steps.forEach((step) => observer.observe(step));
  };

  const evidenceLayer = () => {
    const anchor = [...document.querySelectorAll('.section-tag')].find((node) => node.textContent.includes('06 · The Cockpit'));
    if (!anchor || document.querySelector('.evidence-grid')) return;
    const grid = document.createElement('div');
    grid.className = 'evidence-grid media-reveal';
    grid.setAttribute('aria-label', 'Track record evidence');
    [['Role','Solution implementation lead'],['Organization','Riverbank Solutions / ZED Payments'],['Period','Active deployments'],['What I shipped','Admission flows, payouts, reconciliation'],['Outcome','Features translated into adoption'],['Artifact','ZED 360 implementation practice']].forEach(([key, value]) => {
      const item = document.createElement('div'); item.className = 'evidence-item'; item.innerHTML = `<strong>${key}</strong><span>${value}</span>`; grid.appendChild(item);
    });
    anchor.parentElement.appendChild(grid);
  };

  const philosophyMotion = () => {
    document.querySelectorAll('.principle h3, .principle h4, [data-principle]').forEach((node) => node.classList.add('motion-principle'));
  };

  const pauseWhenHidden = () => {
    document.addEventListener('visibilitychange', () => {
      document.documentElement.dataset.mediaPaused = document.hidden ? 'true' : 'false';
    });
  };




  const responsivePolish = () => {
    const root = document.documentElement;
    const coarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    root.dataset.pointer = coarse ? 'coarse' : 'fine';
    const setVh = () => root.style.setProperty('--app-vh', `${window.innerHeight * 0.01}px`);
    setVh();
    window.addEventListener('resize', setVh, { passive: true });
    window.addEventListener('orientationchange', () => setTimeout(setVh, 150), { passive: true });
    if (!coarse) return;
    document.querySelectorAll('[data-hover], .wakanda-gallery-card, .curated-video-card, .project-card, .stack-card, .garage-item, .cred-card, .skill-card, .cinematic-plate, .wakanda-stage').forEach((el) => {
      el.addEventListener('pointerdown', () => {
        el.classList.add('touch-active');
        window.setTimeout(() => el.classList.remove('touch-active'), 950);
      }, { passive: true });
    });
    document.querySelectorAll('video').forEach((video) => {
      video.setAttribute('playsinline', '');
      if (!video.classList.contains('media-hero__video')) video.preload = 'none';
    });
  };

  const engineStage = () => {
    const stage = document.querySelector('[data-engine-stage]');
    if (!stage) return;
    const model = stage.querySelector('model-viewer');
    const open = stage.querySelector('[data-engine-open]');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) stage.classList.add('is-active');
      }, { threshold: 0.28 });
      observer.observe(stage);
    } else stage.classList.add('is-active');
    open?.addEventListener('click', () => {
      const expanded = stage.classList.toggle('is-open');
      open.setAttribute('aria-expanded', String(expanded));
      open.innerHTML = expanded ? 'Close engine view <span>↙</span>' : 'Open engine view <span>↗</span>';
      if (expanded) model?.focus({ preventScroll: true });
    });
  };

  const cinematicPlateSystem = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const plates = [...document.querySelectorAll('.media-hero, .media-stage, .feature-visual, .wakanda-gallery-card, .curated-video-card, .realm-stage, .bridge-realistic-bg, .bridge-bg, .engine-bg, .stack-bg, .case-bg, .cockpit-bg, .cred-bg, .blueprint-bg')];
    plates.forEach((plate) => {
      plate.classList.add('cinematic-plate');
      plate.style.setProperty('--plate-progress', '0');
      plate.style.setProperty('--plate-x', '0px');
      plate.style.setProperty('--plate-y', '0px');
      plate.querySelectorAll('img, video').forEach((media) => media.classList.add('cinematic-plate__media'));
    });

    const videos = [...document.querySelectorAll('video.cinematic-video')];
    if ('IntersectionObserver' in window) {
      const videoObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
        const video = entry.target;
        if (reduce || document.hidden || !entry.isIntersecting) { video.pause(); return; }
        video.play().catch(() => {});
      }), { rootMargin: '120px 0px 120px 0px', threshold: 0.08 });
      videos.forEach((video) => videoObserver.observe(video));
    }

    let raf = 0;
    let pending = false;
    const paint = () => {
      pending = false;
      const viewport = window.innerHeight || 1;
      plates.forEach((plate) => {
        const rect = plate.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const progress = Math.max(-1, Math.min(1, (viewport / 2 - center) / Math.max(viewport, rect.height)));
        plate.style.setProperty('--plate-progress', progress.toFixed(3));
      });
    };
    const requestPaint = () => { if (pending) return; pending = true; raf = requestAnimationFrame(paint); };
    window.addEventListener('scroll', requestPaint, { passive: true });
    window.addEventListener('resize', requestPaint, { passive: true });
    requestPaint();

    if (finePointer && !reduce) {
      plates.forEach((plate) => {
        plate.addEventListener('pointermove', (event) => {
          const rect = plate.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width - .5) * 18;
          const y = ((event.clientY - rect.top) / rect.height - .5) * 14;
          plate.style.setProperty('--plate-x', `${x.toFixed(2)}px`);
          plate.style.setProperty('--plate-y', `${y.toFixed(2)}px`);
        }, { passive: true });
        plate.addEventListener('pointerleave', () => {
          plate.style.setProperty('--plate-x', '0px');
          plate.style.setProperty('--plate-y', '0px');
        }, { passive: true });
      });
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) videos.forEach((video) => video.pause());
      else if (!reduce) videos.forEach((video) => { if (video.closest('.cinematic-plate')) video.play().catch(() => {}); });
    }, { passive: true });
  };

  const boot = () => { featureVisuals(); particleField(); ambientWorld(); railActivation(); evidenceLayer(); philosophyMotion(); reveal(); tilt(); modal(); pauseWhenHidden(); responsivePolish(); engineStage(); cinematicPlateSystem(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
