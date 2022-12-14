import React from 'react'
import { notification, Radio, Button } from 'antd'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { addToCartAction } from '../../stores/slices/cart.slice'
import { v4 } from 'uuid'
import NavBar from '../../components/layouts/NavbarUser-Layout/components/NavBar/NavBar'
import { RiStarFill, RiStarHalfFill } from 'react-icons/ri'
import { Col, Container, Row } from 'react-bootstrap'
import { useRef } from 'react'
import { toast } from 'react-toastify'
import ListProduct from '../HomePage/ListProduct/ListProduct'
import styled from 'styled-components'

const ButtonGroup = Button.Group

const Container2 = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Wrapper = styled.div`
  border: 1px solid #ddd;
  margin: 20px;
  height: 100%;
  cursor: pointer;
`

const ImgContainer = styled.div`
  position: relative;
  cursor: pointer;
`

const Image = styled.img`
  width: 100%;
  position: relative;
  padding: 20px 10px;
`

const InfoContainer = styled.div`
  color: #e0e3db;
`

const Title = styled.h1`
  color: #000;
  font-size: 14px;
  font-weight: 500;
`

const H2 = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #000;
  margin-top: 25px;
`

const P = styled.h1`
  font-size: 14px;
  font-weight: normal;
  color: #000;
`
const Price = styled.p`
  font-size: 16px;
  color: #ff652e;
  font-weight: bold;
