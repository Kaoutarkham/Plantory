
const errorHandler = (err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message,
    // Only show the stack trace if we are in development mode
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorHandler;