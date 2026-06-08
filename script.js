// ================================================
// script.js – Trang chủ & trang danh mục
// Phụ trách: Hoàng Văn Tiến – MSV: 24810320428
// ================================================

// ===== TRẠNG THÁI LỌC =====
const state = { search: '', category: 'all', price: 'all', sort: 'default' };
let allProducts = [], showAll = false;
const PAGE_SIZE = 12;

// ===== LỌC & HIỂN THỊ SẢN PHẨM =====
function applyFilters() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  // Lọc danh sách
  let list = allProducts.filter(p => {
    const name  = p.dataset.name || '';
    const price = +p.dataset.price || 0;
    const cat   = p.dataset.category || '';
    if (state.search && !name.includes(state.search)) return false;
    if (state.category !== 'all' && cat !== state.category) return false;
    if (state.price === 'under2m' && price >= 2000000) return false;
    if (state.price === '2to5m'   && (price < 2000000 || price > 5000000)) return false;
    if (state.price === 'over5m'  && price <= 5000000) return false;
    return true;
  });

  // Sắp xếp
  if (state.sort === 'asc')  list.sort((a, b) => +a.dataset.price - +b.dataset.price);
  else if (state.sort === 'desc') list.sort((a, b) => +b.dataset.price - +a.dataset.price);
  else list.sort((a, b) => +a.dataset.origIdx - +b.dataset.origIdx);

  // Cập nhật DOM: sắp xếp lại, ẩn/hiện
  list.forEach(p => grid.appendChild(p));
  allProducts.forEach(p => p.style.display = 'none');
  list.slice(0, showAll ? list.length : PAGE_SIZE).forEach(p => p.style.display = '');

  // Thông báo không có kết quả
  const noResults = document.getElementById('noResults');
  if (noResults) noResults.style.display = list.length === 0 ? 'flex' : 'none';

  // Nút "Xem thêm"
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (loadMoreBtn) loadMoreBtn.style.display = list.length > PAGE_SIZE && !showAll ? '' : 'none';
}

// ===== KHỞI TẠO =====
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  initScrollTop();

  // Thu thập sản phẩm và hiển thị
  const grid = document.getElementById('productGrid');
  if (grid) {
    allProducts = Array.from(grid.querySelectorAll('.product'));
    allProducts.forEach((p, i) => p.dataset.origIdx = i);
    applyFilters();
  }

  // Ô tìm kiếm (index.html: lọc trực tiếp; hỗ trợ URL param ?q=)
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    const urlQ = new URLSearchParams(window.location.search).get('q');
    if (urlQ) {
      searchInput.value = urlQ;
      state.search = urlQ.toLowerCase();
      showAll = true;
      applyFilters();
    }
    searchInput.addEventListener('input', () => {
      state.search = searchInput.value.trim().toLowerCase();
      showAll = false;
      applyFilters();
    });
  }

  // Nút lọc (danh mục & giá)
  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      const [type, value] = btn.dataset.filter.split(':');
      state[type] = value;
      showAll = false;
      document.querySelectorAll(`[data-filter^="${type}:"]`).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    });
  });

  // Sắp xếp theo giá
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => { state.sort = sortSelect.value; applyFilters(); });
  }

  // Nút "Xem thêm"
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => { showAll = true; applyFilters(); });
  }

  // Modal đặt hàng nhanh (chỉ có ở index.html)
  const modal = document.getElementById('orderModal');
  if (modal) {
    document.getElementById('closeModal').addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.getElementById('submitOrder').addEventListener('click', handleSubmitOrder);
  }
});

// ===== XỬ LÝ ĐẶT HÀNG NHANH =====
function handleSubmitOrder() {
  const name  = document.getElementById('name');
  const phone = document.getElementById('phone');
  const nameErr  = document.getElementById('nameError');
  const phoneErr = document.getElementById('phoneError');

  nameErr.style.display = phoneErr.style.display = 'none';
  name.classList.remove('error');
  phone.classList.remove('error');

  let valid = true;
  if (!name.value.trim()) {
    name.classList.add('error'); nameErr.style.display = 'block'; valid = false;
  }
  if (!/^[0-9]{9,11}$/.test(phone.value.trim().replace(/\s/g, ''))) {
    phone.classList.add('error'); phoneErr.style.display = 'block'; valid = false;
  }
  if (!valid) return;

  closeModal();
  showToast('Đặt hàng thành công! Shop sẽ liên hệ bạn sớm.', 'success');
  name.value = phone.value = document.getElementById('address').value = '';
}

function openModal()  { document.getElementById('orderModal')?.classList.add('show'); }
function closeModal() { document.getElementById('orderModal')?.classList.remove('show'); }
