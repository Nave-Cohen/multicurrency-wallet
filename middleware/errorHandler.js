// errorHandler.js
function errorHandler(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    // You might want to include additional error details for debugging purposes
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}

module.exports = errorHandler;
