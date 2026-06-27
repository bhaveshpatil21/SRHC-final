const WA_NUMBER = "918591371535";

/* ---------- ACTIVE NAV (based on current file) ---------- */
(function () {
  let path = location.pathname.split('/').pop();
  if (!path) path = 'index.html';
  document.querySelectorAll('.menu a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
})();

/* ---------- TEAM GRID (only runs on team.html) ---------- */
const specialists = [
  ["Dr. Abhinandan Jadhav", "General Surgeon", "General Surgical procedures"],
  ["Dr. Rahil Ansari", "Neurologist", "Headaches, migraine, epilepsy & nerve disorders."],
  ["Dr. Tejas Hankare", "Psychiatrist", "Anxiety, depression & mental wellness support."],
  ["Dr. Sujata Lipare", "Gynaecologist", "Women's health, maternity & reproductive care."],
  ["Dr. Yogin Patel", "Orthopaedic / Spine Surgeon", "Bones, joints, fractures & sports injuries."],
  ["Disha Manchekar and Natasha Tafti", "Psychologist", "Complete Mobility & rehabilitation"],
  ["Dr. Manali Sawant", "Physiotherapist", "Rehabilitation, mobility & pain relief."],
  /* ["Cardiologist", "Heart health, BP & cardiac screening."], */
  /* ["Dietitian / Nutritionist", "Personalised diet plans & weight management."] */
];
const tg = document.getElementById('teamGrid');
if (tg) {
  tg.innerHTML = specialists.map(s => `
    <div class="doc reveal">
      <div class="av"><span class="ring"></span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="12" cy="8" r="4.5"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>
      </div>
      <div class="bd"><h3>${s[0]}</h3><div class="role">${s[1]}</div><p>${s[2]}</p></div>
    </div>`).join('');
}

/* ---------- REVEAL ANIMATIONS ---------- */
const io = new IntersectionObserver(es => {
  es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); } });
}, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach((el, i) => {
  const r = el.getBoundingClientRect();
  if (r.top < window.innerHeight) { setTimeout(() => el.classList.add('visible'), i * 60); }
  else io.observe(el);
});

/* ---------- HEADER SHADOW ON SCROLL ---------- */
const topnav = document.getElementById('topnav');
if (topnav) window.addEventListener('scroll', () => topnav.classList.toggle('scrolled', window.scrollY > 20));

/* ---------- MOBILE MENU ---------- */
const burger = document.getElementById('burger'), menu = document.getElementById('menu');
if (burger) burger.addEventListener('click', () => menu.classList.toggle('open'));

/* ---------- FAQ ACCORDION ---------- */
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => q.parentElement.classList.toggle('open'));
});

/* ---------- WHATSAPP PRE-FILL FORMS ---------- */
function v(id) { const e = document.getElementById(id); return e ? e.value.trim() : ''; }
function openWA(msg) {
  window.open("https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg), "_blank");
}
function sendAppointment() {
  const name = v('a_name'), phone = v('a_phone');
  if (!name || !phone) { alert("Please enter your name and phone number."); return; }
  const dept = v('a_dept') || 'General Consultation';
  let m = "🩺 *Appointment Request — Shri Ramdev Healthcare Centre*\n\n";
  m += "*Name:* " + name + "\n";
  m += "*Phone:* " + phone + "\n";
  if (v('a_age')) m += "*Age:* " + v('a_age') + "\n";
  m += "*Department/Service:* " + dept + "\n";
  if (v('a_date')) m += "*Preferred Date:* " + v('a_date') + "\n";
  if (v('a_time')) m += "*Preferred Time:* " + v('a_time') + "\n";
  if (v('a_notes')) m += "*Notes:* " + v('a_notes') + "\n";
  m += "\nPlease confirm my appointment. Thank you!";
  openWA(m);
}
function sendContact() {
  const name = v('c_name'), phone = v('c_phone');
  if (!name || !phone) { alert("Please enter your name and phone number."); return; }
  let m = "💬 *Enquiry — Shri Ramdev Healthcare Centre*\n\n";
  m += "*Name:* " + name + "\n";
  m += "*Phone:* " + phone + "\n";
  if (v('c_subject')) m += "*Subject:* " + v('c_subject') + "\n";
  if (v('c_msg')) m += "*Message:* " + v('c_msg') + "\n";
  openWA(m);
}

/* ---------- GRACEFUL IMAGE FALLBACK ---------- */
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', () => {
    img.style.opacity = '0';
    if (img.parentElement) img.parentElement.style.background = 'linear-gradient(160deg,#eaf4f1,#d6ece6)';
  });
});
