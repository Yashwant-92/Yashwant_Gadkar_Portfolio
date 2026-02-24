// Canvas Stars Background
const cv = document.getElementById('cosmos'), cx = cv.getContext('2d');
let stars = [], mx = 0, my = 0;

function rz() { cv.width = innerWidth; cv.height = innerHeight }

function mk() {
  stars = [];
  const n = Math.floor(cv.width * cv.height / 9000);
  for (let i = 0; i < n; i++) stars.push({
    x: Math.random() * cv.width,
    y: Math.random() * cv.height,
    r: Math.random() * 1.4 + .3,
    o: Math.random() * .7 + .2,
    s: Math.random() * .02 + .005,
    f: Math.random() * Math.PI * 2
  });
}

function draw(t) {
  cx.clearRect(0, 0, cv.width, cv.height);
  stars.forEach(s => {
    const tw = Math.sin(t * s.s + s.f) * .3 + .7;
    const dx = s.x - mx, dy = s.y - my, d = Math.sqrt(dx * dx + dy * dy);
    const p = Math.max(0, 1 - d / 280);
    const fo = s.o * tw + p * .4;
    cx.beginPath();
    cx.arc(s.x, s.y, s.r + p * 1.4, 0, Math.PI * 2);
    cx.fillStyle = `rgba(190,210,255,${Math.min(fo, 1)})`;
    cx.fill();
    if (p > .25) {
      cx.beginPath();
      cx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
      cx.fillStyle = `rgba(79,140,255,${p * .12})`;
      cx.fill();
    }
  });
  requestAnimationFrame(draw);
}

rz(); mk(); requestAnimationFrame(draw);
addEventListener('resize', () => { rz(); mk() });

// Glow follow cursor
const gf = document.getElementById('gf');
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  gf.style.left = e.clientX + 'px';
  gf.style.top = e.clientY + 'px';
});

// Skill tile hover effect
document.querySelectorAll('.skill-tile').forEach(c => {
  c.addEventListener('mousemove', e => {
    const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', (e.clientX - r.left) / r.width * 100 + '%');
    c.style.setProperty('--my', (e.clientY - r.top) / r.height * 100 + '%');
  });
});

// Navbar shrink on scroll
const nb = document.getElementById('nb');
addEventListener('scroll', () => nb.classList.toggle('shrink', scrollY > 50));

// Burger menu toggle
const bgg = document.getElementById('bg'), nm = document.getElementById('nm');
bgg.addEventListener('click', () => { bgg.classList.toggle('on'); nm.classList.toggle('open') });
function closeM() { bgg.classList.remove('on'); nm.classList.remove('open') }

// Reveal on scroll
const ro = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) e.target.classList.add('vis')
}), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.rv').forEach(el => ro.observe(el));

// Skill bar fill animation
const bo = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) e.target.style.width = e.target.dataset.w
}), { threshold: .5 });
document.querySelectorAll('.bar-fill').forEach(b => bo.observe(b));

// Counter animation
const co = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) {
    const el = e.target, tgt = parseFloat(el.dataset.count);
    let cur = 0;
    const inc = tgt / 35;
    const iv = setInterval(() => {
      cur += inc;
      if (cur >= tgt) {
        el.textContent = (Number.isInteger(tgt) ? tgt : tgt.toFixed(1)) + '+';
        clearInterval(iv);
      } else {
        el.textContent = Number.isInteger(tgt) ? Math.floor(cur) : cur.toFixed(1);
      }
    }, 45);
    co.unobserve(el);
  }
}), { threshold: .5 });
document.querySelectorAll('[data-count]').forEach(c => co.observe(c));

// Project data
const pdata = [
  {
    t: 'GPSEVA — Digital Gram Panchayat Portal',
    tags: ['Spring Boot', 'Spring Security', 'React.js', 'MySQL', 'Razorpay', 'REST APIs'],
    desc: 'A secure full-stack web application enabling Gram Panchayats to register, upload documents, and launch official websites with automated 24-hour deployment and Razorpay payment integration.',
    feats: ['Multi-step registration workflow with document management', 'Razorpay payment gateway for automated activation', 'Spring Security with role-based access control', 'Responsive React.js UI with secure data handling', 'Automated 24-hour website deployment pipeline']
  },
  {
    t: 'Bio-Signal Cancer Detection System',
    tags: ['Spring Boot', 'MySQL', 'Thymeleaf', 'JavaScript', 'Bio-Signals'],
    desc: 'A full-stack healthcare application for early, non-invasive cancer detection using bio-signals (voice, pulse, facial, motor-movement) and behavioural data analysis with secure patient data management.',
    feats: ['REST APIs for processing voice, pulse, facial & motor data', 'Feature extraction workflows for bio-signal analysis', 'Thymeleaf-based responsive frontend with dashboards', 'Secure authentication & consent-based privacy controls', 'Patient data management with medical record integration']
  },
  {
    t: 'Hospital Management System',
    tags: ['Spring Boot', 'Hibernate', 'Angular', 'MySQL', 'RBAC'],
    desc: 'An enterprise-grade hospital management platform with role-based access for doctors, patients, and admins, featuring secure scalable patient data management and optimized multi-user performance.',
    feats: ['Spring Boot REST APIs with Hibernate ORM', 'Debug logging & backend performance optimization', 'RBAC-based modules for doctors, patients & admins', 'Improved data security and regulatory compliance', 'Scalable architecture for multi-user environments']
  }
];

// Modal open/close
function openMdl(i) {
  const d = pdata[i];
  document.getElementById('mt').textContent = d.t;
  document.getElementById('mtags').innerHTML = d.tags.map(t => '<span class="proj-tag">' + t + '</span>').join('');
  document.getElementById('mdesc').textContent = d.desc;
  document.getElementById('mfeats').innerHTML = d.feats.map(f => '<li>' + f + '</li>').join('');
  document.getElementById('mdlbg').classList.add('on');
  document.body.style.overflow = 'hidden';
}

function closeMdl() {
  document.getElementById('mdlbg').classList.remove('on');
  document.body.style.overflow = '';
}

document.getElementById('mdlbg').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeMdl();
});
addEventListener('keydown', e => { if (e.key === 'Escape') closeMdl() });

// Form validation
const form = document.getElementById('cform'), sendbtn = document.getElementById('sendbtn');

function vf(f) {
  const g = f.closest('.fg');
  let ok = true;
  if (f.id === 'em') {
    ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim());
  } else if (f.id === 'msg') {
    ok = f.value.trim().length >= 10;
  } else {
    ok = f.value.trim().length > 0;
  }
  g.classList.toggle('err', !ok);
  return ok;
}

form.querySelectorAll('input,textarea').forEach(f => {
  f.addEventListener('blur', () => vf(f));
  f.addEventListener('input', () => { if (f.closest('.fg').classList.contains('err')) vf(f) });
});

form.addEventListener('submit', e => {
  e.preventDefault();
  let ok = true;
  form.querySelectorAll('input,textarea').forEach(f => { if (!vf(f)) ok = false });
  if (ok) {
    sendbtn.textContent = '✓ Message Sent!';
    sendbtn.classList.add('ok');
    setTimeout(() => {
      sendbtn.textContent = 'Send Message ✉️';
      sendbtn.classList.remove('ok');
      form.reset();
    }, 3000);
  }
});
