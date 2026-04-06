/* ============================================================
   وصلك — wasalak.com | المنطق البرمجي الكامل
   Version 2.0 | Optimisé & Percutant
   ============================================================ */

'use strict';

/* ── SVG Icons Library ─────────────────────────────────────── */
const ICONS = {
  star:        `<svg width="14" height="14" viewBox="0 0 24 24" fill="#f0a500" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  starHalf:    `<svg width="14" height="14" viewBox="0 0 24 24"><defs><linearGradient id="hg"><stop offset="50%" stop-color="#f0a500"/><stop offset="50%" stop-color="#ddd"/></linearGradient></defs><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="url(#hg)" stroke="none"/></svg>`,
  starEmpty:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="#ddd" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  starBig:     `<svg width="18" height="18" viewBox="0 0 24 24" fill="#f0a500" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  starBigEmpty:`<svg width="18" height="18" viewBox="0 0 24 24" fill="#ddd" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  cart:        `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>`,
  eye:         `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  heart:       `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
  heartFilled: `<svg width="16" height="16" viewBox="0 0 24 24" fill="#e53e3e" stroke="#e53e3e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
  check:       `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  checkCircle: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a6b3c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  truck:       `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  bolt:        `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  package:     `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
  shield:      `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
  refresh:     `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>`,
  wallet:      `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><circle cx="17" cy="15" r="1" fill="currentColor" stroke="none"/></svg>`,
  map:         `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  send:        `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
  whatsapp:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
  search:      `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  fire:        `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f0a500" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 01-7 7 7 7 0 01-7-7c0-1.79.46-3.47 1.25-4.95.69.76 1.41 1.44 2.25 1.95z"/></svg>`,
  new_badge:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a6b3c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  clock:       `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  user:        `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  tag:         `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`,
  plus:        `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  minus:       `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  chevronLeft: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
  chevronRight:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  x:           `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  info:        `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
};

/* ── Products Database ────────────────────────────────────── */
const PRODUCTS_DB = [
  {
    id: 1,
    name: "سماعة بلوتوث لاسلكية عالية الجودة",
    category: "electronics",
    price: 89, originalPrice: 120,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&q=80",
      "https://images.unsplash.com/photo-1524678714210-9917a6c619c2?w=400&q=80"
    ],
    rating: 4.8, reviews: 124, stock: 15,
    badge: "sale", badgeText: "خصم 26%",
    description: "سماعة بلوتوث لاسلكية بجودة صوت استثنائية وعزل ضجيج متقدم. بطارية تدوم 30 ساعة.",
    featured: true, bestseller: true,
    specs: { "نوع الاتصال": "بلوتوث 5.0", "عمر البطارية": "30 ساعة", "مدى التشغيل": "10 متر", "وزن السماعة": "250 غرام" },
    options: { size: [], color: ["أسود", "أبيض", "أزرق"] }
  },
  {
    id: 2,
    name: "ساعة ذكية رياضية مقاومة للماء",
    category: "electronics",
    price: 145, originalPrice: 200,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80"
    ],
    rating: 4.6, reviews: 89, stock: 8,
    badge: "new", badgeText: "جديد",
    description: "ساعة ذكية رياضية مع تتبع النشاط البدني ومراقبة معدل ضربات القلب.",
    featured: true, bestseller: true,
    specs: { "مقاومة الماء": "IP68", "عمر البطارية": "7 أيام", "الشاشة": "AMOLED 1.4 بوصة" },
    options: { size: ["صغير", "كبير"], color: ["أسود", "فضي", "ذهبي"] }
  },
  {
    id: 3,
    name: "حقيبة جلد أصلي فاخرة",
    category: "fashion",
    price: 65, originalPrice: 65,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80",
    images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80"],
    rating: 4.9, reviews: 56, stock: 20,
    badge: "hot", badgeText: "رائج",
    description: "حقيبة يد نسائية من الجلد الأصلي، تصميم عصري أنيق مناسب للمناسبات.",
    featured: true, bestseller: false,
    specs: { "المادة": "جلد أصلي", "الأبعاد": "30×12×20 سم", "الأحزمة": "قابل للتعديل" },
    options: { size: [], color: ["بني", "أسود", "بيج"] }
  },
  {
    id: 4,
    name: "مجموعة أدوات مطبخ ستانلس ستيل",
    category: "home",
    price: 55, originalPrice: 75,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
    images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80"],
    rating: 4.5, reviews: 203, stock: 30,
    badge: "sale", badgeText: "وفر 27%",
    description: "مجموعة أدوات مطبخ من الستانلس ستيل عالي الجودة، 8 قطع ضرورية لكل مطبخ.",
    featured: false, bestseller: true,
    specs: { "عدد القطع": "8 قطع", "المادة": "ستانلس ستيل 304", "قابل للغسل": "نعم" },
    options: { size: [], color: ["فضي"] }
  },
  {
    id: 5,
    name: "كريم مرطب للبشرة الطبيعي",
    category: "beauty",
    price: 35, originalPrice: 45,
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4b38a07?w=400&q=80",
    images: ["https://images.unsplash.com/photo-1570194065650-d99fb4b38a07?w=400&q=80"],
    rating: 4.7, reviews: 341, stock: 50,
    badge: "new", badgeText: "جديد",
    description: "كريم مرطب طبيعي 100% من مستخلصات النباتات الليبية. مناسب لجميع أنواع البشرة.",
    featured: false, bestseller: true,
    specs: { "الحجم": "200 مل", "المكونات": "طبيعية 100%", "مناسب لـ": "جميع أنواع البشرة" },
    options: { size: ["50مل", "100مل", "200مل"], color: [] }
  },
  {
    id: 6,
    name: "حذاء رياضي مريح للجري",
    category: "sports",
    price: 120, originalPrice: 150,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80"],
    rating: 4.4, reviews: 178, stock: 12,
    badge: "sale", badgeText: "خصم 20%",
    description: "حذاء رياضي مصنوع من مواد عالية الجودة لراحة قصوى أثناء الجري والرياضة.",
    featured: true, bestseller: true,
    specs: { "النوع": "رجالي", "الحشوة": "إسفنج عالي الارتداد" },
    options: { size: ["40","41","42","43","44","45"], color: ["أسود","أبيض","رمادي"] }
  },
  {
    id: 7,
    name: "مروحة USB صامتة للمكتب",
    category: "electronics",
    price: 28, originalPrice: 35,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80",
    images: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80"],
    rating: 4.3, reviews: 92, stock: 25,
    badge: null, badgeText: "",
    description: "مروحة USB صامتة وصغيرة مثالية للمكتب والمنزل. 3 سرعات قابلة للتعديل.",
    featured: false, bestseller: false,
    specs: { "التوصيل": "USB", "السرعات": "3 مستويات", "ضوء ليلي": "نعم" },
    options: { size: [], color: ["أسود","أبيض","أزرق"] }
  },
  {
    id: 8,
    name: "عطر عود ليبي أصيل",
    category: "beauty",
    price: 95, originalPrice: 95,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&q=80",
    images: ["https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&q=80"],
    rating: 5.0, reviews: 67, stock: 7,
    badge: "hot", badgeText: "الأكثر طلباً",
    description: "عطر عود ليبي أصيل من أفضل أنواع العود العربي. رائحة قوية تدوم طويلاً.",
    featured: true, bestseller: true,
    specs: { "الحجم": "100 مل", "النوع": "عطر رجالي/نسائي", "المنشأ": "ليبيا" },
    options: { size: ["50مل","100مل"], color: [] }
  }
];

