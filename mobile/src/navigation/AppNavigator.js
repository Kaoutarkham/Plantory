import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// --- SCREEN IMPORTS (Fixed Spelling) ---
import SplashScreen from "../screens/onboarding/SplashScreen";
import OnboardingOne from "../screens/onboarding/OnboardingOne";
import OnboardingTwo from "../screens/onboarding/OnboardingTwo";
import OnboardingThree from "../screens/onboarding/OnboardingThree";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import HomeScreen from "../screens/home/HomeScreen";
import ProfileScreen from "../screens/home/ProfileScreen"; // Added the 'e'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#4ADE80",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
          backgroundColor: "#061106",
          height: 70,
          paddingBottom: 12,
          borderTopColor: "#1B3B1B",
        },
        tabBarIcon: ({ color, focused }) => {
          let iconName;
          if (route.name === "Home")
            iconName = focused ? "home" : "home-outline";
          else if (route.name === "Search")
            iconName = focused ? "search" : "search-outline";
          else if (route.name === "Add")
            iconName = focused ? "add-circle" : "add-circle-outline";
          else if (route.name === "Activity")
            iconName = focused ? "notifications" : "notifications-outline";
          else if (route.name === "Profile")
            iconName = focused ? "person" : "person-outline";

          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      {/*<Tab.Screen name="Home" component={HomeScreen} />*/}
      <Tab.Screen name="Search" component={HomeScreen} />
      <Tab.Screen name="Add" component={HomeScreen} />
      <Tab.Screen name="Activity" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="OnboardingOne" component={OnboardingOne} />
      <Stack.Screen name="OnboardingTwo" component={OnboardingTwo} />
      <Stack.Screen name="OnboardingThree" component={OnboardingThree} />
      <Stack.Screen name="loginScreen" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
