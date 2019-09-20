const ApplicationError = require("../common/AppicationError");

class VideoNotFound extends ApplicationError {
  constructor(message) {
    super(message || "There is no video corresponding to the given id ", 400);
  }
}

class NoVideoFile extends ApplicationError {
  constructor(message) {
    super(message || "There is no video file in the request", 400);
  }
}

module.exports = {
  VideoNotFound,
  NoVideoFile
};