/* ── Sale Notifications ───────────────────────────────────── */
const SALE_NOTIFICATIONS = [
  { city: "طرابلس",  product: "اشترى للتو سماعة بلوتوث",     time: "منذ دقيقتين" },
  { city: "بنغازي",  product: "اشترى للتو ساعة ذكية",         time: "منذ 5 دقائق" },
  { city: "مصراتة",  product: "اشترت للتو حقيبة جلد فاخرة",   time: "منذ 8 دقائق" },
  { city: "الزاوية", product: "اشترى للتو أدوات مطبخ",         time: "منذ 3 دقائق" },
  { city: "طبرق",    product: "اشترت للتو كريم مرطب",          time: "منذ دقيقة" },
  { city: "سرت",     product: "اشترى للتو حذاء رياضي",         time: "منذ 6 دقائق" },
  { city: "الخمس",   product: "اشترى للتو عطر عود أصيل",       time: "منذ 4 دقائق" },
  { city: "زليتن",   product: "اشترت للتو مجموعة مطبخ",        time: "منذ 9 دقائق" }
];

/* ── Delivery Zones ───────────────────────────────────────── */
const DELIVERY_ZONES = {
  tripoli:   { time: "24-48 ساعة",      cost: "مجاني فوق 150 د.ل | 10 د.ل", zone: "A" },
  janzur:    { time: "24-48 ساعة",      cost: "مجاني فوق 150 د.ل | 10 د.ل", zone: "A" },
  tajura:    { time: "24-48 ساعة",      cost: "مجاني فوق 150 د.ل | 10 د.ل", zone: "A" },
  "ain-zara":{ time: "24-48 ساعة",      cost: "مجاني فوق 150 د.ل | 10 د.ل", zone: "A" },
  benghazi:  { time: "3-5 أيام عمل",    cost: "15 د.ل", zone: "B" },
  misrata:   { time: "2-4 أيام عمل",    cost: "12 د.ل", zone: "B" },
  zawiya:    { time: "2-3 أيام عمل",    cost: "12 د.ل", zone: "B" },
  zliten:    { time: "3-4 أيام عمل",    cost: "15 د.ل", zone: "B" },
  khoms:     { time: "2-3 أيام عمل",    cost: "12 د.ل", zone: "B" },
  derna:     { time: "4-6 أيام عمل",    cost: "18 د.ل", zone: "B" },
  bayda:     { time: "4-5 أيام عمل",    cost: "18 د.ل", zone: "B" },
  tobruk:    { time: "5-7 أيام عمل",    cost: "20 د.ل", zone: "B" },
  zintan:    { time: "3-4 أيام عمل",    cost: "15 د.ل", zone: "B" },
  gharyan:   { time: "2-3 أيام عمل",    cost: "12 د.ل", zone: "B" },
  sebha:     { time: "5-7 أيام عمل",    cost: "25 د.ل", zone: "C" },
  murzuq:    { time: "7-10 أيام عمل",   cost: "30 د.ل", zone: "C" },
  kufra:     { time: "10-14 يوم",        cost: "اتصل بنا", zone: "C" },
  ghat:      { time: "8-12 يوم",         cost: "اتصل بنا", zone: "C" },
  other:     { time: "يتم التأكيد بعد الطلب", cost: "يتم التحديد لاحقاً", zone: "C" }
};

/* ── State ────────────────────────────────────────────────── */
let cart             = JSON.parse(localStorage.getItem('wasalak_cart')) || [];
let currentProduct   = null;
let reviewStarSelected = 0;
let currentPage      = 1;
let filteredProducts = [...PRODUCTS_DB];
let currentView      = 'grid';
const ITEMS_PER_PAGE = 12;

/* ═══════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  initPage();
  initScrollBehavior();
  if (document.getElementById('saleNotification')) {
    setTimeout(startSaleNotifications, 4000);
  }
});

function initPage() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  if (page === 'index.html' || page === '') {
    renderFeaturedProducts();
    renderBestsellers();
    initCategoryTabs();
    initPromoTimer();
  } else if (page === 'catalog.html') {
    renderCatalogProducts();
  } else if (page === 'product.html') {
    loadProductDetail();
  } else if (page === 'checkout.html') {
    renderOrderSummary();
    initPaymentOptions();
  }
}

/* ═══════════════════════════════════════════════════════════
   STAR BUILDER
═══════════════════════════════════════════════════════════ */
function buildStars(rating, big = false) {
  const filled = big ? ICONS.starBig : ICONS.star;
  const empty  = big ? ICONS.starBigEmpty : ICONS.starEmpty;
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (rating >= i)          html += filled;
    else if (rating >= i-0.5) html += ICONS.starHalf;
    else                       html += empty;
  }
  return html;
}

/* ═══════════════════════════════════════════════════════════
   PRODUCT CARD — Design Percutant & Vendeur
═══════════════════════════════════════════════════════════ */
function buildProductCard(product) {
  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  /* Badge */
  const badgeMap = {
    sale: `<span class="p-badge p-badge-sale">${ICONS.tag} ${product.badgeText}</span>`,
    new:  `<span class="p-badge p-badge-new">${ICONS.new_badge} ${product.badgeText}</span>`,
    hot:  `<span class="p-badge p-badge-hot">${ICONS.fire} ${product.badgeText}</span>`
  };
  const badge = product.badge ? badgeMap[product.badge] || '' : '';

  /* Stock urgency */
  const urgency = product.stock <= 5
    ? `<div class="p-urgency">${ICONS.clock} آخر ${product.stock} قطع فقط!</div>` : '';

  /* Wishlist state */
  const wished = (JSON.parse(localStorage.getItem('wasalak_wishlist')) || []).includes(product.id);

  return `
<div class="product-card" data-id="${product.id}">
  <div class="p-img-wrap">
    <img
      src="${product.image}"
      alt="${product.name}"
      loading="lazy"
      onerror="this.src='https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&q=80'"
    />
    <div class="p-badges">${badge}</div>
    <button
      class="p-wish ${wished ? 'wished' : ''}"
      onclick="toggleWishlist(${product.id}, this)"
      aria-label="إضافة للمفضلة"
    >
      ${wished ? ICONS.heartFilled : ICONS.heart}
    </button>
    <div class="p-overlay">
      <a href="product.html?id=${product.id}" class="p-quick-view">
        ${ICONS.eye} عرض سريع
      </a>
    </div>
  </div>

  <div class="p-body">
    <div class="p-cat">${getCategoryName(product.category)}</div>
    <h3 class="p-name">
      <a href="product.html?id=${product.id}">${product.name}</a>
    </h3>
    <div class="p-stars">
      ${buildStars(product.rating)}
      <span class="p-reviews">(${product.reviews})</span>
    </div>
    ${urgency}
    <div class="p-price-row">
      <div class="p-prices">
        <span class="p-price">${product.price} د.ل</span>
        ${product.originalPrice > product.price
          ? `<span class="p-old">${product.originalPrice} د.ل</span>` : ''}
        ${discount > 0
          ? `<span class="p-disc">-${discount}%</span>` : ''}
      </div>
    </div>
    <div class="p-actions">
      <button class="p-btn-cart" onclick="addToCart(${product.id})">
        ${ICONS.cart} أضف للسلة
      </button>
      <a href="product.html?id=${product.id}" class="p-btn-view">
        ${ICONS.eye}
      </a>
    </div>
  </div>
</div>`;
}

