import { QueueItem } from "@/interfaces/QueueItem";
import { useUser } from "@/utils/UserProvider";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import icons
import { supabase } from "../../lib/supabase";
import * as adminService from "../../services/adminService";
import * as instituteService from "../../services/instituteService";

type RootStackParamList = {
  AdminDashboard: undefined;
  AdminProfileScreen: undefined;
  QueueCardsScreen: { queues: QueueItem[]; isManage: boolean };
  AdminCreateQueueScreen: undefined;
  SignIn: undefined;
  CustomizePlatformScreen: undefined;
  CreateAdminScreen: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AdminDashboard"
>;

const AdminDashboard = () => {
  const { userID, instituteID, loading } = useUser();
  const [instituteName, setInstituteName] = useState("");
  const [instituteAddress, setInstituteAddress] = useState("");
  const [queueCount, setQueueCount] = useState(0);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    const fetchAdminDetails = async () => {
      const { error, instituteName, instituteAddress, queueCount } =
        await adminService.getDetailsForAdminDashboard(userID);
      if (error) {
        Alert.alert(error.message);
      } else {
        setInstituteName(instituteName);
        setInstituteAddress(instituteAddress);
        setQueueCount(queueCount);
      }
    };

    if (userID) {
      fetchAdminDetails();
    }
  }, [userID]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "",
      headerRight: undefined,
    });
  }, [navigation]);

  const handleQueueScreen = async () => {
    if (!loading && instituteID) {
      const queues = await instituteService.getQueuesByInstituteID(
        Number(instituteID)
      );
      navigation.navigate("QueueCardsScreen", {
        queues: queues,
        isManage: false,
      });
    }
  };

  const handleQueueScreenForManage = async () => {
    if (!loading && instituteID) {
      const queues = await instituteService.getQueuesByInstituteID(
        Number(instituteID)
      );
      navigation.navigate("QueueCardsScreen", {
        queues: queues,
        isManage: true,
      });
    }
  };

  const stats = {
    activeQueues: 5,
    averageWaitTime: "12 min",
    activeUsers: 134,
    appointmentsToday: 48,
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error", error.message);
    } else {
      navigation.replace("SignIn");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Admin Dashboard</Text>

        {/* Institute Info */}
        <View style={styles.instituteInfoContainer}>
          <Text style={styles.instituteName}>{instituteName}</Text>
          <Text style={styles.instituteAddress}>{instituteAddress}</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          <TouchableOpacity
            style={[styles.statCard, styles.clickableCard]}
            onPress={handleQueueScreen}
          >
            <View>
              <Text style={[styles.statLabel, styles.clickableCardText]}>
                Active Queues
              </Text>
              <Text style={[styles.statValue, styles.clickableCardText]}>
                {queueCount}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Avg Wait Time</Text>
            <Text style={styles.statValue}>{stats.averageWaitTime}</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Active Users</Text>
            <Text style={styles.statValue}>{stats.activeUsers}</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Appointments Today</Text>
            <Text style={styles.statValue}>{stats.appointmentsToday}</Text>
          </View>
        </View>

        {/* Navigation Buttons */}
        <View style={styles.iconButtonContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate("AdminProfileScreen")}
          >
            <Icon name="person" size={24} color="#fff" />
            <Text style={styles.iconButtonText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate("AdminCreateQueueScreen")}
          >
            <Icon name="queue" size={24} color="#fff" />
            <Text style={styles.iconButtonText}>Create Queue</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            // onPress={() => navigation.navigate("CustomizePlatformScreen")}
          >
            <Icon name="settings" size={24} color="#fff" />
            <Text style={styles.iconButtonText}>Customize</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={() => {}}>
            <Icon name="bar-chart" size={24} color="#fff" />
            <Text style={styles.iconButtonText}>Reports</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate("CreateAdminScreen")}
          >
            <Icon name="people" size={24} color="#fff" />
            <Text style={styles.iconButtonText}>Create Admin</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleQueueScreenForManage}
          >
            <Icon name="add-task" size={24} color="#fff" />
            <Text style={styles.iconButtonText}>Manage Queues</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signOutContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#e74c3c" }]}
            onPress={handleSignOut}
          >
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "#f2f6ff",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    backgroundColor: "#fff",
    width: "47%",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  clickableCard: {
    backgroundColor: "#4A90E2",
  },
  clickableCardText: {
    color: "#fff",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  statValue: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 4,
    color: "#222",
  },
  iconButtonContainer: {
    marginTop: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  iconButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 18,
    width: "47%",
    alignItems: "center",
    elevation: 2,
    flexDirection: "row",
    justifyContent: "center",
  },
  iconButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  instituteInfoContainer: {
    marginBottom: 32,
    alignItems: "center",
  },
  instituteName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  instituteAddress: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    textAlign: "center",
  },
  signOutContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default AdminDashboard;
