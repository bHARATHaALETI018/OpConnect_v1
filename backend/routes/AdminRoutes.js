const express = require("express");
const {
  registerAdmin,
  authAdmin,
  allAdmins,
} = require("../controllers/adminCtl");

const router = express.Router();

router.route("/").post(registerAdmin).get(allAdmins);
router.post("/login", authAdmin);

module.exports = router;
