import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { formatCurrency } from '../../utils/formatters';

// Assets
import Logo from '../../assets/logo.svg';
import SearchIcon from '../../assets/icons/search-icon.svg';
import UserIcon from '../../assets/icons/user-icon.svg';
import HeartIcon from '../../assets/icons/heart-icon.svg';
import BagIcon from '../../assets/icons/bag-icon.svg';

interface NavbarProps {
  wishlistCount?: number;
  cartCount?: number;
  cartTotal?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  wishlistCount = 3,
  cartCount = 2,
  cartTotal = 64999,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`${ROUTES.SEARCH}?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        
        {/* Brand Logo */}
        <Link to={ROUTES.HOME} className="navbar__logo-link">
          <img 
            src={Logo} 
            alt="Etomosphere" 
            className="navbar__logo-img" 
          />
        </Link>

        {/* Search Bar */}
        <form 
          onSubmit={handleSearch}
          className="navbar__search"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products, brands and more..."
            aria-label="Search for products, brands and more"
            className="navbar__search-input"
          />
          <button
            type="submit"
            aria-label="Search"
            className="navbar__search-btn"
          >
            <span className="navbar__search-icon-wrap">
              <img src={SearchIcon} alt="" aria-hidden="true" className="navbar__search-icon" />
            </span>
          </button>
        </form>

        {/* Sell with Us CTA */}
        <Link
          to={ROUTES.SELL_WITH_US}
          className="navbar__cta"
        >
          <span>Sell with Us</span>
        </Link>

        {/* Right Actions */}
        <div className="navbar__actions">
          
          {/* My Account */}
          <Link
            to={ROUTES.LOGIN}
            className="navbar__account"
          >
            <div className="navbar__account-avatar">
              <img src={UserIcon} alt="" aria-hidden="true" className="navbar__account-icon" />
            </div>
            <span className="navbar__account-label">
              My Account
            </span>
          </Link>

          {/* Wishlist with Badge */}
          <Link
            to={ROUTES.WISHLIST}
            aria-label={`Wishlist (${wishlistCount} items)`}
            className="navbar__wishlist"
          >
            <img src={HeartIcon} alt="" aria-hidden="true" className="navbar__wishlist-icon" />
            {wishlistCount > 0 && (
              <span className="navbar__badge navbar__badge--wishlist">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart with Badge & Total */}
          <Link
            to={ROUTES.CART}
            aria-label={`Cart (${cartCount} items, Total ${formatCurrency(cartTotal)})`}
            className="navbar__cart"
          >
            <div className="navbar__cart-icon-wrap">
              <img src={BagIcon} alt="" aria-hidden="true" className="navbar__cart-icon" />
              {cartCount > 0 && (
                <span className="navbar__badge navbar__badge--cart">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="navbar__cart-meta">
              <span className="navbar__cart-label">
                Total
              </span>
              <span className="navbar__cart-total">
                {formatCurrency(cartTotal)}
              </span>
            </div>
          </Link>

        </div>
      </div>
    </nav>
  );
};