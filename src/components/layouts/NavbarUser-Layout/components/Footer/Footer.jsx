import React from 'react'
import { Col, Container, ListGroup, ListGroupItem, Row } from 'reactstrap'
import './FooterContent.scss'
import {
  RiFacebookLine,
  RiInstagramLine,
  RiMailLine,
  RiMapPinLine,
  RiPhoneLine,
  RiTwitterLine,
  RiYoutubeLine,
} from 'react-icons/ri'
import { Link } from 'react-router-dom'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <>
      <footer className="footer">
        <Container>
          <Row>
            <Col lg="4" className="mb-4" md="6">
              <div className="logo">
                <div>
                  <h1 className="text-white">ClothingStore</h1>
                </div>
              </div>
              <p className="footer__text mt-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book
              </p>
            </Col>
            <Col lg="3" md="3" className="mb-4">
              <div className="footer__quick-links">
                <h4 className="quick__links-title">Top Categories</h4>
                <ListGroup>
                  <ListGroupItem className="ps-0 border-0">
                    <Link to="/">All Products</Link>
                  </ListGroupItem>
                  <ListGroupItem className="ps-0 border-0">
                    <Link to="/kidsclothing">Kids Clothings</Link>
                  </ListGroupItem>
                  <ListGroupItem className="ps-0 border-0">
                    <Link to="womenshoes">Women Shoes</Link>
                  </ListGroupItem>
                  <ListGroupItem className="ps-0 border-0">
                    <Link to="/menclothing">Men Clothing</Link>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </Col>
            <Col lg="2" md="3" className="mb-4">
              <div className="footer__quick-links">
                <h4 className="quick__links-title">Useful Links</h4>
                <ListGroup>
                  <ListGroupItem className="ps-0 border-0">
                    <Link to="/about">About US</Link>
                  </ListGroupItem>
                  <ListGroupItem className="ps-0 border-0">
                    <Link to="/contact">Contact US</Link>
                  </ListGroupItem>
                  <ListGroupItem className="ps-0 border-0">
                    <Link to="/cart">Cart</Link>
                  </ListGroupItem>
                  <ListGroupItem className="ps-0 border-0">
                    <Link to="/Login">Login</Link>
                  </ListGroupItem>
                  <ListGroupItem className="ps-0 border-0">
                    <Link to="#">Privacy Policy</Link>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </Col>
            <Col lg="3" md="4" className="mb-4">
              <div className="footer__quick-links">
                <h4 className="quick__links-title">Contact</h4>
                <ListGroup className="footer__contact">
                  <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                    <span>
                      <i>
                        <RiMapPinLine />
                      </i>
                    </span>
                    <p>154 Tran Cao Van, Da Nang, Viet Nam</p>
                  </ListGroupItem>
                  <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                    <span>
                      <i>
                        <RiPhoneLine />
                      </i>
                    </span>
                    <p>+0918814325</p>
                  </ListGroupItem>
                  <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                    <span>
                      <i>
                        <RiMailLine />
                      </i>
                    </span>
                    <p>thoangtran20@gmail.com</p>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </Col>

            <Col lg="12" md="4" className="mb-4">
              <div className="footer__social-links">
                <ListGroup className="footer__social">
                  <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                    <a
                      href="https://www.facebook.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i>
                        <RiFacebookLine />
                      </i>
                    </a>

                    <a
                      href="https://twitter.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i>
                        <RiTwitterLine />
                      </i>
                    </a>
                    <a
                      href="https://www.youtube.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i>
                        <RiYoutubeLine />
                      </i>
                    </a>
                    <a
                      href="https://www.instagram.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i>
                        <RiInstagramLine />
                      </i>
                    </a>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </Col>

            <Col lg="12">
              <p className="footer__copyright">
                Copyright {year} developed by Thoang Tran. All rights reserved
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  )
}

export default Footer