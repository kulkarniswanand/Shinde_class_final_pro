const express = require('express');
const cors = require('cors');
const authRoutes = require('./login/routes/authRoutes');
const branchRoute = require('./BRANCH_MANAGEMENT/routes/authRoutes');
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Use auth routes
app.use('/api/auth', authRoutes);
app.use('/api/branch', branchRoute);



// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
