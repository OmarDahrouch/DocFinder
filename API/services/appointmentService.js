const Doctor = require("../models/doctors");
const Appointment = require("../models/appointments");

// Service function to check appointment availability
async function checkAppointmentAvailability(doctorId, date, time) {
  // Check if the doctor exists
  const doctor = await Doctor.findById(doctorId);
  if (!doctor) {
    throw new Error("Doctor not found");
  }

  // Check if an appointment already exists for the specified date and time
  const existingAppointment = await Appointment.findOne({
    doctor: doctorId,
    date,
    time,
  });

  if (existingAppointment) {
    throw new Error("Appointment not available");
  }

  // If no existing appointment found, the slot is available
  return true;
}

module.exports = {
  checkAppointmentAvailability,
};
