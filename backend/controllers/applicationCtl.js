const asyncHandler = require("express-async-handler");
const Opportunity = require("../model/opportunities");
const Application = require("../model/application");

const createApplication = asyncHandler(async (req, res) => {
  const { opportunityId } = req.body;
  try {
    const opportunityExists = await Opportunity.findOne({
      _id: opportunityId,
    });
    if (!opportunityExists) {
      return res.status(404).json({ message: "Opportunity not found." });
    }
    const applicationExists = await Application.findOne({
      opportunity: opportunityId,
      student: req.student.id,
    });
    if (applicationExists) {
      return res.status(404).json({ message: "Application already Exists." });
    }
    const application = new Application({
      opportunity: opportunityId,
      student: req.student.id,
      appNumber: opportunityExists.appNumber,
      title: opportunityExists.title,
      companyName: opportunityExists.companyName,
      description: opportunityExists.description,
      status: "Applied",
    });

    await application.save();
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: "Failed to create application." });
  }
});

// ---------------------------------------------

const getApplications = asyncHandler(async (req, res) => {
  try {
    const applications = await Application.find({ student: req.student.id });
    res.status(200).json(applications);
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve applications" });
  }
});

// ---------------------------------------------

const filterApplications = asyncHandler(async (req, res) => {
  const { appNumber, title, companyName, status } = req.query;
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
  if (status) {
    filter.status = status;
  }
  try {
    const applications = await Application.find({ student: req.student.id })
      .find(filter)
      .populate("student", "-password")
      .populate("opportunity");
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Failed to filter applications." });
  }
});

// ---------------------------------------------

const statusChange = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const application = await Application.updateOne(
      { _id: id },
      {
        $set: { status: status },
        $currentDate: { lastModified: true },
      }
    );
    if (!application) {
      return res.status(200).json({ message: "Application not found." });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: "Failed to update application status." });
  }
});

const getAllApplications = asyncHandler(async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("student", "-password")
      .populate("opportunity");
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applications." });
  }
});

const AcceptedStudent = asyncHandler(async (req, res) => {
  try {
    const applications = await Application.find({
      status: "Accepted",
    }).populate("student", "-password");

    // const students = applications.map((application) => application.student);

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Selected students." });
  }
});
module.exports = {
  createApplication,
  statusChange,
  filterApplications,
  getApplications,
  getAllApplications,
  AcceptedStudent,
};
