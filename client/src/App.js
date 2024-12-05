// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import Home from './pages/Main/Home';
import About from './pages/Main/About';
import Features from './pages/Main/Features';
import Achievements from './pages/Main/Achievements';
import Gallery from './pages/Main/Gallery';
import Contact from './pages/Main/Contact';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoginForm from "./pages/Login/LoginForm";
import AdminDashboard from './pages/Admin_Dashboard/AdminDashboard';
import Navbar from './pages/Main/Navbar';
// import StudentRegistration from './pages/StudentRegistration';

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const location = useLocation();

  // Define paths where the Navbar should not be displayed
  const pathsWithoutNavbar = ['/login', '/admin-dashboard'];

  return (
    <div className="App">
      {/* Render Navbar conditionally */}
      {!pathsWithoutNavbar.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        {/* <Route path="/student-registration" element={<StudentRegistration />} /> */}
      </Routes>
    </div>
  );
}

export default App;
