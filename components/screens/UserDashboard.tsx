import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";
import Icon from "react-native-vector-icons/MaterialIcons";

type RootStackParamList = {
  UserDashboard: undefined;
  InstituteMarketPlace: undefined;
  UserProfile: undefined;
  SignIn: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "UserDashboard"
>;
const UserDashboard = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "",
      headerRight: undefined,
    });
  }, [navigation]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error", error.message);
    } else {
      navigation.replace("SignIn");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>User Dashboard</Text>
        <Text style={styles.subtitle}>Welcome!</Text>
        <View style={styles.iconButtonContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate("UserProfile")}
          >
            <Icon name="person" size={24} color="#fff" />
            <Text style={styles.iconButtonText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate("InstituteMarketPlace")}
          >
            <Icon name="domain-add" size={24} color="#fff" />
            <Text style={styles.iconButtonText}>Browse Institutes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            // onPress={() => navigation.navigate("InstituteMarketPlace")}
          >
            <Icon name="domain" size={24} color="#fff" />
            <Text style={styles.iconButtonText}>Subscribed Institutes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            // onPress={() => navigation.navigate("AdminCreateQueueScreen")}
          >
            <Icon name="queue" size={24} color="#fff" />
            <Text style={styles.iconButtonText}>Joined Queues</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signOutContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#e74c3c" }]}
            onPress={handleSignOut}
          >
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eef",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4A90E2",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
    width: "60%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  iconButtonContainer: {
    marginTop: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  iconButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 18,
    width: "47%",
    alignItems: "center",
    elevation: 2,
    flexDirection: "row",
    justifyContent: "center",
  },
  iconButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  signOutContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default UserDashboard;
