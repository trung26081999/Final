import React from 'react'
import LogoPage from '../../../../../assets/Clothing-store.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { BiCartAlt, BiUserCircle } from 'react-icons/bi'
import { GrUserAdmin } from 'react-icons/gr'
import { BsSearch } from 'react-icons/bs'
import { category } from './category'
import { Button, Drawer, Dropdown, Menu, Space, Badge } from 'antd'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTotalItem } from '../../../../../stores/slices/cart.slice'
import { searchProductAction } from '../../../../../stores/slices/product.slice'

import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  min-width: 1200px;
  background: #fff;
  display: block;
  position: fixed;
  top: 0;
  z-index: 1000;

  @media (min-width: 767px) and (max-width: 1024px) {
    width: 100%;
    min-width: 767px;
  }

  @media (max-width: 426px) {
    width: 46%;
    min-width: 320px;
  }
`

const Wrapper = styled.div`
  color: black;
  padding: 10px 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 767px) and (max-width: 1024px) {
    padding: 5px;
  }

  @media (max-width: 426px) {
    padding: 3px;
  }
`

const Center = styled.div`
  flex: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Left = styled.div`
  flex: 30%;
  text-align: center;
`
const Right = styled.div`
  flex: 30%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const Logo = styled.img`
  width: 100%;

  @media (max-width: 426px) {
    height: 35px;
  }

  @media (min-width: 767px) and (max-width: 1024px) {
  }
`
const ButtonLogout = styled.div`
  display: none;
  border: 1px solid #ffffff;
  border-radius: 5px 0 5px;
  color: black;
`
const MenuItem = styled.div`
  font-size: 17px;
  color: black;
  cursor: pointer;
  margin-left: 25px;
  &:hover ${ButtonLogout} {
    display: block;
  }

  @media (max-width: 426px) {
    font-size: 11px;
    margin-left: 10px;
  }
`

const unauthenticatedMenu = [
  {
    key: '1',
    label: (
      <NavLink to={'/Login'}>
        <p target="_blank" rel="noopener noreferrer">
          Đăng nhập
        </p>
      </NavLink>
    ),
  },
]

const authenticatedMenu = [
  {
    key: '2',
    label: (
      <NavLink to={'/profile'}>
        <p target="_blank" rel="noopener noreferrer">
          Thông tin tài khoản
        </p>
      </NavLink>
    ),
  },
  {
    key: '3',
    label: (
      <NavLink to={'/order-list/confirm'}>
        <p target="_blank" rel="noopener noreferrer">
          Lịch sử mua hàng
        </p>
      </NavLink>
    ),
  },
]

const urlDashboard = (
  <>
    <Button
      style={{
        fontSize: '28px',
        background: 'none',
        border: 'none',
        color: 'black',
      }}
    >
      <NavLink to={'/dashboard'}>
        <GrUserAdmin />
      </NavLink>
    </Button>
  </>
)

export default function NavBar() {
  const userInfo = useSelector((state) => state.user.userInfoState)
  const productState = useSelector((state) => state.product.productState)
  const cartState = useSelector((state) => state.cart.cartState)

  const cartItem = cartState.cartItem
  console.log(cartItem)
  // console.log(cartItem.length)
  const listCartItem = cartState.cart
  const userInfoDashboard = userInfo?.data?.decentralization

  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [menuList, setMenuList] = useState([])
  const [urlAdmin, setUrlAmin] = useState()

  const navigateToHome = () => {
    navigate('/')
  }
  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  useEffect(() => {
    dispatch(getTotalItem())
  }, [listCartItem, dispatch])

  useEffect(() => {
    return !userInfo.data
      ? setMenuList(unauthenticatedMenu)
      : setMenuList(authenticatedMenu)
  }, [userInfo])

  useEffect(() => {
    return userInfo?.data?.decentralization === 'admin'
      ? setUrlAmin(urlDashboard)
      : setUrlAmin('')
  }, [userInfoDashboard])

  const handleSearchChange = (keyword) => {
    const values = keyword.target.value
    dispatch(searchProductAction(values))
  }

  const navigate = useNavigate()
  const handleDetail = (item) => {
    navigate(`/product-detail/${item.id}`, { state: { ...item } })
  }

  return (
    <>
      <Container>
        <Wrapper>
          <Left>
            <Logo
              src={LogoPage}
              alt=""
              className="logo"
              onClick={navigateToHome}
            />
          </Left>
          <Center>
            <NavLink to={'/'}>
              <MenuItem>Trang chủ</MenuItem>
            </NavLink>
            <MenuItem className="menu">
              Sản phẩm
              <ul className="category">
                {category.map((item, index) => (
                  <NavLink to={item.path} key={index}>
                    <li>{item.title}</li>
                  </NavLink>
                ))}
              </ul>
            </MenuItem>
            <NavLink to={'/contact'}>
              <MenuItem>Liên hệ</MenuItem>
            </NavLink>
            <NavLink to={'/introduce'}>
              <MenuItem>Giới thiệu</MenuItem>
            </NavLink>
            <NavLink to={'/cart'}>
              <Badge count={cartItem}>
                <MenuItem>Giỏ hàng</MenuItem>
              </Badge>
            </NavLink>
          </Center>
          <Right>
            {' '}
            <div className="icons">
              {urlAdmin}
              <Button
                style={{
                  fontSize: '28px',
                  background: 'none',
                  border: 'none',
                  color: 'black',
                }}
                type="primary"
                onClick={showDrawer}
              >
                <BsSearch />
              </Button>
              <Drawer
                title="Search"
                placement="right"
                onClose={onClose}
                visible={visible}
              >
                <input
                  type="Search"
                  onChange={handleSearchChange}
                  placeholder="Nhập tên sản phẩm"
                  className="search__input"
                />
                {(productState?.search ?? []).map?.((item, index) => {
                  return (
                    <div
                      onClick={() => handleDetail(item)}
                      key={index}
                      className="product__listing"
                    >
                      <img src={item.image} alt="" />
                      <p>{item.productName}</p>
                      <span>{item.price}.000đ</span>
                    </div>
                  )
                })}
              </Drawer>

              <Space direction="vertical">
                <Space wrap>
                  <Dropdown
                    overlay={<Menu items={menuList} />}
                    placement="bottom"
                  >
                    <Button
                      style={{
                        fontSize: '30px',
                        background: 'none',
                        border: 'none',
                        color: 'black',
                      }}
                    >
                      <BiUserCircle />
                    </Button>
                  </Dropdown>
                </Space>
              </Space>

              {/* <Space direction="vertical">
                <Space wrap>
                  <Button
                    style={{
                      fontSize: '30px',
                      background: 'none',
                      border: 'none',
                      color: 'black',
                    }}
                  >
                    <Link to="/cart">
                      <Badge count={cartItem}>
                        <BiCartAlt />
                      </Badge>
                    </Link>
                  </Button>
                </Space>
              </Space> */}
            </div>
          </Right>
        </Wrapper>
      </Container>
    </>
  )
}
