const Joi = require("joi");

const image = Joi.string();

const video = Joi.string();

const create = {
  image: image.required(),
  video: video.required()
};

module.exports = {
  create
};
