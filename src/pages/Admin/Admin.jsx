import { useLocation } from "react-router-dom";
import React from "react";
import AdminHomePage from "./AdminPages/AdminHomePage/AdminHomePage";
import { Delivery } from "./AdminPages/Delivery/Delivery";
import { Order } from "./AdminPages/Order/Order";
import Products from "./AdminPages/Products/Products";
import Statistics from "./AdminPages/Statistics/Statistics";
import UserAdmin from "./AdminPages/UserAdmin/UserAdmin";

function Admin() {
  const location = useLocation();

  const adminContent = () => {
    switch (location.pathname) {
      case "/dashboard":
        return <AdminHomePage />;
      case "/admin/product":
        return <Products />;
      case "/admin/order":
        return <Order />;
      case "/admin/delivery":
        return <Delivery />;
      case "/admin/statistics":
        return <Statistics />;
      case "/admin/user":
        return <UserAdmin />;
      default:
        return <AdminHomePage />;
    }
  };
  return <div>{adminContent()}</div>;
}

export default Admin;
