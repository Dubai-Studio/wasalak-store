/* ============================================================
   WASALAK ADMIN – admin.js
   Gestion complète des produits : CRUD, Import/Export, Image Processing
   ============================================================ */

'use strict';

/* ──────────────────────────────────────────────
   1. CONSTANTES & CONFIGURATION
────────────────────────────────────────────── */
const STORAGE_KEY   = 'wasalak_products';
const DRAFTS_KEY    = 'wasalak_drafts';
const WISHLIST_KEY  = 'wasalak_wishlist';

// Presets de redimensionnement d'images
const IMAGE_PRESETS = {
  product:   { w: 800,  h: 800,  q: 85, label: 'منتج'    },
  thumbnail: { w: 300,  h: 300,  q: 82, label: 'مصغرة'   },
  banner:    { w: 1200, h: 400,  q: 88, label: 'بانر'     },
  og:        { w: 1200, h: 630,  q: 88, label: 'مشاركة'   },
};

// Catalogue de catégories
const CATEGORIES = {
  electronics: 'إلكترونيات',
  fashion:     'أزياء وموضة',
  home:        'منزل ومطبخ',
  beauty:      'جمال وعناية',
  sports:      'رياضة',
  other:       'أخرى',
};

/* ──────────────────────────────────────────────
   2. ÉTAT GLOBAL
────────────────────────────────────────────── */
let PRODUCTS_DB   = [];
let editingId     = null;
let deleteTargetId = null;
let gallerySlots  = [null, null, null, null]; // base64 gallery images
let toolImages    = [];  // [{name, original, processed}]
let currentPreset = 'product';
let currentToolPreset = 'product';

/* ──────────────────────────────────────────────
   3. INITIALISATION
────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  initGallerySlots();
  renderDashboard();
  renderProductsTable();
  refreshExportPreview();
  initSpecsRow();
});

/* ──────────────────────────────────────────────
   4. PERSISTANCE – LOAD / SAVE
────────────────────────────────────────────── */
function loadProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      PRODUCTS_DB = JSON.parse(raw);
    } else {
      // Essayer de lire le fichier app.js PRODUCTS_DB via fetch (même origine)
      // ou utiliser des données de démo
      PRODUCTS_DB = getDefaultProducts();
      saveProducts();
    }
  } catch(e) {
    console.warn('Erreur chargement produits:', e);
    PRODUCTS_DB = getDefaultProducts();
  }
}

function saveProducts() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(PRODUCTS_DB));
    // Mise à jour du badge nav
    const el = document.getElementById('navProductCount');
    if (el) el.textContent = PRODUCTS_DB.length;
  } catch(e) {
    showToast('خطأ في الحفظ: ' + e.message, 'error');
  }
}

function getDefaultProducts() {
  // Produits démo correspondant à PRODUCTS_DB du site
  return [
    {
      id: 1, name: 'سماعات بلوتوث لاسلكية', category: 'electronics',
      price: 89, originalPrice: 120, rating: 4.5, reviews: 128, stock: 45,
      badge: 'sale', badgeText: 'خصم 26%',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80'],
      description: 'سماعات بلوتوث عالية الجودة مع خاصية إلغاء الضوضاء',
      featured: true, bestseller: true,
      specs: { 'الماركة': 'Sony', 'الاتصال': 'Bluetooth 5.0', 'البطارية': '30 ساعة' },
      options: { size: [], color: ['أسود', 'أبيض', 'رمادي'] }
    },
    {
      id: 2, name: 'ساعة ذكية رياضية', category: 'sports',
      price: 149, originalPrice: 199, rating: 4.3, reviews: 87, stock: 28,
      badge: 'hot', badgeText: 'الأكثر مبيعاً',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
      images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80'],
      description: 'ساعة ذكية متعددة الوظائف لمتابعة نشاطك الرياضي',
      featured: true, bestseller: true,
      specs: { 'الشاشة': 'AMOLED 1.4"', 'المقاومة': 'IP68', 'البطارية': '7 أيام' },
      options: { size: [], color: ['أسود', 'أزرق'] }
    },
  ];
}

/* ──────────────────────────────────────────────
   5. NAVIGATION ENTRE SECTIONS
────────────────────────────────────────────── */
function showSection(name) {
  // Masquer toutes les sections
  document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  // Afficher la section cible
  const section = document.getElementById('section-' + name);
  if (section) section.classList.add('active');

  // Activer le bon item nav
  document.querySelectorAll('.nav-item').forEach(item => {
    if (item.getAttribute('onclick') === `showSection('${name}')`) {
      item.classList.add('active');
    }
  });

  // Mettre à jour le titre topbar
  const titles = {
    'dashboard':     'لوحة التحكم',
    'products':      'إدارة المنتجات',
    'add-product':   'إضافة منتج',
    'import-export': 'استيراد / تصدير',
    'image-tools':   'أدوات الصور',
  };
  const topTitle = document.getElementById('topbarTitle');
  if (topTitle) topTitle.textContent = titles[name] || '';

  // Si retour sur products, rafraîchir
  if (name === 'products') renderProductsTable();
  if (name === 'dashboard') renderDashboard();
  if (name === 'import-export') refreshExportPreview();

  // Fermer le sidebar sur mobile
  if (window.innerWidth <= 768) closeSidebar();
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
}

