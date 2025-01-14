import React from "react";
import StudentRegistrationForm from "../../components/student_registration/studentRegistration";

const StudentRegistrationPage = () => {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold my-4 text-white">
        Student Registration Page
      </h1>
      <StudentRegistrationForm />
    </div>
  );
};

export default StudentRegistrationPage;
