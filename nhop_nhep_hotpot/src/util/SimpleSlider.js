import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider(props) {
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const slider1 = useRef(null);
    const slider2 = useRef(null);

    useEffect(() => {
        setNav1(slider1.current);
        setNav2(slider2.current);
    }, []);

    return (
        <div>
            <Slider asNavFor={nav2} ref={slider1} infinite={false} >
                {props.imgList.map((img, index) => (
                    <div key={index}>
                        <img src={img.url} alt="" width={"80%"} style={{height:'300px'}} />
                    </div>
                ))}
            </Slider>
            <h4>Hình ảnh khác</h4>
            <Slider
                asNavFor={nav1}
                ref={slider2}
                slidesToShow={3}
                infinite={false}
                swipeToSlide={true}
                focusOnSelect={true}
            >
                {props.imgList.map((img, index) => (
                    <div key={index}>
                        <img src={img.url} alt="" width={"50%"} style={{height: '80px'}}/>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
