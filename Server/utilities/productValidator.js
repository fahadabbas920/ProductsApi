const Joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const productSchema = Joi.object({
  model: Joi.string().required().max(80),
  description: Joi.string().max(200),
  price: Joi.number().integer().required().min(0).max(10000),
});

module.exports.productValidator = validator(productSchema);