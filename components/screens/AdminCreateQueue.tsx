

import { useUser } from "@/utils/UserProvider";
import DateTimePicker, {
  EvtTypes,
} from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as adminService from "../../services/adminService";

type RootStackParamList = {
  AdminDashboard: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AdminDashboard"
>;

const AdminCreateQueueScreen = () => {
  const { instituteID } = useUser();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [form, setForm] = useState({
    queueName: "",
    startDate: "",
    startTime: "",
    endTime: "",
    timePerSlot: "",
    maxPeople: "",
    queueType: "one-time",
    recurrenceType: "",
  });

  const [showPicker, setShowPicker] = useState({
    startDate: false,
    endDate: false,
    startTime: false,
    endTime: false,
  });

  const handleSubmit = async () => {
    console.log("Form submitted:", form);

    const queueData = {
      institute_id: instituteID,
      queue_name: form.queueName,
      date: form.startDate,
      start_time: form.startTime,
      end_time: form.endTime,
      queue_type: form.queueType == "one-time" ? "NON-RECURRING" : "RECURRING",
      is_ongoing: false,
      no_of_slots: Number(form.maxPeople),
      unavailable_slots: [],
      time_per_slot: form.timePerSlot,
    };

    const { error } = await adminService.createQueue(queueData);

    if (error) {
      Alert.alert(error.message);
    } else {
      Alert.alert("Success", "Queue created successfully!");
    }

    navigation.navigate("AdminDashboard");
  };

  const formatDate = (date: { toISOString: () => string }) => {
    return date.toISOString().split("T")[0];
  };

  const formatTime = (date: { toTimeString: () => string }) => {
    return date.toTimeString().substring(0, 8);
  };

  const handlePickerChange = (
    type: string,
    event: {
      type: EvtTypes;
      nativeEvent: { timestamp: number; utcOffset: number };
    },
    selectedValue: Date | undefined
  ) => {
    setShowPicker({ ...showPicker, [type]: false });

    if (selectedValue) {
      if (type === "startDate" || type === "endDate") {
        setForm({ ...form, [type]: formatDate(selectedValue) });
      } else {
        setForm({ ...form, [type]: formatTime(selectedValue) });
      }
    }
  };

  const togglePicker = (type: string) => {
    setShowPicker({ ...showPicker, [type]: true });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Create Queue</Text>

          {/* Queue Name */}
          <Text style={styles.label}>Queue Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Queue Name"
            value={form.queueName}
            onChangeText={(text) => setForm({ ...form, queueName: text })}
          />

          {/* Start Date */}
          <Text style={styles.label}>Start Date</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => togglePicker("startDate")}
          >
            <Text style={styles.inputText}>
              {form.startDate || "Select Start Date"}
            </Text>
          </TouchableOpacity>
          {showPicker.startDate && (
            <DateTimePicker
              value={form.startDate ? new Date(form.startDate) : new Date()}
              mode="date"
              display="default"
              onChange={(event, date) =>
                handlePickerChange("startDate", event, date)
              }
            />
          )}

          {/* Start Time */}
          <Text style={styles.label}>Start Time</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => togglePicker("startTime")}
          >
            <Text style={styles.inputText}>
              {form.startTime || "Select Start Time"}
            </Text>
          </TouchableOpacity>
          {showPicker.startTime && (
            <DateTimePicker
              value={
                form.startTime
                  ? new Date(`1970-01-01T${form.startTime}`)
                  : new Date()
              }
              mode="time"
              display="default"
              onChange={(event, time) =>
                handlePickerChange("startTime", event, time)
              }
            />
          )}

          {/* End Time */}
          <Text style={styles.label}>End Time</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => togglePicker("endTime")}
          >
            <Text style={styles.inputText}>
              {form.endTime || "Select End Time"}
            </Text>
          </TouchableOpacity>
          {showPicker.endTime && (
            <DateTimePicker
              value={
                form.endTime
                  ? new Date(`1970-01-01T${form.endTime}`)
                  : new Date()
              }
              mode="time"
              display="default"
              onChange={(event, time) =>
                handlePickerChange("endTime", event, time)
              }
            />
          )}

          {/* Time per slot */}
          <Text style={styles.label}>Time Per Slot (minutes)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter duration in minutes"
            keyboardType="numeric"
            value={form.timePerSlot}
            onChangeText={(text) => setForm({ ...form, timePerSlot: text })}
          />

          {/* Max People */}
          <Text style={styles.label}>Max People Per Session</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter max people"
            keyboardType="numeric"
            value={form.maxPeople}
            onChangeText={(text) => setForm({ ...form, maxPeople: text })}
          />

          {/* Queue Type */}
          <Text style={styles.label}>Queue Type</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={form.queueType}
              onValueChange={(itemValue) =>
                setForm({ ...form, queueType: itemValue, recurrenceType: "" })
              }
              style={styles.picker}
            >
              <Picker.Item label="NON-RECURRING" value="NON-RECURRING" />
              <Picker.Item label="RECURRING" value="RECURRING" />
            </Picker>
          </View>

          {/* Recurrence Type */}
          {form.queueType === "recurring" && (
            <>
              <Text style={styles.label}>Recurrence Type</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={form.recurrenceType}
                  onValueChange={(itemValue) =>
                    setForm({ ...form, recurrenceType: itemValue })
                  }
                  style={styles.picker}
                >
                  <Picker.Item label="Select..." value="" />
                  <Picker.Item label="Daily" value="daily" />
                  <Picker.Item label="Weekly" value="weekly" />
                  <Picker.Item label="Monthly" value="monthly" />
                </Picker>
              </View>
            </>
          )}

          {/* Submit */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
              <Text style={styles.saveButtonText}>Create Queue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AdminCreateQueueScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2D9CDB",
    marginBottom: 30,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 6,
    marginTop: 10,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  inputText: {
    fontSize: 16,
    color: "#333",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  picker: {
    height: 55,
    width: "100%",
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#2D9CDB",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
    width: "100%",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
