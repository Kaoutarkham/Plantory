import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  ImageBackground,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { api } from "../../services/api";

// STEP 1: Add { navigation } here so the screen can switch pages
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      // Your API is using the IP: 192.168.0.116
      await api.post("/users/login", { email, password });
      Alert.alert("Success", "Welcome back!");
      // navigation.navigate("Profile"); // Uncomment this once you create the Profile file
    } catch (e) {
      Alert.alert(
        "Network Error",
        "Check your backend connection at 192.168.0.116",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={require("../../../assets/images/welcome.jpg")}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <SafeAreaView style={styles.contentContainer}>
              <View style={styles.headerSection}>
                <Text style={styles.headerTitle}>Welcome Back!</Text>
                <Text style={styles.headerSubtitle}>
                  Happy to see you again!
                </Text>
              </View>

              <View style={styles.formSection}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={20}
                    color="#fff"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#777"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                  />
                </View>

                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons
                    name="lock-outline"
                    size={20}
                    color="#fff"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#777"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>

                <TouchableOpacity>
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleLogin}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.loginButtonText}>Login</Text>
                  )}
                </TouchableOpacity>

                <View style={styles.footer}>
                  <Text style={styles.footerText}>Don't have an account? </Text>
                  {/* STEP 2: Add the navigation.navigate call here */}
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                  >
                    <Text style={styles.createOneText}>Create one</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </SafeAreaView>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaProvider>
  );
}

// ... styles remain exactly the same as you provided ...
const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: { flex: 1, width: "100%" },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
  },
  contentContainer: {
    paddingHorizontal: 30,
    flex: 1,
    justifyContent: "center",
  },
  headerSection: { marginBottom: 40, alignItems: "center" },
  headerTitle: {
    fontSize: 38,
    fontWeight: "900",
    color: "#fff",
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 18,
    color: "#ccc",
    textAlign: "center",
    marginTop: 5,
  },
  label: { color: "#fff", marginBottom: 8, fontSize: 18, fontWeight: "bold" },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(10, 30, 10, 0.8)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 40,
    paddingHorizontal: 20,
    height: 60,
    marginBottom: 15,
  },
  input: { flex: 1, color: "#fff", marginLeft: 10, fontSize: 16 },
  forgotText: {
    color: "#00FF00",
    textAlign: "right",
    fontSize: 14,
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "#1B5E20",
    height: 60,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  loginButtonText: { color: "#00FF00", fontSize: 22, fontWeight: "bold" },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 30 },
  footerText: { color: "#fff", fontSize: 15 },
  createOneText: { color: "#00FF00", fontWeight: "bold", fontSize: 15 },
});
