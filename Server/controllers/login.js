const jwt = require("jsonwebtoken");
const DBUsers = require("../models/users");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const result = await DBUsers.find({ email: req.body.email });
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Incorrect email or password`,
      });
    }
    const isSimilar = await bcrypt.compare(
      req.body.password,
      result[0].password
    );
    if (!isSimilar) {
      return res
        .status(401)
        .json({ success: false, message: `Incorrect email or password` });
    }
    const token = jwt.sign(req.body, process.env.JWT_SECRET, {
      expiresIn: "1m",
    });
    return res.status(200).json({
      success: true,
      messsage: "Logged in successfully",
      email: req.body.email,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: true,
      messsage: "Internal Server Error",
    });
  }
};

module.exports = login;
