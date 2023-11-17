const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect");
const authorize = require("./middlewares/authorize.js");
const product = require("./routes/product.js");
const login = require("./routes/login.js");
const signup = require("./routes/signup.js");
const pass_recovery = require("./routes/pass_recovery.js");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // used when posting data with javscript
app.use("/login", login);
app.use("/signup", signup);
app.use("/api/v1/product", authorize);
app.use("/api/v1/product", product);
app.use("/api/v1/account_recovery", pass_recovery);
app.get("*", (req, res) => {
  res.status(404).json({ success: false, message: "Invalid Api Request" });
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI).then(() => {
      console.log("db connected");
    });
    app.listen(5000, () => {
      console.log("server is listening on port: 5000");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
