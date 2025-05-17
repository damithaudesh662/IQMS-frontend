// import { useNavigation } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import React from "react";
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { Image } from "react-native";


// // Define your navigation parameter list type
// type RootStackParamList = {
//   Home: undefined;
//   SignIn: undefined;
//   CreateUserAccount: undefined;
// };

// // Create a typed navigation prop
// type HomeScreenNavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   "Home"
// >;
// const HomeScreen = () => {
//   const navigation = useNavigation<HomeScreenNavigationProp>();

//   const handleSignIn = () => {
//     navigation.navigate("SignIn");
//   };

//   const handleCreateAccount = () => {
//     // Handle create account logic here
//     navigation.navigate("CreateUserAccount");
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <Text style={styles.title}>Welcome</Text>
//           <Text style={styles.subtitle}>No More Waiting In Lines!</Text>
//         </View>

//         <View style={styles.logoContainer}>
//           <Image
//             source={require("@/assets/logo.png")} // make sure the path is correct
//             style={styles.logoImage}
//             resizeMode="contain"
//           />
//         </View>

//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={styles.signInButton}
//             onPress={handleSignIn}
//             activeOpacity={0.8}
//           >
//             <Text style={styles.signInButtonText}>Sign In</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.createAccountButton}
//             onPress={handleCreateAccount}
//             activeOpacity={0.8}
//           >
//             <Text style={styles.createAccountButton}>
//               New Here? Create an account
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#f7f7f7",
//   },
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: "space-between",
//   },
//   header: {
//     alignItems: "center",
//     marginTop: 40,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#666",
//     textAlign: "center",
//   },
//   logoContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     marginVertical: 60,
//   },
//   logoPlaceholder: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     backgroundColor: "#e0e0e0",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   logoText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#999",
//   },
//   buttonContainer: {
//     marginBottom: 40,
//   },
//   signInButton: {
//     backgroundColor: "#4A90E2",
//     paddingVertical: 16,
//     borderRadius: 8,
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   signInButtonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   createAccountButton: {
//     alignItems: "center",
//     padding: 8,
//     color: "#4A90E2",
//   },
//   createAccountText: {
//     color: "#4A90E2",
//     fontSize: 16,
//   },
//   logoImage: {
//   width: 150,
//   height: 150,
// },

// });

// export default HomeScreen;
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

// Define your navigation parameter list type
type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
  CreateUserAccount: undefined;
};

// Create a typed navigation prop
type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleSignIn = () => {
    navigation.navigate("SignIn");
  };

  const handleCreateAccount = () => {
    // Handle create account logic here
    navigation.navigate("CreateUserAccount");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>No More Waiting In Lines!</Text>
        </View>

        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Image
              source={require("@/assets/logo.png")}
              style={styles.logoImage}
              resizeMode="cover"
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.signInButton}
            onPress={handleSignIn}
            activeOpacity={0.8}
          >
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.createAccountButtonContainer}
            onPress={handleCreateAccount}
            activeOpacity={0.8}
          >
            <Text style={styles.createAccountText}>
              New Here? Create an account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
    padding: 20,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    marginTop: 40,
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
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 60,
  },
  logoCircle: {
    width: 250,
    height: 200,
    borderRadius: 80,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    overflow: "hidden", // This ensures the image stays within the circular boundary
    borderWidth: 2,
    borderColor: "#e0e0e0",
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    marginBottom: 40,
  },
  signInButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  signInButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  createAccountButtonContainer: {
    alignItems: "center",
    padding: 8,
  },
  createAccountText: {
    color: "#4A90E2",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default HomeScreen;