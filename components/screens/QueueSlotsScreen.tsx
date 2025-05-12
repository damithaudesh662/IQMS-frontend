import { RouteProp } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import * as instituteService from "../../services/instituteService";
import { RootStackParamList } from "../navigation/AppNavigator";

interface QueueSlotsScreenProps {
  id: number;
  totalSlots?: number;
  unavailableSlots?: number[];
}

type Props = {
  route: RouteProp<RootStackParamList, "QueueSlotsScreen">;
};

const QueueSlotsScreen: React.FC<Props> = ({ route }) => {
  const { id, totalSlots, unavailableSlots } = route.params;
  const [unavailable_slots, set_unavailable_slots] = useState(unavailableSlots);

  const handleSelectSlot = async (item: number) => {
    let updatedUnavailableSlots = [...unavailable_slots, item];
    const success = await instituteService.updateUnavailableSlotsForQueue(
      id,
      updatedUnavailableSlots
    );
    if (success) {
      set_unavailable_slots(updatedUnavailableSlots);
      Alert.alert("Slot booked successfully!");
    } else {
      Alert.alert("Unable to book the slot at the moment");
    }
  };

  const renderSlot = ({ item }: { item: number }) => {
    const isUnavailable = unavailableSlots
      ? unavailable_slots.includes(item)
      : true;

    return (
      <TouchableOpacity
        disabled={isUnavailable}
        style={[
          styles.slot,
          isUnavailable ? styles.unavailableSlot : styles.availableSlot,
        ]}
        onPress={() => handleSelectSlot(item)}
      >
        <Text style={[styles.slotText, isUnavailable && { color: "#aaa" }]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const slotNumbers = totalSlots
    ? Array.from({ length: totalSlots }, (_, i) => i + 1)
    : [];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Available Slots</Text>
      <FlatList
        data={slotNumbers}
        keyExtractor={(item) => item.toString()}
        renderItem={renderSlot}
        numColumns={4}
        contentContainerStyle={styles.grid}
      />
    </SafeAreaView>
  );
};

export default QueueSlotsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },
  grid: {
    alignItems: "center",
  },
  slot: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  availableSlot: {
    backgroundColor: "#4ade80", // green
  },
  unavailableSlot: {
    backgroundColor: "#e5e7eb", // grey
  },
  slotText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
