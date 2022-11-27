import React from "react";
import { notification, Radio, Button } from "antd";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addToCartAction } from "../../stores/slices/cart.slice";
import { v4 } from "uuid";
import NavBar from "../../components/layouts/NavbarUser-Layout/components/NavBar/NavBar";

const ButtonGroup = Button.Group;

const listSize = [
  { label: "S", price: 0 },
  { label: "M", price: 0 },
  { label: "L", price: 0 },
  { label: "XL", price: 0 },
  { label: "XXL", price: 0 },
];

export default function DetailProduct() {
  const [value, setValue] = useState(0);
  const [count, setCount] = useState(1);
  const location = useLocation();
  const dispatch = useDispatch();

  const { id } = useParams();
  const image = location.state.image;
  const productName = location.state.productName;
  const price = location.state.price;
  const description = location.state.description;
  const type = location.state.type;
  const total = price * count + value.price * count;

  const increase = () => {
    setCount(count + 1);
  };

  const decline = () => {
    let newCount = count - 1;

    if (newCount < 1) {
      newCount = 1;
    }
    setCount(newCount);
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const handleAddToCart = (image, productName, total, count, size, type) => {
    if (value === 0) {
      notification.error({
        message: `Bạn chưa chọn size!`,
      });
    } else {
      const cartItem = {
        id: v4(),
        idProduct: id,
        image: image,
        productName: productName,
        type: type,
        total: total,
        count: count,
        size: size,
      };
      dispatch(addToCartAction(cartItem));
    }
  };

  return (
    <>
      <NavBar />
      <div className="item__detail">
        <div className="product__detail">
          <div className="img__product">
            <img src={image} alt="" />
            <div className="description__product">
              <span>{description}</span>
            </div>
          </div>
          <div className="options__product">
            <h2>{productName}</h2>
            <span>{price}.000đ</span>
            <div className="option__quantity">
              <button className="desc">
                <ButtonGroup>
                  <Button onClick={decline}>
                    <MinusOutlined />
                  </Button>
                </ButtonGroup>
              </button>
              <span>{count}</span>
              <button className="asc">
                <ButtonGroup>
                  <Button onClick={increase}>
                    <PlusOutlined />
                  </Button>
                </ButtonGroup>
              </button>
            </div>
            <div className="option__size">
              <p>Choose Size</p>
              <div className="type__size">
                <Radio.Group onChange={onChange} value={value}>
                  {listSize.map((item) => {
                    return (
                      <Radio key={item.label} value={item}>
                        {item.label}
                      </Radio>
                    );
                  })}
                </Radio.Group>
              </div>
            </div>
            <button
              onClick={() =>
                handleAddToCart(image, productName, total, count, value, type)
              }
            >
              Thêm vào giỏ hàng - {total}.000đ
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
