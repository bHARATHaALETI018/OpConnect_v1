const mongoose = require("mongoose");

const Feedbacks = mongoose.Schema(
  {
    userId: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model("Feedback", Feedbacks);

module.exports = Feedback;
