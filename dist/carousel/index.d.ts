import React from "react";
import './slide.scss';
declare type SlideProps = {
    images: string[];
    duration: number;
    buttonSize: string;
};
declare const _default: React.MemoExoticComponent<{
    ({ images, duration, buttonSize }: SlideProps): JSX.Element;
    defaultProps: {
        images: null;
        duration: number;
        buttonSize: string;
    };
}>;
export default _default;
