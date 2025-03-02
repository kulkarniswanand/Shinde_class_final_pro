// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Element } from 'react-scroll';

import Home from './pages/Main/Home';
import DirectorMessage from './components/Home/DirectorMessage';
import VisionMission from './components/Home/VisionMission';
import ImageSlider from './components/Home/ImageSlider';


import About from './pages/Main/About';
import Features from './pages/Main/Features';
import Achievements from './pages/Main/Achievements';

import Gallery from './pages/Main/Gallery';
import Contact from './pages/Main/Contact';
import Footer from './components/Home/Footer';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import LoginForm from "./pages/Login/LoginForm";
import AdminDashboard from './pages/Admin_Dashboard/AdminDashboard';
import Navbar from './pages/Main/Navbar';
import SuperAdminDashboard from './pages/super_admin/SuperAdminDashboard';
import ManageBranches from './pages/super_admin/ManageBranches';
import UpdateBranch from './components/Super_Admin/ManageBranches/UpdateBranch';
import AddBranch from './components/Super_Admin/ManageBranches/AddBranch';
import NavbarMB from './components/Super_Admin/ManageBranches/NavbarMB';
import DeleteBranch from './components/Super_Admin/ManageBranches/DeleteBranch';
import StudentRegistrationForm from "./components/student_registration/studentRegistration";
import FeeManagement from './components/FeeManagement/FeeManagement';

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
  const pathsWithoutNavbar = [
    '/login', 
    '/admin-dashboard', 
    '/superadmindashboard', 
    '/managebranches',
    '/studentregistrationform',
    '/feemanagement'
  ];

  return (
    <div className="App">
      {/* Render Navbar conditionally */}
      {!pathsWithoutNavbar.includes(location.pathname.toLowerCase()) && <Navbar />}

      {/* Wrap sections inside <Element> for smooth scrolling */}
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <Element name="home"><Home /></Element>
              <Element name="director-message"><DirectorMessage /></Element>
              <Element name="vision-mission"><VisionMission /></Element>
              <Element name="about"><About /></Element>
              <Element name="features"><Features /></Element>
              <Element name="achievements"><Achievements /></Element>
              <Element name="image-slider"><ImageSlider /></Element>
              <Element name="gallery"><Gallery /></Element>
              <Element name="footer"><Footer /></Element>
            </>
          } 
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/superadmindashboard" element={<SuperAdminDashboard />} />
        <Route path="/ManageBranches" element={<ManageBranches />} />
        <Route path="/UpdateBranch" element={<UpdateBranch />} />
        <Route path="/AddBranch" element={<AddBranch />} />
        <Route path="/NavbarMB" element={<NavbarMB />} />
        <Route path="/DeleteBranch" element={<DeleteBranch />} />
        <Route path="/StudentRegistrationForm" element={<StudentRegistrationForm />} />
        <Route path="/FeeManagement" element={<FeeManagement />} />
      </Routes>
    </div>
  );
}

export default App;
