import React from 'react'
import { useLocation } from 'react-router-dom'
import NavBarLayout from '../components/layouts/NavbarUser-Layout/NabarLayout'
// import Cart from './auth/Cart/Checkout'
import Login from './auth/Login/Login'
import Profile from './auth/Profile/Profile'
import Register from './auth/Register/Register'
import HomePage from './HomePage/HomePage'
import MenClothing from './products/product-list/MenClothing'
import KidsClothing from './products/product-list/KidsClothing'
import Womenshoes from './products/product-list/Womenshoes'
import Contact from './Contact/Contact'
import About from './About/About'
import Checkout from './auth/Cart/Checkout'
import Cart from './auth/Cart/Cart'
import ForgotPassword from './auth/Cart/forgotPassword/ForgotPassword'
import ResetPassword from './auth/Cart/resetPassword/ResetPassword'

export default function Header(props) {
  const location = useLocation()

  const renderContent = () => {
    switch (location.pathname) {
      case '/':
        return <HomePage />
      case '/Login':
        return <Login />
      case '/cart':
        return <Cart />
      case '/checkout':
        return <Checkout />
      case '/contact':
        return <Contact />
      case '/introduce':
        return <About />
      case '/forgot':
        return <ForgotPassword />
      case '/reset':
        return <ResetPassword />
      case '/profile':
        return <Profile />
      case '/kidsclothing':
        return <KidsClothing />
      case '/womenshoes':
        return <Womenshoes />
      case '/menclothing':
        return <MenClothing />
      case '/register':
        return <Register />
      default:
        return <HomePage />
    }
  }

  return <NavBarLayout>{renderContent()}</NavBarLayout>
}
