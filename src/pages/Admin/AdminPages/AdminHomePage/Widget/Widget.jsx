import { FaGitter, FaStore, FaUserAlt, FaElementor } from "react-icons/fa";
import { BsFillCalendarFill } from "react-icons/bs";
import { MdExpandLess } from "react-icons/md";
import "./Widget.css";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductActionAdmin } from "../../../../../stores/slices/admin.product.slice";
import { fetchOrderAdminAction } from "../../../../../stores/slices/admin.cart.slice";
import { fetchUserAction } from "../../../../../stores/slices/user.slice";

export const Widget = (type) => {
  const listOrder = useSelector((state) => state.adminCart.cartState);
  const listProduct = useSelector((state) => state.adminProduct.productState);
  const listUser = useSelector((state) => state.user.userInfoState);
  const dispatch = useDispatch();

  const listNewOrder = listOrder.data.filter(
    (item) => item.status === "Chờ xác nhận"
  ).length;
  let result = 0;
  const tatolOrder = () => {
    listOrder.data.filter((item) => {
      if (item.status === "Đã nhận") {
        result += item.totalBill;
        return result;
      }
    });
  };
  tatolOrder();
  const product = listProduct.data.length;
  const list_user = listUser.dataUser.length;

  useEffect(() => {
    dispatch(fetchProductActionAdmin());
  }, []);
  useEffect(() => {
    dispatch(fetchOrderAdminAction());
  }, []);
  useEffect(() => {
    dispatch(fetchUserAction({ page: 1, limit: 200 }));
  }, []);
  let data;

  //temporary
  const amount = 100;
  const diff = 20;

  switch (type.type) {
    case "user":
      data = {
        title: <span style={{ color: "blue" }}>Users</span>,
        amount: list_user,
        link: <Link to="/admin/user">See all users</Link>,
        icon: (
          <FaUserAlt
            className="icon"
            style={{
              color: "blue",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: <span style={{ color: "green" }}>New Order</span>,
        amount: listNewOrder,
        link: <Link to="/admin/order">See new orders</Link>,
        icon: (
          <BsFillCalendarFill
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "green",
            }}
          />
        ),
      };
      break;
    case "earnning":
      data = {
        title: <span style={{ color: "red" }}>Earnning</span>,
        amount: `${result} 000`,
        link: <Link to="/admin/statistics">See earnning</Link>,
        icon: (
          <FaGitter
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "red" }}
          />
        ),
      };
      break;
    case "products":
      data = {
        title: <span style={{ color: "gold" }}>Products</span>,
        amount: product,
        link: <Link to="/admin/product">See products</Link>,
        icon: (
          <FaStore
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "gold",
            }}
          />
        ),
      };
      break;

    default:
      break;
  }

  return (
    <div className="widget" style={{ border: `0.2px solid ${type.color}` }}>
      <div className="left">
        <span className="name-title">{data.title}</span>
        <span className="counter">{data.amount}</span>
        <span className="link">
          <Link to="">{data.link}</Link>
        </span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <MdExpandLess />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};
