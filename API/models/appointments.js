const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  appointment_date: { type: Date, required: true },
  appointment_time: { type: String, required: true },
  status: { type: String, required: true, default: "non-confirmer" },
});

appointmentSchema.pre("find", function (next) {
  this.populate("doctor_id");
  next();
});

module.exports = mongoose.model("Appointment", appointmentSchema);
