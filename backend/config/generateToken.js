const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: "365d", //1d, 2m, 2s or 365d, never ..
  });
};
module.exports = generateToken;
