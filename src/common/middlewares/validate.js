const fs = require("fs");
const path = require("path");
const Joi = require("joi");
const ApplicationError = require("../AppicationError");

class InvalidRequest extends ApplicationError {
  constructor(message) {
    super(message || "The request is invalid", 400);
  }
}

const validate = (schema, options) => {
  return (req, res, next) => {
    const { error } = Joi.validate(req.body, schema);
    const isValid = error == null;

    if (isValid) {
      next();
    } else {
      // remove uploaded file
      if (req.file) {
        const root = path.dirname(
          require.main.filename || process.mainModule.filename
        );
        const absPath = path.join(root, req.file.path);
        fs.unlink(absPath, err => {
          if (err) {
            console.error(err);
          } else {
            console.log("remove temporary file: ", absPath);
          }
        });
      }
      const { details } = error;
      const message = details.map(i => i.message).join(",");
      throw new InvalidRequest(message);
    }
  };
};

module.exports = validate;
