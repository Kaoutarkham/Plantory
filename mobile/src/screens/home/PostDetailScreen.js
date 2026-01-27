import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { usePostStore } from "../../stores/postStore";

const PostDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const {
    currentPost,
    comments,
    loading,
    fetchPostById,
    fetchComments,
    addComment,
    toggleLike,
    toggleSave,
  } = usePostStore();

  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (id) {
      fetchPostById(id);
      fetchComments(id);
    }
  }, [id]);

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      setSubmitting(true);
      await addComment(id, commentText.trim());
      setCommentText("");
      inputRef.current?.blur();
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffMs = now - postTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  if (loading || !currentPost) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>POST</Text>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* User Info */}
          <View style={styles.userSection}>
            <Image
              source={{
                uri:
                  currentPost.user.avatar_url ||
                  "https://via.placeholder.com/50",
              }}
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text style={styles.username}>{currentPost.user.username}</Text>
              <Text style={styles.timestamp}>
                {formatTime(currentPost.created_at)}
              </Text>
            </View>
          </View>

          {/* Post Image */}
          <Image
            source={{ uri: currentPost.image_url }}
            style={styles.postImage}
            resizeMode="cover"
          />

          {/* Actions */}
          <View style={styles.actions}>
            <View style={styles.leftActions}>
              <TouchableOpacity
                onPress={() => toggleLike(currentPost.id)}
                style={styles.actionButton}
              >
                <Ionicons
                  name={currentPost.is_liked ? "heart" : "heart-outline"}
                  size={28}
                  color={currentPost.is_liked ? "#FF4444" : "#4CAF50"}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="chatbubble-outline" size={26} color="#4CAF50" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => toggleSave(currentPost.id)}>
              <Ionicons
                name={currentPost.is_saved ? "bookmark" : "bookmark-outline"}
                size={26}
                color="#4CAF50"
              />
            </TouchableOpacity>
          </View>

          {/* Likes Count */}
          <Text style={styles.likesCount}>
            Liked by {currentPost.likes_count}{" "}
            {currentPost.likes_count === 1 ? "other" : "others"}
          </Text>

          {/* Caption */}
          {currentPost.caption && (
            <View style={styles.captionSection}>
              <Text style={styles.caption}>{currentPost.caption}</Text>
            </View>
          )}

          {/* Hashtags */}
          {currentPost.hashtags && currentPost.hashtags.length > 0 && (
            <Text style={styles.hashtags}>
              {currentPost.hashtags.map((tag) => `#${tag}`).join(" ")}
            </Text>
          )}

          {/* Comments */}
          <View style={styles.commentsSection}>
            <Text style={styles.commentsTitle}>
              Comments ({currentPost.comments_count})
            </Text>

            {comments.map((comment) => (
              <View key={comment.id} style={styles.commentItem}>
                <Image
                  source={{
                    uri:
                      comment.user.avatar_url ||
                      "https://via.placeholder.com/36",
                  }}
                  style={styles.commentAvatar}
                />
                <View style={styles.commentContent}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentUsername}>
                      {comment.user.username}
                    </Text>
                    <Text style={styles.commentTime}>
                      {formatTime(comment.created_at)}
                    </Text>
                  </View>
                  <Text style={styles.commentText}>{comment.content}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Comment Input */}
        <View style={styles.commentInputContainer}>
          <TextInput
            ref={inputRef}
            style={styles.commentInput}
            placeholder="Add a comment..."
            placeholderTextColor="#888"
            value={commentText}
            onChangeText={setCommentText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            onPress={handleAddComment}
            disabled={!commentText.trim() || submitting}
            style={[
              styles.sendButton,
              (!commentText.trim() || submitting) && styles.sendButtonDisabled,
            ]}
          >
            {submitting ? (
              <ActivityIndicator size="small" color="#4CAF50" />
            ) : (
              <Text style={styles.sendButtonText}>Post</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A0A0A",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1A1A1A",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#4CAF50",
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  timestamp: {
    fontSize: 12,
    color: "#4CAF50",
    marginTop: 2,
  },
  postImage: {
    width: "100%",
    height: 400,
    backgroundColor: "#1A1A1A",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  leftActions: {
    flexDirection: "row",
  },
  actionButton: {
    marginRight: 16,
  },
  likesCount: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    paddingHorizontal: 16,
    marginTop: 8,
  },
  captionSection: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  caption: {
    color: "#E0E0E0",
    fontSize: 14,
    lineHeight: 20,
  },
  hashtags: {
    color: "#4CAF50",
    fontSize: 14,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  commentsSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 100,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 16,
  },
  commentItem: {
    flexDirection: "row",
    marginBottom: 16,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#4CAF50",
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  commentUsername: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    marginRight: 8,
  },
  commentTime: {
    fontSize: 12,
    color: "#888",
  },
  commentText: {
    fontSize: 14,
    color: "#E0E0E0",
    lineHeight: 18,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#1A1A1A",
    backgroundColor: "#0A0A0A",
  },
  commentInput: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: "#fff",
    fontSize: 14,
    maxHeight: 100,
    marginRight: 12,
  },
  sendButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#4CAF50",
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default PostDetailScreen;
