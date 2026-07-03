/* ════════════════════════════════════════════════════
   SYNVO — App Logic with GSAP ScrollTrigger
   ════════════════════════════════════════════════════ */

'use strict';

/* ── Lenis Smooth Scroll + GSAP Ticker ─────────────── */
let lenis;

if (typeof Lenis !== 'undefined' && typeof gsap !== 'undefined') {
  lenis = new Lenis({ lerp: 0.08, smoothWheel: true });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      if (arguments.length) {
        lenis.scrollTo(value, { immediate: true });
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
  });
}

gsap.registerPlugin(ScrollTrigger);

/* ── Navbar ────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');

function updateNavbar() {
  const scrollY = lenis ? lenis.scroll : window.scrollY;
  navbar.classList.toggle('scrolled', scrollY > 60);
}

if (lenis) {
  lenis.on('scroll', updateNavbar);
} else {
  window.addEventListener('scroll', updateNavbar, { passive: true });
}

updateNavbar();

navToggle.addEventListener('click', () => {
  const isOpen = navbar.classList.toggle('mobile-open');
  navToggle.setAttribute('aria-expanded', isOpen.toString());
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('mobile-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

/* ── Smooth anchor scrolling ────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(target, { offset: -80, duration: 1.2 });
    } else {
      const navHeight = navbar.offsetHeight;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navHeight - 20, behavior: 'smooth' });
    }
  });
});

/* ── Scroll Progress Bar ────────────────────────────── */
(function initScrollProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = `position:fixed;top:0;left:0;height:3px;background:linear-gradient(to right,var(--vibrant-green),var(--deep-green));z-index:9999;pointer-events:none;width:0%`;
  document.body.prepend(bar);
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: self => { bar.style.width = (self.progress * 100) + '%'; },
  });
})();

/* ── GSAP Fade Reveals ──────────────────────────────── */
(function initGsapFades() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('.gsap-fade-up,.gsap-fade-left,.gsap-fade-right').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  ['gsap-fade-up', 'gsap-fade-left', 'gsap-fade-right'].forEach(cls => {
    document.querySelectorAll('.' + cls).forEach(el => {
      const delay = parseFloat(el.getAttribute('data-delay') || '0');
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.75,
            delay,
            ease: 'power3.out',
          });
        },
        once: true,
      });
    });
  });
})();

