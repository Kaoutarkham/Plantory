import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";

// Destructure { navigation } from props to allow screen switching
export default function OnboardingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Top Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/images/onboardingOne.jpg")}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* Bottom Content Section */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Your Green Journey{"\n"}Starts Here</Text>

        <Text style={styles.description}>
          Discover plant care tips, connect with other plant lovers, and watch
          your collective thrive.
        </Text>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => {
              // Replace "Login" with the name of your next screen
              console.log("Navigating to onboardingTwo");
              navigation.navigate("OnboardingTwo");
            }}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => {
              // Usually skip goes straight to the Main/Home app
              console.log("Skip Pressed");
              // navigation.replace("MainTabs");
            }}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#17311a",
  },
  imageContainer: {
    flex: 1.2,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0A1A0F",
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 40,
  },
  description: {
    fontSize: 16,
    color: "#D1D1D1",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
    fontFamily: "System",
  }, // Added missing brace here
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  continueButton: {
    backgroundColor: "#0E3311",
    width: "100%",
    paddingVertical: 18,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#1A4D1F",
    alignItems: "center",
    marginBottom: 20,
  },
  continueText: {
    color: "#00FF41",
    fontSize: 18,
    fontWeight: "bold",
  },
  skipButton: {
    paddingVertical: 10,
  },
  skipText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
