import React from 'react'
import { useLocation } from 'react-router-dom'
import FooterLayout from '../../components/layouts/Footer-Layout/FooterLayout'
import Cart from '../auth/Cart/Cart'
import Login from '../auth/Login/Login'
import Profile from '../auth/Profile/Profile'
import Register from '../auth/Register/Register'
import Contact from '../Contact/Contact'
import HomePage from '../HomePage/HomePage'
import KidsClothing from '../products/product-list/KidsClothing'
import MenClothing from '../products/product-list/MenClothing'
import Womenshoes from '../products/product-list/Womenshoes'

export default function Footer(props) {
  const location = useLocation()
  const renderContent = () => {
    switch (location.pathname) {
      case '/':
        return <HomePage />
      case '/Login':
        return <Login />
      case '/cart':
        return <Cart />
      case '/contact':
        return <Contact />
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

  return <FooterLayout>{renderContent()}</FooterLayout>
}
