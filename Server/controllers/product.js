const DBProducts = require("../models/product");
const { productValidator } = require("../utilities/productValidator");
const fs = require("fs");
//////////////////CONTROLLERS/////////////////////

const getAllProducts = async (req, res) => {
  const { model, limit } = req.query;
  let Products;
  try {
    Products = await DBProducts.find({
      model: { $regex: model || "", $options: "i" },
    }).limit(limit || "");
    if (!Products) {
      return res
        .status(404)
        .json({ success: false, message: "No Products Found" });
    }
    setTimeout(() => {
      return res.status(200).json({
        success: true,
        user: req.user.email,
        message: `${Products.length} found with given paramaters`,
        data: Products,
      });
    }, 150);
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};
const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await DBProducts.findOne({ _id: id });
    if (!result) {
      return res.status(404).json({
        success: false,
        message: `No product found with id: ${id}`,
      });
    }
    return res.status(200).json({
      success: true,
      messsage: `Product found with id: ${id}`,
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    let result = await DBProducts.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: `No Products found with id: ${id}`,
      });
    }
    // console.log(result);
    const path = `assets/${result.image}`;
    try {
      fs.unlinkSync(path);
    } catch (err) {
      console.log(err);
    }
    return res.status(200).json({
      success: true,
      message: `Product deleted succesfully`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};
const postProduct = async (req, res) => {
  const { error, value } = productValidator(req.body);

  if (error) {
    return res.status(406).json({ success: false, message: error.details });
  }
  try {
    await DBProducts.create({ ...req.body, image: req.file.filename });
    return res.status(201).json({
      success: true,
      message: `Product added succesfully`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { error, value } = productValidator(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details,
    });
  }
  try {
    const image = await DBProducts.findOne({ _id: id }, { image: 1 });
    const result = await DBProducts.findByIdAndUpdate(id, {
      ...req.body,
      image: req.file.filename,
    });
    if (!result) {
      return res.status(404).json({
        success: false,
        message: `No Products found with id: ${id}`,
      });
    }

    if (image) {
      const path = `assets/${image.image}`;

      try {
        fs.unlinkSync(path);
      } catch (err) {
        console.log(err);
      }
      //file removed
    }

    return res.status(201).json({
      success: true,
      message: `Product updated succesfully`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

const notification = (fun) => {};

module.exports = {
  getAllProducts,
  getProduct,
  postProduct,
  deleteProduct,
  updateProduct,
  notification,
};
