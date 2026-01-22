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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { api } from "../../services/api"; // Path to your api.js

export default function RegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState(null);
  const [birthday, setBirthday] = useState("");
  const [loading, setLoading] = useState(false);

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
      });

      if (response.status === 201 || response.status === 200) {
        Alert.alert("Success", "Account created!");
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
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={32}
              color="#fff"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Account</Text>
          <View style={{ width: 32 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.avatarSection}>
            <View style={styles.avatarPlaceholder}>
              <View style={styles.cameraIconContainer}>
                <MaterialCommunityIcons
                  name="camera-plus"
                  size={18}
                  color="#000"
                />
              </View>
            </View>
            <Text style={styles.avatarLabel}>Add a Profile Picture</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#666"
              value={fullName}
              onChangeText={setFullName}
            />

            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#666"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <Text style={styles.label}>Gender</Text>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  gender === "Female" && styles.active,
                ]}
                onPress={() => setGender("Female")}
              >
                <Text
                  style={[styles.gText, gender === "Female" && styles.activeT]}
                >
                  Female
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  gender === "Male" && styles.active,
                ]}
                onPress={() => setGender("Male")}
              >
                <Text
                  style={[styles.gText, gender === "Male" && styles.activeT]}
                >
                  Male
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Birthday</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#666"
              value={birthday}
              onChangeText={setBirthday}
            />

            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#00FF00" />
              ) : (
                <Text style={styles.btnText}>Complete Registration</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A150A" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    height: 50,
  },
  headerTitle: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  scrollContent: { paddingHorizontal: 25, paddingBottom: 40 },
  avatarSection: { alignItems: "center", marginVertical: 20 },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#1B251B",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 5,
  },
  avatarLabel: {
    color: "#fff",
    marginTop: 12,
    fontSize: 18,
    fontWeight: "600",
  },
  form: { width: "100%" },
  label: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 30,
    height: 55,
    paddingHorizontal: 20,
    color: "#fff",
  },
  genderContainer: { flexDirection: "row", justifyContent: "space-between" },
  genderButton: {
    flex: 0.48,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 30,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  active: { borderColor: "#00FF00" },
  gText: { color: "#777" },
  activeT: { color: "#fff" },
  registerButton: {
    backgroundColor: "#1B5E20",
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
  },
  btnText: { color: "#00FF00", fontSize: 18, fontWeight: "bold" },
});
