import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductAction } from "../../../stores/slices/product.slice";
import RecommenedProduct from "./components/RecommenedProduct";
// import BestSellersProduct from "./components/BestSellersProduct";

export default function ListProductRecomend() {
  const productState = useSelector((state) => state.product.productState);
  const dispatch = useDispatch();

  // const bestSellerProduct = productState.data.slice(10, 20);
  const recommenedProduct = productState.data.slice(0, 10);
  const loading = productState.loading;

  useEffect(() => {
    dispatch(fetchProductAction(2));
  }, [dispatch]);

  return (
    <>
      <RecommenedProduct
        loading={loading}
        recommenedProduct={recommenedProduct}
      />
      {/* <BestSellersProduct
        loading={loading}
        bestSellerProduct={bestSellerProduct}
      /> */}
    </>
  );
}