/* ── CSS des cartes (injecté une seule fois) ── */
(function injectCardStyles() {
  if (document.getElementById('wasalak-card-styles')) return;
  const s = document.createElement('style');
  s.id = 'wasalak-card-styles';
  s.textContent = `
    /* ── Product Card ── */
    .product-card {
      background:#fff; border-radius:14px; overflow:hidden;
      box-shadow:0 2px 10px rgba(0,0,0,.06);
      transition:transform .25s,box-shadow .25s;
      display:flex; flex-direction:column;
    }
    .product-card:hover {
      transform:translateY(-5px);
      box-shadow:0 12px 32px rgba(26,107,60,.13);
    }
    .p-img-wrap {
      position:relative; aspect-ratio:1/1;
      overflow:hidden; background:#f5f5f5;
    }
    .p-img-wrap img {
      width:100%; height:100%; object-fit:cover;
      transition:transform .4s;
    }
    .product-card:hover .p-img-wrap img { transform:scale(1.06); }
    .p-badges { position:absolute; top:10px; right:10px; display:flex; flex-direction:column; gap:5px; }
    .p-badge {
      display:inline-flex; align-items:center; gap:4px;
      padding:3px 9px; border-radius:6px;
      font-size:.68rem; font-weight:800; line-height:1.4;
    }
    .p-badge svg { flex-shrink:0; }
    .p-badge-sale { background:#e53e3e; color:#fff; }
    .p-badge-new  { background:#1a6b3c; color:#fff; }
    .p-badge-hot  { background:#f0a500; color:#111; }
    .p-wish {
      position:absolute; top:10px; left:10px;
      width:32px; height:32px; border-radius:50%;
      background:rgba(255,255,255,.92); border:none; cursor:pointer;
      display:flex; align-items:center; justify-content:center;
      box-shadow:0 2px 8px rgba(0,0,0,.12);
      transition:transform .2s, background .2s;
    }
    .p-wish:hover { transform:scale(1.15); background:#fff; }
    .p-wish.wished { background:#fff0f0; }
    .p-overlay {
      position:absolute; inset:0;
      background:rgba(0,0,0,.35);
      display:flex; align-items:center; justify-content:center;
      opacity:0; transition:opacity .25s;
    }
    .product-card:hover .p-overlay { opacity:1; }
    .p-quick-view {
      display:inline-flex; align-items:center; gap:7px;
      background:#fff; color:#111;
      padding:9px 18px; border-radius:30px;
      font-size:.82rem; font-weight:700;
      text-decoration:none;
      font-family:'Cairo',sans-serif;
      transition:background .2s, transform .2s;
    }
    .p-quick-view:hover { background:#f0a500; transform:scale(1.04); }
    .p-body { padding:14px; display:flex; flex-direction:column; flex:1; }
    .p-cat {
      font-size:.7rem; font-weight:700; color:#1a6b3c;
      text-transform:uppercase; letter-spacing:.4px; margin-bottom:5px;
    }
    .p-name { font-size:.92rem; font-weight:700; color:#111; margin-bottom:7px; line-height:1.4; }
    .p-name a { color:inherit; text-decoration:none; }
    .p-name a:hover { color:#1a6b3c; }
    .p-stars { display:flex; align-items:center; gap:2px; margin-bottom:7px; }
    .p-reviews { font-size:.72rem; color:#999; margin-right:4px; }
    .p-urgency {
      display:inline-flex; align-items:center; gap:5px;
      font-size:.72rem; font-weight:700; color:#e53e3e;
      background:#fff0f0; padding:3px 9px; border-radius:6px;
      margin-bottom:8px; width:fit-content;
    }
    .p-urgency svg { stroke:#e53e3e; }
    .p-price-row { margin-bottom:10px; }
    .p-prices { display:flex; align-items:center; gap:7px; flex-wrap:wrap; }
    .p-price { font-size:1.1rem; font-weight:900; color:#1a6b3c; }
    .p-old { font-size:.8rem; color:#bbb; text-decoration:line-through; }
    .p-disc {
      font-size:.7rem; font-weight:800; color:#fff;
      background:#e53e3e; padding:2px 7px; border-radius:5px;
    }
    .p-actions { display:flex; gap:7px; margin-top:auto; }
    .p-btn-cart {
      flex:1; display:inline-flex; align-items:center;
      justify-content:center; gap:6px;
      background:#1a6b3c; color:#fff; border:none;
      padding:9px 10px; border-radius:9px;
      font-family:'Cairo',sans-serif; font-size:.82rem;
      font-weight:700; cursor:pointer;
      transition:background .2s, transform .15s;
    }
    .p-btn-cart:hover { background:#145c35; transform:translateY(-1px); }
    .p-btn-view {
      display:inline-flex; align-items:center; justify-content:center;
      width:38px; min-width:38px; border-radius:9px;
      background:#f0f8f4; color:#1a6b3c; border:1.5px solid #e8f5ee;
      text-decoration:none;
      transition:background .2s, border-color .2s;
    }
    .p-btn-view:hover { background:#e8f5ee; border-color:#1a6b3c; }

    /* ── Toast panier ── */
    .wasalak-toast {
      position:fixed; top:80px; left:50%;
      transform:translateX(-50%) translateY(-16px);
      background:#1a6b3c; color:#fff;
      padding:12px 22px; border-radius:30px;
      z-index:99999; font-family:'Cairo',sans-serif;
      font-weight:700; font-size:.88rem;
      box-shadow:0 4px 20px rgba(26,107,60,.35);
      opacity:0; transition:all .35s ease;
      white-space:nowrap; max-width:calc(100vw - 40px);
      text-align:center; display:flex; align-items:center; gap:8px;
      pointer-events:none;
    }
    .wasalak-toast.show {
      opacity:1; transform:translateX(-50%) translateY(0);
    }
    .wasalak-toast svg { stroke:#fff; flex-shrink:0; }

    /* ── Alert ── */
    .wasalak-alert {
      position:fixed; top:80px; right:20px;
      padding:13px 18px; border-radius:12px; z-index:99999;
      font-family:'Cairo',sans-serif; font-weight:700;
      font-size:.88rem; box-shadow:0 4px 20px rgba(0,0,0,.18);
      transform:translateX(130%); transition:transform .35s ease;
      max-width:300px; display:flex; align-items:center; gap:8px;
    }
    .wasalak-alert.show { transform:translateX(0); }
    .wasalak-alert.success { background:#1a6b3c; color:#fff; }
    .wasalak-alert.error   { background:#e53e3e; color:#fff; }
    .wasalak-alert.info    { background:#3182ce; color:#fff; }
  `;
  document.head.appendChild(s);
})();

