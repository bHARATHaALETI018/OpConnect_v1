const express = require("express");
const {
  createOpportunity,
  getAllOpportunities,
  filterOpportunities,
} = require("../controllers/opportunityCtl");

const router = express.Router();

router.route("/").post(createOpportunity).get(getAllOpportunities);

router.route("/filter").get(filterOpportunities);

module.exports = router;
