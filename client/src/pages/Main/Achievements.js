import React, { useEffect } from 'react';
import Footer from "../../components/Home/Footer";

// Achievements data
const achievementsData = [
  {
    id: 1,
    icon: '🏅',
    title: '100+ Students Scored Above 90%',
    description: 'Guiding students to academic excellence with consistent top scores.',
  },
  {
    id: 2,
    icon: '📘',
    title: 'State-Level Rank Holders',
    description: 'Proud mentors to students achieving ranks at state board level.',
  },
  {
    id: 3,
    icon: '📝',
    title: '95% Success in Scholarship Exams',
    description: 'Helping students excel in prestigious scholarship and talent exams.',
  },
  {
    id: 4,
    icon: '🤝',
    title: 'Personalized Attention',
    description: 'Small batch sizes to ensure every student gets individual guidance.',
  },
  {
    id: 5,
    icon: '🌟',
    title: '10+ Years of Excellence',
    description: 'Building strong foundations for over a decade with proven results.',
  },
  {
    id: 6,
    icon: '🎓',
    title: 'Dedicated and Experienced Faculty',
    description: 'Highly qualified teachers specializing in 9th and 10th curricula.',
  },
];

const OurAchievements = () => {
  // Handle scroll-triggered animations
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".achievement-card");
      elements.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("animate__fadeInUp");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 py-16">
      <div className="max-w-7xl mx-auto px-6 text-center py-10">
        <h2 className="text-5xl font-extrabold text-white mb-6 animate__animated animate__fadeInUp">
          Our Achievements
        </h2>
        <p className="text-lg text-blue-50 mb-12 animate__animated animate__fadeInUp">
          Empowering 9th and 10th standard students to excel in academics and beyond.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {achievementsData.map((achievement) => (
            <div
              key={achievement.id}
              className="achievement-card p-8 bg-white shadow-xl rounded-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-300 relative group"
            >
              <div
                className="text-6xl mb-4 text-blue-500 group-hover:text-purple-500 transition-all duration-300"
                aria-label={achievement.title}
              >
                {achievement.icon}
              </div>
              <h3 className="text-2xl font-semibold text-blue-800 mb-3 transition-all group-hover:text-indigo-600">
                {achievement.title}
              </h3>
              <p className="text-gray-700">{achievement.description}</p>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      {/* <section className="mt-16">
        <Footer />
      </section> */}
    </div>
  );
};

export default OurAchievements;
