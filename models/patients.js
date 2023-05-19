const express = require("express");
const mongoose = require("mongoose");
const validator = require("validator");

const patientSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: "Invalid email address",
      unique: true,
    },
  },
  password: { type: String, required: true },
  phone_number: { type: String, required: true },
  address: { type: String, required: true },
});

module.exports = mongoose.model("Patient", patientSchema);
