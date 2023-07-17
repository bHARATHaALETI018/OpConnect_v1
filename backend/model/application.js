const mongoose = require("mongoose");

const applications = mongoose.Schema(
  {
    opportunity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Opportunity",
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    appNumber: { type: String, required: true },
    title: { type: String, trim: true, required: true },
    companyName: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    status: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("Applications", applications);

module.exports = Application;