function getCategoryName(cat) {
  return { electronics:'إلكترونيات', fashion:'أزياء', home:'منزل ومطبخ', beauty:'جمال وعناية', sports:'رياضة' }[cat] || cat;
}

/* ═══════════════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════════════ */
function renderFeaturedProducts() {
  const el = document.getElementById('featuredProducts');
  if (!el) return;
  el.innerHTML = PRODUCTS_DB.filter(p => p.featured).slice(0,4).map(buildProductCard).join('');
  if (typeof fbq !== 'undefined') fbq('track', 'ViewContent');
}

function renderBestsellers(category = 'all') {
  const el = document.getElementById('bestsellerProducts');
  if (!el) return;
  let products = PRODUCTS_DB.filter(p => p.bestseller);
  if (category !== 'all') products = products.filter(p => p.category === category);
  el.innerHTML = products.map(buildProductCard).join('');
}

function initCategoryTabs() {
  document.querySelectorAll('#categoryTabs .tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#categoryTabs .tab-btn').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected','false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected','true');
      renderBestsellers(tab.dataset.cat);
    });
  });
}

function initPromoTimer() {
  const el = document.getElementById('promoTimer');
  if (!el) return;
  let saved = localStorage.getItem('wasalak_promo_end');
  if (!saved || Date.now() > +saved) {
    saved = String(Date.now() + 24 * 3600 * 1000);
    localStorage.setItem('wasalak_promo_end', saved);
  }
  function tick() {
    const diff = Math.max(0, +saved - Date.now());
    const h = String(Math.floor(diff / 3600000)).padStart(2,'0');
    const m = String(Math.floor(diff % 3600000 / 60000)).padStart(2,'0');
    const s = String(Math.floor(diff % 60000 / 1000)).padStart(2,'0');
    el.innerHTML = `
      <div class="promo-timer-inner">
        <div class="timer-block"><strong>${h}</strong><small>ساعة</small></div>
        <span class="timer-sep">:</span>
        <div class="timer-block"><strong>${m}</strong><small>دقيقة</small></div>
        <span class="timer-sep">:</span>
        <div class="timer-block"><strong>${s}</strong><small>ثانية</small></div>
      </div>`;
  }
  tick(); setInterval(tick, 1000);

  /* CSS timer */
  const st = document.createElement('style');
  st.textContent = `
    .promo-timer-inner{display:flex;align-items:center;gap:10px;flex-wrap:wrap;}
    .timer-block{text-align:center;background:rgba(255,255,255,.15);border-radius:8px;padding:8px 14px;min-width:56px;}
    .timer-block strong{display:block;font-size:1.8rem;color:#fff;line-height:1;font-weight:900;}
    .timer-block small{color:rgba(255,255,255,.75);font-size:.72rem;}
    .timer-sep{font-size:1.8rem;color:#fff;font-weight:900;line-height:1;}
  `;
  document.head.appendChild(st);
}

/* ═══════════════════════════════════════════════════════════
   SALE NOTIFICATIONS — Social Proof
═══════════════════════════════════════════════════════════ */
function startSaleNotifications() {
  let i = 0;
  function showNext() {
    const n   = SALE_NOTIFICATIONS[i % SALE_NOTIFICATIONS.length];
    const box = document.getElementById('saleNotification');
    if (!box) return;
    document.getElementById('notifCity').textContent    = `عميل من ${n.city}`;
    document.getElementById('notifProduct').textContent = n.product;
    box.style.display = 'flex';
    box.style.animation = 'slideInRight .4s ease';
    setTimeout(() => {
      box.style.animation = 'slideOutRight .4s ease forwards';
      setTimeout(() => { box.style.display = 'none'; }, 380);
    }, 5000);
    i++;
    setTimeout(showNext, 12000);
  }
  showNext();

  const st = document.createElement('style');
  st.textContent = `
    @keyframes slideInRight  { from{transform:translateX(120%);opacity:0} to{transform:translateX(0);opacity:1} }
    @keyframes slideOutRight { from{transform:translateX(0);opacity:1}    to{transform:translateX(120%);opacity:0} }
  `;
  document.head.appendChild(st);
}

function closeSaleNotif() {
  const box = document.getElementById('saleNotification');
  if (box) { box.style.animation = 'slideOutRight .4s ease forwards'; setTimeout(() => box.style.display='none', 380); }
}

/* ═══════════════════════════════════════════════════════════
   CATALOG
═══════════════════════════════════════════════════════════ */
function renderCatalogProducts() { filterProducts(); }

function filterProducts() {
  const search   = (document.getElementById('catalogSearch')?.value || '').toLowerCase();
  const category = document.querySelector('input[name="category"]:checked')?.value || 'all';
  const maxPrice = parseInt(document.getElementById('priceRange')?.value || 1000);
  const inStock  = document.getElementById('inStockOnly')?.checked;
  const sort     = document.getElementById('sortSelect')?.value || 'default';
  const maxEl    = document.getElementById('maxPriceDisplay');
  if (maxEl) maxEl.textContent = maxPrice + ' د.ل';

  filteredProducts = PRODUCTS_DB.filter(p => {
    return (!search  || p.name.toLowerCase().includes(search) || getCategoryName(p.category).includes(search))
        && (category === 'all' || p.category === category)
        && p.price <= maxPrice
        && (!inStock || p.stock > 0);
  });

  const sortFns = {
    'price-asc':  (a,b) => a.price - b.price,
    'price-desc': (a,b) => b.price - a.price,
    'rating':     (a,b) => b.rating - a.rating,
    'newest':     (a,b) => b.id - a.id
  };
  if (sortFns[sort]) filteredProducts.sort(sortFns[sort]);

  currentPage = 1;
  renderPage();
}

function renderPage() {
  const el = document.getElementById('catalogProducts');
  if (!el) return;
  const countEl = document.getElementById('productCount');
  if (countEl) countEl.textContent = `عرض ${filteredProducts.length} منتج`;

  const slice = filteredProducts.slice((currentPage-1)*ITEMS_PER_PAGE, currentPage*ITEMS_PER_PAGE);

  if (!slice.length) {
    el.innerHTML = `
      <div class="empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <h3>لا توجد منتجات تطابق البحث</h3>
        <p>حاول تغيير معايير البحث أو الفلترة</p>
      </div>`;
    const pg = document.getElementById('pagination');
    if (pg) pg.innerHTML = '';
    return;
  }

  el.className = currentView === 'list' ? 'products-grid list-view' : 'products-grid';
  el.innerHTML = slice.map(buildProductCard).join('');
  renderPagination();
}

