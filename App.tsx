import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import ProfileScreen from "./ProfileScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <ProfileScreen />
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
