import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const api = axios.create({
  baseURL: "http://192.168.100.19:3000/api",
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem("token");
    }
    return Promise.reject(error);
  },
);

// ✅ ADD THIS: Posts API
export const postsAPI = {
  // Get all posts (feed)
  getAllPosts: (page = 1, limit = 10) =>
    api.get(`/posts?page=${page}&limit=${limit}`),

  // Get single post
  getPostById: (id) => api.get(`/posts/${id}`),

  // Create new post
  createPost: (postData) => api.post("/posts", postData),

  // Delete post
  deletePost: (id) => api.delete(`/posts/${id}`),

  // Toggle like
  toggleLike: (id) => api.post(`/posts/${id}/like`),

  // Toggle save
  toggleSave: (id) => api.post(`/posts/${id}/save`),

  // Get comments
  getComments: (id, page = 1, limit = 20) =>
    api.get(`/posts/${id}/comments?page=${page}&limit=${limit}`),

  // Add comment
  addComment: (id, content) => api.post(`/posts/${id}/comments`, { content }),
};

export default api;
