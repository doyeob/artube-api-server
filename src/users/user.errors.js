const ApplicationError = require("../common/AppicationError");

class UserNotFound extends ApplicationError {
  constructor(message) {
    super(
      message || "There is no user corresponding to the given id or email.",
      400
    );
  }
}

class WrongPassword extends ApplicationError {
  constructor(message) {
    super(message || "The password is invalid for the given email.", 400);
  }
}

class EmailAlreadyInUse extends ApplicationError {
  constructor(message) {
    super(message || "Email is already taken", 400);
  }
}

module.exports = {
  UserNotFound,
  WrongPassword,
  EmailAlreadyInUse
};
