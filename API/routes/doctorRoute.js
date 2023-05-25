const express = require("express");
const router = express.Router();
const {
  createDoctor,
  getDoctors,
  getDoctorBy,
  getaDoctor,
  updateDoctor,
  deleteDoctor,
  signinDoctor,
} = require("../controllers/doctorController");

// Route to create a new doctor
router.post("/doctor", createDoctor);

// Route to get all patients
router.get("/doctors", getDoctors);

//Route to get a doctor by id
router.get("/doctor/:id", getaDoctor);

// Route to get  patient by name or ....
router.get("/doctor", getDoctorBy);

// Route to update a patient
router.put("/doctor/:id", updateDoctor);

// Route to delete a patient
router.delete("/doctor/:id", deleteDoctor);

// Route to sign in a doctor
router.post("/doctor/signin", signinDoctor);

module.exports = router;
