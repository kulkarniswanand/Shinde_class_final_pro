import React, { Suspense, useEffect } from "react";
import Footer from "../../components/Home/Footer";

// Features data
const classFeatures = [
  {
    id: 1,
    title: "Expert Faculty",
    description:
      "Highly qualified and experienced teachers dedicated to student success.",
    icon: "🎓",
  },
  {
    id: 2,
    title: "Comprehensive Study Material",
    description:
      "Well-structured notes and materials to help students excel in their academics.",
    icon: "📚",
  },
  {
    id: 3,
    title: "Regular Assessments",
    description:
      "Weekly tests and progress tracking to ensure consistent learning.",
    icon: "📝",
  },
  {
    id: 4,
    title: "Personalized Attention",
    description:
      "Small batch sizes to provide focused and individualized attention to every student.",
    icon: "👩‍🏫",
  },
  {
    id: 5,
    title: "State-of-the-Art Infrastructure",
    description: "Modern classrooms equipped with advanced teaching aids.",
    icon: "🏫",
  },
  {
    id: 6,
    title: "Career Guidance",
    description:
      "Dedicated counseling and guidance to help students achieve their career goals.",
    icon: "🌟",
  },
];

const Features = () => {
  // Handle scroll-triggered animations
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".feature-card");
      elements.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("animate-fadeIn");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Main Section with Gradient Background */}
      <section className="py-16 bg-gradient-to-r from-blue-500 via-teal-400 to-indigo-600 text-white">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose <span className="text-yellow-300">Shinde Classes?</span>
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {classFeatures.map((feature) => (
              <div
                key={feature.id}
                className="feature-card p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 hover:scale-105 relative"
              >
                <div
                  className="text-5xl mb-4 text-blue-500 transition-all transform hover:scale-110"
                  aria-label={feature.title}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 transition-all transform hover:text-blue-500">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
          {/* CTA Button */}
          <div className="text-center mt-10">
            <a
              href="#"
              className="px-6 py-3 bg-yellow-500 text-white rounded-lg shadow-lg hover:bg-yellow-600 transition-all transform hover:scale-105"
            >
              Start Your Journey Today!
            </a>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="mt-16">
        <Suspense fallback={<div>Loading footer...</div>}>
          <Footer />
        </Suspense>
      </section>
    </>
  );
};

export default Features;
