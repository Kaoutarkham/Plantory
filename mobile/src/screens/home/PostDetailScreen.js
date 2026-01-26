import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { api, addLike, addComment } from "../../services/api"; // Import functions li qaddina

const PostDetailScreen = ({ route, navigation }) => {
  // 1. Params li jaw mn l-Profile
  const { plantId, imageUri } = route.params || {};

  // 2. Local States
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(129); // Start with fake number or from API
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([
    {
      id: "1",
      username: "plant_nina",
      text: "That's beauty! Looks so healthy.",
      image: "https://via.placeholder.com/150",
    },
  ]);

  // 3. Logic: Toggle Like m3a l-Backend
  const handleToggleLike = async () => {
    try {
      const newLikedStatus = !isLiked;
      setIsLiked(newLikedStatus);
      setLikesCount(newLikedStatus ? likesCount + 1 : likesCount - 1);
      
      await addLike(plantId); // API Call
    } catch (err) {
      console.error("Error liking:", err);
    }
  };

  // 4. Logic: Add Comment m3a l-Backend
  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      await addComment(plantId, commentText); // API Call
      
      const newComment = {
        id: Date.now().toString(),
        username: "You",
        text: commentText,
        image: "https://via.placeholder.com/150",
      };

      setComments([...comments, newComment]);
      setCommentText("");
    } catch (err) {
      console.error("Error commenting:", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>POST</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* User Info */}
          <View style={styles.userInfo}>
            <View style={styles.userRow}>
              <Image source={{ uri: "https://via.placeholder.com/150" }} style={styles.userAvatar} />
              <Text style={styles.usernameText}>Sara_green</Text>
            </View>
            <Text style={styles.timeText}>7 hours ago</Text>
          </View>

          {/* Main Image */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: imageUri || "https://via.placeholder.com/400" }}
              style={styles.postImage}
              resizeMode="cover"
            />
          </View>

          {/* Interaction Bar */}
          <View style={styles.interactionBar}>
            <View style={styles.leftIcons}>
              <TouchableOpacity onPress={handleToggleLike}>
                <Ionicons
                  name={isLiked ? "heart" : "heart-outline"}
                  size={28}
                  color={isLiked ? "#FF4444" : "white"}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconSpacing}>
                <Ionicons name="chatbubble-outline" size={26} color="white" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <Ionicons name="bookmark-outline" size={26} color="white" />
            </TouchableOpacity>
          </View>

          {/* Caption */}
          <View style={styles.detailsContainer}>
            <Text style={styles.likesText}>Liked by {likesCount} others</Text>
            <Text style={styles.captionText}>
              My plant bringing beauty into my space. 🌿
            </Text>
            <Text style={styles.hashtag}>#plantlove #greenery</Text>
            <Text style={styles.commentCount}>Comments ({comments.length})</Text>
          </View>

          {/* Comments List */}
          <View style={styles.commentsSection}>
            {comments.map((item) => (
              <View key={item.id} style={styles.commentItem}>
                <Image source={{ uri: item.image }} style={styles.commentAvatar} />
                <View style={styles.commentTextContainer}>
                  <Text style={styles.commentUser}>{item.username}</Text>
                  <Text style={styles.commentContent}>{item.text}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Floating Input Bar */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Add a comment..."
              placeholderTextColor="#888"
              style={styles.textInput}
              value={commentText}
              onChangeText={setCommentText}
            />
            <TouchableOpacity onPress={handleAddComment}>
              <Text style={[styles.postBtnText, commentText.length > 0 && { color: "#4ADE80" }]}>
                Post
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#071507" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    height: 60,
  },
  headerTitle: { color: "white", fontSize: 16, fontWeight: "bold", letterSpacing: 1 },
  userInfo: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 15 },
  userRow: { flexDirection: "row", alignItems: "center" },
  userAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#1B3B1B" },
  usernameText: { color: "white", marginLeft: 12, fontSize: 15, fontWeight: "600" },
  timeText: { color: "#4ADE80", fontSize: 11 },
  imageContainer: { paddingHorizontal: 10 },
  postImage: { width: "100%", height: 400, borderRadius: 20 },
  interactionBar: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 15 },
  leftIcons: { flexDirection: "row", alignItems: "center" },
  iconSpacing: { marginLeft: 15 },
  detailsContainer: { paddingHorizontal: 20 },
  likesText: { color: "white", fontWeight: "bold", fontSize: 14 },
  captionText: { color: "#E0E0E0", marginTop: 8, fontSize: 14, lineHeight: 20 },
  hashtag: { color: "#4ADE80", marginTop: 4, fontWeight: "600" },
  commentCount: { color: "#888", marginTop: 15, fontSize: 13, fontWeight: "500" },
  commentsSection: { paddingHorizontal: 20, marginTop: 15, paddingBottom: 100 },
  commentItem: { flexDirection: "row", marginBottom: 15 },
  commentAvatar: { width: 35, height: 35, borderRadius: 17.5, backgroundColor: "#1B3B1B" },
  commentTextContainer: { marginLeft: 12, flex: 1 },
  commentUser: { color: "white", fontWeight: "bold", fontSize: 13 },
  commentContent: { color: "#BBB", fontSize: 13, marginTop: 2 },
  inputContainer: { padding: 15, backgroundColor: "#071507", borderTopWidth: 0.5, borderTopColor: "#1B3B1B" },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#112211",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
  },
  textInput: { flex: 1, color: "white", fontSize: 14 },
  postBtnText: { color: "#444", fontWeight: "bold", marginLeft: 10 },
});

export default PostDetailScreen;