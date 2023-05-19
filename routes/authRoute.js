const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const router = express.Router();
const Patient = mongoose.model("Patient");

/* --------------------------------------------------------SIGNUP PATIENTS-------------------------------------------------------*/

// Route to post a new patient
router.post("/patients", async (req, res) => {
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
});

// Route to get all patients
router.get("/patients", (req, res) => {
  Patient.find()
    .then((patients) => {
      res.json(patients);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error");
    });
});

// Route to update a patient

router.put("/patients/:id", (req, res) => {
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
});

// Route to delete a patient

router.delete("/patients/:id", (req, res) => {
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
});

/* --------------------------------------------------------SIGN IN PATIENTS-------------------------------------------------------*/

// Route to sign in a patient
router.post("/patients/signin", async (req, res) => {
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

    res.json({ message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});

module.exports = router;
