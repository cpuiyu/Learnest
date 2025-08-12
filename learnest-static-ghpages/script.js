
// Smooth scroll（尊重使用者偏好）
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function smoothScrollTo(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
}

// 綁定 anchor
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const href = a.getAttribute('href');
  if (href && href !== '#') {
    e.preventDefault();
    smoothScrollTo(href);
  }
});

// 返回頂部按鈕
const backBtn = document.getElementById('backToTop');
function toggleBackBtn() {
  const show = window.scrollY > 300;
  backBtn.classList.toggle('show', show);
}
window.addEventListener('scroll', toggleBackBtn);
backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' }));
toggleBackBtn();

// 年份
document.getElementById('year').textContent = new Date().getFullYear();

// 表單驗證
const form = document.getElementById('contact-form');
const nameEl = document.getElementById('name');
const emailEl = document.getElementById('email');
const msgEl = document.getElementById('message');
const thankEl = document.getElementById('thankyou');

function setError(id, text) {
  const el = document.getElementById('error-' + id);
  if (el) el.textContent = text || '';
}
function validate() {
  let ok = true;
  setError('name', '');
  setError('email', '');
  setError('message', '');

  if (!nameEl.value || nameEl.value.trim().length < 2) {
    setError('name', '請輸入至少 2 個字的姓名。');
    ok = false;
  }
  const email = emailEl.value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    setError('email', '請輸入有效的 Email。');
    ok = false;
  }
  if (!msgEl.value || msgEl.value.trim().length < 10) {
    setError('message', '訊息至少 10 個字。');
    ok = false;
  }
  return ok;
}
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validate()) {
    const first = form.querySelector('.error:not(:empty)');
    if (first) {
      const input = first.previousElementSibling;
      if (input && input.focus) input.focus();
    }
    return;
  }
  // 模擬送出：顯示感謝訊息
  thankEl.hidden = false;
  thankEl.focus && thankEl.focus();
  form.reset();
});

// 圖片佔位：若 ./assets/xxx.png 載入失敗，用 Canvas 產生替代圖（確保頁面即使缺圖也正常顯示）
function placeholder(index = 1, w = 1200, h = 800) {
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');

  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, '#2563eb');
  g.addColorStop(1, '#1e40af');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  ctx.font = Math.floor(w * 0.1) + 'px Inter, system-ui, Arial';
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('WORK ' + index, w / 2, h / 2);

  return canvas.toDataURL('image/png');
}

document.querySelectorAll('.work-img').forEach((img) => {
  img.addEventListener('error', () => {
    const idx = parseInt(img.getAttribute('data-fallback-index') || '1', 10);
    img.src = placeholder(idx);
  }, { once: true });
});
