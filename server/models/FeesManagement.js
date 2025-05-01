const mongoose = require("mongoose");

const installmentSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: String, required: true },
});

const feesManagementSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  totalFees: { type: Number, required: true },
  amountGiven: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  remainingFees: { type: Number, required: true },
  installments: { type: [installmentSchema], default: [] }, // Ensure installments are stored as an array
});

module.exports = mongoose.model("FeesManagement", feesManagementSchema);
