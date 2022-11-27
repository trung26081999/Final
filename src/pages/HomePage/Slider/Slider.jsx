
import {
    LeftCircleOutlined,RightCircleOutlined
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { sliderData } from "../../../constant/SilderData";

const Container = styled.div`
  width: 100%;
  height: 450px;
  display: flex;
  position: relative;
  overflow: hidden;
  margin-top: 150px;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  position: relative;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  display: flex;
  position: relative;
  align-items: center;
  background-color: #${(props) => props.bg};
`;

const ImgContainer = styled.div`
  height: 100%;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  position: relative;
`;

const InfoContainer = styled.div`
  color: #e0e3db;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-42%, -52%);
`;

const Title = styled.h1`
  font-size: 49px;
  color: white;
`;

const Desc = styled.p`
  font-size: 15px;
  font-weight: 500;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: #1890ff;
  cursor: pointer;
  border: 1px solid #7a7575;
  border-radius: 10px;
  color: #ffffff;
`;

const delay = 3000;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setSlideIndex((prevIndex) =>
          prevIndex === slideIndex.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );
    if (slideIndex === 3) {
      setSlideIndex(0);
    }
    return () => {
      resetTimeout();
    };
  }, [slideIndex]);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <LeftCircleOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderData.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
              <InfoContainer>
                <Title>{item.title}</Title>
                <Desc>{item.desc}</Desc>
              </InfoContainer>
            </ImgContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <RightCircleOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
