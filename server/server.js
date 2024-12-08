const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes"); // Ensure this path is correct

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Use authRoutes for authentication endpoints
app.use("/api/auth", authRoutes); // Prefix routes with /api/auth

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
