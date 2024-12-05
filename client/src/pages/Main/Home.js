import React from "react";
import ImageSlider from "../../components/Home/ImageSlider";
import DirectorsMessage from "../../components/Home/DirectorsMessage";
import VisionMission from "../../components/Home/visionMission";

// import About from './Home/About';
import Footer from "../../components/Home/Footer";
const HomePage = () => {
  return (
    <div>
      {/* Header or Navbar */}
      <header>{/* Your Navbar Component */}
      {/* <Navbar /> */}

      </header>

      {/* Add additional sections like about, features, etc., below */}

      {/* Director's Message Section */}
      <section>
        <DirectorsMessage />
      </section>

      <section>
        <ImageSlider />
      </section>
      {/*VisionMission section*/}
      <section>
        <VisionMission />
      </section>

      {/* Footer section */}
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default HomePage;
