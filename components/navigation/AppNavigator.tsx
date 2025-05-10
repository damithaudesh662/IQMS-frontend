import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import SignInScreen from "../screens/SignInScreen";
import CreateUserAccount from "../screens/CreateUserAccount"; // Import your CreateUserAccount screen
import CreateAdminAccount from "../screens/CreateAdminAccount"; // Import your CreateAdminAccount screen
import AdminDashboard from "../screens/AdminDashboard"; // Import your AdminDashboard screen
import UserDashboard from "../screens/UserDashboard"; // Import your UserDashboard screen
// Define the types for our navigation stack
export type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
  CreateUserAccount: undefined;
  CreateAdminAccount: undefined; 
  UserDashboard: undefined; // Add the UserDashboard screen type
  AdminDashboard: undefined; // Add the AdminDashboard screen type
  // Add other screens here as needed
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#f7f7f7" },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="CreateUserAccount" component={CreateUserAccount} />
      <Stack.Screen name="CreateAdminAccount" component={CreateAdminAccount} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} /> 
      <Stack.Screen name="UserDashboard" component={UserDashboard} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
