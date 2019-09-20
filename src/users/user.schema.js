const Joi = require("joi");

const email = Joi.string().email({ minDomainAtoms: 2 });
const password = Joi.string()
  .min(3)
  .max(16);
const username = Joi.string()
  .min(6)
  .max(20);

const auth = {
  email: email.required(),
  password: password.required()
};

const create = {
  email: email.required(),
  password: password.required(),
  username: username.required()
};

module.exports = {
  auth,
  create
};
