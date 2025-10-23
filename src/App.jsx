import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Etomos from './components/etomos/etomos.jsx'
import Ethos from './components/ethos/ethos.jsx'
import Edumart from './components/edumart/edumart.jsx'
import Signup from './components/signup/signup.jsx'
import Signin from './components/signin/signin.jsx'
import ProductDetail from './components/productDetail/productdetail.jsx'
import Cart from './components/cart/cart.jsx'
import Etome from './components/etome/etome.jsx'
import EtomeDetails from './components/etomeDetails/etomeDetails.jsx'
import AdminProduct from './components/adminProduct/adminProduct.jsx'
import Brandpage from './components/brandpage/brandpage.jsx'
import BrandProduct from './components/brandProduct/brandProduct.jsx'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Etomos />} />
          <Route path="/ethos" element={<Ethos />} />
          <Route path="/edumart" element={<Edumart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/productdetail" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/etome" element={<Etome />} />
          <Route path="/etomedetails" element={<EtomeDetails />} />
          <Route path="/adminproduct" element={<AdminProduct />} />
          <Route path="/brandpage" element={<Brandpage />} />
          <Route path="/brandproduct" element={<BrandProduct />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
