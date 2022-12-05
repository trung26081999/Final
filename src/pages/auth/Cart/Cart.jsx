import { notification } from 'antd'
import React from 'react'
import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { RiDeleteBinLine } from 'react-icons/ri'

import './Cart.scss'
import { Link, useNavigate } from 'react-router-dom'
import {
  clearCart,
  decreaseCart,
  deleteCartItemAction,
  getTotalBill,
  increaseCart,
  removeCartAction,
} from '../../../stores/slices/cart.slice'
import EmptyComp from './Empty/Empty'
import NoUser from './Empty/NoUser'
import { useEffect } from 'react'

export default function Cart() {
  const navigate = useNavigate()
  const userInfo = useSelector((state) => state.user.userInfoState)
  console.log(userInfo)
  const cartState = useSelector((state) => state.cart.cartState)

  console.log(cartState)
  console.log(cartState)
  const totalAmount = cartState?.totalAmount
  console.log(totalAmount)
  const totalBill = cartState?.totalBill
  console.log(totalBill)
  const listCartItem = cartState?.cart
  console.log(listCartItem)
  const userData = userInfo?.data
  console.log(userData)

  // const productCart = listCartItem?.filter(
  //   (item) => item?.userEmail === userData?.email,
  // )

  // const productsPrice = productCart?.reduce(
  //   (prev, current) => prev + current.quantity * current.price,
  //   0,
  // )
  // const idUser = userInfo?.data?.id
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTotalBill())
  }, [listCartItem, dispatch])

  const handleClearCart = () => {
    dispatch(clearCart())
    notification.success({
      message: `Clear cart!!!`,
    })
  }

  // const handleDeleteItem = (id) => {
  //   dispatch(deleteCartItemAction(id))
  //   notification.success({
  //     message: `Bạn đã xóa một sản phẩm!`,
  //   })
  // }
  // dispatch(removeCartAction(cartState.cart.length))

  if (!userInfo?.data) return <NoUser />
  if (listCartItem?.length === 0) return <EmptyComp />

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <table className="table bordered">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Size</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {listCartItem?.map((item, index) => {
                    return <Tr item={item} key={index} />
                  })}
                </tbody>
              </table>
            </Col>

            <Col lg="12" className=" ">
              <div className="cart__summary">
                <button
                  className="clear__btn"
                  onClick={() => handleClearCart()}
                >
                  Clear Cart
                </button>
                <div className="cart__checkout">
                  <h6 className="d-flex align-items-center justify-content-between">
                    Subtotal
                    <span className="fs-4 fw-bold">{totalBill}.000đ</span>
                  </h6>
                  <p className="fs-6 mt-2">
                    Taxes and shipping will calculate in checkout
                  </p>
                  <div>
                    <button className="buy__btn w-100">
                      <Link to="/checkout">Checkout</Link>
                    </button>

                    <button className="buy__btn w-100 mt-3">
                      <Link to="/">Continue Shopping</Link>
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

const Tr = ({ item }) => {
  const dispatch = useDispatch()

  console.log(item)

  console.log(item.count)

  console.log(item.total)

  console.log(item.size.price)

  const handleDeleteItem = () => {
    dispatch(deleteCartItemAction(item.id))
    notification.success({
      message: `Bạn đã xóa một sản phẩm!`,
    })
  }

  // const handleDeleteItem = (id) => {
  //   dispatch(deleteCartItemAction(id))
  //   notification.success({
  //     message: `Bạn đã xóa một sản phẩm!`,
  //   })
  // }
  // dispatch(removeCartAction(item.length))

  const handleDecreaseCart = () => {
    dispatch(decreaseCart(item))
  }
  const handleIncreaseCart = () => {
    dispatch(increaseCart(item))
  }

  // const deleteProduct = () => {
  //   dispatch(cartActions.deleteItem(item.id))
  // }

  // const handleDecreaseCart = () => {
  //   dispatch(cartActions.decreaseCart(item))
  // }

  // const handleAddToCart = () => {
  //   dispatch(cartActions.addItem(item))
  // }

  return (
    <tr>
      <td>
        <img src={item?.image} alt="" />
      </td>
      <td>{item?.productName}</td>
      <td>{item?.size.price}.000đ</td>
      <td>{item?.size.label}</td>

      <td>
        <div className="cart-product-quantity">
          <button onClick={handleDecreaseCart}>-</button>
          <div className="count">{item?.count}</div>
          <button onClick={handleIncreaseCart}>+</button>
        </div>{' '}
      </td>
      <td>
        <div className="cart-product-total-price">{item?.total}.000đ</div>
      </td>
      <td>
        {' '}
        <motion.i onClick={handleDeleteItem} whileTap={{ scale: 1.2 }}>
          <RiDeleteBinLine />
        </motion.i>
      </td>
    </tr>
  )
}
