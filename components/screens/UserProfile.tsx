import {
  getDetailsForUserProfile,
  getUserId,
  updateUserProfile,
} from "@/services/userService";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UserProfile = () => {
  const [displayName, setDisplayName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const id = await getUserId();
      if (id) {
        setUserId(id);
      }

      if (!id) {
        console.error("User ID not found.");
        setLoading(false);
        return;
      }

      const { data, error } = await getDetailsForUserProfile(id);

      if (error) {
        console.error("Failed to fetch user details:", error);
      } else if (data) {
        setDisplayName(data.display_name);
        setAddress(data.address);
      }

      setLoading(false);
    };

    fetchUserDetails();
  }, []);

  const handleSave = async () => {
    if (!userId) return;

    const { data, error } = await updateUserProfile(
      userId,
      displayName,
      address
    );

    if (error) {
      Alert.alert("Error", "Failed to update profile.");
    } else {
      Alert.alert("Success", "Profile updated successfully.");
      setEditing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>User Profile</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#2D9CDB" />
      ) : (
        <>
          <View style={styles.detailContainer}>
            <Text style={styles.label}>Display Name</Text>
            <TextInput
              style={styles.input}
              value={displayName}
              onChangeText={setDisplayName}
              editable={editing}
            />
          </View>

          <View style={styles.detailContainer}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={[styles.input, { height: 100 }]}
              value={address}
              onChangeText={setAddress}
              editable={editing}
              multiline
            />
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={editing ? handleSave : () => setEditing(true)}
          >
            <Text style={styles.saveButtonText}>
              {editing ? "Save Changes" : "Edit Profile"}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

export default UserProfile;

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
  detailContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
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
