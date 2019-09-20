class ApplicationError extends Error {
  constructor(message, status) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message || "Undefined application error occurred.";
    this.status = status || 500;
  }
}

module.exports = ApplicationError;
