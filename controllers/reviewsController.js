const express = require("express");
const mongoose = require("mongoose");
const Review = mongoose.model("Review");

//---------create a new review
async function createReview(req, res) {
  const { review_number, doctor_id, patient_id, rating, comment } = req.body;

  const review = new Review({
    review_number,
    doctor_id,
    patient_id,
    rating,
    comment,
  });

  review
    .save()
    .then(() => {
      res.send("Review created successfully");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error");
    });
}

//-------get all reviews

function getReview(req, res) {
  Review.find()
    .then((reviews) => {
      res.json(reviews);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error");
    });
}

//-------update a review

function updateReview(req, res) {
  const { id } = req.params;
  const { review_number, doctor_id, patient_id, rating, comment } = req.body;

  Review.findByIdAndUpdate(
    id,
    { review_number, doctor_id, patient_id, rating, comment },
    { new: true }
  )
    .then((updatedReview) => {
      if (!updatedReview) {
        return res.status(404).send("Review not found");
      }
      res.json(updatedReview);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error");
    });
}

//----delete a review

function deleteReview(req, res) {
  const { id } = req.params;

  Review.findByIdAndDelete(id)
    .then((deletedReview) => {
      if (!deletedReview) {
        return res.status(404).send("Review not found");
      }
      res.send("Review deleted successfully");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error");
    });
}

module.exports = {
  createReview,
  getReview,
  updateReview,
  deleteReview,
};
