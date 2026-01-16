import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";

export default function OnboardingTwo({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Staggered Grid Section */}
        <View style={styles.gridContainer}>
          <View style={styles.column}>
            <View style={styles.card}>
              <Image
                source={require("../../../assets/images/OnboardingTwo.jpg")}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>
                A smiling woman with her Scindapsus pictus plant
              </Text>
              <Text style={styles.cardSubtitle}>
                So proud of this new leaf!
              </Text>
            </View>
          </View>

          <View style={[styles.column, { marginTop: 60 }]}>
            <View style={styles.card}>
              <Image
                source={require("../../../assets/images/OnboardingTwo1.jpg")}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>
                A close-up of a new Philodendron leaf
              </Text>
              <Text style={styles.cardSubtitle}>My new Philodendron!</Text>
            </View>
          </View>
        </View>

        {/* Text Content Section */}
        <View style={styles.textContent}>
          <Text style={styles.mainTitle}>Join the Plant{"\n"}Community</Text>
          <Text style={styles.description}>
            Connect with fellow plant lovers, share tips, and celebrate growth
            together.
          </Text>
        </View>

        {/* 2. THE NAVIGATION CODE GOES HERE */}
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => {
            console.log("Navigating to OnboardingThree");
            // Using replace prevents the user from going back to onboarding
            navigation.replace("OnboardingThree");
          }}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A1A0F",
  },
  scrollContent: {
    paddingHorizontal: 20,
    alignItems: "center",
    paddingBottom: 40,
  },
  gridContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 125,
  },
  column: {
    width: "47%",
  },
  card: {
    width: "100%",
  },
  cardImage: {
    width: "100%",
    height: 180,
    borderRadius: 45,
    marginBottom: 12,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 18, 
    fontFamily: "Poppins-Bold",
    lineHeight: 22,
    marginTop: 8,
  },
  cardSubtitle: {
    color: "#A1A1A1",
    fontSize: 14, 
    marginTop: 4,
    fontFamily: "Poppins-Regular", 
  },
  textContent: {
    marginTop: 40,
    alignItems: "center",
  },
  mainTitle: {
    fontSize: 34,
    fontWeight: "900",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 42,
  },
  description: {
    fontSize: 15,
    color: "#D1D1D1",
    textAlign: "center",
    marginTop: 15,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  getStartedButton: {
    backgroundColor: "#0E3311",
    width: "100%",
    paddingVertical: 18,
    borderRadius: 35,
    marginTop: 50,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1A4D1F",
  },
  buttonText: {
    color: "#00FF41",
    fontSize: 18,
    fontWeight: "bold",
  },
});
