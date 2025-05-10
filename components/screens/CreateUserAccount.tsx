import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  CreateUserAccount: undefined;
  CreateAdminAccount: undefined; // Add the CreateUserAccount screen type
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "CreateUserAccount"
>;
const CreateAccountScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleCreateAccount = async (isAdmin = false) => {
    if (!name || !email || !password || !address) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    const userInfo = {
      name,
      email,
      password,
      address,
      role: isAdmin ? "admin" : "user",
    };

    const fileUri = FileSystem.documentDirectory + "config.json";

    try {
      await FileSystem.writeAsStringAsync(
        fileUri,
        JSON.stringify(userInfo, null, 2)
      );
      Alert.alert("Success", `${isAdmin ? "Admin" : "User"} account created!`);
    } catch (error) {
      console.error("File write error:", error);
      Alert.alert("Error", "Failed to save user info.");
    }
    console.log("Saved to:", fileUri);
    console.log("User Info:", userInfo);
  };

  const handleCreateAdminAccount = async () => {
    navigation.navigate("CreateAdminAccount"); // go back to login page
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.header}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>
                Fill the details below to register
              </Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your address"
                  value={address}
                  onChangeText={setAddress}
                />
              </View>

              <TouchableOpacity
                style={styles.createButton}
                onPress={() => handleCreateAccount(false)}
              >
                <Text style={styles.buttonText}>Create Account</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.adminButton}
                onPress={() => handleCreateAdminAccount()}
              >
                <Text style={styles.buttonText}>Create Admin Account</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  createButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  adminButton: {
    backgroundColor: "#2D9CDB",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  backButton: {
    alignItems: "center",
    padding: 16,
    marginBottom: 20,
  },
  backButtonText: {
    color: "#666",
    fontSize: 16,
  },
});

export default CreateAccountScreen;
