import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './CircularNav.css';

// Define the navigation links for the wheel
const navLinks = [
  { path: "/admin-dashboard", label: "Dashboard", icon: "🏠" },
  { path: "/FeeManagement", label: "Fee Mgt", icon: "💰" },
  { path: "/student-details", label: "Students", icon: "🧑‍🎓" },
  { path: "/ExamsScedule", label: "Exams", icon: "📝" },
  { path: "/staff-management", label: "Staff Mgt", icon: "👨‍🏫" },
  { path: "/FeeStructure", label: "Fee Struct", icon: "📊" },
  { path: "/classmanagement", label: "Class Mgt", icon: "🏫" }, 
  { path: "/attendancedashboard", label: "Attendance", icon: "🗓️"}, 
];
 
const CircularNav = () => {
  const location = useLocation();
  const [isWheelOpen, setIsWheelOpen] = useState(false);

  const toggleWheel = () => setIsWheelOpen(!isWheelOpen);

  const numItems = navLinks.length;
  const angleStep = 360 / numItems; // Angle between items
  const radius = 110; // Radius of the wheel in pixels

  return (
    <div className={`circular-nav-container ${isWheelOpen ? 'open' : ''}`}>
      <button 
        onClick={toggleWheel} 
        className="nav-toggle-button" 
        aria-label="Toggle Navigation Menu"
        title="Toggle Navigation"
        style={{ position: 'relative', zIndex: 2 }} // Ensure button is above wheel
      >
        {isWheelOpen ? '✕' : '⚙️'}
      </button>
      <div className="nav-wheel">
        {isWheelOpen && navLinks.map((item, index) => {
          const itemAngleRad = ((index * angleStep) - 90) * (Math.PI / 180);
          const x = radius * Math.cos(itemAngleRad);
          const y = radius * Math.sin(itemAngleRad);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname.toLowerCase() === item.path.toLowerCase() ? 'active' : ''}`}
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
              onClick={() => setIsWheelOpen(false)}
              title={item.label}
            >
              <div className="nav-item-content">
                <div className="nav-item-icon">{item.icon}</div>
                <div className="nav-item-label">{item.label}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CircularNav;
