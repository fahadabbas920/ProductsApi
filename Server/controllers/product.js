const DBProducts = require("../models/product");
const { productValidator } = require("../utilities/productValidator");
const fs = require("fs");
const asyncWrapper = require("../utilities/wrapper");
const { throwApiError } = require("../errors/customErrors");
//////////////////CONTROLLERS/////////////////////

const getAllProducts = asyncWrapper(async (req, res) => {
  const { model, limit } = req.query;
  let Products;
  Products = await DBProducts.find({
    model: { $regex: model || "", $options: "i" },
  }).limit(limit || "");
  if (!Products) {
    return next(throwApiError("Products not found", 404));
  }
  setTimeout(() => {
    return res.status(200).json({
      success: true,
      user: req.user.email,
      message: `${Products.length} found with given paramaters`,
      data: Products,
    });
  }, 150);
});

const getProduct = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const result = await DBProducts.findOne({ _id: id });
  if (!result) {
    return next(throwApiError(`No product found with id: ${id}`, 404));
  }
  return res.status(200).json({
    success: true,
    messsage: `Product found with id: ${id}`,
    data: result,
  });
});

const deleteProduct = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  let result = await DBProducts.findByIdAndDelete(id);
  if (!result) {
    return next(throwApiError(`No product found with id: ${id}`, 404));
  }
  const path = `assets/${result.image}`;
 fs.unlinkSync(path);
  return res.status(200).json({
    success: true,
    message: `Product deleted succesfully`,
  });
});

const postProduct = asyncWrapper(async (req, res, next) => {
  const { error, value } = productValidator(req.body);
  if (error) {
    return next(throwApiError(error, 406));
  }
  await DBProducts.create({ ...req.body, image: req.file.filename });
  return res.status(201).json({
    success: true,
    message: `Product added succesfully`,
  });
});

const updateProduct = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { error, value } = productValidator(req.body);
  if (error) {
    return next(throwApiError(error.details, 404));
  }
  const image = await DBProducts.findOne({ _id: id }, { image: 1 });
  const result = await DBProducts.findByIdAndUpdate(id, {
    ...req.body,
    image: req.file.filename,
  });
  if (!result) {
    return next(throwApiError(`No product found with id: ${id}`, 404));
  }

  if (image) {
    const path = `assets/${image.image}`;
    fs.unlinkSync(path);
  }

  return res.status(201).json({
    success: true,
    message: `Product updated succesfully`,
  });
});

const notification = (fun) => {};

module.exports = {
  getAllProducts,
  getProduct,
  postProduct,
  deleteProduct,
  updateProduct,
  notification,
};
