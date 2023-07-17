const express = require("express");
const {
  registerStudent,
  authStudent,
  getAllStudents,
} = require("../controllers/studentCtl");

const router = express.Router();

router.route("/").post(registerStudent).get(getAllStudents);
router.post("/login", authStudent);

module.exports = router;
