// Cursor glow
const cursorGlow = document.querySelector('.cursor-glow');
let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0, rafId = null;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (!rafId) rafId = requestAnimationFrame(animateGlow);
});

function animateGlow() {
  glowX += (mouseX - glowX) * 0.08;
  glowY += (mouseY - glowY) * 0.08;
  cursorGlow.style.setProperty('--x', glowX + 'px');
  cursorGlow.style.setProperty('--y', glowY + 'px');
  rafId = Math.hypot(mouseX - glowX, mouseY - glowY) > 0.5
    ? requestAnimationFrame(animateGlow)
    : null;
}

// Active nav highlight on scroll
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-item');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(n => n.classList.remove('active'));
      const active = document.querySelector(`.nav-item[data-section="${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.3 });

sections.forEach(s => observer.observe(s));

// Mobile menu
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
if (burger) {
  burger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}
