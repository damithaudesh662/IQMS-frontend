// import { Picker } from "@react-native-picker/picker";
// import { QueueItem } from "@/interfaces/QueueItem";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { RouteProp, useRoute } from "@react-navigation/native";
// import moment from "moment";
// import React, { useEffect, useState } from "react";
// import {
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Switch,
// } from "react-native";

// type RouteParams = {
//   QueueDetails: {
//     queue: QueueItem;
//   };
// };

// const QueueDetailsScreen = () => {
//   const route = useRoute<RouteProp<RouteParams, "QueueDetails">>();
//   const [queue, setQueue] = useState(() => {
//     const q = route.params.queue;
//     return {
//       ...q,
//       start_time: new Date(`${q.date}T${q.start_time}`),
//       end_time: new Date(`${q.date}T${q.end_time}`),
//     };
//   });

//   const [isStarted, setIsStarted] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingStart, setEditingStart] = useState<"date" | "time" | null>(
//     null
//   );
//   const [editingEnd, setEditingEnd] = useState<"date" | "time" | null>(null);

//   useEffect(() => {
//     const now = new Date();
//     setIsStarted(now >= new Date(queue.start_time));
//   }, [queue.start_time]);

//   const handleChange = (key: keyof QueueItem, value: any) => {
//     setQueue((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   const showPicker = (type: "date" | "time", key: "start" | "end") => {
//     if (key === "start") setEditingStart(type);
//     else setEditingEnd(type);
//   };

//   const handleDateChange = (
//     key: "start_time" | "end_time",
//     event: any,
//     selectedDate?: Date
//   ) => {
//     if (event.type === "dismissed") {
//       setEditingStart(null);
//       setEditingEnd(null);
//       return;
//     }

//     if (selectedDate) {
//       setQueue((prev) => ({
//         ...prev,
//         [key]: selectedDate,
//       }));
//     }

//     setEditingStart(null);
//     setEditingEnd(null);
//   };

//   const saveChanges = () => {
//     // Convert Date objects back to strings
//     const updatedQueue = {
//       ...queue,
//       start_time: moment(queue.start_time).format("HH:mm:ss"),
//       end_time: moment(queue.end_time).format("HH:mm:ss"),
//       date: moment(queue.start_time).format("YYYY-MM-DD"),
//     };
//     console.log("Saved Queue JSON:", JSON.stringify(updatedQueue, null, 2));
//     setIsEditing(false);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scroll}>
//         <View style={styles.card}>
//           <View style={styles.header}>
//             <Text style={styles.title}>{queue.queue_name}</Text>
//           </View>

//           {/* Queue Name */}
//           <View style={styles.fieldContainer}>
//             <Text style={styles.label}>Queue Name</Text>
//             <TextInput
//               style={[styles.input, !isEditing && styles.disabledInput]}
//               value={queue.queue_name}
//               onChangeText={(text) => handleChange("queue_name", text)}
//               editable={isEditing}
//             />
//           </View>

//           {/* is_ongoing Toggle */}
//           <View style={styles.fieldContainer}>
//             <Text style={styles.label}>Ongoing</Text>
//             <Switch
//               value={queue.is_ongoing}
//               onValueChange={(val) => handleChange("is_ongoing", val)}
//               disabled={!isEditing}
//             />
//           </View>

//           {/* Start Date */}
//           <View style={styles.fieldContainer}>
//             <Text style={styles.label}>Start Date</Text>
//             <TouchableOpacity
//               disabled={!isEditing}
//               onPress={() => showPicker("date", "start")}
//             >
//               <Text style={[styles.input, !isEditing && styles.disabledInput]}>
//                 {moment(queue.start_time).format("YYYY-MM-DD")}
//               </Text>
//             </TouchableOpacity>

//             {/* Start Time */}
//             <Text style={styles.label}>Start Time</Text>
//             <TouchableOpacity
//               disabled={!isEditing}
//               onPress={() => showPicker("time", "start")}
//             >
//               <Text style={[styles.input, !isEditing && styles.disabledInput]}>
//                 {moment(queue.start_time).format("HH:mm")}
//               </Text>
//             </TouchableOpacity>
//           </View>

