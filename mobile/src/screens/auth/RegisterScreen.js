import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { api } from "../../services/api";

export default function RegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState(null);
  const [birthday, setBirthday] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Error",
        "We need your gallery permission to set a profile picture.",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/users/register", {
        fullName,
        email,
        password,
        gender,
        birthday,
        profileImage: image,
      });

      if (response.status === 201 || response.status === 200) {
        Alert.alert("Success", "Welcome to Plantory!");
        navigation.navigate("loginScreen");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Registration failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header simple et élégant */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={30}
              color="#fff"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Account</Text>
          <View style={{ width: 30 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Avatar avec Badge Caméra */}
          <TouchableOpacity
            style={styles.avatarSection}
            onPress={pickImage}
            activeOpacity={0.7}
          >
            <View style={styles.avatarPlaceholder}>
              {image ? (
                <Image source={{ uri: image }} style={styles.avatarImage} />
              ) : (
                <MaterialCommunityIcons
                  name="account"
                  size={60}
                  color="#3a4a3a"
                />
              )}
              <View style={styles.cameraBadge}>
                <MaterialCommunityIcons
                  name="camera-plus"
                  size={16}
                  color="#000"
                />
              </View>
            </View>
            <Text style={styles.avatarLabel}>Add a Profile Picture</Text>
          </TouchableOpacity>

          <View style={styles.form}>
            {/* Champs de saisie optimisés */}
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#555"
              value={fullName}
              onChangeText={setFullName}
            />

            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#555"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#555"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <Text style={styles.label}>Gender</Text>
            <View style={styles.genderRow}>
              <TouchableOpacity
                style={[
                  styles.genderBtn,
                  gender === "Female" && styles.genderActive,
                ]}
                onPress={() => setGender("Female")}
              >
                <Text
                  style={[
                    styles.genderText,
                    gender === "Female" && styles.textActive,
                  ]}
                >
                  Female
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.genderBtn,
                  gender === "Male" && styles.genderActive,
                ]}
                onPress={() => setGender("Male")}
              >
                <Text
                  style={[
                    styles.genderText,
                    gender === "Male" && styles.textActive,
                  ]}
                >
                  Male
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Birthday</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#555"
              value={birthday}
              onChangeText={setBirthday}
            />

            {/* Bouton "Complete Registration" vert */}
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.primaryBtnText}>Complete Registration</Text>
              )}
            </TouchableOpacity>

            <Text style={styles.footerNote}>
              By completing registration you agree to our
              <Text style={styles.linkText}> Terms of Service </Text>
              and <Text style={styles.linkText}> Privacy Policy</Text>.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#070f07" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: 60,
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  scrollContent: { paddingHorizontal: 25, paddingBottom: 40 },
  avatarSection: { alignItems: "center", marginVertical: 20 },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#152015",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderWidth: 1,
    borderColor: "#2a3a2a",
  },
  avatarImage: { width: "100%", height: "100%", borderRadius: 50 },
  cameraBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#070f07",
  },
  avatarLabel: {
    color: "#fff",
    marginTop: 12,
    fontSize: 16,
    fontWeight: "600",
  },
  form: { width: "100%" },
  label: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#2a3a2a",
    borderRadius: 30,
    height: 50,
    paddingHorizontal: 20,
    color: "#fff",
  },
  genderRow: { flexDirection: "row", justifyContent: "space-between" },
  genderBtn: {
    flex: 0.48,
    borderWidth: 1,
    borderColor: "#2a3a2a",
    borderRadius: 30,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  genderActive: { borderColor: "#1b5e20", backgroundColor: "#0c2b0c" },
  genderText: { color: "#555", fontSize: 14 },
  textActive: { color: "#fff", fontWeight: "bold" },
  primaryBtn: {
    backgroundColor: "#1b5e20",
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  primaryBtnText: { color: "#4cf551", fontSize: 16, fontWeight: "bold" },
  footerNote: {
    color: "#555",
    fontSize: 11,
    textAlign: "center",
    marginTop: 25,
    lineHeight: 18,
  },
  linkText: { color: "#fff", fontWeight: "bold" },
});
