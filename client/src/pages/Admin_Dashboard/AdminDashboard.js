import React from 'react';
import { useNavigate } from 'react-router-dom';

const dashboardOptions = [
  { id: 1, name: 'Student Registration', image: '/images/Dashboard/student_registration.jpeg', route: '/student-registration' },
  { id: 2, name: 'Fees Management', image: '/images/fees_management.png', route: '/fees-management' },
  { id: 3, name: 'Student Details', image: '/images/student_details.png', route: '/student-details' },
  { id: 4, name: 'Attendance', image: '/images/attendance.png', route: '/attendance' },
  { id: 5, name: 'Exam Schedule', image: '/images/exam_schedule.png', route: '/exam-schedule' },
  { id: 6, name: 'Staff Management', image: '/images/staff_management.png', route: '/staff-management' },
  { id: 7, name: 'Certificates', image: '/images/certificates.png', route: '/certificates' },
  { id: 8, name: 'Exam Marks', image: '/images/exam_marks.png', route: '/exam-marks' },
  { id: 9, name: 'Results', image: '/images/results.png', route: '/results' },
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-center text-3xl font-bold text-blue-800 mb-8">Admin Dashboard</h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {dashboardOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => navigate(option.route)}
            className="flex flex-col items-center justify-center bg-white shadow-lg rounded-full w-40 h-40 mx-auto hover:shadow-xl hover:bg-blue-50 transition-all cursor-pointer"
          >
            <img
              src={option.image}
              alt={option.name}
              className="w-16 h-16 object-contain mb-3"
            />
            <p className="text-center text-sm font-medium text-gray-800">{option.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
