import { RouteProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import * as adminService from "../../services/adminService";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = {
  route: RouteProp<RootStackParamList, "AdminManageQueueScreen">;
};

const AdminManageQueueScreen: React.FC<Props> = ({ route }) => {
  const { id } = route.params;
  const [queueName, setQueueName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [currentOngoingSlot, setCurrentOngoingSlot] = useState("1");

  useEffect(() => {
    const fetchQueueDetails = async () => {
      const { queue, error } = await adminService.getQueueDetailsForManage(id);

      if (error) {
        Alert.alert(error.message);
      } else {
        setQueueName(queue.queue_name);
        setDate(queue.date);
        setStartTime(queue.start_time);
        setEndTime(queue.end_time);
        setCurrentOngoingSlot(queue.current_slot);
      }
    };

    fetchQueueDetails();
  });

  // Mock data, you should replace with actual logic or props
  const estimatedWaitTime = calculateEstimatedWaitTime("1", currentOngoingSlot);

  function calculateEstimatedWaitTime(userSlot: string, ongoingSlot: string) {
    const waitSlots = Number(userSlot) - Number(ongoingSlot);
    const minutesPerSlot = 15; // for example, each slot is 15 mins
    if (waitSlots <= 0) return "Your turn now!";
    return `${waitSlots * minutesPerSlot} mins`;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{queueName}</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{date}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>
            {startTime} - {endTime}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Current Slot:</Text>
          <Text style={styles.value}>{currentOngoingSlot}</Text>
        </View>

        <View style={styles.waitTimeBox}>
          <Text style={styles.waitTimeLabel}>Estimated Wait Time</Text>
          <Text style={styles.waitTime}>{estimatedWaitTime}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Fill the whole screen
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    backgroundColor: "#f0f0f0", // Optional: background color for contrast
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 5, // for android shadow
    shadowColor: "#000", // ios shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    width: "90%", // Optional: limit width for better card look
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  institute: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontWeight: "600",
    color: "#444",
  },
  value: {
    fontWeight: "400",
    color: "#222",
  },
  waitTimeBox: {
    marginTop: 24,
    backgroundColor: "#e0f7fa",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  waitTimeLabel: {
    color: "#00796b",
    fontWeight: "600",
    marginBottom: 6,
  },
  waitTime: {
    fontSize: 20,
    fontWeight: "700",
    color: "#004d40",
  },
});

export default AdminManageQueueScreen;
