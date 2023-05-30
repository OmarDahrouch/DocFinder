const mongoose = require("mongoose");
const Doctor = mongoose.model("Doctor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//---------create a new Doctor

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

    const token = jwt.sign({ doctorId: savedDoctor._id }, "secretkey");

    res.status(201).json({ message: "Success", token });
  } catch (error) {
    res.status(500).json({ error: "Failed to create Doctor account" });
  }
}

function getDoctors(req, res) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    Doctor.find()
      .then((doctors) => {
        res.json(doctors);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error");
      });
  });
}

async function getaDoctor(req, res) {
  const doctorId = req.params.id;

  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    Doctor.findById(doctorId)
      .then((doctor) => {
        if (!doctor) {
          return res.status(404).json({ error: "Doctor not found" });
        }
        res.json(doctor);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch Doctor" });
      });
  });
}

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

// Get a doctor's account
async function getDoctorAccount(req, res) {
  try {
    // Verify the token
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedToken = jwt.verify(token, "secretkey");
    const doctorId = decodedToken.doctorId;

    // Retrieve the doctor information
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Return the doctor information
    res.json({ doctor });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
}

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

  if (!id) {
    return res.status(400).send("Missing ID parameter");
  }

  const updatedDoctor = {
    first_name,
    last_name,
    location,
    phone_number,
    email,
    password,
    specialization,
    profile_picture,
  };

  Doctor.findByIdAndUpdate(id, updatedDoctor, { new: true })
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
}

function deleteDoctor(req, res) {
  const doctorId = req.params.id;

  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    Doctor.findByIdAndDelete(doctorId)
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
  });
}

async function signinDoctor(req, res) {
  const { email, password } = req.body;

  try {
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, doctor.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ doctorId: doctor._id }, "secretkey");

    res.json({ message: "Success", token });
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

    req.doctorId = decoded.doctorId;
    next();
  });
}

module.exports = {
  createDoctor,
  getDoctors,
  getaDoctor,
  getDoctorBy,
  getDoctorAccount,
  updateDoctor,
  deleteDoctor,
  signinDoctor,
  verifyToken,
};