/* ──────────────────────────────────────────────
   6. DASHBOARD
────────────────────────────────────────────── */
function renderDashboard() {
  // Stats
  setText('statProducts',   PRODUCTS_DB.length);
  setText('statFeatured',   PRODUCTS_DB.filter(p => p.featured).length);
  setText('statBestseller', PRODUCTS_DB.filter(p => p.bestseller).length);

  const wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
  setText('statWishlist', wishlist.length);
  setText('navProductCount', PRODUCTS_DB.length);

  // Tableau rapide (5 derniers)
  const tbody = document.getElementById('dashboardTableBody');
  if (!tbody) return;
  const last5 = [...PRODUCTS_DB].slice(-5).reverse();
  tbody.innerHTML = last5.map(p => buildTableRow(p)).join('');
}

/* ──────────────────────────────────────────────
   7. TABLE PRODUITS
────────────────────────────────────────────── */
function renderProductsTable(list = null) {
  const items = list || PRODUCTS_DB;
  const tbody = document.getElementById('productsTableBody');
  const empty = document.getElementById('productsEmpty');
  if (!tbody) return;

  if (items.length === 0) {
    tbody.innerHTML = '';
    if (empty) empty.style.display = 'flex';
    return;
  }
  if (empty) empty.style.display = 'none';
  tbody.innerHTML = items.map(p => buildTableRow(p, true)).join('');
  setText('navProductCount', PRODUCTS_DB.length);
}

function buildTableRow(p, showActions = false) {
  const catLabel  = CATEGORIES[p.category] || p.category || '—';
  const catClass  = p.category || 'other';
  const stockBadge = p.stock <= 0
    ? `<span class="status-badge out-of-stock"><span class="status-dot"></span>نفد المخزون</span>`
    : p.stock <= 5
    ? `<span class="status-badge low-stock"><span class="status-dot"></span>مخزون منخفض (${p.stock})</span>`
    : `<span class="status-badge in-stock"><span class="status-dot"></span>متوفر (${p.stock})</span>`;

  const flags = [];
  if (p.featured)   flags.push(`<span class="cat-badge electronics">مميز</span>`);
  if (p.bestseller) flags.push(`<span class="cat-badge home">الأكثر مبيعاً</span>`);
  if (p.badge === 'sale') flags.push(`<span class="cat-badge fashion">تخفيض</span>`);

  const actions = showActions ? `
    <td>
      <div class="action-btns">
        <button class="btn-icon" onclick="editProduct(${p.id})" title="تعديل" aria-label="تعديل">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button class="btn-icon" onclick="duplicateProduct(${p.id})" title="نسخ" aria-label="نسخ">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
        </button>
        <button class="btn-icon danger" onclick="openDeleteModal(${p.id})" title="حذف" aria-label="حذف">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
        </button>
      </div>
    </td>` : '';

  const imgSrc = p.image || 'https://picsum.photos/44/44';

  return `
    <tr>
      <td><img src="${escHtml(imgSrc)}" alt="${escHtml(p.name)}" class="table-product-img" loading="lazy" onerror="this.src='https://picsum.photos/44/44'"/></td>
      <td>
        <div class="table-product-name">${escHtml(p.name)}</div>
        <div class="table-product-id">#${p.id}</div>
      </td>
      <td><span class="cat-badge ${catClass}">${escHtml(catLabel)}</span></td>
      <td><strong>${p.price} د.ل</strong>${p.originalPrice > p.price ? `<br><small style="color:var(--gray-400);text-decoration:line-through">${p.originalPrice} د.ل</small>` : ''}</td>
      <td>${stockBadge}</td>
      <td>${flags.join(' ') || '<span style="color:var(--gray-400);font-size:.78rem">—</span>'}</td>
      ${actions}
    </tr>`;
}

/* ──────────────────────────────────────────────
   8. FILTRAGE TABLE
────────────────────────────────────────────── */
function filterProductsAdmin() {
  const q      = (document.getElementById('searchProducts')?.value || '').trim().toLowerCase();
  const cat    = document.getElementById('filterCategory')?.value || '';
  const status = document.getElementById('filterStatus')?.value || '';

  const filtered = PRODUCTS_DB.filter(p => {
    const matchQ   = !q || p.name.toLowerCase().includes(q) || String(p.id).includes(q);
    const matchCat = !cat || p.category === cat;
    const matchSt  = !status || (
      (status === 'featured'    && p.featured)   ||
      (status === 'bestseller'  && p.bestseller) ||
      (status === 'sale'        && p.badge === 'sale') ||
      (status === 'new'         && p.badge === 'new')
    );
    return matchQ && matchCat && matchSt;
  });
  renderProductsTable(filtered);
}

/* ──────────────────────────────────────────────
   9. FORMULAIRE – AJOUT / MODIFICATION
────────────────────────────────────────────── */
function resetForm() {
  editingId = null;
  document.getElementById('editProductId').value = '';
  document.getElementById('productForm').reset();
  // Radio par défaut
  const noBadge = document.querySelector('input[name="fBadge"][value=""]');
  if (noBadge) noBadge.checked = true;
  // Réinitialiser images
  clearImage('mainPreview','mainImageInput','mainImageData','mainUploadPlaceholder','mainImgInfo');
  gallerySlots = [null,null,null,null];
  initGallerySlots();
  // Specs
  document.getElementById('specsContainer').innerHTML = '';
  setText('formTitle', 'إضافة منتج جديد');
  showSection('add-product');
}

