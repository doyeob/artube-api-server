const ApplicationError = require("../common/AppicationError");

class LinkNotFound extends ApplicationError {
  constructor(message) {
    super(message || "There is no link corresponding to the given id ", 400);
  }
}

class ImageNotFound extends ApplicationError {
  constructor(message) {
    super(message || "There is no image corresponding to the given id ", 400);
  }
}

class VideoNotFound extends ApplicationError {
  constructor(message) {
    super(message || "There is no video corresponding to the given id ", 400);
  }
}

module.exports = {
  LinkNotFound,
  ImageNotFound,
  VideoNotFound
};
