const express = require("express");
const mongoose = require("mongoose");
const Doctor = mongoose.model("Doctor");
const bcrypt = require("bcrypt");

//---------create a new doctor

async function createDoctor(req, res) {
  const {
    first_name,
    last_name,
    location,
    phone_number,
    email,
    password,
    specialization,
    profile_picture,
  } = req.body;

  console.log(req.body);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newDoctor = new Doctor({
      first_name,
      last_name,
      location,
      phone_number,
      email,
      password: hashedPassword,
      specialization,
      profile_picture,
    });
    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    res.status(500).json({ error: "Failed to create Doctor account" });
  }
}

//-------get all doctors

function getDoctors(req, res) {
  Doctor.find()
    .then((doctors) => {
      res.json(doctors);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error");
    });
}

//get doctor by id
async function getaDoctor(req, res) {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Doctor" });
  }
}
// get doctor by name

async function getDoctorBy(req, res) {
  const searchTerm = req.query.q; // Get the search term from the query parameters

  try {
    const searchResults = await Doctor.find({
      $or: [
        { first_name: { $regex: searchTerm, $options: "i" } },
        { last_name: { $regex: searchTerm, $options: "i" } },
        { location: { $regex: searchTerm, $options: "i" } },
      ],
    });

    res.json(searchResults);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
}

//-------update a doctor

function updateDoctor(req, res) {
  const { id } = req.params;
  const {
    first_name,
    last_name,
    location,
    phone_number,
    email,
    password,
    specialization,
    profile_picture,
  } = req.body;

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error");
    }

    Doctor.findByIdAndUpdate(
      id,
      {
        first_name,
        last_name,
        location,
        phone_number,
        email,
        password: hashedPassword,
        specialization,
        profile_picture,
      },
      { new: true }
    )
      .then((updatedDoctor) => {
        if (!updatedDoctor) {
          return res.status(404).send("Doctor not found");
        }
        res.json(updatedDoctor);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error");
      });
  });
}

//----delete a doctor

function deleteDoctor(req, res) {
  const { id } = req.params;

  Doctor.findByIdAndDelete(id)
    .then((deletedDoctor) => {
      if (!deletedDoctor) {
        return res.status(404).send("Doctor not found");
      }
      res.send("Doctor deleted successfully");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error");
    });
}

//----sign in a doctor

async function signinDoctor(req, res) {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    // Check if the patient exists
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, doctor.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
}

module.exports = {
  createDoctor,
  getDoctors,
  getDoctorBy,
  getaDoctor,
  updateDoctor,
  deleteDoctor,
  signinDoctor,
};
