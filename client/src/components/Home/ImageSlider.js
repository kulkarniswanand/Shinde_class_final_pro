import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css";

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    fade: true,
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ul style={{ margin: "0", padding: "0", display: "flex", gap: "10px" }}>
          {dots.map((dot, index) => (
            <li
              key={index}
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: "#fff",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            >
              {dot}
            </li>
          ))}
        </ul>
      </div>
    ),
  };

  return (
    <div className="w-full overflow-hidden h-auto relative bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">
      Nurturing knowledge for a promising tomorrow
      </h2>
      <div className="relative w-11/12 md:w-4/5 lg:w-3/5 mx-auto shadow-xl rounded-lg overflow-hidden">
        <Slider {...settings}>
          {/* Slide 1 */}
          <div className="relative">
            <img
              src="/images/slider/sh2.jpg"
              alt="Slide 1"
              className="w-full h-80 md:h-96 object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-gradient-to-r from-black via-gray-800 to-transparent text-white p-4 rounded-lg animate__animated animate__fadeInLeft">
              <h3 className="text-xl font-bold">Learning with Excellence</h3>
              <p className="text-sm">Empowering education for a brighter future.</p>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="relative">
            <img
              src="/images/slider/sh5.png"
              alt="Slide 2"
              className="w-full h-80 md:h-96 object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-gradient-to-r from-black via-gray-800 to-transparent text-white p-4 rounded-lg animate__animated animate__fadeInRight">
              <h3 className="text-xl font-bold">Advanced Facilities</h3>
              <p className="text-sm">State-of-the-art classrooms and resources.</p>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="relative">
            <img
              src="/images/slider/sh1.jpg"
              alt="Slide 2"
              className="w-full h-80 md:h-96 object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-gradient-to-r from-black via-gray-800 to-transparent text-white p-4 rounded-lg animate__animated animate__fadeInRight">
              <h3 className="text-xl font-bold">Advanced Facilities</h3>
              <p className="text-sm">State-of-the-art classrooms and resources.</p>
            </div>
          </div>

          {/* Slide 4 */}
          <div className="relative">
            <img
              src="/images/slider/sh4.png"
              alt="Slide 3"
              className="w-full h-80 md:h-96 object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-gradient-to-r from-black via-gray-800 to-transparent text-white p-4 rounded-lg animate__animated animate__zoomIn">
              <h3 className="text-xl font-bold">Guided by Visionaries</h3>
              <p className="text-sm">Leadership that inspires academic excellence.</p>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default ImageSlider;
