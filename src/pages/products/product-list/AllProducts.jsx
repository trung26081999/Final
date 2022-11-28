import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCategoryAction } from "../../../stores/slices/product.slice";
import styled from "styled-components";

const Container1 = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 100px;
`;
const ContainerProduct = styled.div`
  margin-top: 125px;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: calc(20% - 10px);
  border: 1px solid #ddd;
  margin: 20px;
  height: 100%;
  cursor: pointer;
`;

const ImgContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  position: relative;
  padding: 20px 10px;
`;

const InfoContainer = styled.div`
  color: #e0e3db;
`;

const Title = styled.h1`
  color: #000;
  font-size: 14px;
  font-weight: 500;
`;

const H2 = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #000;
  margin-top: 25px;
`;

const P = styled.h1`
  font-size: 14px;
  font-weight: normal;
  color: #000;
`;
const Price = styled.p`
  font-size: 16px;
  color: #ff652e;
  font-weight: bold;
`;

export default function AllProducts() {
  const productState = useSelector((state) => state.product.productState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const category = productState.category;

  const [sortData, setSortData] = useState(category);

  useEffect(() => {
    setSortData(category);
  }, [category]);

  useEffect(() => {
    dispatch(fetchCategoryAction());
  }, []);
  const handleFilter = (e) => {
    const filterValue = e.target.value;
    if (filterValue === "kidsclothing") {
      const filteredProducts = category.filter(
        (item) => item.type === "kidsclothing"
      );
      setSortData(filteredProducts);
    }
    if (filterValue === "kidshoes") {
      const filteredProducts = category.filter(
        (item) => item.type === "kidshoes"
      );
      setSortData(filteredProducts);
    }
    if (filterValue === "mensclothing") {
      const filteredProducts = category.filter(
        (item) => item.type === "mensclothing"
      );
      setSortData(filteredProducts);
    }
    if (filterValue === "menshoes") {
      const filteredProducts = category.filter(
        (item) => item.type === "menshoes"
      );
      setSortData(filteredProducts);
    }
    if (filterValue === "womenshoes") {
      const filteredProducts = category.filter(
        (item) => item.type === "womenshoes"
      );
      setSortData(filteredProducts);
    }
    if (filterValue === "womensclothing") {
      const filteredProducts = category.filter(
        (item) => item.type === "womensclothing"
      );
      setSortData(filteredProducts);
    }
  };
  const handleSort = (e) => {
    const sortValue = e.target.value;
    if (sortValue === "ascending") {
      setSortData((category) =>
        [...category].sort((a, b) => a.price - b.price)
      );
    } else {
      setSortData((category) =>
        [...category].sort((a, b) => b.price - a.price)
      );
    }
  };

  const handleDetail = (item) => {
    navigate(`/product-detail/${item.id}`, { state: { ...item } });
  };

  return (
    <>
      <ContainerProduct>
        <select onChange={handleSort}>
          <option value="ascending">Thứ tự theo giá: Thấp đến cao</option>
          <option value="descending">Thứ tự theo giá: Cao đến thấp</option>
        </select>
        <select onChange={handleFilter}>
        <option value="">Tất cả</option>
          <option value="kidsclothing">Kid Clothing</option>
          <option value="kidshoes">Kid Shoes</option>
          <option value="mensclothing">Men Clothing</option>
          <option value="menshoes">Men Shoes</option>
          <option value="womenshoes">Women Shoes</option>
          <option value="womensclothing">Women Clothing</option>
        </select>
      </ContainerProduct>
      <Container1>
        {sortData?.map?.((item) => {
          if (
            item.type === "kidsclothing" ||
            item.type === "kidshoes" ||
            item.type === "mensclothing" ||
            item.type === "menshoes" ||
            item.type === "womenshoes" ||
            item.type === "womensclothing"
          ) {
            return (
              <Wrapper>
                <div
                  onClick={() => handleDetail(item)}
                  key={item.id}
                  className="item__category"
                >
                  <ImgContainer>
                    <InfoContainer>
                      <Image src={item.image} alt="" />
                    </InfoContainer>

                    <Title>{item.productName}</Title>
                    <Price>{item.price}.000đ</Price>
                  </ImgContainer>
                </div>
              </Wrapper>
            );
          }
        })}
      </Container1>
    </>
  );
}