function renderPagination() {
  const el = document.getElementById('pagination');
  if (!el) return;
  const total = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  if (total <= 1) { el.innerHTML = ''; return; }
  let html = '';
  if (currentPage > 1)
    html += `<button class="page-btn" onclick="goToPage(${currentPage-1})">${ICONS.chevronRight}</button>`;
  for (let i = 1; i <= total; i++)
    html += `<button class="page-btn ${i===currentPage?'active':''}" onclick="goToPage(${i})">${i}</button>`;
  if (currentPage < total)
    html += `<button class="page-btn" onclick="goToPage(${currentPage+1})">${ICONS.chevronLeft}</button>`;
  el.innerHTML = html;
}

function goToPage(page) {
  currentPage = page;
  renderPage();
  document.querySelector('.catalog-main')?.scrollIntoView({ behavior:'smooth', block:'start' });
}

function setView(view) {
  currentView = view;
  const gBtn = document.getElementById('gridViewBtn');
  const lBtn = document.getElementById('listViewBtn');
  gBtn?.classList.toggle('active', view === 'grid');
  lBtn?.classList.toggle('active', view === 'list');
  renderPage();
}

function resetFilters() {
  ['catalogSearch'].forEach(id => { const e = document.getElementById(id); if(e) e.value=''; });
  const allR = document.querySelector('input[name="category"][value="all"]');
  if (allR) allR.checked = true;
  const pr = document.getElementById('priceRange'); if (pr) pr.value = 1000;
  const is = document.getElementById('inStockOnly'); if (is) is.checked = false;
  const ss = document.getElementById('sortSelect'); if (ss) ss.value = 'default';
  filterProducts();
}

function updatePrice(val) {
  const el = document.getElementById('maxPriceDisplay');
  if (el) el.textContent = val + ' د.ل';
}

function searchProducts(query) {
  const results = document.getElementById('searchResults');
  if (!results) return;
  if (!query || query.length < 2) { results.innerHTML = ''; results.style.display='none'; return; }
  const matches = PRODUCTS_DB.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0,5);
  if (!matches.length) { results.innerHTML = '<p style="padding:12px 16px;color:#aaa;font-size:.85rem;">لا توجد نتائج</p>'; results.style.display='block'; return; }
  results.style.display = 'block';
  results.innerHTML = matches.map(p => `
    <a href="product.html?id=${p.id}" style="display:flex;gap:10px;align-items:center;padding:10px 14px;border-bottom:1px solid #f0f0f0;text-decoration:none;color:inherit;transition:background .15s;" onmouseover="this.style.background='#f7faf8'" onmouseout="this.style.background='transparent'">
      <img src="${p.image}" alt="${p.name}" style="width:42px;height:42px;object-fit:cover;border-radius:8px;flex-shrink:0;"/>
      <div style="flex:1;min-width:0;">
        <div style="font-weight:600;font-size:.85rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${p.name}</div>
        <div style="color:#1a6b3c;font-size:.82rem;font-weight:700;">${p.price} د.ل</div>
      </div>
    </a>`).join('');
}

/* ═══════════════════════════════════════════════════════════
   PRODUCT DETAIL
═══════════════════════════════════════════════════════════ */
function loadProductDetail() {
  const id = parseInt(new URLSearchParams(window.location.search).get('id'));
  currentProduct = PRODUCTS_DB.find(p => p.id === id) || PRODUCTS_DB[0];
  const p = currentProduct;

  document.title = `${p.name} | وصلك – wasalak.com`;

  /* Meta OG dynamiques */
  setMeta('og:title',       `${p.name} | وصلك`);
  setMeta('og:description', p.description);
  setMeta('og:image',       p.images[0]);

  document.getElementById('breadcrumbProduct').textContent = p.name;
  document.getElementById('productName').textContent       = p.name;
  document.getElementById('productDescription').textContent= p.description;
  document.getElementById('productCategoryTag').textContent= getCategoryName(p.category);
  document.getElementById('mainProductImage').src          = p.images[0];
  document.getElementById('mainProductImage').alt          = p.name;
  document.getElementById('productStars').innerHTML        = buildStars(p.rating, true);
  document.getElementById('reviewCount').textContent       = `(${p.reviews} تقييم)`;
  document.getElementById('currentPrice').textContent      = `${p.price} د.ل`;

  /* Stock */
  const stockEl = document.getElementById('stockStatus');
  if (stockEl) {
    stockEl.className = `in-stock ${p.stock > 0 ? 'available' : 'out'}`;
    stockEl.innerHTML = p.stock > 0
      ? `${ICONS.checkCircle} متوفر${p.stock <= 5 ? ` — آخر ${p.stock} قطع` : ''}`
      : `${ICONS.x} نفد المخزون`;
  }

  /* Prix */
  if (p.originalPrice > p.price) {
    document.getElementById('originalPrice').textContent = `${p.originalPrice} د.ل`;
    const disc = Math.round((1 - p.price / p.originalPrice) * 100);
    document.getElementById('discountBadge').textContent = `خصم ${disc}%`;
  }

  /* Thumbnails */
  document.getElementById('thumbnailList').innerHTML = p.images.map((img,i) =>
    `<img src="${img}" alt="صورة ${i+1}" class="${i===0?'active':''}" onclick="changeMainImage(this,'${img}')" loading="lazy"/>`
  ).join('');

  /* Specs */
  document.getElementById('specsTable').innerHTML = Object.entries(p.specs||{}).map(([k,v]) =>
    `<tr><td>${k}</td><td>${v}</td></tr>`
  ).join('');

  renderProductOptions();
  renderProductReviews();
  renderBundleProducts();
  renderRelatedProducts();

  /* Pixel */
  if (typeof fbq !== 'undefined') {
    fbq('track','ViewContent',{ content_ids:[p.id], content_name:p.name, content_type:'product', value:p.price, currency:'LYD' });
  }
}

function setMeta(prop, content) {
  let el = document.querySelector(`meta[property="${prop}"]`);
  if (!el) { el = document.createElement('meta'); el.setAttribute('property',prop); document.head.appendChild(el); }
  el.setAttribute('content', content);
}

function changeMainImage(el, src) {
  document.getElementById('mainProductImage').src = src;
  document.querySelectorAll('#thumbnailList img').forEach(i => i.classList.remove('active'));
  el.classList.add('active');
}

function renderProductOptions() {
  const c = document.getElementById('productOptions');
  if (!c || !currentProduct?.options) return;
  let html = '';
  if (currentProduct.options.size?.length) {
    html += `<div class="option-group"><label>المقاس:</label><div class="option-btns">
      ${currentProduct.options.size.map(s=>`<button class="option-btn" onclick="selectOption(this,'size')">${s}</button>`).join('')}
    </div></div>`;
  }
  if (currentProduct.options.color?.length) {
    html += `<div class="option-group"><label>اللون:</label><div class="option-btns">
      ${currentProduct.options.color.map(c=>`<button class="option-btn" onclick="selectOption(this,'color')">${c}</button>`).join('')}
    </div></div>`;
  }
  c.innerHTML = html;
}

