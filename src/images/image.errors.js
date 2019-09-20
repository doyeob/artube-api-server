const ApplicationError = require("../common/AppicationError");

class ImageNotFound extends ApplicationError {
  constructor(message) {
    super(message || "There is no image corresponding to the given id ", 400);
  }
}

class NoImageFile extends ApplicationError {
  constructor(message) {
    super(message || "There is no image file in the request", 400);
  }
}

module.exports = {
  ImageNotFound,
  NoImageFile
};
