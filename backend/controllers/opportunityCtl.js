const asyncHandler = require("express-async-handler");
const Opportunity = require("../model/opportunities");
const generateToken = require("../config/generateToken");

const createOpportunity = asyncHandler(async (req, res) => {
  const { appNumber, title, companyName, description, url } = req.body;
  if (!appNumber || !title || !companyName || !description || !url) {
    res.status(400);
    throw new Error("Please enter all the fields!..");
  }

  const opportunityExists = await Opportunity.findOne({ appNumber });
  if (opportunityExists) {
    res.status(400);
    throw new Error(
      "opportunity already Exists or the opportunity Number entered may be wrong please check both cases!.."
    );
  }

  try {
    const opportunity = await Opportunity.create({
      appNumber,
      title,
      companyName,
      description,
      url,
    });
    res.status(201).json({
      _id: opportunity._id,
      appNumber: opportunity.appNumber,
      title: opportunity.title,
      companyName: opportunity.companyName,
      description: opportunity.description,
      url: opportunity.url,
      token: generateToken(opportunity._id),
    });
  } catch (error) {
    res.status(400);
    throw new Error("Failed to create opportunity -> " + error.message);
  }
});

// Controller method to retrieve all applications
const getAllOpportunities = asyncHandler(async (req, res) => {
  try {
    const opportunities = await Opportunity.find();
    res.status(200).json(opportunities);
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve opportunitys" });
  }
});

// ----------
const filterOpportunities = asyncHandler(async (req, res) => {
  const { appNumber, title, companyName } = req.query;
  const filter = {};
  if (appNumber) {
    filter.appNumber = appNumber;
  }
  if (title) {
    filter.title = { $regex: new RegExp(title, "i") };
  }
  if (companyName) {
    filter.companyName = { $regex: new RegExp(companyName, "i") };
  }

  try {
    const opportunities = await Opportunity.find().find(filter);
    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ message: "Failed to filter Opportunities." });
  }
});

module.exports = {
  createOpportunity,
  getAllOpportunities,
  filterOpportunities,
};
