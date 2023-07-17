const asyncHandler = require("express-async-handler");
const Admin = require("../model/admin");
const generateToken = require("../config/generateToken");

const registerAdmin = asyncHandler(async (req, res) => {
  const { email, password, name, phone, pic } = req.body;

  if (!email || !password || !name || !phone) {
    res.status(400);
    throw new Error("Please enter all the fields!.....");
  }

  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    res.status(400);
    throw new Error("An admin with this email already exists.");
  }

  try {
    const admin = await Admin.create({
      email,
      password,
      name,
      phone,
      pic,
    });

    res.status(201).json({
      _id: admin._id,
      email: admin.email,
      password: admin.password,
      name: admin.name,
      phone: admin.phone,
      pic: admin.pic,
      token: generateToken(admin._id),
    });
  } catch (error) {
    res.status(400);
    throw new Error("Failed to create the Admin!." + error.message);
  }
});

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      email: admin.email,
      password: admin.password,
      name: admin.name,
      phone: admin.phone,
      pic: admin.pic,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password.");
  }
});

const allAdmins = asyncHandler(async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch admins." });
  }
});

module.exports = { registerAdmin, authAdmin, allAdmins };