//           {/* End Time */}
//           <View style={styles.fieldContainer}>
//             <Text style={styles.label}>End Time</Text>
//             <TouchableOpacity
//               disabled={!isEditing}
//               onPress={() => showPicker("time", "end")}
//             >
//               <Text style={[styles.input, !isEditing && styles.disabledInput]}>
//                 {moment(queue.end_time).format("HH:mm")}
//               </Text>
//             </TouchableOpacity>
//           </View>
//           {/* Queue Type Dropdown */}
//           <View style={styles.fieldContainer}>
//             <Text style={styles.label}>Queue Type</Text>
//             {isEditing ? (
//               <Picker
//                 selectedValue={queue.queue_type}
//                 style={styles.picker}
//                 onValueChange={(itemValue) =>
//                   handleChange("queue_type", itemValue)
//                 }
//               >
//                 <Picker.Item label="RECURRING" value="RECURRING" />
//                 <Picker.Item label="NON-RECURRING" value="NON-RECURRING" />
//               </Picker>
//             ) : (
//               <Text style={[styles.input, styles.disabledInput]}>
//                 {queue.queue_type}
//               </Text>
//             )}
//           </View>

//           {/* Joined */}
//           <View style={styles.fieldContainer}>
//             <Text style={styles.label}>Joined</Text>
//             <TextInput
//               style={[styles.input, styles.disabledInput]}
//               value={String(queue.unavailable_slots?.length || 0)}
//               editable={false}
//             />
//           </View>

//           {/* Max People */}
//           <View style={styles.fieldContainer}>
//             <Text style={styles.label}>Max People</Text>
//             <TextInput
//               style={[styles.input, !isEditing && styles.disabledInput]}
//               value={String(queue.no_of_slots)}
//               onChangeText={(text) => handleChange("no_of_slots", Number(text))}
//               keyboardType="numeric"
//               editable={isEditing}
//             />
//           </View>

//           <Text style={styles.statusText}>
//             {queue.unavailable_slots?.length || 0}/{queue.no_of_slots} joined
//           </Text>

//           {/* Buttons */}
//           <View style={styles.buttonRow}>
//             {!isEditing ? (
//               <TouchableOpacity
//                 style={styles.editButton}
//                 onPress={() => setIsEditing(true)}
//               >
//                 <Text style={styles.buttonText}>Edit</Text>
//               </TouchableOpacity>
//             ) : (
//               <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
//                 <Text style={styles.buttonText}>Save Changes</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         </View>

//         {/* Pickers */}
//         {editingStart && (
//           <DateTimePicker
//             mode={editingStart}
//             value={new Date(queue.start_time)}
//             display="default"
//             onChange={(e, d) => handleDateChange("start_time", e, d)}
//           />
//         )}
//         {editingEnd && (
//           <DateTimePicker
//             mode={editingEnd}
//             value={new Date(queue.end_time)}
//             display="default"
//             onChange={(e, d) => handleDateChange("end_time", e, d)}
//           />
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default QueueDetailsScreen;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f4f4f4",
//   },
//   scroll: {
//     padding: 20,
//   },
//   card: {
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 12,
//     elevation: 4,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   indicator: {
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     marginLeft: 10,
//   },
//   green: {
//     backgroundColor: "#4CAF50",
//   },
//   red: {
//     backgroundColor: "#f44336",
//   },
//   fieldContainer: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 14,
//     color: "#666",
//     marginBottom: 4,
//   },
//   input: {
//     borderBottomWidth: 1,
//     borderColor: "#ccc",
//     paddingVertical: 10,
//     fontSize: 16,
//     color: "#000",
//   },
//   disabledInput: {
//     color: "#999",
//   },
//   statusText: {
//     marginTop: 10,
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#333",
//   },
//   buttonRow: {
//     marginTop: 20,
//     flexDirection: "row",
//     justifyContent: "flex-end",
//   },
//   editButton: {
//     backgroundColor: "#2196F3",
//     padding: 10,
//     borderRadius: 6,
//   },
//   saveButton: {
//     backgroundColor: "#4CAF50",
//     padding: 10,
//     borderRadius: 6,
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "600",
//   },
//   picker: {
//     height: 50,
//     width: "100%",
//     backgroundColor: "#f0f0f0",
//     borderRadius: 8,
//     marginTop: 4,
//     marginBottom: 10,
//   },
// });