function editProduct(id) {
  const p = PRODUCTS_DB.find(x => x.id === id);
  if (!p) return;
  editingId = id;
  document.getElementById('editProductId').value = id;
  setText('formTitle', 'تعديل المنتج');

  // Remplir les champs
  setVal('fName',          p.name        || '');
  setVal('fCategory',      p.category    || '');
  setVal('fPrice',         p.price       || '');
  setVal('fOriginalPrice', p.originalPrice || '');
  setVal('fStock',         p.stock       ?? '');
  setVal('fRating',        p.rating      || '');
  setVal('fReviews',       p.reviews     || '');
  setVal('fDescription',   p.description || '');
  setVal('fBadgeText',     p.badgeText   || '');
  setVal('fSizes',         (p.options?.size || []).join(', '));
  setVal('fColors',        (p.options?.color || []).join(', '));
  setChecked('fFeatured',   p.featured);
  setChecked('fBestseller', p.bestseller);

  // Badge radio
  const badgeEl = document.querySelector(`input[name="fBadge"][value="${p.badge||''}"]`);
  if (badgeEl) badgeEl.checked = true;

  // Image principale
  if (p.image) {
    const prev = document.getElementById('mainPreview');
    const ph   = document.getElementById('mainUploadPlaceholder');
    if (prev) { prev.src = p.image; prev.style.display = 'block'; }
    if (ph)   ph.style.display = 'none';
    setVal('mainImageData', p.image);
  }

  // Specs
  const container = document.getElementById('specsContainer');
  container.innerHTML = '';
  if (p.specs && typeof p.specs === 'object') {
    Object.entries(p.specs).forEach(([k,v]) => addSpecRow(k, v));
  }

  showSection('add-product');
}

function duplicateProduct(id) {
  const p = PRODUCTS_DB.find(x => x.id === id);
  if (!p) return;
  const copy = JSON.parse(JSON.stringify(p));
  copy.id   = generateId();
  copy.name = copy.name + ' (نسخة)';
  PRODUCTS_DB.push(copy);
  saveProducts();
  renderProductsTable();
  showToast('تم نسخ المنتج', 'success');
}

function saveProduct(e) {
  e.preventDefault();
  const product = collectFormData();
  if (!product) return;

  if (editingId) {
    const idx = PRODUCTS_DB.findIndex(x => x.id === editingId);
    if (idx !== -1) {
      PRODUCTS_DB[idx] = { ...PRODUCTS_DB[idx], ...product, id: editingId };
      showToast('تم تعديل المنتج بنجاح', 'success');
    }
  } else {
    product.id = generateId();
    PRODUCTS_DB.push(product);
    showToast('تم إضافة المنتج بنجاح', 'success');
  }

  saveProducts();
  renderProductsTable();
  resetForm();
  showSection('products');
}

function saveProductDraft() {
  const product = collectFormData(true);
  if (!product) return;
  const drafts = JSON.parse(localStorage.getItem(DRAFTS_KEY) || '[]');
  product.id   = product.id || generateId();
  product._draft = true;
  const idx = drafts.findIndex(d => d.id === product.id);
  if (idx !== -1) drafts[idx] = product; else drafts.push(product);
  localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
  showToast('تم الحفظ كمسودة', 'info');
}

function collectFormData(allowEmpty = false) {
  const name     = getVal('fName');
  const category = getVal('fCategory');
  const price    = parseFloat(getVal('fPrice'));

  if (!allowEmpty) {
    if (!name)        { showToast('أدخل اسم المنتج', 'error'); return null; }
    if (!category)    { showToast('اختر فئة المنتج', 'error'); return null; }
    if (isNaN(price)) { showToast('أدخل سعراً صحيحاً', 'error'); return null; }
  }

  // Collecte specs
  const specs = {};
  document.querySelectorAll('.spec-row').forEach(row => {
    const inputs = row.querySelectorAll('input');
    const k = inputs[0]?.value.trim();
    const v = inputs[1]?.value.trim();
    if (k && v) specs[k] = v;
  });

  // Images
  const mainImage = getVal('mainImageData') || getVal('fImageUrl') || '';
  const gallery   = gallerySlots.filter(Boolean);
  const allImages = [mainImage, ...gallery].filter(Boolean);

  // Badge
  const badgeEl = document.querySelector('input[name="fBadge"]:checked');
  const badge   = badgeEl?.value || '';

  return {
    name,
    category,
    price,
    originalPrice: parseFloat(getVal('fOriginalPrice')) || price,
    stock:         parseInt(getVal('fStock')) || 0,
    rating:        parseFloat(getVal('fRating')) || 4.0,
    reviews:       parseInt(getVal('fReviews')) || 0,
    description:   getVal('fDescription'),
    badge,
    badgeText:     getVal('fBadgeText'),
    featured:      document.getElementById('fFeatured')?.checked || false,
    bestseller:    document.getElementById('fBestseller')?.checked || false,
    image:         mainImage,
    images:        allImages,
    specs,
    options: {
      size:  getVal('fSizes').split(',').map(s => s.trim()).filter(Boolean),
      color: getVal('fColors').split(',').map(s => s.trim()).filter(Boolean),
    }
  };
}

/* ──────────────────────────────────────────────
   10. SPECS ROWS
────────────────────────────────────────────── */
function initSpecsRow() {
  addSpecRow();
}

