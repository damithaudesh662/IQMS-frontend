import { Stack } from "expo-router";
import "./globals.css";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="InstituteMarketPlace"
        options={{ title: "Institutes" }}
      />
    </Stack>
  );
}
