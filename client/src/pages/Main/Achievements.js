import React from 'react';
import Footer from "../../components/Home/Footer";

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
  return (
    
    <div className="bg-blue-50 py-0">
        {/* <section>
            <Navbar />
        </section> */}
      <div className="max-w-7xl mx-auto px-6 text-center py-10">
        <h2 className="text-4xl font-bold text-black mb-6">Our Achievements</h2>
        <p className="text-lg text-blue-950 mb-12">
          Empowering 9th and 10th standard students to excel in academics and beyond.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievementsData.map((achievement) => (
            <div
              key={achievement.id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transform hover:-translate-y-1 transition-all"
            >
              <div className="text-5xl mb-4 text-blue-500">{achievement.icon}</div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">{achievement.title}</h3>
              <p className="text-blue-600">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
        {/* Footer Section */}
        <section className="mt-16">
        <Footer />
      </section>
    </div>
    
  );
};

export default OurAchievements;
