const mongoose = require("mongoose");

const Opportunitys = mongoose.Schema(
  {
    appNumber: { type: String, required: true },
    title: { type: String, trim: true, required: true },
    companyName: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    url: { type: String, trim: true, required: true },
  },
  {
    timestamps: true,
  }
);

const Opportunity = mongoose.model("Opportunity", Opportunitys);

module.exports = Opportunity;
