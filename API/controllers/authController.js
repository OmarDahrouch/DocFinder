const express = require("express");
const mongoose = require("mongoose");
const Patient = mongoose.model("Patient");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
c;

// Generate a JWT token
function generateToken(patientId) {
  const token = jwt.sign({ id: patientId }, config.jwtSecret, {
    expiresIn: config.jwtExpiration,
  });
  return token;
}
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
    res.send("Success");
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
  const { first_name, last_name, email, password, phone_number, address } =
    req.body;

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error");
    }

    const updatedPatient = {
      first_name,
      last_name,
      email,
      password: hashedPassword,
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

async function signinPatient(req, res) {
  const { email, password } = req.body;

  try {
    const patient = await Patient.findOne({ email });

    if (!patient) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, patient.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(patient._id);
    res.json({ message: "Success", token }); // Include the token in the response
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
}

// Middleware to verify JWT token and attach patient object to request

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  jwt.verify(token, config.jwtSecret, (err, decodedToken) => {
    if (err) {
      console.error(err);
      return res.status(401).json({ message: "Invalid token" });
    }

    const patientId = decodedToken.id;

    // Fetch the patient object and attach it to the request
    Patient.findById(patientId)
      .then((patient) => {
        if (!patient) {
          return res.status(404).json({ message: "Patient not found" });
        }

        req.patient = patient;
        next();
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error");
      });
  });
}

module.exports = {
  createPatient,
  getPatients,
  updatePatient,
  deletePatient,
  signinPatient,
  verifyToken,
};
