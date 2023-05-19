const express = require("express");
const router = express.Router();
const {
  createDoctor,
  getDoctor,
  updateDoctor,
  deleteDoctor,
  signinDoctor,
} = require("../controllers/doctorController");

// Route to create a new doctor
router.post("/doctor", createDoctor);

// Route to get all patients
router.get("/doctors", getDoctor);

// Route to update a patient
router.put("/doctor/:id", updateDoctor);

// Route to delete a patient
router.delete("/doctor/:id", deleteDoctor);

// Route to sign in a doctor
router.post("/doctor/signin", signinDoctor);

module.exports = router;
