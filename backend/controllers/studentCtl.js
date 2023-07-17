const asyncHandler = require("express-async-handler");

const Student = require("../model/student");
const generateToken = require("../config/generateToken");

const registerStudent = asyncHandler(async (req, res) => {
  const { email, password, rollNumber, name, department, section, phone, pic } =
    req.body;
  console.log(req.body);
  if (
    !email ||
    !password ||
    !rollNumber ||
    !name ||
    !department ||
    !section ||
    !phone
  ) {
    res.status(400);
    throw new Error("Please enter all the fields!.....");
  }

  const studentExists = await Student.findOne({ email });
  if (studentExists) {
    res.status(400);
    throw new Error("Student already exists!..");
  }

  try {
    const student = await Student.create({
      email,
      password,
      rollNumber,
      name,
      department,
      section,
      phone,
      pic,
    });

    res.status(201).json({
      _id: student._id,
      email: student.email,
      password: student.password,
      rollNumber: student.rollNumber,
      name: student.name,
      department: student.department,
      section: student.section,
      phone: student.phone,
      pic: student.pic,
      token: generateToken(student._id),
    });
  } catch (error) {
    res.status(400);
    throw new Error("Failed to create the Student!." + error.message);
  }
});

const authStudent = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const student = await Student.findOne({ email });

  if (Student && (await student.matchPassword(password))) {
    res.json({
      _id: student._id,
      email: student.email,
      password: student.password,
      rollNumber: student.rollNumber,
      name: student.name,
      department: student.department,
      section: student.section,
      phone: student.phone,
      pic: student.pic,
      token: generateToken(student._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email 0r Password*********");
  }
});

const getAllStudents = asyncHandler(async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve students" });
  }
});

module.exports = { registerStudent, authStudent, getAllStudents };