/* ── Hero Assembly Scrub ────────────────────────────── */
(function initHeroScrub() {
  const wrapper = document.querySelector('.hero-pin-wrapper');
  const dashboard = document.getElementById('heroDashboard');
  const metrics = document.getElementById('heroMetrics');
  const chart = document.getElementById('heroChart');
  const cardPos = document.getElementById('heroCardPos');
  const cardInv = document.getElementById('heroCardInv');
  const phone = document.getElementById('heroPhone');
  const stats = document.getElementById('heroStats');
  const visual = document.getElementById('heroVisual');
  const badge = document.getElementById('heroBadge');
  const headline = document.getElementById('heroHeadline');
  const sub = document.getElementById('heroSub');
  const actions = document.getElementById('heroActions');

  if (!wrapper || !dashboard) return;

  // Initial states — hero text visible immediately
  gsap.set([badge, headline, sub, actions, stats], { opacity: 0, y: 30 });
  gsap.set(dashboard, { opacity: 0, scale: 0.88, y: 40 });
  gsap.set(metrics, { opacity: 0, y: 20 });
  gsap.set(chart, { opacity: 0, scaleY: 0, transformOrigin: 'bottom' });
  gsap.set([cardPos, cardInv], { opacity: 0, x: 40 });
  gsap.set(phone, { opacity: 0, y: 30 });

  // Hero entrance (no scroll needed — on load)
  const entranceTl = gsap.timeline({ delay: 0.1 });
  entranceTl
    .to([badge, headline], { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out' })
    .to([sub, actions], { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, '-=0.3')
    .to(stats, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.1')
    .to(dashboard, { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power4.out' }, '-=0.6')
    .to(metrics, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
    .to(chart, { opacity: 1, scaleY: 1, duration: 0.6, ease: 'power3.out' }, '-=0.2')
    .to([cardPos, cardInv], { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' }, '-=0.4')
    .to(phone, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3');

  // Scroll-out — hero fades out as user scrolls past it
  if (wrapper.offsetHeight > window.innerHeight) {
    ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: '+=60%',
      scrub: true,
      onUpdate: self => {
        const p = self.progress;
        if (p > 0.5) {
          const fade = 1 - (p - 0.5) * 2;
          gsap.set(visual, { opacity: fade, y: p * -60 });
        } else {
          gsap.set(visual, { opacity: 1, y: 0 });
        }
      },
    });
  }
})();

/* ── Services Pinned Scroll Switch ─────────────────── */
(function initServicesScrub() {
  const wrapper = document.getElementById('services-wrapper');
  const screens = document.querySelectorAll('.svc-screen');
  const listItems = document.querySelectorAll('.sli');
  const total = screens.length;

  if (!wrapper || !total) return;

  function activateScreen(index) {
    screens.forEach((s, i) => s.classList.toggle('active', i === index));
    listItems.forEach((li, i) => li.classList.toggle('active', i === index));
  }

  activateScreen(0);

  ScrollTrigger.create({
    trigger: wrapper,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0,
    onUpdate: self => {
      const idx = Math.min(Math.floor(self.progress * total), total - 1);
      const current = wrapper.querySelector('.svc-screen.active');
      const currentIdx = current ? parseInt(current.getAttribute('data-screen')) : -1;
      if (idx !== currentIdx) activateScreen(idx);
    },
  });
})();

/* ── Process Horizontal Scrub ───────────────────────── */
(function initProcessScrub() {
  const wrapper = document.getElementById('process-wrapper');
  const track = document.getElementById('processTrack');
  const fill = document.getElementById('processProgressFill');

  if (!wrapper || !track) return;

  const steps = track.querySelectorAll('.process-step-h');
  if (!steps.length) return;

  ScrollTrigger.create({
    trigger: wrapper,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: self => {
      const p = self.progress;

      // Move track horizontally
      const trackWidth = track.scrollWidth - window.innerWidth + 120;
      gsap.set(track, { x: -(p * trackWidth) });

      // Progress bar
      if (fill) fill.style.width = (p * 100) + '%';

      // Highlight current step
      const activeIdx = Math.floor(p * steps.length);
      steps.forEach((s, i) => {
        const isActive = i <= activeIdx;
        s.style.borderColor = isActive ? 'rgba(34,197,94,0.4)' : '';
        s.style.background = isActive ? 'var(--vibrant-green-light)' : '';
        s.querySelector('.psh-num').style.color = isActive ? 'var(--vibrant-green)' : '';
      });
    },
  });
})();

/* ── Counter Animation ──────────────────────────────── */
function animateCounter(el, target, duration) {
  const start = performance.now();
  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

(function initCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => animateCounter(el, target, 1600),
    });
  });
})();

/* ── FAQ Accordion ──────────────────────────────────── */
(function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-answer').classList.remove('open');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();

/* ── Testimonials Carousel ──────────────────────────── */
(function initTestimonials() {
  const track = document.getElementById('testimonialsTrack');
  const prevBtn = document.getElementById('testPrev');
  const nextBtn = document.getElementById('testNext');
  const dotsContainer = document.getElementById('testDots');

  if (!track) return;

  const cards = Array.from(track.children);
  const total = cards.length;
  let current = 0;
  let autoplayTimer;

  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'test-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Testimonial ${i + 1}`);
    dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function getVisible() {
    return window.innerWidth <= 900 ? 1 : 3;
  }

  function updateTrack() {
    const visible = getVisible();
    track.style.gridTemplateColumns = `repeat(${total}, calc(${100 / visible}% - ${24 * (visible - 1) / visible}px))`;
    track.style.transform = `translateX(-${current * (100 / visible)}%)`;
    dotsContainer.querySelectorAll('.test-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
      dot.setAttribute('aria-selected', (i === current).toString());
    });
  }

  function goTo(index) {
    const max = total - getVisible();
    current = Math.max(0, Math.min(index, max));
    updateTrack();
    resetAutoplay();
  }

  function next() {
    const max = total - getVisible();
    current = current >= max ? 0 : current + 1;
    updateTrack();
    resetAutoplay();
  }

  function prev() {
    const max = total - getVisible();
    current = current <= 0 ? max : current - 1;
    updateTrack();
    resetAutoplay();
  }

  function startAutoplay() { autoplayTimer = setInterval(next, 4000); }
  function resetAutoplay() { clearInterval(autoplayTimer); startAutoplay(); }

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
  }, { passive: true });

  window.addEventListener('resize', updateTrack, { passive: true });
  updateTrack();
  startAutoplay();
})();

/* ── Card Hover Glow ────────────────────────────────── */
(function initCardGlow() {
  document.querySelectorAll('.service-card, .trust-card, .industry-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
    });
  });
})();

/* ── Keyboard Escape ────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  navbar.classList.remove('mobile-open');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  document.querySelectorAll('.faq-item.open').forEach(item => {
    item.classList.remove('open');
    item.querySelector('.faq-answer').classList.remove('open');
    item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
  });
});

/* ── Mouse Parallax on Orbs ─────────────────────────── */
(function initOrbParallax() {
  const orbs = document.querySelectorAll('.hero-orb');
  if (!orbs.length) return;
  window.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    orbs.forEach((orb, i) => {
      const f = i === 0 ? 1 : -0.6;
      orb.style.transform = `translate(${x * f}px, ${y * f}px)`;
    });
  }, { passive: true });
})();

/* ── Page Entrance ──────────────────────────────────── */
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.35s ease';
  requestAnimationFrame(() => { document.body.style.opacity = '1'; });
  ScrollTrigger.refresh();
});

console.log('%cSynvo — Built for Saudi Businesses', 'color: #22c55e; font-size: 14px; font-weight: bold;');