`

const listSize = [
  { label: 'S', price: 0 },
  { label: 'M', price: 0 },
  { label: 'L', price: 0 },
  { label: 'XL', price: 0 },
  { label: 'XXL', price: 0 },
]

export default function DetailProduct() {
  const [value, setValue] = useState(0)
  const [count, setCount] = useState(1)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { id } = useParams()
  const image = location.state.image
  const productName = location.state.productName
  console.log(productName)
  const price = location.state.price
  console.log(price)

  // const listSize = [
  //   { label: 'S', price: price },
  //   { label: 'M', price: price },
  //   { label: 'L', price: price },
  //   { label: 'XL', price: price },
  //   { label: 'XXL', price: price },
  // ]
  const shortDesc = location.state.shortDesc
  // console.log(shortDesc)
  const description = location.state.description
  // console.log(description)
  const type = location.state.type
  console.log(type)
  const avgRating = location.state.avgRating
  // console.log(avgRating)
  const total = price * count + value.price * count
  const size = location.state.size
  console.log(size)
  console.log(location.state)
  // console.log(total)
  const reviews = location.state.reviews
  console.log(count)

  const productState = useSelector((state) => state.product.productState)
  console.log(productState)

  const category = productState?.category
  console.log(category)

  const data = productState?.data
  console.log(data)

  // console.log(reviews)

  // const data = (state) => state.product.productState

  // const products = useSelector((state) => state.product.productState)

  // console.log(products)

  const relatedProducts = category.filter((item) => item.type === type)

  console.log(relatedProducts)

  const increase = () => {
    setCount(count + 1)
  }

  const decline = () => {
    let newCount = count - 1

    if (newCount < 1) {
      newCount = 1
    }
    setCount(newCount)
  }

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const gotoCart = () => {
    navigate('/cart')
  }

  const handleDetail = (item) => {
    navigate(`/product-detail/${item.id}`, { state: { ...item } })
  }

  console.log(location.state)

  const products = location.state
  console.log(products)

  // const productsArr = Object.entries(products)
  // console.log(productsArr)
  // const filteredArr = productsArr.filter(function ([key, value]) {
  //   // console.log(key)
  //   // console.log(value)

  //   return key === 'type' && value === 'kidsclothing'
  // })

  // const filteredArr = productsArr

  const [tab, setTab] = useState('desc')
  const reviewUser = useRef('')
  const reviewMsg = useRef('')

  const [rating, setRating] = useState(null)

  const handleAddToCart = (image, productName, total, count, size, type) => {
    if (value === 0) {
      notification.error({
        message: `B???n ch??a ch???n size!`,
      })
    } else {
      const cartItem = {
        id: v4(),
        idProduct: id,
        image: image,
        productName: productName,
        type: type,
        total: total,
        count: count,
        size: {
          label: size.label,
          price: price,
        },
      }
      console.log(cartItem)
      dispatch(addToCartAction(cartItem))
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const reviewUserName = reviewUser.current.value
    const reviewUserMsg = reviewMsg.current.value

    const reviewObj = {
      userName: reviewUserName,
      text: reviewUserMsg,
      rating,
    }

    console.log(reviewObj)
    notification.success({
      message: `Review Successed`,
    })
  }

  return (
    <>
      <NavBar />
      <div className="item__detail">
        <div className="product__detail">
          <div className="img__product">
            <img src={image} alt="" />
            <div className="description__product">
              <span>{shortDesc}</span>
            </div>
          </div>
          <div className="options__product">
            <h2>{productName}</h2>
            <span>{price}.000??</span>
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
                    )
                  })}
                </Radio.Group>
              </div>
            </div>
            <div className="product__rating d-flex align-items-center gap-5 mb-3">
              <div className="start">
                <span>
                  <i>
                    <RiStarFill />
                  </i>
                </span>
                <span>
                  <i>
                    <RiStarFill />
                  </i>
                </span>
                <span>
                  <i>
                    <RiStarFill />
                  </i>
                </span>
                <span>
                  <i>
                    <RiStarFill />
                  </i>
                </span>
                <span>
                  <i>
                    <RiStarHalfFill />
                  </i>
                </span>
              </div>

              <p>
                (<span>{avgRating}</span> ratings)
              </p>
            </div>
            <motion.button
              whileTap={{ scale: 1.2 }}
              onClick={() =>
                handleAddToCart(image, productName, total, count, value, type)
              }
            >
              <Link to="/cart"> Th??m v??o gi??? h??ng - {total}.000??</Link>
            </motion.button>
          </div>
        </div>
      </div>

      <section className="tab__content">
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6
                  className={`${tab === 'desc' ? 'active__tab' : ''}`}
                  onClick={() => setTab('desc')}
                >
                  Description
                </h6>
                <h6
                  className={`${tab === 'rev' ? 'active__tab' : ''}`}
                  onClick={() => setTab('rev')}
                >
                  Reviews ({reviews.length})
                </h6>
              </div>

              {tab === 'desc' ? (
                <div className="tab__content mt-5">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="product__review mt-5">
                  <div className="review__wrapper">
                    <ul>
                      {reviews?.map((item, index) => (
                        <li key={index} className="mb-4">
                          <h6>Thoang Tran</h6>
                          <span>{item.rating} ( rating)</span>
                          <p>{item.text}</p>
                        </li>
                      ))}
                    </ul>

                    <div className="review__form">
                      <h4>Leave your experience</h4>
                      <form onSubmit={submitHandler}>
                        <div className="form__group">
                          <input
                            type="text"
                            placeholder="Enter name"
                            ref={reviewUser}
                            required
                          />
                        </div>

                        <div className="form__group d-flex align-items-center gap-5 rating__group">
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(1)}
                          >
                            1
                            <i>
                              <RiStarFill />
                            </i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(2)}
                          >
                            2
                            <i>
                              <RiStarFill />
                            </i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(3)}
                          >
                            3
                            <i>
                              <RiStarFill />
                            </i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(4)}
                          >
                            4
                            <i>
                              <RiStarFill />
                            </i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(5)}
                          >
                            5
                            <i>
                              <RiStarHalfFill />
                            </i>
                          </motion.span>
                        </div>

                        <div className="form__group">
                          <textarea
                            ref={reviewMsg}
                            rows={4}
                            type="text"
                            placeholder="Review Message..."
                            required
                          />
                        </div>

                        <button type="submit" className="btn__submit">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>

            <Col lg="12" className="mt-5">
              <h2 className="related__title">You might also like</h2>
            </Col>

            <Col lg="12">
              <Container2>
                {' '}
                {relatedProducts?.map((item) => {
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
                          <Price>{item.price}.000??</Price>
                        </ImgContainer>
                      </div>
                    </Wrapper>
                  )
                })}
              </Container2>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}