import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import LandingPage from './User/pages/Landing.jsx'
import KitchenPage from './User/pages/Kitchen.jsx'
import Search from './User/pages/Search.jsx' 
import CartPage from './User/pages/Cart.jsx'
import PaymentPage from './User/pages/Payment.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}>
        </Route>
             <Route path="/kitchen" element={<Search />} />

        <Route path="/kitchen/:slug" element={<KitchenPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
