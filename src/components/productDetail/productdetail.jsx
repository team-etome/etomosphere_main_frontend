import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import { useCart } from '../../context/CartContext.jsx';
import './productdetail.css';
import axios from 'axios';

const APIURL = import.meta.env.VITE_API_URL || '';

const resolveImg = (url) => {
  if (!url) return null;
  return url.startsWith('http') ? url : `${APIURL}${url}`;
};

const fmtKey = (k) => k.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
const fmtVal = (v) => {
  if (v === null || v === undefined) return '—';
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  if (Array.isArray(v)) return v.join(', ');
  if (typeof v === 'object') return Object.entries(v).map(([k, val]) => `${k}: ${val}`).join(' | ');
  return String(v);
};

const SIZE_KEYS = new Set(['size', 'display_size']);

const isAccessory = (v) => v?.spec_json?.is_accessory === true;

// Warranty-grouped variants: have spec_json.size AND name contains "(N Y)" pattern
const WARRANTY_RE = /\((\d+)\s*Y\)/i;
const extractWarranty = (name = '') => {
  const m = WARRANTY_RE.exec(name);
  return m ? `${m[1]} Year${m[1] === '1' ? '' : 's'}` : null;
};
const isWarrantyGrouped = (variants = []) =>
  variants.length > 1 &&
  variants.some((v) => v.spec_json?.size) &&
  variants.some((v) => WARRANTY_RE.test(v.name));

// Matches a variant name that is nothing but a screen size, e.g. 32", 43", 55.5", 65 inch
const SIZE_NAME_RE = /^\d+(\.\d+)?["']?\s*(inch|")?$/i;

