const express = require("express");
const { registerStudent } = require("../controllers/studentController");

const router = express.Router();

router.post("/", registerStudent);

module.exports = router;