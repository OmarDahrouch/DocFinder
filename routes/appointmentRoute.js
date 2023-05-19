const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const router = express.Router();
const Appointment = mongoose.model("Appointment");

//---------- POST route to create a new appointment

router.post("/appointments", async (req, res) => {
  try {
    const {
      appointment_number,
      doctor_id,
      patient_id,
      appointment_date,
      appointment_time,
      status,
    } = req.body;

    const newAppointment = new Appointment({
      appointment_number,
      doctor_id,
      patient_id,
      appointment_date,
      appointment_time,
      status,
    });
    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create appointment" });
  }
});

// ------------GET route to fetch all appointments

router.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

// GET route to fetch a specific appointment by ID

router.get("/appointments/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointment" });
  }
});

//---------------------- UPDATE route to update a specific appointment by ID

router.put("/appointments/:id", async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ error: "Failed to update appointment" });
  }
});

//------------------ DELETE route to delete a specific appointment by ID

router.delete("/appointments/:id", async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(
      req.params.id
    );

    if (!deletedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete appointment" });
  }
});

module.exports = router;
