import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import './edumart.css';
import { useSelector } from "react-redux";
import axios from "axios";

const pickDisplayImage = (p) => {

  // 3) first category image from brand.category.images[0]
  const catFirst = p.brand?.category?.images?.[0]?.image_url;
  return catFirst || "";
};

const toAbsolute = (baseUrl, imageUrl) => {
  if (!imageUrl) return 'https://via.placeholder.com/300x200';
  if (imageUrl.startsWith('http')) return imageUrl;
  return `${baseUrl}${imageUrl}`;
};

function Edumart() {
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]); // full list for filtering
  const [loading, setLoad] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const APIURL = useSelector((s) => s.APIURL?.url) || "";

  console.log(items, "items");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoad(true);
        setError("");
        const res = await axios.get(`${APIURL}/api/products/`);
        if (!mounted) return;

        const products = res.data?.products || [];
        console.log(products, "products");
        const normalized = products.map(p => {
          const img = pickDisplayImage(p);
          return {
            id: p.id,
            name: p.name || "Unnamed Product",
            category: p.brand?.category?.name || "Uncategorized",
            brandName: p.brand?.name || "Unknown Brand",
            image: toAbsolute(APIURL, img),
            raw: p,
          };
        });

        setAllItems(normalized); // keep full list

        // Group by category and take only the first product from each category for display
        const groupedByCategory = normalized.reduce((acc, product) => {
          const category = product.category;
          if (!acc[category]) {
            acc[category] = product;
          }
          return acc;
        }, {});

        const uniqueProducts = Object.values(groupedByCategory);
        // Sort products alphabetically by category name
        const sortedProducts = uniqueProducts.sort((a, b) =>
          a.category.localeCompare(b.category)
        );
        setItems(sortedProducts);
      } catch (e) {
        setError(e?.response?.data?.detail || "Failed to load products.");
      } finally {
        setLoad(false);
      }
    })();
    return () => { mounted = false; };
  }, [APIURL]);

  const handleProductClick = (product) => {
    // Navigate to brand page with all products from the same category (use full list)
    const categoryProducts = allItems
      .filter(x => x.category === product.category)
      .map(x => x.raw);
    localStorage.setItem("selectedCategoryProducts", JSON.stringify(categoryProducts));
    localStorage.setItem("selectedCategory", product.category);
    navigate("/brandpage");
  };

  const handleArrowClick = (e, product) => {
    e.stopPropagation(); // Prevent triggering the card click
    handleProductClick(product);
  };
  return (
    <div className="edumart-container">
      <Header />

      <main className="edumart-main">
        {loading && (
          <div style={{ padding: "32px 80px" }}>Loading products…</div>
        )}

        {!loading && error && (
          <div style={{ padding: "32px 80px", color: "crimson" }}>{error}</div>
        )}

        {!loading && !error && (
          <>
            {/* All Products Header */}
            <div className="product-header-section">
              <h1 style={{
                fontSize: "48px",
                fontWeight: "700",
                color: "#000",
                margin: "0 0 24px 0",
                fontFamily: "'Manrope', sans-serif"
              }}>
                All Products
              </h1>
              <p style={{
                fontSize: "18px",
                color: "#000",
                lineHeight: "1.6",
                margin: "0",
                fontFamily: "'Manrope', sans-serif",
              }}>
                Shop from a wide range of educational and lifestyle products designed to enhance
                learning experiences. From smart devices to accessories, explore top brands and
                trusted solutions, <strong>all in one place.</strong>
              </p>
            </div>

            <div className="product-grid-container">
              {items.map(p => (
                <div
                  key={p.id}
                  role="button"
                  onClick={() => handleProductClick(p)}
                  className="product-grid-card"
                >
                  <div style={{ width: "100%", aspectRatio: "1 / 1", position: "relative" }}>
                    <img
                      src={p.image || 'data:image/gif;base64,R0lGODlhAQABAAAAACw='}
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => { e.currentTarget.style.opacity = 0; }}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.6s ease",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.06)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                    />

                    {/* Category overlay at bottom of image */}
                    <div style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,

                      color: "white",
                      padding: "8px 16px",
                      fontSize: "24px",
                      fontWeight: 500,

                    }}>
                      {p.category}
                    </div>
                  </div>

                  {/* Corner arrow */}
                  <div
                    onClick={(e) => handleArrowClick(e, p)}
                    style={{
                      position: "absolute",
                      right: 10, bottom: 7,
                      width: 28, height: 28,
                      borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer",



                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="white" strokeWidth="2"
                      style={{ transform: "rotate(45deg)" }}>
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Edumart;
