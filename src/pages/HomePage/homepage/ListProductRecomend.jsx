import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductAction } from "../../../stores/slices/product.slice";
import RecommenedProduct from "./components/RecommenedProduct";
import BestSellersProduct from "./components/BestSellersProduct";
import { category } from "./../../../components/layouts/NavbarUser-Layout/components/NavBar/category";
import { categoryData } from "../../../constant/CategoryData";
import CategoryItem from "../CategoryItem/CategoryItem";
import styled from "styled-components";
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 20px;
  justify-content: center;
`;
export default function ListProductRecomend() {
  const productState = useSelector((state) => state.product.productState);
  const dispatch = useDispatch();

  const bestSellerProduct = productState.data.slice(0, 40);
  const recommenedProduct = productState.data.slice(0, 20);
  const loading = productState.loading;

  useEffect(() => {
    dispatch(fetchProductAction(2));
  }, [dispatch]);

  return (
    <>
      <Container>
        {categoryData.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </Container>
      <RecommenedProduct
        loading={loading}
        recommenedProduct={recommenedProduct}
      />
      <BestSellersProduct
        loading={loading}
        bestSellerProduct={bestSellerProduct}
      />
    </>
  );
}
