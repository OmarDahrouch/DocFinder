const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  review_number: { type: String, required: true },
  doctor_id: { type: String, required: true },
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
});

module.exports = mongoose.model("Review", reviewSchema);
