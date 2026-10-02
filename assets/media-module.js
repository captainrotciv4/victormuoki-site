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
          card.style.transform = `perspective(900px) rotateX(${(-y * 3).toFixed(2)}deg) rotateY(${(x * 4).toFixed(2)}deg) translateY(-4px)`;
        });
      });
      card.addEventListener('pointerleave', () => {
        cancelAnimationFrame(frame);
        card.style.transform = '';
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
    cards.forEach((card, index) => {
      if (card.querySelector('.feature-visual')) return;
      const visual = document.createElement('div');
      visual.className = 'feature-visual media-reveal';
      visual.setAttribute('aria-hidden', 'true');
      visual.innerHTML = `<div class="feature-visual__ring"></div><div class="feature-visual__bars">${Array.from({ length: 13 }, (_, i) => `<i style="--h:${28 + ((i * 17 + index * 13) % 65)}%"></i>`).join('')}</div><span class="media-stage__label">${labels[index]}</span>`;
      card.prepend(visual);
      card.dataset.mediaTilt = 'true';
    });
  };

  const particleField = () => {
    if (reduce) return;
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

  const boot = () => { featureVisuals(); particleField(); railActivation(); evidenceLayer(); philosophyMotion(); reveal(); tilt(); modal(); pauseWhenHidden(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
