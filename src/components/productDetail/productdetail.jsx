import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import axios from 'axios';

const APIURL = import.meta.env.VITE_API_URL || '';

/* ── Fonts ── */
if (!document.getElementById('pd-font')) {
  const l = document.createElement('link');
  l.id = 'pd-font'; l.rel = 'stylesheet';
  l.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:wght@600;700;800&family=JetBrains+Mono:wght@400;500&display=swap';
  document.head.appendChild(l);
}

const resolveImg = (url) => {
  if (!url) return null;
  return url.startsWith('http') ? url : `${APIURL}${url}`;
};

/* ── CSS ── */
if (!document.getElementById('pd-css')) {
  const el = document.createElement('style');
  el.id = 'pd-css';
  el.textContent = `
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --bg:#F8F6F2;
      --surface:#FFFFFF;
      --surface2:#F3F1ED;
      --surface3:#EAE7E1;
      --border:#E2DED8;
      --border2:#D0CBC2;
      --ink:#1A1714;
      --ink2:#3D3830;
      --ink3:#7A7268;
      --ink4:#B0A89E;
      --green:#1C5C3A; --green-bg:#E6F4EC; --green-bd:#A8D5BA;
      --red:#7A1C1C; --red-bg:#FDEAEA; --red-bd:#F2AAAA;
      --blue:#1A3D8C; --blue-bg:#EBF0FC; --blue-bd:#9DB5EE;
      --amber:#7A4A08; --amber-bg:#FEF4E4; --amber-bd:#F5C87A;
      --accent:#C8622A;
    }

    @keyframes fadeUp   { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
    @keyframes spin     { to{transform:rotate(360deg)} }
    @keyframes shimmer  { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
    @keyframes popIn    { 0%{transform:scale(.92);opacity:0} 100%{transform:scale(1);opacity:1} }
    @keyframes slideUp  { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
    @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:.5} }

    .pd-page {
      font-family:'Plus Jakarta Sans',sans-serif;
      background:var(--bg);
      min-height:100vh;
      color:var(--ink);
    }

    /* ── LAYOUT: Two-column full-height ── */
    .pd-layout {
      display:grid;
      grid-template-columns:52% 48%;
      min-height:calc(100vh - 72px);
      align-items:start;
    }

    /* ── LEFT COLUMN ── */
    .pd-left {
      position:sticky;
      top:72px;
      height:calc(100vh - 72px);
      display:flex;
      flex-direction:column;
      background:var(--surface);
      border-right:1px solid var(--border);
      overflow:hidden;
    }

    /* Main image area */
    .pd-gallery {
      flex:1;
      position:relative;
      display:flex;
      align-items:center;
      justify-content:center;
      background:var(--surface);
      overflow:hidden;
      padding:40px;
    }

    .pd-gallery::before {
      content:'';
      position:absolute;
      inset:0;
      background:
        radial-gradient(ellipse 60% 50% at 30% 40%, rgba(200,98,42,0.04) 0%, transparent 70%),
        radial-gradient(ellipse 40% 60% at 80% 70%, rgba(26,61,140,0.04) 0%, transparent 70%);
      pointer-events:none;
    }

    .pd-main-img {
      width:100%;
      height:100%;
      object-fit:contain;
      transition:opacity .25s ease, transform .4s cubic-bezier(.4,0,.2,1);
      max-height:420px;
    }
    .pd-main-img.fade { opacity:0; transform:scale(.97); }

    /* Stock badge */
    .pd-stock {
      position:absolute;
      top:20px; left:20px;
      display:inline-flex;
      align-items:center;
      gap:7px;
      font-size:10px;
      font-weight:700;
      letter-spacing:.09em;
      text-transform:uppercase;
      border-radius:8px;
      padding:6px 14px;
      border:1px solid transparent;
      backdrop-filter:blur(8px);
    }
    .pd-stock.ok { background:var(--green-bg); border-color:var(--green-bd); color:var(--green); }
    .pd-stock.no { background:var(--red-bg); border-color:var(--red-bd); color:var(--red); }
    .pd-stock-dot {
      width:6px; height:6px; border-radius:50%;
      background:currentColor;
      animation:pulse 2s infinite;
    }

    /* Thumbnail strip */
    .pd-thumbs-row {
      display:flex;
      gap:8px;
      padding:16px 20px;
      border-top:1px solid var(--border);
      background:var(--surface2);
      overflow-x:auto;
      scrollbar-width:none;
    }
    .pd-thumbs-row::-webkit-scrollbar { display:none; }
    .pd-thumb {
      flex-shrink:0;
      width:54px; height:54px;
      border-radius:10px;
      background:var(--surface);
      border:2px solid var(--border);
      padding:5px;
      cursor:pointer;
      overflow:hidden;
      transition:border-color .15s, transform .15s;
    }
    .pd-thumb:hover { transform:translateY(-2px); border-color:var(--ink4); }
    .pd-thumb.on { border-color:var(--accent); }
    .pd-thumb img { width:100%; height:100%; object-fit:contain; }

    /* Product name block (bottom of left) */
    .pd-name-block {
      padding:20px 24px 24px;
      border-top:1px solid var(--border);
      background:var(--surface);
    }
    .pd-product-title {
    
      font-size:clamp(20px, 2vw, 28px);
      font-weight:700;
      color:var(--ink);
      line-height:1.2;
      letter-spacing:-.02em;
      margin-bottom:8px;
    }
    /* FIXED - shows full description */
.pd-product-desc {
  font-size:13px;
  color:var(--ink3);
  line-height:1.7;
  font-weight:400;
}

    /* ── RIGHT COLUMN ── */
    .pd-right {
      display:flex;
      flex-direction:column;
      overflow-y:auto;
      max-height:calc(100vh - 72px);
      position:sticky;
      top:72px;
      scrollbar-width:thin;
      scrollbar-color:var(--border2) transparent;
    }
    .pd-right::-webkit-scrollbar { width:4px; }
    .pd-right::-webkit-scrollbar-thumb { background:var(--border2); border-radius:4px; }

    /* Breadcrumb */
    .pd-bc {
      display:flex; align-items:center; gap:6px;
      font-size:10px; font-weight:700; letter-spacing:.1em; text-transform:uppercase;
      color:var(--ink4); padding:24px 32px 0; flex-wrap:wrap;
    }
    .pd-bc-link { cursor:pointer; transition:color .13s; }
    .pd-bc-link:hover { color:var(--ink2); }
    .pd-bc-sep { color:var(--border2); }
    .pd-bc-cur { color:var(--ink3); }

    /* Section header */
    .pd-section-label {
      font-size:9px; font-weight:800; letter-spacing:.14em; text-transform:uppercase;
      color:var(--ink4);
    }

    /* ── BRAND SECTION ── */
    .pd-brand-section { padding:20px 32px 0; }
    .pd-brand-header { display:flex; align-items:center; gap:12px; margin-bottom:14px; }
    .pd-brand-pills { display:flex; flex-wrap:wrap; gap:8px; }
    .pd-brand-pill {
      display:flex; align-items:center; gap:8px;
      padding:10px 18px; border-radius:12px;
      background:var(--surface); border:1.5px solid var(--border);
      cursor:pointer; transition:all .18s;
      font-size:13px; font-weight:600; color:var(--ink3);
    }
    .pd-brand-pill:hover { border-color:var(--ink4); color:var(--ink2); transform:translateY(-1px); }
    .pd-brand-pill.on {
  background:var(--blue); border-color:var(--blue); color:#fff;
  box-shadow:0 4px 16px rgba(26,61,140,0.25);
}
    .pd-brand-dot {
      width:7px; height:7px; border-radius:50%;
      background:currentColor; opacity:.3; flex-shrink:0;
    }
    .pd-brand-pill.on .pd-brand-dot { opacity:1; background:#4ade80; }
    .pd-brand-count {
      font-size:10px; font-weight:700;
      background:var(--surface2); color:var(--ink4);
      border-radius:6px; padding:2px 7px;
    }
    .pd-brand-pill.on .pd-brand-count { background:rgba(255,255,255,.2); color:rgba(255,255,255,.75); }

    /* ── MODELS SECTION ── */
    .pd-models-section { padding:20px 32px 0; }
    .pd-models-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; }
    .pd-models-meta { font-size:11px; color:var(--ink3); font-weight:500; }

    .pd-model-grid {
      display:grid;
      grid-template-columns:repeat(auto-fill, minmax(190px, 1fr));
      gap:10px;
    }

    .pd-model-card {
      background:var(--surface);
      border:1.5px solid var(--border);
      border-radius:14px;
      padding:14px 16px;
      cursor:pointer;
      transition:all .2s cubic-bezier(.4,0,.2,1);
      display:flex; flex-direction:column; gap:10px;
      position:relative; overflow:hidden;
    }
    .pd-model-card::after {
      content:'';
      position:absolute; left:0; top:0; bottom:0;
      width:3px; border-radius:2px 0 0 2px;
      background:transparent;
      transition:background .15s;
    }
    .pd-model-card:hover { border-color:var(--border2); transform:translateY(-2px); box-shadow:0 6px 24px rgba(0,0,0,.07); }
    .pd-model-card.on { border-color:var(--blue); background:var(--blue-bg); }
.pd-model-card.on::after { background:var(--blue); }

    .pd-mc-header { display:flex; align-items:flex-start; gap:8px; }
    .pd-mc-status {
      width:8px; height:8px; border-radius:50%;
      background:var(--green-bd); flex-shrink:0; margin-top:3px;
    }
    .pd-mc-status.out { background:var(--red-bd); }
    .pd-model-card.on .pd-mc-status { background: #4ade80; }
    .pd-mc-name {
      font-size:13px; font-weight:700; color:var(--ink2); line-height:1.35; flex:1;
    }
    .pd-model-card.on .pd-mc-name { color:var(--blue); }
    .pd-mc-badge {
      font-size:9px; font-weight:700; color:var(--ink4);
      background:var(--surface2); border-radius:6px;
      padding:2px 7px; flex-shrink:0;
    }
    .pd-model-card.on .pd-mc-badge { background:var(--blue-bg); color:var(--blue); }

    .pd-mc-sizes { display:flex; gap:5px; flex-wrap:wrap; }
    .pd-sz-chip {
      font-family:'JetBrains Mono', monospace;
      font-size:10px; font-weight:500;
      padding:3px 9px; border-radius:6px;
      background:var(--surface2); color:var(--ink3);
      border:1px solid var(--border);
      cursor:pointer; transition:all .13s;
    }
    .pd-sz-chip:hover { border-color:var(--ink4); color:var(--ink2); }
    .pd-sz-chip.on { background:var(--blue); color:#fff; border-color:var(--blue); }
    .pd-sz-chip.oos { opacity:.35; cursor:not-allowed; }

    /* ── SPEC PANEL ── */
    .pd-spec-panel {
      margin:16px 32px 0;
      background:var(--surface);
      border:1.5px solid var(--border);
      border-radius:18px;
      overflow:hidden;
      animation:slideUp .25s cubic-bezier(.16,1,.3,1);
      box-shadow:0 8px 32px rgba(0,0,0,.06);
    }

    .pd-spec-head {
      padding:18px 22px;
      background:linear-gradient(135deg, var(--surface2) 0%, var(--surface) 100%);
      border-bottom:1px solid var(--border);
      display:flex; align-items:flex-start; justify-content:space-between; gap:12px;
    }
    .pd-spec-title {
      
      font-size:17px; font-weight:700; color:var(--ink);
      line-height:1.25; margin-bottom:4px;
    }
    .pd-spec-subtitle { font-size:11px; color:var(--ink3); font-weight:500; }
    .pd-spec-badges { display:flex; gap:6px; flex-wrap:wrap; margin-top:8px; }

    .pd-badge {
      font-size:9px; font-weight:700;
      padding:3px 10px; border-radius:6px;
      letter-spacing:.04em; border:1px solid transparent;
    }
    .pd-badge.ok { background:var(--green-bg); border-color:var(--green-bd); color:var(--green); }
    .pd-badge.no { background:var(--red-bg); border-color:var(--red-bd); color:var(--red); }
    .pd-badge.info { background:var(--blue-bg); border-color:var(--blue-bd); color:var(--blue); }
    .pd-badge.neu { background:var(--surface2); border-color:var(--border); color:var(--ink3); }
    .pd-badge.am { background:var(--amber-bg); border-color:var(--amber-bd); color:var(--amber); }

    .pd-close-btn {
      width:30px; height:30px; border-radius:8px;
      background:var(--surface3); border:1px solid var(--border);
      cursor:pointer; color:var(--ink3); font-size:13px;
      display:flex; align-items:center; justify-content:center;
      transition:all .13s; flex-shrink:0;
    }
    .pd-close-btn:hover { background:var(--border2); color:var(--ink); }

    /* Spec grid — 2 columns, cleaner */
    .pd-spec-grid {
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:0;
    }
    .pd-spec-cell {
      padding:13px 20px;
      border-bottom:1px solid var(--border);
      border-right:1px solid var(--border);
    }
    .pd-spec-cell:nth-child(2n) { border-right:none; }
    .pd-spec-cell:nth-last-child(-n+2) { border-bottom:none; }
    .pd-spec-cell:only-child { grid-column:1/-1; border-right:none; }
    .pd-spec-k {
      font-size:9px; font-weight:700; letter-spacing:.11em; text-transform:uppercase;
      color:var(--ink4); margin-bottom:5px;
    }
    .pd-spec-v {
      font-size:13px; font-weight:500; color:var(--ink);
      font-family:'JetBrains Mono', monospace;
      line-height:1.4; word-break:break-word;
    }
    .pd-bool-y {
      display:inline-flex; align-items:center; gap:5px;
      font-family:'Plus Jakarta Sans', sans-serif; font-size:11px; font-weight:700;
      color:var(--green); background:var(--green-bg);
      border:1px solid var(--green-bd); border-radius:6px; padding:2px 9px;
    }
    .pd-bool-n {
      display:inline-flex; align-items:center; gap:5px;
      font-family:'Plus Jakarta Sans', sans-serif; font-size:11px; font-weight:700;
      color:var(--ink4); background:var(--surface2);
      border:1px solid var(--border); border-radius:6px; padding:2px 9px;
    }
    .pd-spec-empty {
      padding:32px; text-align:center;
      color:var(--ink4); font-size:13px; font-style:italic;
    }

    /* ── PRICE + CTA ── */
    .pd-price-cta {
      display:flex; align-items:center; gap:16px; flex-wrap:wrap;
      padding:18px 22px;
      background:var(--surface2);
      border-top:1px solid var(--border);
    }
    .pd-price-block { flex:1; min-width:0; }
    .pd-price-label {
      font-size:9px; font-weight:800; letter-spacing:.13em; text-transform:uppercase;
      color:var(--ink4); margin-bottom:4px;
    }
    .pd-price-num {
      font-family:'Playfair Display', serif;
      font-size:30px; font-weight:700; color:var(--ink);
      letter-spacing:-.02em; line-height:1;
    }
    .pd-price-rq { font-size:13px; color:var(--ink3); font-style:italic; }
    .pd-sale-tag {
      background:var(--amber-bg); border:1px solid var(--amber-bd); color:var(--amber);
      border-radius:8px; padding:5px 12px; font-size:12px; font-weight:700;
    }

    .pd-enquire-btn {
      display:flex; align-items:center; gap:9px;
      padding:14px 28px;
      background:var(--ink); color:var(--bg);
      border:none; border-radius:12px;
      font-family:'Plus Jakarta Sans', sans-serif;
      font-size:14px; font-weight:700;
      letter-spacing:.01em; cursor:pointer;
      transition:all .18s cubic-bezier(.4,0,.2,1);
      white-space:nowrap;
      box-shadow:0 4px 16px rgba(26,23,20,0.2);
    }
    .pd-enquire-btn:hover {
      background:var(--accent);
      transform:translateY(-2px);
      box-shadow:0 8px 24px rgba(200,98,42,0.3);
    }
    .pd-enquire-btn:active { transform:translateY(0); }

    /* ── BOTTOM PAD ── */
    .pd-pad { height:40px; }

    /* ── MODAL ── */
    .pd-overlay {
      position:fixed; inset:0;
      background:rgba(26,23,20,.6);
      backdrop-filter:blur(12px);
      z-index:9999;
      display:flex; align-items:center; justify-content:center; padding:20px;
      animation:fadeIn .18s ease;
    }
    .pd-modal {
      background:var(--surface);
      border-radius:24px; padding:0;
      width:100%; max-width:420px;
      box-shadow:0 32px 80px rgba(0,0,0,.25);
      animation:popIn .24s cubic-bezier(.16,1,.3,1);
      overflow:hidden;
    }
    .pd-modal-header {
      padding:28px 28px 0;
      border-bottom:1px solid var(--border);
      padding-bottom:20px;
      display:flex; align-items:flex-start; justify-content:space-between;
      background:linear-gradient(135deg, var(--surface2), var(--surface));
    }
    .pd-modal-title {
      font-family:'Playfair Display', serif;
      font-size:22px; font-weight:700; color:var(--ink);
      letter-spacing:-.02em; margin-bottom:4px;
    }
    .pd-modal-sub { font-size:12.5px; color:var(--ink3); line-height:1.6; max-width:260px; }
    .pd-modal-x {
      width:32px; height:32px; border-radius:9px;
      background:var(--surface3); border:1px solid var(--border);
      cursor:pointer; color:var(--ink3); font-size:13px;
      display:flex; align-items:center; justify-content:center;
      transition:all .13s; flex-shrink:0;
    }
    .pd-modal-x:hover { background:var(--border2); color:var(--ink); }

    .pd-modal-body { padding:20px 28px 28px; }
    .pd-contact-row {
      display:flex; align-items:center; gap:14px;
      padding:14px 0; border-bottom:1px solid var(--surface2);
    }
    .pd-contact-row:last-of-type { border:none; }
    .pd-contact-icon {
      width:44px; height:44px;
      background:var(--surface2); border-radius:12px;
      border:1px solid var(--border);
      display:flex; align-items:center; justify-content:center;
      font-size:20px; flex-shrink:0;
    }
    .pd-contact-lbl {
      font-size:9px; color:var(--ink4); font-weight:700;
      text-transform:uppercase; letter-spacing:.1em; margin-bottom:3px;
    }
    .pd-contact-val {
      font-size:15px; font-weight:600; color:var(--ink);
      font-family:'JetBrains Mono', monospace;
    }
    .pd-modal-actions { display:flex; gap:8px; margin-top:16px; }
    .pd-action-btn {
      flex:1; border-radius:10px; padding:11px;
      font-size:12px; font-weight:700; cursor:pointer;
      font-family:'Plus Jakarta Sans', sans-serif;
      border:1.5px solid var(--border);
      background:var(--surface2); color:var(--ink2);
      transition:all .14s;
    }
    .pd-action-btn:hover { border-color:var(--border2); background:var(--surface3); }
    .pd-action-btn.copied {
      background:var(--green-bg); border-color:var(--green-bd); color:var(--green);
    }

    /* ── STATES ── */
    .pd-state {
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      min-height:60vh; gap:16px; text-align:center; padding:40px;
    }
    .pd-spinner {
      width:32px; height:32px;
      border:2.5px solid var(--border2);
      border-top-color:var(--ink);
      border-radius:50%;
      animation:spin .7s linear infinite;
    }
    .pd-state-title {
      font-family:'Playfair Display', serif;
      font-size:22px; font-weight:700; color:var(--ink);
    }
    .pd-state-sub { font-size:13px; color:var(--ink3); }

    /* ── RESPONSIVE ── */
    @media(max-width:1024px){
      .pd-layout { grid-template-columns:1fr; }
      .pd-left { position:static; height:auto; border-right:none; border-bottom:1px solid var(--border); }
      .pd-gallery { min-height:300px; padding:28px; }
      .pd-right { position:static; max-height:none; overflow-y:visible; }
      .pd-spec-grid { grid-template-columns:1fr 1fr; }
    }
    @media(max-width:680px){
      .pd-brand-section,.pd-models-section { padding-left:20px; padding-right:20px; }
      .pd-spec-panel { margin-left:20px; margin-right:20px; }
      .pd-bc { padding:16px 20px 0; }
      .pd-model-grid { grid-template-columns:1fr 1fr; }
    }
    @media(max-width:440px){
      .pd-model-grid { grid-template-columns:1fr; }
      .pd-spec-grid { grid-template-columns:1fr; }
      .pd-spec-cell:nth-child(2n) { border-right:none; }
      .pd-spec-cell { border-right:none !important; }
    }
  `;
  document.head.appendChild(el);
}

