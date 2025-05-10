import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";

import { Picker } from '@react-native-picker/picker';


const AdminCreateQueueScreen = () => {
  const [form, setForm] = useState({
    queueName: "",
    serviceProvider: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    timePerSlot: "",
    maxPeople: "",
    queueType: "one-time", // "one-time" or "recurring"
    recurrenceType: "", // "daily", "weekly", "monthly"
  });

  const handleSubmit = () => {
    // You can add validation and saving logic here
    console.log("Form submitted:", form);
    Alert.alert("Success", "Queue created successfully!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Queue</Text>

      <TextInput
        style={styles.input}
        placeholder="Queue Name"
        value={form.queueName}
        onChangeText={(text) => setForm({ ...form, queueName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Service Provider Name"
        value={form.serviceProvider}
        onChangeText={(text) => setForm({ ...form, serviceProvider: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Start Date (YYYY-MM-DD)"
        value={form.startDate}
        onChangeText={(text) => setForm({ ...form, startDate: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="End Date (YYYY-MM-DD)"
        value={form.endDate}
        onChangeText={(text) => setForm({ ...form, endDate: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Start Time (e.g. 09:00)"
        value={form.startTime}
        onChangeText={(text) => setForm({ ...form, startTime: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="End Time (e.g. 17:00)"
        value={form.endTime}
        onChangeText={(text) => setForm({ ...form, endTime: text })}
      />
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

      <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
        <Text style={styles.saveButtonText}>Create Queue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AdminCreateQueueScreen;

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