// import { Picker } from "@react-native-picker/picker";
// import { QueueItem } from "@/interfaces/QueueItem";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { RouteProp, useRoute } from "@react-navigation/native";
// import moment from "moment";
// import React, { useEffect, useState } from "react";
// import {
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Switch,
// } from "react-native";

// type RouteParams = {
//   QueueDetails: {
//     queue: QueueItem;
//   };
// };

// const QueueDetailsScreen = () => {
//   const route = useRoute<RouteProp<RouteParams, "QueueDetails">>();
//   const [queue, setQueue] = useState(() => {
//     const q = route.params.queue;
//     return {
//       ...q,
//       start_time: new Date(`${q.date}T${q.start_time}`),
//       end_time: new Date(`${q.date}T${q.end_time}`),
//     };
//   });

//   const [isStarted, setIsStarted] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingStart, setEditingStart] = useState<"date" | "time" | null>(null);
//   const [editingEnd, setEditingEnd] = useState<"date" | "time" | null>(null);

//   useEffect(() => {
//     const now = new Date();
//     setIsStarted(now >= new Date(queue.start_time));
//   }, [queue.start_time]);

//   const handleChange = (key: keyof QueueItem, value: any) => {
//     setQueue((prev) => ({ ...prev, [key]: value }));
//   };

//   const showPicker = (type: "date" | "time", key: "start" | "end") => {
//     key === "start" ? setEditingStart(type) : setEditingEnd(type);
//   };

//   const handleDateChange = (
//     key: "start_time" | "end_time",
//     event: any,
//     selectedDate?: Date
//   ) => {
//     if (event.type === "dismissed") {
//       setEditingStart(null);
//       setEditingEnd(null);
//       return;
//     }

//     if (selectedDate) {
//       setQueue((prev) => ({ ...prev, [key]: selectedDate }));
//     }

//     setEditingStart(null);
//     setEditingEnd(null);
//   };

//   const saveChanges = () => {
//     const updatedQueue = {
//       ...queue,
//       start_time: moment(queue.start_time).format("HH:mm:ss"),
//       end_time: moment(queue.end_time).format("HH:mm:ss"),
//       date: moment(queue.start_time).format("YYYY-MM-DD"),
//     };
//     console.log("Saved Queue JSON:", JSON.stringify(updatedQueue, null, 2));
//     setIsEditing(false);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scroll}>
//         <View style={styles.card}>
//           {/* Header */}
//           <View style={styles.header}>
//             <Text style={styles.title}>{queue.queue_name}</Text>
//           </View>

//           {/* Queue Name */}
//           <View style={styles.fieldContainer}>
//             <Text style={styles.label}>Queue Name</Text>
//             <TextInput
//               style={[styles.input, !isEditing && styles.disabledInput]}
//               value={queue.queue_name}
//               onChangeText={(text) => handleChange("queue_name", text)}
//               editable={isEditing}
//             />
//           </View>

//           {/* Ongoing Toggle */}
//           <View style={styles.fieldContainer}>
//             <Text style={styles.label}>Ongoing</Text>
//             <Switch
//               value={queue.is_ongoing}
//               onValueChange={(val) => handleChange("is_ongoing", val)}
//               disabled={!isEditing}
//               trackColor={{ false: "#ccc", true: "#81c784" }}
//               thumbColor={queue.is_ongoing ? "#4CAF50" : "#f4f3f4"}
//             />
//           </View>

