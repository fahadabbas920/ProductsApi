const DBUsers = require("../models/users");
const { validateLogin } = require("../utilities/loginValidator");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { error, value } = validateLogin(req.body);
  console.log(value);
  if (error) {
    return res.status(422).json({ success: false, message: error.message });
  }

  try {
    const user = await DBUsers.find({ email: value.email });
    if (!!user.length) {
      return res
        .status(409)
        .json({ success: false, message: "This email is not available" });
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const encryptedPassword = await bcrypt.hash(value.password, salt);
    await DBUsers.create({
      email: value.email,
      password: encryptedPassword,
      questionVal: value.questionVal,
      answerVal: value.answerVal,
    });
    return res
      .status(200)
      .json({ success: true, message: "User created succesfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = signup;
