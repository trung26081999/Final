import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Admin from "../pages/Admin/Admin";
import Edit from "../pages/Admin/AdminPages/Edit/Edit";
import Profile from "../pages/Admin/AdminPages/Profile/Profile";
import Success from "../pages/auth/Cart/CheckoutSuccess/Success";
import OrderDetail from "../pages/auth/PurchaseHistory/OrderDetail/OrderDetail";
import PurchaseHistory from "../pages/auth/PurchaseHistory/PurchaseHistory";
import DetailProduct from "../pages/DetailProduct/DetailProduct";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Header from "../pages/Header";

export function FullLayoutApp() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}></Route>
          <Route path="/product-detail/:id" element={<DetailProduct />}></Route>
          <Route path="/Login" element={<Header />}></Route>
          <Route path="/cart" element={<Header />}></Route>
          <Route path="/checkout" element={<Header />}></Route>
          <Route path="/profile" element={<Header />}></Route>
          <Route path="/allproducts" element={<Header />}></Route>
          <Route path="/contact" element={<Header />}></Route>
          <Route path="/introduce" element={<Header />}></Route>
          <Route path="/register" element={<Header />}></Route>
          <Route path="/cart/success/:id" element={<Success />}></Route>
          <Route
            path="/order-list/detail:id"
            element={<OrderDetail></OrderDetail>}
          ></Route>
          <Route path="/order-list/delivering" element={<PurchaseHistory />} />
          <Route path="/order-list/received" element={<PurchaseHistory />} />
          <Route path="/order-list/cancelled" element={<PurchaseHistory />} />
          <Route path="/order-list/confirm" element={<PurchaseHistory />} />

          <Route path="/dashboard" element={<Admin />}></Route>
          <Route path="/admin/product" element={<Admin />}></Route>


          <Route path="/admin/order" element={<Admin />}></Route>
          <Route path="/admin/delivery" element={<Admin />}></Route>
          <Route path="/admin/statistics" element={<Admin />}></Route>
          <Route path="/admin/user" element={<Admin />}></Route>
          <Route path="/admin/edit/:id" element={<Edit />} />
          <Route path="/admin/profile/:id" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
