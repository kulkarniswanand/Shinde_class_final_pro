import React from "react";
import Footer from "../../components/Home/Footer";

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
  return (
   <>
            {/* <Navbar /> */}

    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Why Choose Shinde Classes?
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {classFeatures.map((feature) => (
            <div
              key={feature.id}
              className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4 text-primary">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      <section>
        {/* Footer Section */}
        <Footer />
      </section>
    </section>
   </> 

  );
};

export default Features;
