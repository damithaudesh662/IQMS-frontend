// import { useNavigation } from "@react-navigation/native";
// import React, { useState } from "react";
// import {
//   Alert,
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View,
// } from "react-native";
// import * as instituteService from "../../services/instituteService";

// const CreateAdminScreen = () => {
//     const [displayName, setDisplayName] = useState("")
//     const [email, setEmail] = useState("");
//     const [contactNumber, setContactNumber] = useState("");
//     const [password, setPassword] = useState("");
//     const [address, setAddress] = useState("");
//     const navigation = useNavigation();

//     const handleCreateAdmin = async () => {
//         console.log("Button pressed");
//         if (!displayName || !email || !contactNumber || !password || !address) {
//           Alert.alert("Error", "Please fill all fields.");
//           return;
//         }

//         console.log("All fields filled");

//         const tempAdminInfo = {
//           id: Math.random().toString(),
//           displayName,
//           email,
//           password,
//           contactNumber,
//           address,
//         };

//         console.log("Submitted details:", tempAdminInfo);

//         try {
//           const { error } = await instituteService.createAdmin(tempAdminInfo);
//           if (error) {
//             Alert.alert("Error", error.message || "Something went wrong.");
//           } else {
//             Alert.alert("Success", "Admin created successfully!");
//           }
//         } catch (err) {
//           Alert.alert("Error", "Something went wrong.");
//         }
//       };

//     return (
//         <SafeAreaView style={styles.safeArea}>
//         <KeyboardAvoidingView
//             behavior={Platform.OS === "ios" ? "padding" : "height"}
//             keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
//             style={styles.container}
//         >
//             <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//             <ScrollView
//                 contentContainerStyle={styles.inner}
//                 keyboardShouldPersistTaps="handled"
//                 showsVerticalScrollIndicator={false}
//             >
//                 <View style={styles.inner}>
//                 <View style={styles.header}>
//                     <Text style={styles.title}>Create Admin Account</Text>
//                     <Text style={styles.subtitle}>Fill the details below</Text>
//                 </View>

//                 <View style={styles.formContainer}>
//                     <View style={styles.inputContainer}>
//                     <Text style={styles.label}>Display Name</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Enter Display name"
//                         value={displayName}
//                         onChangeText={setDisplayName}
//                     />
//                     </View>

//                     <View style={styles.inputContainer}>
//                     <Text style={styles.label}>Email</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Enter email"
//                         value={email}
//                         onChangeText={setEmail}
//                         keyboardType="email-address"
//                         autoCapitalize="none"
//                     />
//                     </View>

//                     <View style={styles.inputContainer}>
//                     <Text style={styles.label}>Contact Number</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Enter phone number"
//                         value={contactNumber}
//                         onChangeText={setContactNumber}
//                         keyboardType="phone-pad"
//                         autoCapitalize="none"
//                     />
//                     </View>

//                     <View style={styles.inputContainer}>
//                     <Text style={styles.label}>Password</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Enter password"
//                         value={password}
//                         onChangeText={setPassword}
//                         secureTextEntry
//                     />
//                     </View>

//                     <View style={styles.inputContainer}>
//                     <Text style={styles.label}>Address</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Enter address"
//                         value={address}
//                         onChangeText={setAddress}
//                     />
//                     </View>
//                 </View>
//                     <TouchableOpacity
//                     style={styles.createButton}
//                     onPress={handleCreateAdmin}
//                     >
//                     <Text style={styles.buttonText}>Create Admin Account</Text>
//                     </TouchableOpacity>

//                 <TouchableOpacity
//                     style={styles.backButton}
//                     onPress={() => navigation.goBack()}
//                 >
//                     <Text style={styles.backButtonText}>Back to Login</Text>
//                 </TouchableOpacity>
//                 </View>
//             </ScrollView>
//             </TouchableWithoutFeedback>
//         </KeyboardAvoidingView>
//         </SafeAreaView>
//     );
//     };

