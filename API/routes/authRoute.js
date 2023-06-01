const express = require("express");
const router = express.Router();
const {
  createPatient,
  getPatients,
  updatePatient,
  deletePatient,
  signinPatient,
  getPatientAccount,
  getCurrentPatientID,
} = require("../controllers/authController");

// Route to post a new patient
router.post("/patients/signup", createPatient);

// Route to get all patients
router.get("/patients", getPatients);

// Route to get a logged in patient
router.get("/patient/account", getPatientAccount);

// Route to get a logged in patientID
router.get("/patient/ID", getCurrentPatientID);

// Route to update a patient
router.put("/patients/:id", updatePatient);

// Route to delete a patient
router.delete("/patients/:id", deletePatient);

// Route to sign in a patient
router.post("/patients/signin", signinPatient);

module.exports = router;
