import React from "react";
import ImageSlider from "../../components/Home/ImageSlider";
import DirectorMessage from "../../components/Home/DirectorMessage";
import VisionMission from "../../components/Home/VisionMission";
// import About from './Home/About';
import Footer from "../../components/Home/Footer";

const HomePage = () => {
  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #6a11cb, #2575fc)", // Gradient colors
        minHeight: "100vh", // Ensure it covers the full viewport
        color: "white", // Optional: Change text color for better readability
      }}
    >
      {/* Header or Navbar */}
      <header>
        {/* Your Navbar Component */}
        {/* <Navbar /> */}
      </header>

      {/* Add additional sections like about, features, etc., below */}

      {/* Director's Message Section */}
      <section>
        <DirectorMessage />
      </section>

      {/* VisionMission Section */}
      <section>
        <VisionMission />
      </section>


      {/* Image Slider */}
      { <section>
        <ImageSlider />
      </section> }

      {/* Footer Section */}
      {/* <section>
        <Footer />
      </section> */}
    </div>
  );
};

export default HomePage;
