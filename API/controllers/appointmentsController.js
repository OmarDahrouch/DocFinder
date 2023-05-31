const express = require("express");
const mongoose = require("mongoose");
const Appointment = mongoose.model("Appointment");
const {
  getTimeSlots,
  checkAppointmentAvailability,
  getExistingAppointments,
} = require("../services/appointmentService");

//---------create a new appointment
async function bookAppointment(req, res) {
  const { doctor_id, patient_id, appointment_date, appointment_time, status } =
    req.body;
  try {
    const newAppointment = new Appointment({
      doctor_id,
      patient_id,
      appointment_date,
      appointment_time,
      status,
    });

    const savedAppointment = await newAppointment.save();
    return res.status(200).json(savedAppointment);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create appointment" });
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

async function getAppointmentsByIdPas(req, res) {
  const patientId = req.query.idPatient;
  console.log(patientId);
  try {
    const appointments = await Appointment.find({ patient_id: patientId });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
}

// available time

async function getAvailableTimeSlots(req, res) {
  const doctorId = req.query.idDoctor;
  const currentDay = req.query.day;
  console.log(currentDay);
  const timeSlots = await getTimeSlots(currentDay);
  const reservedTimeSlots = await getExistingAppointments(doctorId, currentDay);

  let availableTimeSlots = [];
  for (let slot of timeSlots) {
    if (!reservedTimeSlots.includes(slot)) {
      availableTimeSlots.push(slot);
    }
  }
  res.json(availableTimeSlots);
  console.log(reservedTimeSlots);
  console.log(availableTimeSlots);
}

module.exports = {
  bookAppointment,
  getAppointments,
  getanAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByIdPas,
  getAvailableTimeSlots,
};
