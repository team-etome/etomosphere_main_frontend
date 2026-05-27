import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import './edumart.css';
import axios from 'axios';
import etomosphereVideo from '../../assets/etomosphere.mp4';

/* ─── Font ────────────────────────────────────────────────────────────────── */
if (!document.getElementById('edumart-font')) {
  const l = document.createElement('link');
  l.id = 'edumart-font';
  l.rel = 'stylesheet';
  l.href =
    'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap';
  document.head.appendChild(l);
}

/* ─── Config ──────────────────────────────────────────────────────────────── */
const APIURL = import.meta.env.VITE_API_URL || '';
const DEFAULT_FILTERS = {
  solutions: [],
  categories: [],
  brands: [],
};

/* ─── Image helpers ───────────────────────────────────────────────────────── */
const resolveImg = (url) => {
  if (!url) return null;
  return url.startsWith('http') ? url : `${APIURL}${url}`;
};

const firstImg = (arr = []) => {
  const found = arr.find((i) => i.is_main) || arr[0];
  return resolveImg(found?.image_url);
};

/* ─── Flatten API → displayable cards ──────────────────────────────────────── */
const flattenProducts = (categories = []) => {
  const cards = [];

  categories.forEach((cat) => {
    const catName = cat.name || 'Uncategorized';
    const solName = cat.solution || 'General';
    const catImgs = cat.images || [];

    (cat.products || []).forEach((prod) => {
      const prodImgs = prod.images || [];
      const brands = prod.brands || [];

      const allVariantImgs = brands.flatMap((b) =>
        (b.variants || []).flatMap((v) => v.images || [])
      );
      const image =
        firstImg(prodImgs) || firstImg(allVariantImgs) || firstImg(catImgs);

      const allPrices = brands
        .flatMap((b) => b.variants || [])
        .map((v) => (v.current_price != null ? parseFloat(v.current_price) : null))
        .filter((p) => p !== null);
      const minPrice = allPrices.length > 0 ? Math.min(...allPrices) : null;

      const totalVariants = brands.flatMap((b) => b.variants || []).length;
      const brandNames = brands.map((b) => b.name);

      cards.push({
        id: `p-${prod.id}`,
        variantId: null,
        productId: prod.id,
        brandId: null,
        name: prod.name,
        productName: prod.name,
        brandName: brandNames.join(', '),
        brandNames,
        categoryName: catName,
        solutionName: solName,
        sku: '',
        description: prod.description || '',
        specJson: {},
        price: minPrice,
        originalPrice: null,
        isOnSale: false,
        discountPct: 0,
        inStock: true,
        stockStatus: 'in_stock',
        variantCount: totalVariants,
        image,
        tier: 'product',
        raw: { category: cat, product: prod },
      });
    });
  });

  return cards;
};

/* ─── Filter Panel ────────────────────────────────────────────────────────── */
function FilterPanel({ solutions, categories, brands, filters, onChange, onApply, onReset, onClose }) {
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.35)',
          zIndex: 300,
          backdropFilter: 'blur(2px)',
        }}
      />
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: 'min(340px, 100vw)',
          height: '100vh',
          background: '#ffffff',
          zIndex: 10001,
          boxShadow: '-10px 0 50px rgba(0,0,0,0.18)',
          display: 'flex',
          flexDirection: 'column',
          padding: '28px 22px',
          overflowY: 'auto',
          animation: 'fpIn .25s cubic-bezier(.4,0,.2,1)',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 700, color: '#0f172a' }}>
              Filters
            </div>
            <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>Refine your selection</div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: '1px solid #e5e7eb', borderRadius: 7,
              width: 32, height: 32, cursor: 'pointer', fontSize: 15, color: '#6b7280',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >✕</button>
        </div>

        {/* Solutions */}
        {solutions.length > 0 && (
          <SectionBlock label="⊕  SOLUTIONS">
            {solutions.map((s) => (
              <CheckRow
                key={s} label={s}
                checked={filters.solutions.includes(s)}
                onChange={() => {
                  const next = filters.solutions.includes(s)
                    ? filters.solutions.filter((x) => x !== s)
                    : [...filters.solutions, s];
                  onChange({ ...filters, solutions: next });
                }}
              />
            ))}
          </SectionBlock>
        )}

        {/* Categories */}
        {categories.length > 0 && (
          <SectionBlock label="◈  CATEGORIES">
            {categories.map((c) => (
              <CheckRow
                key={c} label={c}
                checked={filters.categories.includes(c)}
                onChange={() => {
                  const next = filters.categories.includes(c)
                    ? filters.categories.filter((x) => x !== c)
                    : [...filters.categories, c];
                  onChange({ ...filters, categories: next });
                }}
              />
            ))}
          </SectionBlock>
        )}

        {/* Brands */}
        {brands.length > 0 && (
          <SectionBlock label="◉  BRANDS">
            {brands.map((b) => (
              <CheckRow
                key={b} label={b}
                checked={filters.brands.includes(b)}
                onChange={() => {
                  const next = filters.brands.includes(b)
                    ? filters.brands.filter((x) => x !== b)
                    : [...filters.brands, b];
                  onChange({ ...filters, brands: next });
                }}
              />
            ))}
          </SectionBlock>
        )}

        <div style={{ flex: 1 }} />

        <button
          onClick={onApply}
          style={{
            width: '100%', background: '#1e293b', color: '#fff', border: 'none',
            borderRadius: 10, padding: '13px 0', fontSize: 15, fontWeight: 700,
            cursor: 'pointer', marginTop: 28, fontFamily: "'Syne',sans-serif",
          }}
        >
          Apply Filters
        </button>
        <button
          onClick={onReset}
          style={{
            width: '100%', background: 'none', border: 'none',
            color: '#9ca3af', fontSize: 13, cursor: 'pointer', padding: '8px 0',
          }}
        >
          ↺ Reset All
        </button>
      </div>
      <style>{`@keyframes fpIn { from{transform:translateX(100%)} to{transform:translateX(0)} }`}</style>
    </>
  );
}