function addSpecRow(key = '', value = '') {
  const container = document.getElementById('specsContainer');
  const row = document.createElement('div');
  row.className = 'spec-row';
  row.innerHTML = `
    <input class="field-input" type="text" placeholder="المواصفة (مثال: اللون)" value="${escHtml(key)}" style="flex:1"/>
    <input class="field-input" type="text" placeholder="القيمة (مثال: أسود)" value="${escHtml(value)}" style="flex:1"/>
    <button type="button" class="btn-icon danger" onclick="this.parentElement.remove()" title="حذف" aria-label="حذف هذه المواصفة">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>`;
  container.appendChild(row);
}

/* ──────────────────────────────────────────────
   11. GALERIE – SLOTS
────────────────────────────────────────────── */
function initGallerySlots() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;
  grid.innerHTML = '';
  for (let i = 0; i < 4; i++) {
    const slot = document.createElement('div');
    slot.className = 'gallery-slot';
    slot.id = `gallerySlot${i}`;
    slot.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
      <small>صورة ${i+1}</small>
      <input type="file" accept="image/*" style="display:none" id="galleryInput${i}" onchange="processGalleryImage(this, ${i})"/>`;
    slot.addEventListener('click', () => {
      if (!gallerySlots[i]) document.getElementById(`galleryInput${i}`).click();
    });
    grid.appendChild(slot);
  }
}

function processGalleryImage(input, idx) {
  const file = input.files[0];
  if (!file) return;
  const w = parseInt(document.getElementById('resizeW').value) || 800;
  const h = parseInt(document.getElementById('resizeH').value) || 800;
  const q = parseInt(document.getElementById('resizeQ').value) / 100 || 0.85;
  const fmt = document.querySelector('input[name="outputFmt"]:checked')?.value || 'image/jpeg';
  const crop = document.querySelector('input[name="cropMode"]:checked')?.value || 'cover';

  resizeImageFile(file, w, h, q, fmt, crop).then(result => {
    gallerySlots[idx] = result.dataUrl;
    const slot = document.getElementById(`gallerySlot${idx}`);
    if (!slot) return;

    // Supprimer ancien img si existant
    slot.querySelectorAll('img, button, svg, small').forEach(el => el.remove());

    const img = document.createElement('img');
    img.src = result.dataUrl;
    img.alt = `صورة ${idx+1}`;
    slot.appendChild(img);

    const delBtn = document.createElement('button');
    delBtn.className = 'gallery-slot-del';
    delBtn.innerHTML = '✕';
    delBtn.type = 'button';
    delBtn.setAttribute('aria-label', `حذف صورة ${idx+1}`);
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      clearGallerySlot(idx);
    });
    slot.appendChild(delBtn);

    updateGalleryData();
  }).catch(err => showToast('خطأ في معالجة الصورة: ' + err.message, 'error'));
}

function clearGallerySlot(idx) {
  gallerySlots[idx] = null;
  const slot = document.getElementById(`gallerySlot${idx}`);
  if (!slot) return;
  slot.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
    <small>صورة ${idx+1}</small>
    <input type="file" accept="image/*" style="display:none" id="galleryInput${idx}" onchange="processGalleryImage(this, ${idx})"/>`;
  slot.addEventListener('click', () => {
    if (!gallerySlots[idx]) document.getElementById(`galleryInput${idx}`).click();
  });
  updateGalleryData();
}

function updateGalleryData() {
  const data = gallerySlots.filter(Boolean);
  setVal('galleryImagesData', JSON.stringify(data));
}

/* ──────────────────────────────────────────────
   12. TRAITEMENT D'IMAGES – CORE ENGINE
────────────────────────────────────────────── */
/**
 * Redimensionne un fichier image avec Canvas API
 * @param {File}   file    - Fichier image
 * @param {number} targetW - Largeur cible
 * @param {number} targetH - Hauteur cible
 * @param {number} quality - Qualité 0-1
 * @param {string} format  - 'image/jpeg' | 'image/webp' | 'image/png'
 * @param {string} mode    - 'cover' | 'contain' | 'stretch'
 * @returns {Promise<{dataUrl, blob, width, height, originalSize, newSize}>}
 */