function selectOption(btn, type) {
  btn.closest('.option-btns').querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

function renderProductReviews() {
  if (!currentProduct) return;
  const saved   = JSON.parse(localStorage.getItem(`reviews_${currentProduct.id}`)) || [];
  const defaults = [
    { name:"أحمد م.", city:"طرابلس", rating:5, text:"منتج ممتاز وصل سريع. جودة عالية جداً!" },
    { name:"سارة ع.", city:"بنغازي", rating:4, text:"جيد جداً، يستحق السعر." }
  ];
  const all = [...defaults, ...saved];
  const avg = (all.reduce((s,r)=>s+r.rating,0)/all.length).toFixed(1);

  const summaryEl = document.getElementById('reviewsSummary');
  if (summaryEl) summaryEl.innerHTML = `
    <div style="text-align:center;min-width:80px;">
      <div class="rating-big">${avg}</div>
      <div style="display:flex;justify-content:center;gap:2px;margin:6px 0;">${buildStars(+avg,true)}</div>
      <div style="color:#aaa;font-size:.8rem;">${all.length} تقييم</div>
    </div>
    <div class="review-bars" style="flex:1;min-width:160px;">
      ${[5,4,3,2,1].map(star=>{
        const c = all.filter(r=>Math.round(r.rating)===star).length;
        const pct = all.length ? Math.round(c/all.length*100) : 0;
        return `<div style="display:flex;align-items:center;gap:8px;margin-bottom:5px;">
          <span style="min-width:12px;font-size:.8rem;">${star}</span>
          ${ICONS.star}
          <div style="flex:1;height:6px;background:#eee;border-radius:3px;overflow:hidden;">
            <div style="width:${pct}%;height:100%;background:#f0a500;border-radius:3px;"></div>
          </div>
          <span style="min-width:28px;font-size:.75rem;color:#aaa;">${pct}%</span>
        </div>`;
      }).join('')}
    </div>`;

  const listEl = document.getElementById('reviewsList');
  if (listEl) listEl.innerHTML = all.map(r=>`
    <div class="review-item">
      <div class="review-header">
        <span class="reviewer-name">${r.name}</span>
        <span class="reviewer-city">${r.city}</span>
        <span class="review-date" style="margin-right:auto;">${r.date||''}</span>
      </div>
      <div style="display:flex;gap:2px;margin-bottom:6px;">${buildStars(r.rating)}</div>
      <div class="review-text">${r.text}</div>
    </div>`).join('');
}

function setReviewStar(val) {
  reviewStarSelected = val;
  document.querySelectorAll('#starRatingInput svg').forEach(s => {
    const v = parseInt(s.dataset.val);
    s.style.fill   = v <= val ? '#f0a500' : 'none';
    s.style.stroke = '#f0a500';
  });
}

function submitReview() {
  const name = document.getElementById('reviewName')?.value.trim();
  const city = document.getElementById('reviewCity')?.value.trim();
  const text = document.getElementById('reviewText')?.value.trim();
  if (!name||!city||!text||!reviewStarSelected) { showAlert('يرجى تعبئة جميع الحقول واختيار تقييم النجوم','error'); return; }
  const reviews = JSON.parse(localStorage.getItem(`reviews_${currentProduct.id}`))||[];
  reviews.push({ name, city, rating:reviewStarSelected, text, date:new Date().toLocaleDateString('ar-LY') });
  localStorage.setItem(`reviews_${currentProduct.id}`, JSON.stringify(reviews));
  document.getElementById('reviewName').value = '';
  document.getElementById('reviewCity').value = '';
  document.getElementById('reviewText').value = '';
  setReviewStar(0);
  renderProductReviews();
  showAlert('شكراً! تم إرسال تقييمك بنجاح','success');
}

function renderBundleProducts() {
  const c = document.getElementById('bundleProducts');
  const t = document.getElementById('bundleTotal');
  if (!c||!currentProduct) return;
  const extras  = PRODUCTS_DB.filter(p=>p.category===currentProduct.category&&p.id!==currentProduct.id).slice(0,2);
  const bundle  = [currentProduct,...extras];
  const total   = bundle.reduce((s,p)=>s+p.price,0);
  const origTotal = bundle.reduce((s,p)=>s+p.originalPrice,0);
  c.innerHTML = bundle.map((p,i)=>`
    ${i>0?`<span class="bundle-plus">+</span>`:''}
    <div class="bundle-item">
      <img src="${p.image}" alt="${p.name}" loading="lazy"/>
      <div class="bundle-item-name">${p.name.substring(0,22)}...</div>
      <div class="bundle-item-price">${p.price} د.ل</div>
    </div>`).join('');
  if (t) t.innerHTML = `
    <div>
      <span style="color:#aaa;font-size:.85rem;">المجموع: <s>${origTotal} د.ل</s></span>
      <span style="font-size:1.2rem;font-weight:900;color:#1a6b3c;margin-right:10px;">${total} د.ل</span>
    </div>
    <button class="btn-bundle" onclick="addBundleToCart([${bundle.map(p=>p.id)}])">
      ${ICONS.cart} أضف الجميع للسلة
    </button>`;
}

function addBundleToCart(ids) {
  ids.forEach(id => addToCart(id));
  if (typeof fbq!=='undefined') fbq('track','AddToCart');
}

function renderRelatedProducts() {
  const el = document.getElementById('relatedProducts');
  if (!el||!currentProduct) return;
  const related = PRODUCTS_DB.filter(p=>p.category===currentProduct.category&&p.id!==currentProduct.id).slice(0,4);
  el.innerHTML = related.map(buildProductCard).join('');
}

function showTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.tabs-header .tab-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById(`tab-${tabId}`)?.classList.add('active');
  event.target.classList.add('active');
}

/* ═══════════════════════════════════════════════════════════
   CART
═══════════════════════════════════════════════════════════ */
function addToCart(productId) {
  const product = PRODUCTS_DB.find(p=>p.id===productId);
  if (!product) return;
  const existing = cart.find(i=>i.id===productId);
  existing ? existing.qty++ : cart.push({ id:productId, qty:1, name:product.name, price:product.price, image:product.image });
  saveCart();
  updateCartCount();
  showCartToast(product.name);
  if (typeof fbq!=='undefined') fbq('track','AddToCart',{ content_ids:[productId], value:product.price, currency:'LYD' });
}

function saveCart() { localStorage.setItem('wasalak_cart', JSON.stringify(cart)); }

function updateCartCount() {
  const total = cart.reduce((s,i)=>s+i.qty,0);
  document.querySelectorAll('#cartCount').forEach(el=>el.textContent=total);
}

function showCartToast(name) {
  const toast = document.createElement('div');
  toast.className = 'wasalak-toast';
  toast.innerHTML = `${ICONS.checkCircle} تمت إضافة "${name.substring(0,22)}..." للسلة`;
  document.body.appendChild(toast);
  requestAnimationFrame(()=>{ requestAnimationFrame(()=>toast.classList.add('show')); });
  setTimeout(()=>{
    toast.classList.remove('show');
    setTimeout(()=>toast.remove(),360);
  },3000);
}

function addToCartFromProduct() {
  if (!currentProduct) return;
  const qty = parseInt(document.getElementById('qtyInput')?.value||1);
  for (let i=0;i<qty;i++) addToCart(currentProduct.id);
}