function SectionBlock({ label, children }) {
  return (
    <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 16, marginBottom: 20 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: '#94a3b8', marginBottom: 12, fontFamily: "'Syne',sans-serif" }}>
        {label}
      </div>
      {children}
    </div>
  );
}

function CheckRow({ label, checked, onChange }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, cursor: 'pointer' }}>
      <span
        style={{
          width: 17, height: 17, borderRadius: 4, border: '2px solid',
          borderColor: checked ? '#1e293b' : '#d1d5db',
          background: checked ? '#1e293b' : '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, transition: 'all .15s',
        }}
      >
        {checked && (
          <svg width="10" height="10" viewBox="0 0 10 10">
            <polyline points="1.5,5.5 4,8 8.5,2" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          </svg>
        )}
      </span>
      <input type="checkbox" style={{ display: 'none' }} checked={checked} onChange={onChange} />
      <span style={{ fontSize: 14, color: '#374151' }}>{label}</span>
    </label>
  );
}

/* ─── Hero ────────────────────────────────────────────────────────────────── */
function HeroSection() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) { videoRef.current.play(); setPlaying(true); }
    else { videoRef.current.pause(); setPlaying(false); }
  };
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted((m) => !m);
  };

  return (
    <div style={{
      background: '#ffffff',
      padding: 'clamp(28px, 4vw, 56px) clamp(18px, 4vw, 60px) clamp(24px, 3vw, 48px)',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 'clamp(24px, 3vw, 48px)',
      alignItems: 'center',
      minHeight: 'clamp(260px, 35vw, 400px)',
    }}>
      <div>
        <h1 style={{
  fontFamily: "'Manrope', sans-serif",
  fontSize: '96px',
  fontWeight: 400,
  color: '#222222',
  lineHeight: 1.1,
  margin: '0 0 14px',
  letterSpacing: '-4.8px',
}}>
  Explore<br />Products
</h1>
        <p style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: 'clamp(13px, 1.5vw, 15px)',
          color: '#475569', lineHeight: 'normal',fontWeight: 400,
          margin: '0 0 24px', maxWidth: 380,
        }}>
          Shop from a wide range of educational and lifestyle products designed to enhance learning experiences. From smart devices to accessories, explore top brands and trusted solutions,{' '}
          <strong style={{ color: '#0f172a' }}>all in one place.</strong>
        </p>
      </div>
      {/* ── RIGHT SIDE ── */}
<div style={{ position: 'relative' }}>
  <div style={{
    borderRadius: 24,
    overflow: 'hidden',
    aspectRatio: '16/9',
    boxShadow: '0 32px 80px rgba(0,0,0,0.18)',
  }}>
    <video
      autoPlay muted loop playsInline
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      src={etomosphereVideo}
    />
  </div>
</div>
      <style>{`@keyframes livePulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.4)} }`}</style>
    </div>
  );
}

