import { QueueGroups, QueueItem } from "@/interfaces/QueueItem";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useMemo, useState } from "react";
import {
  Button,
  FlatList,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../navigation/AppNavigator";
import BlinkingCircle from "./BlinkingCircle";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function QueueTable({ queues }: { queues: QueueGroups }) {
  const navigation = useNavigation<NavigationProp>();
  const [selectedTab, setSelectedTab] = useState<"upcoming" | "ongoing">(
    "ongoing"
  );
  const [search, setSearch] = useState({ name: "", date: "", start: "" });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const rawData = queues[selectedTab];

  // Filters
  const data = useMemo(() => {
    return rawData.filter((item) => {
      const nameMatch = item.queue_name
        .toLowerCase()
        .includes(search.name.toLowerCase());
      const dateMatch = item.date.includes(search.date);
      const startMatch = item.start_time.includes(search.start);
      return nameMatch && dateMatch && startMatch;
    });
  }, [rawData, search]);

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (Platform.OS !== "ios") setShowDatePicker(false);
    if (selectedDate) {
      const formatted = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD
      setSearch((prev) => ({ ...prev, date: formatted }));
    }
  };

  const handleTimeChange = (
    event: DateTimePickerEvent,
    selectedTime?: Date
  ) => {
    if (Platform.OS !== "ios") setShowTimePicker(false);
    if (selectedTime) {
      const hours = selectedTime.getHours().toString().padStart(2, "0");
      const minutes = selectedTime.getMinutes().toString().padStart(2, "0");
      const formattedTime = `${hours}:${minutes}`;
      setSearch((prev) => ({ ...prev, start: formattedTime }));
    }
  };

  const renderItem = ({ item }: { item: QueueItem }) => (
    <TouchableOpacity
      className="flex-row justify-between items-center p-4 border-b border-gray-200"
      onPress={() =>
        navigation.navigate("QueueSlotsScreen", {
          id: item.id,
          totalSlots: item.no_of_slots,
          unavailableSlots: item.unavailable_slots,
        })
      }
    >
      <Text className="w-1/4 text-gray-800">{item.queue_name}</Text>
      <Text className="w-1/4 text-gray-600">{item.date}</Text>
      <Text className="w-1/4 text-gray-600">{item.start_time}</Text>
      <Text className="w-1/4 text-gray-600">{item.end_time}</Text>
      <BlinkingCircle ongoing={item.is_ongoing} />
    </TouchableOpacity>
  );

  return (
    <View className="p-4">
      {/* Tabs */}
      <View className="flex-row justify-between mb-4">
        <TouchableOpacity
          className={`px-4 py-2 rounded-md ${
            selectedTab === "ongoing" ? "bg-blue-500" : "bg-gray-200"
          }`}
          onPress={() => setSelectedTab("ongoing")}
        >
          <Text
            className={`${
              selectedTab === "ongoing" ? "text-white" : "text-gray-800"
            }`}
          >
            Ongoing Queues
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`px-4 py-2 rounded-md ${
            selectedTab === "upcoming" ? "bg-blue-500" : "bg-gray-200"
          }`}
          onPress={() => setSelectedTab("upcoming")}
        >
          <Text
            className={`${
              selectedTab === "upcoming" ? "text-white" : "text-gray-800"
            }`}
          >
            Upcoming Queues
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View className="flex-row justify-between mb-2 space-x-2">
        {/* Name Filter */}
        <TextInput
          className="flex-1 border border-gray-300 rounded-md px-2 py-1 text-sm"
          placeholder="Filter by name"
          value={search.name}
          onChangeText={(text) =>
            setSearch((prev) => ({ ...prev, name: text }))
          }
        />

        {/* Date Picker */}
        <TouchableOpacity
          className="flex-1 border border-gray-300 rounded-md px-2 py-1 justify-center"
          onPress={() => setShowDatePicker(true)}
        >
          <Text className="text-sm text-gray-700">
            {search.date || "Select date"}
          </Text>
        </TouchableOpacity>

        {/* Time Picker */}
        <TouchableOpacity
          className="flex-1 border border-gray-300 rounded-md px-2 py-1 justify-center"
          onPress={() => setShowTimePicker(true)}
        >
          <Text className="text-sm text-gray-700">
            {search.start || "Select time"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Native Pickers */}
      {showDatePicker && (
        <DateTimePicker
          mode="date"
          value={new Date()}
          display="default"
          onChange={handleDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          mode="time"
          value={new Date()}
          display="default"
          onChange={handleTimeChange}
        />
      )}

      <Button
        title="Reset"
        onPress={() => setSearch({ name: "", date: "", start: "" })}
      />

      {/* Header */}
      <View className="flex-row justify-between px-4 py-2 border-b border-gray-400">
        <Text className="w-1/4 font-bold text-gray-700">Queue</Text>
        <Text className="w-1/4 font-bold text-gray-700">Date</Text>
        <Text className="w-1/4 font-bold text-gray-700">Start</Text>
        <Text className="w-1/4 font-bold text-gray-700">End</Text>
        <Text className="w-6 font-bold text-gray-700"></Text>
      </View>

      {/* List */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text className="text-center mt-4 text-gray-500">
            No queues match the filters.
          </Text>
        }
      />
    </View>
  );
}