function resizeImageFile(file, targetW, targetH, quality = 0.85, format = 'image/jpeg', mode = 'cover') {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('الملف ليس صورة'));
      return;
    }
    const originalSize = file.size;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.getElementById('processCanvas') || document.createElement('canvas');
          canvas.width  = targetW;
          canvas.height = targetH;
          const ctx = canvas.getContext('2d');

          // Fond blanc pour JPEG (éviter fond noir)
          if (format === 'image/jpeg') {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, targetW, targetH);
          }

          // Calcul position & taille selon le mode
          let sx = 0, sy = 0, sw = img.width, sh = img.height;
          let dx = 0, dy = 0, dw = targetW, dh = targetH;

          if (mode === 'cover') {
            const srcRatio = img.width / img.height;
            const dstRatio = targetW / targetH;
            if (srcRatio > dstRatio) {
              // Recadrer en largeur
              sw = Math.round(img.height * dstRatio);
              sx = Math.round((img.width - sw) / 2);
            } else {
              // Recadrer en hauteur
              sh = Math.round(img.width / dstRatio);
              sy = Math.round((img.height - sh) / 2);
            }
          } else if (mode === 'contain') {
            const srcRatio = img.width / img.height;
            const dstRatio = targetW / targetH;
            if (srcRatio > dstRatio) {
              dh = Math.round(targetW / srcRatio);
              dy = Math.round((targetH - dh) / 2);
            } else {
              dw = Math.round(targetH * srcRatio);
              dx = Math.round((targetW - dw) / 2);
            }
          }
          // 'stretch' : pas de modification, on dessine directement

          // Algorithme de downscaling par étapes pour meilleure qualité
          if (img.width > targetW * 2 || img.height > targetH * 2) {
            ctx.drawImage(stepDownscale(img, targetW * 2, targetH * 2), sx, sy, sw, sh, dx, dy, dw, dh);
          } else {
            ctx.imageSmoothingEnabled  = true;
            ctx.imageSmoothingQuality  = 'high';
            ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
          }

          canvas.toBlob(blob => {
            const reader2 = new FileReader();
            reader2.onload = (ev) => {
              resolve({
                dataUrl:      ev.target.result,
                blob,
                width:        targetW,
                height:       targetH,
                originalSize,
                newSize:      blob.size,
                saved:        Math.round((1 - blob.size / originalSize) * 100),
              });
            };
            reader2.readAsDataURL(blob);
          }, format, quality);
        } catch(err) { reject(err); }
      };
      img.onerror = () => reject(new Error('تعذّر تحميل الصورة'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('تعذّر قراءة الملف'));
    reader.readAsDataURL(file);
  });
}

/**
 * Downscaling progressif pour éviter l'aliasing
 */
function stepDownscale(img, targetW, targetH) {
  let w = img.width;
  let h = img.height;
  const canvas = document.createElement('canvas');
  canvas.width  = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  while (w > targetW * 1.5 || h > targetH * 1.5) {
    w = Math.max(Math.floor(w / 1.5), targetW);
    h = Math.max(Math.floor(h / 1.5), targetH);
    const tmp = document.createElement('canvas');
    tmp.width  = w;
    tmp.height = h;
    const tc = tmp.getContext('2d');
    tc.imageSmoothingEnabled = true;
    tc.imageSmoothingQuality = 'high';
    tc.drawImage(canvas, 0, 0, w, h);
    canvas.width  = w;
    canvas.height = h;
    ctx.drawImage(tmp, 0, 0);
  }
  return canvas;
}

/* ──────────────────────────────────────────────
   13. IMAGE PROCESSING – FORMULAIRE PRODUIT
────────────────────────────────────────────── */
function processImage(input, previewId, dataId, slotType) {
  const file = input.files[0];
  if (!file) return;

  // Vérification taille (5 MB max)
  if (file.size > 5 * 1024 * 1024) {
    showToast('الحجم الأقصى للصورة هو 5 ميجابايت', 'error');
    return;
  }

  const w    = parseInt(document.getElementById('resizeW').value) || 800;
  const h    = parseInt(document.getElementById('resizeH').value) || 800;
  const q    = parseInt(document.getElementById('resizeQ').value) / 100 || 0.85;
  const fmt  = document.querySelector('input[name="outputFmt"]:checked')?.value || 'image/jpeg';
  const crop = document.querySelector('input[name="cropMode"]:checked')?.value || 'cover';

  showToast('جاري معالجة الصورة...', 'info');

  resizeImageFile(file, w, h, q, fmt, crop).then(result => {
    // Afficher la prévisualisation
    const preview = document.getElementById(previewId);
    const ph      = document.getElementById('mainUploadPlaceholder');
    if (preview) { preview.src = result.dataUrl; preview.style.display = 'block'; }
    if (ph)      ph.style.display = 'none';

    // Stocker la valeur
    setVal(dataId, result.dataUrl);

    // Afficher les infos
    showImageInfo(result, previewId === 'mainPreview' ? 'main' : slotType);
  }).catch(err => {
    showToast('خطأ في معالجة الصورة: ' + err.message, 'error');
  });
}

function showImageInfo(result, prefix) {
  const infoBar = document.getElementById(`${prefix}ImgInfo`);
  if (!infoBar) return;
  infoBar.style.display = 'block';
  setText(`${prefix}ImgOrigSize`, formatBytes(result.originalSize));
  setText(`${prefix}ImgNewSize`,  formatBytes(result.newSize) + (result.saved > 0 ? ` (−${result.saved}%)` : ''));
  setText(`${prefix}ImgDims`,     `${result.width}×${result.height} px`);
}

function clearImage(previewId, inputId, dataId, placeholderId, infoId) {
  const prev = document.getElementById(previewId);
  const inp  = document.getElementById(inputId);
  const ph   = document.getElementById(placeholderId);
  const info = document.getElementById(infoId);

  if (prev)  { prev.src = ''; prev.style.display = 'none'; }
  if (inp)   inp.value = '';
  if (ph)    ph.style.display = 'flex';
  if (info)  info.style.display = 'none';
  setVal(dataId, '');
}

function previewExternalUrl() {
  const url = getVal('fImageUrl').trim();
  if (!url) { showToast('أدخل رابط صورة', 'error'); return; }
  const prev = document.getElementById('mainPreview');
  const ph   = document.getElementById('mainUploadPlaceholder');
  if (prev) {
    prev.src = url;
    prev.style.display = 'block';
    prev.onerror = () => { showToast('تعذّر تحميل الصورة من الرابط', 'error'); };
  }
  if (ph) ph.style.display = 'none';
  setVal('mainImageData', url);
  showToast('تم تعيين الصورة من الرابط', 'success');
}

