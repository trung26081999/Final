import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductAction,
  PRODUCT_LIMIT,
} from "../../../stores/slices/product.slice";
import { Pagination } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";

const Container2 = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 200px;
`;

const Wrapper = styled.div`
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
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: 0.5s;
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

const Price = styled.p`
  font-size: 16px;
  color: #ff652e;
  font-weight: bold;
`;

export default function ListProduct() {
  const productState = useSelector((state) => state.product.productState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();

  const total = productState?.pagination?.total;
  const loading = productState?.loading;

  const defaultPage = 1;

  const _page = searchParams.get("page") ?? `${defaultPage}`;
  const _limit = searchParams.get("limit") ?? `${PRODUCT_LIMIT}`;

  useEffect(() => {
    dispatch(fetchProductAction({ page: _page, limit: _limit }));
  }, [dispatch, _page, _limit]);

  const onPaginationChange = (page, limit) => {
    // dispatch(fetchProductAction(page))
    setSearchParams({ page, limit });
  };

  const handleDetail = (item) => {
    navigate(`/product-detail/${item.id}`, { state: { ...item } });
  };

  return (
    <>
      <H2 className="title__product">S???n ph???m</H2>
      <Container2>
        {productState?.data?.map?.((item, index) => (
          <Wrapper
            onClick={() => handleDetail(item)}
            key={index}
            className="item"
          >
            <ImgContainer>
              <Image src={item.image} alt="" />
              <InfoContainer>
                <Title>{item.productName}</Title>
                <Price>{item.price}.000??</Price>
              </InfoContainer>
            </ImgContainer>
          </Wrapper>
        ))}
      </Container2>
      <div className="loading">{loading && <LoadingOutlined />}</div>
      <div className="pagination">
        <Pagination
          onChange={onPaginationChange}
          pageSize={+_limit}
          current={+_page}
          total={total}
        />
      </div>
    </>
  );
}
