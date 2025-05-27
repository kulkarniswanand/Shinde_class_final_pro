const express = require("express");
const cors = require("cors");
const db = require("./config/dbConfig");
const deleteBranchRoute = require("./BRANCH_MANAGEMENT/deleteBranch/routes/deleteBranchRoutes"); 
const authRoutes = require("./login/routes/authRoutes");
const branchRoute = require("./BRANCH_MANAGEMENT/addBranch/routes/authRoutes");
const updateBranchRoutes = require("./BRANCH_MANAGEMENT/updateBranch/routes/updateBranchRoutes");
const studentRoutes = require("./STUDENT/registration/routes/studentRoutes");
const feesStructure=require("./Fees_Management/FeesStructure/Routes/FeesStructureRoutes")
const feesManagement=require("./Fees_Management/FeesManagement/Routes/FeesManagementRoutes")
const studentsDetails = require("./StudentDetails/Routes/studentsRoutes"); 
const staffRoutes = require("./StaffManagement/Routes/staffRoutes");
const superAdminRoutes = require("./superadmin/routes/DashboardRoutes");
const classRoutes = require("./Class_Management/Routes/ClassmanagementRoutes");
const attendanceRoutes = require("./StudentAttendance/Routes/studentAttendanceRoutes");
const examRoutes = require("./ExamManagement/Routes/examRoutes");
const studentDashboardRoutes = require("./Student_Dashboard/Routes/studentDashboardRoutes");
const studentExamLoginRoutes = require("./StudentExamLoginForm/Routes/studentExamLoginRoutes")

const app = express(); 
const PORT = process.env.PORT || 5000; 
 
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes); 
app.use("/api/branch", branchRoute); 
app.use("/api/updatebranch", updateBranchRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/deletebranch", deleteBranchRoute);
app.use("/api/feesStructure",feesStructure);
app.use("/api/feesManagement",feesManagement);
app.use("/api/studentsDetails", studentsDetails);
// app.use("/api/students", studentsRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api", superAdminRoutes);
app.use("/api", classRoutes);
// app.use("/api/attendance", attendanceRoutes);
app.use("/api/studentAttendance", attendanceRoutes); // Ensure this matches the expected route
app.use("/api/exams", examRoutes); // Use exam routes
app.use('/api/student-dashboard', studentDashboardRoutes);
app.use('/api/student-exam-login', studentExamLoginRoutes);


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
