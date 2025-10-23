import React, { useMemo, useState } from "react";
import Header from "../header/header.jsx";
import Footer from "../footer/footer.jsx";
import image7 from "../../assets/image7.png";
import "./cart.css";

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Etome Dua Business", image: image7, price: 25999, quantity: 1 },
  ]);

  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);

  const subtotal = useMemo(
    () => cartItems.reduce((t, i) => t + i.price * i.quantity, 0),
    [cartItems]
  );

  const deliveryFee = cartItems.length ? 250 : 0;
  const total = Math.max(0, subtotal - discountAmount) + deliveryFee;

  const handleQuantityChange = (id, change) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = id => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleApplyDiscount = () => {
    if (discountCode.trim().toLowerCase() === "save10") {
      setDiscountAmount(subtotal * 0.1);
    } else {
      setDiscountAmount(0);
    }
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout...");
  };

  const handleContinueShopping = () => {
    console.log("Continue shopping...");
  };

  return (
    <div className="cart-container">
      <Header />

      <main className="cart-main">
        <div className="cart-content">
          {/* Left: Cart */}
          <section className="cart-section">
            <h1 className="cart-title">My Cart</h1>

            <div className="cart-items-container" role="table" aria-label="Cart items">
              {/* Desktop/tablet header */}
              <div className="cart-table-header" role="rowgroup">
                <div className="header-product" role="columnheader">Product</div>
                <div className="header-quantity" role="columnheader">Quantity</div>
                <div className="header-price" role="columnheader">Price</div>
                <div className="header-actions" role="columnheader"></div>
              </div>

              {cartItems.length > 0 ? (
                cartItems.map(item => (
                  <div key={item.id} className="cart-item" role="row">
                    <div className="item-product" role="cell">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="product-image"
                      />
                      <div className="product-info">
                        <span className="product-name">{item.name}</span>
                        <span className="mobile-price">{inr.format(item.price)}</span>
                      </div>
                    </div>

                     <div className="item-quantity" role="cell">
                      
                       <div className="quantity-controls" aria-label={`Quantity for ${item.name}`}>
                         <button
                           className="quantity-btn minus"
                           onClick={() => handleQuantityChange(item.id, -1)}
                           aria-label="Decrease quantity"
                           disabled={item.quantity <= 1}
                         >
                           -
                         </button>
                         <span className="quantity-label">Qty</span>
                         <button
                           className="quantity-btn plus"
                           onClick={() => handleQuantityChange(item.id, 1)}
                           aria-label="Increase quantity"
                         >
                           +
                         </button>
                       </div>
                     </div>

                    <div className="item-price" role="cell">
                      {/* <span className="mobile-label">Price:</span> */}
                      <span className="price-value">{inr.format(item.price)}</span>
                    </div>

                    <div className="item-actions" role="cell">
                      {/* <span className="mobile-label">Actions:</span> */}
                      <button
                        className="delete-btn"
                        onClick={() => handleRemoveItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        title="Remove"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-cart">
                  <p>Your cart is empty</p>
                </div>
              )}
            </div>
          </section>

          {/* Right: Summary */}
          <aside className="order-summary-section" aria-label="Order summary">
            <div className="order-summary-container">
              <h2 className="order-summary-title">Order Summary</h2>

              <div className="discount-section">
                <input
                  type="text"
                  placeholder="Discount Code"
                  value={discountCode}
                  onChange={e => setDiscountCode(e.target.value)}
                  className="discount-input"
                  aria-label="Discount code"
                />
                <button style={{
                    color:"black"
                }} className="apply-btn" onClick={handleApplyDiscount}>
                  Apply
                </button>
              </div>

              <div className="price-breakdown">
                <div className="price-row">
                  <span>Sub Total</span>
                  <span>{inr.format(subtotal)}</span>
                </div>

                <div className="price-row">
                  <span>Discount</span>
                  <span>- {inr.format(discountAmount)}</span>
                </div>

                <div className="price-row">
                  <span>Delivery Fee</span>
                  <span>{inr.format(deliveryFee)}</span>
                </div>

                <div className="price-divider"></div>

                <div className="price-row total">
                  <span>Total</span>
                  <span>{inr.format(total)}</span>
                </div>
              </div>

              <div className="action-buttons">
                <button className="checkout-btn" onClick={handleCheckout} disabled={!cartItems.length}>
                  Checkout
                </button>

                <button className="continue-shopping-btn" onClick={handleContinueShopping}>
                  Continue Shopping
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