function VidBtn({ onClick, children }) {
  return (
    <button onClick={onClick} style={{
      background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(6px)',
      border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8,
      width: 34, height: 34, cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {children}
    </button>
  );
}

/* ─── Product Card ────────────────────────────────────────────────────────── */
function ProductCard({ product, onClick }) {
  const [hov, setHov] = useState(false);
  const PLACEHOLDER = 'https://via.placeholder.com/400x500?text=No+Image';

  return (
    <div
      onClick={() => onClick(product)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease' }}
    >
      <div style={{
        position: 'relative', width: '100%', aspectRatio: '1/1',
        overflow: 'hidden', background: '#fff',
        borderRadius: '12px', border: '1.5px solid #e2e8f0',
boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
      }}>
        <img
          src={product.image || PLACEHOLDER}
          alt={product.name}
          style={{
            width: '100%', height: '100%', objectFit: 'contain', padding: '20px',
            transform: hov ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </div>
      <div style={{ padding: '16px 4px' }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15, color: '#1a1a1a', marginBottom: 4 }}>
          {product.name}
        </div>
        {/* {product.brandName && (
          <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500, marginBottom: 4 }}>
            {product.brandName}
          </div>
        )} */}
        <div style={{ fontSize: 14, color: '#757575', fontWeight: 400 }}>
          {product.price
            ? `₹${Number(product.price).toLocaleString('en-IN')}`
            : 'Enquire for Price'}
        </div>
      </div>
    </div>
  );
}

/* ─── Active Filter Chip ──────────────────────────────────────────────────── */
function Chip({ label, onRemove }) {
  return (
    <span
      onClick={onRemove}
      style={{
        background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 20,
        padding: '4px 12px', fontSize: 12, fontWeight: 600, color: '#334155',
        cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
      }}
    >
      {label} <span style={{ color: '#94a3b8' }}>✕</span>
    </span>
  );
}
/* ─── Sort Dropdown ───────────────────────────────────────────────────────── */
function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const options = [
    { value: 'newest',     label: 'Newest' },
    { value: 'name',       label: 'Name A–Z' },
    { value: 'price-asc',  label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
  ];

  const selected = options.find(o => o.value === value);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#f1f1f1', border: 'none', borderRadius: 40,
          padding: '12px 20px', cursor: 'pointer',
          fontSize: 14, color: '#1a1a1a',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <span style={{ color: '#757575', fontSize: 13 }}>Sort:</span>
        <span style={{ fontWeight: 600 }}>{selected?.label}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
          <path d="M2 4l4 4 4-4" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0,
          background: '#fff', borderRadius: 14,
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          overflow: 'hidden', zIndex: 200, minWidth: 210,
          border: '1px solid #f1f1f1',
        }}>
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '100%', padding: '12px 16px',
                background: opt.value === value ? '#f0f7ff' : 'transparent',
                border: 'none', cursor: 'pointer', textAlign: 'left',
                fontSize: 14, fontWeight: opt.value === value ? 600 : 400,
                color: opt.value === value ? '#0066b2' : '#374151',
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={e => { if (opt.value !== value) e.currentTarget.style.background = '#f8fafc'; }}
              onMouseLeave={e => { if (opt.value !== value) e.currentTarget.style.background = 'transparent'; }}
            >
              {opt.label}
              {opt.value === value && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7l3 3 6-6" stroke="#0066b2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
/* ─── Main Page ───────────────────────────────────────────────────────────── */
export default function Edumart() {
  const navigate = useNavigate();

  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [panelOpen, setPanelOpen] = useState(false);
  const [pending, setPending] = useState(DEFAULT_FILTERS);
  const [applied, setApplied] = useState(DEFAULT_FILTERS);
  const [sortBy, setSort] = useState('newest');

  /* ── Body class side-effect ── */
  useEffect(() => {
    document.body.classList.toggle('filters-open', panelOpen);
    return () => document.body.classList.remove('filters-open');
  }, [panelOpen]);

  /* ── Fetch & flatten ── */
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true); setError('');
        const res = await axios.get(`${APIURL}/api/products/`);
        if (!active) return;
        const raw = res.data?.categories ?? res.data?.products ?? res.data ?? [];
        const list = Array.isArray(raw) ? raw : [];
        const flat = flattenProducts(list);
        setAllItems(flat);
      } catch (e) {
        if (active) setError(e?.response?.data?.detail || e?.message || 'Failed to load products.');
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  /* ── Derived filter options ── */
  const solutions  = useMemo(() => [...new Set(allItems.map((p) => p.solutionName))].sort(), [allItems]);
  const categories = useMemo(() => [...new Set(allItems.map((p) => p.categoryName))].sort(), [allItems]);
  const brands     = useMemo(() => [...new Set(allItems.flatMap((p) => p.brandNames))].sort(), [allItems]);

  /* ── Filtered list ── */
  const filtered = useMemo(() => {
    let list = allItems.filter((p) => {
      if (applied.solutions.length  && !applied.solutions.includes(p.solutionName))  return false;
      if (applied.categories.length && !applied.categories.includes(p.categoryName)) return false;
      if (applied.brands.length     && !applied.brands.some((b) => p.brandNames.includes(b))) return false;
      return true;
    });
    if (sortBy === 'price-asc')  list = [...list].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    if (sortBy === 'price-desc') list = [...list].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    if (sortBy === 'name')       list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [allItems, applied, sortBy]);

  /* ── Active filter chips ── */
  const activeChips = [
    ...applied.solutions.map((s)  => ({ label: `Solution: ${s}`,  remove: () => setApplied((f) => ({ ...f, solutions:  f.solutions.filter((x)  => x !== s) })) })),
    ...applied.categories.map((c) => ({ label: `Category: ${c}`,  remove: () => setApplied((f) => ({ ...f, categories: f.categories.filter((x) => x !== c) })) })),
    ...applied.brands.map((b)     => ({ label: `Brand: ${b}`,     remove: () => setApplied((f) => ({ ...f, brands:     f.brands.filter((x)     => x !== b) })) })),
  ];

  const handleProductClick = (product) => {
    const id   = product.variantId ?? product.productId;
    const type = product.variantId ? 'variant' : 'product';
    localStorage.setItem('selectedProductId',   String(id));
    localStorage.setItem('selectedProductType', type);
    navigate('/productdetail');
  };

  const totalActive = applied.solutions.length + applied.categories.length + applied.brands.length;

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: '#ffffff', minHeight: '100vh' }}>
      <Header />
      <HeroSection />

      {/* ── Toolbar ── */}
      <div style={{
        padding: 'clamp(20px, 3vw, 40px) clamp(16px, 4vw, 60px) 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
        maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box',
      }}>
        <div style={{ fontSize: 14, color: '#1a1a1a' }}>
          Showing <strong style={{ fontWeight: 700 }}>{filtered.length}</strong> products
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          {/* Sort */}
          <SortDropdown value={sortBy} onChange={setSort} />

          {/* Filter button */}
          <button
            onClick={() => { setPending({ ...applied }); setPanelOpen(true); }}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: '#0066b2', color: '#fff', border: 'none',
              borderRadius: 40, padding: '12px 24px',
              fontSize: 14, fontWeight: 600, cursor: 'pointer',
              position: 'relative',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" />
            </svg>
            Filter
            {totalActive > 0 && (
              <span style={{
                position: 'absolute', top: -6, right: -6,
                background: '#ef4444', color: '#fff',
                borderRadius: '50%', width: 20, height: 20,
                fontSize: 11, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {totalActive}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── Active filter chips ── */}
      {activeChips.length > 0 && (
        <div style={{
          padding: '0 clamp(16px, 4vw, 60px) 12px',
          maxWidth: '1400px', margin: '0 auto',
          display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center',
        }}>
          {activeChips.map((chip, i) => (
            <Chip key={i} label={chip.label} onRemove={chip.remove} />
          ))}
          <button
            onClick={() => { setPending(DEFAULT_FILTERS); setApplied(DEFAULT_FILTERS); }}
            style={{ fontSize: 12, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
          >
            Clear all
          </button>
        </div>
      )}

      {/* ── Grid ── */}
      <main style={{ padding: 'clamp(16px, 3vw, 32px) clamp(16px, 4vw, 60px) clamp(40px, 5vw, 60px)' }}>
        {loading && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#94a3b8', fontSize: 16 }}>
            Loading products…
          </div>
        )}
        {!loading && error && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#ef4444' }}>{error}</div>
        )}
        {!loading && !error && filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 18, color: '#94a3b8', fontFamily: "'Syne',sans-serif" }}>
              No products match your filters.
            </div>
            <button
              onClick={() => { setPending(DEFAULT_FILTERS); setApplied(DEFAULT_FILTERS); }}
              style={{
                marginTop: 18, background: '#1e293b', color: '#fff', border: 'none',
                borderRadius: 10, padding: '11px 28px', fontSize: 14,
                cursor: 'pointer', fontFamily: "'Syne',sans-serif", fontWeight: 600,
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
        {!loading && !error && filtered.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(220px, 100%), 1fr))',
            gap: 'clamp(20px, 3vw, 40px) clamp(12px, 2vw, 24px)',
            width: '100%',
          }}>
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onClick={handleProductClick} />
            ))}
          </div>
        )}
      </main>

      <Footer />

      {panelOpen && (
        <FilterPanel
          solutions={solutions}
          categories={categories}
          brands={brands}
          filters={pending}
          onChange={setPending}
          onApply={() => { setApplied({ ...pending }); setPanelOpen(false); }}
          onReset={() => { setPending(DEFAULT_FILTERS); setApplied(DEFAULT_FILTERS); setPanelOpen(false); }}
          onClose={() => setPanelOpen(false)}
        />
      )}
    </div>
  );
}