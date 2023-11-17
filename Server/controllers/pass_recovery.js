const DBUsers = require("../models/users");
const bcrypt = require("bcrypt");
const stringSimilarity = require("string-similarity");
const Joi = require("joi");

const findMail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(404)
      .json({ succes: false, message: "Please enter a valid email address" });
  }
  try {
    const mail = await DBUsers.find({ email: email }, { email });
    if (mail.length === 0) {
      return res
        .status(404)
        .json({ succes: false, message: "Email Address Not Found" });
    }
    return res.status(302).json({ succes: true, email: mail });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const securityQuestionCheck = async (req, res) => {};

const changePassword = async (req, res) => {
  const { newPass, reNewPass, email } = req.body;
  const similarity = stringSimilarity.compareTwoStrings(newPass, reNewPass);
  console.log(similarity);
  if (Number(String(similarity).slice(0, 3)) !== 1) {
    return res
      .status(422)
      .json({ success: false, message: "Password is not similar" });
  }
  const schema = Joi.string().min(8).max(10).required();
  const { error } = schema.validate(newPass);
  if (error) {
    return res.status(409).json({ success: false, message: error });
  }
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const encryptedPassword = await bcrypt.hash(newPass, salt);
    // const user = await DBUsers.find({ email: email });
    // if (!!user.length) {
    //   return res
    //     .status(409)
    //     .json({ success: false, message: "Sorry!, coudn't find email" });
    // }
    await DBUsers.findOneAndUpdate(
      { email: email },
      { password: encryptedPassword }
    );
    return res.status(200).json({ success: true, message: encryptedPassword });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  findMail,
  securityQuestionCheck,
  changePassword,
};
