const express = require("express");
const mongoose = require("mongoose");
const Patient = mongoose.model("Patient");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create a new Patient
async function createPatient(req, res) {
  const { first_name, last_name, email, password, phone_number, address } =
    req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const patient = new Patient({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      phone_number,
      address,
    });

    await patient.save();

    // Generate a token
    const token = jwt.sign({ patientId: patient._id }, "secretkey");

    res.json({ message: "Success", token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
}

// Get a patient account
async function getPatientAccount(req, res) {
  try {
    // Verify the token
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedToken = jwt.verify(token, "secretkey");
    const patientId = decodedToken.patientId;

    // Retrieve the patient information
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Render the PatientAccount screen and pass the patient information
    res.json({ patient });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
}

// Get all patients
function getPatients(req, res) {
  Patient.find()
    .then((patients) => {
      res.json(patients);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error");
    });
}

// Update a patient
async function updatePatient(req, res) {
  const { id } = req.params;
  const { first_name, last_name, email, password, phone_number, address } =
    req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedPatient = {
      first_name,
      last_name,
      email,
      password: hashedPassword,
      phone_number,
      address,
    };

    const patient = await Patient.findByIdAndUpdate(id, updatedPatient, {
      new: true,
    });

    if (!patient) {
      return res.status(404).send("Patient not found");
    }

    res.json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
}

// Delete a patient
function deletePatient(req, res) {
  const { id } = req.params;

  Patient.findByIdAndDelete(id)
    .then((deletedPatient) => {
      if (!deletedPatient) {
        return res.status(404).send("Patient not found");
      }
      res.json(deletedPatient);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error");
    });
}

module.exports = {
  createPatient,
  getPatientAccount,
  getPatients,
  updatePatient,
  deletePatient,
};