//           {/* Start Date & Time */}
//           <View style={styles.fieldContainer}>
//             <Text style={styles.label}>Start Date</Text>
//             <TouchableOpacity disabled={!isEditing} onPress={() => showPicker("date", "start")}>
//               <Text style={[styles.input, !isEditing && styles.disabledInput]}>
//                 {moment(queue.start_time).format("YYYY-MM-DD")}
//               </Text>
//             </TouchableOpacity>

//             <Text style={styles.label}>Start Time</Text>
//             <TouchableOpacity disabled={!isEditing} onPress={() => showPicker("time", "start")}>
//               <Text style={[styles.input, !isEditing && styles.disabledInput]}>
//                 {moment(queue.start_time).format("HH:mm")}
//               </Text>
//             </TouchableOpacity>
//           </View>

//           {/* End Time */}
//           <View style={styles.fieldContainer}>
//             <Text style={styles.label}>End Time</Text>
//             <TouchableOpacity disabled={!isEditing} onPress={() => showPicker("time", "end")}>
//               <Text style={[styles.input, !isEditing && styles.disabledInput]}>
//                 {moment(queue.end_time).format("HH:mm")}
//               </Text>
//             </TouchableOpacity>
//           </View>

//           {/* Queue Type Dropdown */}
//           <View style={styles.fieldContainer}>
//             <Text style={styles.label}>Queue Type</Text>
//             {isEditing ? (
//               <Picker
//                 selectedValue={queue.queue_type}
//                 style={styles.picker}
//                 onValueChange={(itemValue) => handleChange("queue_type", itemValue)}
//               >
//                 <Picker.Item label="RECURRING" value="RECURRING" />
//                 <Picker.Item label="NON-RECURRING" value="NON-RECURRING" />
//               </Picker>
//             ) : (
//               <Text style={[styles.input, styles.disabledInput]}>
//                 {queue.queue_type}
//               </Text>
//             )}
//           </View>

//           {/* Joined Count */}
//           <View style={styles.fieldContainer}>
//             <Text style={styles.label}>Joined</Text>
//             <TextInput
//               style={[styles.input, styles.disabledInput]}
//               value={String(queue.unavailable_slots?.length || 0)}
//               editable={false}
//             />
//           </View>

//           {/* Max People */}
//           <View style={styles.fieldContainer}>
//             <Text style={styles.label}>Max People</Text>
//             <TextInput
//               style={[styles.input, !isEditing && styles.disabledInput]}
//               value={String(queue.no_of_slots)}
//               onChangeText={(text) => handleChange("no_of_slots", Number(text))}
//               keyboardType="numeric"
//               editable={isEditing}
//             />
//           </View>

//           {/* Status */}
//           <Text style={styles.statusText}>
//             {queue.unavailable_slots?.length || 0}/{queue.no_of_slots} joined
//           </Text>

//           {/* Action Buttons */}
//           <View style={styles.buttonRow}>
//             {!isEditing ? (
//               <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
//                 <Text style={styles.buttonText}>Edit</Text>
//               </TouchableOpacity>
//             ) : (
//               <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
//                 <Text style={styles.buttonText}>Save Changes</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         </View>

