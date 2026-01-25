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
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { api } from "../../services/api";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      /*  await api.post("/users/login", {
        email: email.trim(),
        password: password,
      });*/

      navigation.replace("Profile");
    } catch (e) {
      console.log("Login Error:", e.message);

      Alert.alert(
        "Login Failed",
        "Could not connect to the server. Please check your backend connection.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require("../../../assets/images/welcome.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <SafeAreaView style={styles.contentContainer}>
            {/* Header Section */}
            <View style={styles.headerSection}>
              <Text style={styles.headerTitle}>Welcome Back!</Text>
              <Text style={styles.headerSubtitle}>Happy to see you again!</Text>
            </View>

            {/* Form Section */}
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
                  keyboardType="email-address"
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

              {/* Login Button */}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#4ADE80" />
                ) : (
                  <Text style={styles.loginButtonText}>Login</Text>
                )}
              </TouchableOpacity>

              {/* Footer / Register Link */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account? </Text>
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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  backgroundImage: { flex: 1, width: "100%" },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
  },
  contentContainer: {
    paddingHorizontal: 30,
    flex: 1,
    justifyContent: "center",
  },
  headerSection: {
    marginBottom: 40,
    alignItems: "center",
  },
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
  label: {
    color: "#fff",
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "600",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(10, 30, 10, 0.8)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 40,
    paddingHorizontal: 20,
    height: 60,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
  },
  forgotText: {
    color: "#4cf551",
    textAlign: "right",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 5,
  },
  loginButton: {
    backgroundColor: "#1b5e20",
    height: 60,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    borderWidth: 1,
    borderColor: "#1b5e20",
    elevation: 5,
  },
  loginButtonText: {
    color: "#4cf551",
    fontSize: 20,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  footerText: {
    color: "#fff",
    fontSize: 15,
  },
  createOneText: {
    color: "#4cf551",
    fontWeight: "bold",
    fontSize: 15,
  },
});
