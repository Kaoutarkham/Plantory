import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/onboarding/SplashScreen";
import OnboardingOne from "../screens/onboarding/OnboardingOne";
import OnboardingTwo from "../screens/onboarding/OnboardingTwo";
import OnboardingThree from "../screens/onboarding/OnboardingThree";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

// REMOVE OR COMMENT THIS LINE UNTIL YOU CREATE THE FILE
// import ProfileScreen from "../screens/profile/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="OnboardingOne" component={OnboardingOne} />
        <Stack.Screen name="OnboardingTwo" component={OnboardingTwo} />
        <Stack.Screen name="OnboardingThree" component={OnboardingThree} />

        <Stack.Screen name="loginScreen" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        {/* REMOVE THIS UNTIL YOU HAVE THE PROFILE FILE READY */}
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
