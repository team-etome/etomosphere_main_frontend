import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import { useCart } from '../../context/CartContext.jsx';
import './edumart.css';
import axios from 'axios';

const APIURL = import.meta.env.VITE_API_URL || '';

const resolveImg = (url) => {
  if (!url) return null;
  return url.startsWith('http') ? url : `${APIURL}${url}`;
};

const firstImg = (arr = []) => {
  const found = arr.find((i) => i.is_main) || arr[0];
  return resolveImg(found?.image_url);
};

// First available image from variant images across all brands
const getProductCardImage = (brands = []) => {
  for (const b of brands) {
    for (const v of (b.variants || [])) {
      if (v.images?.length > 0) return resolveImg(v.images[0].image_url);
    }
  }
  return null;
};

// Build one product card from solution + category + product objects
const makeCard = (sol, cat, prod) => {
  const prodImgs = prod.images || [];
  const catImgs  = cat.images  || [];
  const brands   = prod.brands || [];
  const image    = getProductCardImage(brands) || firstImg(prodImgs) || firstImg(catImgs);

  const allPrices = brands.flatMap((b) => b.variants || [])
    .map((v) => (v.current_price != null ? parseFloat(v.current_price) : null))
    .filter((p) => p !== null);
  const minPrice   = allPrices.length > 0 ? Math.min(...allPrices) : null;
  const brandNames = brands.map((b) => b.name);

  // The listing shows one card per product (no variant picker here), but the cart
  // still needs a real, stable line-item identity that matches whichever variant
  // the product detail page auto-selects first — otherwise quantities added from
  // the listing never show up as "in cart" on the detail page and vice versa.
  const defaultVariantId = brands[0]?.variants?.[0]?.id ?? null;

  return {
    id:           `p-${prod.id}`,
    variantId:    null,
    defaultVariantId,
    productId:    prod.id,
    name:         prod.name,
    brandName:    brandNames.join(', '),
    brandNames,
    categoryName: cat.name  || 'Uncategorized',
    solutionName: sol.name  || 'General',
    solutionSlug: sol.slug  || '',
    description:  prod.description || '',
    price:        minPrice,
    inStock:      true,
    image,
    raw: { solution: sol, category: cat, product: prod },
  };
};

// Flatten all solutions into a flat product card array (used for search + All Products view)
const flattenSolutions = (solutions = []) => {
  const cards = [];
  solutions.forEach((sol) => {
    (sol.categories || []).forEach((cat) => {
      (cat.products || []).forEach((prod) => {
        cards.push(makeCard(sol, cat, prod));
      });
    });
  });
  return cards;
};

