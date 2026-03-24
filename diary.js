/* ════════════════════════════════════════════════════════
   script.js  |  1% Non-Negotiable — Ditari Ditor
════════════════════════════════════════════════════════ */

/* ── NAV: frosted glass on scroll ──────────────────── */
(function initNav() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  const update = () => nav.classList.toggle('scrolled', window.scrollY > 36);
  update(); // run once in case page loads scrolled
  window.addEventListener('scroll', update, { passive: true });
})();


/* ── FADE-UP: IntersectionObserver ─────────────────── */
(function initFadeUp() {
  const els = document.querySelectorAll('.fu');
  if (!els.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('on');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.09, rootMargin: '0px 0px -32px 0px' }
  );

  els.forEach((el) => io.observe(el));
})();


/* ── SMOOTH ANCHOR SCROLL ───────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id     = a.getAttribute('href');
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ── FAQ ACCORDION ──────────────────────────────────── */
(function initFaq() {
  const list = document.getElementById('faqList');
  if (!list) return;

  const items = list.querySelectorAll('.faq-item');

  items.forEach((item) => {
    const btn    = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all open items first
      items.forEach((other) => {
        if (other !== item && other.classList.contains('open')) {
          other.classList.remove('open');
          other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-a').style.maxHeight = '0';
        }
      });

      // Toggle clicked item
      if (isOpen) {
        item.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = '0';
      } else {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        // Set maxHeight to scrollHeight so CSS transition plays
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
})();
