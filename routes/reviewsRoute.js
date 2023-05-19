const express = require("express");
const router = express.Router();
const {
  createReview,
  getReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewsController");

//POST route to create a new review
router.post("/reviews", createReview);

//GET route to fetch all appointments
router.get("/reviews", getReview);

//UPDATE route to update a specific appointment by ID
router.put("/reviews/:id", updateReview);

//DELETE route to delete a specific appointment by ID
router.delete("/reviews/:id", deleteReview);

module.exports = router;
