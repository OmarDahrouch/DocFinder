const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  appointment_number: { type: String, required: true },
  doctor_id: { type: String, required: true },
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  appointment_date: { type: Date, required: true },
  appointment_time: { type: String, required: true },
  status: { type: String, required: true }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
