import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Element } from "react-scroll";

import Home from "./pages/Main/Home";
import VisionMission from "./components/Home/VisionMission";
import About from "./pages/Main/About";
import Features from "./pages/Main/Features";
import Achievements from "./pages/Main/Achievements";
import Gallery from "./pages/Main/Gallery";
import Contact from "./pages/Main/Contact";
import Footer from "./components/Home/Footer";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import LoginForm from "./pages/Login/LoginForm";
import AdminDashboard from "./pages/Admin_Dashboard/AdminDashboard";
import Navbar from "./pages/Main/Navbar";
import SuperAdminDashboard from "./pages/super_admin/SuperAdminDashboard";
import ManageBranches from "./pages/super_admin/ManageBranches";
import UpdateBranch from "./components/Super_Admin/ManageBranches/UpdateBranch";
import AddBranch from "./components/Super_Admin/ManageBranches/AddBranch";
import NavbarMB from "./components/Super_Admin/ManageBranches/NavbarMB";
import DeleteBranch from "./components/Super_Admin/ManageBranches/DeleteBranch";
import StudentRegistrationForm from "./components/student_registration/studentRegistration";
import FeeManagement from "./components/FeeManagement/FeeManagement";
import FeeStructure from "./components/FeeStructure/feeStructure";
import ExamsScedule from "./components/Exam/ExamManagement";
import StudentDashboard from "./pages/Student_Dashboard/StudentDashboard";
import StudentDetails from "./components/StudentDetails/studentDetails";
import StaffManagement from "./components/StaffManagement/staffManagement";
import StaffRegistrationForm from "./components/StaffManagement/staffRegistration";
import ClassManagement from "./components/Class_Management/ClassManagement";
// import attendance from "./components/Attendance/AttendanceDashboard";
import AttendanceDashboard from "./components/Attendance/AttendanceDashboard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Admissions from "./pages/Admissions";
import Careers from "./pages/Careers";
import Results from "./components/Exam/Result";
import ExamStudent from "./components/Exam/ExamStudent";
import StudentExamLoginForm from "./components/Exam/StudentExamLoginForm";

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
  const pathsWithoutNavbar = [
    '/login',
    '/admin-dashboard',
    '/superadmindashboard',
    '/managebranches',
    '/studentregistrationform',
    '/feemanagement',
    '/feestructure',
    '/student-details',
    '/staff-management',
    '/staffregistrationform',
    '/studentdashboard',
    '/attendancedashboard',
    '/classmanagement',
    '/examsscedule',
    '/privacy-policy',
    '/terms-of-service',
    '/admissions',
    '/careers',
    '/results',
    '/examstudent',
    '/examstudentlogin'
  ];

  return (
    <div className="App">
      {!pathsWithoutNavbar.includes(location.pathname.toLowerCase()) && (
        <Navbar />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Element name="home">
                <Home />
              </Element>

              <Element name="about">
                <About />
              </Element>
              <Element name="features">
                <Features />
              </Element>
              <Element name="achievements">
                <Achievements />
              </Element>
              <Element name="contact">
                <Contact />
              </Element>
              <Element name="gallery">
                <Gallery />
              </Element>
              <Element name="footer">
                <Footer />
              </Element>
            </>
          }
        />
        //swanand
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/superadmindashboard" element={<SuperAdminDashboard />} />
        <Route path="/ManageBranches" element={<ManageBranches />} />
        <Route path="/UpdateBranch" element={<UpdateBranch />} />
        <Route path="/AddBranch" element={<AddBranch />} />
        <Route path="/NavbarMB" element={<NavbarMB />} />
        <Route path="/DeleteBranch" element={<DeleteBranch />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          path="/StudentRegistrationForm"
          element={<StudentRegistrationForm />}
        />
        <Route path="/FeeManagement" element={<FeeManagement />} />
        <Route path="/FeeStructure" element={<FeeStructure />} />
        <Route path="/ExamsScedule" element={<ExamsScedule />} />
        <Route path="/StudentDashboard" element={<StudentDashboard />} />
        <Route path="/student-details" element={<StudentDetails />} />
        <Route path="/staff-management" element={<StaffManagement />} />
        <Route path="/classmanagement" element={<ClassManagement />} />
        <Route path="/AttendanceDashboard" element={<AttendanceDashboard />} />
        <Route
          path="/staffRegistrationForm"
          element={<StaffRegistrationForm />}
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/results" element={<Results />} />
        <Route path="/examstudent" element={<ExamStudent />} />
        <Route path="/examstudentlogin" element={<StudentExamLoginForm />} />
        
        {/* <Route path="/student-registration" element={<StudentRegistration />} /> */}
      </Routes>
    </div>
  );    
}

export default App;