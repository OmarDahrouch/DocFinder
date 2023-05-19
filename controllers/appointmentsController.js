const express = require("express");
const mongoose = require("mongoose");
const Appointment = mongoose.model("Appointment");
const bcrypt = require("bcrypt");

//---------create a new appointment
async function createAppointment(req, res) {
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
}

//-------get all appointments
async function getAppointments(req, res) {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
}

//-------get an appointment
async function getanAppointment(req, res) {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointment" });
  }
}

//-------update an appointment
async function updateAppointment(req, res) {
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
}

//----delete an appointment
async function deleteAppointment(req, res) {
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
}

module.exports = {
  createAppointment,
  getAppointments,
  getanAppointment,
  updateAppointment,
  deleteAppointment,
};
