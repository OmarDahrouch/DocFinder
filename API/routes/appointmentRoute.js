const express = require("express");
const router = express.Router();
const {
  bookAppointment,
  getAppointments,
  getanAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByIdPas,
  getAvailableTimeSlots,
} = require("../controllers/appointmentsController");

//POST route to create a new appointment
router.post("/appointments", bookAppointment);

//GET route to fetch all appointments
router.get("/appointments", getAppointments);

// GET route to fetch a specific appointment by ID
router.get("/appointments/byid/:id", getanAppointment);

//UPDATE route to update a specific appointment by ID
router.put("/appointments/:id", updateAppointment);

//DELETE route to delete a specific appointment by ID
router.delete("/appointments/:id", deleteAppointment);

//Get appointments by id patient
router.get("/appointments/patient", getAppointmentsByIdPas);

// Get available time slots
router.get("/appointment/data", getAvailableTimeSlots);

module.exports = router;
