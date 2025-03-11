import React from "react";
import ImageSlider from "../../components/Home/ImageSlider";
import DirectorMessage from "../../components/Home/DirectorMessage";
import VisionMission from "../../components/Home/VisionMission";
import Footer from "../../components/Home/Footer";

const HomePage = () => {
  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #6a11cb, #2575fc)",
        minHeight: "100vh",
        color: "white",
      }}
    >
      {/* Director's Message Section */}
      <section>
        <DirectorMessage />
      </section>

      {/* Image Slider Section */}
      <section>
        <ImageSlider />
      </section>

      {/* Vision Mission Section (Only Once) */}
      <section>
        <VisionMission />
      </section>

      {/* Footer Section (if needed) */}
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
