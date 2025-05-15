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

  // Load existing data (if available)
  useEffect(() => {
    const loadAdminData = async () => {
      try {
        const file = await FileSystem.readAsStringAsync(fileUri);
        console.log("Admin Info:", file);

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
    } catch (error) {
      console.error("Save error:", error);
      Alert.alert("Error", "Could not save admin profile.");
    }
    console.log("Saved to:", fileUri);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Admin Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Institute Name"
        value={adminData.instituteName}
        onChangeText={(text) =>
          setAdminData({ ...adminData, instituteName: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Owner Name"
        value={adminData.ownerName}
        onChangeText={(text) => setAdminData({ ...adminData, ownerName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={adminData.email}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={adminData.password}
        onChangeText={(text) => setAdminData({ ...adminData, password: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={adminData.address}
        onChangeText={(text) => setAdminData({ ...adminData, address: text })}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AdminProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 14,
    marginBottom: 15,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#2D9CDB",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