//         {/* DateTime Pickers */}
//         {editingStart && (
//           <DateTimePicker
//             mode={editingStart}
//             value={new Date(queue.start_time)}
//             display="default"
//             onChange={(e, d) => handleDateChange("start_time", e, d)}
//           />
//         )}
//         {editingEnd && (
//           <DateTimePicker
//             mode={editingEnd}
//             value={new Date(queue.end_time)}
//             display="default"
//             onChange={(e, d) => handleDateChange("end_time", e, d)}
//           />
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default QueueDetailsScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f4f4f4",
//   },
//   scroll: {
//     padding: 20,
//   },
//   card: {
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 12,
//     elevation: 4,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   fieldContainer: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 14,
//     color: "#666",
//     marginBottom: 4,
//   },
//   input: {
//     borderBottomWidth: 1,
//     borderColor: "#ccc",
//     paddingVertical: 10,
//     fontSize: 16,
//     color: "#000",
//   },
//   disabledInput: {
//     color: "#999",
//   },
//   picker: {
//     height: 50,
//     width: "100%",
//     backgroundColor: "#f0f0f0",
//     borderRadius: 8,
//     marginTop: 4,
//     marginBottom: 10,
//   },
//   statusText: {
//     marginTop: 10,
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#333",
//     textAlign: "right",
//   },
//   buttonRow: {
//     marginTop: 20,
//     flexDirection: "row",
//     justifyContent: "flex-end",
//   },
//   editButton: {
//     backgroundColor: "#2196F3",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 6,
//   },
//   saveButton: {
//     backgroundColor: "#4CAF50",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 6,
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 16,
//   },
// });

import { Picker } from "@react-native-picker/picker";
import { QueueItem } from "@/interfaces/QueueItem";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RouteProp, useRoute } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Switch,
} from "react-native";

type RouteParams = {
  QueueDetails: {
    queue: QueueItem;
  };
};

