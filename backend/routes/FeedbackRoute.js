const express = require("express");
const {
  FeedbackEntry,
  getAllFeedbacks,
} = require("../controllers/feedbackCtl");

const router = express.Router();

router.route("/").post(FeedbackEntry).get(getAllFeedbacks);

module.exports = router;
