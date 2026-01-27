// ❌ DELETE THIS LINE:
// const { Post, User, Like, SavedPost, Comment } = require("../models");

// ✅ Import inside each method
class PostController {
  async getAllPosts(req, res) {
    try {
      const { Post, User, Like, SavedPost } = require("../models");
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;
      const userId = req.user.id;

      const posts = await Post.findAndCountAll({
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [["created_at", "DESC"]],
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "username", "avatar_url"],
          },
        ],
        distinct: true,
      });

      const postIds = posts.rows.map((post) => post.id);

      const userLikes = await Like.findAll({
        where: { user_id: userId, post_id: postIds },
        attributes: ["post_id"],
      });

      const userSaves = await SavedPost.findAll({
        where: { user_id: userId, post_id: postIds },
        attributes: ["post_id"],
      });

      const likedPostIds = new Set(userLikes.map((like) => like.post_id));
      const savedPostIds = new Set(userSaves.map((save) => save.post_id));

      const postsWithUserActions = posts.rows.map((post) => ({
        ...post.toJSON(),
        is_liked: likedPostIds.has(post.id),
        is_saved: savedPostIds.has(post.id),
      }));

      res.json({
        success: true,
        data: postsWithUserActions,
        pagination: {
          total: posts.count,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(posts.count / limit),
        },
      });
    } catch (error) {
      console.error("Get posts error:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching posts",
        error: error.message,
      });
    }
  }

  async getPostById(req, res) {
    try {
      const { Post, User, Like, SavedPost } = require("../models");
      const { id } = req.params;
      const userId = req.user.id;

      const post = await Post.findByPk(id, {
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "username", "avatar_url"],
          },
        ],
      });

      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }

      const [isLiked, isSaved] = await Promise.all([
        Like.findOne({ where: { user_id: userId, post_id: id } }),
        SavedPost.findOne({ where: { user_id: userId, post_id: id } }),
      ]);

      res.json({
        success: true,
        data: {
          ...post.toJSON(),
          is_liked: !!isLiked,
          is_saved: !!isSaved,
        },
      });
    } catch (error) {
      console.error("Get post error:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching post",
        error: error.message,
      });
    }
  }

  async createPost(req, res) {
    try {
      const { Post, User } = require("../models");
      const { image_url, caption, hashtags, category } = req.body;
      const userId = req.user.id;

      const post = await Post.create({
        user_id: userId,
        image_url,
        caption,
        hashtags: hashtags || [],
        category,
      });

      const postWithUser = await Post.findByPk(post.id, {
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "username", "avatar_url"],
          },
        ],
      });

      res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: {
          ...postWithUser.toJSON(),
          is_liked: false,
          is_saved: false,
        },
      });
    } catch (error) {
      console.error("Create post error:", error);
      res.status(500).json({
        success: false,
        message: "Error creating post",
        error: error.message,
      });
    }
  }

  async toggleLike(req, res) {
    try {
      const { Post, Like } = require("../models");
      const { id } = req.params;
      const userId = req.user.id;

      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }

      const existingLike = await Like.findOne({
        where: { user_id: userId, post_id: id },
      });

      if (existingLike) {
        await existingLike.destroy();
        await post.decrement("likes_count");

        res.json({
          success: true,
          message: "Post unliked",
          data: { is_liked: false, likes_count: post.likes_count - 1 },
        });
      } else {
        await Like.create({ user_id: userId, post_id: id });
        await post.increment("likes_count");

        res.json({
          success: true,
          message: "Post liked",
          data: { is_liked: true, likes_count: post.likes_count + 1 },
        });
      }
    } catch (error) {
      console.error("Toggle like error:", error);
      res.status(500).json({
        success: false,
        message: "Error toggling like",
        error: error.message,
      });
    }
  }

  async toggleSave(req, res) {
    try {
      const { Post, SavedPost } = require("../models");
      const { id } = req.params;
      const userId = req.user.id;

      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }

      const existingSave = await SavedPost.findOne({
        where: { user_id: userId, post_id: id },
      });

      if (existingSave) {
        await existingSave.destroy();
        res.json({
          success: true,
          message: "Post unsaved",
          data: { is_saved: false },
        });
      } else {
        await SavedPost.create({ user_id: userId, post_id: id });
        res.json({
          success: true,
          message: "Post saved",
          data: { is_saved: true },
        });
      }
    } catch (error) {
      console.error("Toggle save error:", error);
      res.status(500).json({
        success: false,
        message: "Error toggling save",
        error: error.message,
      });
    }
  }

  async getComments(req, res) {
    try {
      const { Comment, User } = require("../models");
      const { id } = req.params;
      const { page = 1, limit = 20 } = req.query;
      const offset = (page - 1) * limit;

      const comments = await Comment.findAndCountAll({
        where: { post_id: id },
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [["created_at", "DESC"]],
        include: [
          {
            model: User,
            as: "commentUser",
            attributes: ["id", "username", "avatar_url"],
          },
        ],
      });

      res.json({
        success: true,
        data: comments.rows,
        pagination: {
          total: comments.count,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(comments.count / limit),
        },
      });
    } catch (error) {
      console.error("Get comments error:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching comments",
        error: error.message,
      });
    }
  }

  async addComment(req, res) {
    try {
      const { Post, Comment, User } = require("../models");
      const { id } = req.params;
      const { content } = req.body;
      const userId = req.user.id;

      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }

      const comment = await Comment.create({
        user_id: userId,
        post_id: id,
        content,
      });

      await post.increment("comments_count");

      const commentWithUser = await Comment.findByPk(comment.id, {
        include: [
          {
            model: User,
            as: "commentUser",
            attributes: ["id", "username", "avatar_url"],
          },
        ],
      });

      res.status(201).json({
        success: true,
        message: "Comment added",
        data: commentWithUser,
      });
    } catch (error) {
      console.error("Add comment error:", error);
      res.status(500).json({
        success: false,
        message: "Error adding comment",
        error: error.message,
      });
    }
  }

  async deletePost(req, res) {
    try {
      const { Post } = require("../models");
      const { id } = req.params;
      const userId = req.user.id;

      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }

      if (post.user_id !== userId) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized to delete this post",
        });
      }

      await post.destroy();

      res.json({
        success: true,
        message: "Post deleted successfully",
      });
    } catch (error) {
      console.error("Delete post error:", error);
      res.status(500).json({
        success: false,
        message: "Error deleting post",
        error: error.message,
      });
    }
  }
}

module.exports = new PostController();