const extractSizeLabel = (name = '') => {
  // matches trailing (65"), (75"), (86"), (55.5") etc.
  const m = /\((\d{2,3}(?:\.\d+)?)\s*["″'`]?\)\s*$/.exec(name);
  return m ? m[1] + '"' : null;
};

const groupByModel = (variants = []) => {
  const map = new Map();
  for (const v of variants) {
    const sz = v.spec_json?.display_size || v.spec_json?.size
      || extractSizeLabel(v.name) || null;
    const base = v.name
      .replace(/\s*\(\d{2,3}(?:\.\d+)?\s*["″'`]?\)\s*$/i, '') // strip (65") pattern
      .replace(/\s+\d{2,3}(?:\.\d+)?["″'`]?\s*$/i, '')          // strip bare 65"
      .replace(/\s+\d{2,3}\s*inch\s*$/i, '')
      .trim();
    if (!map.has(base)) map.set(base, []);
    map.get(base).push({ ...v, _sz: sz });
  }
  return [...map.entries()].map(([groupName, variants]) => ({ groupName, variants }));
};

const PLACEHOLDER = 'https://via.placeholder.com/600x600?text=No+Image';

// All images across every variant of a brand
const getBrandImages = (brand, name = '') =>
  (brand?.variants || []).flatMap((v) =>
    (v.images || []).map((img) => ({
      src: resolveImg(img.image_url),
      alt: img.alt_text || name,
    }))
  );

/* ── Flipkart-style hover zoom: lens on the image + magnified pane beside it ── */
function ZoomImage({ src, alt, className = '', imgClassName = '', zoom = 2.4, paneWidth, paneHeight, onError }) {
  const wrapRef = useRef(null);
  const [hover, setHover] = useState(false);
  const [bgPos, setBgPos] = useState({ x: 50, y: 50 });
  const [lens, setLens]   = useState({ x: 0, y: 0, w: 0, h: 0 });
  const [side, setSide]   = useState('right');

  const track = (e) => {
    const rect = wrapRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const px = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const py = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setBgPos({ x: px, y: py });

    const lensW = rect.width / zoom;
    const lensH = rect.height / zoom;
    const lensX = Math.max(0, Math.min(rect.width  - lensW, (e.clientX - rect.left) - lensW / 2));
    const lensY = Math.max(0, Math.min(rect.height - lensH, (e.clientY - rect.top)  - lensH / 2));
    setLens({ x: lensX, y: lensY, w: lensW, h: lensH });
  };

  const handleEnter = (e) => {
    const rect = wrapRef.current.getBoundingClientRect();
    const pw = paneWidth || rect.width;
    setSide(window.innerWidth - rect.right >= pw + 24 ? 'right' : 'left');
    setHover(true);
    track(e);
  };

  return (
    <div
      className={`zoom-wrap zoom-pane-${side}${hover ? ' zoom-hover' : ''} ${className}`}
      ref={wrapRef}
      onMouseEnter={handleEnter}
      onMouseMove={track}
      onMouseLeave={() => setHover(false)}
    >
      <div className="zoom-clip">
        <img
          className={`zoom-base-img ${imgClassName}`}
          src={src}
          alt={alt}
          onError={onError}
        />
      </div>
      <div className="zoom-lens" style={{ left: lens.x, top: lens.y, width: lens.w, height: lens.h }} />
      <div
        className="zoom-pane"
        style={{
          width:  paneWidth  || '100%',
          height: paneHeight || '100%',
          backgroundImage: src ? `url(${src})` : 'none',
          backgroundSize: `${zoom * 100}%`,
          backgroundPosition: `${bgPos.x}% ${bgPos.y}%`,
        }}
      />
    </div>
  );
}

export default function ProductDetail() {
  const navigate = useNavigate();
  const { addToCart, removeFromCart, updateQty, cartItems } = useCart();

  const [product,       setProduct]       = useState(null);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState('');
  const [selImg,        setSelImg]        = useState(0);
  const [imgFade,       setImgFade]       = useState(false);
  const [activeBrand,   setActiveBrand]   = useState(null);
  const [activeGroup,   setActiveGroup]   = useState(null);
  const [activeVariant, setActiveVariant] = useState(null);
  const [activeSize,    setActiveSize]    = useState(null);
  const [activeWarranty, setActiveWarranty] = useState(null);
  const [showModal,     setShowModal]     = useState(false);
  const [copied,        setCopied]        = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const id   = localStorage.getItem('selectedProductId');
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
          const nonAcc = (fb.variants || []).filter((v) => !isAccessory(v));
          if (isWarrantyGrouped(nonAcc)) {
            const sizes = [...new Set(nonAcc.map((v) => v.spec_json?.size).filter(Boolean))];
            const firstSize = sizes[0] || null;
            setActiveSize(firstSize);
            const sizeVars = nonAcc.filter((v) => v.spec_json?.size === firstSize);
            const firstVar = sizeVars[0] || null;
            setActiveWarranty(extractWarranty(firstVar?.name || ''));
            setActiveVariant(firstVar);
          } else {
            const groups = groupByModel(nonAcc);
            let tg = groups[0] || null, tv = tg?.variants[0] || null;
            if (data.focused_variant_id) {
              for (const g of groups) {
                const m = g.variants.find((v) => v.id === data.focused_variant_id);
                if (m) { tg = g; tv = m; break; }
              }
            }
            setActiveGroup(tg); setActiveVariant(tv);
          }
        }
      } catch (e) {
        if (live) setError(e?.response?.data?.error || e?.message || 'Failed to load.');
      } finally {
        if (live) setLoading(false);
      }
    })();
    return () => { live = false; };
  }, []);

  // Accessories (e.g. case covers, keyboard cases) are shown in their own section
  // below and excluded from the MODELS list / display-size picker.
  const mainVariants = useMemo(
    () => (activeBrand?.variants || []).filter((v) => !isAccessory(v)),
    [activeBrand]
  );
  const accessoryVariants = useMemo(
    () => (activeBrand?.variants || []).filter((v) => isAccessory(v)),
    [activeBrand]
  );

  const varGroups = useMemo(() => groupByModel(mainVariants), [mainVariants]);

  const warrantyGrouped = useMemo(() => isWarrantyGrouped(mainVariants), [mainVariants]);

  const uniqueSizes = useMemo(() => {
    if (!warrantyGrouped) return [];
    const seen = new Set();
    return mainVariants.map((v) => v.spec_json?.size).filter((s) => s && !seen.has(s) && seen.add(s));
  }, [warrantyGrouped, mainVariants]);

  const uniqueWarranties = useMemo(() => {
    if (!warrantyGrouped || !activeSize) return [];
    const seen = new Set();
    return mainVariants
      .filter((v) => v.spec_json?.size === activeSize)
      .map((v) => extractWarranty(v.name))
      .filter((w) => w && !seen.has(w) && seen.add(w));
  }, [warrantyGrouped, mainVariants, activeSize]);

  // Only show the MODELS section when at least one variant has a real name.
  // Products like "Praxam" have a single placeholder variant named "-" — in that
  // case the variant is still auto-selected (so cart works) but nothing is rendered.
  const hasRealModels = useMemo(
    () => mainVariants.some(
      (v) => v.name && v.name.trim() !== '-' && v.name.trim() !== ''
    ),
    [mainVariants]
  );

  // When every variant's name is just a screen size (e.g. Gladwin's 32", 43",
  // 55", 65"), show them as a horizontal "SELECT SIZE" chip grid instead of
  // the tall MODELS list. Brands with real model names (LG, Promark, etc.)
  // are unaffected.
  const allAreSizes = useMemo(
    () => mainVariants.length > 0 && mainVariants.every(
      (v) => SIZE_NAME_RE.test((v.name || '').trim())
    ),
    [mainVariants]
  );

  // Reset selected thumbnail on brand or size change (not on warranty change)
  useEffect(() => { setSelImg(0); }, [activeBrand, activeSize, activeGroup]);

  const images = useMemo(() => {
    if (!product) return [{ src: PLACEHOLDER, alt: 'Product' }];
    let list = [];

    // For warranty-grouped products, images follow SIZE only (not warranty).
    // For model-grouped products (Cybernetyx style), images follow the GROUP —
    // the first variant in the active group that has images, so switching sizes
    // within a group doesn't change the displayed image.
    let imgVariant = activeVariant;
    if (warrantyGrouped && activeSize) {
      imgVariant = mainVariants.find((v) => v.spec_json?.size === activeSize) ?? activeVariant;
    } else if (!warrantyGrouped && activeGroup) {
      imgVariant =
        activeGroup.variants.find((v) => (v.images || []).length > 0) ?? activeVariant;
    }

    if (imgVariant) {
      const vImgs = (imgVariant.images || []).map((img) => ({
        src: resolveImg(img.image_url),
        alt: img.alt_text || imgVariant.name,
      }));
      if (vImgs.length > 0) {
        list = vImgs;
      } else {
        // Before falling back to all brand images, try to find a size-matched sibling.
        // E.g. PRO-RX-65PC has no image but PRO-RX-65 (same "65") does — use that one.
        // Use lookahead/lookbehind so "65" matches inside "65PC" (not a word boundary).
        const sizeM = /(?<!\d)(\d{2,3})(?!\d)/.exec(imgVariant.name || '');
        if (sizeM) {
          const sizeRE = new RegExp(`\\b${sizeM[1]}\\b`);
          const sizeMatch = mainVariants.find(
            (v) => v.id !== imgVariant.id &&
                   (v.images || []).length > 0 &&
                   sizeRE.test(v.name || '')
          );
          if (sizeMatch) {
            // Show only the first image — we're borrowing another size's image
            const img = sizeMatch.images[0];
            list = [{ src: resolveImg(img.image_url), alt: img.alt_text || sizeMatch.name }];
          }
        }
        // Last resort: one representative brand image (not the whole gallery)
        if (!list.length) {
          const brandImgs = getBrandImages(activeBrand, product.name);
          if (brandImgs.length) list = [brandImgs[0]];
        }
      }
    } else if (activeBrand) {
      list = getBrandImages(activeBrand, product.name);
    }

    // Last-resort: product-level images
    if (!list.length) {
      list = (product.images || []).map((i) => ({
        src: resolveImg(i.image_url),
        alt: i.alt_text || product.name,
      }));
    }

    return list.length ? list : [{ src: PLACEHOLDER, alt: product.name }];
  }, [activeVariant, activeBrand, product]);

  const switchImg = (i) => {
    if (i === selImg) return;
    setImgFade(true);
    setTimeout(() => { setSelImg(i); setImgFade(false); }, 180);
  };

  const pickBrand = (b) => {
    setActiveBrand(b);
    const nonAcc = (b.variants || []).filter((v) => !isAccessory(v));
    if (isWarrantyGrouped(nonAcc)) {
      const sizes = [...new Set(nonAcc.map((v) => v.spec_json?.size).filter(Boolean))];
      const firstSize = sizes[0] || null;
      setActiveSize(firstSize);
      const sizeVars = nonAcc.filter((v) => v.spec_json?.size === firstSize);
      const firstVar = sizeVars[0] || null;
      setActiveWarranty(extractWarranty(firstVar?.name || ''));
      setActiveVariant(firstVar);
    } else {
      const groups = groupByModel(nonAcc);
      const fg = groups[0] || null;
      setActiveGroup(fg); setActiveVariant(fg?.variants[0] || null);
      setActiveSize(null); setActiveWarranty(null);
    }
  };

  const pickGroup = (g) => {
    setActiveGroup(g);
    setActiveVariant(g.variants[0] || null);
  };

  const pickSize = (size) => {
    setActiveSize(size);
    const sizeVars = mainVariants.filter((v) => v.spec_json?.size === size);
    const match = sizeVars.find((v) => extractWarranty(v.name) === activeWarranty) || sizeVars[0] || null;
    setActiveWarranty(extractWarranty(match?.name || ''));
    setActiveVariant(match);
  };

  const pickWarranty = (warranty) => {
    setActiveWarranty(warranty);
    const match = mainVariants.find((v) => v.spec_json?.size === activeSize && extractWarranty(v.name) === warranty) || null;
    setActiveVariant(match);
  };

  const inStock  = activeVariant ? activeVariant.stock_status === 'in_stock' : true;
  const price    = activeVariant?.current_price ?? activeVariant?.price ?? null;
  const origPrice = activeVariant?.original_price ?? activeVariant?.mrp ?? null;
  const priceStr  = price    != null ? `₹${Number(price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : null;
  const origStr   = origPrice != null ? `₹${Number(origPrice).toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : null;

  // DISPLAY SIZE is only meaningful when the model has more than one variant
  // and at least one of them actually carries a size (e.g. Cyber Square's
  // Diamond/Gold/Platinum/Grade tiers have no spec_json.size at all).
  const hasSizeData = useMemo(() => {
    if (!activeGroup || activeGroup.variants.length <= 1) return false;
    return activeGroup.variants.some((v) => {
      const size = v.spec_json?.size;
      return size !== null && size !== undefined && String(size).trim() !== '';
    });
  }, [activeGroup]);

  const specRows = useMemo(() => {
    if (!activeVariant?.spec_json) return [];
    return Object.entries(activeVariant.spec_json)
      .filter(([k, v]) => !SIZE_KEYS.has(k) && v !== null && v !== undefined && v !== '');
  }, [activeVariant]);

  // Main product cart line — keyed the same way everywhere in the app
  // (variantId, falling back to productId), so it stays in sync with the
  // listing page: adding/adjusting quantity here or on /edumart reflects
  // on both, and switching the selected variant here re-checks its own line.
  const mainItemKey  = activeVariant?.id ?? product?.id;
  const mainCartItem = cartItems.find((i) => (i.variantId ?? i.productId) === mainItemKey);
  const mainInCart   = !!mainCartItem;
  const mainQty      = mainCartItem?.quantity ?? 0;

  const handleAddMain = () => {
    addToCart({
      productId:   product?.id,
      variantId:   activeVariant?.id ?? null,
      name:        activeVariant && activeVariant.name?.trim() !== '-' ? activeVariant.name : product?.name,
      image:       images[0]?.src,
      price,
      brandName:   activeBrand?.name,
      description: product?.description || '',
    });
  };

  const increaseMainQty = () => updateQty(mainItemKey, mainQty + 1);

  const decreaseMainQty = () => {
    if (mainQty <= 1) removeFromCart(mainItemKey);
    else updateQty(mainItemKey, mainQty - 1);
  };

  const getAccessoryCartItem = (v) => cartItems.find((i) => (i.variantId ?? i.productId) === v.id);

  const handleAddAccessory = (v) => {
    addToCart({
      productId:   product?.id,
      variantId:   v.id,
      name:        v.name,
      image:       resolveImg(v.images?.[0]?.image_url),
      price:       v.current_price ?? v.price ?? null,
      brandName:   activeBrand?.name,
      description: '',
    });
  };

  const increaseAccessoryQty = (v) => updateQty(v.id, (getAccessoryCartItem(v)?.quantity ?? 0) + 1);

  const decreaseAccessoryQty = (v) => {
    const qty = getAccessoryCartItem(v)?.quantity ?? 0;
    if (qty <= 1) removeFromCart(v.id);
    else updateQty(v.id, qty - 1);
  };

  const copyText = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  const brands = product?.brands || [];

  /* ── Loading ── */
  if (loading) return (
    <div className="pd2-page">
      <Header />
      <div className="pd2-state">
        <div className="pd2-spinner" />
        <p className="pd2-state-msg">Loading product…</p>
      </div>
      <Footer />
    </div>
  );

  if (error || !product) return (
    <div className="pd2-page">
      <Header />
      <div className="pd2-state">
        <p className="pd2-state-title">{error || 'Product not found'}</p>
        <p className="pd2-state-msg">We couldn't load this product.</p>
        <button className="pd2-back-btn" onClick={() => navigate('/edumart')}>← Back to Products</button>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="pd2-page">
      <Header />

      <div className="pd2-layout">

        {/* ── LEFT: Gallery ── */}
        <div className="pd2-left">
          <div className="pd2-main-img-wrap">
            <ZoomImage
              className="pd2-main-zoom"
              imgClassName={`pd2-main-img${imgFade ? ' fade' : ''}`}
              src={images[selImg]?.src}
              alt={images[selImg]?.alt}
              onError={(e) => { e.currentTarget.src = PLACEHOLDER; }}
            />
          </div>

          {images.length > 0 && (
            <div className="pd2-thumbs">
              {images.map((img, i) => (
                <div
                  key={i}
                  className={`pd2-thumb${i === selImg ? ' active' : ''}`}
                  onClick={() => switchImg(i)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    onError={(e) => { e.currentTarget.src = PLACEHOLDER; }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Variant name + spec table */}
          {activeVariant && (
            <div className="pd2-variant-info">
              {activeVariant.name && activeVariant.name.trim() !== '-' && activeVariant.name.trim() !== '' && (
                <h2 className="pd2-variant-name">{activeVariant.name}</h2>
              )}
              {specRows.length > 0 && (
                <table className="pd2-spec-table">
                  <tbody>
                    {specRows.map(([k, v]) => (
                      <tr key={k}>
                        <td className="pd2-spec-k">{fmtKey(k)}</td>
                        <td className="pd2-spec-v">{fmtVal(v)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>

        {/* ── RIGHT: Info ── */}
        <div className="pd2-right">

          {/* Stock badge */}
          <span className={`pd2-stock-badge ${inStock ? 'in' : 'out'}`}>
            {inStock ? 'IN STOCK' : 'OUT OF STOCK'}
          </span>

          {/* Product name */}
          <h1 className="pd2-title">{product.name}</h1>

          {/* Description */}
          {product.description && (
            <p className="pd2-desc">{product.description}</p>
          )}

          {/* Price */}
          {priceStr && (
            <div className="pd2-price-row">
              <span className="pd2-price">{priceStr}</span>
              {origStr && <span className="pd2-orig-price">{origStr}</span>}
            </div>
          )}

          <div className="pd2-divider" />

          {/* Brands */}
          {brands.length > 0 && (
            <div className="pd2-section">
              <p className="pd2-section-label">BRANDS</p>
              <div className="pd2-pills">
                {brands.map((b) => (
                  <button
                    key={b.id}
                    className={`pd2-pill ${activeBrand?.id === b.id ? 'active' : ''}`}
                    onClick={() => pickBrand(b)}
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size + Warranty grouped UI (e.g. IFP: 65"/75"/86" × 3Y/5Y) */}
          {activeBrand && warrantyGrouped && (
            <>
              <div className="pd2-section">
                <p className="pd2-section-label">SIZE</p>
                <div className="pd2-sizes">
                  {uniqueSizes.map((size) => (
                    <button
                      key={size}
                      className={`pd2-size-btn ${activeSize === size ? 'active' : ''}`}
                      onClick={() => pickSize(size)}
                    >
                      {size}"
                    </button>
                  ))}
                </div>
              </div>
              {uniqueWarranties.length > 0 && (
                <div className="pd2-section">
                  <p className="pd2-section-label">WARRANTY</p>
                  <div className="pd2-sizes">
                    {uniqueWarranties.map((w) => (
                      <button
                        key={w}
                        className={`pd2-size-btn ${activeWarranty === w ? 'active' : ''}`}
                        onClick={() => pickWarranty(w)}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Models — brands whose variant names are plain screen sizes
              (e.g. Gladwin: 32", 43", 55", 65") show a size chip grid instead */}
          {activeBrand && !warrantyGrouped && varGroups.length > 0 && hasRealModels && !allAreSizes && (
            <div className="pd2-section">
              <p className="pd2-section-label">MODELS</p>
              <div className="pd2-models">
                {varGroups.map((g) => (
                  <button
                    key={g.groupName}
                    className={`pd2-model-btn ${activeGroup?.groupName === g.groupName ? 'active' : ''}`}
                    onClick={() => pickGroup(g)}
                  >
                    {g.groupName}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeBrand && !warrantyGrouped && varGroups.length > 0 && allAreSizes && (
            <div className="pd2-section">
              <p className="pd2-section-label">SELECT SIZE</p>
              <div className="pd2-sizes">
                {varGroups.map((g) => {
                  const v   = g.variants[0];
                  const oos = v.stock_status !== 'in_stock';
                  const sel = activeGroup?.groupName === g.groupName;
                  return (
                    <button
                      key={g.groupName}
                      className={`pd2-size-btn ${sel ? 'active' : ''} ${oos ? 'oos' : ''}`}
                      onClick={() => !oos && pickGroup(g)}
                      disabled={oos}
                    >
                      {g.groupName}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Display sizes */}
          {!warrantyGrouped && hasSizeData && (
            <div className="pd2-section">
              <p className="pd2-section-label">DISPLAY SIZE</p>
              <div className="pd2-sizes">
                {activeGroup.variants.map((v) => {
                  const lbl = v._sz || v.name;
                  const oos = v.stock_status !== 'in_stock';
                  const sel = activeVariant?.id === v.id;
                  return (
                    <button
                      key={v.id}
                      className={`pd2-size-btn ${sel ? 'active' : ''} ${oos ? 'oos' : ''}`}
                      onClick={() => !oos && setActiveVariant(v)}
                      disabled={oos}
                    >
                      {lbl}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="pd2-divider" />

          {/* Add to Cart — same in-cart qty control as the listing page */}
          <div className="pd2-cta-row">
            {mainInCart ? (
              <div className="pd2-main-qty-ctrl">
                <button
                  className="pd2-qty-btn"
                  onClick={decreaseMainQty}
                  aria-label={mainQty <= 1 ? 'Remove from cart' : 'Decrease quantity'}
                >
                  {mainQty <= 1 ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                      <path d="M10 11v6M14 11v6"/>
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  )}
                </button>
                <span className="pd2-main-qty-label">{mainQty} in cart</span>
                <button className="pd2-qty-btn" onClick={increaseMainQty} aria-label="Add one more">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </button>
              </div>
            ) : (
              <button className="pd2-cart-btn" onClick={handleAddMain}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                Add to Cart
              </button>
            )}
          </div>

          <button className="pd2-enquire-link" onClick={() => setShowModal(true)}>
            Enquire for Details
          </button>

        </div>
      </div>

      {/* ── Accessories ── */}
      {accessoryVariants.length > 0 && (
        <div className="pd2-accessories">
          <div className="pd2-accessories-inner">
            <h2 className="pd2-accessories-title">Accessories</h2>
            <div className="pd2-accessories-grid">
              {accessoryVariants.map((v) => {
                const img      = resolveImg(v.images?.[0]?.image_url) || PLACEHOLDER;
                const cartItem = getAccessoryCartItem(v);
                const inCart   = !!cartItem;
                const qty      = cartItem?.quantity ?? 0;
                return (
                  <div key={v.id} className="pd2-accessory-card">
                    <div className="pd2-accessory-img-wrap">
                      <ZoomImage
                        className="pd2-accessory-zoom"
                        src={img}
                        alt={v.name}
                        zoom={2.2}
                        paneWidth={260}
                        paneHeight={260}
                        onError={(e) => { e.currentTarget.src = PLACEHOLDER; }}
                      />
                    </div>
                    <p className="pd2-accessory-name">{v.name}</p>

                    {inCart ? (
                      <div className="pd2-accessory-qty">
                        <button
                          className="pd2-accessory-qty-btn"
                          onClick={() => decreaseAccessoryQty(v)}
                          aria-label={qty <= 1 ? 'Remove from cart' : 'Decrease quantity'}
                        >
                          {qty <= 1 ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6"/>
                              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                              <path d="M10 11v6M14 11v6"/>
                              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                            </svg>
                          ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                              <line x1="5" y1="12" x2="19" y2="12"/>
                            </svg>
                          )}
                        </button>
                        <span className="pd2-accessory-qty-label">{qty} in cart</span>
                        <button
                          className="pd2-accessory-qty-btn"
                          onClick={() => increaseAccessoryQty(v)}
                          aria-label="Add one more"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <button className="pd2-accessory-btn" onClick={() => handleAddAccessory(v)}>
                        Add to Cart
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <Footer />

      {/* ── Modal ── */}
      {showModal && (
        <div className="pd2-overlay" onClick={() => setShowModal(false)}>
          <div className="pd2-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="pd2-modal-title">
            <button className="pd2-modal-close" onClick={() => setShowModal(false)} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="pd2-modal-head">
              <div className="pd2-modal-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="pd2-modal-head-text">
                <h3 className="pd2-modal-title" id="pd2-modal-title">Get in Touch</h3>
                <p className="pd2-modal-sub">
                  Interested in <strong>{(hasRealModels && activeGroup?.groupName) || product.name}</strong>? Our team will respond promptly.
                </p>
              </div>
            </div>

            <div className="pd2-contact-list">
              <div className="pd2-contact-row">
                <span className="pd2-contact-ic" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <div className="pd2-contact-meta">
                  <span className="pd2-contact-lbl">Phone</span>
                  <a className="pd2-contact-val" href="tel:9061576222">9061576222</a>
                </div>
                <button
                  className={`pd2-copy-btn ${copied === 'phone' ? 'copied' : ''}`}
                  onClick={() => copyText('9061576222', 'phone')}
                >
                  {copied === 'phone' ? '✓ Copied' : 'Copy'}
                </button>
              </div>

              <div className="pd2-contact-row">
                <span className="pd2-contact-ic" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <div className="pd2-contact-meta">
                  <span className="pd2-contact-lbl">Email</span>
                  <a className="pd2-contact-val" href="mailto:info@etome.in">info@etome.in</a>
                </div>
                <button
                  className={`pd2-copy-btn ${copied === 'email' ? 'copied' : ''}`}
                  onClick={() => copyText('info@etome.in', 'email')}
                >
                  {copied === 'email' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="pd2-modal-actions">
              <a className="pd2-modal-btn primary" href="tel:9061576222">Call Now</a>
              <a className="pd2-modal-btn ghost" href="mailto:info@etome.in">Send Email</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
