// ================================================
// detail.js – Trang chi tiết sản phẩm
// Phụ trách: Nguyễn Tuấn Đạt – MSV: 24810320643
// ================================================

// ===== DỮ LIỆU SẢN PHẨM =====
const products = {
  1:  { name: "Bó hoa cẩm tú cầu mix tulip giấy ren",        price: "2.050.000₫", priceNum: 2050000,  img: "anh/bo1.jpg",    desc: ["Hoa chính: cẩm tú cầu, tulip", "Tone màu: hồng pastel", "Phong cách: nhẹ nhàng, tinh tế", "Phù hợp: tặng người yêu, sinh nhật"] },
  2:  { name: "Bó hoa form tròn tone hồng sz xxl",            price: "4.550.000₫", priceNum: 4550000,  img: "anh/bo2.avif",   desc: ["Hoa chính: hồng Ecuador", "Kích thước: XXL", "Phong cách: sang trọng", "Phù hợp: kỷ niệm, cầu hôn"] },
  3:  { name: "Bó hoa giấy hồng trắng mix giấy ngọc trai",   price: "1.650.000₫", priceNum: 1650000,  img: "anh/bo3.avif",   desc: ["Hoa chính: hoa giấy nghệ thuật", "Tone màu: hồng - trắng", "Độ bền: lâu dài", "Phù hợp: trang trí, quà lưu niệm"] },
  4:  { name: "Bó hoa giấy hồng tone hồng trắng",             price: "1.350.000₫", priceNum: 1350000,  img: "anh/bo4.avif",   desc: ["Hoa chính: hoa giấy", "Tone màu: nhẹ nhàng", "Phong cách: tối giản", "Phù hợp: tặng bạn bè"] },
  5:  { name: "Bó hoa giấy trắng xanh tone hồng nhạt",        price: "1.350.000₫", priceNum: 1350000,  img: "anh/bo5.avif",   desc: ["Hoa chính: baby trắng, lá xanh", "Phong cách: thanh lịch", "Tone màu: trắng - xanh", "Phù hợp: nam hoặc nữ"] },
  6:  { name: "Bó hoa giấy đen tone trắng cam nâu",            price: "1.850.000₫", priceNum: 1850000,  img: "anh/bo6.avif",   desc: ["Hoa chính: hoa khô mix", "Tone màu: trầm", "Phong cách: cá tính", "Phù hợp: nam giới"] },
  7:  { name: "Bó hoa tone cam nâu",                           price: "1.550.000₫", priceNum: 1550000,  img: "anh/bo7.avif",   desc: ["Hoa chính: hoa hồng cam", "Phong cách: vintage", "Tone màu: ấm", "Phù hợp: mùa thu"] },
  8:  { name: "Bó hoa tone trắng xanh lá",                    price: "1.850.000₫", priceNum: 1850000,  img: "anh/bo8.avif",   desc: ["Hoa chính: baby trắng", "Phong cách: thanh lịch", "Tone màu: sáng", "Phù hợp: quà tặng lịch sự"] },
  9:  { name: "Bó hoa tone xanh vàng hồng",                   price: "2.050.000₫", priceNum: 2050000,  img: "anh/bo9.avif",   desc: ["Hoa chính: mix nhiều loại", "Tone màu: rực rỡ", "Phong cách: trẻ trung", "Phù hợp: sinh nhật"] },
  10: { name: "Bó hoa giấy ren ngọt ngào",                    price: "2.500.000₫", priceNum: 2500000,  img: "anh/bo10.avif",  desc: ["Hoa chính: hoa hồng + ren", "Phong cách: nữ tính", "Tone màu: pastel", "Phù hợp: tặng bạn gái"] },
  11: { name: "Bó hoa tone xanh cá tính",                     price: "3.550.000₫", priceNum: 3550000,  img: "anh/bo11.avif",  desc: ["Hoa chính: hoa xanh độc đáo", "Phong cách: cá tính", "Tone màu: xanh đậm", "Phù hợp: người thích khác biệt"] },
  12: { name: "Bó hoa tulip đỏ thanh lịch",                   price: "1.250.000₫", priceNum: 1250000,  img: "anh/bo12.avif",  desc: ["Hoa chính: tulip đỏ", "Ý nghĩa: tình yêu mãnh liệt", "Phong cách: đơn giản", "Phù hợp: tỏ tình"] },
  13: { name: "Bình hoa tone nhẹ nhàng",                      price: "4.050.000₫", priceNum: 4050000,  img: "anh/binh1.avif", desc: ["Hoa chính: mix nhẹ", "Phong cách: decor", "Tone màu: dịu", "Phù hợp: trang trí nhà"] },
  14: { name: "Bình hoa cỡ đại tone hồng tím trắng",          price: "10.000.000₫",priceNum: 10000000, img: "anh/binh2.avif", desc: ["Kích thước: lớn", "Phong cách: cao cấp", "Tone màu: nổi bật", "Phù hợp: sự kiện"] },
  15: { name: "Bình hoa tone hồng đậm xanh lá",               price: "3.850.000₫", priceNum: 3850000,  img: "anh/binh3.avif", desc: ["Hoa chính: hoa hồng", "Tone màu: đậm", "Phong cách: hiện đại", "Phù hợp: decor"] },
  16: { name: "Bình hoa gốm mộc tone xanh lá trắng vàng",     price: "5.550.000₫", priceNum: 5550000,  img: "anh/binh4.avif", desc: ["Chất liệu: gốm", "Phong cách: mộc", "Tone màu: tự nhiên", "Phù hợp: nhà phong cách tối giản"] },
  17: { name: "Bình hoa gốm mộc thiết kế Afloral",            price: "6.550.000₫", priceNum: 6550000,  img: "anh/binh5.avif", desc: ["Thiết kế: độc quyền", "Phong cách: cao cấp", "Tone màu: sang trọng", "Phù hợp: quà tặng VIP"] },
  18: { name: "Giỏ hoa tone hồng mix trắng",                  price: "1.850.000₫", priceNum: 1850000,  img: "anh/binh6.avif", desc: ["Hoa chính: hoa hồng", "Tone màu: hồng trắng", "Phong cách: nhẹ nhàng", "Phù hợp: sinh nhật"] },
  19: { name: "Giỏ mica tone nâu be trắng",                   price: "2.850.000₫", priceNum: 2850000,  img: "anh/binh7.avif", desc: ["Chất liệu: mica", "Tone màu: nâu be", "Phong cách: hiện đại", "Phù hợp: decor bàn"] },
  20: { name: "Bình hoa tone tím trắng",                      price: "2.050.000₫", priceNum: 2050000,  img: "anh/binh8.avif", desc: ["Hoa chính: tím - trắng", "Phong cách: nữ tính", "Tone màu: dịu", "Phù hợp: tặng bạn nữ"] },
  21: { name: "Bình hoa bạc metalic tone tím xanh",           price: "3.000.000₫", priceNum: 3000000,  img: "anh/binh9.avif", desc: ["Chất liệu: kim loại", "Phong cách: hiện đại", "Tone màu: tím xanh", "Phù hợp: decor cá tính"] },
  22: { name: "Bình hoa tone xanh blue trắng",                price: "4.500.000₫", priceNum: 4500000,  img: "anh/binh10.avif",desc: ["Tone màu: xanh trắng", "Phong cách: thanh lịch", "Hoa chính: mix", "Phù hợp: phòng khách"] },
  23: { name: "Bình hoa garden sắc màu",                      price: "3.000.000₫", priceNum: 3000000,  img: "anh/binh11.avif",desc: ["Hoa chính: mix màu", "Phong cách: garden", "Tone màu: đa sắc", "Phù hợp: trang trí"] },
  24: { name: "Bình hoa king trắng sang trọng",               price: "5.000.000₫", priceNum: 5000000,  img: "anh/binh12.avif",desc: ["Hoa chính: trắng cao cấp", "Phong cách: sang trọng", "Tone màu: trắng", "Phù hợp: tặng đối tác"] }
};

