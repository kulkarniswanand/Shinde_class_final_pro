import React from 'react';
import Slider from 'react-slick';

const ImageSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };

    return (
        <div className="w-full overflow-hidden">
            <Slider {...settings}>
                <div>
                    <img src="1.jpg" alt="Class 1" className="w-full h-auto object-cover" />
                </div>
                <div>
                    <img src="/IMAGES/2.JPG" alt="Class 2" className="w-full h-auto object-cover" />
                </div>
                <div>
                    <img src="/IMAGES/3.JPG" alt="Class 3" className="w-full h-auto object-cover" />
                </div>
                {/* Add more images as needed */}
            </Slider>
        </div>
    );
};

export default ImageSlider;
