import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      {/* <Provider store={store}> */}
      <AppNavigator />
      {/* </Provider> */}
    </SafeAreaProvider>
  );
}
