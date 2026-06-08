// ================================================
// cart.js – Trang giỏ hàng & thanh toán
// Phụ trách: Nguyễn Tuấn Đạt – MSV: 24810320643
// ================================================

// ===== HIỂN THỊ GIỎ HÀNG =====
function renderCart() {
  const cart      = getCart();
  const emptyEl   = document.getElementById('emptyCart');
  const contentEl = document.getElementById('cartContent');
  const listEl    = document.getElementById('cartList');

  updateCartBadge();

  // Giỏ trống
  if (cart.length === 0) {
    emptyEl.style.display   = 'flex';
    contentEl.style.display = 'none';
    return;
  }

  emptyEl.style.display   = 'none';
  contentEl.style.display = 'grid';

  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('itemCount').textContent    = totalQty;
  document.getElementById('summaryCount').textContent = totalQty;

  // Render danh sách sản phẩm
  listEl.innerHTML = cart.map((item, idx) => `
    <div class="cart-item">
      <a href="detail.html?id=${item.id}">
        <img class="cart-item-img" src="${item.img}" alt="${item.name}">
      </a>
      <div class="cart-item-info">
        <a class="cart-item-name" href="detail.html?id=${item.id}">${item.name}</a>
        <span class="cart-item-unit-price">${item.price} / sản phẩm</span>
      </div>
      <div class="cart-item-controls">
        <div class="cart-qty">
          <button class="qty-btn qty-minus" data-idx="${idx}" aria-label="Giảm">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn qty-plus"  data-idx="${idx}" aria-label="Tăng">+</button>
        </div>
        <span class="cart-item-subtotal">${formatPrice(item.priceNum * item.qty)}</span>
        <button class="cart-item-remove" data-idx="${idx}" title="Xóa sản phẩm" aria-label="Xóa">✕</button>
      </div>
    </div>
  `).join('');

  // Cập nhật tổng tiền
  const total = cart.reduce((s, i) => s + i.priceNum * i.qty, 0);
  document.getElementById('summarySubtotal').textContent = formatPrice(total);
  document.getElementById('summaryTotal').textContent    = formatPrice(total);
}

// ===== SỰ KIỆN TĂNG / GIẢM / XÓA (event delegation – chỉ gắn 1 lần) =====
document.getElementById('cartList').addEventListener('click', e => {
  const btn = e.target.closest('[data-idx]');
  if (!btn) return;
  const i = +btn.dataset.idx;
  const cart = getCart();

  if (btn.classList.contains('qty-minus')) {
    if (cart[i].qty > 1) { cart[i].qty--; saveCart(cart); renderCart(); }
  } else if (btn.classList.contains('qty-plus')) {
    cart[i].qty++; saveCart(cart); renderCart();
  } else if (btn.classList.contains('cart-item-remove')) {
    const name = cart[i].name;
    cart.splice(i, 1);
    saveCart(cart);
    renderCart();
    showToast(`Đã xóa "${name.substring(0, 30)}…" khỏi giỏ`, '');
  }
});

// ===== XÓA TẤT CẢ =====
document.getElementById('clearCartBtn').addEventListener('click', () => {
  if (!confirm('Xóa toàn bộ sản phẩm trong giỏ hàng?')) return;
  saveCart([]);
  renderCart();
  showToast('Đã xóa toàn bộ giỏ hàng', '');
});

// ===== ĐẶT HÀNG =====
document.getElementById('checkoutBtn').addEventListener('click', () => {
  if (!getCart().length) return;

  const nameEl   = document.getElementById('name');
  const phoneEl  = document.getElementById('phone');
  const nameErr  = document.getElementById('nameError');
  const phoneErr = document.getElementById('phoneError');

  nameErr.style.display = phoneErr.style.display = 'none';
  nameEl.classList.remove('error');
  phoneEl.classList.remove('error');

  let valid = true;
  if (!nameEl.value.trim()) {
    nameEl.classList.add('error'); nameErr.style.display = 'block'; valid = false;
  }
  if (!/^[0-9]{9,11}$/.test(phoneEl.value.trim().replace(/\s/g, ''))) {
    phoneEl.classList.add('error'); phoneErr.style.display = 'block'; valid = false;
  }
  if (!valid) { nameEl.focus(); return; }

  // Xóa giỏ và hiện màn hình thành công
  saveCart([]);
  updateCartBadge();
  document.getElementById('cartContent').style.display = 'none';
  document.getElementById('emptyCart').style.display   = 'none';
  document.getElementById('orderSuccess').style.display = 'flex';
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== KHỞI TẠO =====
initScrollTop();
initSearchRedirect();
renderCart();
