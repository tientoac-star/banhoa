// ================================================
// utils.js – Hàm dùng chung cho toàn bộ website
// Phụ trách: Trần Hải Nam – MSV: 24810320376
// ================================================

// ===== GIỎ HÀNG =====
function getCart() {
  return JSON.parse(localStorage.getItem('dtn_cart') || '[]');
}
function saveCart(cart) {
  localStorage.setItem('dtn_cart', JSON.stringify(cart));
}
function formatPrice(n) {
  return n.toLocaleString('vi-VN') + '₫';
}
function updateCartBadge() {
  const total = getCart().reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('#cartCount').forEach(el => el.textContent = total);
}

// ===== THÔNG BÁO TOAST =====
function showToast(msg, type) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.className = 'toast show' + (type ? ' ' + type : '');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.className = 'toast', 3000);
}

// ===== NÚT CUỘN LÊN ĐẦU TRANG =====
function initScrollTop() {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.style.display = window.scrollY > 300 ? 'flex' : 'none';
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ===== TÌM KIẾM (chuyển về trang chủ khi nhấn Enter) =====
function initSearchRedirect() {
  const input = document.getElementById('searchInput');
  if (!input) return;
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && input.value.trim()) {
      window.location.href = 'index.html?q=' + encodeURIComponent(input.value.trim());
    }
  });
}

// ===== ĐIỀU HƯỚNG =====
function goToPage(page) {
  window.location.href = page + '.html';
}
