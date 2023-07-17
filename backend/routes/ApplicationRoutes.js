const express = require("express");
const { protect } = require("../middleware/authMiddleWare");
const {
  createApplication,
  statusChange,
  filterApplications,
  getApplications,
  getAllApplications,
  AcceptedStudent,
} = require("../controllers/applicationCtl");
const router = express.Router();

// with protect
router
  .route("/")
  .post(protect, createApplication)
  .get(protect, getApplications);

router.route("/filter").get(protect, filterApplications);
router.put("/:id", statusChange);
// without protect
router.route("/all").get(getAllApplications);
router.route("/acceptedStudents").get(AcceptedStudent);

module.exports = router;
