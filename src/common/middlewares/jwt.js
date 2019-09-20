const jwt = require("jsonwebtoken");
const ApplicationError = require("../AppicationError");

const secretKey = process.env.JWT_TOKEN_SECRET_KEY;

class Unauthorized extends ApplicationError {
  constructor(message) {
    super(message || "The request is invalid", 401);
  }
}

exports.verifyToken = (req, res, next) => {
  try {
    let token = req.headers["x-access-token"] || req.headers.authorization;

    if (!token) {
      throw new Unauthorized("Token is required.");
    }
    if (token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    req.user = jwt.verify(token, secretKey);
    return next();
  } catch (err) {
    if (err instanceof ApplicationError) {
      throw err;
    } else if (err.name === "TokenExpiredError") {
      throw new Unauthorized("This token is expired.");
    }
    throw new Unauthorized("This token is invalid.");
  }
};