function buyNow() {
  if (!currentProduct) return;
  addToCartFromProduct();
  window.location.href = 'checkout.html';
}

function increaseQty() { const i=document.getElementById('qtyInput'); if(i) i.value=Math.min(99,+i.value+1); }
function decreaseQty() { const i=document.getElementById('qtyInput'); if(i) i.value=Math.max(1,+i.value-1); }

function toggleWishlist(id, btn) {
  const list = JSON.parse(localStorage.getItem('wasalak_wishlist'))||[];
  const idx  = list.indexOf(id);
  if (idx>-1) { list.splice(idx,1); btn.innerHTML=ICONS.heart; btn.classList.remove('wished'); }
  else        { list.push(id);      btn.innerHTML=ICONS.heartFilled; btn.classList.add('wished'); }
  localStorage.setItem('wasalak_wishlist', JSON.stringify(list));
}

/* ═══════════════════════════════════════════════════════════
   CHECKOUT
═══════════════════════════════════════════════════════════ */
function renderOrderSummary() {
  const el = document.getElementById('orderItems');
  if (!el) return;
  if (!cart.length) {
    el.innerHTML = `
      <div style="text-align:center;padding:24px;color:#aaa;">
        ${ICONS.package}
        <p style="margin-top:10px;font-weight:600;">السلة فارغة</p>
        <a href="catalog.html" style="display:inline-block;margin-top:12px;background:#1a6b3c;color:#fff;padding:9px 20px;border-radius:8px;text-decoration:none;font-weight:700;font-family:Cairo,sans-serif;">تسوق الآن</a>
      </div>`;
    return;
  }
  el.innerHTML = cart.map(item=>`
    <div class="order-item">
      <img src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=60&q=80'"/>
      <div class="order-item-info"><p>${item.name}</p><small>الكمية: ${item.qty}</small></div>
      <div class="order-item-price">${item.price*item.qty} د.ل</div>
    </div>`).join('');
  updateOrderTotals();
}

let appliedDiscount = 0;
const COUPONS = { 'LIBYA10':10, 'WELCOME20':20, 'VIP30':30 };

function applyCoupon() {
  const code    = document.getElementById('couponCode')?.value.trim().toUpperCase();
  const resultEl= document.getElementById('couponResult');
  if (!code||!resultEl) return;
  if (COUPONS[code]) {
    appliedDiscount = COUPONS[code];
    resultEl.innerHTML = `<span style="color:#1a6b3c;display:flex;align-items:center;gap:5px;">${ICONS.checkCircle} تم تطبيق خصم ${appliedDiscount}%!</span>`;
    document.getElementById('discountRow').style.display='flex';
  } else {
    appliedDiscount=0;
    resultEl.innerHTML=`<span style="color:#e53e3e;display:flex;align-items:center;gap:5px;">${ICONS.x} كود الخصم غير صحيح</span>`;
    document.getElementById('discountRow').style.display='none';
  }
  updateOrderTotals();
}

function updateOrderTotals() {
  const sub  = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const disc = Math.round(sub*appliedDiscount/100);
  const city = document.getElementById('city')?.value;
  const zone = city?DELIVERY_ZONES[city]:null;
  const ship = zone?(zone.zone==='A'&&sub>=150?0:parseInt(zone.cost)||0):0;
  const total= sub-disc+ship;
  const set  = (id,val)=>{ const e=document.getElementById(id); if(e) e.textContent=val; };
  set('subtotal',    `${sub} د.ل`);
  set('discountAmount',`-${disc} د.ل`);
  set('shippingCost', zone?(ship===0?'مجاني':`${ship} د.ل`):'حدد مدينتك');
  const totalEl = document.getElementById('grandTotal');
  if (totalEl) totalEl.innerHTML=`<strong>${total} د.ل</strong>`;
}

function updateDeliveryInfo() {
  const city   = document.getElementById('city')?.value;
  const infoBox= document.getElementById('deliveryInfoBox');
  const timeEl = document.getElementById('deliveryTime');
  const costEl = document.getElementById('deliveryCost');
  if (!city||!DELIVERY_ZONES[city]) { if(infoBox) infoBox.style.display='none'; return; }
  const zone=DELIVERY_ZONES[city];
  if(timeEl) timeEl.innerHTML=`${ICONS.truck} وقت التوصيل: ${zone.time}`;
  if(costEl) costEl.innerHTML=`${ICONS.wallet} رسوم التوصيل: ${zone.cost}`;
  if(infoBox) infoBox.style.display='flex';
  updateOrderTotals();
}

