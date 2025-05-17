// import React, { useEffect, useState } from "react";
// import {
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   Alert,
// } from "react-native";
// import * as FileSystem from "expo-file-system";

// const AdminProfileScreen = () => {
//   const fileUri = FileSystem.documentDirectory + "config.json";

//   const [adminData, setAdminData] = useState({
//     instituteName: "",
//     ownerName: "",
//     email: "admincsew@gmail.com", // Hardcoded
//     password: "",
//     address: "",
//   });

//   // Load existing data (if available)
//   useEffect(() => {
//     const loadAdminData = async () => {
//       try {
//         const file = await FileSystem.readAsStringAsync(fileUri);
//         console.log("Admin Info:", file);

//         const data = JSON.parse(file);
//         if (data.email === "admincsew@gmail.com") {
//           setAdminData(data);
//         }
//       } catch (error) {
//         console.log("No existing admin config found.");
//       }
//     };

//     loadAdminData();
//   }, []);

//   const handleSave = async () => {
//     try {
//       const updatedData = {
//         ...adminData,
//         email: "admincsew@gmail.com",
//         role: "admin",
//       };
//       await FileSystem.writeAsStringAsync(
//         fileUri,
//         JSON.stringify(updatedData, null, 2)
//       );
//       Alert.alert("Success", "Admin profile updated!");
//     } catch (error) {
//       console.error("Save error:", error);
//       Alert.alert("Error", "Could not save admin profile.");
//     }
//     console.log("Saved to:", fileUri);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Admin Profile</Text>

//       <Text style={styles.label}>Institute Name</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Institute Name"
//         value={adminData.instituteName}
//         onChangeText={(text) =>
//           setAdminData({ ...adminData, instituteName: text })
//         }
//       />

//       <Text style={styles.label}>Owner Name</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Owner Name"
//         value={adminData.ownerName}
//         onChangeText={(text) => setAdminData({ ...adminData, ownerName: text })}
//       />

//       <Text style={styles.label}>Email (not editable)</Text>
//       <TextInput
//         style={styles.input}
//         value={adminData.email}
//         editable={false}
//       />

//       <Text style={styles.label}>Password</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Password"
//         secureTextEntry
//         value={adminData.password}
//         onChangeText={(text) => setAdminData({ ...adminData, password: text })}
//       />

//       <Text style={styles.label}>Address</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Address"
//         value={adminData.address}
//         onChangeText={(text) => setAdminData({ ...adminData, address: text })}
//       />

//       <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//         <Text style={styles.saveButtonText}>Save Changes</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// export default AdminProfileScreen;

import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import * as FileSystem from "expo-file-system";

const AdminProfileScreen = () => {
  const fileUri = FileSystem.documentDirectory + "config.json";

  const [adminData, setAdminData] = useState({
    instituteName: "",
    ownerName: "",
    email: "admincsew@gmail.com", // Hardcoded
    password: "",
    address: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        const file = await FileSystem.readAsStringAsync(fileUri);
        const data = JSON.parse(file);
        if (data.email === "admincsew@gmail.com") {
          setAdminData(data);
        }
      } catch (error) {
        console.log("No existing admin config found.");
      }
    };
    loadAdminData();
  }, []);

  const handleSave = async () => {
    try {
      const updatedData = {
        ...adminData,
        email: "admincsew@gmail.com",
        role: "admin",
      };
      await FileSystem.writeAsStringAsync(
        fileUri,
        JSON.stringify(updatedData, null, 2)
      );
      Alert.alert("Success", "Admin profile updated!");
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Save error:", error);
      Alert.alert("Error", "Could not save admin profile.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Admin Profile</Text>

      <Text style={styles.label}>Institute Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Institute Name"
        value={adminData.instituteName}
        editable={isEditing}
        onChangeText={(text) =>
          setAdminData({ ...adminData, instituteName: text })
        }
      />

      <Text style={styles.label}>Owner Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Owner Name"
        value={adminData.ownerName}
        editable={isEditing}
        onChangeText={(text) =>
          setAdminData({ ...adminData, ownerName: text })
        }
      />

      <Text style={styles.label}>Email (not editable)</Text>
      <TextInput style={styles.input} value={adminData.email} editable={false} />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry
        value={adminData.password}
        editable={isEditing}
        onChangeText={(text) =>
          setAdminData({ ...adminData, password: text })
        }
      />

      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Address"
        value={adminData.address}
        editable={isEditing}
        onChangeText={(text) =>
          setAdminData({ ...adminData, address: text })
        }
      />

      {!isEditing ? (
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditing(true)}
        >
          <Text style={styles.saveButtonText}>Edit</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default AdminProfileScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4", // Soft background
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2D9CDB", // Primary blue
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  saveButton: {
    backgroundColor: "#2D9CDB",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  editButton: {
    backgroundColor: "#4CAF50", // Green
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
  },

  label: {
    alignSelf: "flex-start",
    fontSize: 16,
    color: "#333",
    marginBottom: 6,
    marginTop: 10,
    fontWeight: "500",
  },
});
