const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { authenticateToken } = require("../middlewares/authMiddleware"); // Use your existing auth middleware
const {
  validatePost,
  validateComment,
} = require("../validators/postValidators");

// All routes require authentication
router.use(authenticateToken);

// Posts CRUD
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.post("/", validatePost, postController.createPost);
router.delete("/:id", postController.deletePost);

// Like/Unlike
router.post("/:id/like", postController.toggleLike);

// Save/Unsave
router.post("/:id/save", postController.toggleSave);

// Comments
router.get("/:id/comments", postController.getComments);
router.post("/:id/comments", validateComment, postController.addComment);

module.exports = router;
