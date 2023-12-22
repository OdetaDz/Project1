import React, { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import styled from "styled-components";

const StyledDiv = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100vh - 200px);
  
  .slide {
    object-fit: cover;
    object-position: top;
    height: calc(100vh - 200px);
    width: 100%;
  }
  
  .slide-hidden {
    display: none;
  }
  
  .arrow {
    position: absolute;
    filter: drop-shadow(0px 0px 5px #555);
    width: 2rem;
    height: 2rem;
    color: white;
  }
  
  .arrow:hover {
    cursor: pointer;
  }
  
  .arrow-left {
    left: 1rem;
  }
  
  .arrow-right {
    right: 1rem;
  }
  
  .indicators {
    display: flex;
    position: absolute;
    bottom: 1rem;
  }
  
  .indicator {
    background-color: white;
    height: 0.5rem;
    width: 0.5rem;
    border-radius: 100%;
    border: none;
    outline: none;
    box-shadow: 0px 0px 5px #555;
    margin: 0 0.2rem;
    cursor: pointer;
  }
  
  .indicator-inactive {
    background-color: grey;
  }
`;

export const Carousel = ({ data }) => {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  };

  return (
    <StyledDiv>
      <BsArrowLeftCircleFill onClick={prevSlide} className="arrow arrow-left" />
      {data.map((item, idx) => {
        return (
          <img
            src={item.src}
            alt={item.alt}
            key={idx}
            className={slide === idx ? "slide" : "slide slide-hidden"}
          />
        );
      })}
      <BsArrowRightCircleFill
        onClick={nextSlide}
        className="arrow arrow-right"
      />
      <span className="indicators">
        {data.map((_, idx) => {
          return (
            <button
              key={idx}
              className={
                slide === idx ? "indicator" : "indicator indicator-inactive"
              }
              onClick={() => setSlide(idx)}
            ></button>
          );
        })}
      </span>
    </StyledDiv>
  );
};