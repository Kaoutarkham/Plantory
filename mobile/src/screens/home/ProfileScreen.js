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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../services/api"; // T-akkdi mn l-path dyal api.js

const { width } = Dimensions.get("window");

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch User Data mn l-Backend
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const storedId = await AsyncStorage.getItem("userId");

      if (!storedId) {
        return navigation.replace("Login");
      }

      // Kan-siftu request l-backend: /api/users/profile/9
      const response = await api.get(`/users/profile/${storedId}`);
      setUserData(response.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
      if (err.response?.status === 401) {
        navigation.replace("Login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4ADE80" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header Row */}
      <View style={styles.topHeader}>
        <View style={{ width: 24 }} />
        <Text style={styles.usernameTitle}>
          {userData?.username || "user_plantory"}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={userData?.plants || []}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            {/* Profile Info: Avatar + Bio */}
            <View style={styles.infoRow}>
              <Image
                source={{
                  uri:
                    userData?.profileImage || "https://via.placeholder.com/150",
                }}
                style={styles.avatar}
              />
              <View style={styles.textContainer}>
                <Text style={styles.displayName}>{userData?.fullName}</Text>
                <Text style={styles.bio}>
                  Lover of all things green. Sharing my plant journey, one leaf
                  at a time. 🌿
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate("EditProfile")}
            >
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>
                  {userData?.plants?.length || 0}
                </Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>256</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>189</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
            </View>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.gridItem}
            onPress={() => {
              navigation.navigate("PostDetail", {
                plantId: item.id,
                imageUri: item.image,
              });
            }}
          >
            <Image source={{ uri: item.image }} style={styles.gridImage} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View style={{ alignItems: "center", marginTop: 50 }}>
            <Text style={{ color: "#888" }}>No plants posted yet 🌿</Text>
          </View>
        )}
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
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  usernameTitle: { color: "white", fontSize: 18, fontWeight: "bold" },
  headerContainer: { paddingBottom: 10 },
  infoRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 10,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#1B3B1B",
    borderWidth: 1,
    borderColor: "#4ADE80",
  },
  textContainer: { marginLeft: 20, flex: 1 },
  displayName: { color: "white", fontSize: 20, fontWeight: "bold" },
  bio: { color: "#A0A0A0", fontSize: 14, marginTop: 4, lineHeight: 18 },
  editButton: {
    backgroundColor: "#153B15",
    marginHorizontal: 20,
    marginTop: 25,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  editButtonText: { color: "#4ADE80", fontWeight: "600", fontSize: 14 },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  statBox: {
    alignItems: "center",
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#1B3B1B",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
  },
  statNumber: { color: "white", fontSize: 18, fontWeight: "bold" },
  statLabel: { color: "#888", fontSize: 12 },
  gridItem: {
    width: width / 3,
    height: width / 3,
    padding: 1,
  },
  gridImage: {
    width: "100%",
    height: "100%",
  },
});

export default ProfileScreen;
