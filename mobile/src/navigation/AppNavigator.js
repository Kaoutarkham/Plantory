import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Onboarding & Auth
import SplashScreen from "../screens/onboarding/SplashScreen";
import OnboardingOne from "../screens/onboarding/OnboardingOne";
import OnboardingTwo from "../screens/onboarding/OnboardingTwo";
import OnboardingThree from "../screens/onboarding/OnboardingThree";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

// Main Screens
import FeedScreen from "../screens/home/feedScreen"; // ✅ Fixed import
import ProfileScreen from "../screens/home/ProfileScreen";
import PostDetailScreen from "../screens/home/PostDetailScreen"; // ✅ Use the correct one

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// ✅ Main Tabs (Bottom Navigation)
function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
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
          if (route.name === "Feed")
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
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Search" component={FeedScreen} />
      <Tab.Screen name="Add" component={FeedScreen} />
      <Tab.Screen name="Activity" component={FeedScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// ✅ Main Stack Navigator
export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Onboarding Flow */}
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="OnboardingOne" component={OnboardingOne} />
      <Stack.Screen name="OnboardingTwo" component={OnboardingTwo} />
      <Stack.Screen name="OnboardingThree" component={OnboardingThree} />

      {/* Auth Flow */}
      <Stack.Screen name="loginScreen" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />

      {/* Main App (Tabs) */}
      <Stack.Screen name="MainApp" component={MainTabs} />

      {/* Post Detail (Full Screen) */}
      <Stack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={{
          animation: "slide_from_right",
          presentation: "card",
        }}
      />
    </Stack.Navigator>
  );
}
