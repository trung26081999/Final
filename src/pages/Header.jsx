import React from "react";
import { useLocation } from "react-router-dom";
import NavBarLayout from "../components/layouts/NavbarUser-Layout/NabarLayout";
import Cart from "./auth/Cart/Cart";
import Checkout from "./auth/Cart/Checkout";
import Login from "./auth/Login/Login";
import Profile from "./auth/Profile/Profile";
import Register from "./auth/Register/Register";
import HomePage from "./HomePage/HomePage";
import AllProducts from "./HomePage/products/product-list/AllProducts";
import Contact from "./Contact/Contact";
import About from "./About/About";

export default function Header(props) {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case "/":
        return <HomePage />;
      case "/Login":
        return <Login />;
      case "/cart":
        return <Cart />;
      case "/checkout":
        return <Checkout />;
      case "/contact":
        return <Contact />;
      case "/introduce":
        return <About />;

      case "/profile":
        return <Profile />;
      case "/allproducts":
        return <AllProducts />;
      case "/register":
        return <Register />;

      default:
        return <HomePage />;
    }
  };

  return <NavBarLayout>{renderContent()}</NavBarLayout>;
}
