const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // Get token from header (usually looks like: Bearer <token>)
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token using the secret from your .env file
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");

    // Add the user ID to the request object so controllers can use it
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = auth;
