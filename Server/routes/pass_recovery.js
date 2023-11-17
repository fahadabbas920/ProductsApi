const express = require("express");
const {
  findMail,
  securityQuestionCheck,
  changePassword,
} = require("../controllers/pass_recovery");
const router = express.Router();

router.route("/find_mail").post(findMail);
router.route("/security_ques").post(securityQuestionCheck);
router.route("/change_pass").post(changePassword);

module.exports = router;
