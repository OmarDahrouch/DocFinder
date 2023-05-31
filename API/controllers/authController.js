const express = require("express");
const mongoose = require("mongoose");
const Patient = mongoose.model("Patient");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//---------create a new Patient

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

// Get a patient logged in
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

    // Return the patient information
    res.json({ patient });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
}

// Get all patients or signed in patient

function getPatients(req, res) {
  // Check if the patient object is attached to the request
  if (req.patient) {
    // Return the information of the currently signed-in patient
    const { patient } = req;
    res.json({ patient });
  } else {
    // Continue with the existing logic to fetch all patients
    Patient.find()
      .then((patients) => {
        res.json(patients);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error");
      });
  }
}

//-------update a Patient

function updatePatient(req, res) {
  const { id } = req.params;
  const { first_name, last_name, email, phone_number, address } = req.body;

  if (!id) {
    return res.status(400).send("Missing ID parameter");
  }

  const updatedPatient = {
    first_name,
    last_name,
    email,
    phone_number,
    address,
  };

  Patient.findByIdAndUpdate(id, updatedPatient, { new: true })
    .then((updatedPatient) => {
      if (!updatedPatient) {
        return res.status(404).send("Patient not found");
      }
      res.json(updatedPatient);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error");
    });
}

//----delete a Patient

function deletePatient(req, res) {
  const { id } = req.params;

  Patient.findByIdAndDelete(id)
    .then((deletedPatient) => {
      if (!deletedPatient) {
        return res.status(404).send("Patient not found");
      }
      res.send("Patient deleted successfully");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error");
    });
}

// Sign in patient
async function signinPatient(req, res) {
  const { email, password } = req.body;

  try {
    // Check if the patient exists
    const patient = await Patient.findOne({ email });

    if (!patient) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, patient.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a token
    const token = jwt.sign({ patientId: patient._id }, "secretkey");

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
}

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.patientId = decoded.patientId;
    next();
  });
}

module.exports = {
  createPatient,
  getPatients,
  updatePatient,
  deletePatient,
  signinPatient,
  getPatientAccount,
  verifyToken,
};
