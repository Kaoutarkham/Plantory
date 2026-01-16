import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/onboarding/SplashScreen";
import OnboardingOne from "../screens/onboarding/OnboardingOne";
import OnboardingTwo from "../screens/onboarding/OnboardingTwo";
import OnboardingThree from "../screens/onboarding/OnboardingThree";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* FIRST SCREEN: The app starts here */}
        <Stack.Screen name="Splash" component={SplashScreen} />

        {/* OTHER SCREENS */}
        <Stack.Screen name="OnboardingOne" component={OnboardingOne} />
        <Stack.Screen name="OnboardingTwo" component={OnboardingTwo} />
        <Stack.Screen name="OnboardingThree" component={OnboardingThree} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
