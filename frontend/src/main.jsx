import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import LandingPage from './User/pages/Landing.jsx'
import KitchenPage from './User/pages/Kitchen.jsx'
import Search from './User/pages/Search.jsx' 
import CartPage from './User/pages/Cart.jsx'
import PaymentPage from './User/pages/Payment.jsx'
import { CartProvider } from "./User/context/CartContext.jsx";
import {OrderPlaced} from "./User/pages/OrderPlaced.jsx";
import UserSignupPage from "./User/pages/Signup.jsx";
import UserLoginPage from "./User/pages/Login.jsx";
import LoadingConfirmation from './User/pages/LoadingConfirmation'

//Owner
import DashboardPage from './Owner/pages/dashboard.jsx'   
import OrdersPage from './Owner/pages/orders.jsx'
import MenuManagementPage from './Owner/pages/menu.jsx'
import OnboardingPage from './Owner/pages/onboarding'
import OwnerLoginPage from './Owner/pages/login.jsx'
import OwnerSignupPage from './Owner/pages/signup.jsx'
import OrderStatusPage from './Owner/pages/orderStatus'

import MainOnboardingPage from './Common/Onboarding.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <CartProvider>
    <BrowserRouter>
      <Routes>
       <Route path="/" element ={<MainOnboardingPage/>}/>      
        //User
        <Route path="/main" element={<LandingPage />}/>
   
             <Route path="/kitchen" element={<Search />} />

        <Route path="/kitchen/:kitchenId" element={<KitchenPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/order-placed" element={<OrderPlaced />} />
        <Route path="/user/signup" element={<UserSignupPage />} />
        <Route path="/user/login" element={<UserLoginPage />} />
        <Route path="/user/confirming" element={<LoadingConfirmation />} />
        
        //Owner
        <Route path="/owner" element={<DashboardPage />} />
        <Route path="/owner/orders" element={<OrdersPage />} />
        <Route path="/owner/orders/:orderId" element={<OrderStatusPage/>}/>
        <Route path="/owner/menu" element={< MenuManagementPage/>} />
        <Route path="/owner/onboarding" element={<OnboardingPage />} />
        <Route path="/owner/signup" element={<OwnerSignupPage />} />
        <Route path="/owner/login" element={<OwnerLoginPage />} />
      </Routes>
    </BrowserRouter>
    </CartProvider>
  </StrictMode>
)
