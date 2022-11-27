import React from "react";

import ListProduct from "./ListProduct/ListProduct";
import "./style.css";
import Slider from "./Slider/Slider";
import ListProductRecomend from "./homepage/ListProductRecomend";

export default function HomePage() {
  return (
    <>
      <Slider />
      
      <ListProductRecomend />
      <ListProduct />
    </>
  );
}
