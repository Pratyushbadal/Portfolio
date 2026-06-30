/* =============================================
   PRATYUSH BADAL PORTFOLIO — JAVASCRIPT
   ============================================= */

/* ---------- CUSTOM CURSOR ---------- */
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursor-trail');

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.1;
  trailY += (mouseY - trailY) * 0.1;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

/* ---------- NAVBAR SCROLL EFFECT ---------- */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ---------- MOBILE HAMBURGER ---------- */
const hamburger = document.getElementById('nav-hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  const isOpen = navLinks.classList.contains('open');
  spans[0].style.transform = isOpen ? 'translateY(7px) rotate(45deg)' : '';
  spans[1].style.opacity = isOpen ? '0' : '';
  spans[2].style.transform = isOpen ? 'translateY(-7px) rotate(-45deg)' : '';
});

// Close menu on nav link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
    });
  });
});

/* ---------- TYPEWRITER EFFECT ---------- */
const phrases = [
  'Backend Developer',
  'ASP.NET Core Engineer',
  'FastAPI Builder',
  'Full-Stack Developer',
  'Clean Architecture Fan',
  'Docker Enthusiast',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed-text');

function typeWriter() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeWriter, 400);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeWriter, 2000);
      return;
    }
  }

  setTimeout(typeWriter, isDeleting ? 60 : 90);
}

typeWriter();

/* ---------- PARTICLES ---------- */
const particlesContainer = document.getElementById('particles');

function createParticles() {
  const count = 35;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.setProperty('--dur', (3 + Math.random() * 5) + 's');
    p.style.setProperty('--delay', -(Math.random() * 8) + 's');
    p.style.width = (1 + Math.random() * 3) + 'px';
    p.style.height = p.style.width;
    particlesContainer.appendChild(p);
  }
}
createParticles();

/* ---------- SCROLL REVEAL ---------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('[data-animate]').forEach(el => {
  revealObserver.observe(el);
});

// Also observe project cards and timeline items
document.querySelectorAll('.project-card, .timeline-item').forEach(el => {
  revealObserver.observe(el);
});

/* ---------- ACTIVE NAV LINK HIGHLIGHTING ---------- */
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinksAll.forEach(link => {
        link.style.color = '';
        link.style.background = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--accent-glow)';
          link.style.background = 'rgba(139, 92, 246, 0.1)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ---------- STAT COUNTER ANIMATION ---------- */
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const isPercent = suffix === '%';
  const increment = target / 50;
  const interval = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(interval);
    }
    el.textContent = Math.floor(current) + suffix;
  }, 30);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll('.stat-number');
      statNumbers.forEach(el => {
        const text = el.textContent.trim();
        if (text.includes('%')) animateCounter(el, parseInt(text), '%');
        else if (text.includes('+')) animateCounter(el, parseInt(text), '+');
        else animateCounter(el, parseInt(text));
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) statsObserver.observe(statsSection);

/* ---------- CONTACT FORM ---------- */
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('form-submit-btn');
  const status = document.getElementById('form-status');

  const name = document.getElementById('form-name').value.trim();
  const email = document.getElementById('form-email').value.trim();
  const subject = document.getElementById('form-subject').value.trim();
  const message = document.getElementById('form-message').value.trim();

  // Compose mailto link
  const mailtoLink = `mailto:pratyushbadal90@gmail.com?subject=${encodeURIComponent(subject + ' — from ' + name)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message)}`;

  btn.textContent = 'Opening mail client...';
  btn.disabled = true;

  window.location.href = mailtoLink;

  setTimeout(() => {
    status.textContent = '✅ Your email client should have opened. If not, email me directly at pratyushbadal90@gmail.com';
    btn.innerHTML = 'Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
    btn.disabled = false;
    document.getElementById('contact-form').reset();
  }, 1500);
}

/* ---------- SMOOTH SCROLL FOR ANCHOR LINKS ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---------- GLASSMORPHISM TILT EFFECT ON PROJECT CARDS ---------- */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -4;
    const rotY = ((x - cx) / cx) * 4;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s ease';
    setTimeout(() => { card.style.transition = ''; }, 400);
  });
});

/* ---------- PAGE LOAD ANIMATION ---------- */
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });
});
