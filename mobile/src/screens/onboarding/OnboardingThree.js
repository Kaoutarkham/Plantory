import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function OnboardingThree({ navigation }) {
  let [fontsLoaded] = useFonts({
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-Bold": Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" transparent translucent />

      {/* 1. Background Image - Make sure the path is correct */}
      <ImageBackground
        source={require("../../../assets/images/OnboardingThree.jpg")}
        style={styles.background}
      >
        {/* Dark overlay to make text readable */}
        <View style={styles.overlay}>
          <SafeAreaView style={styles.content}>
            {/* 2. Text Section */}
            <View style={styles.textContainer}>
              <Text style={styles.title}>Plantory</Text>
              <Text style={styles.subtitle}>
                Your Plant Journey Starts Here
              </Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {console.log("CLICK");
                navigation.replace("loginScreen");
              }}

            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)", 
    justifyContent: "center",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 60,
  },
  textContainer: {
    alignItems: "center",
    marginTop: "50%", 
  },
  title: {
    fontSize: 54,
    color: "#FFFFFF",
    fontFamily: "Poppins-Bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#FFFFFF",
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    marginTop: 5,
  },
  button: {
    backgroundColor: "rgba(14, 51, 17, 0.7)", 
    width: "85%",
    paddingVertical: 18,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#00FF41",
    fontSize: 18,
    fontFamily: "Poppins-Bold",
  },
});
