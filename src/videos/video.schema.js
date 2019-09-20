const Joi = require("joi");

const width = Joi.number()
  .integer()
  .min(1)
  .max(100000);

const height = Joi.number()
  .integer()
  .min(1)
  .max(100000);

const create = {
  width: width.required(),
  height: height.required()
};

module.exports = {
  create
};
