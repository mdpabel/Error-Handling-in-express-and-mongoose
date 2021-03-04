const ErrorResponse = require("../util/errorResponse");

const errorHandler = (err, req, res, next) => {
  console.log(err);

  let error = { ...err };
  error.message = err.message;

  // Bad ObjectID
  if (err.name === "CastError") {
    error = new ErrorResponse(`Resource not found id of ${err.value}`, 404);
  }

  // Mongoose ValidationError
  if (err.name == "ValidationError") {
    let message = Object.keys(err.errors).map(
      (key) => err.errors[key].properties.message
    );
    console.log(message);
    error = new ErrorResponse(message, 404);
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
