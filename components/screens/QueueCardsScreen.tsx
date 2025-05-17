import { QueueItem } from "@/interfaces/QueueItem";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import moment from "moment";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
  QueueDetailsScreen: { queue: QueueItem };
  QueueCardsScreen: { queues: QueueItem[]; isManage: boolean };
  AdminManageQueueScreen: { id: string };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "QueueCardsScreen"
>;

type Props = {
  route: RouteProp<RootStackParamList, "QueueCardsScreen">;
};

// // Hardcoded queues
// const queues: Queue[] = Array.from({ length: 10 }).map((_, i) => {
//   const startMoment = moment().add(i - 5, "hours");
//   const EndMoment = moment(startMoment).add(2, "hours");
//   return {
//     id: `Q${i + 1}`,
//     name: `Queue ${i + 1}`,
//     institution: `Institution ${i + 1}`,
//     startTime: startMoment.toISOString(),
//     endTime: EndMoment.toISOString(),
//     joined: Math.floor(Math.random() * 50),
//     max: 50,
//   };
// });

// Blinking dot component
const BlinkingDot = ({ active }: { active: boolean }) => {
  return (
    <View style={[styles.dot, { backgroundColor: active ? "green" : "red" }]}>
      <View style={styles.blink} />
    </View>
  );
};

const QueueCardsScreen: React.FC<Props> = ({ route }) => {
  const { queues, isManage } = route.params;
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const renderItem = ({ item }: { item: QueueItem }) => {
    const now = moment();

    // const start = moment(item.start_time, "HH:mm:ss");
    // const end = moment(item.end_time, "HH:mm:ss");
    // const isActive = now.isBetween(start, end);
    // const isUpcoming = now.isBefore(start);
    // if (!isActive && !isUpcoming) return null;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          isManage
            ? navigation.navigate("AdminManageQueueScreen", { id: item.id })
            : navigation.navigate("QueueDetailsScreen", { queue: item })
        }
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.queue_name}</Text>
          <BlinkingCircle style={styles.dot} ongoing={item.is_ongoing} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Queues</Text>
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

export default QueueCardsScreen;