//     const styles = StyleSheet.create({
//     safeArea: {
//         flex: 1,
//         backgroundColor: "#f7f7f7",
//     },
//     container: {
//         flex: 1,
//     },
//     inner: {
//         flexGrow: 1,
//         padding: 20,
//         justifyContent: "space-between",
//     },
//     header: {
//         alignItems: "center",
//         marginTop: 40,
//         marginBottom: 30,
//     },
//     title: {
//         fontSize: 32,
//         fontWeight: "bold",
//         color: "#333",
//         marginBottom: 8,
//     },
//     subtitle: {
//         fontSize: 16,
//         color: "#666",
//         textAlign: "center",
//     },
//     formContainer: {
//         flex: 1,
//         justifyContent: "center",
//     },
//     inputContainer: {
//         marginBottom: 20,
//     },
//     label: {
//         fontSize: 16,
//         fontWeight: "500",
//         marginBottom: 8,
//         color: "#333",
//     },
//     input: {
//         backgroundColor: "#fff",
//         borderWidth: 1,
//         borderColor: "#ddd",
//         borderRadius: 8,
//         padding: 15,
//         fontSize: 16,
//     },
//     createButton: {
//         backgroundColor: "#2D9CDB",
//         paddingVertical: 16,
//         borderRadius: 8,
//         alignItems: "center",
//         marginBottom: 16,
//     },
//     buttonText: {
//         color: "white",
//         fontSize: 18,
//         fontWeight: "600",
//     },
//     backButton: {
//         alignItems: "center",
//         padding: 16,
//         marginBottom: 20,
//     },
//     backButtonText: {
//         color: "#666",
//         fontSize: 16,
//     },
//     });

// export default CreateAdminScreen;
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as instituteService from "../../services/instituteService";

const CreateAdminScreen = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const navigation = useNavigation();

  const handleCreateAdmin = async () => {
    if (!displayName || !email || !contactNumber || !password || !address) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    const tempAdminInfo = {
      id: Math.random().toString(),
      displayName,
      email,
      password,
      contactNumber,
      address,
    };

    try {
      const { error } = await instituteService.createAdmin(tempAdminInfo);
      if (error) {
        Alert.alert("Error", error.message || "Something went wrong.");
      } else {
        Alert.alert("Success", "Admin created successfully!");
      }
    } catch (err) {
      Alert.alert("Error", "Something went wrong.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>Create Admin Account</Text>
            <Text style={styles.subtitle}>Fill the form below to proceed</Text>

            <View style={styles.form}>
              {[
                {
                  label: "Display Name",
                  value: displayName,
                  setter: setDisplayName,
                  placeholder: "Enter display name",
                },
                {
                  label: "Email",
                  value: email,
                  setter: setEmail,
                  placeholder: "Enter email",
                  keyboardType: "email-address",
                },
                {
                  label: "Contact Number",
                  value: contactNumber,
                  setter: setContactNumber,
                  placeholder: "Enter phone number",
                  keyboardType: "phone-pad",
                },
                {
                  label: "Password",
                  value: password,
                  setter: setPassword,
                  placeholder: "Enter password",
                  secureTextEntry: true,
                },
                {
                  label: "Address",
                  value: address,
                  setter: setAddress,
                  placeholder: "Enter address",
                },
              ].map((field, idx) => (
                <View key={idx} style={styles.inputContainer}>
                  <Text style={styles.label}>{field.label}</Text>
                  <TextInput
                    style={styles.input}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChangeText={field.setter}
                    autoCapitalize="none"
                    secureTextEntry={field.secureTextEntry || false}
                  />
                </View>
              ))}

              <TouchableOpacity
                style={styles.createButton}
                onPress={handleCreateAdmin}
              >
                <Text style={styles.buttonText}>Create Admin Account</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.backButtonText}>Back to Login</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2D9CDB",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 24,
    textAlign: "center",
  },
  form: {
    width: "100%",
    maxWidth: 400,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  createButton: {
    backgroundColor: "#2D9CDB",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  backButton: {
    alignItems: "center",
    marginTop: 16,
  },
  backButtonText: {
    color: "#2D9CDB",
    fontSize: 16,
  },
});

export default CreateAdminScreen;
