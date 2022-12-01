import React from 'react'
import './About.scss'
import bannerGirl from '../../assets/1000_F_236259457_2RhF2UrlQFwNxJ255egyGfMTdCbj0Yts.jpg'
import ava1 from '../../assets/avatar1.jpg'
import ava2 from '../../assets/avatar2.jpg'
import ava3 from '../../assets/avatar3.jpg'

import bannerMen from '../../assets/fashion-model-pose-in-casual-mens-wear-touching-unshaven-beard-isolated-on-white-fashionist-2JAM208.jpg'
import bannerWomen from '../../assets/400_F_462946321_JFT5Z1FSZAeifqxWQGjVUXrWgfmrmOHj.jpg'
import { Col, Container, Row } from 'react-bootstrap'
import {
  FaFacebookF,
  FaInstagram,
  FaLongArrowAltRight,
  FaTwitter,
} from 'react-icons/fa'

const About = () => {
  return (
    <Container>
      <Row className="mb-5 mt-3">
        <Col lg="12">
          <h1 className="about__title text-center">About Us</h1>
        </Col>
      </Row>

      <Row className="sec__sp">
        <Col lg="12" className="welcome__area pt-10 mb-5">
          <div className="container">
            <div className="welcome__content text-center">
              <h5>Who we are</h5>
              <h3>Welcome to ClothingStore</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt labor et dolore magna aliqua. Ut enim
                ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                ut aliquip ex ea commo consequat irure
              </p>
            </div>
          </div>
        </Col>
        <Col lg="12" className="banner__area pt-10 mb-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-4">
                <div className="single__banner mb-30">
                  <a href="/kidsclothing">
                    <img src={bannerGirl} alt="" />
                  </a>
                  <div className="banner__content">
                    <h3>Kids Clothings</h3>
                    <h4>
                      Starting at <span>$24.00</span>
                    </h4>
                    <a href="/kidsclothing">
                      <i>
                        <FaLongArrowAltRight />
                      </i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="single__banner mb-30">
                  <a href="/menclothing">
                    <img src={bannerMen} alt="" />
                  </a>
                  <div className="banner__content">
                    <h3>Men Clothings</h3>
                    <h4>
                      Starting at <span>$63.00</span>
                    </h4>
                    <a href="/menclothing">
                      <i>
                        <FaLongArrowAltRight />
                      </i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="single__banner mb-30">
                  <a href="/womenshoes">
                    <img src={bannerWomen} alt="" />
                  </a>
                  <div className="banner__content">
                    <h3>Women Shoes</h3>
                    <h4>
                      Starting at <span>$49.00</span>
                    </h4>
                    <a href="/womenshoes">
                      <i>
                        <FaLongArrowAltRight />
                      </i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col lg="12" className="about__misssion pb-30">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-4">
                <div className="single__mission mb-30">
                  <h3>Our Vision</h3>
                  <p>
                    ClothingStore provide how all this mistaken idea of denounc
                    pleasure and sing pain was born an will give you a ete
                    account of the system, and expound the actual teangs the eat
                    explorer of the truth.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="single__mission mb-30">
                  <h3>Our Mission</h3>
                  <p>
                    ClothingStore provide how all this mistaken idea of denounc
                    pleasure and sing pain was born an will give you a ete
                    account of the system, and expound the actual teangs the eat
                    explorer of the truth.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="single__mission mb-30">
                  <h3>Our Goal</h3>
                  <p>
                    ClothingStore provide how all this mistaken idea of denounc
                    pleasure and sing pain was born an will give you a ete
                    account of the system, and expound the actual teangs the eat
                    explorer of the truth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col lg="12" className="team__area">
          <div className="container">
            <div className="section__title text-center mb-60">
              <h2>Team Members</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt labor et dolore magna aliqua
              </p>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="team__wrapper mb-30">
                  <div className="team__img">
                    <img src={ava1} alt="" />
                    <div className="team__action">
                      <a
                        className="facebook"
                        href="https://www.facebook.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i>
                          <FaFacebookF />
                        </i>
                      </a>
                      <a
                        className="twitter"
                        href="https://www.twitter.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i>
                          <FaTwitter />
                        </i>
                      </a>
                      <a
                        className="instagram"
                        href="https://www.instagram.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i>
                          <FaInstagram />
                        </i>
                      </a>
                    </div>
                  </div>
                  <div className="team__content text-center">
                    <h4>Phuc Tran</h4>
                    <span>Team Leader</span> <br />
                    <span>Project Owner</span>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="team__wrapper mb-30">
                  <div className="team__img">
                    <img src={ava2} alt="" />
                    <div className="team__action">
                      <a
                        className="facebook"
                        href="https://www.facebook.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i>
                          <FaFacebookF />
                        </i>
                      </a>
                      <a
                        className="twitter"
                        href="https://www.twitter.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i>
                          <FaTwitter />
                        </i>
                      </a>
                      <a
                        className="instagram"
                        href="https://www.instagram.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i>
                          <FaInstagram />
                        </i>
                      </a>
                    </div>
                  </div>
                  <div className="team__content text-center">
                    <h4>Thoang Tran</h4>
                    <span>Developer</span>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="team__wrapper mb-30">
                  <div className="team__img">
                    <img src={ava3} alt="" />
                    <div className="team__action">
                      <a
                        className="facebook"
                        href="https://www.facebook.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i>
                          <FaFacebookF />
                        </i>
                      </a>
                      <a
                        className="twitter"
                        href="https://www.twitter.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i>
                          <FaTwitter />
                        </i>
                      </a>
                      <a
                        className="instagram"
                        href="https://www.instagram.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i>
                          <FaInstagram />
                        </i>
                      </a>
                    </div>
                  </div>
                  <div className="team__content text-center">
                    <h4>Trung Luong</h4>
                    <span>Developer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default About