/* ── Product Card ─────────────────────────────────────────────────────── */
function ProductCard({ product, onClick }) {
  const { addToCart, removeFromCart, updateQty, cartItems } = useCart();

  const itemKey   = product.defaultVariantId ?? product.productId;
  const cartItem  = cartItems.find((i) => (i.variantId ?? i.productId) === itemKey);
  const inCart    = !!cartItem;
  const qty       = cartItem?.quantity ?? 0;

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart({
      productId:   product.productId,
      variantId:   product.defaultVariantId,
      name:        product.name,
      image:       product.image,
      price:       product.price,
      brandName:   product.brandName,
      description: product.description,
    });
  };

  const handleIncrease = (e) => {
    e.stopPropagation();
    updateQty(itemKey, qty + 1);
  };

  const handleDecrease = (e) => {
    e.stopPropagation();
    if (qty <= 1) removeFromCart(itemKey);
    else updateQty(itemKey, qty - 1);
  };

  return (
    <div className="em-card" onClick={() => onClick(product)}>
      <div className="em-card-img">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <div className="em-card-no-img">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <span>No Image</span>
          </div>
        )}
      </div>
      <div className="em-card-body">
        <h4 className="em-card-name">{product.name}</h4>
        <p className="em-card-desc">
          {product.description
            ? product.description.slice(0, 80) + (product.description.length > 80 ? '…' : '')
            : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
        </p>

        {inCart ? (
          <div className="em-qty-ctrl" onClick={(e) => e.stopPropagation()}>
            <button className="em-qty-btn em-qty-remove" onClick={handleDecrease} aria-label={qty <= 1 ? 'Remove from cart' : 'Decrease quantity'}>
              {qty <= 1 ? (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                  <path d="M10 11v6M14 11v6"/>
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                </svg>
              ) : (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              )}
            </button>
            <span className="em-qty-label">{qty} in cart</span>
            <button className="em-qty-btn em-qty-add" onClick={handleIncrease} aria-label="Add one more">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>
          </div>
        ) : (
          <button className="em-card-btn" onClick={handleAdd}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Category sub-section within a solution ───────────────────────────── */
function CategorySection({ name, products, onProductClick, startIndex = 0 }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? products : products.slice(0, 6);

  return (
    <div className="em-category">
      <h3 className="em-category-title">{name}</h3>
      <div className="em-group-grid">
        {visible.map((p) => (
          <ProductCard key={p.id} product={p} onClick={onProductClick} />
        ))}
      </div>
      {products.length > 6 && (
        <div className="em-load-wrap">
          <button className="em-load-btn" onClick={() => setShowAll((v) => !v)}>
            {showAll ? 'Show Less' : `Load More (${products.length - 6} more)`}
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Solution section — all products flat under one title ─────────────── */
function SolutionGroup({ solutionName, categories, onProductClick }) {
  const [showAll, setShowAll] = useState(false);
  const products = categories.flatMap((c) => c.products);
  const visible  = showAll ? products : products.slice(0, 6);

  return (
    <div className="em-group">
      <h2 className="em-group-title">{solutionName}</h2>
      <div className="em-group-grid">
        {visible.map((p) => (
          <ProductCard key={p.id} product={p} onClick={onProductClick} />
        ))}
      </div>
      {products.length > 6 && (
        <div className="em-load-wrap">
          <button className="em-load-btn" onClick={() => setShowAll((v) => !v)}>
            {showAll ? 'Show Less' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Flat grid — no section headings (All Solutions + specific solution) ── */
function FlatGrid({ title, products, onProductClick }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? products : products.slice(0, 12);

  return (
    <div className="em-group">
      {title && <h2 className="em-group-title">{title}</h2>}
      <div className="em-group-grid">
        {visible.map((p) => (
          <ProductCard key={p.id} product={p} onClick={onProductClick} />
        ))}
      </div>
      {products.length > 12 && (
        <div className="em-load-wrap">
          <button className="em-load-btn" onClick={() => setShowAll((v) => !v)}>
            {showAll ? 'Show Less' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Single unified grid with full-width type labels as separators ─────── */
function TypedGrid({ groupedByType, onProductClick }) {
  const items = [];
  groupedByType.forEach(([typeName, products]) => {
    items.push({ kind: 'label', name: typeName });
    products.forEach((p) => items.push({ kind: 'card', product: p }));
  });

  return (
    <div className="em-typed-grid">
      {items.map((item) =>
        item.kind === 'label' ? (
          <div key={`lbl-${item.name}`} className="em-type-label">
            {item.name}
          </div>
        ) : (
          <ProductCard
            key={item.product.id}
            product={item.product}
            onClick={onProductClick}
          />
        )
      )}
    </div>
  );
}

/* ── Main Page ────────────────────────────────────────────────────────── */
export default function Edumart() {
  const navigate = useNavigate();

  const [allItems, setAllItems]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState('');
  const [search, setSearch]             = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]); // multi-select category filter; [] = all types
  const [showFilters, setShowFilters]   = useState(false);
  const [filterQuery, setFilterQuery]   = useState('');
  const filterRef = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (showFilters && filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilters(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [showFilters]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true); setError('');
        const res  = await axios.get(`${APIURL}/api/products/`);
        if (!active) return;
        // NEW shape: { count, solutions: [ { name, slug, categories: [...] } ] }
        const sols = res.data?.solutions ?? [];
        setAllItems(flattenSolutions(sols));
      } catch (e) {
        if (active) setError(e?.response?.data?.detail || e?.message || 'Failed to load products.');
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  // Type options = every distinct product category (e.g. Digital Kiosk, LED Wall, Furniture...)
  const typeOptions = useMemo(() => {
    const set = new Set();
    allItems.forEach((p) => set.add(p.categoryName || 'Other'));
    return [...set].sort((a, b) => a.localeCompare(b));
  }, [allItems]);

  const filteredTypeOptions = useMemo(() => {
    const fq = filterQuery.trim().toLowerCase();
    if (!fq) return typeOptions;
    return typeOptions.filter((t) => t.toLowerCase().includes(fq));
  }, [typeOptions, filterQuery]);

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };
  const removeType  = (type) => setSelectedTypes((prev) => prev.filter((t) => t !== type));
  const clearTypes  = () => setSelectedTypes([]);

  const q = search.trim().toLowerCase();

  // Flat product list, filtered by selected type(s) + search
  const flatProducts = useMemo(() => {
    let list = allItems;
    if (selectedTypes.length > 0) {
      list = list.filter((p) => selectedTypes.includes(p.categoryName || 'Other'));
    }
    if (q) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.solutionName.toLowerCase().includes(q)
      );
    }
    return list;
  }, [allItems, selectedTypes, q]);

  // Group by Type (categoryName) for display
  const groupedByType = useMemo(() => {
    const map = {};
    flatProducts.forEach((p) => {
      const key = p.categoryName || 'Other';
      if (!map[key]) map[key] = [];
      map[key].push(p);
    });
    return Object.entries(map);
  }, [flatProducts]);

  const isEmpty = groupedByType.length === 0;

  const handleProductClick = (product) => {
    const id   = product.variantId ?? product.productId;
    const type = product.variantId ? 'variant' : 'product';
    localStorage.setItem('selectedProductId',   String(id));
    localStorage.setItem('selectedProductType', type);
    navigate('/productdetail');
  };

  return (
    <div className="em-page">
      <Header />

      {/* ── Hero ── */}
      <section className="em-hero">
        <h1 className="em-hero-title">Empowering the Future of Technology</h1>
        <p className="em-hero-sub">
          Discover precision-engineered hardware and software ecosystems designed<br />
          to scale with your enterprise's ambition.
        </p>
        <div className="em-search-wrap">
          <svg
            className="em-search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            className="em-search"
            type="text"
            placeholder="Search for solutions, hardware, or software..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="em-filter-dd" ref={filterRef}>
            <button
              className={`em-filter-btn ${selectedTypes.length > 0 ? 'em-filter-btn--active' : ''}`}
              onClick={() => setShowFilters((v) => !v)}
              aria-expanded={showFilters}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              Filter by Type
              {selectedTypes.length > 0 && (
                <span className="em-filter-count">{selectedTypes.length}</span>
              )}
              <svg className={`em-filter-chev ${showFilters ? 'open' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {showFilters && (
              <div className="em-filter-panel">
                <div className="em-filter-search">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search types..."
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="em-filter-list">
                  {filteredTypeOptions.length === 0 && (
                    <div className="em-filter-none">No matching type.</div>
                  )}
                  {filteredTypeOptions.map((type) => {
                    const checked = selectedTypes.includes(type);
                    return (
                      <button
                        key={type}
                        className={`em-filter-opt ${checked ? 'active' : ''}`}
                        onClick={() => toggleType(type)}
                      >
                        <span className={`em-filter-checkbox ${checked ? 'checked' : ''}`}>
                          {checked && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </span>
                        <span className="em-filter-opt-label">{type}</span>
                      </button>
                    );
                  })}
                </div>
                {selectedTypes.length > 0 && (
                  <div className="em-filter-panel-actions">
                    <button className="em-filter-clear" onClick={clearTypes}>Clear all</button>
                    <button className="em-filter-done" onClick={() => setShowFilters(false)}>Done</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {selectedTypes.length > 0 && (
          <div className="em-chips-row">
            {selectedTypes.map((type) => (
              <div className="em-active-chip" key={type}>
                <span>{type}</span>
                <button onClick={() => removeType(type)} aria-label={`Remove ${type} filter`}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Content ── */}
      <main className="em-main">
        {loading && (
          <div className="em-loading-wrap">
            <div className="em-spinner" />
            <p className="em-loading-text">Loading products…</p>
            <div className="em-loading">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="em-skeleton" />
              ))}
            </div>
          </div>
        )}
        {!loading && error && <div className="em-error">{error}</div>}
        {!loading && !error && isEmpty && (
          <div className="em-empty">No products match your search.</div>
        )}

        {!loading && !error && !isEmpty && (
          <TypedGrid
            groupedByType={groupedByType}
            onProductClick={handleProductClick}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
