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
