import { JoinedQueue, UserQueueViewScreenProps } from "@/interfaces/QueueItem";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as userService from "../../services/userService";
import BlinkingCircle from "../institute/BlinkingCircle";

// Define types
type Queue = {
  id: string;
  name: string;
  institution: string;
  startTime: string;
  endTime: string;
  joined: number;
  max: number;
};

type RootStackParamList = {
  // QueueDetailsScreen: { queue: QueueItem };
  JoinedQueuesScreen: undefined;
  UserQueueViewScreen: UserQueueViewScreenProps;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "JoinedQueuesScreen"
>;

const JoinedQueuesScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [queues, setQueues] = useState<JoinedQueue[]>([]);
  useEffect(() => {
    const fetchQueues = async () => {
      const { queues, error } = await userService.getQueuesByUserID();
      if (error) {
        Alert.alert(error);
      }
      setQueues(queues as unknown as JoinedQueue[]);
    };

    fetchQueues();
  }, []);

  const renderItem = ({ item }: { item: JoinedQueue }) => {
    const now = moment();
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          navigation.navigate("UserQueueViewScreen", {
            id: item.id,
            slot: item.slot,
            institute_name: item.institute_queues.institutes.institute_name,
            queue_name: item.institute_queues.queue_name,
            date: item.institute_queues.date,
            start_time: item.institute_queues.start_time,
            end_time: item.institute_queues.end_time,
          });
        }}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>
            {item.institute_queues.institutes.institute_name}
          </Text>
          <BlinkingCircle
            style={styles.dot}
            ongoing={item.institute_queues.is_ongoing}
          />
        </View>
        <View>
          <Text style={styles.cardDetails}>
            {item.institute_queues.queue_name}
          </Text>
          <Text style={styles.cardDetails}>
            {item.institute_queues.date} : {item.institute_queues.start_time}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Joined Queues</Text>
      <FlatList
        data={queues}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  pageTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  card: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between" },
  cardTitle: { fontSize: 18, fontWeight: "600" },
  cardDetails: { fontSize: 16, fontWeight: "400" },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  blink: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
});

export default JoinedQueuesScreen;
