import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useLayoutEffect } from "react";
import {
  Alert,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

type RootStackParamList = {
  UserDashboard: undefined;
  InstituteMarketPlace: undefined;
  SignIn: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "UserDashboard"
>;
const UserDashboard = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "",
      headerRight: () => (
        <View
          style={{
            marginTop: Platform.OS === "android" ? 8 : 0,
            marginRight: 8,
          }}
        >
          <TouchableOpacity
            className="bg-blue-500 px-4 py-2 rounded-lg mr-4"
            activeOpacity={0.8}
            onPress={async () => {
              const { error } = await supabase.auth.signOut();
              if (error) {
                Alert.alert("Error", error.message);
              } else {
                navigation.replace("SignIn");
              }
            }}
          >
            <Text className="text-white font-bold text-base text-center">
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>User Dashboard</Text>
      <Text style={styles.subtitle}>Welcome, User!</Text>
      <TouchableOpacity
        style={styles.button}
        // onPress={() => navigation.navigate("InstituteMarketPlace")}
      >
        <Text style={styles.buttonText}>User Details</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("InstituteMarketPlace")}
      >
        <Text style={styles.buttonText}>Browse Institutes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        // onPress={() => navigation.navigate("InstituteMarketPlace")}
      >
        <Text style={styles.buttonText}>Subscribed Institutes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        // onPress={() => navigation.navigate("AdminCreateQueueScreen")}
      >
        <Text style={styles.buttonText}>Joined Queues</Text>
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

export default UserDashboard;
