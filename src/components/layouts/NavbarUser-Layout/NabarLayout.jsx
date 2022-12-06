import React from "react";
import PropTypes from "prop-types";
import NavBar from "./components/NavBar/NavBar";
import Footer from './components/Footer/Footer';
NavBarLayout.propTypes = {
  children: PropTypes.element,
};

export default function NavBarLayout(props) {
  const { children } = props;
  return (
    <>
      <NavBar />
      {children}
    <Footer/>
    </>
  );
}
