import { create } from "zustand";
import { postsAPI } from "../services/api";

export const usePostStore = create((set, get) => ({
  // State
  posts: [],
  currentPost: null,
  comments: [],
  loading: false,
  error: null,
  hasMore: true,
  page: 1,

  // Actions
  fetchPosts: async (page = 1, refresh = false) => {
    try {
      set({ loading: true, error: null });

      const response = await postsAPI.getAllPosts(page, 10);
      const newPosts = response.data.data;

      set((state) => ({
        posts: refresh ? newPosts : [...state.posts, ...newPosts],
        hasMore: newPosts.length === 10,
        page: page,
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch posts",
        loading: false,
      });
    }
  },

  refreshPosts: async () => {
    const { fetchPosts } = get();
    await fetchPosts(1, true);
  },

  loadMorePosts: async () => {
    const { page, hasMore, loading, fetchPosts } = get();
    if (!hasMore || loading) return;
    await fetchPosts(page + 1, false);
  },

  fetchPostById: async (id) => {
    try {
      set({ loading: true, error: null });
      const response = await postsAPI.getPostById(id);
      set({
        currentPost: response.data.data,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch post",
        loading: false,
      });
    }
  },

  toggleLike: async (postId) => {
    try {
      const response = await postsAPI.toggleLike(postId);
      const { is_liked, likes_count } = response.data.data;

      // Update posts array
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === postId ? { ...post, is_liked, likes_count } : post,
        ),
      }));

      // Update current post if viewing single post
      set((state) => {
        if (state.currentPost?.id === postId) {
          return {
            currentPost: { ...state.currentPost, is_liked, likes_count },
          };
        }
        return state;
      });
    } catch (error) {
      console.error("Toggle like error:", error);
    }
  },

  toggleSave: async (postId) => {
    try {
      const response = await postsAPI.toggleSave(postId);
      const { is_saved } = response.data.data;

      // Update posts array
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === postId ? { ...post, is_saved } : post,
        ),
      }));

      // Update current post
      set((state) => {
        if (state.currentPost?.id === postId) {
          return {
            currentPost: { ...state.currentPost, is_saved },
          };
        }
        return state;
      });
    } catch (error) {
      console.error("Toggle save error:", error);
    }
  },

  fetchComments: async (postId, page = 1) => {
    try {
      const response = await postsAPI.getComments(postId, page, 20);
      set({ comments: response.data.data });
    } catch (error) {
      console.error("Fetch comments error:", error);
    }
  },

  addComment: async (postId, content) => {
    try {
      const response = await postsAPI.addComment(postId, content);
      const newComment = response.data.data;

      // Add comment to list
      set((state) => ({
        comments: [newComment, ...state.comments],
      }));

      // Update comments count
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === postId
            ? { ...post, comments_count: post.comments_count + 1 }
            : post,
        ),
      }));

      // Update current post
      set((state) => {
        if (state.currentPost?.id === postId) {
          return {
            currentPost: {
              ...state.currentPost,
              comments_count: state.currentPost.comments_count + 1,
            },
          };
        }
        return state;
      });

      return newComment;
    } catch (error) {
      console.error("Add comment error:", error);
      throw error;
    }
  },

  createPost: async (postData) => {
    try {
      const response = await postsAPI.createPost(postData);
      const newPost = response.data.data;

      set((state) => ({
        posts: [newPost, ...state.posts],
      }));

      return newPost;
    } catch (error) {
      console.error("Create post error:", error);
      throw error;
    }
  },

  deletePost: async (postId) => {
    try {
      await postsAPI.deletePost(postId);

      set((state) => ({
        posts: state.posts.filter((post) => post.id !== postId),
      }));
    } catch (error) {
      console.error("Delete post error:", error);
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
