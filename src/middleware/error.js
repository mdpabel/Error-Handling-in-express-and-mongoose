const ErrorResponse = require("../util/errorResponse");

const errorHandler = (err, req, res, next) => {
  console.log(err);

  let error = { ...err };
  error.message = err.message;

  // Bad ObjectID
  if (err.name === "CastError") {
    error = new ErrorResponse(`Resource not found id of ${err.value}`, 404);
  }

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    const message = err._message;
    error = new ErrorResponse(message, 400);
  }

  // Mongoose duplicate keys
  if (err.code === 11000) {
    const message = "Duplicate field value entered!";
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).send({
    success: false,
    error: error.message || "Server error!",
  });
};

module.exports = errorHandler;
