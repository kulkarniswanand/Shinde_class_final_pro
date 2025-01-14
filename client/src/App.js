// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

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
import SuperAdminDashboard from './pages/super_admin/SuperAdminDashboard';
import ManageBranches from './pages/super_admin/ManageBranches';
import UpdateBranch from './components/Super_Admin/ManageBranches/UpdateBranch';
import AddBranch from './components/Super_Admin/ManageBranches/AddBranch';
import NavbarMB from './components/Super_Admin/ManageBranches/NavbarMB';
import DeleteBranch from './components/Super_Admin/ManageBranches/DeleteBranch';
import StudentRegistrationForm from "./components/student_registration/studentRegistration";
import FeeManagement from './components/FeeManagement/FeeManagement';


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
  const pathsWithoutNavbar = ['/login', '/admin-dashboard', '/superadmindashboard', '/managebranches','/studentregistrationform','/feemanagement'];

  return (
    <div className="App">
      {/* Render Navbar conditionally */}
      {!pathsWithoutNavbar.includes(location.pathname.toLowerCase()) && <Navbar />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/superadmindashboard" element={<SuperAdminDashboard />} />
        <Route path="/ManageBranches" element={< ManageBranches/>} />
        <Route path="/UpdateBranch" element={< UpdateBranch/>} />
        <Route path="/AddBranch" element={< AddBranch/>} />
        <Route path="/NavbarMB" element={< NavbarMB/>} />
        <Route path="/DeleteBranch" element={< DeleteBranch/>} />
        <Route path="/StudentRegistrationForm" element={<StudentRegistrationForm />} />
        <Route path="/FeeManagement" element={<FeeManagement />} />





        {/* <Route path="/student-registration" element={<StudentRegistration />} /> */}
      </Routes>
    </div>
  );
}

export default App;
