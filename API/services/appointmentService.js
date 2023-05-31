const Doctor = require("../models/doctors");
const Appointment = require("../models/appointments");

// Service function to check appointment availability
async function checkAppointmentAvailability(doctorId, date, time) {
  console.log("test");
  try {
    const existingAppointment = await Appointment.findOne({
      doctor_id: String(doctorId),
      appointment_date: String(date),
      appointment_time: String(time),
    });

    if (existingAppointment) {
      return false; // Appointment not available
    } else {
      return true; // Appointment is available
    }
  } catch (error) {
    throw new Error("Failed to check appointment availability");
  }
}
//convertir 12 hour format to 24 hour
function convertTo24HourFormat(time) {
  const [timeString, period] = time.split(" ");
  const [hours, minutes] = timeString.split(":");

  let formattedHours = parseInt(hours, 10);

  if (period === "PM" && formattedHours !== 12) {
    formattedHours += 12;
  } else if (period === "AM" && formattedHours === 12) {
    formattedHours = 0;
  }

  return `${formattedHours.toString().padStart(2, "0")}:${minutes}`;
}

async function getExistingAppointments(idDoctor, currentDay) {
  try {
    const existingAppointments = await Appointment.find({
      doctor_id: idDoctor,
      appointment_date: currentDay,
    });

    const reservedTimeSlotsSet = new Set(); // Use a Set to avoid duplicates

    existingAppointments.forEach((appointment) => {
      reservedTimeSlotsSet.add(
        convertTo24HourFormat(appointment.appointment_time)
      );
    });

    const reservedTimeSlots = Array.from(reservedTimeSlotsSet); // Convert the Set to an array
    return reservedTimeSlots;
  } catch (error) {
    throw new Error("Failed to get existing appointments");
  }
}

async function getTimeSlots(currentDay) {
  // Define the start and end time for the day (assumed to be within the same day)
  const startTime = new Date(currentDay);
  startTime.setHours(9, 30, 0);
  const endTime = new Date(currentDay);
  endTime.setHours(16, 0, 0);

  // Generate an array of time slots at 30-minute intervals
  const timeSlots = [];
  let currentTime = new Date(startTime);
  while (currentTime < endTime) {
    timeSlots.push(
      currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour24: true,
      })
    );
    currentTime.setMinutes(currentTime.getMinutes() + 30);
  }

  return timeSlots;
}

module.exports = {
  getTimeSlots,
  checkAppointmentAvailability,
  getExistingAppointments,
};