/* ──────────────────────────────────────────────
   14. DRAG & DROP
────────────────────────────────────────────── */
function handleDragOver(e, zoneId) {
  e.preventDefault();
  e.stopPropagation();
  document.getElementById(zoneId)?.classList.add('drag-over');
}
function handleDragLeave(zoneId) {
  document.getElementById(zoneId)?.classList.remove('drag-over');
}
function handleDrop(e, inputId, slotType) {
  e.preventDefault();
  document.querySelectorAll('.upload-zone').forEach(z => z.classList.remove('drag-over'));
  const file = e.dataTransfer.files[0];
  if (!file) return;
  const input = document.getElementById(inputId);
  const dt = new DataTransfer();
  dt.items.add(file);
  input.files = dt.files;
  processImage(input, 'mainPreview', 'mainImageData', slotType);
}
function handleJsonDrop(e) {
  e.preventDefault();
  document.getElementById('importZone')?.classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (!file || !file.name.endsWith('.json')) { showToast('الملف يجب أن يكون JSON', 'error'); return; }
  const reader = new FileReader();
  reader.onload = ev => { setVal('jsonPasteArea', ev.target.result); };
  reader.readAsText(file, 'UTF-8');
}
function handleToolDrop(e) {
  e.preventDefault();
  document.getElementById('toolZone')?.classList.remove('drag-over');
  const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
  if (!files.length) { showToast('الملفات يجب أن تكون صوراً', 'error'); return; }
  loadToolImagesFromFiles(files);
}

