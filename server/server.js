const express = require('express');
const cors = require('cors');
const db = require('./config/dbConfig'); // Ensure this is imported to initialize DB
const authRoutes = require('./login/routes/authRoutes');
const branchRoute = require('./BRANCH_MANAGEMENT/addBranch/routes/authRoutes');
const updateBranchRoutes = require("./BRANCH_MANAGEMENT/updateBranch/routes/updateBranchRoutes");
const studentRoutes = require("./STUDENT/registration/routes/studentRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Use auth routes
app.use('/api/auth', authRoutes);
app.use('/api/branch', branchRoute);
app.use("/api/updatebranch", updateBranchRoutes);
app.use("/api/students", studentRoutes); 

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
