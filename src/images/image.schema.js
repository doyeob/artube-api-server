const Joi = require("joi");

const width = Joi.number()
  .integer()
  .min(1)
  .max(100000);

const height = Joi.number()
  .integer()
  .min(1)
  .max(100000);

const phyWidth = Joi.number()
  .min(0)
  .max(10000);

const phyHeight = Joi.number()
  .min(0)
  .max(10000);

const create = {
  width: width.required(),
  height: height.required(),
  phyWidth: phyWidth.required(),
  phyHeight: phyHeight.required()
};

module.exports = {
  create
};