const QueueDetailsScreen = () => {
  const route = useRoute<RouteProp<RouteParams, "QueueDetails">>();
  const [queue, setQueue] = useState(() => {
    const q = route.params.queue;
    return {
      ...q,
      start_time: new Date(`${q.date}T${q.start_time}`),
      end_time: new Date(`${q.date}T${q.end_time}`),
    };
  });

  const [isStarted, setIsStarted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingStart, setEditingStart] = useState<"date" | "time" | null>(
    null
  );
  const [editingEnd, setEditingEnd] = useState<"date" | "time" | null>(null);

  useEffect(() => {
    const now = new Date();
    setIsStarted(now >= new Date(queue.start_time));
  }, [queue.start_time]);

  const handleChange = (key: keyof QueueItem, value: any) => {
    setQueue((prev) => ({ ...prev, [key]: value }));
  };

  const showPicker = (type: "date" | "time", key: "start" | "end") => {
    key === "start" ? setEditingStart(type) : setEditingEnd(type);
  };

  const handleDateChange = (
    key: "start_time" | "end_time",
    event: any,
    selectedDate?: Date
  ) => {
    if (event.type === "dismissed") {
      setEditingStart(null);
      setEditingEnd(null);
      return;
    }

    if (selectedDate) {
      setQueue((prev) => ({ ...prev, [key]: selectedDate }));
    }

    setEditingStart(null);
    setEditingEnd(null);
  };

  const saveChanges = () => {
    const updatedQueue = {
      ...queue,
      start_time: moment(queue.start_time).format("HH:mm:ss"),
      end_time: moment(queue.end_time).format("HH:mm:ss"),
      date: moment(queue.start_time).format("YYYY-MM-DD"),
    };
    console.log("Saved Queue JSON:", JSON.stringify(updatedQueue, null, 2));
    setIsEditing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{queue.queue_name}</Text>
            {!isEditing ? (
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setIsEditing(true)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Queue Name */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Queue Name</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.disabledInput]}
              value={queue.queue_name}
              onChangeText={(text) => handleChange("queue_name", text)}
              editable={isEditing}
            />
          </View>

          {/* Ongoing Toggle */}
          <View style={styles.switchContainer}>
            <Text style={styles.label}>Ongoing</Text>
            <Switch
              value={queue.is_ongoing}
              onValueChange={(val) => handleChange("is_ongoing", val)}
              disabled={!isEditing}
              trackColor={{ false: "#ccc", true: "#81c784" }}
              thumbColor={queue.is_ongoing ? "#4CAF50" : "#f4f3f4"}
            />
          </View>

          {/* Start Date & Time in one row */}
          <View style={styles.dateTimeContainer}>
            <View style={styles.dateTimeField}>
              <Text style={styles.label}>Start Date</Text>
              <TouchableOpacity
                disabled={!isEditing}
                onPress={() => showPicker("date", "start")}
                style={styles.dateTimeTouchable}
              >
                <Text
                  style={[
                    styles.dateTimeText,
                    !isEditing && styles.disabledInput,
                  ]}
                >
                  {moment(queue.start_time).format("YYYY-MM-DD")}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dateTimeField}>
              <Text style={styles.label}>Start Time</Text>
              <TouchableOpacity
                disabled={!isEditing}
                onPress={() => showPicker("time", "start")}
                style={styles.dateTimeTouchable}
              >
                <Text
                  style={[
                    styles.dateTimeText,
                    !isEditing && styles.disabledInput,
                  ]}
                >
                  {moment(queue.start_time).format("HH:mm")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* End Time */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>End Time</Text>
            <TouchableOpacity
              disabled={!isEditing}
              onPress={() => showPicker("time", "end")}
              style={styles.dateTimeTouchable}
            >
              <Text
                style={[
                  styles.dateTimeText,
                  !isEditing && styles.disabledInput,
                ]}
              >
                {moment(queue.end_time).format("HH:mm")}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Queue Type Dropdown */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Queue Type</Text>
            {isEditing ? (
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={queue.queue_type}
                  style={styles.picker}
                  onValueChange={(itemValue) =>
                    handleChange("queue_type", itemValue)
                  }
                >
                  <Picker.Item label="RECURRING" value="RECURRING" />
                  <Picker.Item label="NON-RECURRING" value="NON-RECURRING" />
                </Picker>
              </View>
            ) : (
              <Text style={[styles.input, styles.disabledInput]}>
                {queue.queue_type}
              </Text>
            )}
          </View>

          {/* Capacity section */}
          <View style={styles.capacityContainer}>
            <View style={styles.capacityField}>
              <Text style={styles.label}>Joined</Text>
              <View style={styles.capacityValueContainer}>
                <Text style={styles.capacityValue}>
                  {queue.unavailable_slots?.length || 0}
                </Text>
              </View>
            </View>

            <View style={styles.capacityField}>
              <Text style={styles.label}>Max People</Text>
              <TextInput
                style={[
                  styles.capacityInput,
                  !isEditing && styles.disabledInput,
                ]}
                value={String(queue.no_of_slots)}
                onChangeText={(text) =>
                  handleChange("no_of_slots", Number(text))
                }
                keyboardType="numeric"
                editable={isEditing}
              />
            </View>
          </View>

          {/* Status */}
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>
              {queue.unavailable_slots?.length || 0}/{queue.no_of_slots} joined
            </Text>
          </View>
        </View>

        {/* DateTime Pickers */}
        {editingStart && (
          <DateTimePicker
            mode={editingStart}
            value={new Date(queue.start_time)}
            display="default"
            onChange={(e, d) => handleDateChange("start_time", e, d)}
          />
        )}
        {editingEnd && (
          <DateTimePicker
            mode={editingEnd}
            value={new Date(queue.end_time)}
            display="default"
            onChange={(e, d) => handleDateChange("end_time", e, d)}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default QueueDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    marginTop: 100,
  },
  scroll: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  fieldContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
    fontWeight: "500",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
    fontSize: 16,
    color: "#000",
  },
  disabledInput: {
    color: "#666",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  dateTimeField: {
    width: "48%",
  },
  dateTimeTouchable: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
  },
  dateTimeText: {
    fontSize: 16,
    color: "#000",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginTop: 2,
    backgroundColor: "#f9f9f9",
    height: 50,
  },
  picker: {
    height: 55,
    width: "100%",
  },
  capacityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  capacityField: {
    width: "48%",
  },
  capacityValueContainer: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
  },
  capacityValue: {
    fontSize: 16,
    color: "#666",
  },
  capacityInput: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
    fontSize: 16,
    color: "#000",
  },
  statusContainer: {
    alignItems: "flex-end",
    marginTop: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2196F3",
  },
  buttonRow: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  editButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