/* ──────────────────────────────────────────────
   15. PRESETS
────────────────────────────────────────────── */
function selectPreset(btn, preset) {
  document.querySelectorAll('#section-add-product .preset-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentPreset = preset;
  const p = IMAGE_PRESETS[preset];
  if (!p) return;
  setVal('resizeW', p.w);
  setVal('resizeH', p.h);
  setVal('resizeQ', p.q);
}

function selectToolPreset(btn, preset) {
  document.querySelectorAll('#section-image-tools .preset-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentToolPreset = preset;
  const p = IMAGE_PRESETS[preset];
  if (!p) return;
  setVal('toolW', p.w);
  setVal('toolH', p.h);
  setVal('toolQ', p.q);
}

/* ──────────────────────────────────────────────
   16. IMAGE TOOLS – SECTION DÉDIÉE
────────────────────────────────────────────── */
function loadToolImages(input) {
  const files = Array.from(input.files).filter(f => f.type.startsWith('image/'));
  if (!files.length) return;
  loadToolImagesFromFiles(files);
}

function loadToolImagesFromFiles(files) {
  if (files.length > 20) { showToast('الحد الأقصى 20 صورة', 'error'); files = files.slice(0, 20); }
  toolImages = files.map(f => ({ name: f.name, file: f, original: null, processed: null }));
  showToast(`تم تحميل ${files.length} صورة`, 'success');
  renderToolResultsSkeleton();
}

function renderToolResultsSkeleton() {
  const grid = document.getElementById('toolResultsGrid');
  if (!grid) return;
  grid.innerHTML = toolImages.map((_, i) => `
    <div class="tool-result-card skeleton" id="toolCard${i}">
      <div style="aspect-ratio:1;background:var(--gray-200);display:flex;align-items:center;justify-content:center;color:var(--gray-400)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="30" height="30"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
      </div>
      <div class="tool-result-info">
        <div class="tool-result-name">${escHtml(toolImages[i].name)}</div>
        <div class="tool-result-size">في انتظار المعالجة...</div>
      </div>
    </div>`).join('');
}

async function processAllToolImages() {
  if (!toolImages.length) { showToast('ارفع صوراً أولاً', 'error'); return; }
  const w    = parseInt(getVal('toolW'))  || 800;
  const h    = parseInt(getVal('toolH'))  || 800;
  const q    = parseInt(getVal('toolQ'))  / 100 || 0.85;
  const fmt  = document.querySelector('input[name="toolFmt"]:checked')?.value  || 'image/jpeg';
  const crop = document.querySelector('input[name="toolCrop"]:checked')?.value || 'cover';

  showToast(`جاري معالجة ${toolImages.length} صورة...`, 'info');

  for (let i = 0; i < toolImages.length; i++) {
    try {
      const result = await resizeImageFile(toolImages[i].file, w, h, q, fmt, crop);
      toolImages[i].processed = result;
      renderToolCard(i, result);
    } catch(err) {
      const card = document.getElementById(`toolCard${i}`);
      if (card) card.innerHTML = `<div style="padding:12px;color:var(--red);font-size:.75rem">خطأ: ${err.message}</div>`;
    }
  }

  const dlBtn = document.getElementById('downloadAllBtn');
  if (dlBtn && toolImages.some(t => t.processed)) dlBtn.style.display = 'inline-flex';
  showToast('تمت معالجة جميع الصور', 'success');
}

function renderToolCard(i, result) {
  const card = document.getElementById(`toolCard${i}`);
  if (!card) return;
  const ext    = result.blob.type.split('/')[1];
  const dlName = toolImages[i].name.replace(/\.[^.]+$/, '') + `_${result.width}x${result.height}.${ext}`;
  card.innerHTML = `
    <img src="${result.dataUrl}" alt="${escHtml(toolImages[i].name)}" class="tool-result-img" loading="lazy"/>
    <div class="tool-result-info">
      <div class="tool-result-name">${escHtml(toolImages[i].name)}</div>
      <div class="tool-result-size">
        ${formatBytes(result.originalSize)}
        <span style="color:var(--gray-400)">→</span>
        ${formatBytes(result.newSize)}
        ${result.saved > 0 ? `<span class="saved">−${result.saved}%</span>` : ''}
      </div>
      <div class="tool-result-size" style="margin-top:2px">${result.width}×${result.height} px · ${ext.toUpperCase()}</div>
      <div class="tool-result-actions">
        <a href="${result.dataUrl}" download="${dlName}" class="btn-download">تحميل</a>
        <button type="button" class="btn-remove" onclick="removeToolImage(${i})">حذف</button>
      </div>
    </div>`;
}

function removeToolImage(i) {
  toolImages.splice(i, 1);
  if (!toolImages.length) {
    document.getElementById('toolResultsGrid').innerHTML = `
      <div class="empty-tools">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        <p>ارفع صوراً للبدء</p>
      </div>`;
    const dlBtn = document.getElementById('downloadAllBtn');
    if (dlBtn) dlBtn.style.display = 'none';
  } else {
    renderToolResultsSkeleton();
  }
}

function downloadAllToolImages() {
  const processed = toolImages.filter(t => t.processed);
  if (!processed.length) { showToast('لا توجد صور محوّلة', 'error'); return; }
  // Télécharger chaque image séparément (ZIP nécessite lib externe)
  processed.forEach((t, i) => {
    const ext    = t.processed.blob.type.split('/')[1];
    const dlName = t.name.replace(/\.[^.]+$/, '') + `_${t.processed.width}x${t.processed.height}.${ext}`;
    const a = document.createElement('a');
    a.href     = t.processed.dataUrl;
    a.download = dlName;
    a.click();
  });
  showToast(`تم تحميل ${processed.length} صورة`, 'success');
}

/* ──────────────────────────────────────────────
   17. SUPPRESSION
────────────────────────────────────────────── */
function openDeleteModal(id) {
  deleteTargetId = id;
  const p = PRODUCTS_DB.find(x => x.id === id);
  const msg = document.getElementById('deleteModalMsg');
  if (msg && p) msg.textContent = `هل أنت متأكد من حذف "${p.name}"؟ لا يمكن التراجع.`;
  document.getElementById('deleteModal').style.display = 'flex';
}
function closeDeleteModal() {
  deleteTargetId = null;
  document.getElementById('deleteModal').style.display = 'none';
}
function confirmDelete() {
  if (deleteTargetId === null) return;
  PRODUCTS_DB = PRODUCTS_DB.filter(p => p.id !== deleteTargetId);
  saveProducts();
  renderProductsTable();
  renderDashboard();
  closeDeleteModal();
  showToast('تم حذف المنتج', 'success');
}

/* ──────────────────────────────────────────────
   18. IMPORT / EXPORT
────────────────────────────────────────────── */
function importFromJson(input) {
  const file = input.files[0];
  if (!file) return;
  if (!file.name.endsWith('.json')) { showToast('الملف يجب أن يكون بصيغة JSON', 'error'); return; }
  const reader = new FileReader();
  reader.onload = (e) => { setVal('jsonPasteArea', e.target.result); showToast('تم تحميل الملف، اضغط استيراد', 'info'); };
  reader.readAsText(file, 'UTF-8');
}

function runJsonImport() {
  const raw = getVal('jsonPasteArea').trim();
  if (!raw) { showFeedback('الرجاء لصق بيانات JSON أو تحميل ملف', 'error'); return; }

  let data;
  try {
    data = JSON.parse(raw);
  } catch(e) {
    showFeedback('خطأ في صياغة JSON: ' + e.message, 'error');
    return;
  }

  if (!Array.isArray(data)) {
    // Essayer d'envelopper si c'est un objet unique
    if (typeof data === 'object' && data !== null) data = [data];
    else { showFeedback('يجب أن تكون البيانات مصفوفة JSON', 'error'); return; }
  }

  // Validation & normalisation
  const valid = [], errors = [];
  data.forEach((item, idx) => {
    if (!item.name || !item.category || item.price === undefined) {
      errors.push(`العنصر ${idx+1}: يجب أن يحتوي على name, category, price`);
      return;
    }
    valid.push(normalizeProduct(item));
  });

  const merge     = document.getElementById('mergeModeCheck')?.checked;
  const skipDups  = document.getElementById('skipDuplicatesCheck')?.checked;

  let added = 0, skipped = 0;

  if (merge) {
    valid.forEach(p => {
      const exists = PRODUCTS_DB.find(x => x.id === p.id || x.name === p.name);
      if (exists && skipDups) { skipped++; return; }
      if (exists) {
        const idx = PRODUCTS_DB.indexOf(exists);
        PRODUCTS_DB[idx] = { ...exists, ...p };
        added++;
      } else {
        if (!p.id) p.id = generateId();
        PRODUCTS_DB.push(p);
        added++;
      }
    });
  } else {
    PRODUCTS_DB = valid.map(p => ({ ...p, id: p.id || generateId() }));
    added = valid.length;
  }

  saveProducts();
  renderProductsTable();
  renderDashboard();
  refreshExportPreview();

  let msg = `✓ تم استيراد ${added} منتج`;
  if (skipped) msg += ` · تم تخطي ${skipped} مكرر`;
  if (errors.length) msg += `\n⚠ ${errors.length} أخطاء: ${errors.slice(0,3).join(' | ')}`;
  showFeedback(msg, errors.length && !added ? 'error' : 'success');
  showToast(`تم استيراد ${added} منتج`, 'success');
}

function validateJson() {
  const raw = getVal('jsonPasteArea').trim();
  if (!raw) { showFeedback('لا توجد بيانات للتحقق منها', 'error'); return; }
  try {
    const data = JSON.parse(raw);
    const count = Array.isArray(data) ? data.length : 1;
    showFeedback(`✓ JSON صحيح – ${count} عنصر`, 'success');
  } catch(e) {
    showFeedback(`✗ خطأ في JSON: ${e.message}`, 'error');
  }
}

function normalizeProduct(raw) {
  return {
    id:            raw.id            || null,
    name:          String(raw.name   || '').trim(),
    category:      raw.category      || 'other',
    price:         parseFloat(raw.price)         || 0,
    originalPrice: parseFloat(raw.originalPrice) || parseFloat(raw.price) || 0,
    image:         raw.image         || raw.images?.[0] || '',
    images:        Array.isArray(raw.images) ? raw.images : (raw.image ? [raw.image] : []),
    rating:        parseFloat(raw.rating)  || 4.0,
    reviews:       parseInt(raw.reviews)   || 0,
    stock:         parseInt(raw.stock)     ?? 0,
    badge:         raw.badge         || '',
    badgeText:     raw.badgeText     || '',
    description:   raw.description   || '',
    featured:      Boolean(raw.featured),
    bestseller:    Boolean(raw.bestseller),
    specs:         (raw.specs && typeof raw.specs === 'object') ? raw.specs : {},
    options: {
      size:  Array.isArray(raw.options?.size)  ? raw.options.size  : [],
      color: Array.isArray(raw.options?.color) ? raw.options.color : [],
    }
  };
}

function exportProducts() {
  const data = JSON.stringify(PRODUCTS_DB, null, 2);
  downloadText(data, 'wasalak-products.json', 'application/json');
  showToast('تم تصدير المنتجات (JSON)', 'success');
}

function exportMinified() {
  const data = JSON.stringify(PRODUCTS_DB);
  downloadText(data, 'wasalak-products.min.json', 'application/json');
  showToast('تم تصدير JSON المضغوط', 'success');
}

function exportCSV() {
  const headers = ['id','name','category','price','originalPrice','stock','rating','reviews','badge','badgeText','featured','bestseller','image','description'];
  const rows = PRODUCTS_DB.map(p =>
    headers.map(h => {
      const v = p[h] ?? '';
      return `"${String(v).replace(/"/g,'""')}"`;
    }).join(',')
  );
  const csv = '\uFEFF' + headers.join(',') + '\n' + rows.join('\n'); // BOM pour Excel
  downloadText(csv, 'wasalak-products.csv', 'text/csv;charset=utf-8');
  showToast('تم تصدير CSV (متوافق مع Excel)', 'success');
}

function downloadText(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function refreshExportPreview() {
  const preview = document.getElementById('exportPreview');
  if (!preview) return;
  const limited = PRODUCTS_DB.slice(0, 3);
  preview.value = JSON.stringify(limited, null, 2) + (PRODUCTS_DB.length > 3 ? '\n// ... ' + (PRODUCTS_DB.length - 3) + ' منتج آخر' : '');
}

function showFeedback(msg, type = 'info') {
  const el = document.getElementById('importFeedback');
  if (!el) return;
  el.style.display = 'block';
  el.className     = 'import-feedback ' + type;
  el.textContent   = msg;
}

/* ──────────────────────────────────────────────
   19. UTILITAIRES
────────────────────────────────────────────── */
function generateId() {
  return PRODUCTS_DB.length > 0
    ? Math.max(...PRODUCTS_DB.map(p => p.id || 0)) + 1
    : 1;
}

function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  if (bytes < 1024)        return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function escHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}
function getVal(id) {
  const el = document.getElementById(id);
  return el ? el.value : '';
}
function setVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val;
}
function setChecked(id, val) {
  const el = document.getElementById(id);
  if (el) el.checked = Boolean(val);
}

/* ── Toast ── */
let toastTimer = null;
function showToast(msg, type = '') {
  const toast = document.getElementById('adminToast');
  if (!toast) return;
  toast.textContent = msg;
  toast.className   = 'admin-toast show ' + type;
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ── Fermer modal au clic extérieur ── */
document.getElementById('deleteModal')?.addEventListener('click', function(e) {
  if (e.target === this) closeDeleteModal();
});

/* ── Fermer sidebar au clic extérieur sur mobile ── */
document.addEventListener('click', function(e) {
  const sidebar = document.getElementById('sidebar');
  const toggle  = document.querySelector('.menu-toggle');
  if (window.innerWidth <= 768 && sidebar?.classList.contains('open')) {
    if (!sidebar.contains(e.target) && !toggle?.contains(e.target)) {
      closeSidebar();
    }
  }
});
