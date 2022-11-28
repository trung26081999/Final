import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { updateProductCartAction,deleteCartItemAction,fetchOrderAction } from '../../../stores/slices/cart.slice.js';

const ProductImg = styled.div`
height: 150px;
`;

const ProductDetail = styled.div`
display: flex;
justify-content: center;
align-items: center;
border-bottom: 1px solid rgba(0,0,0,.09);
color: #000000;
height: 160px;
`;

const Image = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
`;

const Details = styled.div`
flex: 25%;
padding: 20px;
display: flex;
flex-direction: column;
justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex: 16%;
`;

const ProductAmountContainer = styled.div`
display: flex;
align-items: center;
cursor: pointer;
font-size: 16px;
font-weight: 500;
`;

const ProductAmount = styled.div`
margin: 0 10px;
`;

const ProductPrice = styled.div`
flex: 16%;
font-size: 16px;
font-weight: 500;
`;

export function CartItem({ data }) {
    const [quantity, setQuantity] = useState(data.quantity ?? 1);
    const dispatch = useDispatch();
    
    const handleDeleteProduct = () => {
        if (window.confirm('You want to delete this product ?')) {
            dispatch(deleteCartItemAction(data.id));
            dispatch(fetchOrderAction());
        }
    }

    const handlePlusQuantity = () => {
        if (quantity < 100) {
        setQuantity(quantity + 1);
        dispatch(updateProductCartAction({id: data.id, data: { quantity: quantity + 1}}));
        dispatch(fetchOrderAction());
    }}

    const handleMinusQuantity = () => {
        if (quantity > 1) {
        setQuantity(quantity - 1);
        dispatch(updateProductCartAction({id: data.id, data: { quantity: quantity - 1}}));
        dispatch(fetchOrderAction());
    }}
    const amountOfMoney = data.quantity*data.price;

    return (<ProductDetail>
        <ProductImg><Image src={data.img} /></ProductImg>
        <Details>
            <ProductName>{data.name}</ProductName>
            <ProductSize>Size: {data.size}</ProductSize>
        </Details>
        <ProductPrice>{data.price}$</ProductPrice>
        <PriceDetail>
            <ProductAmountContainer>
                <MinusOutlined onClick={handleMinusQuantity} />
                <ProductAmount>{quantity}</ProductAmount>
                <PlusOutlined onClick={handlePlusQuantity} />
            </ProductAmountContainer>
        </PriceDetail>
        <ProductPrice>{amountOfMoney}$</ProductPrice>
        <ProductPrice><DeleteOutlined onClick={handleDeleteProduct} style={{ fontSize: "25px", cursor: "pointer" }} /></ProductPrice>
    </ProductDetail>)
}