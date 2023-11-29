const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getAllProducts,
  getProduct,
  postProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/product");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return callback(null, true);
    } else {
      return callback(
        new multer.MulterError("Valid Image types are png, jpg, gif, jpeg")
      );
    }
  },
});

router.get("/", getAllProducts);
router.post("/", upload.single("image"), postProduct);
router.get("/:id", getProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", upload.single("image"), updateProduct);

module.exports = router;
