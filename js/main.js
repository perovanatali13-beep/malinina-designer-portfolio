// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('in'), i * 90);
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Active nav highlight (только на главной)
const sections = document.querySelectorAll('section[id], div[id="top"]');
const links = document.querySelectorAll('.nav-links a[href^="#"]');

if (links.length) {
  const navIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const match = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(s => navIO.observe(s));
}

// Lightbox: кнопка «+» на скриншотах, увеличенная версия во всплывающем окне
(() => {
  const shots = document.querySelectorAll('.zoom');
  if (!shots.length) return;

  const box = document.createElement('div');
  box.className = 'lightbox';
  box.hidden = true;
  box.innerHTML = '<button class="lightbox-close" type="button" aria-label="Закрыть">×</button><div class="lightbox-body"><img alt=""></div>';
  document.body.appendChild(box);
  const big = box.querySelector('img');

  const close = () => { box.hidden = true; big.removeAttribute('src'); document.body.classList.remove('lb-open'); };
  const open = (src, alt) => {
    big.src = src;
    big.alt = alt || '';
    box.hidden = false;
    box.querySelector('.lightbox-body').scrollTop = 0;
    document.body.classList.add('lb-open');
  };

  shots.forEach(el => {
    const img = el.querySelector('img');
    if (!img) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'zoom-btn';
    btn.setAttribute('aria-label', 'Открыть увеличенное изображение');
    btn.textContent = '+';
    el.appendChild(btn);
    const go = () => open(el.dataset.full || img.currentSrc || img.src, img.alt);
    btn.addEventListener('click', go);
    img.addEventListener('click', go);
  });

  box.addEventListener('click', e => { if (e.target === box || e.target.classList.contains('lightbox-close') || e.target.classList.contains('lightbox-body')) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !box.hidden) close(); });
})();
