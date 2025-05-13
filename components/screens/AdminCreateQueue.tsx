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

          <TextInput
            style={styles.input}
            placeholder="Queue Name"
            value={form.queueName}
            onChangeText={(text) => setForm({ ...form, queueName: text })}
          />

          {/* Start Date Picker */}
          <TouchableOpacity
            style={styles.input}
            onPress={() => togglePicker("startDate")}
          >
            <Text>{form.startDate || "Select Start Date"}</Text>
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

          {/* Start Time Picker */}
          <TouchableOpacity
            style={styles.input}
            onPress={() => togglePicker("startTime")}
          >
            <Text>{form.startTime || "Select Start Time"}</Text>
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

          {/* End Time Picker */}
          <TouchableOpacity
            style={styles.input}
            onPress={() => togglePicker("endTime")}
          >
            <Text>{form.endTime || "Select End Time"}</Text>
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

          <TextInput
            style={styles.input}
            placeholder="Time Per Slot (minutes)"
            keyboardType="numeric"
            value={form.timePerSlot}
            onChangeText={(text) => setForm({ ...form, timePerSlot: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Max People Per Session"
            keyboardType="numeric"
            value={form.maxPeople}
            onChangeText={(text) => setForm({ ...form, maxPeople: text })}
          />

          <View style={styles.dropdownContainer}>
            <Text style={styles.label}>Queue Type:</Text>
            <Picker
              selectedValue={form.queueType}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setForm({ ...form, queueType: itemValue, recurrenceType: "" })
              }
            >
              <Picker.Item label="One-Time" value="one-time" />
              <Picker.Item label="Recurring" value="recurring" />
            </Picker>
          </View>

          {form.queueType === "recurring" && (
            <View style={styles.dropdownContainer}>
              <Text style={styles.label}>Recurrence Type:</Text>
              <Picker
                selectedValue={form.recurrenceType}
                style={styles.picker}
                onValueChange={(itemValue) =>
                  setForm({ ...form, recurrenceType: itemValue })
                }
              >
                <Picker.Item label="Select..." value="" />
                <Picker.Item label="Daily" value="daily" />
                <Picker.Item label="Weekly" value="weekly" />
                <Picker.Item label="Monthly" value="monthly" />
              </Picker>
            </View>
          )}

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
    backgroundColor: "#fff",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
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
    justifyContent: "center",
  },
  dropdownContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  buttonContainer: {
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#2D9CDB",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
