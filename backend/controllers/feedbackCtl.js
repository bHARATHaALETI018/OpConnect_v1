const asyncHandler = require("express-async-handler");

const Feedback = require("../model/feedback");

const FeedbackEntry = asyncHandler(async (req, res) => {
  const { userId, description } = req.body;
  console.log(req.body);
  if (!userId || !description) {
    res.status(400);
    throw new Error("Please enter all the fields!.....");
  }

  try {
    const feedback = await Feedback.create({
      userId,
      description,
    });

    res.status(201).json(feedback);
  } catch (error) {
    res.status(400);
    throw new Error(
      "Failed to create the feedback!..................." + error
    );
  }
});

const getAllFeedbacks = asyncHandler(async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve feedbacks" });
  }
});

module.exports = { FeedbackEntry, getAllFeedbacks };