/* ── Helpers ── */
const fmtKey = k => k.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
const fmtVal = v => {
  if (v === null || v === undefined) return '—';
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (Array.isArray(v)) return v.join(', ');
  if (typeof v === 'object') return Object.entries(v).map(([k, val]) => `${k}: ${val}`).join(' | ');
  return String(v);
};
const SIZE_KEYS = new Set(['size', 'display_size']);

const groupByModel = (variants = []) => {
  const map = new Map();
  for (const v of variants) {
    const sz = v.spec_json?.display_size || v.spec_json?.size || null;
    const base = v.name
      .replace(/\s+\d{2,3}["″'`]?\s*$/i, '')
      .replace(/\s+\d{2,3}\s*inch\s*$/i, '')
      .trim();
    if (!map.has(base)) map.set(base, []);
    map.get(base).push({ ...v, _sz: sz });
  }
  return [...map.entries()].map(([groupName, variants]) => ({ groupName, variants }));
};

/* ── Component ── */
const ProductDetail = () => {
  const navigate = useNavigate();
  const drawerRef = useRef(null);
  const rightRef = useRef(null);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selImg, setSelImg] = useState(0);
  const [imgFade, setImgFade] = useState(false);
  const [activeBrand, setActiveBrand] = useState(null);
  const [activeGroup, setActiveGroup] = useState(null);
  const [activeVariant, setActiveVariant] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  /* Scroll to top on mount */
  useEffect(() => { window.scrollTo(0, 0); }, []);

  /* Fetch product */
  useEffect(() => {
    const id = localStorage.getItem('selectedProductId');
    const type = localStorage.getItem('selectedProductType') || 'product';
    if (!id) { setError('No product selected.'); setLoading(false); return; }
    let live = true;
    (async () => {
      try {
        setLoading(true); setError('');
        const { data } = await axios.get(`${APIURL}/api/products/${id}/?type=${type}`);
        if (!live) return;
        setProduct(data);
        const fb = (data.brands || [])[0] || null;
        setActiveBrand(fb);
        if (fb) {
          const groups = groupByModel(fb.variants || []);
          let tg = groups[0] || null, tv = tg?.variants[0] || null;
          if (data.focused_variant_id) {
            for (const g of groups) {
              const m = g.variants.find(v => v.id === data.focused_variant_id);
              if (m) { tg = g; tv = m; break; }
            }
          }
          setActiveGroup(tg); setActiveVariant(tv);
        }
      } catch (e) {
        if (!live) return;
        setError(e?.response?.data?.error || e?.message || 'Failed to load.');
      } finally {
        if (live) setLoading(false);
      }
    })();
    return () => { live = false; };
  }, []);

  const varGroups = useMemo(() => groupByModel(activeBrand?.variants || []), [activeBrand]);

  const images = useMemo(() => {
    if (!product) return [];
    const list = [];
    (product.images || []).forEach(i => list.push({ id: i.id, src: resolveImg(i.image_url), alt: i.alt_text || product.name }));
    if (!list.length)
      (product.brands || []).forEach(b => (b.variants || []).forEach(v => (v.images || []).forEach(i =>
        list.push({ id: i.id, src: resolveImg(i.image_url), alt: i.alt_text || product.name })
      )));
    return list.length ? list : [{ id: 0, src: 'https://via.placeholder.com/600x600?text=No+Image', alt: product?.name || 'Product' }];
  }, [product]);

  const switchImg = i => {
    if (i === selImg) return;
    setImgFade(true);
    setTimeout(() => { setSelImg(i); setImgFade(false); }, 200);
  };

  const pickBrand = b => {
    setActiveBrand(b);
    const groups = groupByModel(b.variants || []);
    const fg = groups[0] || null;
    setActiveGroup(fg); setActiveVariant(fg?.variants[0] || null);
  };

  const pickGroup = g => {
    if (activeGroup?.groupName === g.groupName) { setActiveGroup(null); setActiveVariant(null); return; }
    setActiveGroup(g);
    setActiveVariant(g.variants[0] || null);
    setTimeout(() => drawerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80);
  };

  const copyPhone = () => { navigator.clipboard.writeText('9061576222'); setCopiedPhone(true); setTimeout(() => setCopiedPhone(false), 2000); };
  const copyEmail = () => { navigator.clipboard.writeText('info@etome.in'); setCopiedEmail(true); setTimeout(() => setCopiedEmail(false), 2000); };

  const inStock = activeVariant ? activeVariant.stock_status === 'in_stock' : true;
  const priceStr = (() => {
    if (!activeVariant) return null;
    const p = activeVariant.current_price ?? activeVariant.price;
    return p != null ? `₹${Number(p).toLocaleString('en-IN')}` : null;
  })();
  const specRows = useMemo(() => {
    if (!activeVariant?.spec_json) return [];
    return Object.entries(activeVariant.spec_json)
      .filter(([k, v]) => !SIZE_KEYS.has(k) && v !== null && v !== undefined && v !== '');
  }, [activeVariant]);

  const brands = product?.brands || [];

  /* ── States ── */
  if (loading) return (
    <div className="pd-page">
      <Header />
      <div className="pd-state">
        <div className="pd-spinner" />
        <p style={{ color: 'var(--ink4)', fontSize: 13, fontWeight: 600, letterSpacing: '.05em' }}>Loading product…</p>
      </div>
      <Footer />
    </div>
  );

  if (error || !product) return (
    <div className="pd-page">
      <Header />
      <div className="pd-state">
        <p className="pd-state-title">{error || 'Product not found'}</p>
        <p className="pd-state-sub">We couldn't load this product. Try going back.</p>
        <button className="pd-enquire-btn" style={{ marginTop: 8 }} onClick={() => navigate('/edumart')}>← Back to Products</button>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="pd-page">
      <Header />

      <div className="pd-layout">

        {/* ═══ LEFT: Image Gallery ═══ */}
        <div className="pd-left">
          <div className="pd-gallery">
            <div className={`pd-stock ${inStock ? 'ok' : 'no'}`}>
              <span className="pd-stock-dot" />
              {inStock ? 'In Stock' : 'Out of Stock'}
            </div>
            <img
              className={`pd-main-img${imgFade ? ' fade' : ''}`}
              src={images[selImg]?.src}
              alt={images[selImg]?.alt}
              onError={e => { e.currentTarget.src = 'https://via.placeholder.com/600x600?text=No+Image'; }}
            />
          </div>

          {images.length > 1 && (
            <div className="pd-thumbs-row">
              {images.slice(0, 8).map((img, i) => (
                <div
                  key={`${img.id}-${i}`}
                  className={`pd-thumb${i === selImg ? ' on' : ''}`}
                  onClick={() => switchImg(i)}
                >
                  <img src={img.src} alt={img.alt} onError={e => { e.currentTarget.src = 'https://via.placeholder.com/80'; }} />
                </div>
              ))}
            </div>
          )}

          <div className="pd-name-block">
            <h1 className="pd-product-title">{product.name}</h1>
            {product.description && <p className="pd-product-desc">{product.description}</p>}
          </div>
        </div>

        {/* ═══ RIGHT: Interactive Content ═══ */}
        <div className="pd-right" ref={rightRef}>

          {/* Breadcrumb */}
          <nav className="pd-bc">
            <span className="pd-bc-link" onClick={() => navigate('/edumart')}>Products</span>
            {product.category?.name && (
              <><span className="pd-bc-sep">›</span><span className="pd-bc-link">{product.category.name}</span></>
            )}
            <span className="pd-bc-sep">›</span>
            <span className="pd-bc-cur">{product.name}</span>
          </nav>

          {/* Brand section */}
          {brands.length > 0 && (
            <div className="pd-brand-section">
              <div className="pd-brand-header">
                <span className="pd-section-label">Brand</span>
              </div>
              <div className="pd-brand-pills">
                {brands.map(b => (
                  <div
                    key={b.id}
                    className={`pd-brand-pill${activeBrand?.id === b.id ? ' on' : ''}`}
                    onClick={() => pickBrand(b)}
                  >
                    <span className="pd-brand-dot" />
                    {b.logo && (
                      <img
                        src={resolveImg(b.logo)} alt={b.name}
                        style={{ height: 16, objectFit: 'contain' }}
                        onError={e => { e.currentTarget.style.display = 'none'; }}
                      />
                    )}
                    {b.name}
                    <span className="pd-brand-count">{groupByModel(b.variants || []).length}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Models grid */}
          {activeBrand && varGroups.length > 0 && (
            <div className="pd-models-section">
              <div className="pd-models-header">
                <span className="pd-section-label">{activeBrand.name} — Models</span>
                <span className="pd-models-meta">{varGroups.length} model{varGroups.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="pd-model-grid">
                {varGroups.map(g => {
                  const isOn = activeGroup?.groupName === g.groupName;
                  const allOut = g.variants.every(v => v.stock_status !== 'in_stock');
                  return (
                    <div
                      key={g.groupName}
                      className={`pd-model-card${isOn ? ' on' : ''}`}
                      onClick={() => pickGroup(g)}
                    >
                      <div className="pd-mc-header">
                        <span className={`pd-mc-status${allOut ? ' out' : ''}`} />
                        <span className="pd-mc-name">{g.groupName}</span>
                        <span className="pd-mc-badge">{g.variants.length}</span>
                      </div>
                      {g.variants.length > 1 && (
                        <div className="pd-mc-sizes" onClick={e => e.stopPropagation()}>
                          {g.variants.map(v => {
                            const lbl = v._sz || v.name;
                            const oos = v.stock_status !== 'in_stock';
                            const sel = activeVariant?.id === v.id && isOn;
                            return (
                              <span
                                key={v.id}
                                className={`pd-sz-chip${sel ? ' on' : ''}${oos ? ' oos' : ''}`}
                                onClick={e => {
                                  e.stopPropagation();
                                  if (!oos) {
                                    if (!isOn) setActiveGroup(g);
                                    setActiveVariant(v);
                                    if (!isOn) setTimeout(() => drawerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80);
                                  }
                                }}
                              >
                                {lbl}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spec panel */}
          {activeGroup && activeVariant && (
            <div ref={drawerRef} style={{ paddingTop: 0 }}>
              <div className="pd-spec-panel">

                <div className="pd-spec-head">
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="pd-spec-title">
                      {activeGroup.groupName}
                      {activeVariant._sz && (
                        <span style={{ color: 'var(--blue)', fontWeight: 500, fontSize: 15 }}> · {activeVariant._sz}</span>
                      )}
                    </div>
                    <div className="pd-spec-subtitle">{activeBrand?.name}</div>
                    <div className="pd-spec-badges">
                      <span className={`pd-badge ${activeVariant.stock_status === 'in_stock' ? 'ok' : 'no'}`}>
                        {activeVariant.stock_status === 'in_stock' ? 'In Stock' : 'Out of Stock'}
                      </span>
                      {activeVariant.lifecycle_status === 'active' && <span className="pd-badge info">Active</span>}
                      {activeVariant.is_on_sale && <span className="pd-badge am">On Sale</span>}
                      {activeVariant.sku && <span className="pd-badge neu">{activeVariant.sku}</span>}
                    </div>
                  </div>
                  <button className="pd-close-btn" onClick={() => { setActiveGroup(null); setActiveVariant(null); }}>✕</button>
                </div>

                {specRows.length > 0 ? (
                  <div className="pd-spec-grid" key={activeVariant.id}>
                    {specRows.map(([key, val]) => {
                      const isBool = typeof val === 'boolean';
                      return (
                        <div key={key} className="pd-spec-cell">
                          <div className="pd-spec-k">{fmtKey(key)}</div>
                          {isBool ? (
                            val
                              ? <span className="pd-bool-y">
                                  <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                  Yes
                                </span>
                              : <span className="pd-bool-n">
                                  <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M3 9l6-6M9 9L3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                                  No
                                </span>
                          ) : (
                            <div className="pd-spec-v">{fmtVal(val)}</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="pd-spec-empty">No specifications listed for this variant.</div>
                )}

                <div className="pd-price-cta">
                  <div className="pd-price-block">
                    <div className="pd-price-label">Price</div>
                    {priceStr
                      ? <div className="pd-price-num">{priceStr}</div>
                      : <div className="pd-price-rq">Enquire for pricing</div>
                    }
                  </div>
                  {activeVariant.is_on_sale && (activeVariant.discount_percentage || 0) > 0 && (
                    <span className="pd-sale-tag">{activeVariant.discount_percentage}% OFF</span>
                  )}
                  <button className="pd-enquire-btn" onClick={() => setShowModal(true)}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Enquire Now
                  </button>
                </div>

              </div>
            </div>
          )}

          <div className="pd-pad" />
        </div>
      </div>

      <Footer />

      {/* ── Modal ── */}
      {showModal && (
        <div className="pd-overlay" onClick={() => setShowModal(false)}>
          <div className="pd-modal" onClick={e => e.stopPropagation()}>
            <div className="pd-modal-header">
              <div>
                <h3 className="pd-modal-title">Get in Touch</h3>
                <p className="pd-modal-sub">
                  Interested in <strong style={{ color: 'var(--ink)' }}>
                    {activeGroup?.groupName || product.name}
                    {activeVariant?._sz ? ` · ${activeVariant._sz}` : ''}
                  </strong>? Our team will respond promptly.
                </p>
              </div>
              <button className="pd-modal-x" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="pd-modal-body">
              <div className="pd-contact-row">
                <div className="pd-contact-icon">📞</div>
                <div>
                  <div className="pd-contact-lbl">Phone</div>
                  <div className="pd-contact-val">9061576222</div>
                </div>
              </div>
              <div className="pd-contact-row">
                <div className="pd-contact-icon">📧</div>
                <div>
                  <div className="pd-contact-lbl">Email</div>
                  <div className="pd-contact-val">info@etome.in</div>
                </div>
              </div>
              <div className="pd-modal-actions">
                <button className={`pd-action-btn${copiedPhone ? ' copied' : ''}`} onClick={copyPhone}>
                  {copiedPhone ? '✓ Copied!' : 'Copy Phone'}
                </button>
                <button className={`pd-action-btn${copiedEmail ? ' copied' : ''}`} onClick={copyEmail}>
                  {copiedEmail ? '✓ Copied!' : 'Copy Email'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;