// ===== HIỂN THỊ THÔNG TIN SẢN PHẨM =====
const id = parseInt(new URLSearchParams(window.location.search).get('id'));
const product = products[id];

if (product) {
  document.title = product.name + ' – DTNShop';
  document.getElementById('breadcrumbName').textContent = product.name;
  document.getElementById('productName').textContent    = product.name;
  document.getElementById('productPrice').textContent   = product.price;

  const img = document.getElementById('productImg');
  img.src = product.img;
  img.alt = product.name;

  const descList = document.getElementById('productDesc');
  product.desc.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    descList.appendChild(li);
  });
} else {
  document.getElementById('productContent').style.display = 'none';
  document.getElementById('notFound').style.display = 'block';
}

// ===== SỐ LƯỢNG =====
let qty = 1;
document.getElementById('minus').addEventListener('click', () => {
  if (qty > 1) document.getElementById('qty').textContent = --qty;
});
document.getElementById('plus').addEventListener('click', () => {
  document.getElementById('qty').textContent = ++qty;
});

// ===== THÊM VÀO GIỎ HÀNG =====
document.getElementById('addCartBtn').addEventListener('click', () => {
  if (!product) return;
  const cart = getCart();
  const existing = cart.find(i => i.id === id);
  if (existing) existing.qty += qty;
  else cart.push({ id, name: product.name, price: product.price, priceNum: product.priceNum, img: product.img, qty });
  saveCart(cart);
  updateCartBadge();
  showToast('Đã thêm vào giỏ hàng!', 'success');
});

// ===== MUA NGAY =====
document.getElementById('buyNowBtn').addEventListener('click', () => {
  if (product) openModal();
});

// ===== MODAL ĐẶT HÀNG =====
function openModal()  { document.getElementById('orderModal').classList.add('show'); }
function closeModal() { document.getElementById('orderModal').classList.remove('show'); }

document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('orderModal').addEventListener('click', e => {
  if (e.target === document.getElementById('orderModal')) closeModal();
});

document.getElementById('submitOrder').addEventListener('click', () => {
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
});

// ===== KHỞI TẠO =====
updateCartBadge();
initScrollTop();
initSearchRedirect();
