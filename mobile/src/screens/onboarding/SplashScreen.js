import { StyleSheet, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function SplashScreen({ navigation }) {
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Run the animations//
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to Onboarding after the animation finishes
    const timer = setTimeout(() => {
      // Make sure "Onboarding" matches the name in your AppNavigator.js
      navigation.replace("OnboardingOne");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient colors={["#ffffff", "#9cd6aa"]} style={styles.container}>
      <Animated.Image
        source={require("../../../assets/logo.png")}
        style={[
          styles.logo,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
        resizeMode="contain"
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 180,
    height: 180,
  },
});
