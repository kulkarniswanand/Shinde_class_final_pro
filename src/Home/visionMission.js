import React from 'react';

const VisionMission = () => {
    return (
        <section className="bg-white py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Vision & Mission</h2>
                    <p className="text-gray-600">
                        We are committed to delivering the best educational services to our students and ensuring
                        that they excel in all areas of life.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Vision Section */}
                    <div className="bg-slate-300 p-6 rounded-lg shadow-lg">
                        <h3 className="text-3xl font-bold text-gray-800 mb-4 text-center hover:underline underline-offset-8">Our Vision</h3>
                        <ul className='list-disc text-lg text-justify ml-4'>
                            <li className='pt-5'>To be a center of academic excellence that consistently produces top-performing students.</li>
                            <li className='pt-5'>To integrate technology and innovation in education for enhanced learning experiences.</li>
                            <li className='pt-5'>To foster an environment that encourages personal growth, leadership, and critical thinking.</li>
                            <li className='pt-5'>To empower students with the skills and knowledge needed to succeed in an ever-changing global environment.</li>
                        </ul>
                    </div>

                    {/* Mission Section */}
                    <div className="bg-slate-300 p-6 rounded-lg shadow-lg">
                        <h3 className="text-3xl font-bold text-gray-800 mb-4 text-center hover:underline underline-offset-8">Our Mission</h3>
                        <ul className='list-disc text-lg text-justify ml-4'>
                            <li className='pt-5'>To deliver high-quality education through innovative teaching practices and personalized learning approaches.</li>
                            <li className='pt-5'>To continuously upgrade the educational process with modern tools like TeachTrack, ensuring transparency and seamless communication.</li>
                            <li className='pt-5'>To nurture students’ holistic development by promoting discipline, integrity, and social responsibility.</li>
                            <li className='pt-5'>To maintain a strong connection between students, parents, and teachers for a collaborative learning experience.</li>
                        </ul>
                    </div>
                    </div>
            </div>
        </section>
    );
};

export default VisionMission;
