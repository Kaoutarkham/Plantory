const { body, validationResult } = require("express-validator");

exports.validatePost = [
  body("image_url")
    .trim()
    .notEmpty()
    .withMessage("Image URL is required")
    .isURL()
    .withMessage("Invalid image URL"),
  body("caption")
    .optional()
    .trim()
    .isLength({ max: 2200 })
    .withMessage("Caption must be less than 2200 characters"),
  body("hashtags")
    .optional()
    .isArray()
    .withMessage("Hashtags must be an array"),
  body("category")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Category must be less than 100 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    next();
  },
];

exports.validateComment = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Comment content is required")
    .isLength({ max: 500 })
    .withMessage("Comment must be less than 500 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    next();
  },
];
