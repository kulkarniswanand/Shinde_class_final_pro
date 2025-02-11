const express = require("express");
const cors = require("cors");
const db = require("./config/dbConfig");

const authRoutes = require("./login/routes/authRoutes");
const branchRoute = require("./BRANCH_MANAGEMENT/addBranch/routes/authRoutes");
const updateBranchRoutes = require("./BRANCH_MANAGEMENT/updateBranch/routes/updateBranchRoutes");
const studentRoutes = require("./STUDENT/registration/routes/studentRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/branch", branchRoute);
app.use("/api/updatebranch", updateBranchRoutes);
app.use("/api/students", studentRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
