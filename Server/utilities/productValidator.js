// const BaseJoi = require("joi");
// const imageExtension = require("joi-image-extension");
// const concatStream = require("concat-stream");
// const Joi = BaseJoi.extend(imageExtension);

const Joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const productSchema = Joi.object({
  model: Joi.string().required().max(15),
  description: Joi.string().max(100),
  price: Joi.number().integer().required().min(0).max(10000),
  image: Joi.string(),
});

module.exports.productValidator = validator(productSchema);
