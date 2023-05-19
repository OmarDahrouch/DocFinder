const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Review = mongoose.model("Review");

//---------- POST route to create a new review

router.post("/reviews", (req, res) => {
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
});

// ------------GET route to fetch all appointments

router.get("/reviews", (req, res) => {
  Review.find()
    .then((reviews) => {
      res.json(reviews);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error");
    });
});

//---------------------- UPDATE route to update a specific appointment by ID

router.put("/reviews/:id", (req, res) => {
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
});

//------------------ DELETE route to delete a specific appointment by ID
router.delete("/reviews/:id", (req, res) => {
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
});

module.exports = router;
