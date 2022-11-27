import {
  FaCarSide,
  FaGitter,
  FaStore,
  FaRegUserCircle,
  FaUserAlt,
  FaElementor,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { BsFillCalendarFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { USER_ID } from "../../../../stores/slices/user.slice";
import LogoTag from "../../../../assets/logo-tag.png";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";

const NavAdmin = () => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.userInfoState);
  const decentralization = users?.data.decentralization;
  const name = users?.data.name;

  const toggle = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className="sidebar">
      <div className="top">
        <NavLink
          className="avatar"
          to="/dashboard"
          style={{ textDecoration: "none" }}
        >
          <p className="logo">{name}</p>
          <p className="">{decentralization}</p>
        </NavLink>
        <p className="top-logo">
          <img src={LogoTag} />
          <span>Cloting - Store</span>
        </p>
        <div className="menu" onClick={toggle}>
          <p className="menu-icon"></p>
          <p className="menu-icon"></p>
          <p className="menu-icon"></p>
        </div>
      </div>
      <nav className={`center ${showMenu ? "show" : ""}`}>
        <ul>
          <span className="title-name">Main</span>
          <NavLink to="/dashboard" style={{ textDecoration: "none" }}>
            <li>
              <span>
                <MdDashboard className="icon" />
              </span>
              <span>Dashboard</span>
            </li>
          </NavLink>
          <span className="title-name">Products</span>
          <NavLink to="/admin/product" style={{ textDecoration: "none" }}>
            <li>
              <span>
                <FaElementor className="icon" />
              </span>
              <span>Products</span>
            </li>
          </NavLink>
          <NavLink to="/admin/order" style={{ textDecoration: "none" }}>
            <li>
              <span>
                <BsFillCalendarFill className="icon" />
              </span>
              <span>Orders</span>
            </li>
          </NavLink>
          <NavLink to="/admin/delivery" style={{ textDecoration: "none" }}>
            <li>
              <span>
                {" "}
                <FaCarSide className="icon" />
              </span>
              <span>Delivery</span>
            </li>
          </NavLink>
          <NavLink to="/admin/statistics" style={{ textDecoration: "none" }}>
            <li>
              <span>
                {" "}
                <FaGitter className="icon" />
              </span>
              <span>Statistics</span>
            </li>
          </NavLink>
          <span className="title-name">User</span>
          <NavLink to="/admin/user" style={{ textDecoration: "none" }}>
            <li>
              <span>
                {" "}
                <FaUserAlt className="icon" />
              </span>
              <span>User</span>
            </li>
          </NavLink>
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <li>
              <span>
                {" "}
                <FiLogOut className="icon" />
              </span>
              <span>Logout</span>
            </li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default NavAdmin;
