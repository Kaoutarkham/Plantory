import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// 1. Import your custom axios instance
import { api } from "../../services/api";

const { width } = Dimensions.get("window");

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // This constant helps fix the "localhost" issue in images sent by the backend
  const BASE_SERVER_URL = "http://192.168.0.103:3000";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/users/profile/9", {
          headers: {
            // Replace 'YOUR_TOKEN_HERE' with a real token from your database/Postman
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNzY5MzYwMjM0LCJleHAiOjE3Njk0NDY2MzR9.Pb0ikjhO3mZyuiemoOgNHoFZh8fCN-3lNu7trYcbmOc`,
          },
        });
        setUserData(response.data);
      } catch (err) {
        // This is where your 401 error was being caught
        console.error("Backend Error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // 3. Helper to ensure images load on physical devices
  const getImageUrl = (url) => {
    if (!url)
      return "http://localhost:3000/uploads/1769354406344-kham_profile_1.jpg.jpg";
    // Replaces 'localhost' with your machine IP so the app can find the file
    return url.replace("http://localhost:3000", BASE_SERVER_URL);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4ADE80" />
      </View>
    );
  }

  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <View style={{ width: 24 }} />
        <Text style={styles.username}>
          {userData?.fullName?.toLowerCase().replace(/\s/g, "_") ||
            "user_plants"}
        </Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={22} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={{ uri: getImageUrl(userData?.profileImage) }}
          style={styles.avatar}
        />
        <View style={styles.profileText}>
          <Text style={styles.displayName}>{userData?.fullName}</Text>
          <Text style={styles.bio}>
            {userData?.gender === "Female" ? "Plant Queen 🌿" : "Plant King 🌿"}{" "}
            | Born {userData?.birthday}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{userData?.plants?.length || 0}</Text>
          <Text style={styles.statLabel}>Plants</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>1.2k</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>450</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <FlatList
        data={userData?.plants}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <Image
            source={{ uri: getImageUrl(item.image) }}
            style={styles.gridImage}
          />
        )}
        contentContainerStyle={styles.gridContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#061106" },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#061106",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  username: { color: "white", fontSize: 18, fontWeight: "700" },
  profileSection: {
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 10,
  },
  avatar: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    borderWidth: 1,
    borderColor: "#1B4D1B",
  },
  profileText: { marginLeft: 15, flex: 1 },
  displayName: { color: "white", fontSize: 22, fontWeight: "bold" },
  bio: { color: "#BBBBBB", fontSize: 13, marginTop: 4, lineHeight: 18 },
  editButton: {
    backgroundColor: "#112B11",
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  editButtonText: { color: "#4ADE80", fontWeight: "bold", fontSize: 15 },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  statCard: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    borderColor: "#1B4D1B",
    paddingVertical: 15,
    borderRadius: 20,
    width: (width - 60) / 3,
  },
  statNumber: { color: "white", fontSize: 18, fontWeight: "bold" },
  statLabel: { color: "#888", fontSize: 12, marginTop: 2 },
  gridContainer: { paddingBottom: 20 },
  gridImage: {
    width: width / 3,
    height: width / 3,
    borderWidth: 0.5,
    borderColor: "#061106",
  },
});

export default ProfileScreen;
