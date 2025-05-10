import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  AdminDashboard: undefined;
  AdminProfileScreen: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AdminDashboard"
>;
const AdminDashboard = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Text style={styles.subtitle}>Welcome, Admin!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AdminProfileScreen")}
      >
        <Text style={styles.buttonText}>Go to Admin Profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eef",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4A90E2",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AdminDashboard;
