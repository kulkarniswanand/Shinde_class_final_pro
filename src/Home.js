import React from 'react';
import ImageSlider from './Home/ImageSlider';
import DirectorsMessage from './Home/DirectorsMessage'; 
import VisionMission from './Home/visionMission';
const HomePage = () => {
    return (
        <div>
            {/* Header or Navbar */}
            <header>
                {/* Your Navbar Component */}
            </header>

            {/* Image Slider */}
           

            {/* Add additional sections like about, features, etc., below */}
          
                   {/* Director's Message Section */}
                   <section>
                        <DirectorsMessage />

                   </section>
            {/*VisionMission section*/}
                <section>
                    <VisionMission/>
                </section>
          
        </div>
        
    );
};

export default HomePage;
