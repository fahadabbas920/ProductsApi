const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProduct,
  postProduct,
  deleteProduct,
  updateProduct,
  // invalidRequest
} = require("../controllers/product");

router.get("/", getAllProducts);
router.post("/", postProduct);
router.get("/:id", getProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);
//   router.all("/*", invalidRequest);

module.exports = router;
