import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCategoryAction } from "../../../stores/slices/product.slice";
import styled from "styled-components";

const Container1 = styled.div`
  width: 98%;
  margin: auto;
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;
const Container2 = styled.div`
  width: 98%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 200px;
`;

const Wrapper = styled.div`
  width: calc(20% - 30px);
  border: 1px solid #ddd;
  margin: 5px;
  height: 100%;
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

export default function KidsClothing() {
  const productState = useSelector((state) => state.product.productState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const category = productState.category;

  useEffect(() => {
    dispatch(fetchCategoryAction());
  }, []);

  const handleDetail = (item) => {
    navigate(`/product-detail/${item.id}`, { state: { ...item } });
  };

  return (
    <>
      <Container2>
        {category?.map?.((item) => {
          if (item.type === "kidsclothing") {
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
      </Container2>
    </>
  );
}
