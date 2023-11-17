const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  questionVal: String,
  answerVal: String,
});

module.exports = mongoose.model("DBUsers", userSchema);
