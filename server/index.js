const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  // Example: Send a notification
  setInterval(() => {
    socket.emit("notification", { message: "New update available!" });
  }, 10000);

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.get('/api/staff', async (req, res) => {
  try {
    const staff = await getStaffFromDatabase(); // Replace with actual database call
    console.log("Sending staff data:", staff); // Add logging
    res.json(staff);
  } catch (error) {
    console.error("Error fetching staff data:", error);
    res.status(500).json({ message: "Error fetching staff data" });
  }
});

app.get('/api/staff/branch/:branch', async (req, res) => {
  try {
    const branch = req.params.branch;
    const staff = await getStaffByBranchFromDatabase(branch); // Replace with actual database call
    console.log("Sending staff data by branch:", staff); // Add logging
    res.json(staff);
  } catch (error) {
    console.error("Error fetching staff data by branch:", error);
    res.status(500).json({ message: "Error fetching staff data by branch" });
  }
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
