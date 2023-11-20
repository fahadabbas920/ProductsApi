const DBUsers = require("../models/users");
const bcrypt = require("bcrypt");
const stringSimilarity = require("string-similarity");
const Joi = require("joi");

const findMail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(404)
      .json({ success: false, message: "Please enter a valid email address" });
  }
  try {
    const mail = await DBUsers.find({ email: email }, { email });
    if (mail.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Email Address Not Found" });
    }
    return res.status(200).json({ success: true, email: mail });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const securityQuestionCheck = async (req, res) => {
  const { email, questionVal, answerVal } = req.body;
  if (!email || !questionVal || !answerVal) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid or Incomplete information" });
  }
  try {
    const user = await DBUsers.findOne(
      { email: email },
      { questionVal: 1, answerVal: 1 }
    );
    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message:
          "coudn't find user with given email- user may have been deleted",
      });
    }
    const quesSimilarity = stringSimilarity.compareTwoStrings(
      questionVal,
      user.questionVal
    );
    const ansSimilarity = stringSimilarity.compareTwoStrings(
      answerVal,
      user.answerVal
    );
    if (quesSimilarity === 1 && ansSimilarity === 1) {
      return res
        .status(200)
        .json({ success: true, message: "Update Access Granted" });
    } else {
      return res
        .status(403)
        .json({ success: false, message: "Invalid security credentials" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const changePassword = async (req, res) => {
  const { newPass, reNewPass, email } = req.body;
  if (!email || !newPass || !reNewPass) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid or Incomplete information" });
  }
  const similarity = stringSimilarity.compareTwoStrings(newPass, reNewPass);
  if (Number(String(similarity).slice(0, 3)) !== 1) {
    return res
      .status(422)
      .json({ success: false, message: "Password is not similar" });
  }
  const schema = Joi.string().min(8).max(10).required();
  const { error } = schema.validate(newPass);
  if (error) {
    return res.status(400).json({ success: false, message: error });
  }
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const encryptedPassword = await bcrypt.hash(newPass, salt);
    const user = await DBUsers.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Sorry!, coudn't find email- Maybe it has been removed",
      });
    }
    await DBUsers.findOneAndUpdate(
      { email: email },
      { password: encryptedPassword }
    );
    return res
      .status(200)
      .json({ success: true, message: "Password updated succesfully" });
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
