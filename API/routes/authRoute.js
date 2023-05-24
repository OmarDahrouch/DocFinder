const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const {
  createPatient,
  getPatients,
  updatePatient,
  deletePatient,
  signinPatient,
  verifyToken,
} = require("../controllers/authController");

// Route to post a new patient
router.post("/patients/signup", createPatient);

// Route to get all patients
router.get("/patients", verifyToken, getPatients);

// Route to update a patient
router.put("/patients/:id", updatePatient);

// Route to delete a patient
router.delete("/patients/:id", deletePatient);

// Route to sign in a patient
router.post("/patients/signin", signinPatient);

module.exports = router;
