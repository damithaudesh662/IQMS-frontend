import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useLayoutEffect } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { supabase } from "../../lib/supabase";

type RootStackParamList = {
  AdminDashboard: undefined;
  AdminProfileScreen: undefined;
  QueueCardsScreen: undefined;
  AdminCreateQueueScreen: undefined;
  SignIn: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AdminDashboard"
>;
const AdminDashboard = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "",
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 16 }}
          onPress={async () => {
            const { error } = await supabase.auth.signOut();
            if (error) {
              Alert.alert("Error", error.message);
            } else {
              navigation.replace("SignIn");
            }
          }}
        >
          <Text style={{ color: "#007AFF", fontWeight: "bold" }}>Sign Out</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

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

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("QueueCardsScreen")}
      >
        <Text style={styles.buttonText}>View Queues</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AdminCreateQueueScreen")}
      >
        <Text style={styles.buttonText}>Create Queue</Text>
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
    width: "60%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default AdminDashboard;
