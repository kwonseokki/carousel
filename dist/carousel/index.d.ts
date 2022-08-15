import React from "react";
import "./slide.css";
declare type SlideProps = {
    images: string[];
    duration: number;
    buttonSize: string;
};
declare const _default: React.MemoExoticComponent<{
    ({ images, duration, buttonSize }: SlideProps): JSX.Element;
    defaultProps: {
        duration: number;
        buttonSize: string;
    };
}>;
export default _default;
