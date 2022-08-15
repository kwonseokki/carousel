import React, { useEffect, useRef, useState } from "react";
import "./slide.scss";
import noImage from "../assets/no-image.png";
import { FcNext, FcPrevious } from 'react-icons/fc';

type action = {
  type: string;
  select?: number;
};

type SlideProps = {
  images: string[];
  duration: number;
  buttonSize:string
};

const Slide = ({ images, duration, buttonSize }: SlideProps) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLUListElement>(null);
  const [itemWidth, setItemWidth] = useState<number>(0);
  const [index, setIndex] = useState<number>(1);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (boxRef.current) {
      const boxWidthRef = boxRef.current.offsetWidth;
      setItemWidth(boxWidthRef);

      const intervalFn = setInterval(() => {
        autoSlide(index, boxWidthRef);
      }, duration);
      if (isActive) {
        clearInterval(intervalFn);
      }
      return () => {
        clearInterval(intervalFn);
      }; // 컴포넌트가 언마운트 or 업데이트직전
    }
  }, [isActive, index]);

  const autoSlide = (index: number, boxWidth: number): void => {
    const slideInner = itemRef.current;
    if (index !== images.length) {
      slideInner?.setAttribute(`style`, `margin-left:-${boxWidth * index}px`);
      setIndex((prev) => prev + 1);
    } else {
      slideInner?.setAttribute(`style`, `margin-left:0px`);
      setIndex(1);
    }
  };

  // 슬라이드 수동으로 컨트롤
  const moveSlide = (action: action) => {
    const slideInner = itemRef.current;
    if (action.type === "next" && index === images.length) {
      slideInner?.setAttribute("style", `margin-left:-0px`);
      setIndex(1);
    }
    if (action.type === "next" && index < images.length) {
      slideInner?.setAttribute("style", `margin-left:-${itemWidth * index}px`);
      setIndex((prev) => prev + 1);
    }
    // 이전 슬라이드로 이동
    if (action.type === "prev" && index > 1) {
      slideInner?.setAttribute(
        "style",
        `margin-left:-${itemWidth * (index - 1) - itemWidth}px`
      );
      setIndex((prev) => prev - 1);
    }
    if ((action.type === "select" && action.select) || action.select === 0 ) {
      slideInner?.setAttribute(
        "style",
        `margin-left:-${itemWidth * action.select}px`
      );
      setIndex(action.select + 1);
    }
  };

  return (
    <div className="slide-container" ref={boxRef}>
      <ul className="slide-indicator ">
        {images.map((value, idx) => (
          <li
            className={[
              "slide-indicator-btn",
              idx + 1 === index && "active",
              buttonSize
            ].join(" ")}
            onClick={() => {
              moveSlide({ type: "select", select: idx });
            }}
          ></li>
        ))}
      </ul>
      <button
        className="slide-next-btn"
        onClick={() => {
          moveSlide({ type: "next" });
        }}
      >
    <FcNext size="20"/>
      </button>
      <button
        className="slide-prev-btn"
        onClick={() => {
          moveSlide({ type: "prev" });
        }}
      >
      <FcPrevious size="20"/>
      </button>
      <ul
        className="slide-iner"
        onMouseEnter={() => {
          setIsActive(true);
        }}
        onMouseLeave={() => {
          setIsActive(false);
        }}
        ref={itemRef}
      >
        {images.map((image, idx) => (
          <li
            key={idx}
            className="slide-item"
            style={{
              background: `url(${image}) center center`,
              width: itemWidth,
            }}
          ></li>
        ))}
      </ul>
    </div>
  );
};

Slide.defaultProps = {
  images: [noImage],
  duration: 2000,
  buttonSize:"medium"
};

export default React.memo(Slide);
