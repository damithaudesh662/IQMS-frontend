// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   SafeAreaView,
//   ScrollView,
// } from "react-native";
// import { RouteProp, useRoute } from "@react-navigation/native";

// type QueueDetails = {
//   id: string;
//   name: string;
//   institution: string;
//   startTime: string;
//   endTime: string;
//   joined: number;
//   max: number;
// };

// type RouteParams = {
//   QueueDetails: {
//     queue: QueueDetails;
//   };
// };

// const QueueDetailsScreen = () => {
//   const route = useRoute<RouteProp<RouteParams, "QueueDetails">>();
//   const [queue, setQueue] = useState(route.params.queue);
//   const [isStarted, setIsStarted] = useState(false);

//   useEffect(() => {
//     const now = new Date();
//     const start = new Date(queue.startTime);
//     setIsStarted(now >= start);
//   }, [queue.startTime]);

//   const handleChange = (key: keyof QueueDetails, value: string | number) => {
//     setQueue((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scroll}>
//         <View style={styles.card}>
//           <View style={styles.header}>
//             <Text style={styles.title}>{queue.name}</Text>
//             <View
//               style={[
//                 styles.indicator,
//                 isStarted ? styles.green : styles.red,
//               ]}
//             />
//           </View>

//           <TextInput
//             style={styles.input}
//             value={queue.id}
//             onChangeText={(text) => handleChange("id", text)}
//             placeholder="Queue ID"
//           />
//           <TextInput
//             style={styles.input}
//             value={queue.name}
//             onChangeText={(text) => handleChange("name", text)}
//             placeholder="Queue Name"
//           />
//           <TextInput
//             style={styles.input}
//             value={queue.institution}
//             onChangeText={(text) => handleChange("institution", text)}
//             placeholder="Institution Name"
//           />
//           <TextInput
//             style={styles.input}
//             value={queue.startTime}
//             onChangeText={(text) => handleChange("startTime", text)}
//             placeholder="Start Time"
//           />
//           <TextInput
//             style={styles.input}
//             value={queue.endTime}
//             onChangeText={(text) => handleChange("endTime", text)}
//             placeholder="End Time"
//           />
//           <TextInput
//             style={styles.input}
//             value={String(queue.joined)}
//             onChangeText={(text) => handleChange("joined", Number(text))}
//             placeholder="Joined"
//             keyboardType="numeric"
//           />
//           <TextInput
//             style={styles.input}
//             value={String(queue.max)}
//             onChangeText={(text) => handleChange("max", Number(text))}
//             placeholder="Max People"
//             keyboardType="numeric"
//           />

//           <Text style={styles.statusText}>
//             {queue.joined}/{queue.max} joined
//           </Text>
//         </View>
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
//   input: {
//     borderBottomWidth: 1,
//     borderColor: "#ccc",
//     paddingVertical: 10,
//     marginBottom: 15,
//     fontSize: 16,
//   },
//   statusText: {
//     marginTop: 10,
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#333",
//   },
// });

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   SafeAreaView,
//   ScrollView,
//   Platform,
// } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { RouteProp, useRoute } from "@react-navigation/native";
// import moment from "moment";

// type QueueDetails = {
//   id: string;
//   name: string;
//   institution: string;
//   startTime: string;
//   endTime: string;
//   joined: number;
//   max: number;
// };

// type RouteParams = {
//   QueueDetails: {
//     queue: QueueDetails;
//   };
// };

// const QueueDetailsScreen = () => {
//   const route = useRoute<RouteProp<RouteParams, "QueueDetails">>();
//   const [queue, setQueue] = useState(route.params.queue);
//   const [isStarted, setIsStarted] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//   const [showStartPicker, setShowStartPicker] = useState(false);
//   const [showEndPicker, setShowEndPicker] = useState(false);

//   useEffect(() => {
//     const now = new Date();
//     const start = new Date(queue.startTime);
//     setIsStarted(now >= start);
//   }, [queue.startTime]);

//   const handleDateChange = (
//     key: "startTime" | "endTime",
//     event: any,
//     date?: Date
//   ) => {
//     if (date) {
//       setQueue((prev) => ({
//         ...prev,
//         [key]: date.toISOString(),
//       }));
//     }
//     key === "startTime" ? setShowStartPicker(false) : setShowEndPicker(false);
//   };

//   const handleChange = (key: keyof QueueDetails, value: string | number) => {
//     setQueue((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scroll}>
//         <View style={styles.card}>
//           <View style={styles.header}>
//             <Text style={styles.title}>{queue.name}</Text>
//             <View
//               style={[styles.indicator, isStarted ? styles.green : styles.red]}
//             />
//           </View>

