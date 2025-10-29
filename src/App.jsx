import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
import EnquiryModal from './components/enquiry/EnquiryModal.jsx'
import './App.css'

function App() {
  const [showEnquiry, setShowEnquiry] = useState(false)

  useEffect(() => {
    setShowEnquiry(true)
  }, [])

  return (
    <Router>
      <div className="App">
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
          <Route path="/enquiry" element={<EnquiryModal isOpen onClose={() => {}} />} />   
        </Routes>

        {/* Global enquiry modal on initial load */}
        <EnquiryModal
          isOpen={showEnquiry}
          onClose={() => setShowEnquiry(false)}
          onSubmit={async () => setShowEnquiry(false)}
        />

        {/* Sticky Enquire button */}
        <button
          onClick={() => setShowEnquiry(true)}
          style={{
            position: 'fixed',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: '60px',
            height: '200px',
            backgroundColor: '#ffa000',
            color: '#000',
            border: 'none',
            borderRadius: '12px 0 0 12px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 600,
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            zIndex: 999,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            letterSpacing: '0.5px'
          }}
          aria-label="Enquire Sales"
        >
          Enquire Sales
        </button>
      </div>
    </Router>
  )
}

export default App
