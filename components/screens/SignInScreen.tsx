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
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  SignInScreen: undefined;
  UserDashboard: undefined; // Add the CreateUserAccount screen type
  AdminDashboard: undefined; // Add the CreateUserAccount screen type
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SignInScreen"
>;
const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<HomeScreenNavigationProp>();

  // const handleSignIn = () => {
  //   // Implement your sign in logic here
  //   console.log('Sign in with:', email, password);
  // };
  const handleSignIn = () => {
    if (email === "usercsew@gmail.com" && password === "1234") {
      navigation.navigate("UserDashboard"); // Change to your actual user dashboard screen name
    } else if (email === "admincsew@gmail.com" && password === "1234") {
      navigation.navigate("AdminDashboard"); // Change to your actual admin dashboard screen name
    } else {
      Alert.alert("Invalid Credentials", "Email or password is incorrect.");
    }
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password screen
    console.log("Forgot password");
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
              <Text style={styles.title}>Sign In</Text>
              <Text style={styles.subtitle}>
                Welcome back! Please sign in to continue
              </Text>
            </View>

            <View style={styles.formContainer}>
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

              <TouchableOpacity
                style={styles.forgotPasswordButton}
                onPress={handleForgotPassword}
              >
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.signInButton}
                onPress={handleSignIn}
                activeOpacity={0.8}
              >
                <Text style={styles.signInButtonText}>Sign In</Text>
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
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#4A90E2",
    fontSize: 14,
  },
  signInButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  signInButtonText: {
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

export default SignInScreen;
