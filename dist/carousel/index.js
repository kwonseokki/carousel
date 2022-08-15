import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useRef, useState } from "react";
import "./slide.css";
import { FcNext, FcPrevious } from 'react-icons/fc';
const Slide = ({ images, duration, buttonSize }) => {
    const boxRef = useRef(null);
    const itemRef = useRef(null);
    const [itemWidth, setItemWidth] = useState(0);
    const [index, setIndex] = useState(1);
    const [isActive, setIsActive] = useState(false);
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
            };
        }
    }, [isActive, index]);
    const autoSlide = (index, boxWidth) => {
        const slideInner = itemRef.current;
        if (index !== images.length) {
            slideInner === null || slideInner === void 0 ? void 0 : slideInner.setAttribute(`style`, `margin-left:-${boxWidth * index}px`);
            setIndex((prev) => prev + 1);
        }
        else {
            slideInner === null || slideInner === void 0 ? void 0 : slideInner.setAttribute(`style`, `margin-left:0px`);
            setIndex(1);
        }
    };
    const moveSlide = (action) => {
        const slideInner = itemRef.current;
        if (action.type === "next" && index === images.length) {
            slideInner === null || slideInner === void 0 ? void 0 : slideInner.setAttribute("style", `margin-left:-0px`);
            setIndex(1);
        }
        if (action.type === "next" && index < images.length) {
            slideInner === null || slideInner === void 0 ? void 0 : slideInner.setAttribute("style", `margin-left:-${itemWidth * index}px`);
            setIndex((prev) => prev + 1);
        }
        if (action.type === "prev" && index > 1) {
            slideInner === null || slideInner === void 0 ? void 0 : slideInner.setAttribute("style", `margin-left:-${itemWidth * (index - 1) - itemWidth}px`);
            setIndex((prev) => prev - 1);
        }
        if ((action.type === "select" && action.select) || action.select === 0) {
            slideInner === null || slideInner === void 0 ? void 0 : slideInner.setAttribute("style", `margin-left:-${itemWidth * action.select}px`);
            setIndex(action.select + 1);
        }
    };
    return (_jsxs("div", Object.assign({ className: "slide-container", ref: boxRef }, { children: [_jsx("ul", Object.assign({ className: "slide-indicator " }, { children: images.map((value, idx) => (_jsx("li", { className: [
                        "slide-indicator-btn",
                        idx + 1 === index && "active",
                        buttonSize
                    ].join(" "), onClick: () => {
                        moveSlide({ type: "select", select: idx });
                    } }))) })), _jsx("button", Object.assign({ className: "slide-next-btn", onClick: () => {
                    moveSlide({ type: "next" });
                } }, { children: _jsx(FcNext, { size: "20" }) })), _jsx("button", Object.assign({ className: "slide-prev-btn", onClick: () => {
                    moveSlide({ type: "prev" });
                } }, { children: _jsx(FcPrevious, { size: "20" }) })), _jsx("ul", Object.assign({ className: "slide-iner", onMouseEnter: () => {
                    setIsActive(true);
                }, onMouseLeave: () => {
                    setIsActive(false);
                }, ref: itemRef }, { children: images.map((image, idx) => (_jsx("li", { className: "slide-item", style: {
                        background: `url(${image}) center center`,
                        width: itemWidth,
                    } }, idx))) }))] })));
};
Slide.defaultProps = {
    duration: 2000,
    buttonSize: "medium"
};
export default React.memo(Slide);
//# sourceMappingURL=index.js.map