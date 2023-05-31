const mongoose = require("mongoose");
const validator = require("validator");

const doctorSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  adress: { type: String, required: true },
  phone_number: { type: String, required: true },
  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: "Invalid email address",
      unique: true,
    },
  },
  password: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  specialization: { type: String, required: true },
  description: { type: String, required: true },
  profile_picture: { type: String, required: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Doctor", doctorSchema);
