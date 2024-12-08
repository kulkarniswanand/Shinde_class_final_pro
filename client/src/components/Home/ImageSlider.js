import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

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
        fade: true, // Add a fade effect for smooth transitions
        adaptiveHeight: true, // Adjust slider height based on image content
    };

    return (
        <div className="relative w-full overflow-hidden h-auto">
            <Slider {...settings} className="rounded-lg shadow-lg">
                <div className="relative">
                    <img
                        src="/images/slider/1.jpg"
                        alt="Class 1"
                        className="w-full h-80 md:h-96 object-cover rounded-lg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white py-4 px-6">
                        <h3 className="text-lg font-bold">Learning with Excellence</h3>
                        <p className="text-sm">Empowering education for a brighter future.</p>
                    </div>
                </div>
                <div className="relative">
                    <img
                        src="/images/slider/2.JPG"
                        alt="Class 2"
                        className="w-full h-80 md:h-96 object-cover rounded-lg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white py-4 px-6">
                        <h3 className="text-lg font-bold">Advanced Facilities</h3>
                        <p className="text-sm">State-of-the-art classrooms and resources.</p>
                    </div>
                </div>
                <div className="relative">
                    <img
                        src="/Images/shindesir.jpg"
                        alt="Class 3"
                        className="w-full h-80 md:h-96 object-cover rounded-lg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white py-4 px-6">
                        <h3 className="text-lg font-bold">Guided by Visionaries</h3>
                        <p className="text-sm">Leadership that inspires academic excellence.</p>
                    </div>
                </div>
                {/* Add more images with captions */}
            </Slider>
        </div>
    );
};

export default ImageSlider;
