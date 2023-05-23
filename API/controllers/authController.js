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
    res.send("Success");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
}

//-------get all Patients

function getPatient(req, res) {
  Patient.find()
    .then((patients) => {
      res.json(patients);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error");
    });
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

//----sign in a Patient

// async function signinPatient(req, res) {
//   const { email, password } = req.body;

//   try {
//     // Check if the patient exists
//     const patient = await Patient.findOne({ email });

//     if (!patient) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // Compare the provided password with the stored hashed password
//     const passwordMatch = await bcrypt.compare(password, patient.password);

//     if (!passwordMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     res.json({ message: "Success" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error");
//   }
// }

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

    const token = jwt.sign({ id: patient._id }, config.jwtSecret, {
      expiresIn: config.jwtExpiration,
    });

    res.json({ message: "Success", token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
}

module.exports = {
  createPatient,
  getPatient,
  updatePatient,
  deletePatient,
  signinPatient,
};