//           {/* Editable Fields */}
//           {[
//             { label: "Queue ID", key: "id" },
//             { label: "Queue Name", key: "name" },
//             { label: "Institution Name", key: "institution" },
//           ].map(({ label, key }) => (
//             <View key={key} style={styles.fieldContainer}>
//               <Text style={styles.label}>{label}</Text>
//               <TextInput
//                 style={[styles.input, !isEditing && styles.disabledInput]}
//                 value={String(queue[key as keyof QueueDetails])}
//                 editable={isEditing}
//                 onChangeText={(text) =>
//                   handleChange(key as keyof QueueDetails, text)
//                 }
//               />
//             </View>
//           ))}

//           {/* Start Time Picker */}
//           <View style={styles.fieldContainer}>
//             <Text style={styles.label}>Start Time</Text>
//             <TouchableOpacity
//               disabled={!isEditing}
//               onPress={() => isEditing && setShowStartPicker(true)}
//             >
//               <Text style={[styles.input, !isEditing && styles.disabledInput]}>
//                 {moment(queue.startTime).format("YYYY-MM-DD HH:mm")}
//               </Text>
//             </TouchableOpacity>
//             {showStartPicker && (
//               <DateTimePicker
//                 value={new Date(queue.startTime)}
//                 mode="datetime"
//                 display="default"
//                 onChange={(event, date) =>
//                   handleDateChange("startTime", event, date)
//                 }
//               />
//             )}
//           </View>

//           {/* End Time Picker */}
//           <View style={styles.fieldContainer}>
//             <Text style={styles.label}>End Time</Text>
//             <TouchableOpacity
//               disabled={!isEditing}
//               onPress={() => isEditing && setShowEndPicker(true)}
//             >
//               <Text style={[styles.input, !isEditing && styles.disabledInput]}>
//                 {moment(queue.endTime).format("YYYY-MM-DD HH:mm")}
//               </Text>
//             </TouchableOpacity>
//             {showEndPicker && (
//               <DateTimePicker
//                 value={new Date(queue.endTime)}
//                 mode="datetime"
//                 display="default"
//                 onChange={(event, date) =>
//                   handleDateChange("endTime", event, date)
//                 }
//               />
//             )}
//           </View>

//           {/* Numeric Fields */}
//           {[
//             { label: "Joined", key: "joined" },
//             { label: "Max People", key: "max" },
//           ].map(({ label, key }) => (
//             <View key={key} style={styles.fieldContainer}>
//               <Text style={styles.label}>{label}</Text>
//               <TextInput
//                 style={[styles.input, !isEditing && styles.disabledInput]}
//                 keyboardType="numeric"
//                 editable={isEditing}
//                 value={String(queue[key as keyof QueueDetails])}
//                 onChangeText={(text) =>
//                   handleChange(key as keyof QueueDetails, Number(text))
//                 }
//               />
//             </View>
//           ))}

//           <Text style={styles.statusText}>
//             {queue.joined}/{queue.max} joined
//           </Text>

//           <View style={styles.buttonRow}>
//             {!isEditing ? (
//               <TouchableOpacity
//                 style={styles.editButton}
//                 onPress={() => setIsEditing(true)}
//               >
//                 <Text style={styles.buttonText}>Edit</Text>
//               </TouchableOpacity>
//             ) : (
//               <TouchableOpacity
//                 style={styles.saveButton}
//                 onPress={() => {
//                   // Add save-to-server logic here if needed
//                   setIsEditing(false);
//                 }}
//               >
//                 <Text style={styles.buttonText}>Save Changes</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         </View>
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
//     color: "#555",
//     marginBottom: 5,
//   },
//   input: {
//     borderBottomWidth: 1,
//     borderColor: "#ccc",
//     paddingVertical: 8,
//     fontSize: 16,
//     color: "#000",
//   },
//   disabledInput: {
//     color: "#777",
//   },
//   statusText: {
//     marginTop: 20,
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#333",
//     textAlign: "center",
//   },
//   buttonRow: {
//     marginTop: 20,
//     flexDirection: "row",
//     justifyContent: "center",
//   },
//   editButton: {
//     backgroundColor: "#2196F3",
//     padding: 12,
//     borderRadius: 8,
//   },
//   saveButton: {
//     backgroundColor: "#4CAF50",
//     padding: 12,
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "600",
//   },
// });

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RouteProp, useRoute } from "@react-navigation/native";
import moment from "moment";

type QueueDetails = {
  id: string;
  name: string;
  institution: string;
  startTime: string;
  endTime: string;
  joined: number;
  max: number;
};

type RouteParams = {
  QueueDetails: {
    queue: QueueDetails;
  };
};

