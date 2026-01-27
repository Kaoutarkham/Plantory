import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { usePostStore } from "../stores/postStore";

const { width } = Dimensions.get("window");

const PostCard = ({ post }) => {
  const navigation = useNavigation(); // ✅ Add this

  const { toggleLike, toggleSave } = usePostStore();

  const handleLike = () => {
    toggleLike(post.id);
  };

  const handleSave = () => {
    toggleSave(post.id);
  };

  const handleComment = () => {
     navigation.navigate("PostDetail", { id: post.id });
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffMs = now - postTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.userInfo}
          onPress={() => router.push(`/profile/${post.user.id}`)}
        >
          <Image
            source={{
              uri: post.user.avatar_url || "https://via.placeholder.com/40",
            }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.username}>{post.user.username}</Text>
            <Text style={styles.timestamp}>{formatTime(post.created_at)}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Post Image */}
      <TouchableOpacity onPress={handleComment} activeOpacity={0.9}>
        <Image
          source={{ uri: post.image_url }}
          style={styles.postImage}
          resizeMode="cover"
        />
      </TouchableOpacity>

      {/* Actions */}
      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
            <Ionicons
              name={post.is_liked ? "heart" : "heart-outline"}
              size={28}
              color={post.is_liked ? "#FF4444" : "#4CAF50"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleComment} style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={26} color="#4CAF50" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleSave}>
          <Ionicons
            name={post.is_saved ? "bookmark" : "bookmark-outline"}
            size={26}
            color="#4CAF50"
          />
        </TouchableOpacity>
      </View>

      {/* Likes Count */}
      <Text style={styles.likesCount}>
        Liked by {post.likes_count}{" "}
        {post.likes_count === 1 ? "other" : "others"}
      </Text>

      {/* Caption */}
      {post.caption && (
        <View style={styles.captionContainer}>
          <Text style={styles.caption}>
            <Text style={styles.username}>{post.user.username} </Text>
            {post.caption}
          </Text>
        </View>
      )}

      {/* Hashtags */}
      {post.hashtags && post.hashtags.length > 0 && (
        <Text style={styles.hashtags}>
          {post.hashtags.map((tag) => `#${tag}`).join(" ")}
        </Text>
      )}

      {/* Comments */}
      {post.comments_count > 0 && (
        <TouchableOpacity onPress={handleComment}>
          <Text style={styles.viewComments}>
            View all {post.comments_count} comments
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1A1A1A",
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 2,
    borderColor: "#4CAF50",
  },
  username: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  timestamp: {
    color: "#4CAF50",
    fontSize: 12,
    marginTop: 2,
  },
  postImage: {
    width: "100%",
    height: width - 32,
    backgroundColor: "#2A2A2A",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
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
    paddingHorizontal: 12,
    marginTop: 8,
  },
  captionContainer: {
    paddingHorizontal: 12,
    marginTop: 8,
  },
  caption: {
    color: "#E0E0E0",
    fontSize: 14,
    lineHeight: 20,
  },
  hashtags: {
    color: "#4CAF50",
    fontSize: 14,
    paddingHorizontal: 12,
    marginTop: 4,
  },
  viewComments: {
    color: "#888",
    fontSize: 14,
    paddingHorizontal: 12,
    marginTop: 8,
    marginBottom: 12,
  },
});

export default PostCard;