function initPaymentOptions() {
  document.querySelectorAll('.payment-option').forEach(opt=>{
    opt.addEventListener('click',()=>{
      document.querySelectorAll('.payment-option').forEach(o=>o.classList.remove('selected'));
      opt.classList.add('selected');
      const r=opt.querySelector('input[type="radio"]'); if(r) r.checked=true;
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   ORDER SUBMIT
═══════════════════════════════════════════════════════════ */
function submitOrder(e) {
  e.preventDefault();
  if (!validateCheckoutForm()) return;
  const btn=document.getElementById('submitOrderBtn');
  if(btn){ btn.disabled=true; btn.innerHTML=`${ICONS.clock} جاري تأكيد طلبك...`; }

  const order = {
    id:        'LY'+Date.now().toString().slice(-6),
    firstName: document.getElementById('firstName')?.value,
    lastName:  document.getElementById('lastName')?.value,
    phone:     document.getElementById('phone')?.value,
    city:      document.getElementById('city')?.value,
    district:  document.getElementById('district')?.value,
    address:   document.getElementById('address')?.value,
    notes:     document.getElementById('orderNotes')?.value,
    payment:   document.querySelector('input[name="payment"]:checked')?.value,
    items: cart, total: cart.reduce((s,i)=>s+i.price*i.qty,0),
    status:'pending', date:new Date().toISOString(),
    timeline:[
      { status:'تم استلام الطلب',         done:true,  date:new Date().toLocaleString('ar-LY') },
      { status:'قيد المراجعة والتأكيد',   done:false },
      { status:'تم تجهيز الطلب للشحن',   done:false },
      { status:'في طريقه إليك',           done:false },
      { status:'تم التسليم بنجاح',        done:false }
    ]
  };

  const orders=JSON.parse(localStorage.getItem('wasalak_orders'))||[];
  orders.push(order);
  localStorage.setItem('wasalak_orders',JSON.stringify(orders));

  setTimeout(()=>{
    sendWhatsAppConfirmation(order);
    if(typeof fbq!=='undefined') fbq('track','Purchase',{ value:order.total, currency:'LYD', content_ids:order.items.map(i=>i.id) });
    cart=[]; saveCart(); updateCartCount();
    const oNum=document.getElementById('orderNumber'); if(oNum) oNum.textContent=order.id;
    const oPh =document.getElementById('confirmedPhone'); if(oPh) oPh.textContent=`+218${order.phone}`;
    const modal=document.getElementById('successModal'); if(modal) modal.style.display='flex';
    const overlay=document.getElementById('modalOverlay'); if(overlay) overlay.style.display='block';
  },2000);
}

function sendWhatsAppConfirmation(order) {
  const items = order.items.map(i=>`• ${i.name} × ${i.qty} = ${i.price*i.qty} د.ل`).join('\n');
  const msg = `🛍️ *تأكيد طلبك من وصلك*\n\nمرحباً ${order.firstName}!\nرقم طلبك: *${order.id}*\n\n📦 *منتجاتك:*\n${items}\n\n💰 *الإجمالي:* ${order.total} د.ل\n📍 *المدينة:* ${order.city}\n💵 *الدفع:* عند الاستلام\n\nسيتواصل معك فريقنا قريباً ✅`;
  setTimeout(()=>window.open(`https://wa.me/218912345678?text=${encodeURIComponent(msg)}`,'_blank'),500);
}

function validateCheckoutForm() {
  let valid=true;
  [
    { id:'firstName', msg:'الاسم الأول مطلوب' },
    { id:'lastName',  msg:'اسم العائلة مطلوب' },
    { id:'phone',     msg:'رقم الهاتف مطلوب' },
    { id:'city',      msg:'اختر مدينتك' },
    { id:'district',  msg:'الحي/المنطقة مطلوب' }
  ].forEach(f=>{
    const el=document.getElementById(f.id);
    const err=document.getElementById(f.id+'Error');
    if(!el) return;
    if(!el.value.trim()){ if(err) err.textContent=f.msg; el.classList.add('error'); valid=false; }
    else { if(err) err.textContent=''; el.classList.remove('error'); }
  });
  const phone=document.getElementById('phone');
  if(phone?.value&&!/^[0-9]{9,10}$/.test(phone.value.replace(/\D/g,''))){
    const err=document.getElementById('phoneError'); if(err) err.textContent='رقم الهاتف غير صحيح';
    phone.classList.add('error'); valid=false;
  }
  const terms=document.getElementById('termsAccepted');
  if(terms&&!terms.checked){ const err=document.getElementById('termsError'); if(err) err.textContent='يجب الموافقة على الشروط'; valid=false; }
  if(!valid) document.querySelector('.error,[class*="Error"]:not(:empty)')?.scrollIntoView({behavior:'smooth',block:'center'});
  return valid;
}

/* ═══════════════════════════════════════════════════════════
   ORDER TRACKING
═══════════════════════════════════════════════════════════ */
function trackOrder() {
  const phone=(document.getElementById('trackPhone')?.value||'').replace(/\D/g,'');
  if(!phone||phone.length<9){ showAlert('يرجى إدخال رقم هاتف صحيح','error'); return; }
  const orders=JSON.parse(localStorage.getItem('wasalak_orders'))||[];
  const userOrders=orders.filter(o=>o.phone.replace(/\D/g,'')===phone);
  if(!userOrders.length){
    document.getElementById('trackResults').style.display='none';
    document.getElementById('trackEmpty').style.display='block';
    return;
  }
  const order=userOrders[userOrders.length-1];
  document.getElementById('trackEmpty').style.display='none';
  const info=document.getElementById('trackOrderInfo');
  if(info) info.innerHTML=`
    <h3 style="display:flex;align-items:center;gap:8px;">${ICONS.package} طلب رقم: ${order.id}</h3>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:14px;">
      <div><small style="color:#aaa;">المدينة</small><p style="font-weight:700;">${order.city||'-'}</p></div>
      <div><small style="color:#aaa;">إجمالي الطلب</small><p style="font-weight:700;color:#1a6b3c;">${order.total} د.ل</p></div>
      <div><small style="color:#aaa;">الدفع</small><p style="font-weight:700;display:flex;align-items:center;gap:5px;">${ICONS.wallet} عند الاستلام</p></div>
      <div><small style="color:#aaa;">تاريخ الطلب</small><p style="font-weight:700;">${new Date(order.date).toLocaleDateString('ar-LY')}</p></div>
    </div>`;
  const timelineStatuses=[
    { label:'تم استلام الطلب',          done:true  },
    { label:'قيد المراجعة والتأكيد',    done:true  },
    { label:'تم تجهيز الطلب للشحن',    done:false },
    { label:'في طريقه إليك',            done:false },
    { label:'تم التسليم بنجاح',         done:false }
  ];
  const timelineEl=document.getElementById('trackTimeline');
  if(timelineEl) timelineEl.innerHTML=timelineStatuses.map((s,i)=>`
    <div class="timeline-item ${s.done?'completed':(i===timelineStatuses.findIndex(st=>!st.done)?'current':'')}">
      <div class="timeline-dot">
        ${s.done ? ICONS.check : ICONS.clock}
      </div>
      <div class="timeline-body">
        <h4>${s.label}</h4>
        <p>${s.done?(i===0?new Date(order.date).toLocaleString('ar-LY'):'مكتمل'):'قيد الانتظار'}</p>
      </div>
    </div>`).join('');
  document.getElementById('trackResults').style.display='block';
}

/* ═══════════════════════════════════════════════════════════
   UI HELPERS
═══════════════════════════════════════════════════════════ */
function toggleSearch() {
  const bar=document.getElementById('searchBar');
  if(!bar) return;
  const open=bar.style.display!=='none'&&bar.style.display!=='';
  bar.style.display=open?'none':'block';
  if(!open) bar.querySelector('input')?.focus();
}

function toggleMenu() {
  const menu=document.getElementById('navMenu');
  if(!menu) return;
  menu.classList.toggle('open');
  const btn=document.querySelector('.menu-toggle');
  if(btn) btn.setAttribute('aria-expanded', menu.classList.contains('open').toString());
  if(menu.classList.contains('open')) {
    setTimeout(()=>{
      document.addEventListener('click',function close(e){
        if(!menu.contains(e.target)&&!e.target.closest('.menu-toggle')){
          menu.classList.remove('open');
          if(btn) btn.setAttribute('aria-expanded','false');
          document.removeEventListener('click',close);
        }
      });
    },100);
  }
}

function scrollToTop() { window.scrollTo({top:0,behavior:'smooth'}); }

function initScrollBehavior() {
  const header=document.getElementById('mainHeader');
  const btn   =document.getElementById('scrollTop');
  window.addEventListener('scroll',()=>{
    const y=window.scrollY;
    if(header) header.classList.toggle('scrolled',y>50);
    if(btn)    btn.classList.toggle('visible',y>400);
  },{ passive:true });
}

function showAlert(msg, type='info') {
  const a=document.createElement('div');
  a.className=`wasalak-alert ${type}`;
  a.innerHTML=`${type==='success'?ICONS.checkCircle:type==='error'?ICONS.x:ICONS.info} ${msg}`;
  document.body.appendChild(a);
  requestAnimationFrame(()=>{ requestAnimationFrame(()=>a.classList.add('show')); });
  setTimeout(()=>{ a.classList.remove('show'); setTimeout(()=>a.remove(),370); },3500);
}

function toggleFilters() {
  document.getElementById('filtersSidebar')?.classList.toggle('open');
}