const QueueDetailsScreen = () => {
  const route = useRoute<RouteProp<RouteParams, "QueueDetails">>();
  const [queue, setQueue] = useState(route.params.queue);
  const [isStarted, setIsStarted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingStart, setEditingStart] = useState<"date" | "time" | null>(
    null
  );
  const [editingEnd, setEditingEnd] = useState<"date" | "time" | null>(null);

  useEffect(() => {
    const now = new Date();
    const start = new Date(queue.startTime);
    setIsStarted(now >= start);
  }, [queue.startTime]);

  const handleChange = (key: keyof QueueDetails, value: string | number) => {
    setQueue((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const showPicker = (type: "date" | "time", key: "start" | "end") => {
    if (key === "start") {
      setEditingStart(type);
    } else {
      setEditingEnd(type);
    }
  };

  const handleDateChange = (
    key: "startTime" | "endTime",
    event: any,
    selectedDate?: Date
  ) => {
    if (event.type === "dismissed") {
      setEditingStart(null);
      setEditingEnd(null);
      return;
    }

    if (selectedDate) {
      const currentDate = new Date(queue[key]);
      let newDate: Date;
      if (key === "startTime") {
        if (editingStart === "date") {
          newDate = new Date(selectedDate);
          newDate.setHours(currentDate.getHours(), currentDate.getMinutes());
        } else {
          newDate = new Date(currentDate);
          newDate.setHours(selectedDate.getHours(), selectedDate.getMinutes());
        }
      } else {
        if (editingEnd === "date") {
          newDate = new Date(selectedDate);
          newDate.setHours(currentDate.getHours(), currentDate.getMinutes());
        } else {
          newDate = new Date(currentDate);
          newDate.setHours(selectedDate.getHours(), selectedDate.getMinutes());
        }
      }

      setQueue((prev) => ({
        ...prev,
        [key]: newDate.toISOString(),
      }));
    }

    setEditingStart(null);
    setEditingEnd(null);
  };

  const saveChanges = () => {
    console.log("Saved Queue JSON:", JSON.stringify(queue, null, 2));
    setIsEditing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>{queue.name}</Text>
            <View
              style={[styles.indicator, isStarted ? styles.green : styles.red]}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Queue ID</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.disabledInput]}
              value={queue.id}
              onChangeText={(text) => handleChange("id", text)}
              editable={isEditing}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Queue Name</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.disabledInput]}
              value={queue.name}
              onChangeText={(text) => handleChange("name", text)}
              editable={isEditing}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Institution</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.disabledInput]}
              value={queue.institution}
              onChangeText={(text) => handleChange("institution", text)}
              editable={isEditing}
            />
          </View>

          {/* Start Date/Time */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Start Date</Text>
            <TouchableOpacity
              disabled={!isEditing}
              onPress={() => showPicker("date", "start")}
            >
              <Text style={[styles.input, !isEditing && styles.disabledInput]}>
                {moment(queue.startTime).format("YYYY-MM-DD")}
              </Text>
            </TouchableOpacity>

            <Text style={styles.label}>Start Time</Text>
            <TouchableOpacity
              disabled={!isEditing}
              onPress={() => showPicker("time", "start")}
            >
              <Text style={[styles.input, !isEditing && styles.disabledInput]}>
                {moment(queue.startTime).format("HH:mm")}
              </Text>
            </TouchableOpacity>
          </View>

          {/* End Date/Time */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>End Date</Text>
            <TouchableOpacity
              disabled={!isEditing}
              onPress={() => showPicker("date", "end")}
            >
              <Text style={[styles.input, !isEditing && styles.disabledInput]}>
                {moment(queue.endTime).format("YYYY-MM-DD")}
              </Text>
            </TouchableOpacity>

            <Text style={styles.label}>End Time</Text>
            <TouchableOpacity
              disabled={!isEditing}
              onPress={() => showPicker("time", "end")}
            >
              <Text style={[styles.input, !isEditing && styles.disabledInput]}>
                {moment(queue.endTime).format("HH:mm")}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Joined</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.disabledInput]}
              value={String(queue.joined)}
              onChangeText={(text) => handleChange("joined", Number(text))}
              keyboardType="numeric"
              editable={isEditing}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Max People</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.disabledInput]}
              value={String(queue.max)}
              onChangeText={(text) => handleChange("max", Number(text))}
              keyboardType="numeric"
              editable={isEditing}
            />
          </View>

          <Text style={styles.statusText}>
            {queue.joined}/{queue.max} joined
          </Text>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            {!isEditing ? (
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setIsEditing(true)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
                <Text style={styles.buttonText}>Save Changes</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Pickers */}
        {editingStart && (
          <DateTimePicker
            mode={editingStart}
            value={new Date(queue.startTime)}
            display="default"
            onChange={(e, d) => handleDateChange("startTime", e, d)}
          />
        )}
        {editingEnd && (
          <DateTimePicker
            mode={editingEnd}
            value={new Date(queue.endTime)}
            display="default"
            onChange={(e, d) => handleDateChange("endTime", e, d)}
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
  },
  scroll: {
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 10,
  },
  green: {
    backgroundColor: "#4CAF50",
  },
  red: {
    backgroundColor: "#f44336",
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    fontSize: 16,
    color: "#000",
  },
  disabledInput: {
    color: "#999",
  },
  statusText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  buttonRow: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  editButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 6,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
