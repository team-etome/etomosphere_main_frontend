import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import Etomos from './components/etomos/etomos.jsx'
import Ethos from './components/ethos/ethos.jsx'
import Edumart from './components/edumart/edumart.jsx'
import Educosystem from './components/educosystem/educosystem.jsx'
import Signup from './components/signup/signup.jsx'
import Signin from './components/signin/signin.jsx'
import ProductDetail from './components/productDetail/productdetail.jsx'
import Cart from './components/cart/cart.jsx'
import Etome from './components/etome/etome.jsx'
import AdminProduct from './components/adminProduct/adminProduct.jsx'
import Brandpage from './components/brandpage/brandpage.jsx'
import BrandProduct from './components/brandProduct/brandProduct.jsx'
import EducosDetails from './components/educosDetails/educosDetails.jsx'
import EmployeePublic from './components/employeDetails/EmployeePublic.jsx'
import PrivacyPolicy from './components/privacy/PolicyPage.jsx'
import RefundPolicy from './components/refund/RefundPolicy.jsx'
import TermsConditions from './components/terms/TermsConditions.jsx'
import ShippingPolicy from './components/shipping/ShippingPolicy.jsx'
import Reviews from './components/reviews/reviews.jsx'
import Programmes from './components/programmes/programmes.jsx'
import './App.css'


function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppContent() {
  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Etomos />} />
        <Route path="/ethos" element={<Ethos />} />
        <Route path="/edumart" element={<Edumart />} />
        <Route path="/educosystem" element={<Educosystem />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/productdetail" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/etome" element={<Etome />} />
        <Route path="/adminproduct" element={<AdminProduct />} />
        <Route path="/brandpage" element={<Brandpage />} />
        <Route path="/brandproduct" element={<BrandProduct />} />
        <Route path="/educosdetails" element={<EducosDetails />} />
        <Route path="/employee/:slug" element={<EmployeePublic />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/programmes" element={<Programmes />} />
      </Routes>
    </div>
  )
}


export default function App() {
  return (
    <Router>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  )
}
